import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, HassEntity, LovelaceCard } from "../types";
import { mountLovelaceCard } from "./embed-card";
import {
  lightEntityColor,
  miniMediaArtwork,
  miniMediaInfo,
  mySliderVolume,
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
import {
  defaultOutletView,
  fetchEntityHistory,
  renderPowerOutlet,
  type HistoryPoint,
} from "./views/power-outlet";
import { defaultThermostatView, renderThermostat } from "./views/thermostat";
import { defaultVacuumView, renderVacuum } from "./views/vacuum";
import { defaultWeatherView, renderWeather } from "./views/weather";

export type { UlmPopupKind, UlmPopupOpts } from "./types";

type HostEl = HTMLElement & { hass?: HomeAssistant };

/**
 * Opens a Minimalist-style popup dialog for an entity.
 * Usage: openUlmPopup(this, kind, entity, opts?)
 */
export function openUlmPopup(
  host: HostEl,
  kind: UlmPopupKind,
  entity: string,
  opts: UlmPopupOpts = {},
) {
  let el = document.querySelector("ulm-popup-dialog") as UlmPopupDialog | null;
  if (!el) {
    el = document.createElement("ulm-popup-dialog") as UlmPopupDialog;
    document.body.appendChild(el);
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
  @state() private _history: HistoryPoint[] = [];
  @state() private _historyLoading = false;

  private _host?: HostEl;
  private _syncTimer?: number;
  private _viewStack: PopupView[] = [];
  private _thermoHost?: HTMLElement;
  private _thermoEl?: (LovelaceCard & HTMLElement) | null;
  private _vacuumHost?: HTMLElement;
  private _vacuumEl?: (LovelaceCard & HTMLElement) | null;
  private _graphHost?: HTMLElement;
  private _graphEl?: (LovelaceCard & HTMLElement) | null;
  private _slotEls = new Map<string, (LovelaceCard & HTMLElement) | null>();

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
    this._history = [];
    this._thermoEl = null;
    this._vacuumEl = null;
    this._graphEl = null;
    this._slotEls.clear();
    this._open = true;
    this._startSync();
    this._maybeLoadHistory();
    window.addEventListener("keydown", this._onKey);
    document.body.style.overflow = "hidden";
  }

  public close() {
    this._open = false;
    this._stopSync();
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
    if (this._kind === "thermostat" && this._thermoHost) {
      this._thermoEl = await mountLovelaceCard(
        this._thermoHost,
        this.hass,
        { type: "thermostat", entity: this._entity },
        this._thermoEl,
        "hui-thermostat-card",
      );
      if (this._thermoEl) {
        this._thermoHost.style.cssText =
          "width:100%;max-width:360px;--ha-card-box-shadow:none;--ha-card-background:transparent;";
      }
    }
    if (this._kind === "vacuum" && this._vacuumHost) {
      const map = this._opts.camera || "null";
      this._vacuumEl = await mountLovelaceCard(
        this._vacuumHost,
        this.hass,
        {
          type: "custom:vacuum-card",
          entity: this._entity,
          image: "default",
          compact_view: false,
          map: map === "null" ? undefined : map,
        },
        this._vacuumEl,
        "vacuum-card",
      );
      if (this._vacuumEl) {
        const fallback = this.renderRoot.querySelector(
          ".vacuum-fallback-ui",
        ) as HTMLElement | null;
        if (fallback) fallback.style.display = "none";
      }
    }
    if (
      this._kind === "power_outlet" &&
      (this._view === "stats" || this._view === "main") &&
      this._graphHost
    ) {
      const graphEntity =
        this._opts.graph_sensor || this._opts.sensor1 || this._entity;
      this._graphEl = await mountLovelaceCard(
        this._graphHost,
        this.hass,
        {
          type: "custom:mini-graph-card",
          entities: [{ entity: graphEntity }],
          line_color: "var(--info-color)",
          height: 276,
          hours_to_show: 168,
          show: {
            name: false,
            icon: false,
            legend: false,
            state: false,
          },
        },
        this._graphEl,
        "mini-graph-card",
      );
    }

    // Generic HACS embeds via data-ulm-embed hosts (+ Lit fallback siblings)
    const slots: Array<{
      key: string;
      config: LovelaceCardConfig;
      tag: string;
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
    if (this._kind === "media_player") {
      slots.push(
        {
          key: "media-art",
          config: miniMediaArtwork(this._entity),
          tag: "mini-media-player",
        },
        {
          key: "media-info",
          config: miniMediaInfo(this._entity),
          tag: "mini-media-player",
        },
        {
          key: "media-vol",
          config: mySliderVolume(this._entity),
          tag: "my-slider-v2",
        },
      );
    }
    if (this._kind === "weather") {
      slots.push({
        key: "weather-radar",
        config: weatherRadar(!!this.hass.themes?.darkMode),
        tag: "weather-radar-card",
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
      // has-card is set/cleared inside mountLovelaceCard
    }
  }

  private _startSync() {
    this._stopSync();
    this._syncTimer = window.setInterval(() => {
      if (!this._open) return;
      if (this._host?.hass && this._host.hass !== this.hass) {
        this.hass = this._host.hass;
      }
      if (this._thermoEl && this.hass) this._thermoEl.hass = this.hass;
      if (this._vacuumEl && this.hass) this._vacuumEl.hass = this.hass;
      if (this._graphEl && this.hass) this._graphEl.hass = this.hass;
      if (this.hass) {
        for (const el of this._slotEls.values()) {
          if (el) el.hass = this.hass;
        }
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
    if (this._kind === "power_outlet" && view === "history") {
      this._maybeLoadHistory();
    }
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

  private async _maybeLoadHistory() {
    if (this._kind !== "power_outlet" || !this.hass) return;
    const entity =
      this._opts.graph_sensor || this._opts.sensor1 || this._entity;
    if (!entity) return;
    this._historyLoading = true;
    try {
      this._history = await fetchEntityHistory(this.hass, entity, 168);
    } finally {
      this._historyLoading = false;
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
        return renderThermostat(ctx, (el) => {
          this._thermoHost = el as HTMLElement | undefined;
          if (el) void this._syncEmbeds();
        });
      case "media_player":
        return renderMedia(ctx);
      case "vacuum":
        return renderVacuum(ctx, (el) => {
          this._vacuumHost = el as HTMLElement | undefined;
          if (el) void this._syncEmbeds();
        });
      case "weather":
        return renderWeather(ctx);
      case "power_outlet":
        return renderPowerOutlet(
          ctx,
          this._history,
          this._historyLoading,
          (el) => {
            this._graphHost = el as HTMLElement | undefined;
            if (el) void this._syncEmbeds();
          },
        );
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
