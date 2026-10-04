/**
 * Lit port of custom_cards/custom_card_damix48_power_details/
 * Header (name + "in the last N hours") + nested HACS mini-graph-card.
 */
import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  COLOR_OPTIONS,
  resolveThemeRgb,
} from "../../../shared/colors";
import {
  booleanField,
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
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

const GRAPH_TAG = "mini-graph-card";

interface PowerThreshold {
  value: number;
  color: string;
}

interface LangPack {
  hour: string;
  hours: string;
  in_the_last: string;
  in_the_lasts: string;
}

const LANG: Record<string, LangPack> = {
  en: {
    hour: "hour",
    hours: "hours",
    in_the_last: "In the last",
    in_the_lasts: "In the last",
  },
  it: {
    hour: "ora",
    hours: "ore",
    in_the_last: "Nell'ultima",
    in_the_lasts: "Nelle ultime",
  },
  de: {
    hour: "Stunde",
    hours: "Stunden",
    in_the_last: "In der letzten",
    in_the_lasts: "In den letzten",
  },
  es: {
    hour: "hora",
    hours: "horas",
    in_the_last: "En la última",
    in_the_lasts: "En las últimas",
  },
  fr: {
    hour: "dernière heure",
    hours: "dernières heures",
    in_the_last: "Dans la",
    in_the_lasts: "Dans les",
  },
  nl: {
    hour: "uur",
    hours: "uren",
    in_the_last: "In de laatste",
    in_the_lasts: "In de laatste",
  },
  pl: {
    hour: "godziny",
    hours: "godzin",
    in_the_last: "W ciągu ostatniej",
    in_the_lasts: "W ciągu ostatnich",
  },
  sv: {
    hour: "timmen",
    hours: "timmarna",
    in_the_last: "Den senaste",
    in_the_lasts: "De senaste",
  },
};

const DEFAULT_THRESHOLDS: PowerThreshold[] = [
  { value: 0, color: "var(--info-color)" },
];

export interface UlmCustomDamix48PowerDetailsCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-damix48-power-details-card";
  entity: string;
  /** Graph entity; defaults to entity (ulm_card_power_details_entity) */
  power_entity?: string;
  name?: string;
  icon?: string;
  /** Theme color for the icon chip; empty / none = grey (no accent) */
  color?: UlmThemeColor | "";
  hours?: number;
  hour24?: boolean;
  height?: number;
  /** color_thresholds for mini-graph-card */
  thresholds?: PowerThreshold[];
  /** Optional JSON string for the UI editor */
  thresholds_json?: string;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function asOptionalColor(raw: unknown): UlmThemeColor | "" {
  if (raw === "" || raw === "none" || raw === null || raw === undefined) {
    return "";
  }
  if (typeof raw === "string" && COLOR_OPTIONS.includes(raw as UlmThemeColor)) {
    return raw as UlmThemeColor;
  }
  return "";
}

function parseThresholds(raw: unknown): PowerThreshold[] | undefined {
  if (Array.isArray(raw)) {
    const out: PowerThreshold[] = [];
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const o = item as Record<string, unknown>;
      const value = Number(o.value);
      const color = o.color;
      if (Number.isFinite(value) && typeof color === "string" && color) {
        out.push({ value, color });
      }
    }
    return out.length ? out : undefined;
  }
  if (typeof raw === "string" && raw.trim()) {
    try {
      return parseThresholds(JSON.parse(raw));
    } catch {
      return undefined;
    }
  }
  return undefined;
}

@customElement("ulm-custom-card-damix48-power-details-card")
export class UlmCustomDamix48PowerDetailsCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomDamix48PowerDetailsCardConfig;
  @state() private _graphMissing = false;
  @query(".graph-host") private _graphHost?: HTMLDivElement;

  private _graphEl?: LovelaceCard & HTMLElement;
  private _graphKey = "";
  private _graphLoading = false;
  private _graphDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "sensor"),
        entityField("power_entity", "sensor", false),
        textField("name"),
        iconField("icon"),
        selectField("color", [
          { value: "", label: "None (grey)" },
          ...COLOR_OPTIONS.map((c) => ({ value: c, label: c })),
        ]),
        numberField("hours"),
        booleanField("hour24"),
        numberField("height"),
        textField("thresholds_json"),
      ],
      computeLabel: labels({
        entity: "Entity (header icon / fallback)",
        power_entity: "Graph entity (ulm_card_power_details_entity)",
        name: "Name (ulm_card_power_details_name)",
        icon: "Icon",
        color: "Header icon color",
        hours: "Hours to show (ulm_card_power_details_hours)",
        hour24: "24h format (ulm_card_power_details_24hour)",
        height: "Graph height (ulm_card_power_details_height)",
        thresholds_json: "Thresholds JSON (ulm_card_power_details_thresholds)",
      }),
      computeHelper: helpers({
        entity: "Required since Minimalist v1.0.2 (header entity)",
        power_entity: "Defaults to entity when empty. Requires HACS mini-graph-card.",
        color: "None = grey inactive chip (original look for numeric sensors)",
        hours: "Default 2. Drives subtitle and hours_to_show / points_per_hour",
        hour24: "YAML default false (AM/PM). Set true for 24h axis labels",
        height: "Default 180",
        thresholds_json:
          'e.g. [{"value":0,"color":"#43A047"},{"value":2500,"color":"#FFA600"}]',
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomDamix48PowerDetailsCardConfig> {
    const thresholds = [
      { value: 0, color: "#43A047" },
      { value: 2500, color: "#FFA600" },
      { value: 3000, color: "#DB4437" },
    ];
    return {
      entity: "sensor.power_consumption",
      power_entity: "sensor.power_consumption",
      name: "Power",
      icon: "mdi:flash",
      color: "",
      hours: 2,
      hour24: true,
      height: 180,
      thresholds,
      thresholds_json: JSON.stringify(thresholds),
    };
  }

  public setConfig(config: UlmCustomDamix48PowerDetailsCardConfig): void {
    const c = config as UlmCustomDamix48PowerDetailsCardConfig &
      Record<string, unknown>;
    const entity =
      config.entity ||
      (pick(c, "ulm_card_power_details_entity") as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const power_entity =
      (pick(
        c,
        "power_entity",
        "ulm_card_power_details_entity",
      ) as string | undefined) || entity;

    // Prefer thresholds_json (UI editor) over thresholds array (YAML/stub),
    // otherwise a leftover stub array silently wins and ignores the JSON field.
    const jsonRaw = c.thresholds_json;
    const fromJson =
      typeof jsonRaw === "string" && jsonRaw.trim()
        ? parseThresholds(jsonRaw)
        : undefined;
    const fromYaml = parseThresholds(
      pick(c, "thresholds", "ulm_card_power_details_thresholds"),
    );
    const thresholds = fromJson || fromYaml || undefined;
    const thresholds_json = thresholds
      ? JSON.stringify(thresholds)
      : undefined;

    this._config = {
      ...config,
      entity,
      power_entity,
      name:
        (pick(c, "name", "ulm_card_power_details_name") as string) ||
        undefined,
      icon: (pick(c, "icon") as string) || undefined,
      color: asOptionalColor(
        c.color !== undefined ? c.color : pick(c, "color"),
      ),
      hours: asNum(pick(c, "hours", "ulm_card_power_details_hours"), 2),
      hour24: asBool(
        pick(c, "hour24", "ulm_card_power_details_24hour"),
        false,
      ),
      height: asNum(pick(c, "height", "ulm_card_power_details_height"), 180),
      thresholds,
      thresholds_json,
      type: "custom:ulm-custom-card-damix48-power-details-card",
    };
    this._graphKey = "";
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 3,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (
      changed.has("_config") ||
      changed.has("hass") ||
      !this._graphEl ||
      this._graphMissing
    ) {
      void this._syncGraph();
    } else if (this._graphEl) {
      this._graphEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];

    return html`
      <ha-card class="ulm-card ulm-power-details">
        ${this._header(stateObj)}
        <div class="graph-wrap">
          ${this._graphMissing
            ? html`<div class="missing-dep">
                Install <strong>mini-graph-card</strong> from HACS and add it as
                a Lovelace resource.
              </div>`
            : html`<div class="graph-host"></div>`}
        </div>
      </ha-card>
    `;
  }

  private _langPack(): LangPack {
    const lang = (this.hass?.language || "en").toLowerCase();
    const short = lang.split("-")[0];
    return LANG[lang] || LANG[short] || LANG.en;
  }

  private _hoursLabel(): string {
    const hours = this._config!.hours ?? 2;
    const p = this._langPack();
    if (hours === 1) {
      return `${p.in_the_last} ${p.hour}`;
    }
    return `${p.in_the_lasts} ${hours} ${p.hours}`;
  }

  private _header(stateObj?: HassEntity) {
    if (!stateObj) {
      return html`<div class="header missing">
        <div class="warning">Entity not found: ${this._config!.entity}</div>
      </div>`;
    }

    const color = this._config!.color;
    const iconStyle = color
      ? (() => {
          const rgb = resolveThemeRgb(this, color);
          return {
            color: `rgba(${rgb}, 1)`,
            backgroundColor: `rgba(${rgb}, 0.2)`,
          };
        })()
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    const name =
      this._config!.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config!.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:flash";

    return html`
      <div class="header">
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
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${this._hoursLabel()}</div>
          </div>
        </div>
      </div>
    `;
  }

  private _buildGraphConfig(): LovelaceCardConfig {
    const cfg = this._config!;
    const hours = cfg.hours ?? 2;
    const entityId = cfg.power_entity || cfg.entity;
    const thresholds = cfg.thresholds?.length
      ? cfg.thresholds
      : DEFAULT_THRESHOLDS;

    return {
      type: `custom:${GRAPH_TAG}`,
      entities: [{ entity: entityId }],
      color_thresholds: thresholds,
      hours_to_show: hours,
      points_per_hour: Math.floor(120 / hours),
      name: cfg.name || "",
      hour24: !!cfg.hour24,
      decimals: 1,
      show: {
        name: false,
        icon: false,
        legend: false,
        state: true,
      },
      align_state: "center",
      height: cfg.height ?? 180,
      card_mod: {
        style: `
          ha-card {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            border-radius: var(--border-radius, 20px) !important;
          }
          ha-card .state {
            font-weight: bold;
            font-size: 14px;
          }
          ha-card .graph__labels > span {
            background: var(--card-background-color);
            color: var(--secondary-text-color);
          }
        `,
      },
    };
  }

  private async _syncGraph(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (this._graphLoading) {
      this._graphDirty = true;
      return;
    }
    this._graphLoading = true;
    this._graphDirty = false;
    try {
      const available = await this._ensureGraphLoaded();
      if (!available) {
        if (!this._graphMissing) this._graphMissing = true;
        return;
      }
      if (this._graphMissing) this._graphMissing = false;

      await this.updateComplete;
      const host = this._graphHost;
      if (!host) {
        this._graphDirty = true;
        return;
      }

      const graphConfig = this._buildGraphConfig();
      const key = JSON.stringify(graphConfig);
      if (!this._graphEl || key !== this._graphKey) {
        this._graphKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._graphEl = helpersApi.createCardElement(
            graphConfig,
          ) as LovelaceCard & HTMLElement;
        } else {
          const el = document.createElement(GRAPH_TAG) as LovelaceCard &
            HTMLElement;
          el.setConfig(graphConfig);
          this._graphEl = el;
        }
        this._graphEl.hass = this.hass;
        host.replaceChildren(this._graphEl);
      } else {
        this._graphEl.hass = this.hass;
      }
    } finally {
      this._graphLoading = false;
      if (this._graphDirty) {
        this._graphDirty = false;
        void this._syncGraph();
      }
    }
  }

  private async _ensureGraphLoaded(): Promise<boolean> {
    if (customElements.get(GRAPH_TAG)) return true;
    try {
      await Promise.race([
        customElements.whenDefined(GRAPH_TAG),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 2500),
        ),
      ]);
    } catch {
      /* timeout */
    }
    return !!customElements.get(GRAPH_TAG);
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
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* YAML styles.card: padding 0 */
    ha-card.ulm-card.ulm-power-details {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
    }

    /* item1: top radii, padding 12px, no shadow */
    .header {
      padding: 12px;
      box-sizing: border-box;
      border-radius: var(--ulm-radius) var(--ulm-radius) 0 0;
      overflow: hidden;
    }

    .header .row {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      cursor: pointer;
      direction: ltr;
    }

    .header .label {
      opacity: 0.4;
    }

    .graph-wrap {
      width: 100%;
      min-width: 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    .graph-host {
      width: 100%;
      min-width: 0;
      overflow: hidden;
    }

    .graph-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 8px 12px;
    }

    .missing {
      padding: 8px 12px;
    }
  `;
}
