/**
 * Lit port of custom_cards/custom_card_schumijo_flower/
 * Plant header (flower template) + flower-card attribute row approximation.
 * HACS flower-card skipped — shows plant attribute icons / optional mini bars.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomSchumijoFlowerCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-schumijo-flower-card";
  entity: string;
  name?: string;
  species?: string;
  show_bars?: boolean;
  label_problem?: string;
  label_correct?: string;
}

/** Attribute keys + defaults aligned with HA plant / classic flower-card. */
const PLANT_ATTRS: {
  key: string;
  icon: string;
  minKey: string;
  maxKey: string;
  defaultMin: number;
  defaultMax: number;
  logScale?: boolean;
}[] = [
  {
    key: "moisture",
    icon: "mdi:water-percent",
    minKey: "min_moisture",
    maxKey: "max_moisture",
    defaultMin: 20,
    defaultMax: 60,
  },
  {
    key: "conductivity",
    icon: "mdi:flash",
    minKey: "min_conductivity",
    maxKey: "max_conductivity",
    defaultMin: 500,
    defaultMax: 3000,
  },
  {
    key: "brightness",
    icon: "mdi:brightness-6",
    minKey: "min_brightness",
    maxKey: "max_brightness",
    defaultMin: 500,
    defaultMax: 30000,
    logScale: true,
  },
  {
    key: "temperature",
    icon: "mdi:thermometer",
    minKey: "min_temperature",
    maxKey: "max_temperature",
    defaultMin: 15,
    defaultMax: 30,
  },
  {
    key: "humidity",
    icon: "mdi:water",
    minKey: "min_humidity",
    maxKey: "max_humidity",
    defaultMin: 30,
    defaultMax: 80,
  },
];

function numAttr(attrs: Record<string, unknown>, key: string): number | undefined {
  const v = attrs[key];
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number.parseFloat(String(v));
  return Number.isFinite(n) ? n : undefined;
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

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

@customElement("ulm-custom-card-schumijo-flower-card")
export class UlmCustomSchumijoFlowerCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomSchumijoFlowerCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["plant", "binary_sensor"]),
        textField("name"),
        textField("species"),
        booleanField("show_bars"),
        textField("label_problem"),
        textField("label_correct"),
      ],
      computeLabel: labels({
        entity: "Plant entity (ulm_card_flower_entity)",
        name: "Name (ulm_card_flower_name)",
        species: "Species (ulm_card_flower_species)",
        show_bars: "Show attribute bars (ulm_card_flower_show_bars)",
        label_problem: "Problem label (ulm_custom_card_schumijo_flower_problem)",
        label_correct: "OK label (ulm_custom_card_schumijo_flower_correct)",
      }),
      computeHelper: helpers({
        entity: "Tap header for more-info",
        show_bars: "When off, icons only (flower-card hides values in YAML)",
        species: "Original flower-card species string — cosmetic in this port",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomSchumijoFlowerCardConfig> {
    return {
      entity: "plant.monstera",
      name: "Monstera",
      species: "monstera",
      show_bars: true,
      label_problem: "Problem",
      label_correct: "Correct",
    };
  }

  public setConfig(config: UlmCustomSchumijoFlowerCardConfig): void {
    const c = config as UlmCustomSchumijoFlowerCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity", "ulm_card_flower_entity"));
    if (!entity) throw new Error("Please define a plant entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name", "ulm_card_flower_name")),
      species: asStr(pick(c, "species", "ulm_card_flower_species")),
      show_bars: asBool(pick(c, "show_bars", "ulm_card_flower_show_bars"), true),
      label_problem: asStr(
        pick(c, "label_problem", "ulm_custom_card_schumijo_flower_problem"),
      ) || "Problem",
      label_correct: asStr(
        pick(c, "label_correct", "ulm_custom_card_schumijo_flower_correct"),
      ) || "Correct",
      type: "custom:ulm-custom-card-schumijo-flower-card",
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
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this.hass.states[this._config.entity];
    if (!st) {
      return html`<ha-card class="ulm-card ulm-schumijo-flower"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const problem = st.state === "problem";
    const healthy = st.state !== "on" && st.state !== "problem";
    const greenRgb = resolveThemeRgb(this, "green");
    const icon = problem ? "mdi:alert-circle" : "mdi:flower";
    const iconStyle = healthy
      ? {
          color: `rgba(${greenRgb}, 1)`,
          backgroundColor: `rgba(${greenRgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    const label = problem
      ? this._config.label_problem
      : this._config.label_correct;
    const name =
      this._config.name ||
      (st.attributes.friendly_name as string | undefined) ||
      st.entity_id;

    return html`
      <ha-card class="ulm-card ulm-schumijo-flower">
        <button class="header" @click=${() => this._moreInfo(this._config!.entity)}>
          <div class="icon-cell" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info">
            <div class="flower-name">${name}</div>
            <div class="flower-label">${label}</div>
          </div>
        </button>
        <div class="attrs">${this._renderAttributes(st)}</div>
      </ha-card>
    `;
  }

  private _renderAttributes(st: HassEntity) {
    const showBars = this._config!.show_bars !== false;
    const attrs = st.attributes as Record<string, unknown>;
    const items = PLANT_ATTRS.filter(
      (a) => attrs[a.key] !== undefined && attrs[a.key] !== null,
    );
    if (!items.length) {
      return html`<div class="attrs-empty">No plant attributes on entity</div>`;
    }

    /* flower-card: 3-segment meter (red | green | red), good/bad colours */
    return items.map((a) => {
      const val = numAttr(attrs, a.key);
      const aval = val !== undefined;
      const min = numAttr(attrs, a.minKey) ?? a.defaultMin;
      const max = numAttr(attrs, a.maxKey) ?? a.defaultMax;
      const span = max - min;
      let pct = 0;
      if (aval && span > 0) {
        if (a.logScale && val! > 0 && min > 0) {
          pct =
            100 *
            Math.max(
              0,
              Math.min(
                1,
                (Math.log(val!) - Math.log(min)) /
                  (Math.log(max) - Math.log(min)),
              ),
            );
        } else {
          pct = 100 * Math.max(0, Math.min(1, (val! - min) / span));
        }
      }
      const outOfRange = aval && (val! < min || val! > max);
      const leftClass = !aval
        ? "unavailable"
        : outOfRange
          ? "bad"
          : "good";
      const midClass = !aval
        ? "unavailable"
        : aval && val! > max
          ? "bad"
          : "good";
      const rightWidth = aval && val! > max ? 100 : 0;
      const tip = aval
        ? `${a.key}: ${val} (${min} ~ ${max})`
        : `${a.key}: unavailable`;

      return html`
        <div class="attr" title=${tip}>
          <ha-icon .icon=${a.icon}></ha-icon>
          ${showBars
            ? html`
                <div class="meter red">
                  <span
                    class=${leftClass}
                    style=${styleMap({ width: "100%" })}
                  ></span>
                </div>
                <div class="meter green">
                  <span
                    class=${midClass}
                    style=${styleMap({
                      width: aval ? `${pct}%` : "0%",
                    })}
                  ></span>
                </div>
                <div class="meter red">
                  <span
                    class="bad"
                    style=${styleMap({ width: `${rightWidth}%` })}
                  ></span>
                </div>
              `
            : nothing}
        </div>
      `;
    });
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
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-schumijo-flower {
      border-radius: 20px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      overflow: visible;
    }

    .header {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      gap: 12px;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: left;
      color: inherit;
      width: 100%;
    }

    .icon-cell {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .flower-name {
      font-weight: bold;
      font-size: 14px;
    }

    .flower-label {
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
    }

    /* flower-card .attributes — padding 0 via YAML card_mod */
    .attrs {
      display: flex;
      flex-wrap: wrap;
      white-space: nowrap;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
      row-gap: 6px;
    }

    .attrs-empty {
      font-size: 12px;
      opacity: 0.5;
      text-align: center;
      width: 100%;
    }

    /* flower-card .attribute — 50% width, icon + 3 meters */
    .attr {
      display: flex;
      align-items: center;
      width: 50%;
      box-sizing: border-box;
      white-space: nowrap;
      min-width: 0;
      padding-right: 4px;
    }

    .attr ha-icon {
      --mdc-icon-size: 16px;
      margin-left: 5px;
      margin-right: 10px;
      flex-shrink: 0;
      color: rgba(var(--color-theme, 51, 51, 51), 0.85);
    }

    /* Three equal-width meter segments */
    .meter {
      height: 8px;
      background-color: var(
        --primary-background-color,
        rgba(var(--color-theme, 51, 51, 51), 0.12)
      );
      border-radius: 2px;
      display: inline-grid;
      overflow: hidden;
      flex: 1 1 0;
      min-width: 0;
      margin-right: 4px;
    }

    .meter:last-of-type {
      margin-right: 0;
    }

    .meter.red,
    .meter.green {
      max-width: none;
    }

    .meter > span {
      grid-row: 1;
      grid-column: 1;
      height: 100%;
      display: block;
    }

    .meter > .good {
      background-color: rgba(43, 194, 83, 1);
    }

    .meter > .bad {
      background-color: rgba(240, 163, 163, 1);
    }

    .meter > .unavailable {
      background-color: rgba(158, 158, 158, 1);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-schumijo-flower-card": UlmCustomSchumijoFlowerCard;
  }
}
