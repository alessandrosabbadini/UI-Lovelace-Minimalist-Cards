import { html, type TemplateResult } from "lit";
import type { HomeAssistant } from "../../types";
import type { PopupContext, WeatherView } from "../types";
import {
  capitalize,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";

export type WeatherForecastDay = {
  condition?: string;
  datetime?: string;
  temperature?: number;
  templow?: number;
  [key: string]: unknown;
};

const CONDITION_ICONS: Record<string, string> = {
  clear: "mdi:weather-sunny",
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

/** Legacy popup_weather_row icon colors */
const CONDITION_COLOR: Record<string, string> = {
  "clear-night": "yellow",
  cloudy: "blue",
  exceptional: "red",
  fog: "grey",
  hail: "blue",
  lightning: "blue",
  "lightning-rainy": "blue",
  partlycloudy: "yellow",
  pouring: "grey",
  rainy: "blue",
  snowy: "blue",
  "snowy-rainy": "blue",
  sunny: "yellow",
  windy: "grey",
  clear: "yellow",
};

export function defaultWeatherView(): WeatherView {
  return "forecast";
}

/**
 * Modern HA no longer puts forecast on entity attributes.
 * Prefer weather.get_forecasts (daily), fall back to attributes.forecast.
 */
export async function fetchWeatherForecast(
  hass: HomeAssistant,
  entityId: string,
): Promise<WeatherForecastDay[]> {
  const fromAttrs = hass.states?.[entityId]?.attributes?.forecast;
  if (Array.isArray(fromAttrs) && fromAttrs.length) {
    return fromAttrs as WeatherForecastDay[];
  }

  const callWS = (
    hass as HomeAssistant & {
      callWS?: (msg: Record<string, unknown>) => Promise<unknown>;
    }
  ).callWS;
  if (!callWS) return [];

  const pick = (raw: unknown): WeatherForecastDay[] => {
    if (!raw || typeof raw !== "object") return [];
    const obj = raw as Record<string, unknown>;
    // weather/get_forecasts → { [entity_id]: { forecast: [] } }
    const byId = obj[entityId] as { forecast?: WeatherForecastDay[] } | undefined;
    if (Array.isArray(byId?.forecast) && byId.forecast.length) return byId.forecast;
    // call_service return_response → { response: { [entity_id]: { forecast } } }
    const resp = obj.response as
      | Record<string, { forecast?: WeatherForecastDay[] }>
      | undefined;
    const nested = resp?.[entityId]?.forecast;
    if (Array.isArray(nested) && nested.length) return nested;
    return [];
  };

  // Preferred modern HA WS API
  try {
    const list = pick(
      await callWS({
        type: "weather/get_forecasts",
        entity_id: entityId,
        forecast_type: "daily",
      }),
    );
    if (list.length) return list;
  } catch {
    /* fall through */
  }

  try {
    const list = pick(
      await callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        target: { entity_id: entityId },
        service_data: { type: "daily" },
        return_response: true,
      }),
    );
    if (list.length) return list;
  } catch {
    /* fall through */
  }

  try {
    const list = pick(
      await callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { entity_id: entityId, type: "daily" },
        return_response: true,
      }),
    );
    if (list.length) return list;
  } catch {
    /* ignore */
  }
  return [];
}

export function renderWeather(
  ctx: PopupContext,
  forecast: WeatherForecastDay[] = [],
  forecastLoading = false,
): TemplateResult {
  const view = (ctx.view === "main" ? "forecast" : ctx.view) as WeatherView;
  return view === "radar"
    ? renderRadar(ctx)
    : renderForecast(ctx, forecast, forecastLoading);
}

function weatherHeader(ctx: PopupContext) {
  const s = ctx.stateObj;
  return renderPopupHeader({
    name: s.attributes.friendly_name || ctx.entity,
    label: capitalize(s.state),
    icon:
      CONDITION_ICONS[s.state] ||
      (s.attributes.icon as string) ||
      "mdi:weather-partly-cloudy",
  });
}

function renderForecast(
  ctx: PopupContext,
  forecastIn: WeatherForecastDay[],
  forecastLoading: boolean,
): TemplateResult {
  const attrs = ctx.stateObj.attributes;
  const unitShort = "°";

  const start =
    ctx.opts.suppress_first_forecast ||
    (ctx.opts as { surpress_first_forecast?: boolean }).surpress_first_forecast
      ? 1
      : 0;
  const forecast = forecastIn.slice(start, start + 6);
  const low0 = forecast[0]?.templow;
  const high0 = forecast[0]?.temperature;

  return html`<div class="ulm-grid weather-popup weather-forecast-view">
    <div class="area-header">${weatherHeader(ctx)}</div>
    <div class="area-body weather-forecast-body">
      <div class="weather-forecast-panel">
        <div class="forecast-hero">
          <span class="forecast-temp"
            >${attrs.temperature ?? "—"}${unitShort}</span
          >
          <div class="forecast-minmax muted">
            ${low0 != null || high0 != null
              ? `Max. ${high0 ?? "—"}${unitShort} Min. ${low0 ?? "—"}${unitShort}`
              : capitalize(ctx.stateObj.state)}
          </div>
        </div>
        <div class="forecast-list">
          ${forecastLoading && !forecast.length
            ? html`<div class="muted">Loading forecast…</div>`
            : nothingOrRows(forecast, unitShort)}
        </div>
      </div>
    </div>
    <div class="area-side weather-radar-side">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="weather-radar"
      ></div>
      <div class="ulm-embed-fallback">${radarIframe(ctx)}</div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row weather-mode-row">
        ${renderPopupButton({
          icon: "mdi:calendar-month",
          name: "Forecast",
          variant: "selected",
          onClick: () => ctx.setView("forecast"),
        })}
        ${renderPopupButton({
          icon: "mdi:radar",
          name: "Radar",
          onClick: () => ctx.setView("radar"),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({ onBack: ctx.goBack })}
    </div>
  </div>`;
}

function nothingOrRows(
  forecast: WeatherForecastDay[],
  unitShort: string,
): TemplateResult {
  if (!forecast.length) {
    return html`<div class="muted">No forecast available</div>`;
  }
  return html`${forecast.map((d) => forecastRow(d, unitShort))}`;
}

function forecastRow(
  d: WeatherForecastDay,
  unitShort: string,
): TemplateResult {
  const cond = String(d.condition || "");
  const color = CONDITION_COLOR[cond] || "grey";
  return html`<div class="forecast-row weather-day">
    <div class="left">
      <span
        class="weather-cond-icon"
        style=${`--cond-rgb: var(--ulm-color-${color}, var(--color-${color}, 158, 158, 158))`}
      >
        <ha-icon
          .icon=${CONDITION_ICONS[cond] || "mdi:weather-partly-cloudy"}
        ></ha-icon>
      </span>
      <span class="weather-day-label">${formatLabel(d)}</span>
    </div>
    <div class="temp-pills">
      <span class="pill low">${d.templow ?? "—"}${unitShort}</span>
      <span class="pill high">${d.temperature ?? "—"}${unitShort}</span>
    </div>
  </div>`;
}

function renderRadar(ctx: PopupContext): TemplateResult {
  return html`<div class="ulm-grid weather-popup weather-radar-view">
    <div class="area-header">${weatherHeader(ctx)}</div>
    <div class="area-body weather-radar-body">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="weather-radar"
      ></div>
      <div class="ulm-embed-fallback">${radarIframe(ctx)}</div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row weather-mode-row">
        ${renderPopupButton({
          icon: "mdi:calendar-month",
          name: "Forecast",
          onClick: () => ctx.setView("forecast"),
        })}
        ${renderPopupButton({
          icon: "mdi:radar",
          name: "Radar",
          variant: "selected",
          onClick: () => ctx.setView("radar"),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({ onBack: ctx.goBack })}
    </div>
  </div>`;
}

function radarIframe(ctx: PopupContext) {
  const lat = Number(ctx.stateObj.attributes.latitude);
  const lon = Number(ctx.stateObj.attributes.longitude);
  const src =
    Number.isFinite(lat) && Number.isFinite(lon)
      ? `https://www.rainviewer.com/map.html?loc=${lat},${lon},9&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&c=1&o=83&sm=1&md=0&ul=0&pl=1&lm=1`
      : "https://www.rainviewer.com/map.html?c=1&o=83&sm=1";
  return html`<iframe
    class="radar-frame"
    src=${src}
    title="Weather radar"
    loading="lazy"
    referrerpolicy="no-referrer"
  ></iframe>`;
}

function formatLabel(d: WeatherForecastDay): string {
  const dt = d.datetime;
  if (typeof dt === "string" && dt) {
    const date = new Date(dt);
    if (!Number.isNaN(date.getTime())) {
      // Legacy popup_weather_row uses weekday: 'long'
      return date.toLocaleDateString(undefined, { weekday: "long" });
    }
    return dt.slice(0, 10);
  }
  return String(d.condition || "—");
}
