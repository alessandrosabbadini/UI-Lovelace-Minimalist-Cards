import { html, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import type { HomeAssistant } from "../../types";
import type { OutletView, PopupContext } from "../types";
import {
  capitalize,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";

export function defaultOutletView(): OutletView {
  return "stats";
}

export interface HistoryPoint {
  s?: string;
  state?: string;
  lu?: number;
  last_changed?: string;
}

export function renderPowerOutlet(
  ctx: PopupContext,
  history: HistoryPoint[],
  historyLoading: boolean,
  onGraphHost?: (el: Element | undefined) => void,
): TemplateResult {
  const view = (ctx.view === "main" ? "stats" : ctx.view) as OutletView;
  return view === "history"
    ? renderHistory(ctx, history, historyLoading)
    : renderStats(ctx, onGraphHost);
}

function outletHeader(ctx: PopupContext) {
  const s = ctx.stateObj;
  return renderPopupHeader({
    name: s.attributes.friendly_name || ctx.entity,
    label: capitalize(s.state),
    icon: (s.attributes.icon as string) || "mdi:power-socket-eu",
  });
}

function renderStats(
  ctx: PopupContext,
  onGraphHost?: (el: Element | undefined) => void,
): TemplateResult {
  const s1 = ctx.opts.sensor1 || ctx.opts.graph_sensor;
  const s2 = ctx.opts.sensor2;

  return html`<div class="ulm-grid outlet">
    <div class="area-header">${outletHeader(ctx)}</div>
    <div class="area-tiles">
      <div class="ulm-tile-row">
        ${sensorTile(ctx, s1)}
        ${sensorTile(ctx, s2)}
      </div>
    </div>
    <div class="area-graph">
      <div class="embed-host wide" ${ref((el) => onGraphHost?.(el))}></div>
    </div>
    <div class="area-log">
      <div class="muted" style="margin-bottom:8px">Logbook</div>
      <button class="media-chip" @click=${() => ctx.moreInfo()}>
        Open more-info / logbook
      </button>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${renderPopupButton({
          icon: "mdi:chart-line",
          name: "Stats",
          variant: "selected",
          onClick: () => ctx.setView("stats"),
        })}
        ${renderPopupButton({
          icon: "mdi:history",
          name: "History",
          onClick: () => ctx.setView("history"),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: ctx.goBack,
        onPower: () => ctx.call(ctx.domain, "toggle"),
        powerLabel: capitalize(ctx.stateObj.state),
      })}
    </div>
  </div>`;
}

function renderHistory(
  ctx: PopupContext,
  history: HistoryPoint[],
  loading: boolean,
): TemplateResult {
  const recent = [...history].slice(-24).reverse();
  return html`<div class="ulm-grid">
    <div class="area-header">${outletHeader(ctx)}</div>
    <div class="area-body" style="align-content:start;width:100%;padding:0 8px">
      ${loading
        ? html`<div class="muted">Loading history…</div>`
        : recent.length
          ? html`<div class="history-list">
              ${recent.map(
                (p) => html`<div class="history-row">
                  <span>${formatTime(p.lu || p.last_changed)}</span>
                  <span>${p.s ?? p.state ?? "—"}</span>
                </div>`,
              )}
            </div>`
          : html`<div class="muted">No history points.</div>
              <button class="media-chip" @click=${() => ctx.moreInfo()}>
                Open more-info
              </button>`}
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${renderPopupButton({
          icon: "mdi:chart-line",
          name: "Stats",
          onClick: () => ctx.setView("stats"),
        })}
        ${renderPopupButton({
          icon: "mdi:history",
          name: "History",
          variant: "selected",
          onClick: () => ctx.setView("history"),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: ctx.goBack,
        onPower: () => ctx.call(ctx.domain, "toggle"),
        powerLabel: capitalize(ctx.stateObj.state),
      })}
    </div>
  </div>`;
}

function sensorTile(ctx: PopupContext, entityId?: string): TemplateResult {
  if (!entityId || !ctx.hass.states[entityId]) {
    return html`<div class="ulm-tile">
      <div class="ulm-tile-icon"><ha-icon icon="mdi:eye"></ha-icon></div>
      <div>
        <div class="ulm-tile-name">Sensor</div>
        <div class="ulm-tile-label">—</div>
      </div>
    </div>`;
  }
  const st = ctx.hass.states[entityId];
  const unit = (st.attributes.unit_of_measurement as string | undefined) || "";
  return html`<button class="ulm-tile" @click=${() => ctx.moreInfo(entityId)}>
    <div class="ulm-tile-icon">
      <ha-icon .icon=${(st.attributes.icon as string) || "mdi:flash"}></ha-icon>
    </div>
    <div>
      <div class="ulm-tile-name">
        ${st.attributes.friendly_name || entityId}
      </div>
      <div class="ulm-tile-label">${st.state}${unit}</div>
    </div>
  </button>`;
}

export async function fetchEntityHistory(
  hass: HomeAssistant,
  entityId: string,
  hours = 168,
): Promise<HistoryPoint[]> {
  const end = new Date();
  const start = new Date(end.getTime() - hours * 3600_000);
  const callWS = (
    hass as HomeAssistant & {
      callWS?: (msg: Record<string, unknown>) => Promise<unknown>;
    }
  ).callWS;
  if (!callWS) return [];
  try {
    const result = (await callWS({
      type: "history/history_during_period",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      entity_ids: [entityId],
      significant_changes_only: false,
      minimal_response: true,
      no_attributes: true,
    })) as Record<string, HistoryPoint[]>;
    return result?.[entityId] || [];
  } catch {
    try {
      const result = (await callWS({
        type: "history/list",
        entity_id: entityId,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        minimal_response: true,
        no_attributes: true,
      })) as HistoryPoint[][];
      return result?.[0] || [];
    } catch {
      return [];
    }
  }
}

function formatTime(raw: number | string | undefined): string {
  if (raw == null) return "";
  const d =
    typeof raw === "number" ? new Date(raw * 1000) : new Date(String(raw));
  if (Number.isNaN(d.getTime())) return String(raw);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
