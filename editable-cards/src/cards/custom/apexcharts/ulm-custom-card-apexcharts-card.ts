/**
 * Lit port of custom_cards/custom_card_apexcharts/apexcharts.yaml
 * Layout: 3× generic-swap rows + nested custom:apexcharts-card (HACS).
 */
import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { COLOR_OPTIONS, resolveThemeRgb } from "../../../shared/colors";
import {
  colorField,
  entityField,
  helpers,
  iconField,
  labels,
  numberField,
  selectField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

const CHART_TYPES = [
  { value: "radialBar", label: "radialBar" },
  { value: "donut", label: "donut" },
  { value: "pie", label: "pie" },
  { value: "line", label: "line" },
  { value: "scatter", label: "scatter" },
] as const;

const APEX_TAG = "apexcharts-card";

export interface UlmCustomApexchartsCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-apexcharts-card";
  entity_1: string;
  entity_2?: string;
  entity_3?: string;
  name_1?: string;
  name_2?: string;
  name_3?: string;
  icon_1?: string;
  icon_2?: string;
  icon_3?: string;
  color_1?: UlmThemeColor;
  color_2?: UlmThemeColor;
  color_3?: UlmThemeColor;
  max_1?: number;
  max_2?: number;
  max_3?: number;
  chart_type?: string;
  graph_span?: string;
}

interface SeriesSlot {
  entity?: string;
  name?: string;
  icon?: string;
  color: UlmThemeColor;
  max: number;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asColor(raw: unknown, fallback: UlmThemeColor): UlmThemeColor {
  if (typeof raw === "string" && COLOR_OPTIONS.includes(raw as UlmThemeColor)) {
    return raw as UlmThemeColor;
  }
  return fallback;
}

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function rgbToHex(rgb: string): string {
  const parts = rgb.split(",").map((p) => Number.parseInt(p.trim(), 10));
  if (parts.length < 3 || parts.some((n) => !Number.isFinite(n))) return "#3D5AFE";
  return `#${parts
    .slice(0, 3)
    .map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0"))
    .join("")}`;
}

@customElement("ulm-custom-card-apexcharts-card")
export class UlmCustomApexchartsCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomApexchartsCardConfig;
  @state() private _apexMissing = false;
  @query(".chart-host") private _chartHost?: HTMLDivElement;

  private _chartEl?: LovelaceCard & HTMLElement;
  private _chartKey = "";
  private _chartLoading = false;
  private _chartDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        selectField("chart_type", [...CHART_TYPES]),
        textField("graph_span"),
        entityField("entity_1"),
        entityField("entity_2", undefined, false),
        entityField("entity_3", undefined, false),
        textField("name_1"),
        textField("name_2"),
        textField("name_3"),
        iconField("icon_1"),
        iconField("icon_2"),
        iconField("icon_3"),
        colorField("color_1"),
        colorField("color_2"),
        colorField("color_3"),
        numberField("max_1"),
        numberField("max_2"),
        numberField("max_3"),
      ],
      computeLabel: labels({
        chart_type: "Chart type",
        graph_span: "Graph span",
        entity_1: "Entity 1",
        entity_2: "Entity 2",
        entity_3: "Entity 3",
        name_1: "Name 1",
        name_2: "Name 2",
        name_3: "Name 3",
        icon_1: "Icon 1",
        icon_2: "Icon 2",
        icon_3: "Icon 3",
        color_1: "Color 1",
        color_2: "Color 2",
        color_3: "Color 3",
        max_1: "Max value 1",
        max_2: "Max value 2",
        max_3: "Max value 3",
      }),
      computeHelper: helpers({
        chart_type:
          "Requires HACS apexcharts-card: line, scatter, pie, donut, radialBar",
        graph_span: "Time span for line/scatter (e.g. 1d, 1h, 12min)",
        max_1: "Used as series max for radialBar (default 100)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomApexchartsCardConfig> {
    return {
      entity_1: "sensor.outside_temperature",
      entity_2: "sensor.outside_humidity",
      entity_3: "sensor.power_consumption",
      color_1: "yellow",
      color_2: "blue",
      color_3: "green",
      max_1: 40,
      max_2: 100,
      max_3: 1000,
      chart_type: "radialBar",
      graph_span: "1d",
    };
  }

  public setConfig(config: UlmCustomApexchartsCardConfig): void {
    const c = config as UlmCustomApexchartsCardConfig &
      Record<string, unknown>;

    const nested = (key: string) => {
      const raw = c[key];
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        return raw as Record<string, unknown>;
      }
      return undefined;
    };
    const e1 = nested("entity_1");
    const e2 = nested("entity_2");
    const e3 = nested("entity_3");

    const entity1 =
      (typeof config.entity_1 === "string" ? config.entity_1 : undefined) ||
      (e1?.entity_id as string | undefined);
    if (!entity1) throw new Error("Please define entity_1");

    this._config = {
      ...config,
      entity_1: entity1,
      entity_2:
        (typeof config.entity_2 === "string" ? config.entity_2 : undefined) ||
        (e2?.entity_id as string | undefined),
      entity_3:
        (typeof config.entity_3 === "string" ? config.entity_3 : undefined) ||
        (e3?.entity_id as string | undefined),
      name_1:
        (pick(c, "name_1", "entity_1_name") as string) ||
        (e1?.name as string | undefined),
      name_2:
        (pick(c, "name_2", "entity_2_name") as string) ||
        (e2?.name as string | undefined),
      name_3:
        (pick(c, "name_3", "entity_3_name") as string) ||
        (e3?.name as string | undefined),
      icon_1: (pick(c, "icon_1") as string) || (e1?.icon as string | undefined),
      icon_2: (pick(c, "icon_2") as string) || (e2?.icon as string | undefined),
      icon_3: (pick(c, "icon_3") as string) || (e3?.icon as string | undefined),
      color_1: asColor(pick(c, "color_1") ?? e1?.color, "yellow"),
      color_2: asColor(pick(c, "color_2") ?? e2?.color, "blue"),
      color_3: asColor(pick(c, "color_3") ?? e3?.color, "green"),
      max_1: asNum(pick(c, "max_1") ?? e1?.max_value, 100),
      max_2: asNum(pick(c, "max_2") ?? e2?.max_value, 100),
      max_3: asNum(pick(c, "max_3") ?? e3?.max_value, 100),
      chart_type: String(pick(c, "chart_type") || "radialBar"),
      graph_span: String(pick(c, "graph_span") || "1d"),
      type: "custom:ulm-custom-card-apexcharts-card",
    };
    this._chartKey = "";
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
      min_rows: 2,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (
      changed.has("_config") ||
      changed.has("hass") ||
      !this._chartEl ||
      this._apexMissing
    ) {
      void this._syncChart();
    } else if (this._chartEl) {
      this._chartEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const slots = this._slots();
    return html`
      <ha-card class="ulm-card ulm-apexcharts">
        <div class="layout">
          <div class="entities">
            ${slots.map((slot) => this._entityRow(slot))}
          </div>
          <div class="chart">
            ${this._apexMissing
              ? html`<div class="missing-dep">
                  Install
                  <strong>apexcharts-card</strong>
                  from HACS (RomRider) and add it as a Lovelace resource.
                </div>`
              : html`<div class="chart-host"></div>`}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _slots(): SeriesSlot[] {
    const cfg = this._config!;
    return [
      {
        entity: cfg.entity_1,
        name: cfg.name_1,
        icon: cfg.icon_1,
        color: cfg.color_1 || "yellow",
        max: cfg.max_1 || 100,
      },
      {
        entity: cfg.entity_2,
        name: cfg.name_2,
        icon: cfg.icon_2,
        color: cfg.color_2 || "blue",
        max: cfg.max_2 || 100,
      },
      {
        entity: cfg.entity_3,
        name: cfg.name_3,
        icon: cfg.icon_3,
        color: cfg.color_3 || "green",
        max: cfg.max_3 || 100,
      },
    ].filter((s) => !!s.entity);
  }

  private _entityRow(slot: SeriesSlot) {
    const stateObj = slot.entity
      ? this.hass!.states[slot.entity]
      : undefined;
    if (!stateObj) {
      return html`<div class="entity-slot missing">
        <div class="warning">Entity not found: ${slot.entity}</div>
      </div>`;
    }
    const rgb = resolveThemeRgb(this, slot.color);
    const iconStyle = {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };
    const name =
      slot.name || stateObj.attributes.friendly_name || stateObj.entity_id;
    const icon =
      slot.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:chart-arc";
    const label = this.hass!.formatEntityState
      ? this.hass!.formatEntityState(stateObj)
      : stateObj.attributes.unit_of_measurement
        ? `${stateObj.state} ${stateObj.attributes.unit_of_measurement}`
        : stateObj.state;

    // Icon pinned with absolute left (not flex) — matches original icon_info.
    return html`
      <div class="entity-slot">
        <div
          class="series"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo(slot.entity!)}
          @keydown=${(ev: KeyboardEvent) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              this._moreInfo(slot.entity!);
            }
          }}
        >
          <div class="series-icon" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="series-text">
            <div class="series-name">${name}</div>
            <div class="series-state">${label}</div>
          </div>
        </div>
      </div>
    `;
  }

  private _seriesColor(color: UlmThemeColor): string {
    const cssVar = getComputedStyle(this)
      .getPropertyValue(`--google-${color}`)
      .trim();
    if (cssVar) return cssVar;
    return rgbToHex(resolveThemeRgb(this, color));
  }

  private _buildApexConfig(): LovelaceCardConfig {
    const cfg = this._config!;
    const slots = this._slots();
    const chartType = cfg.chart_type || "radialBar";
    const series = slots.map((slot) => {
      const stateObj = slot.entity
        ? this.hass!.states[slot.entity]
        : undefined;
      const name =
        slot.name ||
        stateObj?.attributes.friendly_name ||
        slot.entity ||
        "";
      const entry: Record<string, unknown> = {
        entity: slot.entity,
        name,
        color: this._seriesColor(slot.color),
      };
      // max is only meaningful for radialBar (original always passed it)
      if (chartType === "radialBar") {
        entry.max = slot.max;
        entry.min = 0;
      }
      return entry;
    });

    return {
      type: `custom:${APEX_TAG}`,
      graph_span: cfg.graph_span || "1d",
      chart_type: chartType,
      header: { show: false },
      // Match original YAML apex_config (+ height 100% so it fills without overflow)
      apex_config: {
        title: {
          floating: false,
          align: "top",
          style: { fontSize: "2px", fontWeight: "bold" },
        },
        chart: {
          foreColor: "rgb(148,148,148)",
          offsetY: 5,
          height: "100%",
          parentHeightOffset: 0,
        },
        legend: { show: false },
      },
      card_mod: {
        style: `
          ha-card {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 0 0 10px !important;
            margin: 0 !important;
            overflow: hidden !important;
            height: 100% !important;
          }
          #graph-wrapper, .wrapper {
            height: 100% !important;
            overflow: hidden !important;
            max-width: 100% !important;
          }
        `,
      },
      series,
    };
  }

  private async _syncChart(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (this._chartLoading) {
      this._chartDirty = true;
      return;
    }

    this._chartLoading = true;
    this._chartDirty = false;
    try {
      const available = await this._ensureApexLoaded();
      if (!available) {
        if (!this._apexMissing) this._apexMissing = true;
        return;
      }
      if (this._apexMissing) this._apexMissing = false;

      // Wait a frame so .chart-host exists after _apexMissing flip
      await this.updateComplete;
      const host = this._chartHost;
      if (!host) {
        this._chartDirty = true;
        return;
      }

      const apexConfig = this._buildApexConfig();
      const key = JSON.stringify(apexConfig);

      if (!this._chartEl || key !== this._chartKey) {
        this._chartKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._chartEl = helpersApi.createCardElement(
            apexConfig,
          ) as LovelaceCard & HTMLElement;
        } else {
          const el = document.createElement(APEX_TAG) as LovelaceCard &
            HTMLElement;
          el.setConfig(apexConfig);
          this._chartEl = el;
        }
        this._chartEl.hass = this.hass;
        host.replaceChildren(this._chartEl);
      } else {
        this._chartEl.hass = this.hass;
      }
    } finally {
      this._chartLoading = false;
      if (this._chartDirty) {
        this._chartDirty = false;
        void this._syncChart();
      }
    }
  }

  private async _ensureApexLoaded(): Promise<boolean> {
    if (customElements.get(APEX_TAG)) return true;

    // Custom cards from resources may still be loading
    try {
      await Promise.race([
        customElements.whenDefined(APEX_TAG),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 2500),
        ),
      ]);
    } catch {
      /* timeout */
    }
    return !!customElements.get(APEX_TAG);
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      container-type: inline-size;
      /* Prevent HA/theme RTL from flipping icon↔text and entities↔chart */
      direction: ltr;
    }

    /* Original: padding 0, aspect_ratio 2/1, grid 35%/65% × 3 rows */
    ha-card.ulm-card.ulm-apexcharts {
      width: 100%;
      max-width: 100%;
      aspect-ratio: 2 / 1;
      height: auto;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* Original grid: 35% entities / 65% chart, 3 equal rows */
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 35%) minmax(0, 65%);
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas:
        "entities chart"
        "entities chart"
        "entities chart";
      width: 100%;
      height: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      box-sizing: border-box;
      overflow: hidden;
      direction: ltr !important;
    }

    @container (max-width: 340px) {
      ha-card.ulm-card.ulm-apexcharts {
        aspect-ratio: auto;
      }

      .layout {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto minmax(140px, 160px);
        grid-template-areas:
          "entities"
          "chart";
      }
    }

    .entities {
      grid-area: entities;
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      min-width: 0;
      max-width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0;
      box-sizing: border-box;
    }

    .entity-slot {
      display: flex;
      align-items: center;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    /*
      Matches nested card_generic_swap inside apexcharts.yaml:
      - icon_more_info_new card padding: 12px
      - apexcharts overrides only padding-top/bottom: 1px
      → effective: 1px 12px 1px 12px
      - icon_info: 42px circle, name/label margin-left: 12px, icon 20px
    */
    .series {
      position: relative;
      display: block;
      width: 100%;
      max-width: 100%;
      min-height: 42px;
      margin: 0;
      /* top/right/bottom/left — left reserves 12 + 42 + 12 for icon+gap */
      padding: 1px 12px 1px 66px;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left !important;
      direction: ltr !important;
      cursor: pointer;
      box-sizing: border-box;
      overflow: hidden;
    }

    .series-icon {
      position: absolute !important;
      left: 12px !important;
      right: auto !important;
      top: 50%;
      transform: translateY(-50%);
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    .series-icon ha-icon {
      --mdc-icon-size: 20px;
    }

    .series-text {
      display: block;
      width: 100%;
      max-width: 100%;
      text-align: left !important;
      overflow: hidden;
    }

    .series-name,
    .series-state {
      display: block;
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      text-align: left !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .series-name {
      font-size: 14px;
      font-weight: bold;
    }

    .series-state {
      font-size: 12px;
      font-weight: bolder;
      opacity: 0.4;
    }

    .chart {
      grid-area: chart;
      position: relative;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 0;
      height: 100%;
      overflow: hidden;
      box-sizing: border-box;
      /* Original apexcharts-card style: padding-left: 10px */
      padding-left: 10px;
    }

    .chart-host {
      width: 100%;
      height: 100%;
      max-width: 100%;
      overflow: hidden;
      box-sizing: border-box;
    }

    .chart-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      height: 100% !important;
      max-height: 100% !important;
      overflow: hidden !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 8px;
      box-sizing: border-box;
    }

    .missing {
      padding: 4px;
      overflow: hidden;
    }
  `;
}
