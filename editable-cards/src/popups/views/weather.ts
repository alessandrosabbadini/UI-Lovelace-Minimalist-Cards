import { html, type TemplateResult } from "lit";
import type { PopupContext, WeatherView } from "../types";
import {
  capitalize,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";

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
  exceptional: "mdi:alert-circle-outline",
};

export function defaultWeatherView(): WeatherView {
  return "forecast";
}

export function renderWeather(ctx: PopupContext): TemplateResult {
  const view = (ctx.view === "main" ? "forecast" : ctx.view) as WeatherView;
  return view === "radar" ? renderRadar(ctx) : renderForecast(ctx);
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

function renderForecast(ctx: PopupContext): TemplateResult {
  const attrs = ctx.stateObj.attributes;
  const unit = (attrs.temperature_unit as string | undefined) || "°";
  const raw = Array.isArray(attrs.forecast)
    ? (attrs.forecast as Array<Record<string, unknown>>)
    : [];
  const start = ctx.opts.suppress_first_forecast ? 1 : 0;
  const forecast = raw.slice(start, start + 6);
  const low0 = forecast[0]?.templow;
  const high0 = forecast[0]?.temperature;

  return html`<div class="ulm-grid cols-2">
    <div class="area-header">${weatherHeader(ctx)}</div>
    <div class="area-body">
      <div>
        <div class="forecast-hero" style="font-size:60px;flex-direction:column;gap:4px">
          <span>${attrs.temperature ?? "—"}${unit}</span>
          <div class="muted" style="font-size:14px;font-weight:400">
            ${low0 != null || high0 != null
              ? `Max. ${high0 ?? "—"}${unit} Min. ${low0 ?? "—"}${unit}`
              : capitalize(ctx.stateObj.state)}
          </div>
        </div>
        <div class="forecast-list">
          ${forecast.map((d) => {
            const cond = String(d.condition || "");
            return html`<div class="forecast-row weather-day">
              <div class="left">
                <ha-icon
                  .icon=${CONDITION_ICONS[cond] || "mdi:weather-partly-cloudy"}
                ></ha-icon>
                <span>${formatLabel(d)}</span>
              </div>
              <div class="temp-pills">
                <span class="pill low">${d.templow ?? "—"}${unit}</span>
                <span class="pill high">${d.temperature ?? "—"}${unit}</span>
              </div>
            </div>`;
          })}
        </div>
      </div>
    </div>
    <div class="area-side">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="weather-radar"
      ></div>
      <div class="ulm-embed-fallback">${radarIframe(ctx)}</div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
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

function renderRadar(ctx: PopupContext): TemplateResult {
  return html`<div class="ulm-grid">
    <div class="area-header">${weatherHeader(ctx)}</div>
    <div class="area-body" style="width:100%;padding:0 8px">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="weather-radar"
      ></div>
      <div class="ulm-embed-fallback">${radarIframe(ctx)}</div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
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
  // RainViewer embed closest to weather-radar-card RainViewer-Meteored look
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

function formatLabel(d: Record<string, unknown>): string {
  const dt = d.datetime;
  if (typeof dt === "string" && dt) {
    const date = new Date(dt);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString(undefined, { weekday: "short" });
    }
    return dt.slice(0, 10);
  }
  return String(d.condition || "—");
}
