/**
 * Lit port of custom_cards/custom_card_qubino/
 * Fil pilote light: blue icon_info, brightness → consigne label, optional more-info target.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle } from "../../../shared/colors";
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

export interface UlmCustomQubinoCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-qubino-card";
  entity: string;
  name?: string;
  icon?: string;
  /** Opens more-info for this entity on tap (YAML: input_select.ordres_fil_pilote) */
  tap_entity?: string;
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

function filPiloteLabel(stateObj: HassEntity): string {
  if (stateObj.state === "unavailable") return "Indisponible";
  const raw = stateObj.attributes.brightness as number | undefined;
  const bri =
    raw != null && Number.isFinite(raw) ? Math.round(raw / 2.55) : 0;
  let consigne = "Inconnue";
  if (bri >= 51) consigne = "Confort";
  else if (bri >= 41) consigne = "Confort -1°C";
  else if (bri >= 31) consigne = "Confort -2°C️";
  else if (bri >= 21) consigne = "Eco️";
  else if (bri >= 11) consigne = "Hors Gel️";
  else if (bri >= 0) consigne = "Arrêt️";
  return `${consigne} • ${bri}`;
}

@customElement("ulm-custom-card-qubino-card")
export class UlmCustomQubinoCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomQubinoCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "light"),
        textField("name"),
        iconField("icon"),
        entityField("tap_entity", ["input_select", "select"], false),
      ],
      computeLabel: labels({
        entity: "Fil pilote light",
        name: "Name",
        icon: "Icon (default mdi:memory)",
        tap_entity: "More-info entity on tap",
      }),
      computeHelper: helpers({
        entity: "Light entity whose brightness encodes fil pilote consigne",
        tap_entity:
          "Optional. YAML default: input_select for ordres fil pilote",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomQubinoCardConfig> {
    return {
      entity: "light.fil_pilote",
      icon: "mdi:memory",
      tap_entity: "input_select.ordres_fil_pilote",
    };
  }

  public setConfig(config: UlmCustomQubinoCardConfig): void {
    const c = config as UlmCustomQubinoCardConfig & Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      icon: asStr(pick(c, "icon")) || "mdi:memory",
      tap_entity: asStr(pick(c, "tap_entity", "more_info_entity")),
      type: "custom:ulm-custom-card-qubino-card",
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
      return html`<ha-card class="ulm-card ulm-qubino"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = stateObj.state !== "off" && stateObj.state !== "unavailable";
    const iconStyle = activeIconStyle(this, active, "blue");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const label = filPiloteLabel(stateObj);

    return html`
      <ha-card class="ulm-card ulm-qubino" @click=${this._moreInfo}>
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${this._config.icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    const entityId = this._config.tap_entity || this._config.entity;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-qubino {
      height: auto;
      cursor: pointer;
    }

    .icon-btn,
    .info-btn {
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-qubino-card": UlmCustomQubinoCard;
  }
}
