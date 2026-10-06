/**
 * Lit port of custom_cards/custom_card_wsly_pollen/
 * Three vertical pollen columns (tree / grass / weed) with level colors.
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
  | "very_high";

const DEFAULT_LEVEL_LABELS: Record<PollenLevel, string> = {
  none: "None",
  very_low: "Very low",
  low: "Low",
  medium: "Medium",
  high: "High",
  very_high: "Very high",
};

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

function normalizeLevel(state: string): PollenLevel {
  if (
    state === "none" ||
    state === "very_low" ||
    state === "low" ||
    state === "medium" ||
    state === "high" ||
    state === "very_high"
  ) {
    return state;
  }
  return "none";
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
        grid([
          textField("tree_name"),
          iconField("tree_icon"),
        ]),
        grid([
          textField("grass_name"),
          iconField("grass_icon"),
        ]),
        grid([
          textField("weed_name"),
          iconField("weed_icon"),
        ]),
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

    const columns = [
      {
        entityId: this._config.tree_entity,
        name: this._config.tree_name || "Trees",
        icon: this._config.tree_icon,
      },
      {
        entityId: this._config.grass_entity,
        name: this._config.grass_name || "Grass",
        icon: this._config.grass_icon,
      },
      {
        entityId: this._config.weed_entity,
        name: this._config.weed_name || "Weeds",
        icon: this._config.weed_icon,
      },
    ].filter((col) => col.entityId);

    if (!columns.length) {
      return html`
        <ha-card class="ulm-card ulm-wsly-pollen">
          <div class="warning">No pollen entities configured</div>
        </ha-card>
      `;
    }

    return html`
      <ha-card class="ulm-card ulm-wsly-pollen">
        <div
          class="columns"
          style=${styleMap({
            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          })}
        >
          ${columns.map((col) =>
            this._renderColumn(col.entityId!, col.name, col.icon),
          )}
        </div>
      </ha-card>
    `;
  }

  private _renderColumn(
    entityId: string,
    name: string,
    iconOverride?: string,
  ) {
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
      "mdi:flower-pollen";
    const displayName =
      name ||
      stateObj.attributes.friendly_name ||
      entityId;
    const label = this._levelLabel(level);
    const rgbRed = resolveThemeRgb(this, "red");

    return html`
      <div
        class="column vertical-btn"
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
        <button
          class="icon-btn"
          type="button"
          style=${styleMap(iconStyle)}
          tabindex="-1"
        >
          <ha-icon .icon=${icon}></ha-icon>
          ${level === "very_high"
            ? html`
                <span
                  class="extreme"
                  style=${styleMap({
                    backgroundColor: `rgba(${rgbRed}, 1)`,
                  })}
                >
                  <ha-icon icon="mdi:exclamation-thick"></ha-icon>
                </span>
              `
            : nothing}
        </button>
        <div class="col-name">${displayName}</div>
        <div class="col-label">${label}</div>
      </div>
    `;
  }

  private _levelLabel(level: PollenLevel): string {
    const cfg = this._config;
    const map: Record<PollenLevel, string | undefined> = {
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

    ha-card.ulm-wsly-pollen {
      height: auto !important;
      padding: 0;
      overflow: visible;
    }

    .columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 7px;
    }

    .vertical-btn {
      display: grid;
      grid-template-rows: min-content min-content min-content;
      grid-template-areas:
        "icon"
        "name"
        "label";
      justify-items: center;
      padding: 10px 0 8px;
      border-radius: var(--ulm-radius);
      box-shadow: none;
      cursor: pointer;
    }

    .vertical-btn .icon-btn {
      grid-area: icon;
      margin-top: 0;
    }

    .col-name {
      grid-area: name;
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
    }

    .col-label {
      grid-area: label;
      font-size: 12px;
      font-weight: bolder;
      opacity: 0.4;
      text-align: center;
    }

    .extreme {
      position: absolute;
      left: 38px;
      right: 0;
      top: 8px;
      margin-left: auto;
      margin-right: auto;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color);
      display: grid;
      place-items: center;
      pointer-events: none;
    }

    .extreme ha-icon {
      --mdc-icon-size: 12px;
      color: var(--primary-background-color);
    }

    .warning.small {
      font-size: 11px;
      padding: 8px 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-wsly-pollen-card": UlmCustomWslyPollenCard;
  }
}
