/**
 * Lit port of custom_cards/custom_card_speedtest_shogun160/
 * Three-column download / upload / ping metrics.
 * Note: original YAML nests apexcharts-card radialBar gauges; chart nesting
 * is replaced here with CSS/SVG semicircle gauges (no HACS apexcharts-card).
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  booleanField,
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

/** ApexCharts radialBar angles from the YAML (degrees from top, clockwise). */
const GAUGE_START = -108;
const GAUGE_END = 108;
const GAUGE_SPAN = GAUGE_END - GAUGE_START; // 216°
const GAUGE_R = 38;
const GAUGE_CX = 50;
const GAUGE_CY = 48;

export interface UlmCustomSpeedtestShogun160CardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-speedtest-shogun160-card";
  /** Download speed sensor — also ulm_custom_card_speedtest_download_speed_entity */
  download_entity: string;
  /** Upload speed sensor — also ulm_custom_card_speedtest_upload_speed_entity */
  upload_entity: string;
  /** Ping sensor — also ulm_custom_card_speedtest_ping_entity */
  ping_entity: string;
  /** CSS color string (default var(--google-yellow)) */
  download_color?: string;
  /** CSS color string (default var(--google-blue)) */
  upload_color?: string;
  /** CSS color string (default var(--google-green)) */
  ping_color?: string;
  download_max?: number;
  upload_max?: number;
  ping_max?: number;
  /** Round numeric values (YAML applied to download/upload) */
  round?: boolean;
}

interface MetricCol {
  entity: string;
  name: string;
  icon: string;
  color: string;
  max: number;
  /** Apply round when config.round is true */
  allowRound: boolean;
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

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

/** 0° = top, positive clockwise → SVG coords. */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polar(cx, cy, r, startAngle);
  const end = polar(cx, cy, r, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

const TRACK_PATH = arcPath(GAUGE_CX, GAUGE_CY, GAUGE_R, GAUGE_START, GAUGE_END);
const ARC_LEN = (GAUGE_SPAN / 360) * 2 * Math.PI * GAUGE_R;

@customElement("ulm-custom-card-speedtest-shogun160-card")
export class UlmCustomSpeedtestShogun160Card
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomSpeedtestShogun160CardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("download_entity", ["sensor", "number"]),
        entityField("upload_entity", ["sensor", "number"]),
        entityField("ping_entity", ["sensor", "number"]),
        textField("download_color"),
        textField("upload_color"),
        textField("ping_color"),
        numberField("download_max"),
        numberField("upload_max"),
        numberField("ping_max"),
        booleanField("round"),
      ],
      computeLabel: labels({
        download_entity: "Download entity",
        upload_entity: "Upload entity",
        ping_entity: "Ping entity",
        download_color: "Download color (CSS)",
        upload_color: "Upload color (CSS)",
        ping_color: "Ping color (CSS)",
        download_max: "Download max",
        upload_max: "Upload max",
        ping_max: "Ping max",
        round: "Round values",
      }),
      computeHelper: helpers({
        download_entity:
          "Also accepts ulm_custom_card_speedtest_download_speed_entity",
        download_color: "Default var(--google-yellow)",
        upload_color: "Default var(--google-blue)",
        ping_color: "Default var(--google-green)",
        download_max: "Default 100",
        upload_max: "Default 40",
        ping_max: "Default 85",
        round: "Round download/upload numeric states (YAML behavior)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomSpeedtestShogun160CardConfig> {
    return {
      download_entity: "sensor.speedtest_download",
      upload_entity: "sensor.speedtest_upload",
      ping_entity: "sensor.speedtest_ping",
      download_color: "var(--google-yellow)",
      upload_color: "var(--google-blue)",
      ping_color: "var(--google-green)",
      download_max: 100,
      upload_max: 40,
      ping_max: 85,
      round: false,
    };
  }

  public setConfig(config: UlmCustomSpeedtestShogun160CardConfig): void {
    const c = config as UlmCustomSpeedtestShogun160CardConfig &
      Record<string, unknown>;

    const download_entity = asStr(
      pick(
        c,
        "download_entity",
        "ulm_custom_card_speedtest_download_speed_entity",
      ),
    );
    const upload_entity = asStr(
      pick(
        c,
        "upload_entity",
        "ulm_custom_card_speedtest_upload_speed_entity",
      ),
    );
    const ping_entity = asStr(
      pick(c, "ping_entity", "ulm_custom_card_speedtest_ping_entity"),
    );

    if (!download_entity || !upload_entity || !ping_entity) {
      throw new Error(
        "Please define download_entity, upload_entity, and ping_entity",
      );
    }

    this._config = {
      ...config,
      download_entity,
      upload_entity,
      ping_entity,
      download_color:
        asStr(
          pick(
            c,
            "download_color",
            "ulm_custom_card_speedtest_download_speed_color",
          ),
        ) || "var(--google-yellow)",
      upload_color:
        asStr(
          pick(
            c,
            "upload_color",
            "ulm_custom_card_speedtest_upload_speed_color",
          ),
        ) || "var(--google-blue)",
      ping_color:
        asStr(
          pick(c, "ping_color", "ulm_custom_card_speedtest_ping_color"),
        ) || "var(--google-green)",
      download_max: asNum(
        pick(
          c,
          "download_max",
          "ulm_custom_card_speedtest_download_speed_max",
        ),
        100,
      ),
      upload_max: asNum(
        pick(c, "upload_max", "ulm_custom_card_speedtest_upload_speed_max"),
        40,
      ),
      ping_max: asNum(
        pick(c, "ping_max", "ulm_custom_card_speedtest_ping_max"),
        85,
      ),
      round: asBool(pick(c, "round", "ulm_custom_card_speedtest_round"), false),
      type: "custom:ulm-custom-card-speedtest-shogun160-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const cols: MetricCol[] = [
      {
        entity: cfg.download_entity,
        name: "Download",
        icon: "mdi:download",
        color: cfg.download_color || "var(--google-yellow)",
        max: cfg.download_max ?? 100,
        allowRound: true,
      },
      {
        entity: cfg.upload_entity,
        name: "Upload",
        icon: "mdi:upload",
        color: cfg.upload_color || "var(--google-blue)",
        max: cfg.upload_max ?? 40,
        allowRound: true,
      },
      {
        entity: cfg.ping_entity,
        name: "Ping",
        icon: "mdi:wan",
        color: cfg.ping_color || "var(--google-green)",
        max: cfg.ping_max ?? 85,
        allowRound: false,
      },
    ];

    return html`
      <ha-card
        class="ulm-card ulm-speedtest"
        @click=${this._refreshEntities}
        role="button"
        tabindex="0"
        @keydown=${this._onKeydown}
      >
        <div class="st-cols">
          ${cols.map((col) => this._column(col))}
        </div>
      </ha-card>
    `;
  }

  private _column(col: MetricCol) {
    if (!this.hass || !this._config) return nothing;
    const st = this.hass.states[col.entity];
    const rawNum = st ? Number.parseFloat(st.state) : NaN;
    const ratio = Number.isFinite(rawNum)
      ? Math.min(1, Math.max(0, rawNum / Math.max(col.max, 1e-9)))
      : 0;
    const progressLen = ratio * ARC_LEN;
    const uom = (st?.attributes.unit_of_measurement as string) || "";
    let valueLabel = "";
    if (st?.state != null && st.state !== "") {
      if (Number.isFinite(rawNum) && this._config.round && col.allowRound) {
        valueLabel = String(Math.round(rawNum));
      } else {
        valueLabel = st.state;
      }
      if (uom) valueLabel += ` ${uom}`;
    }

    // YAML list_2_items_1_row: gauge absolute top -2%, icon/label/name stack at top 15%
    return html`
      <div class="st-col">
        <div class="st-gauge" aria-hidden="true">
          ${svg`
            <svg viewBox="0 0 100 72" class="st-svg">
              <path
                class="st-track"
                d=${TRACK_PATH}
                fill="none"
                stroke-width="7"
                stroke-linecap="round"
              />
              <path
                class="st-fill"
                d=${TRACK_PATH}
                fill="none"
                stroke=${col.color}
                stroke-width="7"
                stroke-linecap="round"
                style=${styleMap({
                  strokeDasharray: `${progressLen} ${ARC_LEN}`,
                })}
              />
            </svg>
          `}
        </div>
        <div class="st-info">
          <div class="st-icon-cell">
            <ha-icon
              .icon=${col.icon}
              style=${styleMap({ color: col.color })}
            ></ha-icon>
          </div>
          <div class="st-value">${valueLabel || "—"}</div>
          <div class="st-caption">${col.name}</div>
        </div>
      </div>
    `;
  }

  private _onKeydown = (ev: KeyboardEvent) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._refreshEntities();
    }
  };

  private _refreshEntities = () => {
    if (!this.hass || !this._config) return;
    const ids = [
      this._config.download_entity,
      this._config.upload_entity,
      this._config.ping_entity,
    ].filter(Boolean);
    if (!ids.length) return;
    this.hass.callService("homeassistant", "update_entity", {
      entity_id: ids,
    });
  };

  static styles = [
    ulmCardStyles,
    css`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-speedtest {
        padding: 0;
        cursor: pointer;
        overflow: hidden;
      }

      /* list_3_items row of 3 columns */
      .st-cols {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0;
        align-items: stretch;
      }

      /* list_2_items_1_row: fixed 100px, gauge + overlay info */
      .st-col {
        position: relative;
        height: 100px;
        min-width: 0;
        overflow: hidden;
      }

      .st-gauge {
        position: absolute;
        top: -2%;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        max-width: 140px;
        place-self: center;
        pointer-events: none;
      }

      .st-svg {
        width: 100%;
        height: auto;
        display: block;
      }

      .st-track {
        stroke: rgba(var(--color-theme, 51, 51, 51), 0.12);
      }

      .st-fill {
        transition: stroke-dasharray 0.35s ease;
      }

      /* YAML item2: top 15%, width 115%, grid 'i' 'l' 'n' */
      .st-info {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        width: 115%;
        display: grid;
        grid-template-areas: "i" "l" "n";
        grid-template-columns: 1fr;
        justify-items: center;
        pointer-events: none;
        z-index: 1;
      }

      .st-icon-cell {
        grid-area: i;
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
      }

      .st-icon-cell ha-icon {
        --mdc-icon-size: 24px;
        width: 24px;
        height: 24px;
      }

      .st-value {
        grid-area: l;
        justify-self: center;
        align-self: start;
        font-weight: bold;
        font-size: 14px;
        line-height: 1.2;
        text-align: center;
        margin: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .st-caption {
        grid-area: n;
        margin-top: 5px;
        justify-self: center;
        font-weight: bolder;
        font-size: 12px;
        filter: opacity(40%);
        text-align: center;
        line-height: 1.2;
      }
    `,
  ];
}
