/**
 * Faithful Lit port of card_vertical_button.yaml (vertical icon / name / label).
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

export interface UlmVerticalButtonCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-vertical-button-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  /** Entity state value that marks this button active (default "on") */
  state?: string;
  show_last_changed?: boolean;
}

function unwrapColorVar(host: HTMLElement, raw: string): string {
  const m = raw.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (!m) return raw;
  return getComputedStyle(host).getPropertyValue(`--${m[1]}`).trim() || raw;
}

function resolveCardBackground(
  host: HTMLElement,
  color: UlmThemeColor,
): string {
  let raw = getComputedStyle(host)
    .getPropertyValue(`--color-background-${color}`)
    .trim();
  raw = unwrapColorVar(host, raw);
  if (!/^\d+\s*,/.test(raw)) {
    raw = resolveThemeRgb(host, color);
  }
  const opacity =
    getComputedStyle(host).getPropertyValue("--opacity-bg").trim() || "1";
  return `rgba(${raw}, ${opacity})`;
}

function resolveActiveTextColor(
  host: HTMLElement,
  color: UlmThemeColor,
): string {
  let raw = getComputedStyle(host)
    .getPropertyValue(`--color-${color}-text`)
    .trim();
  raw = unwrapColorVar(host, raw);
  if (/^\d+\s*,/.test(raw)) return `rgba(${raw}, 1)`;
  if (raw.startsWith("#") || raw.startsWith("rgb")) return raw;
  return "var(--primary-text-color)";
}

@customElement("ulm-vertical-button-card")
export class UlmVerticalButtonCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmVerticalButtonCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        textField("state"),
        booleanField("show_last_changed"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name",
        icon: "Icon",
        color: "Color (ulm_card_vertical_button_color)",
        state: "Active state (ulm_card_vertical_button_state)",
        show_last_changed: "Show last changed",
      }),
      computeHelper: helpers({
        entity:
          "Tap toggles / selects based on domain (input_select, switch, light, …).",
        state:
          'Button is active when entity.state equals this value (default "on"). Required for input_select options.',
        show_last_changed: "Show relative last-changed under the name.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmVerticalButtonCardConfig> {
    return {
      entity: "input_select.scene_mode",
      name: "Away",
      icon: "mdi:home-export-outline",
      color: "green",
      state: "Away",
      show_last_changed: false,
    };
  }

  public setConfig(config: UlmVerticalButtonCardConfig): void {
    const c = config as UlmVerticalButtonCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (c.ulm_card_vertical_button_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: config.name,
      icon: config.icon,
      color: (config.color ||
        c.ulm_card_vertical_button_color ||
        "blue") as UlmThemeColor,
      state: String(
        config.state ?? c.ulm_card_vertical_button_state ?? "on",
      ),
      show_last_changed: Boolean(
        config.show_last_changed ?? c.show_last_changed ?? false,
      ),
      type: "custom:ulm-vertical-button-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 3,
      min_columns: 2,
      max_columns: 6,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-vertical-button"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const activeState = this._config.state || "on";
    const active = stateObj.state === activeState;
    const color = (this._config.color || "blue") as UlmThemeColor;
    const iconStyle = activeIconStyle(this, active, color);
    const name = this._displayName(stateObj, activeState);
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:gesture-tap-button";
    const label = this._label(stateObj);

    const cardStyle = active
      ? { backgroundColor: resolveCardBackground(this, color) }
      : {};
    const textStyle = active
      ? { color: resolveActiveTextColor(this, color) }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-vertical-button": true,
          active,
        })}
        style=${styleMap(cardStyle)}
        @click=${this._tap}
      >
        <div class="stack">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          ${name
            ? html`<div class="name" style=${styleMap(textStyle)}>${name}</div>`
            : nothing}
          ${label
            ? html`<div class="label" style=${styleMap(textStyle)}>
                ${label}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _displayName(stateObj: HassEntity, activeState: string): string {
    if (this._config?.name) return this._config.name;
    const id = stateObj.entity_id;
    if (id.startsWith("input_select.")) return activeState;
    if (id.startsWith("input_boolean.")) {
      return stateObj.attributes.friendly_name || "";
    }
    return stateObj.state;
  }

  private _label(stateObj: HassEntity): string {
    if (this._config?.show_last_changed && stateObj.last_changed) {
      return this._relativeTime(stateObj.last_changed);
    }
    return "";
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

  private _tap = (ev: Event) => {
    ev.stopPropagation();
    if (!this.hass || !this._config) return;
    const entityId = this._config.entity;
    const domain = entityId.split(".")[0];
    const stateObj = this.hass.states[entityId];
    const activeState = this._config.state || "on";

    switch (domain) {
      case "input_select":
        this.hass.callService("input_select", "select_option", {
          entity_id: entityId,
          option: activeState,
        });
        return;
      case "input_boolean":
      case "switch":
      case "light":
      case "automation":
      case "fan":
      case "vacuum":
      case "script":
        this.hass.callService(domain, "toggle", { entity_id: entityId });
        return;
      case "input_button":
        this.hass.callService("input_button", "press", { entity_id: entityId });
        return;
      case "button":
        this.hass.callService("button", "press", { entity_id: entityId });
        return;
      case "lock":
        this.hass.callService(
          "lock",
          stateObj?.state === "locked" ? "unlock" : "lock",
          { entity_id: entityId },
        );
        return;
      default:
        return;
    }
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-vertical-button {
      height: auto;
      cursor: pointer;
      padding: 10px 0 8px;
    }

    .stack {
      display: grid;
      grid-template-areas:
        "icon"
        "name"
        "label";
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content min-content;
      justify-items: center;
      row-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      pointer-events: none;
      place-self: center;
    }

    .name {
      grid-area: name;
      margin-top: 10px;
      justify-self: center;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
      color: var(--primary-text-color);
    }

    .label {
      grid-area: label;
      justify-self: center;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      opacity: 0.4;
      filter: none;
      margin-left: 0;
      text-align: center;
      color: var(--primary-text-color);
    }
  `;
}
