/**
 * Lit port of custom_cards/custom_card_mpse_wifisignal/
 * icon_info_bg: wifi strength icon from dBm + "{state} dBm" label.
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
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomMpseWifisignalCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-mpse-wifisignal-card";
  entity: string;
  name?: string;
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

function wifiIcon(dbm: number): string {
  if (dbm >= -50) return "mdi:wifi-strength-4";
  if (dbm >= -60) return "mdi:wifi-strength-3";
  if (dbm >= -70) return "mdi:wifi-strength-2";
  if (dbm >= -80) return "mdi:wifi-strength-1";
  return "mdi:wifi-strength-off";
}

@customElement("ulm-custom-card-mpse-wifisignal-card")
export class UlmCustomMpseWifisignalCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomMpseWifisignalCardConfig;

  public static getConfigForm() {
    return {
      schema: [entityField("entity", "sensor"), textField("name")],
      computeLabel: labels({
        entity: "WiFi signal entity (dBm)",
        name: "Name",
      }),
      computeHelper: helpers({
        entity: "Numeric sensor reporting signal strength in dBm",
        name: "Defaults to entity friendly_name",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomMpseWifisignalCardConfig> {
    return {
      entity: "sensor.wifi_signal",
    };
  }

  public setConfig(config: UlmCustomMpseWifisignalCardConfig): void {
    const c = config as UlmCustomMpseWifisignalCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      type: "custom:ulm-custom-card-mpse-wifisignal-card",
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
      return html`<ha-card class="ulm-card ulm-mpse-wifisignal"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const dbm = Number.parseFloat(stateObj.state);
    const icon = Number.isFinite(dbm)
      ? wifiIcon(dbm)
      : "mdi:wifi-strength-off";
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const label = `${stateObj.state} dBm`;
    const iconStyle = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };

    return html`
      <ha-card
        class="ulm-card ulm-mpse-wifisignal"
        @click=${() => this._moreInfo()}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
      </ha-card>
    `;
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
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-mpse-wifisignal {
      height: auto;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-mpse-wifisignal-card": UlmCustomMpseWifisignalCard;
  }
}
