/**
 * Lit port of custom_cards/custom_card_input_datetime/card_input_datetime.yaml
 * Header + ↓ / time / ↑. Uses minute steps (default 15) instead of original TZ hacks.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  entityField,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomInputDatetimeCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-input-datetime-card";
  entity: string;
  name?: string;
  icon?: string;
  /** Minutes per arrow tap (default 15) */
  step?: number;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw) && raw > 0) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

@customElement("ulm-custom-card-input-datetime-card")
export class UlmCustomInputDatetimeCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomInputDatetimeCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "input_datetime"),
        textField("name"),
        iconField("icon"),
        numberField("step"),
      ],
      computeLabel: labels({
        entity: "input_datetime entity",
        name: "Name (ulm_card_input_datetime_name)",
        icon: "Icon",
        step: "Minute step",
      }),
      computeHelper: helpers({
        entity: "Prefer has_time. Arrows adjust by step minutes.",
        step: "Default 15. Original YAML used opaque second offsets.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomInputDatetimeCardConfig> {
    return {
      entity: "input_datetime.alarm_weekday_time",
      name: "Alarm time",
      icon: "mdi:clock-outline",
      step: 15,
    };
  }

  public setConfig(config: UlmCustomInputDatetimeCardConfig): void {
    const c = config as UlmCustomInputDatetimeCardConfig &
      Record<string, unknown>;
    const entity = (config.entity || pick(c, "entity")) as string | undefined;
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name:
        (pick(c, "name", "ulm_card_input_datetime_name") as string) ||
        undefined,
      icon: (pick(c, "icon") as string) || undefined,
      step: asNum(pick(c, "step"), 15),
      type: "custom:ulm-custom-card-input-datetime-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-input-datetime"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:clock-outline";
    const value =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const changed = stateObj.last_changed
      ? this._relativeTime(stateObj.last_changed)
      : "";

    return html`
      <ha-card class="ulm-card ulm-input-datetime">
        <div class="stack">
          <div
            class="row"
            role="button"
            tabindex="0"
            @click=${() => this._moreInfo()}
            @keydown=${(ev: KeyboardEvent) => {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                this._moreInfo();
              }
            }}
          >
            <div class="icon-btn">
              <ha-icon .icon=${icon}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${name}</div>
              <div class="label">${changed}</div>
            </div>
          </div>
          <div class="controls">
            <button class="widget-btn" type="button" @click=${() => this._adjust(-1)}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="value-readout">${value}</div>
            <button class="widget-btn" type="button" @click=${() => this._adjust(1)}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _adjust(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const stepMin = this._config.step ?? 15;
    const next = this._nextTime(stateObj, direction * stepMin);
    if (!next) return;
    this.hass.callService("input_datetime", "set_datetime", {
      entity_id: this._config.entity,
      time: next,
    });
  }

  private _nextTime(stateObj: HassEntity, deltaMinutes: number): string | null {
    const hasTime = stateObj.attributes.has_time !== false;
    if (!hasTime) return null;
    let totalMin: number;
    const ts = Number(stateObj.attributes.timestamp);
    if (Number.isFinite(ts) && ts > 0) {
      const d = new Date(ts * 1000);
      totalMin = d.getHours() * 60 + d.getMinutes() + deltaMinutes;
    } else {
      const raw = String(stateObj.state || "00:00:00");
      const parts = raw.split(":");
      const h = Number.parseInt(parts[0] || "0", 10) || 0;
      const m = Number.parseInt(parts[1] || "0", 10) || 0;
      totalMin = h * 60 + m + deltaMinutes;
    }
    totalMin = ((totalMin % 1440) + 1440) % 1440;
    const hh = Math.floor(totalMin / 60);
    const mm = totalMin % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
  }

  private _relativeTime(iso: string): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const sec = Math.max(0, Math.round((Date.now() - then) / 1000));
    if (sec < 60) return `${sec}s`;
    const min = Math.round(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.round(min / 60);
    if (hr < 48) return `${hr}h`;
    return `${Math.round(hr / 24)}d`;
  }

  private _moreInfo() {
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-input-datetime {
      height: auto !important;
      display: block;
      padding: 12px;
    }

    ha-card.ulm-card.ulm-input-datetime > .stack {
      flex: none;
      gap: 12px;
    }

    .controls {
      gap: 0 7px;
      column-gap: 7px;
    }

    .icon-btn {
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .value-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-input-datetime-card": UlmCustomInputDatetimeCard;
  }
}
