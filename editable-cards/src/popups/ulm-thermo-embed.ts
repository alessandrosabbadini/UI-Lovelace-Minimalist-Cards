import type { HassEntity, HomeAssistant, LovelaceCardConfig } from "../types";

type Helpers = {
  createCardElement: (c: LovelaceCardConfig) => HTMLElement;
};

/** Accent by HVAC mode (Minimalist / HA climate colors). */
function modeAccentColor(state: string): string {
  switch (state) {
    case "heat":
      return "rgb(255, 145, 1)";
    case "cool":
    case "dry":
    case "heat_cool":
    case "auto":
      return "rgb(61, 90, 254)";
    case "fan_only":
      return "rgb(0, 186, 13)";
    case "off":
      return "rgb(158, 158, 158)";
    default:
      return "rgb(61, 90, 254)";
  }
}

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

/** Fill always min → setpoint (no start/end flip when changing modes). */
const SLIDER_MODE = "start";

/**
 * Minimalist popup dial = HA `ha-control-circular-slider` + center info.
 */
export class UlmThermoEmbed extends HTMLElement {
  private _hass?: HomeAssistant;
  private _entity = "";
  private _slider?: HTMLElement;
  private _ready = false;
  private _localValue?: number;
  private _loading: Promise<boolean> | null = null;
  /** Optimistic HVAC mode from mode-chip click (until hass state catches up). */
  private _pendingMode?: string;
  private _ro?: ResizeObserver;

  static get observedAttributes() {
    return ["entity"];
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    if (name === "entity" && value && value !== this._entity) {
      this._entity = value;
      this._localValue = undefined;
      this._pendingMode = undefined;
      this._sync();
    }
  }

  set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
    // Clear pending once hass confirms the mode
    const st = this._stateObj()?.state;
    if (
      this._pendingMode &&
      st &&
      st.toLowerCase() === this._pendingMode.toLowerCase()
    ) {
      this._pendingMode = undefined;
    }
    void this._ensureSlider().then(() => this._sync());
  }

  get hass() {
    return this._hass;
  }

  set entity(entity: string) {
    if (!entity || entity === this._entity) return;
    this._entity = entity;
    this.setAttribute("entity", entity);
    this._localValue = undefined;
    this._pendingMode = undefined;
    void this._ensureSlider().then(() => this._sync());
  }

  get entity() {
    return this._entity;
  }

  /**
   * Called from mode chips for instant dial feedback (color + label),
   * before the climate state websocket update arrives.
   */
  setHvacMode(mode: string) {
    this._pendingMode = mode;
    this._sync();
  }

  connectedCallback() {
    this._ensureDom();
    this._observeSize();
    void this._ensureSlider().then(() => this._sync());
  }

  disconnectedCallback() {
    this._ro?.disconnect();
    this._ro = undefined;
  }

  /** Keep dial square and fully inside the popup body (no bottom clip). */
  private _fitSize() {
    const parent = this.parentElement;
    if (!parent) return;
    const availH = parent.clientHeight;
    const availW = parent.clientWidth;
    if (availH < 32 || availW < 32) return;
    const size = Math.floor(Math.min(320, availW, availH));
    this.style.width = `${size}px`;
    this.style.height = `${size}px`;
    this.style.maxWidth = "100%";
    this.style.maxHeight = "100%";
  }

  private _observeSize() {
    if (this._ro) return;
    const parent = this.parentElement;
    if (!parent || typeof ResizeObserver === "undefined") {
      this._fitSize();
      return;
    }
    this._ro = new ResizeObserver(() => this._fitSize());
    this._ro.observe(parent);
    this._fitSize();
  }

  private _stateObj(): HassEntity | undefined {
    if (!this._hass || !this._entity) return undefined;
    return this._hass.states?.[this._entity] as HassEntity | undefined;
  }

  /** Effective HVAC mode: optimistic chip click, else entity state. */
  private _hvacMode(): string {
    if (this._pendingMode) return this._pendingMode.toLowerCase();
    return (this._stateObj()?.state || "").toLowerCase();
  }

  private _ensureDom() {
    if (this.shadowRoot) return;
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          aspect-ratio: 1;
          margin: 0 auto;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: none;
          color: var(--primary-text-color);
          --mode-color: rgb(61, 90, 254);
          --control-circular-slider-color: var(--mode-color);
          --control-circular-slider-background: var(--disabled-color, #9e9e9e);
          --control-circular-slider-background-opacity: 0.3;
          --action-color: var(--mode-color);
        }
        #slider-host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: none;
        }
        #slider-host > * {
          width: 100% !important;
          height: 100% !important;
          display: block;
          max-width: 100%;
          max-height: 100%;
        }
        .info {
          pointer-events: none;
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.1px;
          line-height: 1.2;
        }
        .setpoint {
          margin: 0;
          font-size: 44px;
          font-weight: 400;
          line-height: 1.1;
          color: var(--primary-text-color);
        }
        .setpoint .unit {
          font-size: 0.42em;
          margin-left: 1px;
          vertical-align: super;
        }
        .current {
          margin: 0;
          font-size: 18px;
          font-weight: 300;
          color: var(--secondary-text-color);
          direction: ltr;
        }
        .action {
          margin: 0;
          max-width: 60%;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: var(--action-color, var(--secondary-text-color));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fallback {
          min-height: 280px;
          display: grid;
          place-items: center;
          opacity: 0.5;
          font-size: 13px;
        }
      </style>
      <div id="slider-host"><div class="fallback">Loading…</div></div>
      <div class="info">
        <p class="setpoint"><span class="num">—</span><span class="unit"></span></p>
        <p class="current" hidden></p>
        <p class="action"></p>
      </div>
    `;
  }

  private async _ensureCircularSliderDefined(): Promise<boolean> {
    if (customElements.get("ha-control-circular-slider")) return true;
    if (!this._loading) {
      this._loading = (async () => {
        const w = window as Window & {
          loadCardHelpers?: () => Promise<Helpers>;
        };
        if (typeof w.loadCardHelpers !== "function") return false;
        try {
          const helpers = await w.loadCardHelpers();
          helpers.createCardElement({
            type: "thermostat",
            entity: this._entity || "climate.ulm_loader",
          });
          await Promise.race([
            customElements.whenDefined("ha-control-circular-slider"),
            new Promise<void>((r) => setTimeout(r, 5000)),
          ]);
        } catch (e) {
          console.warn("ulm-thermo-embed: failed to load circular slider", e);
        }
        return !!customElements.get("ha-control-circular-slider");
      })();
    }
    return this._loading;
  }

  private async _ensureSlider() {
    this._ensureDom();
    if (this._ready) return;
    const ok = await this._ensureCircularSliderDefined();
    const host = this.shadowRoot!.getElementById("slider-host")!;
    if (!ok) {
      host.innerHTML = `<div class="fallback">Thermostat dial unavailable</div>`;
      return;
    }

    const slider = document.createElement("ha-control-circular-slider");
    slider.setAttribute("prevent-interaction-on-scroll", "");
    slider.setAttribute("mode", SLIDER_MODE);
    slider.style.touchAction = "none";
    slider.style.overscrollBehavior = "none";
    slider.style.width = "100%";
    slider.style.height = "100%";
    slider.style.maxWidth = "100%";
    slider.style.maxHeight = "100%";
    slider.style.boxSizing = "border-box";

    slider.addEventListener("value-changing", (ev: Event) => {
      const v = (ev as CustomEvent).detail?.value;
      if (typeof v === "number") {
        this._localValue = v;
        this._updateInfo(v);
      }
    });
    slider.addEventListener("value-changed", (ev: Event) => {
      const v = (ev as CustomEvent).detail?.value;
      if (typeof v !== "number" || !this._entity) return;
      this._localValue = undefined;
      this._hass?.callService("climate", "set_temperature", {
        entity_id: this._entity,
        temperature: v,
      });
      this._updateInfo(v);
    });

    host.replaceChildren(slider);
    this._slider = slider;
    this._ready = true;
    requestAnimationFrame(() => {
      this._sync();
      setTimeout(() => this._sync(), 50);
      setTimeout(() => this._sync(), 200);
    });
  }

  private _sync() {
    if (!this.shadowRoot || !this._slider) return;
    this._fitSize();
    const s = this._stateObj();
    if (!s) return;
    const attrs = s.attributes;
    const min = Number(attrs.min_temp) || 7;
    const max = Number(attrs.max_temp) || 35;
    const step = Number(attrs.target_temp_step) || 0.5;
    const current =
      typeof attrs.current_temperature === "number"
        ? attrs.current_temperature
        : undefined;
    const target =
      this._localValue ??
      (typeof attrs.temperature === "number"
        ? attrs.temperature
        : (current ?? Math.round((min + max) / 2)));

    const hvac = this._hvacMode();
    const active = hvac !== "off";
    const accent = modeAccentColor(hvac);

    const sl = this._slider as HTMLElement & Record<string, unknown>;
    sl.min = min;
    sl.max = max;
    sl.step = step;
    sl.value = target;
    sl.current = current;
    sl.mode = SLIDER_MODE;
    sl.inactive = !active;
    this._slider.setAttribute("mode", SLIDER_MODE);

    this.style.setProperty("--mode-color", accent);
    this.style.setProperty("--action-color", accent);
    this._applyAccent(this._slider, accent);
    this._updateInfo(target);
  }

  private _applyAccent(slider: HTMLElement, color: string) {
    slider.style.setProperty("--control-circular-slider-color", color);
    slider.style.setProperty("--primary-color", color);

    const root = slider.shadowRoot;
    if (!root) return;

    let style = root.querySelector(
      "style[data-ulm-thermo]",
    ) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.setAttribute("data-ulm-thermo", "1");
      root.appendChild(style);
    }
    style.textContent = `
      :host {
        --control-circular-slider-color: ${color} !important;
      }
      .value,
      .arc-active,
      .arc-colored,
      .low,
      .high {
        stroke: ${color} !important;
      }
      g circle:not([data-interaction]) {
        fill: ${color} !important;
        stroke: var(--card-background-color, #111);
        stroke-width: 2px;
      }
      circle[data-interaction] {
        fill: transparent !important;
        stroke: none !important;
      }
      .target,
      .target-border {
        display: none !important;
      }
    `;

    root
      .querySelectorAll("path.value, path.arc-active, path.arc-colored")
      .forEach((p) => {
        (p as SVGElement).style.stroke = color;
      });
    root.querySelectorAll("g circle:not([data-interaction])").forEach((c) => {
      (c as SVGElement).style.fill = color;
    });
  }

  private _updateInfo(target: number) {
    if (!this.shadowRoot) return;
    const s = this._stateObj();
    if (!s) return;
    const attrs = s.attributes;
    const unitRaw = this._hass?.config?.unit_system?.temperature || "°C";
    const unit = unitRaw.startsWith("°") ? unitRaw : `°${unitRaw}`;
    const hvac = this._hvacMode();

    const fmt = (n: number) =>
      n.toLocaleString(undefined, {
        maximumFractionDigits: 1,
        minimumFractionDigits: Number.isInteger(n) ? 0 : 1,
      });

    const num = this.shadowRoot.querySelector(".num")!;
    const unitEl = this.shadowRoot.querySelector(".unit")!;
    const currentEl = this.shadowRoot.querySelector(
      ".current",
    ) as HTMLElement;
    const actionEl = this.shadowRoot.querySelector(
      ".action",
    ) as HTMLElement;

    num.textContent = fmt(target);
    unitEl.textContent = unit;

    const current =
      typeof attrs.current_temperature === "number"
        ? attrs.current_temperature
        : undefined;
    if (current != null) {
      currentEl.hidden = false;
      currentEl.textContent = fmt(current);
    } else {
      currentEl.hidden = true;
    }

    // Label follows HVAC *mode* (heat/cool/…), not hvac_action.
    // Demo climate keeps hvac_action=cooling even after switching to heat.
    const action = String(attrs.hvac_action || "").toLowerCase();
    const actionMap: Record<string, string> = {
      heating: "Heating",
      cooling: "Cooling",
      drying: "Drying",
      fan: "Fan",
      idle: "Idle",
      off: "Off",
    };
    const modeMap: Record<string, string> = {
      heat: "Heat",
      cool: "Cool",
      dry: "Dry",
      fan_only: "Fan",
      auto: "Auto",
      heat_cool: "Heat/Cool",
      off: "Off",
    };
    const loc = (this._hass as { localize?: (k: string) => string })
      ?.localize;

    let label = modeMap[hvac] || capitalize(hvac);
    // Prefer localized mode name
    if (typeof loc === "function" && hvac) {
      const key = `component.climate.entity_component._.state.${hvac}`;
      const v = loc(key);
      if (v && v !== key) label = v;
      else {
        const key2 = `state.climate.${hvac}`;
        const v2 = loc(key2);
        if (v2 && v2 !== key2) label = v2;
      }
    }
    // If actively heating/cooling and action matches mode, show action verb
    if (
      (hvac === "heat" && action === "heating") ||
      (hvac === "cool" && action === "cooling") ||
      (hvac === "dry" && action === "drying")
    ) {
      const a = actionMap[action];
      if (a) {
        if (typeof loc === "function") {
          const key = `state_attributes.climate.hvac_action.${action}`;
          const v = loc(key);
          label = v && v !== key ? v : a;
        } else {
          label = a;
        }
      }
    }

    actionEl.textContent = label;
  }
}

if (!customElements.get("ulm-thermo-embed")) {
  customElements.define("ulm-thermo-embed", UlmThermoEmbed);
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-thermo-embed": UlmThermoEmbed;
  }
}
