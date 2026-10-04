/**
 * Faithful Lit port of card_binary_sensor_alert.yaml (icon_more_info_alert).
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
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmBinarySensorAlertCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-binary-sensor-alert-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  show_last_changed?: boolean;
  force_background_color?: boolean;
  /** Alert when off instead of on (ulm_icon_alert_invert_state) */
  invert_state?: boolean;
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

@customElement("ulm-binary-sensor-alert-card")
export class UlmBinarySensorAlertCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmBinarySensorAlertCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "binary_sensor"),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        booleanField("show_last_changed"),
        booleanField("force_background_color"),
        booleanField("invert_state"),
      ],
      computeLabel: labels({
        entity: "Binary sensor",
        name: "Name (ulm_card_binary_sensor_alert_name)",
        icon: "Icon (ulm_card_binary_sensor_alert_icon)",
        color: "Color (ulm_card_binary_sensor_alert_color)",
        show_last_changed: "Show last changed",
        force_background_color: "Force background color when active",
        invert_state: "Invert alert (ulm_icon_alert_invert_state)",
      }),
      computeHelper: helpers({
        show_last_changed:
          "Replaces the state label with a relative last-changed time.",
        force_background_color:
          "Tints the card with the selected color while active.",
        invert_state: "Show the alert badge when the sensor is off instead of on.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmBinarySensorAlertCardConfig> {
    return {
      entity: "binary_sensor.movement_backyard",
      color: "blue",
      show_last_changed: false,
      force_background_color: false,
      invert_state: false,
    };
  }

  public setConfig(config: UlmBinarySensorAlertCardConfig): void {
    const c = config as UlmBinarySensorAlertCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (c.ulm_card_binary_sensor_alert_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name:
        config.name ??
        (c.ulm_card_binary_sensor_alert_name as string | undefined),
      icon:
        config.icon ??
        (c.ulm_card_binary_sensor_alert_icon as string | undefined),
      color: (config.color ||
        c.ulm_card_binary_sensor_alert_color ||
        "blue") as UlmThemeColor,
      show_last_changed: Boolean(
        config.show_last_changed ??
          c.ulm_card_binary_sensor_alert_show_last_changed ??
          c.ulm_card_binary_sensor_show_last_changed ??
          c.ulm_show_last_changed ??
          false,
      ),
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_binary_sensor_alert_force_background_color ??
          false,
      ),
      invert_state: Boolean(
        config.invert_state ?? c.ulm_icon_alert_invert_state ?? false,
      ),
      type: "custom:ulm-binary-sensor-alert-card",
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
      return html`<ha-card class="ulm-card ulm-binary-sensor-alert"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = isActive(stateObj.state);
    const color = (this._config.color || "blue") as UlmThemeColor;
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
      "mdi:alert";
    const label = this._label(stateObj);
    const showAlert = this._showAlert(stateObj);
    const cardStyle = forceBg
      ? {
          backgroundColor: `rgba(${rgb}, var(--opacity-bg, 1))`,
        }
      : {};
    const textStyle = forceBg ? { color: "rgb(250, 250, 250)" } : {};
    const badgeRgb = resolveThemeRgb(this, "red");

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-binary-sensor-alert": true,
          active,
          "force-bg": forceBg,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap(iconStyle)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${icon}></ha-icon>
            ${showAlert
              ? html`<span
                  class="badge"
                  style=${styleMap({
                    backgroundColor: `rgba(${badgeRgb}, 1)`,
                  })}
                  aria-hidden="true"
                >
                  <ha-icon .icon=${"mdi:exclamation"}></ha-icon>
                </span>`
              : nothing}
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${styleMap(textStyle)}>${name}</div>
            <div class="label" style=${styleMap(textStyle)}>${label}</div>
          </button>
        </div>
      </ha-card>
    `;
  }

  /** icon_alert: badge when on/unavailable (or off when inverted) */
  private _showAlert(stateObj: HassEntity): boolean {
    const check = this._config?.invert_state ? "off" : "on";
    return stateObj.state === "unavailable" || stateObj.state === check;
  }

  private _label(stateObj: HassEntity): string {
    if (this._config?.show_last_changed && stateObj.last_changed) {
      return this._relativeTime(stateObj.last_changed);
    }
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    return stateObj.state;
  }

  private _relativeTime(iso: string): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const sec = Math.max(0, Math.round((Date.now() - then) / 1000));
    if (sec < 60) return `${sec}s`;
    const min = Math.round(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.round(min / 60);
    if (hr < 48) return `${hr}h`;
    return `${Math.round(hr / 24)}d`;
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
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
      display: block;
      height: auto !important;
      align-self: start;
      overflow: visible !important;
    }

    ha-card.ulm-binary-sensor-alert,
    .row,
    .icon-btn {
      overflow: visible !important;
    }

    ha-card.ulm-binary-sensor-alert {
      height: auto;
    }

    /*
     * Red disc + white ring. Prefer box-shadow for the ring (not clipped as
     * easily as border when slightly outside the icon cell). Keep the 16px
     * disc inside the 42px icon so the fill always paints.
     */
    .icon-btn .badge {
      position: absolute;
      left: 24px;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 0;
      box-sizing: border-box;
      box-shadow: 0 0 0 2px #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
      line-height: 0;
      z-index: 5;
      pointer-events: none;
    }

    .icon-btn .badge ha-icon {
      --mdc-icon-size: 10px !important;
      width: 10px !important;
      height: 10px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 0;
      color: #fff;
    }
  `;
}
