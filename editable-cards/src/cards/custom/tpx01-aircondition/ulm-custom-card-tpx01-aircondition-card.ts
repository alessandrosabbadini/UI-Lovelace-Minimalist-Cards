/**
 * Lit port of custom_cards/custom_card_tpx01_aircondition/
 * Custom-card "AirCondition" — faithful with_buttons layout:
 *   row1 list_items_favorite: icon_info (2/3) + power widget (1/3), gap 7px
 *   row2 list_3_items: minus | temp | plus, gap 7px
 *   outer row-gap 12px, padding 12px
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

export interface UlmCustomTpx01AirconditionCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-tpx01-aircondition-card";
  entity: string;
  name?: string;
  /** Override step; else entity target_temp_step / 0.5 */
  temp_step?: number;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asNum(raw: unknown): number | undefined {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : undefined;
}

function modeIcon(state: string): string {
  switch (state) {
    case "dry":
      return "mdi:water";
    case "heat":
      return "mdi:radiator";
    case "cool":
      return "mdi:snowflake";
    case "fan_only":
      return "mdi:fan";
    default:
      return "mdi:air-conditioner";
  }
}

@customElement("ulm-custom-card-tpx01-aircondition-card")
export class UlmCustomTpx01AirconditionCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomTpx01AirconditionCardConfig;

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
        entity: "Air conditioner / climate entity",
        name: "Display name",
        temp_step:
          "± step for minus/plus. Default: entity target_temp_step, else 0.5",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomTpx01AirconditionCardConfig> {
    return {
      entity: "climate.hvac",
      name: "A/C Livingroom",
    };
  }

  public setConfig(config: UlmCustomTpx01AirconditionCardConfig): void {
    const c = config as UlmCustomTpx01AirconditionCardConfig &
      Record<string, unknown>;
    const entity = (config.entity || pick(c, "entity")) as string | undefined;
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: (pick(c, "name") as string | undefined) || undefined,
      temp_step: asNum(pick(c, "temp_step")),
      type: "custom:ulm-custom-card-tpx01-aircondition-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-aircondition">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const on = stateObj.state !== "off";
    const rgb = resolveThemeRgb(this, "blue");
    const iconStyle = on
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const label =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const icon = modeIcon(stateObj.state);
    const temp = stateObj.attributes.temperature;
    const tempLabel =
      temp == null || temp === "" ? "-°C" : `${temp}°C`;

    return html`
      <ha-card class="ulm-card ulm-aircondition">
        <div class="stack">
          <!-- list_items_favorite: item1 spans 2 cols, item2 = power -->
          <div class="favorite">
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
                style=${styleMap(iconStyle)}
                tabindex="-1"
                @click=${(ev: Event) => {
                  ev.stopPropagation();
                  this._moreInfo();
                }}
              >
                <ha-icon .icon=${icon}></ha-icon>
              </button>
              <div class="info-btn">
                <div class="name">${name}</div>
                <div class="label">${label}</div>
              </div>
            </div>
            <button
              class="widget-btn power"
              type="button"
              aria-label=${on ? "Turn off" : "Turn on (cool)"}
              @click=${() => this._togglePower(on)}
            >
              <ha-icon .icon=${on ? "mdi:power-off" : "mdi:power"}></ha-icon>
            </button>
          </div>

          <!-- list_3_items / list_items: − | temp | + -->
          <div class="controls">
            <button
              class="widget-btn"
              type="button"
              aria-label="Decrease temperature"
              @click=${() => this._adjustTemp(-1)}
            >
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>
            <div class="temp-readout">${tempLabel}</div>
            <button
              class="widget-btn"
              type="button"
              aria-label="Increase temperature"
              @click=${() => this._adjustTemp(1)}
            >
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _togglePower(currentlyOn: boolean) {
    if (!this.hass || !this._config) return;
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: currentlyOn ? "off" : "cool",
    });
  }

  private _adjustTemp(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const current = stateObj.attributes.temperature;
    if (current == null) return;
    const next = parseFloat(String(current)) + this._step(stateObj) * direction;
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

    /* Outer with_buttons card — padding 12px, row-gap 12px */
    ha-card.ulm-card.ulm-aircondition {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
      display: block;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-aircondition > .stack {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }

    .warning {
      padding: 4px 0;
      color: var(--error-color);
    }

    /*
     * list_items_favorite:
     * areas "item1 item1 item2", columns 1fr 1fr 1fr, column-gap 7px
     */
    .favorite {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    /* icon_info fills the first two columns */
    .favorite .icon-info {
      grid-column: 1 / span 2;
      min-width: 0;
      /* icon_info card: padding 0, no shadow, pill radius on left */
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
    }

    .favorite .power {
      grid-column: 3;
      width: 100%;
    }

    /*
     * list_3_items (list_items):
     * columns 1fr 1fr 1fr, column-gap 7px — NOT 12px
     */
    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      row-gap: 0;
      gap: 0 7px;
      align-items: center;
      width: 100%;
    }

    /* widget_icon — shared .widget-btn already 42px / radius 14px / tint */
    .widget-btn {
      width: 100%;
      place-self: center;
    }

    /*
     * widget_temperature — label only, transparent bg, height 42px
     */
    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      width: 100%;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: transparent;
      box-shadow: none;
      padding: 0;
      text-align: center;
      line-height: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-tpx01-aircondition-card": UlmCustomTpx01AirconditionCard;
  }
}
