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

const PLANT_ATTRS: {
  key: string;
  icon: string;
  max?: number;
}[] = [
  { key: "moisture", icon: "mdi:water-percent", max: 100 },
  { key: "conductivity", icon: "mdi:flash", max: 2000 },
  { key: "brightness", icon: "mdi:brightness-6", max: 100000 },
  { key: "temperature", icon: "mdi:thermometer", max: 40 },
  { key: "humidity", icon: "mdi:water", max: 100 },
];

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
    const healthy = st.state !== "on" && !problem;
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
    const items = PLANT_ATTRS.filter(
      (a) => st.attributes[a.key] !== undefined && st.attributes[a.key] !== null,
    );
    if (!items.length) {
      return html`<div class="attrs-empty">No plant attributes on entity</div>`;
    }

    return items.map((a) => {
      const raw = Number.parseFloat(String(st.attributes[a.key]));
      const hasNum = Number.isFinite(raw);
      const pct =
        hasNum && a.max
          ? Math.max(0, Math.min(100, (raw / a.max) * 100))
          : hasNum
            ? Math.max(0, Math.min(100, raw))
            : 0;
      const rgb = resolveThemeRgb(this, "green");

      return html`
        <div class="attr" title=${`${a.key}: ${st.attributes[a.key]}`}>
          <ha-icon .icon=${a.icon}></ha-icon>
          ${showBars
            ? html`<div class="attr-bar">
                <div
                  class="attr-fill"
                  style=${styleMap({
                    width: `${pct}%`,
                    backgroundColor: `rgba(${rgb}, 0.85)`,
                  })}
                ></div>
              </div>`
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

    .attrs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 12px;
      padding: 4px 0 0;
      justify-content: space-around;
    }

    .attrs-empty {
      font-size: 12px;
      opacity: 0.5;
      text-align: center;
    }

    .attr {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 36px;
    }

    .attr ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.85);
    }

    .attr-bar {
      width: 32px;
      height: 4px;
      border-radius: 2px;
      background: rgba(var(--color-theme, 51, 51, 51), 0.12);
      overflow: hidden;
    }

    .attr-fill {
      height: 100%;
      border-radius: 2px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-schumijo-flower-card": UlmCustomSchumijoFlowerCard;
  }
}
