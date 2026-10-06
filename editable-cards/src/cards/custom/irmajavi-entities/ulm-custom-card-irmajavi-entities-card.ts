/**
 * Lit port of custom_cards/custom_card_irmajavi_entities/
 * Header pill (emoji + name, main state) + 4 metric cells.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomIrmajaviEntitiesCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-irmajavi-entities-card";
  /** Main entity — also ulm_custom_card_irmajavi_entities */
  entity?: string;
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

@customElement("ulm-custom-card-irmajavi-entities-card")
export class UlmCustomIrmajaviEntitiesCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomIrmajaviEntitiesCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        textField("icon"),
        entityField("entity_1", undefined, false),
        entityField("entity_2", undefined, false),
        entityField("entity_3", undefined, false),
        entityField("entity_4", undefined, false),
        textField("name_1"),
        textField("name_2"),
        textField("name_3"),
        textField("name_4"),
      ],
      computeLabel: labels({
        entity: "Main entity (ulm_custom_card_irmajavi_entities)",
        name: "Header name (ulm_custom_card_irmajavi_entities_name)",
        icon: "Header emoji/icon (ulm_custom_card_irmajavi_entities_icon)",
        entity_1: "Metric 1 entity",
        entity_2: "Metric 2 entity",
        entity_3: "Metric 3 entity",
        entity_4: "Metric 4 entity",
        name_1: "Metric 1 caption (ulm_custom_card_irmajavi_entities_name_1)",
        name_2: "Metric 2 caption",
        name_3: "Metric 3 caption",
        name_4: "Metric 4 caption",
      }),
      computeHelper: helpers({
        icon: "Emoji or text shown before the header name (default 👽)",
        entity_1: "Legacy: ulm_custom_card_irmajavi_entities_entity_1",
        entity_2: "Legacy: ulm_custom_card_irmajavi_entities_entity_2",
        entity_3: "Legacy: ulm_custom_card_irmajavi_entities_entity_3",
        entity_4: "Legacy: ulm_custom_card_irmajavi_entities_entity_4",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomIrmajaviEntitiesCardConfig> {
    return {
      entity: "sensor.demo",
      name: "Entities",
      icon: "👽",
      entity_1: "sensor.demo",
      name_1: "Metric 1",
    };
  }

  public setConfig(config: UlmCustomIrmajaviEntitiesCardConfig): void {
    const c = config as UlmCustomIrmajaviEntitiesCardConfig &
      Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_custom_card_irmajavi_entities"),
    );
    if (!entity) throw new Error("Please define an entity");

    const slot = (n: 1 | 2 | 3 | 4) =>
      asStr(
        pick(
          c,
          `entity_${n}`,
          `ulm_custom_card_irmajavi_entities_entity_${n}`,
        ),
      );

    this._config = {
      ...config,
      entity,
      name:
        asStr(pick(c, "name", "ulm_custom_card_irmajavi_entities_name")) ||
        undefined,
      icon:
        asStr(pick(c, "icon", "ulm_custom_card_irmajavi_entities_icon")) ||
        "👽",
      entity_1: slot(1),
      entity_2: slot(2),
      entity_3: slot(3),
      entity_4: slot(4),
      name_1: asStr(
        pick(c, "name_1", "ulm_custom_card_irmajavi_entities_name_1"),
      ),
      name_2: asStr(
        pick(c, "name_2", "ulm_custom_card_irmajavi_entities_name_2"),
      ),
      name_3: asStr(
        pick(c, "name_3", "ulm_custom_card_irmajavi_entities_name_3"),
      ),
      name_4: asStr(
        pick(c, "name_4", "ulm_custom_card_irmajavi_entities_name_4"),
      ),
      type: "custom:ulm-custom-card-irmajavi-entities-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 3,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const main = this.hass.states[cfg.entity!];
    const headerName = `${cfg.icon} ${cfg.name || main?.attributes.friendly_name || cfg.entity}`;
    const mainState = main
      ? this.hass.formatEntityState?.(main) || main.state
      : "—";

    const metrics = ([1, 2, 3, 4] as const).map((i) => ({
      entity: cfg[`entity_${i}`],
      name: cfg[`name_${i}`],
    }));

    return html`
      <ha-card class="ulm-card ulm-irmajavi-entities">
        <div class="stack">
          <div class="header-pill">
            <div class="header-name">${headerName}</div>
            <div class="header-state">${mainState}</div>
          </div>
          <div class="metrics">
            ${metrics.map((m) => this._metricCell(m.entity, m.name))}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _metricCell(entityId?: string, caption?: string) {
    if (!entityId) {
      return html`<div class="metric empty"></div>`;
    }
    const stateObj = this.hass!.states[entityId];
    const stateLabel = stateObj
      ? this._formatState(stateObj)
      : "—";
    return html`
      <button
        class="metric"
        type="button"
        @click=${(ev: Event) => {
          ev.stopPropagation();
          this._moreInfo(entityId);
        }}
      >
        <div class="metric-state">${stateLabel}</div>
        <div class="metric-caption">${caption || ""}</div>
      </button>
    `;
  }

  private _formatState(stateObj: HassEntity): string {
    return this.hass?.formatEntityState?.(stateObj) || stateObj.state;
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

    ha-card.ulm-irmajavi-entities {
      border-radius: 30px;
      height: 160px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .header-pill {
      border: 2px solid var(--google-grey, var(--divider-color));
      border-radius: 20px;
      height: 70px;
      box-sizing: border-box;
      display: grid;
      grid-template-areas:
        "name"
        "state";
      grid-template-rows: min-content min-content;
      align-content: center;
      padding: 0;
    }

    .header-name {
      grid-area: name;
      align-self: start;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin-left: 12px;
      line-height: 1.2;
    }

    .header-state {
      grid-area: state;
      justify-self: start;
      align-self: end;
      font-weight: bold;
      font-size: 14px;
      filter: opacity(40%);
      margin-left: 35px;
      line-height: 1.2;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 7px;
    }

    .metric {
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
      display: grid;
      grid-template-areas:
        "state"
        "caption";
      grid-template-rows: min-content min-content;
      min-width: 0;
      font: inherit;
      color: inherit;
    }

    .metric.empty {
      pointer-events: none;
    }

    .metric-state {
      grid-area: state;
      margin-top: 10px;
      justify-self: center;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
    }

    .metric-caption {
      grid-area: caption;
      justify-self: center;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
      line-height: 1.2;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-irmajavi-entities-card": UlmCustomIrmajaviEntitiesCard;
  }
}
