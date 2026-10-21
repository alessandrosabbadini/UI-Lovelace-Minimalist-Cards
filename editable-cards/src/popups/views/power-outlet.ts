import { html, type TemplateResult } from "lit";
import type { PopupContext, OutletView } from "../types";
import {
  capitalize,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";

export function defaultOutletView(): OutletView {
  return "stats";
}

export function renderPowerOutlet(ctx: PopupContext): TemplateResult {
  const view = (ctx.view === "main" ? "stats" : ctx.view) as OutletView;
  return view === "history" ? renderHistory(ctx) : renderStats(ctx);
}

function outletHeader(ctx: PopupContext) {
  const s = ctx.stateObj;
  return renderPopupHeader({
    name: s.attributes.friendly_name || ctx.entity,
    label: capitalize(s.state),
    icon: (s.attributes.icon as string) || "mdi:power-socket-eu",
  });
}

function modeButtons(ctx: PopupContext, selected: OutletView) {
  return html`<div class="ulm-mode-row outlet-mode-row">
    ${renderPopupButton({
      icon: "mdi:chart-line",
      name: "Stats",
      variant: selected === "stats" ? "selected" : undefined,
      onClick: () => ctx.setView("stats"),
    })}
    ${renderPopupButton({
      icon: "mdi:history",
      name: "History",
      variant: selected === "history" ? "selected" : undefined,
      onClick: () => ctx.setView("history"),
    })}
  </div>`;
}

function footer(ctx: PopupContext) {
  return renderPopupFooter({
    onBack: ctx.goBack,
    onPower: () => ctx.call(ctx.domain, "toggle"),
    powerLabel: capitalize(ctx.stateObj.state),
  });
}

/** Desktop: sensors + graph | logbook. Mobile: sensors + graph (+ mode buttons). */
function renderStats(ctx: PopupContext): TemplateResult {
  const s1 = ctx.opts.sensor1 || ctx.opts.graph_sensor;
  const s2 = ctx.opts.sensor2;

  return html`<div class="ulm-grid outlet outlet-stats">
    <div class="area-header">${outletHeader(ctx)}</div>
    <div class="area-tiles">
      <div class="ulm-tile-row">
        ${sensorTile(ctx, s1)} ${sensorTile(ctx, s2)}
      </div>
    </div>
    <div class="area-graph">
      <div
        class="ulm-embed-host wide"
        data-ulm-embed="outlet-graph"
      ></div>
    </div>
    <div class="area-log">
      <div
        class="ulm-embed-host wide outlet-logbook-host"
        data-ulm-embed="outlet-logbook"
      ></div>
    </div>
    <div class="area-buttons">${modeButtons(ctx, "stats")}</div>
    <div class="area-footer">${footer(ctx)}</div>
  </div>`;
}

/** Sensors + HA logbook (graph hidden). Mode buttons always visible. */
function renderHistory(ctx: PopupContext): TemplateResult {
  const s1 = ctx.opts.sensor1 || ctx.opts.graph_sensor;
  const s2 = ctx.opts.sensor2;

  return html`<div class="ulm-grid outlet outlet-history">
    <div class="area-header">${outletHeader(ctx)}</div>
    <div class="area-tiles">
      <div class="ulm-tile-row">
        ${sensorTile(ctx, s1)} ${sensorTile(ctx, s2)}
      </div>
    </div>
    <div class="area-log">
      <div
        class="ulm-embed-host wide outlet-logbook-host"
        data-ulm-embed="outlet-logbook"
      ></div>
    </div>
    <div class="area-buttons">${modeButtons(ctx, "history")}</div>
    <div class="area-footer">${footer(ctx)}</div>
  </div>`;
}

function sensorTile(ctx: PopupContext, entityId?: string): TemplateResult {
  if (!entityId || !ctx.hass.states[entityId]) {
    return html`<div class="ulm-tile muted-tile">
      <div class="ulm-tile-icon"><ha-icon icon="mdi:eye"></ha-icon></div>
      <div>
        <div class="ulm-tile-name">Sensor</div>
        <div class="ulm-tile-label">—</div>
      </div>
    </div>`;
  }
  const st = ctx.hass.states[entityId];
  const unit = (st.attributes.unit_of_measurement as string | undefined) || "";
  const name = String(st.attributes.friendly_name || entityId);
  const value = unit ? `${st.state}${unit}` : st.state;
  return html`<button class="ulm-tile" @click=${() => ctx.moreInfo(entityId)}>
    <div class="ulm-tile-icon">
      <ha-icon
        .icon=${(st.attributes.icon as string) || "mdi:flash"}
      ></ha-icon>
    </div>
    <div class="ulm-tile-text">
      <div class="ulm-tile-name" title=${name}>${name}</div>
      <div class="ulm-tile-label">${value}</div>
    </div>
  </button>`;
}
