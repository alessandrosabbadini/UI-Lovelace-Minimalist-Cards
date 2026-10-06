/**
 * Lit port of custom_cards/custom_card_mpse_gauge/
 * icon_info header + dual-gauge-card look (concentric semicircles, no HACS dep).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  helpers,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

/** dual-gauge-card cardwidth from YAML */
const CARD_WIDTH = 200;

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

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

/**
 * dual-gauge-card._calculateRotation:
 * 180deg at min → 360deg at max (semicircle sweep).
 */
function gaugeAngle(value: number, min: number, max: number): string {
  if (!Number.isFinite(value)) return "180deg";
  const span = max - min || 1;
  const clamped = Math.min(Math.max(value, min), max);
  return `${180 + ((clamped - min) / span) * 180}deg`;
}

export interface UlmCustomMpseGaugeCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-mpse-gauge-card";
  entity: string;
  name?: string;
  icon?: string;
  min?: number;
  max?: number;
}

@customElement("ulm-custom-card-mpse-gauge-card")
export class UlmCustomMpseGaugeCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomMpseGaugeCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        textField("icon"),
        numberField("min"),
        numberField("max"),
      ],
      computeLabel: labels({
        entity: "Gauge entity",
        name: "Name override",
        icon: "Icon override",
        min: "Minimum",
        max: "Maximum",
      }),
      computeHelper: helpers({
        min: "Legacy ulm_card_mpse_gauge_min (default 0)",
        max: "Legacy ulm_card_mpse_gauge_max (default 100)",
        name: "Defaults to entity friendly_name",
        icon: "Defaults to entity icon",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomMpseGaugeCardConfig> {
    return {
      entity: "sensor.example",
      min: 0,
      max: 100,
    };
  }

  public setConfig(config: UlmCustomMpseGaugeCardConfig): void {
    const c = config as UlmCustomMpseGaugeCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      icon: asStr(pick(c, "icon")),
      min: asNum(pick(c, "min", "ulm_card_mpse_gauge_min"), 0),
      max: asNum(pick(c, "max", "ulm_card_mpse_gauge_max"), 100),
      type: "custom:ulm-custom-card-mpse-gauge-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-mpse-gauge"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const min = this._config.min ?? 0;
    const max = this._config.max ?? 100;
    const raw = Number.parseFloat(stateObj.state);
    const angle = gaugeAngle(raw, min, max);

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    /* YAML label: entity.state only (no unit) */
    const label = stateObj.state;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:gauge";
    const unavailable = stateObj.state === "unavailable";

    /* YAML: empty title when 0–100, else "min - max" */
    const title = min === 0 && max === 100 ? "" : `${min} - ${max}`;

    const iconStyle = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };

    const gaugeStyle = {
      "--gauge-card-width": `${CARD_WIDTH}px`,
      "--outer-angle": angle,
      "--inner-angle": angle,
      "--outer-color": "var(--google-blue)",
      "--inner-color": "var(--google-blue)",
    };

    return html`
      <ha-card class="ulm-card ulm-mpse-gauge" @click=${this._moreInfo}>
        <div class="header">
          <div class="row ${unavailable ? "unavailable" : ""}">
            <div class="icon-btn" style=${styleMap(iconStyle)}>
              <ha-icon .icon=${icon}></ha-icon>
              ${unavailable
                ? html`<div class="badge">
                    <ha-icon icon="mdi:exclamation"></ha-icon>
                  </div>`
                : nothing}
            </div>
            <div class="info-btn">
              <div class="name">${name}</div>
              <div class="label">${label}</div>
            </div>
          </div>
        </div>

        <div class="gauge-dual-card" style=${styleMap(gaugeStyle)}>
          <div class="gauge-dual">
            <div class="gauge-frame">
              <div class="gauge-background circle-container">
                <div class="circle"></div>
              </div>
              <div class="outer-gauge circle-container">
                <div class="circle"></div>
              </div>
              <div class="inner-gauge circle-container small-circle">
                <div class="circle"></div>
              </div>
              ${title
                ? html`<div class="gauge-title">${title}</div>`
                : nothing}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  };

  static styles = [
    ulmCardStyles,
    css`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-mpse-gauge {
        padding: 0;
        cursor: pointer;
        overflow: hidden;
      }

      /* item1: icon_info with padding 12px */
      .header {
        padding: 12px;
      }

      /* icon_info card chrome */
      .header .row {
        pointer-events: none;
        border-radius: 21px 8px 8px 21px;
        box-sizing: border-box;
      }

      /*
       * dual-gauge-card styles (cardwidth 200, shadeInner false).
       * Values/labels omitted — YAML hides them with transparent color.
       */
      .gauge-dual-card {
        --gauge-background-color: var(--secondary-background-color);
        --gauge-width: calc(var(--gauge-card-width) / 10.5);
        --title-font-size: calc(var(--gauge-card-width) / 16);
        width: var(--gauge-card-width);
        padding: 16px;
        box-sizing: border-box;
        margin: 0 auto;
        color: var(--google-grey, var(--secondary-text-color));
      }

      .gauge-dual-card div {
        box-sizing: border-box;
      }

      .gauge-dual {
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 50%;
      }

      .gauge-frame {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
      }

      .circle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%;
        border-radius: 100%;
        border: var(--gauge-width) solid;
        transition: border-color 0.5s linear;
      }

      .circle-container {
        position: absolute;
        transform-origin: 50% 100%;
        top: 0;
        left: 0;
        height: 50%;
        width: 100%;
        overflow: hidden;
        transition: transform 0.5s linear;
      }

      .small-circle .circle {
        top: 20%;
        left: 10%;
        width: 80%;
        height: 160%;
      }

      .gauge-background .circle {
        border: calc(var(--gauge-width) * 2 - 2px) solid
          var(--gauge-background-color);
      }

      .gauge-title {
        position: absolute;
        bottom: 51%;
        margin-bottom: 0.1em;
        text-align: center;
        width: 100%;
        font-size: var(--title-font-size);
        color: var(--google-grey, var(--secondary-text-color));
        pointer-events: none;
      }

      .outer-gauge {
        transform: rotate(var(--outer-angle));
      }

      .outer-gauge .circle {
        border-color: var(--outer-color);
      }

      .inner-gauge {
        transform: rotate(var(--inner-angle));
      }

      .inner-gauge .circle {
        border-color: var(--inner-color);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-mpse-gauge-card": UlmCustomMpseGaugeCard;
  }
}
