/**
 * Lit port of custom_cards/custom_card_paddy_waste_collection/
 * card_generic_swap layout + daysTo / unavailable notification badge.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
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

export interface UlmCustomPaddyWasteCollectionCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-paddy-waste-collection-card";
  entity: string;
  name?: string;
  icon?: string;
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

function daysTo(stateObj: HassEntity): number | undefined {
  const raw = stateObj.attributes.daysTo;
  if (raw === undefined || raw === null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

@customElement("ulm-custom-card-paddy-waste-collection-card")
export class UlmCustomPaddyWasteCollectionCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPaddyWasteCollectionCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        iconField("icon"),
      ],
      computeLabel: labels({
        entity: "Waste collection entity",
        name: "Name (ulm_card_generic_swap_name)",
        icon: "Icon (ulm_card_generic_swap_icon)",
      }),
      computeHelper: helpers({
        entity: "Entity with attributes.daysTo for collection countdown",
        name: "Primary line; defaults to friendly name",
        icon: "Defaults to entity icon",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPaddyWasteCollectionCardConfig> {
    return {
      entity: "sensor.waste_collection",
      icon: "mdi:trash-can-outline",
    };
  }

  public setConfig(config: UlmCustomPaddyWasteCollectionCardConfig): void {
    const c = config as UlmCustomPaddyWasteCollectionCardConfig &
      Record<string, unknown>;
    const entity =
      config.entity ||
      asStr(pick(c, "ulm_card_generic_swap_entity")) ||
      undefined;
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name", "ulm_card_generic_swap_name")),
      icon: asStr(pick(c, "icon", "ulm_card_generic_swap_icon")),
      type: "custom:ulm-custom-card-paddy-waste-collection-card",
    };
  }

  public getCardSize(): number {
    return 1;
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
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-paddy-waste"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const dt = daysTo(stateObj);
    const unavailable =
      stateObj.state === "unavailable" || stateObj.state === "unknown";
    const alert =
      unavailable || dt === 0 || dt === 1;
    const urgent = dt === 0;
    const soon = dt === 1;

    const red = resolveThemeRgb(this, "red");
    const iconStyle = {
      color: alert ? `rgba(${red}, 1)` : "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: urgent
        ? `rgba(${red}, 0.5)`
        : soon
          ? `rgba(${red}, 0.05)`
          : "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };

    const primary =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const secondary = this._stateLabel(stateObj);
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:trash-can-outline";

    return html`
      <ha-card
        class="ulm-card ulm-paddy-waste"
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${primary}</div>
            <div class="label">${secondary}</div>
          </div>
        </div>
        ${alert
          ? html`
              <span
                class="notification"
                style=${styleMap({
                  backgroundColor: `rgba(${red}, 1)`,
                })}
              >
                <ha-icon icon="mdi:exclamation"></ha-icon>
              </span>
            `
          : nothing}
      </ha-card>
    `;
  }

  private _stateLabel(stateObj: HassEntity): string {
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    const unit = stateObj.attributes.unit_of_measurement;
    return unit ? `${stateObj.state} ${unit}` : stateObj.state;
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
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-paddy-waste {
        position: relative;
        height: auto;
        cursor: pointer;
        overflow: visible;
      }

      .notification {
        position: absolute;
        left: 38px;
        top: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 1;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 12px;
        width: 12px;
        height: 12px;
        color: var(--primary-background-color, #fff);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-paddy-waste-collection-card": UlmCustomPaddyWasteCollectionCard;
  }
}
