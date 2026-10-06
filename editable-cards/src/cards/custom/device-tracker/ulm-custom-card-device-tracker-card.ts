/**
 * Lit port of custom_cards/custom_card_device_tracker/
 * icon_info_bg device/person card with optional tracker_1 / tracker_2 badges.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
  labels,
  selectField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export type TrackerBadgeType = "home" | "bluetooth" | "lan";

export interface UlmCustomDeviceTrackerCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-device-tracker-card";
  entity: string;
  icon?: string;
  tracker_1?: string;
  tracker_1_type?: TrackerBadgeType;
  tracker_2?: string;
  tracker_2_type?: TrackerBadgeType;
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

function asTrackerType(raw: unknown): TrackerBadgeType | undefined {
  if (raw === "bluetooth" || raw === "lan" || raw === "home") return raw;
  return undefined;
}

const TRACKER_TYPE_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "bluetooth", label: "Bluetooth" },
  { value: "lan", label: "LAN" },
];

@customElement("ulm-custom-card-device-tracker-card")
export class UlmCustomDeviceTrackerCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomDeviceTrackerCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["device_tracker", "person"]),
        iconField("icon"),
        entityField("tracker_1", ["device_tracker", "person", "binary_sensor"], false),
        selectField("tracker_1_type", TRACKER_TYPE_OPTIONS),
        entityField("tracker_2", ["device_tracker", "person", "binary_sensor"], false),
        selectField("tracker_2_type", TRACKER_TYPE_OPTIONS),
      ],
      computeLabel: labels({
        entity: "Device / person",
        icon: "Icon",
        tracker_1: "Tracker 1",
        tracker_1_type: "Tracker 1 type",
        tracker_2: "Tracker 2",
        tracker_2_type: "Tracker 2 type",
      }),
      computeHelper: helpers({
        entity: "Main device_tracker or person entity",
        icon: "Legacy: ulm_custom_card_device_tracker_icon",
        tracker_1: "Legacy: ulm_custom_card_device_tracker_tracker_1_entity",
        tracker_1_type:
          "Legacy: ulm_custom_card_device_tracker_tracker_1_type (home / bluetooth / lan)",
        tracker_2: "Legacy: ulm_custom_card_device_tracker_tracker_2_entity",
        tracker_2_type:
          "Legacy: ulm_custom_card_device_tracker_tracker_2_type (home / bluetooth / lan)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomDeviceTrackerCardConfig> {
    return {
      entity: "device_tracker.phone",
      icon: "mdi:cellphone",
    };
  }

  public setConfig(config: UlmCustomDeviceTrackerCardConfig): void {
    const c = config as UlmCustomDeviceTrackerCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      icon: asStr(
        pick(c, "icon", "ulm_custom_card_device_tracker_icon"),
      ),
      tracker_1: asStr(
        pick(c, "tracker_1", "ulm_custom_card_device_tracker_tracker_1_entity"),
      ),
      tracker_1_type:
        asTrackerType(
          pick(c, "tracker_1_type", "ulm_custom_card_device_tracker_tracker_1_type"),
        ) || "home",
      tracker_2: asStr(
        pick(c, "tracker_2", "ulm_custom_card_device_tracker_tracker_2_entity"),
      ),
      tracker_2_type:
        asTrackerType(
          pick(c, "tracker_2_type", "ulm_custom_card_device_tracker_tracker_2_type"),
        ) || "home",
      type: "custom:ulm-custom-card-device-tracker-card",
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
      return html`<ha-card class="ulm-card ulm-device-tracker"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const away = stateObj.state === "not_home";
    const green = resolveThemeRgb(this, "green");
    const iconStyle = away
      ? {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        }
      : {
          color: `rgba(${green}, 1)`,
          backgroundColor: `rgba(${green}, 0.2)`,
        };

    const name =
      stateObj.attributes.friendly_name || stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:cellphone";
    const label =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-device-tracker": true,
          home: !away,
        })}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
        ${this._badge(this._config.tracker_1, this._config.tracker_1_type, 1)}
        ${this._badge(this._config.tracker_2, this._config.tracker_2_type, 2)}
      </ha-card>
    `;
  }

  private _badge(
    entityId: string | undefined,
    type: TrackerBadgeType | undefined,
    index: 1 | 2,
  ) {
    if (!entityId || !this.hass) return nothing;
    const st = this.hass.states[entityId];
    if (!st) return nothing;

    const home = st.state === "home";
    const rgb = resolveThemeRgb(this, home ? "blue" : "green");
    const icon = this._trackerIcon(home, type || "home");

    return html`
      <span
        class=${classMap({
          "tracker-badge": true,
          [`tracker-${index}`]: true,
        })}
        style=${styleMap({ backgroundColor: `rgba(${rgb}, 1)` })}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </span>
    `;
  }

  private _trackerIcon(home: boolean, type: TrackerBadgeType): string {
    if (type === "bluetooth") {
      return home ? "mdi:bluetooth" : "mdi:bluetooth-off";
    }
    if (type === "lan") {
      return home ? "mdi:lan-connect" : "mdi:lan-disconnect";
    }
    return home ? "mdi:home-variant" : "mdi:home-minus";
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

    ha-card.ulm-card.ulm-device-tracker {
      position: relative;
      height: auto;
      overflow: visible;
      cursor: pointer;
    }

    .icon-btn {
      overflow: visible;
      pointer-events: none;
    }

    .info-btn {
      pointer-events: none;
    }

    .tracker-badge {
      position: absolute;
      left: 38px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      z-index: 2;
      pointer-events: none;
      line-height: 0;
    }

    .tracker-1 {
      top: 8px;
    }

    .tracker-2 {
      top: 38px;
    }

    .tracker-badge ha-icon {
      --mdc-icon-size: 10px;
      width: 10px;
      height: 10px;
      color: var(--primary-background-color, #fff);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-device-tracker-card": UlmCustomDeviceTrackerCard;
  }
}
