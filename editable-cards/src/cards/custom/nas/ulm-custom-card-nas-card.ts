/**
 * Lit port of custom_cards/custom_card_nas/
 * Simple blue icon_info: name + "{text} {state}{unit}".
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomNasCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-nas-card";
  entity: string;
  name?: string;
  text?: string;
  unit?: string;
  icon?: string;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asStr(raw: unknown): string | undefined {
  return typeof raw === "string" && raw ? raw : undefined;
}

@customElement("ulm-custom-card-nas-card")
export class UlmCustomNasCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomNasCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "sensor"),
        textField("name"),
        textField("text"),
        textField("unit"),
        iconField("icon"),
      ],
      computeLabel: labels({
        entity: "Sensor",
        name: "Name",
        text: "Label prefix",
        unit: "Unit suffix",
        icon: "Icon",
      }),
      computeHelper: helpers({
        entity: "Legacy: ulm_custom_card_nas_sensor",
        text: "Legacy: ulm_custom_card_nas_text — shown before state",
        unit: "Legacy: ulm_custom_card_nas_unit — appended after state",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomNasCardConfig> {
    return {
      entity: "sensor.nas_volume_used",
      name: "Nas",
      text: "Used",
      unit: "%",
      icon: "mdi:nas",
    };
  }

  public setConfig(config: UlmCustomNasCardConfig): void {
    const c = config as UlmCustomNasCardConfig & Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_custom_card_nas_sensor"),
    );
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")) || "Nas",
      text: asStr(pick(c, "text", "ulm_custom_card_nas_text")) || "",
      unit: asStr(pick(c, "unit", "ulm_custom_card_nas_unit")) || "",
      icon: asStr(pick(c, "icon")) || "mdi:nas",
      type: "custom:ulm-custom-card-nas-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-nas"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const rgb = resolveThemeRgb(this, "blue");
    const iconStyle = {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };
    const name = this._config.name || "Nas";
    const icon = this._config.icon || "mdi:nas";
    const text = this._config.text ?? "";
    const unit = this._config.unit ?? "";
    const label = `${text} ${stateObj.state}${unit}`.trim();

    return html`
      <ha-card class="ulm-card ulm-nas" @click=${() => this._moreInfo()}>
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _moreInfo() {
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-nas {
      height: auto;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-nas-card": UlmCustomNasCard;
  }
}
