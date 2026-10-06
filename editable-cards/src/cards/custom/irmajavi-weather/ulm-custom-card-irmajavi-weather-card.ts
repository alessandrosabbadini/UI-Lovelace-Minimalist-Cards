/**
 * Lit port of custom_cards/custom_card_irmajavi_weather/
 * Weather header (emoji + date | temp chip) + 4 metric cells.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomIrmajaviWeatherCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-irmajavi-weather-card";
  /** Weather entity — also ulm_custom_card_irmajavi_weather */
  entity?: string;
  date_entity?: string;
  temperature_entity?: string;
  entity_1?: string;
  entity_2?: string;
  entity_3?: string;
  entity_4?: string;
  name_1?: string;
  name_2?: string;
  name_3?: string;
  name_4?: string;
}

const WEATHER_EMOJI: Record<string, string> = {
  "clear-night": "🌙",
  cloudy: "☁️",
  exceptional: "🌞",
  fog: "🌫️",
  hail: "⛈️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  partlycloudy: "⛅",
  pouring: "🌧️",
  rainy: "💧",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  sunny: "☀️",
  windy: "🌪️",
};

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

function weatherEmoji(condition?: string): string {
  if (!condition) return "❔";
  return WEATHER_EMOJI[condition] ?? "❔";
}

@customElement("ulm-custom-card-irmajavi-weather-card")
export class UlmCustomIrmajaviWeatherCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomIrmajaviWeatherCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "weather"),
        entityField("date_entity", ["sensor", "input_text"], false),
        entityField("temperature_entity", ["sensor"], false),
        entityField("entity_1", undefined, false),
        entityField("entity_2", undefined, false),
        entityField("entity_3", undefined, false),
        entityField("entity_4", undefined, false),
        textField("name_1"),
        textField("name_2"),
        textField("name_3"),
        textField("name_4"),
      ],
      computeLabel: labels({
        entity: "Weather entity (ulm_custom_card_irmajavi_weather)",
        date_entity: "Date label (ulm_custom_card_irmajavi_weather_date)",
        temperature_entity:
          "Outside temp (ulm_custom_card_irmajavi_weather_temperature_outside)",
        entity_1: "Metric 1 (ulm_custom_card_irmajavi_weather_entity_1)",
        entity_2: "Metric 2",
        entity_3: "Metric 3",
        entity_4: "Metric 4",
        name_1: "Metric 1 name (ulm_custom_card_irmajavi_weather_name_1)",
        name_2: "Metric 2 name",
        name_3: "Metric 3 name",
        name_4: "Metric 4 name",
      }),
      computeHelper: helpers({
        entity: "Condition state drives the header weather emoji",
        date_entity: "Shown next to emoji in the header",
        temperature_entity: "Large temp chip on the header right",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomIrmajaviWeatherCardConfig> {
    return {
      entity: "weather.home",
      date_entity: "sensor.date",
      temperature_entity: "sensor.outside_temperature",
      entity_1: "sensor.humidity",
      name_1: "Humidity",
    };
  }

  public setConfig(config: UlmCustomIrmajaviWeatherCardConfig): void {
    const c = config as UlmCustomIrmajaviWeatherCardConfig &
      Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_custom_card_irmajavi_weather"),
    );
    if (!entity) throw new Error("Please define an entity");

    const slot = (n: 1 | 2 | 3 | 4) =>
      asStr(
        pick(
          c,
          `entity_${n}`,
          `ulm_custom_card_irmajavi_weather_entity_${n}`,
        ),
      );

    this._config = {
      ...config,
      entity,
      date_entity: asStr(
        pick(c, "date_entity", "ulm_custom_card_irmajavi_weather_date"),
      ),
      temperature_entity: asStr(
        pick(
          c,
          "temperature_entity",
          "ulm_custom_card_irmajavi_weather_temperature_outside",
        ),
      ),
      entity_1: slot(1),
      entity_2: slot(2),
      entity_3: slot(3),
      entity_4: slot(4),
      name_1: asStr(
        pick(c, "name_1", "ulm_custom_card_irmajavi_weather_name_1"),
      ),
      name_2: asStr(
        pick(c, "name_2", "ulm_custom_card_irmajavi_weather_name_2"),
      ),
      name_3: asStr(
        pick(c, "name_3", "ulm_custom_card_irmajavi_weather_name_3"),
      ),
      name_4: asStr(
        pick(c, "name_4", "ulm_custom_card_irmajavi_weather_name_4"),
      ),
      type: "custom:ulm-custom-card-irmajavi-weather-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 3,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const weather = this.hass.states[cfg.entity!];
    const emoji = weatherEmoji(weather?.state);
    const dateId = cfg.date_entity;
    const dateState = dateId
      ? this.hass.states[dateId]?.state || ""
      : "";
    const headerLeft = `${emoji} ${dateState}`.trim();

    const tempId = cfg.temperature_entity;
    const tempObj = tempId ? this.hass.states[tempId] : undefined;
    const tempUnit =
      (tempObj?.attributes.unit_of_measurement as string | undefined) || "";
    const tempChip = tempObj
      ? `${tempObj.state}${tempUnit ? ` ${tempUnit}` : ""}`
      : "—";

    const metrics = ([1, 2, 3, 4] as const).map((i) => ({
      entity: cfg[`entity_${i}`],
      name: cfg[`name_${i}`],
    }));

    return html`
      <ha-card class="ulm-card ulm-irmajavi-weather">
        <div class="stack">
          <div class="header-pill">
            <div class="header-left">${headerLeft}</div>
            <div class="temp-chip">${tempChip}</div>
          </div>
          <div class="metrics">
            ${metrics.map((m) => this._metricCell(m.entity, m.name))}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _metricCell(entityId?: string, caption?: string) {
    if (!entityId) {
      return html`<div class="metric empty"></div>`;
    }
    const stateObj = this.hass!.states[entityId];
    const stateLabel = stateObj ? this._stateWithUnit(stateObj) : "—";
    return html`
      <button
        class="metric"
        type="button"
        @click=${(ev: Event) => {
          ev.stopPropagation();
          this._moreInfo(entityId);
        }}
      >
        <div class="metric-state">${stateLabel}</div>
        <div class="metric-caption">${caption || ""}</div>
      </button>
    `;
  }

  private _stateWithUnit(stateObj: HassEntity): string {
    const unit = stateObj.attributes.unit_of_measurement as string | undefined;
    const state = stateObj.state;
    return unit ? `${state} ${unit}` : state;
  }

  private _moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-irmajavi-weather {
      border-radius: 30px;
      height: 160px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .header-pill {
      border: 2px solid var(--google-grey, var(--divider-color));
      border-radius: 20px;
      height: 70px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas: "left chip";
      align-items: center;
      column-gap: 8px;
      padding: 0 10px 0 12px;
    }

    .header-left {
      grid-area: left;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0;
      line-height: 1.2;
      white-space: nowrap;
    }

    .temp-chip {
      grid-area: chip;
      justify-self: end;
      align-self: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 20px;
      /* YAML uses 10px grey border as chip padding */
      border: 10px solid var(--google-grey, var(--divider-color));
      background-color: var(--google-grey, var(--divider-color));
      color: #000;
      border-radius: 12px;
      margin: 0;
      line-height: 1;
      padding: 0;
      box-sizing: border-box;
      text-align: center;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 7px;
    }

    .metric {
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      width: 100%;
      min-width: 0;
      cursor: pointer;
      display: grid;
      grid-template-areas:
        "state"
        "caption";
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content;
      justify-items: center;
      text-align: center;
      font: inherit;
      color: inherit;
    }

    .metric.empty {
      pointer-events: none;
    }

    .metric-state {
      grid-area: state;
      margin-top: 10px;
      justify-self: center;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
      width: 100%;
    }

    .metric-caption {
      grid-area: caption;
      justify-self: center;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
      line-height: 1.2;
      text-align: center;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-irmajavi-weather-card": UlmCustomIrmajaviWeatherCard;
  }
}
