/**
 * Faithful Lit port of card_generic_swap.yaml.
 * Primary line = entity name; secondary = state (opposite of card_generic).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmGenericSwapCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-generic-swap-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  force_background_color?: boolean;
}

const INACTIVE = new Set([
  "disarmed",
  "off",
  "closed",
  "not_home",
  "standby",
  "idle",
  "docked",
  "unknown",
  "unavailable",
  "paused",
]);

function isActive(state: string): boolean {
  if (INACTIVE.has(state)) return false;
  if (/\d/.test(state)) return false;
  return true;
}

@customElement("ulm-generic-swap-card")
export class UlmGenericSwapCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmGenericSwapCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        booleanField("force_background_color"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_card_generic_swap_name)",
        icon: "Icon (ulm_card_generic_swap_icon)",
        color: "Color (ulm_card_generic_swap_color)",
        force_background_color: "Force background color when active",
      }),
      computeHelper: helpers({
        name: "Shown as the primary bold line; state is secondary underneath.",
        force_background_color:
          "Only applies when the entity is in an active (non-numeric) state.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmGenericSwapCardConfig> {
    return {
      entity: "sensor.outside_temperature",
      color: "blue",
      force_background_color: false,
    };
  }

  public setConfig(config: UlmGenericSwapCardConfig): void {
    const c = config as UlmGenericSwapCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (c.ulm_card_generic_swap_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name:
        config.name ??
        (c.ulm_card_generic_swap_name as string | undefined),
      icon:
        config.icon ??
        (c.ulm_card_generic_swap_icon as string | undefined),
      color: (config.color ||
        c.ulm_card_generic_swap_color ||
        "blue") as UlmThemeColor,
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_generic_swap_force_background_color ??
          false,
      ),
      type: "custom:ulm-generic-swap-card",
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
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-generic-swap"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = isActive(stateObj.state);
    const color = (this._config.color || "blue") as UlmThemeColor;
    const rgb = resolveThemeRgb(this, color);
    const forceBg = !!this._config.force_background_color && active;
    const iconStyle = activeIconStyle(
      this,
      active,
      color,
      null,
      false,
      forceBg,
    );

    // card_generic_swap: name = friendly name, label = state
    const primary =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const secondary = this._stateLabel(stateObj);
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:swap-horizontal";

    const cardStyle = forceBg
      ? {
          backgroundColor: `rgba(${rgb}, var(--opacity-bg, 1))`,
        }
      : {};
    const textStyle = forceBg ? { color: "rgb(250, 250, 250)" } : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-generic-swap": true,
          active,
          "force-bg": forceBg,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap(iconStyle)}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${styleMap(textStyle)}>${primary}</div>
            <div class="label" style=${styleMap(textStyle)}>${secondary}</div>
          </button>
        </div>
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-generic-swap {
      height: auto;
    }

    .label {
      opacity: 0.4;
    }

    .force-bg .label {
      opacity: 1;
    }
  `;
}
