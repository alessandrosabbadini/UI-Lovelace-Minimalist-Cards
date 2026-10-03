import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";

export type UlmPopupKind =
  | "light"
  | "cover"
  | "thermostat"
  | "media_player"
  | "vacuum"
  | "weather"
  | "power_outlet";

/**
 * Opens a Minimalist-style popup dialog for an entity.
 * Usage from cards: import { openUlmPopup } from "..."; openUlmPopup(this, kind, entity);
 */
export function openUlmPopup(
  host: HTMLElement,
  kind: UlmPopupKind,
  entity: string,
) {
  let el = document.querySelector("ulm-popup-dialog") as UlmPopupDialog | null;
  if (!el) {
    el = document.createElement("ulm-popup-dialog") as UlmPopupDialog;
    document.body.appendChild(el);
  }
  const root = host as LitElement & { hass?: HomeAssistant };
  if (root.hass) el.hass = root.hass;
  el.open(kind, entity);
}

@customElement("ulm-popup-dialog")
export class UlmPopupDialog extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _open = false;
  @state() private _kind: UlmPopupKind = "light";
  @state() private _entity = "";

  public open(kind: UlmPopupKind, entity: string) {
    this._kind = kind;
    this._entity = entity;
    this._open = true;
  }

  public close() {
    this._open = false;
  }

  protected render() {
    if (!this._open || !this.hass) return nothing;
    const stateObj = this.hass.states[this._entity];
    if (!stateObj) {
      return html`<div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="title">Entity not found</div>
          <button class="close" @click=${this.close}>Close</button>
        </div>
      </div>`;
    }

    const name = stateObj.attributes.friendly_name || this._entity;

    return html`
      <div class="backdrop" @click=${this.close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <div>
              <div class="title">${name}</div>
              <div class="sub">${this._kind} · ${stateObj.state}</div>
            </div>
            <button class="close" @click=${this.close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="body">${this._renderBody(stateObj.state)}</div>
        </div>
      </div>
    `;
  }

  private _renderBody(state: string) {
    switch (this._kind) {
      case "light":
        return html`
          <div class="actions">
            <button @click=${() => this._call("light", "toggle")}>Toggle</button>
            <button @click=${() => this._call("light", "turn_on", { brightness_pct: 30 })}>30%</button>
            <button @click=${() => this._call("light", "turn_on", { brightness_pct: 60 })}>60%</button>
            <button @click=${() => this._call("light", "turn_on", { brightness_pct: 100 })}>100%</button>
          </div>
          <label class="slider">
            Brightness
            <input
              type="range"
              min="1"
              max="100"
              .value=${String(
                Math.round(
                  (((this.hass!.states[this._entity].attributes.brightness as
                    | number
                    | undefined) || 0) /
                    255) *
                    100,
                ) || 1,
              )}
              @change=${(ev: Event) =>
                this._call("light", "turn_on", {
                  brightness_pct: Number((ev.target as HTMLInputElement).value),
                })}
            />
          </label>
        `;
      case "cover":
        return html`<div class="actions">
          <button @click=${() => this._call("cover", "open_cover")}>Open</button>
          <button @click=${() => this._call("cover", "stop_cover")}>Stop</button>
          <button @click=${() => this._call("cover", "close_cover")}>Close</button>
        </div>`;
      case "thermostat":
        return html`<div class="actions">
          <button @click=${() => this._adjustTemp(-0.5)}>-0.5°</button>
          <button
            @click=${() =>
              this._call("climate", "set_hvac_mode", {
                hvac_mode: state === "off" ? "heat" : "off",
              })}
          >
            Power
          </button>
          <button @click=${() => this._adjustTemp(0.5)}>+0.5°</button>
        </div>`;
      case "media_player":
        return html`<div class="actions">
          <button @click=${() => this._call("media_player", "media_previous_track")}>Prev</button>
          <button @click=${() => this._call("media_player", "media_play_pause")}>Play/Pause</button>
          <button @click=${() => this._call("media_player", "media_next_track")}>Next</button>
        </div>`;
      case "vacuum":
        return html`<div class="actions">
          <button @click=${() => this._call("vacuum", "start")}>Start</button>
          <button @click=${() => this._call("vacuum", "pause")}>Pause</button>
          <button @click=${() => this._call("vacuum", "return_to_base")}>Dock</button>
        </div>`;
      case "weather":
        return html`<div class="info">
          Condition: ${state}<br />
          Temperature:
          ${this.hass!.states[this._entity].attributes.temperature ?? "n/a"}°
        </div>`;
      case "power_outlet":
        return html`<div class="actions">
          <button
            @click=${() =>
              this._call(this._entity.split(".")[0], "toggle")}
          >
            Toggle
          </button>
        </div>`;
      default:
        return nothing;
    }
  }

  private _adjustTemp(delta: number) {
    const current = Number(
      this.hass?.states[this._entity]?.attributes.temperature,
    );
    if (Number.isNaN(current)) return;
    this._call("climate", "set_temperature", { temperature: current + delta });
  }

  private _call(
    domain: string,
    service: string,
    data: Record<string, unknown> = {},
  ) {
    if (!this.hass) return;
    this.hass.callService(domain, service, {
      entity_id: this._entity,
      ...data,
    });
  }

  static styles = css`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: grid;
      place-items: center;
      z-index: 10000;
      padding: 16px;
    }
    .dialog {
      width: min(420px, 100%);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0 8px 24px rgba(0, 0, 0, 0.25));
      padding: 16px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .sub {
      opacity: 0.65;
      font-size: 12px;
      margin-top: 4px;
      text-transform: capitalize;
    }
    .close {
      border: 0;
      background: transparent;
      cursor: pointer;
      color: inherit;
    }
    .actions {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .actions button,
    .close {
      font: inherit;
    }
    .actions button {
      border: 0;
      border-radius: 12px;
      padding: 10px 8px;
      background: rgba(var(--color-theme, 51, 51, 51), 0.08);
      cursor: pointer;
      color: inherit;
    }
    .slider {
      display: grid;
      gap: 8px;
      margin-top: 16px;
      font-size: 13px;
    }
    .info {
      font-size: 14px;
      line-height: 1.5;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-popup-dialog": UlmPopupDialog;
  }
}
