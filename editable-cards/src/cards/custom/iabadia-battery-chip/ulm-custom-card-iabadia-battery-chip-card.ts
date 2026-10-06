/**
 * Lit port of custom_cards/custom_card_iAbadia_battery_chip/
 * Icon-only chip: green / yellow / red by battery % thresholds.
 *
 * Tag is all-lowercase (HTML custom elements cannot contain uppercase ASCII).
 * Primary: ulm-custom-card-battery-chip-card
 * Alias:  ulm-custom-card-iabadia-battery-chip-card
 */
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  helpers,
  iconField,
  labels,
  numberField,
} from "../../../shared/config-form";
import {
  syncChipDarkMode,
  ulmChipStyles,
} from "../../../shared/chip-styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export const BATTERY_CHIP_TAG = "ulm-custom-card-battery-chip-card";
export const BATTERY_CHIP_TAG_ALIAS = "ulm-custom-card-iabadia-battery-chip-card";

export interface UlmCustomBatteryChipCardConfig extends LovelaceCardConfig {
  type:
    | "custom:ulm-custom-card-battery-chip-card"
    | "custom:ulm-custom-card-iabadia-battery-chip-card";
  entity: string;
  icon?: string;
  danger?: number;
  warning?: number;
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

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

export class UlmCustomBatteryChipCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomBatteryChipCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "sensor"),
        iconField("icon"),
        numberField("warning"),
        numberField("danger"),
      ],
      computeLabel: labels({
        entity: "Battery entity",
        icon: "Icon",
        warning: "Warning threshold %",
        danger: "Danger threshold %",
      }),
      computeHelper: helpers({
        entity: "Legacy: ulm_custom_card_iAbadia_battery_chip_entity",
        icon: "Legacy: ulm_custom_card_iAbadia_battery_chip_icon — default mdi:battery",
        warning:
          "Legacy: ulm_custom_card_iAbadia_battery_chip_warning — default 20",
        danger:
          "Legacy: ulm_custom_card_iAbadia_battery_chip_danger — default 10",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomBatteryChipCardConfig> {
    return {
      entity: "sensor.outside_temperature_battery",
      icon: "mdi:battery",
      warning: 20,
      danger: 10,
    };
  }

  public setConfig(config: UlmCustomBatteryChipCardConfig): void {
    const c = config as UlmCustomBatteryChipCardConfig & Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_custom_card_iAbadia_battery_chip_entity"),
    );
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      icon:
        asStr(pick(c, "icon", "ulm_custom_card_iAbadia_battery_chip_icon")) ||
        "mdi:battery",
      warning: asNum(
        pick(c, "warning", "ulm_custom_card_iAbadia_battery_chip_warning"),
        20,
      ),
      danger: asNum(
        pick(c, "danger", "ulm_custom_card_iAbadia_battery_chip_danger"),
        10,
      ),
      type: "custom:ulm-custom-card-battery-chip-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return {
      columns: 2,
      min_columns: 2,
      max_columns: 6,
      rows: "auto" as const,
      min_rows: 1,
    };
  }

  protected updated(): void {
    syncChipDarkMode(this, this.hass);
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<button class="chip" disabled>
        <ha-icon .icon=${"mdi:battery-alert"}></ha-icon>
      </button>`;
    }

    const level = Math.round(Number.parseFloat(stateObj.state) || 0);
    const warning = this._config.warning ?? 20;
    const danger = this._config.danger ?? 10;
    let color = "var(--google-red)";
    if (level > warning) {
      color = "var(--google-green)";
    } else if (level > danger) {
      color = "var(--google-yellow)";
    }

    const icon = this._config.icon || "mdi:battery";

    return html`
      <button class="chip" @click=${this._onTap}>
        <ha-icon .icon=${icon} style=${styleMap({ color })}></ha-icon>
      </button>
    `;
  }

  private _onTap = (ev: Event) => {
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

  static styles = [
    ulmChipStyles,
    css`
      :host {
        display: block;
        width: fit-content;
        max-width: 100%;
        height: auto !important;
        min-height: 0 !important;
        align-self: start;
        justify-self: start;
        /* Keep shadow inside host if a parent clips overflow */
        padding: 0 2px 6px;
        overflow: visible;
        box-sizing: border-box;
        line-height: 0;
        background: transparent;
        box-shadow: none;
      }

      button.chip {
        height: 36px;
        min-height: 36px;
        max-height: 36px;
        margin: 0;
        vertical-align: top;
      }
    `,
  ];
}

/** Alias class — customElements.define cannot reuse the same constructor twice. */
class UlmCustomBatteryChipCardAlias extends UlmCustomBatteryChipCard {}

if (!customElements.get(BATTERY_CHIP_TAG)) {
  customElements.define(BATTERY_CHIP_TAG, UlmCustomBatteryChipCard);
}
if (!customElements.get(BATTERY_CHIP_TAG_ALIAS)) {
  customElements.define(BATTERY_CHIP_TAG_ALIAS, UlmCustomBatteryChipCardAlias);
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-battery-chip-card": UlmCustomBatteryChipCard;
    "ulm-custom-card-iabadia-battery-chip-card": UlmCustomBatteryChipCardAlias;
  }
}
