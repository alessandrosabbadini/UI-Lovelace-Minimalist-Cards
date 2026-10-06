/**
 * Lit port of custom_cards/custom_card_paddy_dwd_pollen/
 * icon_more_info row: DWD level-colored icon + name + pollen label.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
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

const LEVEL_BG: Record<string, string> = {
  "6": "rgba(190, 0, 33, 1)",
  "5": "rgba(240, 56, 26, 1)",
  "4": "rgba(254, 154, 36, 1)",
  "3": "rgba(254, 197, 77, 1)",
  "2": "rgba(254, 228, 156, 1)",
  "1": "rgba(219, 250, 200, 1)",
};

const DEFAULT_LABELS: Record<string, string> = {
  "6": "high",
  "5": "medium to high",
  "4": "medium",
  "3": "low to mediuml",
  "2": "low",
  "1": "none to low",
  "0": "none",
};

export interface UlmCustomPaddyDwdPollenCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-paddy-dwd-pollen-card";
  entity: string;
  name?: string;
  icon?: string;
  label_6?: string;
  label_5?: string;
  label_4?: string;
  label_3?: string;
  label_2?: string;
  label_1?: string;
  label_none?: string;
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

@customElement("ulm-custom-card-paddy-dwd-pollen-card")
export class UlmCustomPaddyDwdPollenCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPaddyDwdPollenCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        iconField("icon"),
        textField("label_6"),
        textField("label_5"),
        textField("label_4"),
        textField("label_3"),
        textField("label_2"),
        textField("label_1"),
        textField("label_none"),
      ],
      computeLabel: labels({
        entity: "Pollen sensor",
        name: "Name",
        icon: "Icon",
        label_6: "Level 6 label",
        label_5: "Level 5 label",
        label_4: "Level 4 label",
        label_3: "Level 3 label",
        label_2: "Level 2 label",
        label_1: "Level 1 label",
        label_none: "Level 0 label",
      }),
      computeHelper: helpers({
        name: "Legacy: ulm_custom_card_paddy_dwd_pollen_name",
        icon: "Legacy: ulm_custom_card_paddy_dwd_pollen_icon",
        label_6: "Legacy: ulm_custom_card_paddy_dwd_pollen_6",
        label_5: "Legacy: ulm_custom_card_paddy_dwd_pollen_5",
        label_4: "Legacy: ulm_custom_card_paddy_dwd_pollen_4",
        label_3: "Legacy: ulm_custom_card_paddy_dwd_pollen_3",
        label_2: "Legacy: ulm_custom_card_paddy_dwd_pollen_2",
        label_1: "Legacy: ulm_custom_card_paddy_dwd_pollen_1",
        label_none: "Legacy: ulm_custom_card_paddy_dwd_pollen_none",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPaddyDwdPollenCardConfig> {
    return { entity: "sensor.pollen_index" };
  }

  public setConfig(config: UlmCustomPaddyDwdPollenCardConfig): void {
    const c = config as UlmCustomPaddyDwdPollenCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(
        pick(
          c,
          "name",
          "ulm_custom_card_paddy_dwd_pollen_name",
          "ulm_card_generic_swap_name",
        ),
      ),
      icon: asStr(
        pick(
          c,
          "icon",
          "ulm_custom_card_paddy_dwd_pollen_icon",
          "ulm_card_generic_swap_icon",
        ),
      ),
      label_6: asStr(
        pick(c, "label_6", "ulm_custom_card_paddy_dwd_pollen_6"),
      ),
      label_5: asStr(
        pick(c, "label_5", "ulm_custom_card_paddy_dwd_pollen_5"),
      ),
      label_4: asStr(
        pick(c, "label_4", "ulm_custom_card_paddy_dwd_pollen_4"),
      ),
      label_3: asStr(
        pick(c, "label_3", "ulm_custom_card_paddy_dwd_pollen_3"),
      ),
      label_2: asStr(
        pick(c, "label_2", "ulm_custom_card_paddy_dwd_pollen_2"),
      ),
      label_1: asStr(
        pick(c, "label_1", "ulm_custom_card_paddy_dwd_pollen_1"),
      ),
      label_none: asStr(
        pick(c, "label_none", "ulm_custom_card_paddy_dwd_pollen_none"),
      ),
      type: "custom:ulm-custom-card-paddy-dwd-pollen-card",
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
      min_rows: 1,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-paddy-dwd-pollen">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const level = stateObj.state;
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:flower-pollen";
    const pollenLabel = this._pollenLabel(level);
    const iconStyle = this._iconStyle(level);

    return html`
      <ha-card class="ulm-card ulm-paddy-dwd-pollen" @click=${this._moreInfo}>
        <div class="row">
          <button class="icon-btn" type="button" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <button class="info-btn" type="button">
            <div class="name">${name}</div>
            <div class="label">${pollenLabel}</div>
          </button>
        </div>
      </ha-card>
    `;
  }

  private _pollenLabel(level: string): string {
    const cfg = this._config;
    const map: Record<string, string | undefined> = {
      "6": cfg?.label_6,
      "5": cfg?.label_5,
      "4": cfg?.label_4,
      "3": cfg?.label_3,
      "2": cfg?.label_2,
      "1": cfg?.label_1,
      "0": cfg?.label_none,
    };
    return map[level] ?? DEFAULT_LABELS[level] ?? DEFAULT_LABELS["0"];
  }

  private _iconStyle(level: string): Record<string, string> {
    const bg = LEVEL_BG[level];
    if (bg) {
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
        backgroundColor: bg,
      };
    }
    if (level === "0") {
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-paddy-dwd-pollen {
      height: auto !important;
      cursor: pointer;
      padding: 12px;
    }

    .row .info-btn {
      padding: 6px 0;
      margin-left: -6px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-paddy-dwd-pollen-card": UlmCustomPaddyDwdPollenCard;
  }
}
