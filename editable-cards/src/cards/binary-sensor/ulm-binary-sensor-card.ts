/**
 * Faithful Lit port of card_binary_sensor.yaml (icon_more_info_new).
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

export interface UlmBinarySensorCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-binary-sensor-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  show_last_changed?: boolean;
  force_background_color?: boolean;
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

@customElement("ulm-binary-sensor-card")
export class UlmBinarySensorCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmBinarySensorCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "binary_sensor"),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        booleanField("show_last_changed"),
        booleanField("force_background_color"),
      ],
      computeLabel: labels({
        entity: "Binary sensor",
        name: "Name (ulm_card_binary_sensor_name)",
        icon: "Icon (ulm_card_binary_sensor_icon)",
        color: "Color (ulm_card_binary_sensor_color)",
        show_last_changed: "Show last changed",
        force_background_color: "Force background color when active",
      }),
      computeHelper: helpers({
        show_last_changed:
          "Replaces the state label with a relative last-changed time.",
        force_background_color:
          "Tints the card with the selected color while active.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmBinarySensorCardConfig> {
    return {
      entity: "binary_sensor.basement_floor_wet",
      color: "blue",
      show_last_changed: false,
      force_background_color: false,
    };
  }

  public setConfig(config: UlmBinarySensorCardConfig): void {
    const c = config as UlmBinarySensorCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (c.ulm_card_binary_sensor_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name:
        config.name ??
        (c.ulm_card_binary_sensor_name as string | undefined),
      icon:
        config.icon ??
        (c.ulm_card_binary_sensor_icon as string | undefined),
      color: (config.color ||
        c.ulm_card_binary_sensor_color ||
        "blue") as UlmThemeColor,
      show_last_changed: Boolean(
        config.show_last_changed ??
          c.ulm_card_binary_sensor_show_last_changed ??
          c.ulm_show_last_changed ??
          false,
      ),
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_binary_sensor_force_background_color ??
          false,
      ),
      type: "custom:ulm-binary-sensor-card",
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
      return html`<ha-card class="ulm-card ulm-binary-sensor"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = isActive(stateObj.state);
    const color = (this._config.color || "blue") as UlmThemeColor;
    const rgb = resolveThemeRgb(this, color);
    const iconStyle = activeIconStyle(this, active, color);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:checkbox-blank-circle";
    const label = this._label(stateObj);
    const forceBg = !!this._config.force_background_color && active;
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
          "ulm-binary-sensor": true,
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
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${styleMap(textStyle)}>${name}</div>
            <div class="label" style=${styleMap(textStyle)}>${label}</div>
          </button>
        </div>
      </ha-card>
    `;
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
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-binary-sensor {
      height: auto;
    }
  `;
}
