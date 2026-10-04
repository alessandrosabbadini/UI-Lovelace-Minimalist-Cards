/**
 * Faithful Lit port of card_battery.yaml (icon_more_info_new + level colors/icons).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  booleanField,
  entityField,
  helpers,
  labels,
  numberField,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

export interface UlmBatteryCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-battery-card";
  entity: string;
  name?: string;
  /** Attribute holding % when entity state is not the level */
  attribute?: string;
  battery_state_entity?: string;
  charger_type_entity?: string;
  charging_animation?: boolean;
  battery_level_danger?: number;
  battery_level_warning?: number;
  color_danger?: string;
  color_warning?: string;
  color_ok?: string;
}

@customElement("ulm-battery-card")
export class UlmBatteryCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmBatteryCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        textField("attribute"),
        entityField("battery_state_entity", undefined, false),
        entityField("charger_type_entity", undefined, false),
        booleanField("charging_animation"),
        numberField("battery_level_danger"),
        numberField("battery_level_warning"),
        textField("color_danger"),
        textField("color_warning"),
        textField("color_ok"),
      ],
      computeLabel: labels({
        entity: "Battery entity",
        name: "Name (ulm_card_battery_name)",
        attribute: "Level attribute (ulm_card_battery_attribute)",
        battery_state_entity:
          "Charging state entity (ulm_card_battery_battery_state_entity_id)",
        charger_type_entity:
          "Charger type entity (ulm_card_battery_charger_type_entity_id)",
        charging_animation: "Charging animation",
        battery_level_danger: "Danger level %",
        battery_level_warning: "Warning level %",
        color_danger: "Danger color",
        color_warning: "Warning color",
        color_ok: "OK color",
      }),
      computeHelper: helpers({
        attribute:
          "If the % lives in an attribute (e.g. battery_percent), set it here.",
        battery_state_entity: 'Entity state "charging" shows charging icon.',
        charger_type_entity:
          "wireless / ac / usb / charging — replaces battery_state_entity.",
        charging_animation:
          "Requires battery_state_entity; ignores charger_type_entity.",
        battery_level_danger: "Must be lower than warning. Colors icon below this.",
        battery_level_warning: "Colors icon between danger and this value.",
        color_danger: "Default: var(--google-red)",
        color_warning: "Default: var(--google-yellow)",
        color_ok: "Default: var(--google-green)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmBatteryCardConfig> {
    return {
      entity: "sensor.outside_temperature_battery",
      battery_state_entity: "binary_sensor.outside_temperature_battery_charging",
      battery_level_danger: 20,
      battery_level_warning: 50,
      charging_animation: false,
    };
  }

  public setConfig(config: UlmBatteryCardConfig): void {
    const c = config as UlmBatteryCardConfig & Record<string, unknown>;
    const entity =
      config.entity || (c.ulm_card_battery_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const danger = this._num(
      config.battery_level_danger ??
        c.ulm_card_battery_battery_level_danger,
    );
    // Docs typo: waring — accept both
    const warning = this._num(
      config.battery_level_warning ??
        c.ulm_card_battery_battery_level_warning ??
        c.ulm_card_battery_battery_level_waring,
    );

    this._config = {
      ...config,
      entity,
      name: config.name ?? (c.ulm_card_battery_name as string | undefined),
      attribute:
        config.attribute ??
        (c.ulm_card_battery_attribute as string | undefined),
      battery_state_entity:
        config.battery_state_entity ??
        (c.ulm_card_battery_battery_state_entity_id as string | undefined),
      charger_type_entity:
        config.charger_type_entity ??
        (c.ulm_card_battery_charger_type_entity_id as string | undefined),
      charging_animation: Boolean(
        config.charging_animation ??
          c.ulm_card_battery_charging_animation ??
          false,
      ),
      battery_level_danger: danger,
      battery_level_warning: warning,
      color_danger:
        config.color_danger ??
        (c.ulm_card_battery_color_battery_level_danger as string | undefined) ??
        "var(--google-red)",
      color_warning:
        config.color_warning ??
        (c.ulm_card_battery_color_battery_level_warning as
          | string
          | undefined) ??
        "var(--google-yellow)",
      color_ok:
        config.color_ok ??
        (c.ulm_card_battery_color_battery_level_ok as string | undefined) ??
        "var(--google-green)",
      type: "custom:ulm-battery-card",
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
      return html`<ha-card class="ulm-card ulm-battery"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const level = this._level(stateObj);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon = this._icon(level);
    const color = this._iconColor(level);
    const label = this._label(level, stateObj);
    const animate = this._shouldAnimate();

    return html`
      <ha-card class="ulm-card ulm-battery">
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap({
              color,
              backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
            })}
            @click=${this._moreInfo}
          >
            <ha-icon
              class=${classMap({ charging: animate })}
              .icon=${icon}
            ></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </button>
        </div>
      </ha-card>
    `;
  }

  private _num(raw: unknown): number | undefined {
    if (raw == null || raw === "") return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  }

  private _level(stateObj: HassEntity): number | "unknown" | "unavailable" {
    const attr = this._config?.attribute;
    const raw =
      attr && stateObj.attributes[attr] != null
        ? stateObj.attributes[attr]
        : stateObj.state;
    if (raw === "unknown" || raw === "unavailable") return raw;
    const n = Number(raw);
    return Number.isFinite(n) ? n : "unknown";
  }

  private _chargingInfix(): string {
    const cfg = this._config!;
    if (cfg.charger_type_entity && this.hass?.states[cfg.charger_type_entity]) {
      switch (
        String(this.hass.states[cfg.charger_type_entity].state).toLowerCase()
      ) {
        case "wireless":
          return "-charging-wireless";
        case "charging":
        case "ac":
        case "usb":
          return "-charging";
        default:
          return "";
      }
    }
    if (
      !cfg.charging_animation &&
      cfg.battery_state_entity &&
      this.hass?.states[cfg.battery_state_entity] &&
      String(this.hass.states[cfg.battery_state_entity].state).toLowerCase() ===
        "charging"
    ) {
      return "-charging";
    }
    // binary_sensor charging often uses "on"
    if (
      !cfg.charging_animation &&
      cfg.battery_state_entity &&
      this.hass?.states[cfg.battery_state_entity]
    ) {
      const st = String(
        this.hass.states[cfg.battery_state_entity].state,
      ).toLowerCase();
      if (st === "on" || st === "charging") return "-charging";
    }
    return "";
  }

  private _icon(level: number | "unknown" | "unavailable"): string {
    if (level === "unknown" || level === "unavailable") {
      return "mdi:battery-off";
    }
    const infix = this._chargingInfix();
    if (level === 100) return "mdi:battery";
    if (level < 10) return `mdi:battery${infix}-outline`;
    const step = Math.floor(level / 10) * 10;
    return `mdi:battery${infix}-${step}`;
  }

  private _iconColor(level: number | "unknown" | "unavailable"): string {
    const cfg = this._config!;
    const theme = "rgba(var(--color-theme, 51, 51, 51), 0.9)";
    if (
      level === "unavailable" ||
      (cfg.battery_level_danger == null && cfg.battery_level_warning == null)
    ) {
      if (level === "unknown" || level === "unavailable") {
        return cfg.color_danger || "var(--google-red)";
      }
      return theme;
    }
    if (level === "unknown" || level === "unavailable") {
      return cfg.color_danger || "var(--google-red)";
    }
    if (
      cfg.battery_level_danger != null &&
      level <= cfg.battery_level_danger
    ) {
      return cfg.color_danger || "var(--google-red)";
    }
    if (
      cfg.battery_level_warning != null &&
      level <= cfg.battery_level_warning
    ) {
      return cfg.color_warning || "var(--google-yellow)";
    }
    return cfg.color_ok || "var(--google-green)";
  }

  private _label(
    level: number | "unknown" | "unavailable",
    stateObj: HassEntity,
  ): string {
    if (level === "unknown" || level === "unavailable") {
      if (this.hass?.formatEntityState) {
        return this.hass.formatEntityState(stateObj);
      }
      return String(level);
    }
    return `${level}%`;
  }

  private _shouldAnimate(): boolean {
    const cfg = this._config;
    if (!cfg?.charging_animation || !cfg.battery_state_entity || !this.hass) {
      return false;
    }
    const st = this.hass.states[cfg.battery_state_entity];
    if (!st) return false;
    const s = String(st.state).toLowerCase();
    return s === "charging" || s === "on";
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

    ha-card.ulm-battery {
      height: auto;
    }

    .icon-btn ha-icon.charging {
      animation: charge 3s linear infinite;
    }

    @keyframes charge {
      0%,
      80% {
        clip-path: inset(0 0 0 0);
      }
      10% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 66%,
          34% 66%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      20% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 62%,
          34% 62%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      30% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 58%,
          34% 58%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      40% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 54%,
          34% 54%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      50% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 50%,
          34% 50%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      60% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 46%,
          34% 46%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
      70% {
        clip-path: polygon(
          0% 0%,
          0% 100%,
          34% 100%,
          34% 40%,
          66% 40%,
          66% 40%,
          34% 40%,
          34% 100%,
          100% 100%,
          100% 0%
        );
      }
    }
  `;
}
