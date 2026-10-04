/**
 * Faithful Lit port of card_power_outlet.yaml (icon_more_info_new + consumption).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import { openUlmPopup } from "../../popups/ulm-popup";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmPowerOutletCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-power-outlet-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  consumption_sensor?: string;
  force_background_color?: boolean;
  enable_popup?: boolean;
}

const INACTIVE = new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused",
]);

function isActive(state: string): boolean {
  if (INACTIVE.has(state)) return false;
  if (/\d/.test(state)) return false;
  return true;
}

@customElement("ulm-power-outlet-card")
export class UlmPowerOutletCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmPowerOutletCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["switch", "input_boolean", "light"]),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        entityField("consumption_sensor", "sensor", false),
        booleanField("force_background_color"),
        booleanField("enable_popup"),
      ],
      computeLabel: labels({
        entity: "Outlet / switch entity",
        name: "Name (ulm_card_power_outlet_name)",
        icon: "Icon (ulm_card_power_outlet_icon)",
        color: "Color (ulm_card_power_outlet_color)",
        consumption_sensor:
          "Consumption sensor (ulm_card_power_outlet_consumption_sensor)",
        force_background_color: "Force background color when on",
        enable_popup: "Enable popup (ulm_outlet_power_enable_popup)",
      }),
      computeHelper: helpers({
        consumption_sensor:
          "When the outlet is on, shows state • {value}W from this sensor.",
        enable_popup: "Opens the ULM power outlet popup on tap.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmPowerOutletCardConfig> {
    return {
      entity: "switch.ac",
      color: "yellow",
      consumption_sensor: "sensor.power_consumption",
      force_background_color: false,
      enable_popup: false,
    };
  }

  public setConfig(config: UlmPowerOutletCardConfig): void {
    const c = config as UlmPowerOutletCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (c.ulm_card_power_outlet_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name:
        config.name ??
        (c.ulm_card_power_outlet_name as string | undefined),
      icon:
        config.icon ??
        (c.ulm_card_power_outlet_icon as string | undefined),
      color: (config.color ||
        c.ulm_card_power_outlet_color ||
        "yellow") as UlmThemeColor,
      consumption_sensor:
        config.consumption_sensor ??
        (c.ulm_card_power_outlet_consumption_sensor as string | undefined),
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_power_outlet_force_background_color ??
          false,
      ),
      enable_popup: Boolean(
        config.enable_popup ?? c.ulm_outlet_power_enable_popup ?? false,
      ),
      type: "custom:ulm-power-outlet-card",
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
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-power-outlet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = isActive(stateObj.state);
    const color = (this._config.color || "yellow") as UlmThemeColor;
    const rgb = resolveThemeRgb(this, color);
    const forceBg = !!this._config.force_background_color && active;
    const iconStyle = activeIconStyle(
      this,
      active,
      color,
      null,
      false,
      forceBg,
    );
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:power-socket-eu";
    const label = this._label(stateObj, active);
    const cardStyle = forceBg
      ? {
          backgroundColor: `rgba(${rgb}, var(--opacity-bg, 1))`,
        }
      : {};
    const textStyle = forceBg ? { color: "rgb(250, 250, 250)" } : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-power-outlet": true,
          active,
          "force-bg": forceBg,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap(iconStyle)}
            @click=${this._iconTap}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._nameTap}>
            <div class="name" style=${styleMap(textStyle)}>${name}</div>
            <div class="label" style=${styleMap(textStyle)}>${label}</div>
          </button>
        </div>
      </ha-card>
    `;
  }

  private _label(stateObj: HassEntity, active: boolean): string {
    const stateLabel = this.hass?.formatEntityState
      ? this.hass.formatEntityState(stateObj)
      : stateObj.state;

    const sensorId = this._config?.consumption_sensor;
    if (active && sensorId && this.hass?.states[sensorId]) {
      const watts = this.hass.states[sensorId].state;
      return `${stateLabel} • ${watts}W`;
    }
    return stateLabel;
  }

  private _iconTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "power_outlet", this._config.entity);
      return;
    }
    const domain = this._config.entity.split(".")[0];
    this.hass.callService(domain, "toggle", {
      entity_id: this._config.entity,
    });
  };

  private _nameTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "power_outlet", this._config.entity);
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-power-outlet {
      height: auto;
    }
  `;
}
