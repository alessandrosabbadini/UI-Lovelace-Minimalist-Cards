/**
 * Lit port of custom_cards/custom_card_nik_nas/
 * Power switch status + up to 4 metric rows when on.
 * Note: original YAML nests apexcharts-card radialBar when on; chart nesting
 * is skipped here for a lighter shippable port — metric rows only. Re-add via
 * apexcharts custom card patterns if HACS apexcharts-card is required.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { COLOR_OPTIONS, resolveThemeRgb } from "../../../shared/colors";
import {
  colorField,
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
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

interface MetricSlot {
  entity?: string;
  name?: string;
  icon?: string;
  color: UlmThemeColor;
  max?: number;
}

export interface UlmCustomNikNasCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-nik-nas-card";
  /** NAS power switch */
  entity: string;
  name?: string;
  icon?: string;
  entity_1?: string;
  entity_2?: string;
  entity_3?: string;
  entity_4?: string;
  name_1?: string;
  name_2?: string;
  name_3?: string;
  name_4?: string;
  icon_1?: string;
  icon_2?: string;
  icon_3?: string;
  icon_4?: string;
  color_1?: UlmThemeColor;
  color_2?: UlmThemeColor;
  color_3?: UlmThemeColor;
  color_4?: UlmThemeColor;
  max_1?: number;
  max_2?: number;
  max_3?: number;
  max_4?: number;
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

function asColor(raw: unknown, fallback: UlmThemeColor): UlmThemeColor {
  if (typeof raw === "string" && COLOR_OPTIONS.includes(raw as UlmThemeColor)) {
    return raw as UlmThemeColor;
  }
  return fallback;
}

function asNum(raw: unknown): number | undefined {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : undefined;
}

function parseMetric(
  c: Record<string, unknown>,
  idx: 1 | 2 | 3 | 4,
  defaultColor: UlmThemeColor,
): MetricSlot {
  const nested = c[`entity_${idx}`];
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    const o = nested as Record<string, unknown>;
    return {
      entity: asStr(pick(o, "entity_id", "entity")),
      name: asStr(pick(o, "name")),
      icon: asStr(pick(o, "icon")),
      color: asColor(pick(o, "color"), defaultColor),
      max: asNum(pick(o, "max", "max_value", "max_1")),
    };
  }
  return {
    entity: asStr(pick(c, `entity_${idx}`)),
    name: asStr(pick(c, `name_${idx}`)),
    icon: asStr(pick(c, `icon_${idx}`)),
    color: asColor(pick(c, `color_${idx}`), defaultColor),
    max: asNum(pick(c, `max_${idx}`)),
  };
}

@customElement("ulm-custom-card-nik-nas-card")
export class UlmCustomNikNasCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomNikNasCardConfig;
  @state() private _metrics: MetricSlot[] = [];

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["switch", "input_boolean"]),
        textField("name"),
        iconField("icon"),
        entityField("entity_1", undefined, false),
        entityField("entity_2", undefined, false),
        entityField("entity_3", undefined, false),
        entityField("entity_4", undefined, false),
        textField("name_1"),
        textField("name_2"),
        textField("name_3"),
        textField("name_4"),
        iconField("icon_1"),
        iconField("icon_2"),
        iconField("icon_3"),
        iconField("icon_4"),
        colorField("color_1"),
        colorField("color_2"),
        colorField("color_3"),
        colorField("color_4"),
        numberField("max_1"),
        numberField("max_2"),
        numberField("max_3"),
        numberField("max_4"),
      ],
      computeLabel: labels({
        entity: "NAS power switch",
        name: "Name",
        icon: "Status icon",
        entity_1: "Metric 1",
        entity_2: "Metric 2",
        entity_3: "Metric 3",
        entity_4: "Metric 4",
        name_1: "Name 1",
        name_2: "Name 2",
        name_3: "Name 3",
        name_4: "Name 4",
        icon_1: "Icon 1",
        icon_2: "Icon 2",
        icon_3: "Icon 3",
        icon_4: "Icon 4",
        color_1: "Color 1",
        color_2: "Color 2",
        color_3: "Color 3",
        color_4: "Color 4",
        max_1: "Max 1 (optional)",
        max_2: "Max 2",
        max_3: "Max 3",
        max_4: "Max 4",
      }),
      computeHelper: helpers({
        entity: "When off: single status row. When on: status + metrics",
        max_1: "Shown as value/max when set",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomNikNasCardConfig> {
    return {
      entity: "switch.ac",
      name: "NAS",
      icon: "mdi:nas",
      entity_1: "sensor.power_consumption",
      name_1: "CPU",
      icon_1: "mdi:cpu-64-bit",
      color_1: "blue",
      entity_2: "sensor.outside_temperature",
      name_2: "Temp",
      icon_2: "mdi:thermometer",
      color_2: "red",
      entity_3: "sensor.outside_humidity",
      name_3: "RAM",
      icon_3: "mdi:memory",
      color_3: "green",
      entity_4: "sensor.demo",
      name_4: "Disk",
      icon_4: "mdi:harddisk",
      color_4: "yellow",
    };
  }

  public setConfig(config: UlmCustomNikNasCardConfig): void {
    const c = config as UlmCustomNikNasCardConfig & Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define a power entity");

    const defaults: UlmThemeColor[] = ["yellow", "blue", "red", "green"];
    const m1 = parseMetric(c, 1, defaults[0]);
    const m2 = parseMetric(c, 2, defaults[1]);
    const m3 = parseMetric(c, 3, defaults[2]);
    const m4 = parseMetric(c, 4, defaults[3]);
    this._metrics = [m1, m2, m3, m4];

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      icon: asStr(pick(c, "icon")) || "mdi:nas",
      entity_1: m1.entity,
      entity_2: m2.entity,
      entity_3: m3.entity,
      entity_4: m4.entity,
      name_1: m1.name,
      name_2: m2.name,
      name_3: m3.name,
      name_4: m4.name,
      icon_1: m1.icon,
      icon_2: m2.icon,
      icon_3: m3.icon,
      icon_4: m4.icon,
      color_1: m1.color,
      color_2: m2.color,
      color_3: m3.color,
      color_4: m4.color,
      max_1: m1.max,
      max_2: m2.max,
      max_3: m3.max,
      max_4: m4.max,
      type: "custom:ulm-custom-card-nik-nas-card",
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
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const power = this.hass.states[this._config.entity];
    if (!power) {
      return html`<ha-card class="ulm-card ulm-nik-nas"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const on = power.state === "on";
    const name =
      this._config.name ||
      power.attributes.friendly_name ||
      "Status";
    const icon = this._config.icon || "mdi:nas";
    const rgb = resolveThemeRgb(this, "blue");
    const iconStyle = on
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    const statusLabel =
      this.hass.formatEntityState?.(power) || (on ? "On" : "Off");

    const metrics = this._metrics.filter((m) => m.entity);

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-nik-nas": true,
          on,
        })}
      >
        <button class="status" @click=${() => this._moreInfo(this._config!.entity)}>
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="label">${statusLabel}</div>
          </div>
        </button>

        ${on && metrics.length
          ? html`<div class="metrics">
              ${metrics.map((m) => this._metricRow(m))}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _metricRow(m: MetricSlot) {
    if (!m.entity || !this.hass) return nothing;
    const st = this.hass.states[m.entity];
    const name =
      m.name ||
      st?.attributes.friendly_name ||
      m.entity;
    const icon =
      m.icon ||
      (st?.attributes.icon as string | undefined) ||
      "mdi:chart-donut";
    const rgb = resolveThemeRgb(this, m.color);
    const raw = st ? Number.parseFloat(st.state) : NaN;
    const uom = (st?.attributes.unit_of_measurement as string) || "";
    let value: string;
    if (!st) value = "—";
    else if (Number.isFinite(raw)) {
      const rounded = Math.round(raw * 10) / 10;
      value =
        m.max != null
          ? `${rounded}/${m.max}${uom ? ` ${uom}` : ""}`
          : `${rounded}${uom ? ` ${uom}` : ""}`;
    } else {
      value = `${st.state}${uom ? ` ${uom}` : ""}`;
    }

    return html`
      <button
        class="metric"
        @click=${() => this._moreInfo(m.entity!)}
      >
        <div
          class="m-icon"
          style=${styleMap({
            color: `rgba(${rgb}, 1)`,
            backgroundColor: `rgba(${rgb}, 0.2)`,
          })}
        >
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="m-info">
          <div class="m-name">${name}</div>
          <div class="m-val">${value}</div>
        </div>
      </button>
    `;
  }

  private _moreInfo(entityId: string) {
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

      ha-card.ulm-nik-nas {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
        border: 2px solid var(--google-grey, #9e9e9e);
        border-radius: 14px;
        background: transparent;
        padding: 8px;
        cursor: pointer;
        color: inherit;
        text-align: left;
        box-sizing: border-box;
      }

      .icon-btn {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .icon-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .info {
        margin-left: 12px;
        min-width: 0;
      }

      .name {
        font-weight: bold;
        font-size: 14px;
      }

      .label {
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
      }

      .metrics {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .metric {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        padding: 4px 0;
        cursor: pointer;
        color: inherit;
        text-align: left;
        width: 100%;
      }

      .m-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .m-icon ha-icon {
        --mdc-icon-size: 18px;
      }

      .m-info {
        margin-left: 10px;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }

      .m-name {
        font-size: 12px;
        font-weight: bold;
        filter: opacity(40%);
      }

      .m-val {
        font-size: 14px;
        font-weight: 600;
      }
    `,
  ];
}
