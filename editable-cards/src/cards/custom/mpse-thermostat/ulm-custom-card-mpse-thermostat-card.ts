/**
 * Lit port of custom_cards/custom_card_mpse_thermostat/
 * icon_info header (heat/cool tinted) + list_items temp −/target/+.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomMpseThermostatCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-mpse-thermostat-card";
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

function headerIcon(state: string): string {
  if (state === "cool") return "mdi:snowflake";
  if (state === "heat") return "mdi:fire";
  return "mdi:thermostat";
}

function resolveThemeRgbVar(host: HTMLElement, varName: string): string {
  let raw = getComputedStyle(host).getPropertyValue(varName).trim();
  const m = raw.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (m) {
    raw = getComputedStyle(host).getPropertyValue(`--${m[1]}`).trim() || raw;
  }
  return raw;
}

function headerBackgroundStyle(
  host: HTMLElement,
  mode: "heat" | "cool",
): Record<string, string> {
  const bgVar =
    mode === "heat" ? "--color-background-red" : "--color-background-blue";
  const accent = mode === "heat" ? "red" : "blue";
  let raw = resolveThemeRgbVar(host, bgVar);
  if (!/^\d+\s*,/.test(raw)) {
    raw = resolveThemeRgb(host, accent);
  }
  const opacity =
    getComputedStyle(host).getPropertyValue("--opacity-bg").trim() || "1";
  return { backgroundColor: `rgba(${raw}, ${opacity})` };
}

function headerTextStyle(host: HTMLElement, state: string): Record<string, string> {
  if (state === "heat") {
    let raw = resolveThemeRgbVar(host, "--color-red-text");
    if (!/^\d+\s*,/.test(raw)) {
      raw = resolveThemeRgb(host, "red");
    }
    return { color: `rgba(${raw}, 1)` };
  }
  if (state === "cool") {
    let raw = resolveThemeRgbVar(host, "--color-blue-text");
    if (!/^\d+\s*,/.test(raw)) {
      raw = resolveThemeRgb(host, "blue");
    }
    return { color: `rgba(${raw}, 1)` };
  }
  return {};
}

function headerStyles(
  host: HTMLElement,
  state: string,
): { row: Record<string, string>; icon: Record<string, string> } {
  if (state === "heat") {
    const rgb = resolveThemeRgb(host, "red");
    return {
      row: headerBackgroundStyle(host, "heat"),
      icon: {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      },
    };
  }
  if (state === "cool") {
    const rgb = resolveThemeRgb(host, "blue");
    return {
      row: headerBackgroundStyle(host, "cool"),
      icon: {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      },
    };
  }
  return {
    row: {},
    icon: {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    },
  };
}

@customElement("ulm-custom-card-mpse-thermostat-card")
export class UlmCustomMpseThermostatCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomMpseThermostatCardConfig;

  public static getConfigForm() {
    return {
      schema: [entityField("entity", "climate"), textField("name")],
      computeLabel: labels({
        entity: "Climate entity",
        name: "Name",
      }),
      computeHelper: helpers({
        name: "Defaults to entity friendly_name",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomMpseThermostatCardConfig> {
    return { entity: "climate.living_room" };
  }

  public setConfig(config: UlmCustomMpseThermostatCardConfig): void {
    const c = config as UlmCustomMpseThermostatCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      type: "custom:ulm-custom-card-mpse-thermostat-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-mpse-thermostat">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const mode = stateObj.state;
    const { row: rowStyle, icon: iconStyle } = headerStyles(this, mode);
    const textStyle = headerTextStyle(this, mode);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const stateLabel =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const hvacAction = stateObj.attributes.hvac_action as string | undefined;
    const label =
      stateObj.attributes.temperature != null
        ? `${stateObj.attributes.current_temperature ?? "—"}° • ${stateLabel}${hvacAction ? ` (${hvacAction})` : ""}`
        : stateLabel;
    const temp = stateObj.attributes.temperature;
    const tempLabel =
      temp == null || temp === "" ? "-°C" : `${temp}°C`;

    return html`
      <ha-card class="ulm-card ulm-mpse-thermostat">
        <div class="stack">
          <div
            class=${classMap({ row: true, "icon-info": true, [mode]: true })}
            style=${styleMap(rowStyle)}
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
            <button
              class="icon-btn"
              type="button"
              style=${styleMap(iconStyle)}
              tabindex="-1"
              @click=${(ev: Event) => {
                ev.stopPropagation();
                this._moreInfo();
              }}
            >
              <ha-icon .icon=${headerIcon(mode)}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name" style=${styleMap(textStyle)}>${name}</div>
              <div class="label" style=${styleMap(textStyle)}>${label}</div>
            </div>
          </div>

          <div class="controls">
            <button
              class="widget-btn"
              type="button"
              aria-label="Decrease temperature"
              @click=${() => this._adjustTemp(-1)}
            >
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
            <div class="temp-readout">${tempLabel}</div>
            <button
              class="widget-btn"
              type="button"
              aria-label="Increase temperature"
              @click=${() => this._adjustTemp(1)}
            >
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _adjustTemp(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const current = stateObj.attributes.temperature;
    if (current == null) return;
    const step = this._step(stateObj);
    const next = parseFloat(String(current)) + step * direction;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: next,
    });
  }

  private _step(stateObj: HassEntity): number {
    const attr = Number(stateObj.attributes.target_temp_step);
    if (!Number.isNaN(attr) && attr > 0) return attr;
    return 0.5;
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
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-mpse-thermostat {
      height: auto !important;
      min-height: 0;
      padding: 12px;
      overflow: visible;
    }

    ha-card.ulm-mpse-thermostat > .stack {
      flex: none;
      gap: 12px;
    }

    .icon-info {
      border-radius: 21px 8px 8px 21px;
      height: 42px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .icon-info.heat .label,
    .icon-info.cool .label {
      opacity: 1;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      align-items: center;
    }

    .temp-readout {
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: transparent;
      box-shadow: none;
      text-align: center;
      min-width: 0;
    }

    .icon-info .label {
      filter: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-mpse-thermostat-card": UlmCustomMpseThermostatCard;
  }
}
