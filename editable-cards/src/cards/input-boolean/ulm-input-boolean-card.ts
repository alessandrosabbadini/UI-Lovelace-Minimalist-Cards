/**
 * Faithful Lit port of card_input_boolean.yaml (icon_more_info_new + toggle).
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

export interface UlmInputBooleanCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-input-boolean-card";
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

@customElement("ulm-input-boolean-card")
export class UlmInputBooleanCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmInputBooleanCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["input_boolean", "switch"]),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        booleanField("force_background_color"),
      ],
      computeLabel: labels({
        entity: "Input boolean / switch",
        name: "Name (ulm_card_input_boolean_name)",
        icon: "Icon (ulm_card_input_boolean_icon)",
        color: "Color (ulm_card_input_boolean_color)",
        force_background_color: "Force background color when on",
      }),
      computeHelper: helpers({
        entity: "Icon tap toggles the entity; name opens more-info.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmInputBooleanCardConfig> {
    return {
      entity: "switch.decorative_lights",
      color: "blue",
      force_background_color: false,
    };
  }

  public setConfig(config: UlmInputBooleanCardConfig): void {
    const c = config as UlmInputBooleanCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (c.ulm_card_input_boolean_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name:
        config.name ??
        (c.ulm_card_input_boolean_name as string | undefined),
      icon:
        config.icon ??
        (c.ulm_card_input_boolean_icon as string | undefined),
      color: (config.color ||
        c.ulm_card_input_boolean_color ||
        "blue") as UlmThemeColor,
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_input_boolean_force_background_color ??
          false,
      ),
      type: "custom:ulm-input-boolean-card",
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
      return html`<ha-card class="ulm-card ulm-input-boolean"
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
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:toggle-switch";
    const label = this._label(stateObj);
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
          "ulm-input-boolean": true,
          active,
          "force-bg": forceBg,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap(iconStyle)}
            @click=${this._toggle}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name" style=${styleMap(textStyle)}>${name}</div>
            <div class="label" style=${styleMap(textStyle)}>${label}</div>
          </button>
        </div>
      </ha-card>
    `;
  }

  private _label(stateObj: HassEntity): string {
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    return stateObj.state;
  }

  private _toggle = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config || !this.hass) return;
    const domain = this._config.entity.split(".")[0];
    this.hass.callService(domain, "toggle", {
      entity_id: this._config.entity,
    });
  };

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

    ha-card.ulm-input-boolean {
      height: auto;
    }
  `;
}
