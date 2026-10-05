/**
 * Lit port of custom_cards/custom_card_schumijo_car/
 * Header icon_info (car + last_changed) with tracker/lock badges + energy|range widgets.
 * Tap header → hass-more-info on tracker (browser_mod popup skipped).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomSchumijoCarCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-schumijo-car-card";
  /** Tracker entity (also ulm_card_schumijo_car_tracker) */
  entity: string;
  name?: string;
  lock_entity?: string;
  energy_entity?: string;
  range_entity?: string;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asStr(raw: unknown): string | undefined {
  return typeof raw === "string" && raw ? raw : undefined;
}

@customElement("ulm-custom-card-schumijo-car-card")
export class UlmCustomSchumijoCarCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomSchumijoCarCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["device_tracker", "person"]),
        textField("name"),
        entityField("lock_entity", "lock", false),
        entityField("energy_entity", "sensor", false),
        entityField("range_entity", "sensor", false),
      ],
      computeLabel: labels({
        entity: "Tracker (ulm_card_schumijo_car_tracker)",
        name: "Name (ulm_card_schumijo_car_name)",
        lock_entity: "Lock (ulm_card_schumijo_car_lock)",
        energy_entity: "Energy (ulm_card_schumijo_car_energy_level)",
        range_entity: "Range (ulm_card_schumijo_car_range)",
      }),
      computeHelper: helpers({
        entity: "Person / device_tracker used for home vs away badge",
        lock_entity: "locked → blue lock; else red lock-open",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomSchumijoCarCardConfig> {
    return {
      entity: "person.alessandro_sabbadini",
      name: "Car",
      lock_entity: "lock.front_door_lock",
      energy_entity: "sensor.power_consumption",
      range_entity: "sensor.outside_temperature",
    };
  }

  public setConfig(config: UlmCustomSchumijoCarCardConfig): void {
    const c = config as UlmCustomSchumijoCarCardConfig & Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_card_schumijo_car_tracker"),
    );
    if (!entity) throw new Error("Please define a tracker entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name", "ulm_card_schumijo_car_name")),
      lock_entity: asStr(pick(c, "lock_entity", "ulm_card_schumijo_car_lock")),
      energy_entity: asStr(
        pick(c, "energy_entity", "ulm_card_schumijo_car_energy_level"),
      ),
      range_entity: asStr(
        pick(c, "range_entity", "ulm_card_schumijo_car_range"),
      ),
      type: "custom:ulm-custom-card-schumijo-car-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const tracker = this.hass.states[this._config.entity];
    if (!tracker) {
      return html`<ha-card class="ulm-card ulm-schumijo-car"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const name =
      this._config.name ||
      tracker.attributes.friendly_name ||
      tracker.entity_id;
    const changed = tracker.last_changed
      ? this._relativeTime(tracker.last_changed)
      : "";

    const home = tracker.state === "home";
    const trackerRgb = resolveThemeRgb(this, home ? "blue" : "green");
    const trackerIcon = home ? "mdi:home-variant" : "mdi:road-variant";

    const lockId = this._config.lock_entity;
    const lockState = lockId ? this.hass.states[lockId] : undefined;
    const locked = lockState?.state === "locked";
    const lockRgb = resolveThemeRgb(this, locked ? "blue" : "red");
    const lockIcon = locked ? "mdi:lock" : "mdi:lock-open";

    return html`
      <ha-card class="ulm-card ulm-schumijo-car">
        <button class="header" @click=${this._moreInfo}>
          <div class="img-wrap">
            <div class="img-cell">
              <ha-icon icon="mdi:car"></ha-icon>
            </div>
            <span
              class="badge tracker"
              style=${styleMap({ backgroundColor: `rgba(${trackerRgb}, 1)` })}
              title=${tracker.state}
            >
              <ha-icon .icon=${trackerIcon}></ha-icon>
            </span>
            ${lockId
              ? html`<span
                  class="badge lock"
                  style=${styleMap({
                    backgroundColor: `rgba(${lockRgb}, 1)`,
                  })}
                  title=${lockState?.state || "lock"}
                >
                  <ha-icon .icon=${lockIcon}></ha-icon>
                </span>`
              : nothing}
          </div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="label">${changed}</div>
          </div>
        </button>

        <div class="widgets">
          ${this._metricWidget(this._config.energy_entity, "Energy")}
          ${this._metricWidget(this._config.range_entity, "Range")}
        </div>
      </ha-card>
    `;
  }

  private _metricWidget(entityId: string | undefined, fallbackName: string) {
    if (!entityId || !this.hass) {
      return html`<div class="widget empty"></div>`;
    }
    const st = this.hass.states[entityId];
    if (!st) {
      return html`<div class="widget">
        <div class="w-val">—</div>
        <div class="w-name">${fallbackName}</div>
      </div>`;
    }
    const n = Number.parseFloat(st.state);
    const value = Number.isFinite(n) ? String(Math.round(n)) : st.state;
    const uom = (st.attributes.unit_of_measurement as string) || "";
    const label = uom ? `${uom} ${fallbackName}` : fallbackName;
    const icon =
      (st.attributes.icon as string | undefined) || "mdi:gauge";

    return html`
      <button class="widget" @click=${() => this._moreInfoEntity(entityId)}>
        <div class="w-row">
          <ha-icon .icon=${icon}></ha-icon>
          <span class="w-val">${value}</span>
        </div>
        <div class="w-name">${label}</div>
      </button>
    `;
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

  private _moreInfo = () => {
    if (!this._config) return;
    this._moreInfoEntity(this._config.entity);
  };

  private _moreInfoEntity(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  static styles = [
    ulmCardStyles,
    css`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-schumijo-car {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
        overflow: visible;
      }

      .header {
        display: grid;
        grid-template-columns: min-content 1fr;
        gap: 0;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        text-align: left;
        color: inherit;
        width: 100%;
      }

      .img-wrap {
        position: relative;
        width: 42px;
        height: 42px;
      }

      .img-cell {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      }

      .img-cell ha-icon {
        --mdc-icon-size: 20px;
      }

      .badge {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 2;
        pointer-events: none;
      }

      .badge.tracker {
        left: 30px;
        top: -2px;
      }

      .badge.lock {
        left: 30px;
        top: 24px;
      }

      .badge ha-icon {
        --mdc-icon-size: 10px;
        color: var(--primary-background-color, #fff);
      }

      .info {
        margin-left: 12px;
        min-width: 0;
      }

      .name {
        font-weight: bold;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .label {
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
      }

      .widgets {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .widget {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 42px;
        border: none;
        border-radius: 14px;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        padding: 4px 8px;
        cursor: pointer;
        color: inherit;
        text-align: left;
      }

      .widget.empty {
        visibility: hidden;
      }

      .w-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .w-row ha-icon {
        --mdc-icon-size: 20px;
        color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      }

      .w-val {
        font-size: 18px;
        font-weight: 600;
      }

      .w-name {
        font-weight: bold;
        font-size: 10px;
        filter: opacity(40%);
        margin-top: 1px;
      }
    `,
  ];
}
