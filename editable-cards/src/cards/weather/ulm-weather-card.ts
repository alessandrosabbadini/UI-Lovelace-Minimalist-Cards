/**
 * Native Lit port of card_weather.yaml (simple-weather-card layout, no dependency).
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
  textField,
} from "../../shared/config-form";
import { ulmTokens } from "../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

export interface UlmWeatherCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-weather-card";
  entity: string;
  name?: string;
  primary_info?: string | string[] | false;
  secondary_info?: string | string[] | false;
  backdrop?:
    | boolean
    | { fade?: boolean; day?: string; night?: string; text?: string };
  custom?: Array<Record<string, string>> | string;
}

const WEATHER_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
  exceptional: "mdi:weather-sunny-alert",
};

/** MDI icons for primary/secondary info (previous look the user preferred) */
const INFO_MDI: Record<string, string> = {
  precipitation: "mdi:weather-rainy",
  precipitation_probability: "mdi:weather-rainy",
  humidity: "mdi:water-percent",
  wind_speed: "mdi:weather-windy",
  wind_bearing: "mdi:compass",
  pressure: "mdi:gauge",
};

const WIND_DIRS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

function parseInfoList(raw: unknown, fallback: string[]): string[] {
  if (raw === false || raw === "false") return [];
  if (raw == null || raw === "") return fallback;
  if (Array.isArray(raw)) {
    return raw.map(String).map((s) => s.trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter((s) => s && s !== "false");
  }
  return fallback;
}

function parseCustom(raw: unknown): Array<Record<string, string>> {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as Array<Record<string, string>>;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

@customElement("ulm-weather-card")
export class UlmWeatherCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmWeatherCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "weather"),
        textField("name"),
        textField("primary_info"),
        textField("secondary_info"),
        booleanField("backdrop"),
        booleanField("backdrop_fade"),
        textField("custom"),
      ],
      computeLabel: labels({
        entity: "Weather entity",
        name: "Name (ulm_card_weather_name)",
        primary_info: "Primary info (ulm_card_weather_primary_info)",
        secondary_info: "Secondary info (ulm_card_weather_secondary_info)",
        backdrop: "Backdrop (ulm_card_weather_backdrop)",
        backdrop_fade: "Backdrop fade",
        custom: "Custom overrides (ulm_card_weather_custom)",
      }),
      computeHelper: helpers({
        primary_info:
          'Comma-separated: extrema, humidity, wind_speed, … — or "false" to hide.',
        secondary_info:
          'Comma-separated: precipitation, precipitation_probability, … — or "false".',
        custom:
          'JSON array of overrides, e.g. [{"temp":"sensor.temperature"}].',
      }),
    };
  }

  public static getStubConfig(): Partial<UlmWeatherCardConfig> {
    return {
      entity: "weather.demo_weather_north",
      primary_info: "extrema",
      secondary_info: "precipitation",
      backdrop: false,
    };
  }

  public setConfig(config: UlmWeatherCardConfig): void {
    const c = config as UlmWeatherCardConfig & Record<string, unknown>;
    if (!config.entity && !c.ulm_card_weather_entity) {
      throw new Error("Please define an entity");
    }
    const backdropRaw =
      config.backdrop ?? c.ulm_card_weather_backdrop ?? false;
    let backdrop: UlmWeatherCardConfig["backdrop"] = backdropRaw as
      | boolean
      | UlmWeatherCardConfig["backdrop"];
    if (c.backdrop_fade && backdrop === true) {
      backdrop = { fade: true };
    } else if (
      c.backdrop_fade &&
      backdrop &&
      typeof backdrop === "object"
    ) {
      backdrop = { ...backdrop, fade: true };
    }

    const primary =
      (config.primary_info as UlmWeatherCardConfig["primary_info"]) ??
      (c.ulm_card_weather_primary_info as
        | UlmWeatherCardConfig["primary_info"]
        | undefined) ??
      "extrema";
    const secondary =
      (config.secondary_info as UlmWeatherCardConfig["secondary_info"]) ??
      (c.ulm_card_weather_secondary_info as
        | UlmWeatherCardConfig["secondary_info"]
        | undefined) ??
      "precipitation";

    this._config = {
      ...config,
      entity: config.entity || (c.ulm_card_weather_entity as string),
      name: config.name ?? (c.ulm_card_weather_name as string | undefined),
      primary_info: primary,
      secondary_info: secondary,
      backdrop,
      custom:
        config.custom ??
        (c.ulm_card_weather_custom as UlmWeatherCardConfig["custom"]),
      type: "custom:ulm-weather-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    // Content-sized like simple-weather-card (omit rows to avoid empty bottom gap)
    return {
      columns: 12,
      min_columns: 6,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-weather"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const customMap = this._customMap();
    const name =
      this._config.name ??
      stateObj.attributes.friendly_name ??
      stateObj.entity_id;
    const iconState = customMap["icon-state"]?.state || stateObj.state;
    const icon = WEATHER_ICONS[iconState] || "mdi:weather-partly-cloudy";
    const temp = this._attr(stateObj, "temp", customMap);
    const condition = this._localizeState(stateObj);
    const primary = parseInfoList(this._config.primary_info, ["extrema"]);
    const secondary = parseInfoList(this._config.secondary_info, [
      "precipitation",
    ]);
    const night = this._isNight();
    const bg = this._backdropStyle();
    const hasBackdrop = !!this._config.backdrop;
    const fade =
      typeof this._config.backdrop === "object" &&
      !!this._config.backdrop.fade;

    return html`
      <ha-card
        class=${classMap({
          "ulm-weather": true,
          backdrop: hasBackdrop,
          fade,
          night: hasBackdrop && night,
        })}
        style=${styleMap(bg)}
        @click=${this._moreInfo}
      >
        <ha-icon class="weather-icon" .icon=${icon}></ha-icon>

        <div class="weather-info">
          <div class="row title">
            ${temp != null
              ? html`<span class="temp"
                  >${temp}${this._tempUnit(stateObj)}</span
                >`
              : nothing}
            ${name && String(name).trim()
              ? html`<span class="name">${name}</span>`
              : nothing}
          </div>
          <div class="row state">${condition}</div>
        </div>

        ${primary.length || secondary.length
          ? html`
              <div class="weather-info add">
                ${[...primary, ...secondary].map((a) =>
                  this._renderInfo(stateObj, a, customMap),
                )}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  private _localizeState(stateObj: HassEntity): string {
    const key = `component.weather.entity_component._.state.${stateObj.state}`;
    const localized = this.hass?.localize?.(key);
    if (localized && localized !== key) return localized;
    return (
      stateObj.state.charAt(0).toUpperCase() +
      stateObj.state.slice(1).replace(/-/g, " ")
    );
  }

  private _isNight(): boolean {
    const sun = this.hass?.states["sun.sun"];
    return sun?.state === "below_horizon";
  }

  private _customMap(): Record<string, { state: string; unit?: string }> {
    const list = parseCustom(this._config?.custom);
    const map: Record<string, { state: string; unit?: string }> = {};
    if (!this.hass) return map;
    for (const ele of list) {
      const [key, sensor] = Object.entries(ele)[0] || [];
      if (!key || !sensor) continue;
      if (!sensor.includes(".")) {
        map[key] = { state: sensor };
        continue;
      }
      const entry = this.hass.states[sensor];
      if (!entry) continue;
      map[key] = {
        state: entry.state,
        unit: entry.attributes.unit_of_measurement as string | undefined,
      };
    }
    return map;
  }

  private _forecastDay(
    stateObj: HassEntity,
  ): Record<string, unknown> | undefined {
    const f = stateObj.attributes.forecast;
    if (!Array.isArray(f) || !f.length) return undefined;
    return f[0] as Record<string, unknown>;
  }

  private _attr(
    stateObj: HassEntity,
    key: string,
    custom: Record<string, { state: string; unit?: string }>,
  ): string | number | undefined {
    if (custom[key]?.state != null) return custom[key].state;
    if (key === "temp" || key === "temperature") {
      return stateObj.attributes.temperature as number | undefined;
    }
    if (key === "state") return this._localizeState(stateObj);
    if (key === "high") {
      const day = this._forecastDay(stateObj);
      const n = Number(day?.temperature);
      return Number.isNaN(n) ? undefined : n;
    }
    if (key === "low") {
      const day = this._forecastDay(stateObj);
      const n = Number(day?.templow);
      return Number.isNaN(n) ? undefined : n;
    }
    if (key === "precipitation") {
      const day = this._forecastDay(stateObj);
      if (day?.precipitation != null) {
        return Math.round(Number(day.precipitation) * 100) / 100;
      }
      const attr = stateObj.attributes.precipitation;
      return attr != null ? Number(attr) : undefined;
    }
    if (key === "precipitation_probability") {
      const day = this._forecastDay(stateObj);
      const n = Number(
        day?.precipitation_probability ??
          stateObj.attributes.precipitation_probability,
      );
      return Number.isNaN(n) ? undefined : n;
    }
    if (key === "wind_bearing") {
      const bearing = stateObj.attributes.wind_bearing;
      if (bearing == null || bearing === "undefined") return undefined;
      if (typeof bearing === "string") return bearing;
      const dir = Math.floor(Number(bearing) / 22.5 + 0.5);
      return WIND_DIRS[dir % 16];
    }
    if (key === "wind_speed") {
      return (stateObj.attributes.wind_speed as number | undefined) ?? 0;
    }
    if (key === "humidity") {
      return (stateObj.attributes.humidity as number | undefined) ?? 0;
    }
    if (key === "pressure") {
      return (stateObj.attributes.pressure as number | undefined) ?? 0;
    }
    return stateObj.attributes[key] as string | number | undefined;
  }

  private _renderInfo(
    stateObj: HassEntity,
    attr: string,
    custom: Record<string, { state: string; unit?: string }>,
  ) {
    if (attr === "extrema") {
      const low = this._attr(stateObj, "low", custom);
      const high = this._attr(stateObj, "high", custom);
      if (low == null && high == null) return nothing;
      const text = `${low != null ? `${low}${this._tempUnit(stateObj)}` : ""}${
        low != null && high != null ? " / " : ""
      }${high != null ? `${high}${this._tempUnit(stateObj)}` : ""}`;
      return html`<span class="info-icon"></span
        ><span class="info-val">${text}</span>`;
    }
    const value = this._attr(stateObj, attr, custom);
    if (value == null || value === "") return nothing;
    const unit = custom[attr]?.unit || this._unitFor(attr, stateObj);
    const mdi = INFO_MDI[attr];
    return html`
      ${mdi
        ? html`<ha-icon class="info-icon" .icon=${mdi}></ha-icon>`
        : html`<span class="info-icon"></span>`}
      <span class="info-val">${value}${unit}</span>
    `;
  }

  private _unitFor(attr: string, stateObj: HassEntity): string {
    if (attr === "humidity" || attr === "precipitation_probability") return "%";
    if (attr === "pressure") {
      return (
        (stateObj.attributes.pressure_unit as string | undefined) || " hPa"
      );
    }
    if (attr === "wind_speed") {
      const u =
        (stateObj.attributes.wind_speed_unit as string | undefined) || "km/h";
      return u.startsWith(" ") ? u : ` ${u}`;
    }
    if (attr === "precipitation") {
      const u =
        (stateObj.attributes.precipitation_unit as string | undefined) || "mm";
      return u.startsWith(" ") ? u : ` ${u}`;
    }
    return "";
  }

  private _tempUnit(stateObj: HassEntity): string {
    return (
      (stateObj.attributes.temperature_unit as string | undefined) || "°C"
    );
  }

  private _backdropStyle(): Record<string, string> {
    const bd = this._config?.backdrop;
    if (!bd) return {};
    if (bd === true) {
      return {
        "--day-color": "#45aaf2",
        "--night-color": "#a55eea",
        "--text-color": "var(--text-dark-color, #fff)",
      };
    }
    return {
      "--day-color": bd.day || "#45aaf2",
      "--night-color": bd.night || "#a55eea",
      "--text-color": bd.text || "var(--text-dark-color, #fff)",
    };
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
    ${ulmTokens}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    /* card_weather.yaml card_mod + simple-weather-card defaults */
    ha-card.ulm-weather {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: flex;
      flex-flow: row;
      align-items: center;
      border-radius: 14px;
      box-shadow: var(--ulm-shadow);
      border: none;
      padding: 24px;
      overflow: hidden;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      font-weight: 400;
      cursor: pointer;
      transition: background 1s;
    }

    ha-card.ulm-weather.backdrop {
      font-weight: 500;
      background: var(--day-color, #45aaf2);
      color: var(--text-color, #fff);
    }

    ha-card.ulm-weather.backdrop.night {
      background: var(--night-color, #a55eea);
    }

    ha-card.ulm-weather.backdrop.fade {
      background: linear-gradient(var(--day-color, #45aaf2), transparent 250%);
    }

    ha-card.ulm-weather.backdrop.fade.night {
      background: linear-gradient(
        var(--night-color, #a55eea) 0%,
        transparent 300%
      );
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    .weather-icon {
      height: 40px;
      width: 40px;
      --mdc-icon-size: 40px;
      flex: 0 0 40px;
      margin-right: 16px;
    }

    .weather-info {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      min-height: 42px;
      min-width: 0;
    }

    /*
     * 2-column grid keeps icons/values aligned; MDI size ~1em like before.
     */
    .weather-info.add {
      display: grid;
      grid-template-columns: 1em max-content;
      column-gap: 0.25em;
      row-gap: 0.15em;
      align-items: center;
      justify-content: end;
      margin-left: auto;
      padding-left: 8px;
      font-size: 1rem;
      line-height: 1em;
    }

    .weather-info.add .info-icon {
      width: 1em;
      height: 1em;
      justify-self: center;
      align-self: center;
      color: inherit;
    }

    ha-icon.info-icon {
      --mdc-icon-size: 1em;
      --ha-icon-display: flex;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
    }

    .weather-info.add span.info-icon {
      width: 1em;
      height: 1em;
    }

    .weather-info.add .info-val {
      display: flex;
      align-items: center;
      height: 1em;
      font-size: 1em;
      line-height: 1em;
      white-space: nowrap;
      color: inherit;
    }

    .row {
      display: flex;
      align-items: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      gap: 0.35em;
    }

    .name,
    .state {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      text-transform: capitalize;
    }
  `;
}
