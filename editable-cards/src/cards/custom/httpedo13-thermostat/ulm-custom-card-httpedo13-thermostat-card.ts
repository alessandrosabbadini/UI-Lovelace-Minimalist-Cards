/**
 * Lit port of custom_cards/custom_card_httpedo13_thermostat/
 * Default layout: custom_card_httpedo13_thermostat_with_buttons —
 * header (heat/off toggle, orange when heating) + current temp | −/target/+.
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

const HEATING_ORANGE = "#ff8100";

export interface UlmCustomHttpedo13ThermostatCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-httpedo13-thermostat-card";
  entity: string;
  name?: string;
  temp_step?: number;
  collapse?: boolean;
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

function asNum(raw: unknown): number | undefined {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : undefined;
}

function configEntity(c: Record<string, unknown>): string | undefined {
  const vars = c.variables as Record<string, unknown> | undefined;
  return (
    asStr(pick(c, "entity")) ||
    asStr(vars?.entity) ||
    asStr(pick(c, "ulm_custom_card_httpedo13_thermostat_entity"))
  );
}

function configName(c: Record<string, unknown>): string | undefined {
  const vars = c.variables as Record<string, unknown> | undefined;
  return (
    asStr(pick(c, "name")) ||
    asStr(vars?.name) ||
    asStr(pick(c, "ulm_custom_card_httpedo13_thermostat_name"))
  );
}

@customElement("ulm-custom-card-httpedo13-thermostat-card")
export class UlmCustomHttpedo13ThermostatCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomHttpedo13ThermostatCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "climate"),
        textField("name"),
        numberField("temp_step"),
        booleanField("collapse"),
      ],
      computeLabel: labels({
        entity: "Climate entity",
        name: "Name",
        temp_step: "Temperature step",
        collapse: "Collapse controls when off",
      }),
      computeHelper: helpers({
        entity: "Legacy: variables.entity",
        name: "Legacy: variables.name — defaults to entity id",
        temp_step: "± step for minus/plus (default 0.5)",
        collapse: "Hide temperature row unless HVAC mode is heat",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomHttpedo13ThermostatCardConfig> {
    return {
      entity: "climate.thermostat",
      name: "Thermostat",
      temp_step: 0.5,
      collapse: false,
    };
  }

  public setConfig(config: UlmCustomHttpedo13ThermostatCardConfig): void {
    const c = config as UlmCustomHttpedo13ThermostatCardConfig &
      Record<string, unknown>;
    const entity = configEntity(c);
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: configName(c),
      temp_step: asNum(pick(c, "temp_step")),
      collapse: Boolean(pick(c, "collapse")),
      type: "custom:ulm-custom-card-httpedo13-thermostat-card",
    };
  }

  public getCardSize(): number {
    if (!this._config || !this.hass) return 2;
    const stateObj = this.hass.states[this._config.entity];
    if (this._config.collapse && stateObj?.state !== "heat") return 1;
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
        <ha-card class="ulm-card ulm-httpedo13-thermostat">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const heating = stateObj.attributes.hvac_action === "heating";
    const on = stateObj.state !== "off";
    const showControls =
      !this._config.collapse || stateObj.state === "heat";
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      this._config.entity;
    const stateLabel =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const icon = heating ? "mdi:radiator" : "mdi:radiator-off";
    const rgbRed = resolveThemeRgb(this, "red");

    const cardBg = heating ? HEATING_ORANGE : undefined;
    const cardStyle = cardBg ? { backgroundColor: cardBg } : {};
    const lightOnHeat = heating
      ? { color: "var(--card-background-color, #fafafa)" }
      : {};
    const iconStyle = heating
      ? {
          color: `rgba(${rgbRed}, 1)`,
          backgroundColor: "var(--card-background-color, #fafafa)",
        }
      : on
        ? {
            color: `rgba(${rgbRed}, 1)`,
            backgroundColor: `rgba(${rgbRed}, 0.2)`,
          }
        : {
            color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
            backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
          };

    const current = stateObj.attributes.current_temperature;
    const currentLabel =
      current == null ? "-°C" : `${current}°C`;
    const target = stateObj.attributes.temperature;
    const targetLabel = target == null ? "-°C" : `${target}°C`;

    const widgetBg = heating
      ? "var(--card-background-color, #fafafa)"
      : "rgba(var(--color-theme, 51, 51, 51), 0.05)";
    const widgetIconColor = heating
      ? "rgba(var(--color-theme, 51, 51, 51), 0.9)"
      : "rgba(var(--color-theme, 51, 51, 51), 0.9)";
    const widgetStyle = {
      backgroundColor: widgetBg,
      color: widgetIconColor,
    };
    const readoutStyle = heating
      ? {
          backgroundColor: HEATING_ORANGE,
          color: "var(--card-background-color, #fafafa)",
          fontWeight: "bold" as const,
        }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-httpedo13-thermostat": true,
          heating,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="stack">
          <div class="favorite">
            <div
              class="row icon-info header"
              role="button"
              tabindex="0"
              @click=${() => this._toggleHeat()}
              @keydown=${(ev: KeyboardEvent) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault();
                  this._toggleHeat();
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
                  this._toggleHeat();
                }}
              >
                <ha-icon .icon=${icon}></ha-icon>
              </button>
              <div class="info-btn">
                <div class="name" style=${styleMap(lightOnHeat)}>${name}</div>
                <div class="label" style=${styleMap(lightOnHeat)}>
                  ${stateLabel}
                </div>
              </div>
            </div>
            <div class="current-temp" style=${styleMap(readoutStyle)}>
              ${currentLabel}
            </div>
          </div>

          ${showControls
            ? html`
                <div class="controls">
                  <button
                    class="widget-btn"
                    type="button"
                    style=${styleMap(widgetStyle)}
                    aria-label="Decrease temperature"
                    @click=${() => this._adjustTemp(-1)}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <div class="temp-readout" style=${styleMap(readoutStyle)}>
                    ${targetLabel}
                  </div>
                  <button
                    class="widget-btn"
                    type="button"
                    style=${styleMap(widgetStyle)}
                    aria-label="Increase temperature"
                    @click=${() => this._adjustTemp(1)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _toggleHeat() {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const next =
      stateObj.state === "off"
        ? "heat"
        : stateObj.state === "heat"
          ? "off"
          : "heat";
    this.hass.callService("climate", "set_hvac_mode", {
      entity_id: this._config.entity,
      hvac_mode: next,
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-httpedo13-thermostat {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
      display: block;
      box-sizing: border-box;
      transition: background-color 0.2s ease;
    }

    ha-card.ulm-card.ulm-httpedo13-thermostat > .stack {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: 0;
    }

    .favorite {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      align-items: center;
      width: 100%;
    }

    .favorite .header {
      grid-column: 1 / span 2;
      min-width: 0;
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .current-temp {
      grid-column: 3;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      text-align: center;
      line-height: 1;
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
      place-self: center;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: transparent;
      box-shadow: none;
      padding: 0;
      text-align: center;
      line-height: 1;
    }

    /* Override ulmCardStyles .label opacity when heating (white on orange) */
    ha-card.heating .header .name,
    ha-card.heating .header .label {
      opacity: 1;
      filter: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-httpedo13-thermostat-card": UlmCustomHttpedo13ThermostatCard;
  }
}
