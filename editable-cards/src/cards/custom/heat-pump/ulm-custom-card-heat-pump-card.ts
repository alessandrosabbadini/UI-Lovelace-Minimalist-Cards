/**
 * Lit port of custom_cards/custom_card_heat_pump/
 * Climate: icon_info header (mode-colored) + temp −/value/+ + HVAC mode buttons.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomHeatPumpCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-heat-pump-card";
  entity: string;
  name?: string;
  temp_step?: number;
}

type HvacMode =
  | "off"
  | "heat"
  | "cool"
  | "heat_cool"
  | "dry"
  | "fan_only";

const MODE_BUTTONS: { mode: HvacMode; icon: string }[] = [
  { mode: "off", icon: "mdi:power" },
  { mode: "heat", icon: "mdi:fire" },
  { mode: "cool", icon: "mdi:snowflake" },
  { mode: "heat_cool", icon: "mdi:sync" },
  { mode: "dry", icon: "mdi:water" },
  { mode: "fan_only", icon: "mdi:fan" },
];

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

function asNum(raw: unknown): number | undefined {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : undefined;
}

function headerIcon(state: string): string {
  switch (state) {
    case "dry":
      return "mdi:water";
    case "heat":
      return "mdi:fire";
    case "cool":
      return "mdi:snowflake";
    case "fan_only":
      return "mdi:fan";
    case "heat_cool":
      return "mdi:sync";
    default:
      return "mdi:thermostat";
  }
}

function headerIconStyle(
  host: HTMLElement,
  state: string,
): Record<string, string> {
  switch (state) {
    case "dry":
      return {
        color: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
      };
    case "cool":
      return {
        color: `rgba(${resolveThemeRgb(host, "blue")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "blue")}, 0.2)`,
      };
    case "heat":
      return {
        color: `rgba(${resolveThemeRgb(host, "red")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "red")}, 0.2)`,
      };
    case "fan_only":
      return {
        color: "rgba(195, 0, 255, 1)",
        backgroundColor: "rgba(195, 0, 255, 0.2)",
      };
    case "heat_cool":
      return {
        color: `rgba(${resolveThemeRgb(host, "green")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "green")}, 0.2)`,
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
  }
}

function modeButtonStyle(
  host: HTMLElement,
  mode: HvacMode,
  active: boolean,
): Record<string, string> {
  if (!active) {
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
  }
  switch (mode) {
    case "heat":
      return {
        color: `rgba(${resolveThemeRgb(host, "red")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "red")}, 0.2)`,
      };
    case "cool":
      return {
        color: `rgba(${resolveThemeRgb(host, "blue")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "blue")}, 0.2)`,
      };
    case "heat_cool":
      return {
        color: `rgba(${resolveThemeRgb(host, "green")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "green")}, 0.2)`,
      };
    case "dry":
      return {
        color: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
      };
    case "fan_only":
      return {
        color: "rgba(195, 0, 255, 1)",
        backgroundColor: "rgba(195, 0, 255, 0.2)",
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
  }
}

@customElement("ulm-custom-card-heat-pump-card")
export class UlmCustomHeatPumpCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomHeatPumpCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "climate"),
        textField("name"),
        numberField("temp_step"),
      ],
      computeLabel: labels({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step",
      }),
      computeHelper: helpers({
        entity: "Heat pump / climate entity",
        name: "Display name (defaults to friendly_name)",
        temp_step:
          "± step for minus/plus. Default: entity target_temp_step, else 0.5",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomHeatPumpCardConfig> {
    return {
      entity: "climate.heat_pump",
    };
  }

  public setConfig(config: UlmCustomHeatPumpCardConfig): void {
    const c = config as UlmCustomHeatPumpCardConfig & Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      temp_step: asNum(pick(c, "temp_step")),
      type: "custom:ulm-custom-card-heat-pump-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 3,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-heat-pump">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const mode = stateObj.state;
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const stateLabel =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const hvacAction = stateObj.attributes.hvac_action as string | undefined;
    const label =
      stateObj.attributes.temperature != null
        ? `${stateObj.attributes.current_temperature ?? "—"}° • ${stateLabel}${hvacAction ? ` (${hvacAction})` : ""}`
        : stateLabel;
    const temp = stateObj.attributes.temperature;
    const tempLabel =
      temp == null || temp === "" ? "-°C" : `${temp}°C`;

    return html`
      <ha-card class="ulm-card ulm-heat-pump">
        <div class="stack">
          <div
            class="row icon-info"
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo()}
            @keydown=${(ev: KeyboardEvent) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                this._moreInfo();
              }
            }}
          >
            <button
              class="icon-btn"
              type="button"
              style=${styleMap(headerIconStyle(this, mode))}
              tabindex="-1"
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this._moreInfo();
              }}
            >
              <ha-icon .icon=${headerIcon(mode)}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name">${name}</div>
              <div class="label">${label}</div>
            </div>
          </div>

          <div class="controls">
            <button
              class="widget-btn"
              type="button"
              aria-label="Decrease temperature"
              @click=${() => this._adjustTemp(-1)}
            >
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="temp-readout">${tempLabel}</div>
            <button
              class="widget-btn"
              type="button"
              aria-label="Increase temperature"
              @click=${() => this._adjustTemp(1)}
            >
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>

          <div class="modes">
            ${MODE_BUTTONS.map(
              ({ mode: m, icon }) => html`
                <button
                  class="widget-btn mode"
                  type="button"
                  aria-label=${m}
                  style=${styleMap(
                    modeButtonStyle(this, m, mode === m),
                  )}
                  @click=${() => this._setMode(m)}
                >
                  <ha-icon .icon=${icon}></ha-icon>
                </button>
              `,
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _setMode(hvac_mode: HvacMode) {
    if (!this.hass || !this._config) return;
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode,
    });
  }

  private _adjustTemp(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const current = stateObj.attributes.temperature;
    if (current == null) return;
    const next =
      parseFloat(String(current)) + this._step(stateObj) * direction;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: next,
    });
  }

  private _step(stateObj: HassEntity): number {
    if (this._config?.temp_step != null && this._config.temp_step > 0) {
      return this._config.temp_step;
    }
    const attr = Number(stateObj.attributes.target_temp_step);
    if (!Number.isNaN(attr) && attr > 0) return attr;
    return 0.5;
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
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-heat-pump {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
      display: block;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-heat-pump > .stack {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }

    .icon-info {
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      box-shadow: none;
      background: transparent;
    }

    .modes {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 7px;
      width: 100%;
    }

    .widget-btn.mode {
      width: 100%;
      place-self: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-heat-pump-card": UlmCustomHeatPumpCard;
  }
}
