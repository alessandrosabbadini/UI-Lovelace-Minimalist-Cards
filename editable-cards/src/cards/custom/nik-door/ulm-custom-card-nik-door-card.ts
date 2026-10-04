/**
 * Lit port of custom_cards/custom_card_nik_door/custom_card_nik_door.yaml
 * "Minimal Door Lock" — door sensor header + battery badge + open/lock widgets.
 * Outer card uses double-tap unlock (button-card lock: unlock double_tap).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

const UNLOCK_MS = 5000;

/** Nuki-style security states used by the original YAML */
const STATE_OPEN = "Open";
const STATE_CLOSED_UNLOCKED = "Closed & Unlocked";
const STATE_CLOSED_LOCKED = "Closed & Locked";

export interface UlmCustomNikDoorCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-nik-door-card";
  /** Door security / open-close sensor (entity in YAML) */
  entity: string;
  name?: string;
  lock_entity: string;
  /** Optional — badge hidden when missing */
  battery_entity?: string;
  /** Match button-card lock unlock: double_tap — default true */
  require_double_tap_unlock?: boolean;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function batteryIcon(level: number): string {
  if (level >= 100) return "mdi:battery";
  if (level >= 80) return "mdi:battery-70";
  if (level >= 60) return "mdi:battery-60";
  if (level >= 50) return "mdi:battery-50";
  return "mdi:battery-20";
}

@customElement("ulm-custom-card-nik-door-card")
export class UlmCustomNikDoorCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomNikDoorCardConfig;
  @state() private _controlsUnlocked = false;

  private _relockTimer?: number;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", undefined, false),
        textField("name"),
        entityField("lock_entity", "lock", false),
        entityField("battery_entity", "sensor", false),
        booleanField("require_double_tap_unlock"),
      ],
      computeLabel: labels({
        entity: "Door state sensor (Open / Closed & …)",
        name: "Door name (ulm_custom_card_entity_1_name)",
        lock_entity: "Lock entity (ulm_custom_card_entity_1_lock)",
        battery_entity: "Battery sensor (ulm_custom_card_entity_1_lock_battery)",
        require_double_tap_unlock: "Double-tap to unlock controls",
      }),
      computeHelper: helpers({
        entity:
          "Nuki-style states: Open / Closed & Unlocked / Closed & Locked",
        lock_entity:
          "Must be a lock.* entity (receives lock.open / lock.lock)",
        battery_entity: "Optional. Badge on the door icon (red ≤40%, else green)",
        require_double_tap_unlock:
          "Original button-card lock unlock: double_tap — prevents accidental open",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomNikDoorCardConfig> {
    return {
      entity: "sensor.nuki_door_security_state",
      name: "Door",
      lock_entity: "lock.front_door_lock",
      battery_entity: "sensor.front_door_battery",
      require_double_tap_unlock: true,
    };
  }

  public setConfig(config: UlmCustomNikDoorCardConfig): void {
    const c = config as UlmCustomNikDoorCardConfig & Record<string, unknown>;
    const entity =
      (config.entity ||
        (pick(c, "ulm_custom_card_entity_1_door") as string | undefined) ||
        "") as string;
    const lock_entity =
      (pick(
        c,
        "lock_entity",
        "ulm_custom_card_entity_1_lock",
      ) as string | undefined) || "";
    const battery_entity =
      (pick(
        c,
        "battery_entity",
        "ulm_custom_card_entity_1_lock_battery",
      ) as string | undefined) || undefined;

    // Allow opening the editor with partial config; render shows warnings.
    this._config = {
      ...config,
      entity,
      name:
        (pick(c, "name", "ulm_custom_card_entity_1_name") as string) ||
        undefined,
      lock_entity,
      battery_entity,
      require_double_tap_unlock: asBool(
        pick(c, "require_double_tap_unlock"),
        true,
      ),
      type: "custom:ulm-custom-card-nik-door-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearRelock();
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const doorId = this._config.entity;
    const door = doorId ? this.hass.states[doorId] : undefined;
    const batteryId = this._config.battery_entity;
    const battery = batteryId ? this.hass.states[batteryId] : undefined;
    const lockId = this._config.lock_entity;
    const lockOk = !!(lockId && this.hass.states[lockId]);
    const lockNeed = this._config.require_double_tap_unlock !== false;
    const unlocked = !lockNeed || this._controlsUnlocked;

    const name =
      this._config.name ||
      door?.attributes.friendly_name ||
      doorId ||
      "Door";
    const doorState = door?.state || "unknown";
    const batLevel = battery ? Number.parseFloat(battery.state) : NaN;
    const batOk = Number.isFinite(batLevel);
    const batLow = batOk && batLevel <= 40;
    const batColor = batLow ? "red" : "green";
    const batRgb = resolveThemeRgb(this, batColor);
    const blue = resolveThemeRgb(this, "blue");

    const missing: string[] = [];
    if (!doorId) missing.push("door state entity");
    else if (!door) missing.push(doorId);
    if (!lockId) missing.push("lock entity");
    else if (!lockOk) missing.push(lockId);
    if (batteryId && !battery) missing.push(batteryId);

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-nik-door": true,
          locked: lockNeed && !unlocked,
        })}
        @dblclick=${this._onDoubleTap}
      >
        ${missing.length
          ? html`<div class="warning">
              Missing entity: ${missing.join(", ")}
            </div>`
          : nothing}
        ${lockNeed && !unlocked
          ? html`<div class="lock-hint" title="Double-tap to unlock controls">
              <ha-icon icon="mdi:lock"></ha-icon>
            </div>`
          : nothing}

        <div class="header">
          <div class="icon-wrap">
            <div
              class="door-icon"
              style=${styleMap({
                color: `rgba(${blue}, 1)`,
                backgroundColor: `rgba(${blue}, 0.2)`,
              })}
            >
              <ha-icon icon="mdi:door"></ha-icon>
            </div>
            ${batOk
              ? html`<span
                  class="bat-badge"
                  title="Battery ${batLevel}%"
                  style=${styleMap({
                    backgroundColor: `rgba(${batRgb}, 1)`,
                  })}
                >
                  <ha-icon .icon=${batteryIcon(batLevel)}></ha-icon>
                </span>`
              : nothing}
          </div>
          <!-- Avoid global ulmCardStyles .name/.label (wrong align-self in this layout) -->
          <div class="door-name">${name}</div>
          <div class="door-state">${doorState}</div>
        </div>

        <div class="widgets ${unlocked ? "" : "disabled"}">
          <button
            class="widget"
            style=${styleMap(this._openWidgetStyle(doorState))}
            title="Open"
            ?disabled=${!unlocked || !lockOk}
            @click=${(ev: Event) => this._open(ev)}
          >
            <ha-icon icon="mdi:lock-open-variant"></ha-icon>
          </button>
          <button
            class="widget"
            style=${styleMap(this._lockWidgetStyle(doorState))}
            title="Lock"
            ?disabled=${!unlocked || !lockOk}
            @click=${(ev: Event) => this._lock(ev)}
          >
            <ha-icon icon="mdi:lock"></ha-icon>
          </button>
        </div>
      </ha-card>
    `;
  }

  private _openWidgetStyle(doorState: string): Record<string, string> {
    if (doorState === STATE_OPEN) {
      const rgb = resolveThemeRgb(this, "red");
      return {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      };
    }
    if (doorState === STATE_CLOSED_UNLOCKED) {
      const rgb = resolveThemeRgb(this, "yellow");
      return {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
  }

  private _lockWidgetStyle(doorState: string): Record<string, string> {
    if (doorState === STATE_CLOSED_LOCKED) {
      const rgb = resolveThemeRgb(this, "green");
      return {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
  }

  private _onDoubleTap = (ev: Event) => {
    ev.preventDefault();
    if (this._config?.require_double_tap_unlock === false) return;
    this._controlsUnlocked = true;
    this._clearRelock();
    this._relockTimer = window.setTimeout(() => {
      this._controlsUnlocked = false;
      this._relockTimer = undefined;
    }, UNLOCK_MS);
  };

  private _clearRelock() {
    if (this._relockTimer !== undefined) {
      window.clearTimeout(this._relockTimer);
      this._relockTimer = undefined;
    }
  }

  private _open(ev: Event) {
    ev.stopPropagation();
    if (!this._config?.lock_entity || !this.hass) return;
    if (
      this._config.require_double_tap_unlock !== false &&
      !this._controlsUnlocked
    ) {
      return;
    }
    if (!this.hass.states[this._config.lock_entity]) return;
    this.hass.callService("lock", "open", {
      entity_id: this._config.lock_entity,
    });
  }

  private _lock(ev: Event) {
    ev.stopPropagation();
    if (!this._config?.lock_entity || !this.hass) return;
    if (
      this._config.require_double_tap_unlock !== false &&
      !this._controlsUnlocked
    ) {
      return;
    }
    if (!this.hass.states[this._config.lock_entity]) return;
    this.hass.callService("lock", "lock", {
      entity_id: this._config.lock_entity,
    });
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-nik-door {
      position: relative;
      padding: 12px;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-sizing: border-box;
      overflow: visible;
      cursor: default;
    }

    .warning {
      padding: 4px 0;
      color: var(--error-color);
      font-size: 14px;
    }

    .lock-hint {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(var(--color-theme, 51, 51, 51), 0.12);
      display: grid;
      place-items: center;
      z-index: 3;
      pointer-events: none;
    }

    .lock-hint ha-icon {
      --mdc-icon-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.55);
    }

    /* icon_more_info + icon_info: 'i n' / 'i l', height = icon 42px */
    .header {
      display: grid;
      grid-template-areas:
        "i n"
        "i l";
      grid-template-columns: min-content auto;
      grid-template-rows: 1fr 1fr;
      height: 42px;
      width: 100%;
      min-width: 0;
      column-gap: 0;
      align-content: stretch;
    }

    .icon-wrap {
      grid-area: i;
      position: relative;
      width: 42px;
      height: 42px;
      place-self: center;
    }

    .door-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .door-icon ha-icon {
      --mdc-icon-size: 20px;
    }

    /* YAML: left 30px; top 24px; 18×18 on icon_more_info */
    .bat-badge {
      position: absolute;
      left: 26px;
      top: 24px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .bat-badge ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }

    .door-name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      min-width: 0;
    }

    .door-state {
      grid-area: l;
      align-self: start;
      justify-self: start;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      min-width: 0;
    }

    .widgets {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      width: 100%;
    }

    .widgets.disabled {
      opacity: 0.45;
    }

    /* widget_icon */
    .widget {
      border: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: none;
      box-sizing: border-box;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .widget:disabled {
      cursor: not-allowed;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
}
