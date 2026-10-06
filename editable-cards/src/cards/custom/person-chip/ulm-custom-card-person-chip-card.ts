/**
 * Lit port of custom_cards/custom_card_person_chip/
 * Chip: entity picture (24px) or mdi:face-man + localized person state.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  helpers,
  labels,
} from "../../../shared/config-form";
import {
  syncChipDarkMode,
  ulmChipStyles,
} from "../../../shared/chip-styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomPersonChipCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-person-chip-card";
  entity: string;
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

@customElement("ulm-custom-card-person-chip-card")
export class UlmCustomPersonChipCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPersonChipCardConfig;

  public static getConfigForm() {
    return {
      schema: [entityField("entity", "person")],
      computeLabel: labels({
        entity: "Person entity",
      }),
      computeHelper: helpers({
        entity: "Legacy: ulm_custom_card_person_chip_entity",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPersonChipCardConfig> {
    return {
      entity: "person.demo",
    };
  }

  public setConfig(config: UlmCustomPersonChipCardConfig): void {
    const c = config as UlmCustomPersonChipCardConfig & Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_custom_card_person_chip_entity"),
    );
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      type: "custom:ulm-custom-card-person-chip-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return {
      columns: 2,
      min_columns: 2,
      max_columns: 6,
      rows: "auto" as const,
      min_rows: 1,
    };
  }

  protected updated(): void {
    syncChipDarkMode(this, this.hass);
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<button class="chip" disabled>
        <span class="label">Entity not found</span>
      </button>`;
    }

    const picture = stateObj.attributes.entity_picture
      ? String(stateObj.attributes.entity_picture)
      : undefined;
    const label = this._localizePerson(stateObj);

    return html`
      <button class="chip has-icon-and-label" @click=${this._onTap}>
        ${picture
          ? html`<span class="pic-cell">
              <img class="picture" src=${picture} alt="" />
            </span>`
          : html`<ha-icon
              .icon=${"mdi:face-man"}
              style=${styleMap({
                color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
              })}
            ></ha-icon>`}
        <span class="label">${label}</span>
      </button>
    `;
  }

  private _localizePerson(stateObj: HassEntity): string {
    if (this.hass?.localize) {
      const key = `component.person.entity_component._.state.${stateObj.state}`;
      const translated = this.hass.localize(key);
      if (translated && translated !== key) return translated;
    }
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    return stateObj.state;
  }

  private _onTap = (ev: Event) => {
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
    ulmChipStyles,
    css`
      :host {
        display: block;
        width: fit-content;
        max-width: 100%;
        height: auto !important;
        min-height: 0 !important;
        align-self: start;
        justify-self: start;
        /* Keep shadow inside host if a parent clips overflow */
        padding: 0 2px 6px;
        overflow: visible;
        box-sizing: border-box;
        line-height: 0;
        background: transparent;
        box-shadow: none;
      }

      button.chip {
        height: 36px;
        min-height: 36px;
        max-height: 36px;
        max-width: 100%;
        min-width: 0;
        margin: 0;
        vertical-align: top;
      }

      .pic-cell {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
        display: grid;
        place-items: center;
      }

      .pic-cell .picture {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
      }

      .chip .label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 36px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-person-chip-card": UlmCustomPersonChipCard;
  }
}
