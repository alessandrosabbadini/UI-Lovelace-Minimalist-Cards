/**
 * Lit port of custom_cards/custom_card_wsly_pollen/
 * list_3_items outer card + 3× vertical_buttons (no per-item shadow).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  grid,
  helpers,
  iconField,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

type PollenLevel =
  | "none"
  | "very_low"
  | "low"
  | "medium"
  | "high"
  | "very_high"
  | "unknown";

const DEFAULT_LEVEL_LABELS: Record<Exclude<PollenLevel, "unknown">, string> = {
  none: "None",
  very_low: "Very low",
  low: "Low",
  medium: "Medium",
  high: "High",
  very_high: "Very high",
};

const DEFAULT_ICONS = {
  tree: "mdi:tree",
  grass: "mdi:grass",
  weed: "mdi:flower-pollen",
} as const;

export interface UlmCustomWslyPollenCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-wsly-pollen-card";
  tree_entity?: string;
  grass_entity?: string;
  weed_entity?: string;
  tree_name?: string;
  grass_name?: string;
  weed_name?: string;
  tree_icon?: string;
  grass_icon?: string;
  weed_icon?: string;
  label_none?: string;
  label_very_low?: string;
  label_low?: string;
  label_medium?: string;
  label_high?: string;
  label_very_high?: string;
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

/** Match YAML state styles; unknown → vertical_buttons default (theme 0.2 / 0.05). */
function levelStyle(
  host: HTMLElement,
  level: PollenLevel,
): Record<string, string> {
  switch (level) {
    case "none":
      return {
        color: `rgba(${resolveThemeRgb(host, "grey")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "grey")}, 0.2)`,
      };
    case "very_low":
      return {
        color: `rgba(${resolveThemeRgb(host, "green")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "green")}, 0.2)`,
      };
    case "low":
      return {
        color: "rgba(241, 196, 15, 1)",
        backgroundColor: "rgba(241, 196, 15, 0.2)",
      };
    case "medium":
      return {
        color: "rgba(243, 156, 18, 1)",
        backgroundColor: "rgba(243, 156, 18, 0.2)",
      };
    case "high":
      return {
        color: "rgba(231, 76, 60, 1)",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
      };
    case "very_high":
      return {
        color: `rgba(${resolveThemeRgb(host, "pink")}, 1)`,
        backgroundColor: `rgba(${resolveThemeRgb(host, "pink")}, 0.2)`,
      };
    default:
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
  }
}

/**
 * Klimalogger / pollen sensors use none|very_low|…|very_high.
 * Also accept 0–5 indexes and common aliases.
 */
function normalizeLevel(raw: string): PollenLevel {
  const s = raw.trim().toLowerCase().replace(/\s+/g, "_");
  if (
    s === "none" ||
    s === "very_low" ||
    s === "low" ||
    s === "medium" ||
    s === "high" ||
    s === "very_high"
  ) {
    return s;
  }
  if (s === "verylow" || s === "sehr_niedrig" || s === "zeer_laag") {
    return "very_low";
  }
  if (s === "sehr_hoch" || s === "veryhigh" || s === "extreem_hoog") {
    return "very_high";
  }
  const n = Number.parseFloat(raw);
  if (Number.isFinite(n)) {
    if (n <= 0) return "none";
    if (n <= 1) return "very_low";
    if (n <= 2) return "low";
    if (n <= 3) return "medium";
    if (n <= 4) return "high";
    return "very_high";
  }
  return "unknown";
}

@customElement("ulm-custom-card-wsly-pollen-card")
export class UlmCustomWslyPollenCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomWslyPollenCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("tree_entity", undefined, false),
        entityField("grass_entity", undefined, false),
        entityField("weed_entity", undefined, false),
        grid([textField("tree_name"), iconField("tree_icon")]),
        grid([textField("grass_name"), iconField("grass_icon")]),
        grid([textField("weed_name"), iconField("weed_icon")]),
        textField("label_none"),
        textField("label_very_low"),
        textField("label_low"),
        textField("label_medium"),
        textField("label_high"),
        textField("label_very_high"),
      ],
      computeLabel: labels({
        tree_entity: "Tree pollen entity",
        grass_entity: "Grass pollen entity",
        weed_entity: "Weed pollen entity",
        tree_name: "Tree column name",
        grass_name: "Grass column name",
        weed_name: "Weed column name",
        tree_icon: "Tree icon",
        grass_icon: "Grass icon",
        weed_icon: "Weed icon",
        label_none: "Label: none",
        label_very_low: "Label: very low",
        label_low: "Label: low",
        label_medium: "Label: medium",
        label_high: "Label: high",
        label_very_high: "Label: very high",
      }),
      computeHelper: helpers({
        tree_entity: "Legacy: custom_card_wsly_pollen_tree",
        grass_entity: "Legacy: custom_card_wsly_pollen_grass",
        weed_entity: "Legacy: custom_card_wsly_pollen_weed",
        tree_name: "Legacy: custom_card_wsly_pollen_tree_name (default Trees)",
        grass_name: "Legacy: custom_card_wsly_pollen_grass_name",
        weed_name: "Legacy: custom_card_wsly_pollen_weed_name",
        label_none: "Legacy: custom_card_wsly_pollen_none",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomWslyPollenCardConfig> {
    return {
      tree_entity: "sensor.pollen_tree",
      grass_entity: "sensor.pollen_grass",
      weed_entity: "sensor.pollen_weed",
      tree_name: "Trees",
      grass_name: "Grass",
      weed_name: "Weeds",
      tree_icon: DEFAULT_ICONS.tree,
      grass_icon: DEFAULT_ICONS.grass,
      weed_icon: DEFAULT_ICONS.weed,
    };
  }

  public setConfig(config: UlmCustomWslyPollenCardConfig): void {
    const c = config as UlmCustomWslyPollenCardConfig & Record<string, unknown>;
    const tree = asStr(
      pick(c, "tree_entity", "custom_card_wsly_pollen_tree", "entity"),
    );
    const grass = asStr(
      pick(c, "grass_entity", "custom_card_wsly_pollen_grass"),
    );
    const weed = asStr(pick(c, "weed_entity", "custom_card_wsly_pollen_weed"));
    if (!tree && !grass && !weed) {
      throw new Error("Please define at least one pollen entity");
    }

    this._config = {
      ...config,
      tree_entity: tree,
      grass_entity: grass,
      weed_entity: weed,
      tree_name: asStr(
        pick(c, "tree_name", "custom_card_wsly_pollen_tree_name"),
      ),
      grass_name: asStr(
        pick(c, "grass_name", "custom_card_wsly_pollen_grass_name"),
      ),
      weed_name: asStr(
        pick(c, "weed_name", "custom_card_wsly_pollen_weed_name"),
      ),
      tree_icon: asStr(
        pick(c, "tree_icon", "custom_card_wsly_pollen_tree_icon"),
      ),
      grass_icon: asStr(
        pick(c, "grass_icon", "custom_card_wsly_pollen_grass_icon"),
      ),
      weed_icon: asStr(
        pick(c, "weed_icon", "custom_card_wsly_pollen_weed_icon"),
      ),
      label_none: asStr(
        pick(c, "label_none", "custom_card_wsly_pollen_none"),
      ),
      label_very_low: asStr(
        pick(c, "label_very_low", "custom_card_wsly_pollen_very_low"),
      ),
      label_low: asStr(pick(c, "label_low", "custom_card_wsly_pollen_low")),
      label_medium: asStr(
        pick(c, "label_medium", "custom_card_wsly_pollen_medium"),
      ),
      label_high: asStr(pick(c, "label_high", "custom_card_wsly_pollen_high")),
      label_very_high: asStr(
        pick(c, "label_very_high", "custom_card_wsly_pollen_very_high"),
      ),
      type: "custom:ulm-custom-card-wsly-pollen-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    /* Always 3 columns like list_3_items + item1/2/3 */
    const columns = [
      {
        entityId: this._config.tree_entity,
        name: this._config.tree_name,
        icon: this._config.tree_icon,
        fallbackIcon: DEFAULT_ICONS.tree,
        fallbackName: "Trees",
      },
      {
        entityId: this._config.grass_entity,
        name: this._config.grass_name,
        icon: this._config.grass_icon,
        fallbackIcon: DEFAULT_ICONS.grass,
        fallbackName: "Grass",
      },
      {
        entityId: this._config.weed_entity,
        name: this._config.weed_name,
        icon: this._config.weed_icon,
        fallbackIcon: DEFAULT_ICONS.weed,
        fallbackName: "Weeds",
      },
    ];

    if (!columns.some((c) => c.entityId)) {
      return html`
        <ha-card class="ulm-card ulm-wsly-pollen">
          <div class="warning">No pollen entities configured</div>
        </ha-card>
      `;
    }

    return html`
      <ha-card class="ulm-card ulm-wsly-pollen">
        <div class="columns">
          ${columns.map((col) =>
            this._renderColumn(
              col.entityId,
              col.name,
              col.icon,
              col.fallbackIcon,
              col.fallbackName,
            ),
          )}
        </div>
      </ha-card>
    `;
  }

  private _renderColumn(
    entityId: string | undefined,
    nameOverride: string | undefined,
    iconOverride: string | undefined,
    fallbackIcon: string,
    fallbackName: string,
  ) {
    if (!entityId) {
      return html`<div class="column"></div>`;
    }

    const stateObj = this.hass!.states[entityId];
    if (!stateObj) {
      return html`
        <div class="column">
          <div class="warning small">${entityId}</div>
        </div>
      `;
    }

    const level = normalizeLevel(stateObj.state);
    const iconStyle = levelStyle(this, level);
    const icon =
      iconOverride ||
      (stateObj.attributes.icon as string | undefined) ||
      fallbackIcon;
    /* YAML: variables.*_name || friendly_name */
    const displayName =
      nameOverride ||
      (stateObj.attributes.friendly_name as string | undefined) ||
      fallbackName;
    const label =
      level === "unknown"
        ? this._levelLabel("none")
        : this._levelLabel(level);
    const rgbRed = resolveThemeRgb(this, "red");

    return html`
      <div
        class="column"
        role="button"
        tabindex="0"
        @click=${() => this._moreInfo(entityId)}
        @keydown=${(ev: KeyboardEvent) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            this._moreInfo(entityId);
          }
        }}
      >
        <div class="icon-btn" style=${styleMap(iconStyle)}>
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        ${level === "very_high"
          ? html`
              <!-- custom_fields.extreme — absolute on card, not on icon -->
              <div
                class="extreme"
                style=${styleMap({
                  backgroundColor: `rgba(${rgbRed}, 1)`,
                })}
              >
                <ha-icon icon="mdi:exclamation-thick"></ha-icon>
              </div>
            `
          : nothing}
        <div class="col-name">${displayName}</div>
        <div class="col-label">${label}</div>
      </div>
    `;
  }

  private _levelLabel(level: Exclude<PollenLevel, "unknown">): string {
    const cfg = this._config;
    const map: Record<Exclude<PollenLevel, "unknown">, string | undefined> = {
      none: cfg?.label_none,
      very_low: cfg?.label_very_low,
      low: cfg?.label_low,
      medium: cfg?.label_medium,
      high: cfg?.label_high,
      very_high: cfg?.label_very_high,
    };
    return map[level] ?? DEFAULT_LEVEL_LABELS[level];
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
      height: auto !important;
      align-self: start;
    }

    /* Outer: list_3_items padding 0 + card shadow/radius from custom_card_wsly_pollen */
    ha-card.ulm-wsly-pollen {
      height: auto !important;
      padding: 0;
      overflow: visible;
      box-shadow: var(--ulm-shadow);
      border-radius: var(--ulm-radius);
    }

    /* list_3_items grid */
    .columns {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: min-content;
      column-gap: 7px;
      width: 100%;
      box-sizing: border-box;
    }

    /*
     * vertical_buttons item with box-shadow: none
     * (one shared outer card — not three mini-cards)
     */
    .column {
      position: relative;
      display: grid;
      grid-template-areas:
        "icon"
        "name"
        "label";
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content min-content;
      justify-items: center;
      align-content: start;
      padding: 10px 0 8px;
      border-radius: var(--ulm-radius);
      box-shadow: none;
      background: transparent;
      cursor: pointer;
      outline: none;
      box-sizing: border-box;
      min-width: 0;
    }

    .column:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .icon-btn {
      grid-area: icon;
      place-self: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      position: relative;
      overflow: visible;
      border: 0;
      padding: 0;
      margin: 0;
      cursor: pointer;
      box-sizing: border-box;
    }

    .icon-btn ha-icon {
      --mdc-icon-size: 20px;
    }

    .col-name {
      grid-area: name;
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      justify-self: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 4px;
      box-sizing: border-box;
    }

    .col-label {
      grid-area: label;
      font-size: 12px;
      font-weight: bolder;
      filter: opacity(40%);
      text-align: center;
      align-self: start;
      justify-self: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 4px;
      box-sizing: border-box;
    }

    /*
     * custom_fields.extreme — circle position from YAML (do not change):
     * left 38px; right 0; top 8px; margin auto; 16×16 + 2px border.
     */
    .extreme {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 38px;
      right: 0;
      top: 8px;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color);
      font-size: 12px;
      line-height: 14px;
      color: white;
      box-sizing: content-box;
      padding: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
    }

    /* Center ! inside the red disc only — does not move .extreme */
    .extreme ha-icon {
      --mdc-icon-size: 12px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      margin: 0;
      padding: 0;
      display: block;
      line-height: 0;
      color: var(--primary-background-color);
    }

    .warning.small {
      font-size: 11px;
      padding: 8px 4px;
      text-align: center;
      word-break: break-all;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-wsly-pollen-card": UlmCustomWslyPollenCard;
  }
}
