import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { customElement } from "../shared/custom-element";

/** Minimum time between service calls while dragging (ms). */
const SEND_INTERVAL = 150;
/** After release, keep the local pick until HA reports it (or this times out). */
const HOLD_AFTER_RELEASE = 2000;

/**
 * HS color wheel (approximation of light-entity-card wheel).
 *
 * Geometry matches the disc: hue 0 (red) at 3 o'clock increasing clockwise
 * (conic-gradient "from 90deg"), saturation 0 at the centre (white) to 100 at
 * the rim, so the colour under the pointer is the colour sent.
 *
 * The marker follows the pointer locally on every frame; service calls are
 * throttled while dragging, with a final call on release. Incoming hass
 * values are ignored while dragging so the marker never jumps back to a
 * stale position.
 */
@customElement("ulm-color-wheel")
export class UlmColorWheel extends LitElement {
  @property({ type: Number }) public hue = 30;
  @property({ type: Number }) public sat = 80;
  @property({ type: Number }) public size = 220;
  @property({ attribute: false }) public onPick?: (
    hue: number,
    sat: number,
  ) => void;

  @state() private _local?: { h: number; s: number };

  private _dragging = false;
  private _holdUntil = 0;
  private _lastSent = 0;
  private _sendTimer?: number;
  private _frame?: number;
  private _pendingEv?: { x: number; y: number };

  protected willUpdate(changed: Map<string, unknown>) {
    if (!this._local || this._dragging) return;
    if (!changed.has("hue") && !changed.has("sat")) return;
    const dh = Math.abs(((this.hue - this._local.h + 540) % 360) - 180);
    const ds = Math.abs(this.sat - this._local.s);
    // HA caught up (or we waited long enough): follow the entity again
    if ((dh <= 3 && ds <= 3) || Date.now() > this._holdUntil) {
      this._local = undefined;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearTimeout(this._sendTimer);
    if (this._frame) cancelAnimationFrame(this._frame);
  }

  private _pick(clientX: number, clientY: number) {
    const rect = this.getBoundingClientRect();
    const r = rect.width / 2;
    const x = clientX - rect.left - r;
    const y = clientY - rect.top - r;
    let h = (Math.atan2(y, x) * 180) / Math.PI;
    if (h < 0) h += 360;
    const s = Math.min(Math.hypot(x, y) / r, 1) * 100;
    this._local = { h: Math.round(h) % 360, s: Math.round(s) };
    this._scheduleSend();
  }

  private _scheduleSend(force = false) {
    const now = Date.now();
    const wait = SEND_INTERVAL - (now - this._lastSent);
    window.clearTimeout(this._sendTimer);
    if (force || wait <= 0) {
      this._send();
    } else {
      this._sendTimer = window.setTimeout(() => this._send(), wait);
    }
  }

  private _send() {
    if (!this._local) return;
    this._lastSent = Date.now();
    this.onPick?.(this._local.h, this._local.s);
  }

  private _onDown = (ev: PointerEvent) => {
    if (ev.button !== 0) return;
    ev.preventDefault();
    this._dragging = true;
    try {
      this.setPointerCapture(ev.pointerId);
    } catch {
      // Synthetic / already-released pointer: drag still works without capture
    }
    this._pick(ev.clientX, ev.clientY);
  };

  private _onMove = (ev: PointerEvent) => {
    if (!this._dragging) return;
    // Coalesce to one update per animation frame
    this._pendingEv = { x: ev.clientX, y: ev.clientY };
    if (this._frame) return;
    this._frame = requestAnimationFrame(() => {
      this._frame = undefined;
      const p = this._pendingEv;
      if (p) this._pick(p.x, p.y);
    });
  };

  private _onUp = (ev: PointerEvent) => {
    if (!this._dragging) return;
    this._dragging = false;
    try {
      if (this.hasPointerCapture(ev.pointerId)) {
        this.releasePointerCapture(ev.pointerId);
      }
    } catch {
      /* ignore */
    }
    if (this._frame) {
      cancelAnimationFrame(this._frame);
      this._frame = undefined;
    }
    if (this._pendingEv) {
      this._pick(this._pendingEv.x, this._pendingEv.y);
      this._pendingEv = undefined;
    }
    this._holdUntil = Date.now() + HOLD_AFTER_RELEASE;
    this._scheduleSend(true);
  };

  protected render() {
    const h = this._local?.h ?? this.hue;
    const s = this._local?.s ?? this.sat;
    const r = this.size / 2;
    const markerMax = r - 9; // keep the 18px marker inside the disc
    const rad = (h * Math.PI) / 180;
    const dist = Math.min((s / 100) * r, markerMax);
    const mx = r + Math.cos(rad) * dist;
    const my = r + Math.sin(rad) * dist;
    // HSV(h, s, 100%) expressed as HSL for the marker swatch
    const swatch = `hsl(${h}, 100%, ${100 - s / 2}%)`;
    return html`<div
      class="wheel"
      style="width:${this.size}px;height:${this.size}px"
      @pointerdown=${this._onDown}
      @pointermove=${this._onMove}
      @pointerup=${this._onUp}
      @pointercancel=${this._onUp}
      @lostpointercapture=${this._onUp}
    >
      <div class="disc"></div>
      <div
        class="marker ${this._dragging ? "dragging" : ""}"
        style="transform:translate(${mx - 9}px, ${my - 9}px);background:${swatch}"
      ></div>
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .wheel {
      position: relative;
      border-radius: 50%;
      touch-action: none;
      cursor: crosshair;
    }
    .disc {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(
        from 90deg,
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
      );
    }
    /* Saturation: white at the centre fading to the pure hue at the rim */
    .disc::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(
        circle closest-side,
        #fff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    .marker {
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      will-change: transform;
      /* Smooth catch-up when HA reports a new value; none while dragging */
      transition: transform 120ms ease-out;
    }
    .marker.dragging {
      transition: none;
      width: 22px;
      height: 22px;
      margin: -2px 0 0 -2px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-color-wheel": UlmColorWheel;
  }
}
