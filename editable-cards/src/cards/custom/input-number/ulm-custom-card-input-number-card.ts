/**
 * Lit port of custom_cards/custom_card_input_number/card_input_number.yaml
 * Header icon_info + ↓ / value / ↑ (input_number, counter, select, input_select).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

export interface UlmCustomInputNumberCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-input-number-card";
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

@customElement("ulm-custom-card-input-number-card")
export class UlmCustomInputNumberCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomInputNumberCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", [
          "input_number",
          "counter",
          "select",
          "input_select",
        ]),
        textField("name"),
        iconField("icon"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_card_input_number_name)",
        icon: "Icon",
      }),
      computeHelper: helpers({
        entity:
          "input_number / counter / select / input_select — arrows call decrement/increment or previous/next",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomInputNumberCardConfig> {
    return {
      entity: "input_number.residents_home",
      icon: "mdi:counter",
    };
  }

  public setConfig(config: UlmCustomInputNumberCardConfig): void {
    const c = config as UlmCustomInputNumberCardConfig & Record<string, unknown>;
    const entity = (config.entity || pick(c, "entity")) as string | undefined;
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name:
        (pick(c, "name", "ulm_card_input_number_name") as string) || undefined,
      icon: (pick(c, "icon") as string) || undefined,
      type: "custom:ulm-custom-card-input-number-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-input-number"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:counter";
    const value =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const changed = stateObj.last_changed
      ? this._relativeTime(stateObj.last_changed)
      : "";

    return html`
      <ha-card class="ulm-card ulm-input-number">
        <div class="stack">
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
            <div class="icon-btn">
              <ha-icon .icon=${icon}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${name}</div>
              <div class="label">${changed}</div>
            </div>
          </div>
          <div class="controls">
            <button class="widget-btn" type="button" @click=${() => this._step(-1)}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="value-readout">${value}</div>
            <button class="widget-btn" type="button" @click=${() => this._step(1)}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _step(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const id = this._config.entity;
    const domain = id.split(".")[0];
    if (domain === "input_number") {
      this.hass.callService(
        "input_number",
        direction < 0 ? "decrement" : "increment",
        { entity_id: id },
      );
      return;
    }
    if (domain === "counter") {
      this.hass.callService(
        "counter",
        direction < 0 ? "decrement" : "increment",
        { entity_id: id },
      );
      return;
    }
    if (domain === "select" || domain === "input_select") {
      this.hass.callService(
        domain,
        direction < 0 ? "select_previous" : "select_next",
        { entity_id: id },
      );
    }
  }

  private _relativeTime(iso: string): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const sec = Math.max(0, Math.round((Date.now() - then) / 1000));
    if (sec < 60) return `${sec}s`;
    const min = Math.round(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.round(min / 60);
    if (hr < 48) return `${hr}h`;
    return `${Math.round(hr / 24)}d`;
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

    ha-card.ulm-card.ulm-input-number {
      height: auto !important;
      display: block;
      padding: 12px;
    }

    ha-card.ulm-card.ulm-input-number > .stack {
      flex: none;
      gap: 12px;
    }

    .controls {
      gap: 0 7px;
      column-gap: 7px;
    }

    .icon-btn {
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .value-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-input-number-card": UlmCustomInputNumberCard;
  }
}
