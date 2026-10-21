import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, HassEntity, LovelaceCard } from "../types";
import { mountLovelaceCard } from "./embed-card";
import {
  lightEntityColor,
  outletGraphFit,
  outletMiniGraph,
  styleOutletMiniGraph,
  weatherRadar,
} from "./embed-configs";
import { popupStyles } from "./shared";
import type { LovelaceCardConfig } from "../types";
import type {
  PopupContext,
  PopupView,
  UlmPopupKind,
  UlmPopupOpts,
} from "./types";
import { defaultCoverView, renderCover } from "./views/cover";
import { defaultLightView, renderLight } from "./views/light";
import { defaultMediaView, renderMedia } from "./views/media";
import { defaultOutletView, renderPowerOutlet } from "./views/power-outlet";
import { defaultThermostatView, renderThermostat } from "./views/thermostat";
import { defaultVacuumView, renderVacuum } from "./views/vacuum";
import {
  defaultWeatherView,
  fetchWeatherForecast,
  renderWeather,
  type WeatherForecastDay,
} from "./views/weather";
import "./ulm-vacuum-embed";

export type { UlmPopupKind, UlmPopupOpts } from "./types";

type HostEl = HTMLElement & { hass?: HomeAssistant };

/**
 * Opens a Minimalist-style popup dialog for an entity.
 * Usage: openUlmPopup(this, kind, entity, opts?)
 */
/** Prefer HA's shadow tree so Lit context (needed by thermostat dial) is available. */
function popupMountParent(): ParentNode {
  const ha = document.querySelector("home-assistant");
  if (ha?.shadowRoot) return ha.shadowRoot;
  if (ha) return ha;
  return document.body;
}

export function openUlmPopup(
  host: HostEl,
  kind: UlmPopupKind,
  entity: string,
  opts: UlmPopupOpts = {},
) {
  let el =
    (document.querySelector("ulm-popup-dialog") as UlmPopupDialog | null) ||
    (popupMountParent().querySelector(
      "ulm-popup-dialog",
    ) as UlmPopupDialog | null);
  if (!el) {
    el = document.createElement("ulm-popup-dialog") as UlmPopupDialog;
    popupMountParent().appendChild(el);
  } else if (el.parentNode === document.body) {
    // Migrate older body-mounted instance into HA shadow for context
    popupMountParent().appendChild(el);
  }
  el.attachHost(host);
  if (host.hass) el.hass = host.hass;
  el.open(kind, entity, opts);
}

@customElement("ulm-popup-dialog")
export class UlmPopupDialog extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _open = false;
  @state() private _kind: UlmPopupKind = "light";
  @state() private _entity = "";
  @state() private _opts: UlmPopupOpts = {};
  @state() private _view: PopupView = "main";
  @state() private _forecast: WeatherForecastDay[] = [];
  @state() private _forecastLoading = false;

  private _host?: HostEl;
  private _syncTimer?: number;
  private _viewStack: PopupView[] = [];
  private _slotEls = new Map<string, (LovelaceCard & HTMLElement) | null>();
  private _outletGraphFitKey = "";
  private _outletGraphRo?: ResizeObserver;
  private _outletGraphRoTimer?: number;

  private _onKey = (ev: KeyboardEvent) => {
    if (ev.key === "Escape" && this._open) this.close();
  };

  public attachHost(host: HostEl) {
    this._host = host;
  }

  public open(kind: UlmPopupKind, entity: string, opts: UlmPopupOpts = {}) {
    this._kind = kind;
    this._entity = entity;
    this._opts = opts || {};
    this._view = this._defaultView(kind);
    this._viewStack = [];
    this._forecast = [];
    this._slotEls.clear();
    this._outletGraphFitKey = "";
    this._open = true;
    this._startSync();
    void this._maybeLoadForecast();
    window.addEventListener("keydown", this._onKey);
    document.body.style.overflow = "hidden";
  }

  public close() {
    this._open = false;
    this._stopSync();
    this._stopOutletGraphRo();
    window.removeEventListener("keydown", this._onKey);
    document.body.style.overflow = "";
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopSync();
    window.removeEventListener("keydown", this._onKey);
    document.body.style.overflow = "";
  }

  protected updated() {
    if (!this._open || !this.hass) return;
    void this._syncEmbeds();
  }

  private async _syncEmbeds() {
    if (!this.hass) return;

    // Generic HACS / HA embeds via data-ulm-embed hosts (+ Lit fallback siblings)
    const slots: Array<{
      key: string;
      config: LovelaceCardConfig;
      tag?: string;
    }> = [];
    if (this._kind === "light") {
      // Brightness / color-temp use Lit sliders (stable across hass updates).
      // Color wheel still embeds light-entity-card when available.
      slots.push({
        key: "light-color",
        config: lightEntityColor(this._entity),
        tag: "light-entity-card",
      });
    }
    if (this._kind === "weather") {
      slots.push({
        key: "weather-radar",
        config: weatherRadar(!!this.hass.themes?.darkMode),
        tag: "weather-radar-card",
      });
    }
    if (this._kind === "power_outlet") {
      if (this._view !== "stats" && this._view !== "main") {
        this._slotEls.delete("outlet-graph");
        this._outletGraphFitKey = "";
      }
      // Stats (desktop) + History both show the HA logbook card
      slots.push({
        key: "outlet-logbook",
        config: {
          type: "logbook",
          entities: [this._entity],
        },
      });
    }

    for (const slot of slots) {
      const host = this.renderRoot.querySelector(
        `[data-ulm-embed="${slot.key}"]`,
      ) as HTMLElement | null;
      if (!host) continue;
      const el = await mountLovelaceCard(
        host,
        this.hass,
        slot.config,
        this._slotEls.get(slot.key),
        slot.tag,
      );
      this._slotEls.set(slot.key, el);
      if (slot.key === "weather-radar" && el) {
        el.style.setProperty("height", "350px");
        el.style.setProperty("border-radius", "20px");
        el.style.setProperty("overflow", "hidden");
        const card = el.shadowRoot?.querySelector(
          "ha-card",
        ) as HTMLElement | null;
        if (card) {
          card.style.height = "350px";
          card.style.borderRadius = "20px";
        }
      }
      if (slot.key === "outlet-logbook" && el) {
        el.style.setProperty("height", "100%");
        const card = el.shadowRoot?.querySelector(
          "ha-card",
        ) as HTMLElement | null;
        if (card) {
          card.style.boxShadow = "none";
          card.style.background = "none";
          card.style.height = "257px";
        }
      }
    }

    if (
      this._kind === "power_outlet" &&
      (this._view === "stats" || this._view === "main")
    ) {
      await this._mountOutletGraph();
    }
  }

  /**
   * Mount outlet mini-graph sized to the cell so the bottom is never clipped
   * on short / graph-only layouts. height is chosen once per cell size bucket.
   */
  private async _mountOutletGraph() {
    if (!this.hass) return;
    const host = this.renderRoot.querySelector(
      '[data-ulm-embed="outlet-graph"]',
    ) as HTMLElement | null;
    if (!host) return;

    // Wait for grid layout so clientHeight is the real cell size
    await new Promise<void>((r) =>
      requestAnimationFrame(() => requestAnimationFrame(() => r())),
    );

    const area = host.parentElement as HTMLElement | null;
    const avail = area?.clientHeight || host.clientHeight || 0;
    // Bucket by 20px so tiny resizes don't remount / move the line
    const bucket = Math.round(avail / 20) * 20;
    const fit = outletGraphFit(avail);
    const fitKey = `${bucket}:${fit.height}:${fit.margin}`;
    const graphEntity =
      this._opts.graph_sensor || this._opts.sensor1 || this._entity;
    const config = outletMiniGraph(graphEntity, fit.height);

    if (
      fitKey === this._outletGraphFitKey &&
      this._slotEls.get("outlet-graph")?.isConnected
    ) {
      styleOutletMiniGraph(
        this._slotEls.get("outlet-graph") as HTMLElement,
        fit.margin,
        fit.height,
      );
      return;
    }

    this._outletGraphFitKey = fitKey;
    const el = await mountLovelaceCard(
      host,
      this.hass,
      config,
      null,
      "mini-graph-card",
    );
    this._slotEls.set("outlet-graph", el);
    if (el) {
      styleOutletMiniGraph(el, fit.margin, fit.height);
      // mini-graph paints async — re-apply px height after first render
      window.setTimeout(
        () => styleOutletMiniGraph(el, fit.margin, fit.height),
        50,
      );
      window.setTimeout(
        () => styleOutletMiniGraph(el, fit.margin, fit.height),
        250,
      );
    }
    this._watchOutletGraphResize(area);
  }

  /** Re-fit the chart when the dialog / window is resized. */
  private _watchOutletGraphResize(area: HTMLElement | null) {
    if (!area) return;
    if (!this._outletGraphRo) {
      this._outletGraphRo = new ResizeObserver(() => {
        if (!this._open || this._kind !== "power_outlet") return;
        if (this._view !== "stats" && this._view !== "main") return;
        window.clearTimeout(this._outletGraphRoTimer);
        this._outletGraphRoTimer = window.setTimeout(() => {
          void this._mountOutletGraph();
        }, 80);
      });
    } else {
      this._outletGraphRo.disconnect();
    }
    this._outletGraphRo.observe(area);
  }

  private _stopOutletGraphRo() {
    this._outletGraphRo?.disconnect();
    this._outletGraphRo = undefined;
    window.clearTimeout(this._outletGraphRoTimer);
    this._outletGraphRoTimer = undefined;
  }

  private _lastEntityState?: string;

  private _startSync() {
    this._stopSync();
    this._lastEntityState = undefined;
    this._syncTimer = window.setInterval(() => {
      if (!this._open) return;
      // HA mutates hass in place — always pull from host
      if (this._host?.hass) {
        this.hass = this._host.hass;
      }
      if (this.hass) {
        for (const el of this._slotEls.values()) {
          if (el) el.hass = this.hass;
        }
      }
      // Thermo dial / vacuum animation live outside mountLovelaceCard
      const thermo = this.renderRoot?.querySelector(
        "ulm-thermo-embed",
      ) as (HTMLElement & { hass?: HomeAssistant }) | null;
      if (thermo && this.hass) thermo.hass = this.hass;
      const vacuum = this.renderRoot?.querySelector(
        "ulm-vacuum-embed",
      ) as (HTMLElement & { hass?: HomeAssistant }) | null;
      if (vacuum && this.hass) vacuum.hass = this.hass;
      // Re-render chips / header when entity state changes
      const st = this.hass?.states?.[this._entity];
      const key = st
        ? `${st.state}|${st.last_changed}|${JSON.stringify(st.attributes?.hvac_action)}|${st.attributes?.temperature}`
        : "";
      if (key && key !== this._lastEntityState) {
        this._lastEntityState = key;
        this.requestUpdate();
      }
    }, 300);
  }

  private _stopSync() {
    if (this._syncTimer != null) {
      window.clearInterval(this._syncTimer);
      this._syncTimer = undefined;
    }
  }

  private _defaultView(kind: UlmPopupKind): PopupView {
    switch (kind) {
      case "light":
        return this.hass?.states[this._entity]
          ? defaultLightView(this.hass.states[this._entity])
          : "brightness";
      case "media_player":
        return defaultMediaView();
      case "weather":
        return defaultWeatherView();
      case "power_outlet":
        return defaultOutletView();
      case "cover":
        return defaultCoverView();
      case "thermostat":
        return defaultThermostatView();
      case "vacuum":
        return defaultVacuumView();
      default:
        return "main";
    }
  }

  private _setView = (view: PopupView) => {
    if (view === this._view) return;
    this._viewStack.push(this._view);
    this._view = view;
  };

  private _goBack = () => {
    const prev = this._viewStack.pop();
    if (prev) {
      this._view = prev;
      return;
    }
    const root = this._defaultView(this._kind);
    if (this._view !== root && this._view !== "main") {
      this._view = root;
      return;
    }
    this.close();
  };

  private _call = (
    domain: string,
    service: string,
    data: Record<string, unknown> = {},
  ) => {
    if (!this.hass) return;
    const payload = { ...data };
    if (!payload.entity_id) payload.entity_id = this._entity;
    this.hass.callService(domain, service, payload);
  };

  private _moreInfo = (entityId?: string) => {
    const id = entityId || this._entity;
    document.querySelector("home-assistant")?.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: id },
      }),
    );
  };

  private async _maybeLoadForecast() {
    if (this._kind !== "weather" || !this.hass || !this._entity) return;
    this._forecastLoading = true;
    try {
      this._forecast = await fetchWeatherForecast(this.hass, this._entity);
    } finally {
      this._forecastLoading = false;
    }
  }

  private _ctx(stateObj: HassEntity): PopupContext {
    return {
      hass: this.hass!,
      entity: this._entity,
      stateObj,
      opts: this._opts,
      view: this._view,
      setView: this._setView,
      call: this._call,
      close: () => this.close(),
      goBack: this._goBack,
      moreInfo: this._moreInfo,
      domain: this._entity.split(".")[0],
    };
  }

  protected render() {
    if (!this._open || !this.hass) return nothing;
    const stateObj = this.hass.states[this._entity];
    if (!stateObj) {
      return html`<div class="backdrop" @click=${this.close}>
        <div class="dialog-wrap dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="ulm-ph-name">Entity not found</div>
          <div class="ulm-ph-label">${this._entity}</div>
          <button class="media-chip" @click=${this.close}>Close</button>
        </div>
      </div>`;
    }

    return html`
      <div class="backdrop" @click=${this.close}>
        <div
          class="dialog"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <div class="dialog-wrap">
            <button class="dialog-close" @click=${this.close} title="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
            ${this._renderBody(stateObj)}
          </div>
        </div>
      </div>
    `;
  }

  private _renderBody(stateObj: HassEntity) {
    const ctx = this._ctx(stateObj);
    switch (this._kind) {
      case "light":
        return renderLight(ctx);
      case "cover":
        return renderCover(ctx);
      case "thermostat":
        return renderThermostat(ctx);
      case "media_player":
        return renderMedia(ctx);
      case "vacuum":
        return renderVacuum(ctx);
      case "weather":
        return renderWeather(ctx, this._forecast, this._forecastLoading);
      case "power_outlet":
        return renderPowerOutlet(ctx);
      default:
        return nothing;
    }
  }

  static styles = popupStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-popup-dialog": UlmPopupDialog;
  }
}
