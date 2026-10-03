import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import { UlmEditorBase } from "../../shared/editor-base";
import { ulmCardStyles } from "../../shared/styles";
import { openUlmPopup } from "../../popups/ulm-popup";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmThermostatCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-thermostat-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  enable_controls?: boolean;
  enable_popup?: boolean;
}

@customElement("ulm-thermostat-card")
export class UlmThermostatCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmThermostatCardConfig;

  public static async getConfigElement() {
    return document.createElement("ulm-thermostat-card-editor");
  }

  public static getStubConfig(): Partial<UlmThermostatCardConfig> {
    return {
      entity: "climate.heatpump",
      enable_controls: true,
      color: "red",
    };
  }

  public setConfig(config: UlmThermostatCardConfig): void {
    if (!config.entity) throw new Error("Please define an entity");
    this._config = {
      enable_controls: true,
      enable_popup: false,
      color: "red",
      ...config,
      type: "custom:ulm-thermostat-card",
    };
  }

  public getCardSize(): number {
    return this._config?.enable_controls ? 2 : 1;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = stateObj.state !== "off";
    const color = this._config.color || "red";
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon || stateObj.attributes.icon || "mdi:thermostat";
    const current = stateObj.attributes.current_temperature;
    const target = stateObj.attributes.temperature;
    const iconStyle = activeIconStyle(this, active, color);

    return html`
      <ha-card class="ulm-card">
        <div class="stack">
          <div class="row">
            <button
              class="icon-btn"
              style=${styleMap(iconStyle)}
              @click=${this._moreInfo}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfo}>
              <div class="name">${name}</div>
              <div class="label">
                ${stateObj.state}${current !== undefined
                  ? ` · ${current}°`
                  : ""}${target !== undefined ? ` → ${target}°` : ""}
              </div>
            </button>
          </div>
          ${this._config.enable_controls && typeof target === "number"
            ? html`<div class="widgets">
                <button class="widget-btn" @click=${() => this._adjust(-0.5)}>
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  @click=${() =>
                    this._call("set_hvac_mode", {
                      hvac_mode: active ? "off" : "heat",
                    })}
                >
                  <ha-icon icon=${active ? "mdi:power" : "mdi:fire"}></ha-icon>
                </button>
                <button class="widget-btn" @click=${() => this._adjust(0.5)}>
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _adjust(delta: number) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    const current = Number(stateObj?.attributes.temperature);
    if (Number.isNaN(current)) return;
    this._call("set_temperature", { temperature: current + delta });
  }

  private _call(service: string, data: Record<string, unknown> = {}) {
    if (!this.hass || !this._config) return;
    this.hass.callService("climate", service, {
      entity_id: this._config.entity,
      ...data,
    });
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "thermostat", this._config.entity);
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  };

  static styles = ulmCardStyles;
}

@customElement("ulm-thermostat-card-editor")
export class UlmThermostatCardEditor extends UlmEditorBase<UlmThermostatCardConfig> {
  protected render() {
    return this.renderFields([
      {
        type: "text",
        key: "entity",
        label: "Entity",
        placeholder: "climate.living_room",
      },
      { type: "text", key: "name", label: "Name (optional)" },
      { type: "text", key: "icon", label: "Icon (optional)" },
      { type: "color", key: "color", label: "Theme color" },
      {
        type: "toggle",
        key: "enable_controls",
        label: "Show temperature controls",
      },
      {
        type: "toggle",
        key: "enable_popup",
        label: "Open ULM thermostat popup instead of more-info",
      },
    ]);
  }
}
