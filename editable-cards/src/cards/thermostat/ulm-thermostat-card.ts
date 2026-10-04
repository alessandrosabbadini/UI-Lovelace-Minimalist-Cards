/**
 * Faithful Lit port of card_thermostat.yaml (all-in-one thermostat).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  entityField,
  expandable,
  grid,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import { openUlmPopup } from "../../popups/ulm-popup";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

export interface UlmThermostatCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-thermostat-card";
  entity: string;
  name?: string;
  icon?: string;
  enable_collapse?: boolean;
  enable_controls?: boolean;
  enable_hvac_modes?: boolean;
  enable_background_color?: boolean;
  enable_display_temperature?: boolean;
  enable_horizontal?: boolean;
  enable_popup?: boolean;
  fan_entity?: string;
  minimum_temp_spread?: number;
  temp_step?: number;
  preset_mode?: boolean;
}

type HvacMode =
  | "auto"
  | "heat"
  | "cool"
  | "dry"
  | "heat_cool"
  | "fan_only"
  | "off";

const HVAC_BUTTONS: Array<{
  mode: HvacMode;
  icon: string;
  /** Theme token name for active icon/bg, matching card_thermostat.yaml */
  activeColor: "green" | "red" | "blue" | "yellow" | "purple" | "theme";
  /** If set, icon uses this token while bg uses activeColor (fan_only) */
  activeIconColor?: "green";
}> = [
  { mode: "auto", icon: "mdi:autorenew", activeColor: "green" },
  { mode: "heat", icon: "mdi:fire", activeColor: "red" },
  { mode: "cool", icon: "mdi:snowflake", activeColor: "blue" },
  { mode: "dry", icon: "mdi:water", activeColor: "yellow" },
  { mode: "heat_cool", icon: "mdi:sun-snowflake", activeColor: "purple" },
  // Original: bg --color-theme 0.5, icon green
  {
    mode: "fan_only",
    icon: "mdi:fan",
    activeColor: "theme",
    activeIconColor: "green",
  },
];

@customElement("ulm-thermostat-card")
export class UlmThermostatCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmThermostatCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "climate"),
        grid([textField("name"), iconField("icon")]),
        // Top-level fields so HA always persists them (expandables can drop values)
        booleanField("enable_controls"),
        booleanField("enable_hvac_modes"),
        booleanField("enable_background_color"),
        booleanField("enable_collapse"),
        booleanField("enable_popup"),
        entityField("fan_entity", "fan", false),
        expandable("layout", "More layout", [
          booleanField("enable_horizontal"),
          booleanField("enable_display_temperature"),
        ]),
        expandable("advanced", "Advanced", [
          numberField("temp_step"),
          numberField("minimum_temp_spread"),
        ]),
      ],
      computeLabel: labels({
        entity: "Climate entity",
        name: "Name (ulm_card_thermostat_name)",
        icon: "Icon (ulm_card_thermostat_icon)",
        enable_controls: "Enable temperature controls",
        enable_hvac_modes: "Enable HVAC modes",
        enable_collapse: "Collapse when off",
        enable_horizontal: "Horizontal layout",
        enable_display_temperature: "Show current temp (top right)",
        enable_background_color: "Colored background when heating/cooling",
        enable_popup: "Enable thermostat popup",
        fan_entity: "Separate fan entity",
        temp_step: "Temperature step",
        minimum_temp_spread: "Min spread (heat_cool)",
      }),
      computeHelper: helpers({
        enable_hvac_modes:
          "Shows heat/cool/auto/… from the climate entity hvac_modes attribute.",
        enable_collapse: "Hides controls and HVAC row when climate is off.",
        enable_background_color:
          "Orange in heat, blue in cool. Other modes keep the normal on-state background.",
        fan_entity:
          "Only shown if set and the climate has no fan_only mode. (climate.hvac already has fan_only.)",
        temp_step: "Defaults to entity target_temp_step or 0.5°C / 1°F.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmThermostatCardConfig> {
    return {
      entity: "climate.hvac",
      enable_controls: true,
      enable_hvac_modes: true,
      enable_collapse: true,
      icon: "mdi:thermometer",
    };
  }

  public setConfig(config: UlmThermostatCardConfig): void {
    const c = config as UlmThermostatCardConfig & Record<string, unknown>;
    // HA sometimes nests expandable fields under the section name
    const layout = (c.layout || {}) as Record<string, unknown>;
    const advanced = (c.advanced || {}) as Record<string, unknown>;
    const entity =
      config.entity || (c.ulm_card_thermostat_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");
    const tempStepRaw =
      config.temp_step ??
      advanced.temp_step ??
      c.ulm_card_thermostat_temp_step;
    this._config = {
      ...config,
      entity,
      name:
        config.name ?? (c.ulm_card_thermostat_name as string | undefined),
      icon:
        config.icon ||
        (c.ulm_card_thermostat_icon as string | undefined) ||
        "mdi:thermometer",
      enable_collapse: Boolean(
        config.enable_collapse ??
          layout.enable_collapse ??
          c.ulm_card_thermostat_enable_collapse,
      ),
      enable_controls: Boolean(
        config.enable_controls ??
          layout.enable_controls ??
          c.ulm_card_thermostat_enable_controls,
      ),
      enable_hvac_modes: Boolean(
        config.enable_hvac_modes ??
          layout.enable_hvac_modes ??
          c.ulm_card_thermostat_enable_hvac_modes,
      ),
      enable_background_color: Boolean(
        config.enable_background_color ??
          layout.enable_background_color ??
          c.ulm_card_thermostat_enable_background_color,
      ),
      enable_display_temperature: Boolean(
        config.enable_display_temperature ??
          layout.enable_display_temperature ??
          c.ulm_card_thermostat_enable_display_temperature,
      ),
      enable_horizontal: Boolean(
        config.enable_horizontal ??
          layout.enable_horizontal ??
          c.ulm_card_thermostat_enable_horizontal,
      ),
      enable_popup: Boolean(
        config.enable_popup ??
          layout.enable_popup ??
          c.ulm_card_thermostat_enable_popup,
      ),
      fan_entity: this._normalizeFanEntity(
        config.fan_entity ??
          advanced.fan_entity ??
          c.ulm_card_thermostat_fan_entity,
      ),
      minimum_temp_spread: Number(
        config.minimum_temp_spread ??
          advanced.minimum_temp_spread ??
          c.ulm_card_thermostat_minimum_temp_spread ??
          1,
      ),
      temp_step:
        tempStepRaw != null && tempStepRaw !== false
          ? Number(tempStepRaw)
          : undefined,
      type: "custom:ulm-thermostat-card",
    };
  }

  public getCardSize(): number {
    return this._contentRows();
  }

  public getGridOptions() {
    // Omit fixed rows so HVAC modes aren't clipped by a short section cell
    // Default full width (12) on first insert — thermostat needs room for controls
    return {
      columns: 12,
      min_columns: this._config?.enable_horizontal ? 6 : 3,
      max_columns: 12,
    };
  }

  private _contentRows(): number {
    if (!this._config || !this.hass) return 1;
    const stateObj = this.hass.states[this._config.entity];
    const collapsed =
      this._config.enable_collapse && stateObj?.state === "off";
    if (this._config.enable_horizontal) return 1;
    let n = 1;
    if (!collapsed && this._config.enable_controls) n++;
    if (
      !collapsed &&
      this._config.enable_controls &&
      stateObj?.attributes.target_temp_high != null
    ) {
      n++;
    }
    if (
      !collapsed &&
      (this._config.enable_hvac_modes || this._config.fan_entity)
    ) {
      n++;
    }
    return n;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const off = stateObj.state === "off";
    const collapsed = !!this._config.enable_collapse && off;
    const action = String(stateObj.attributes.hvac_action || "");
    const mode = String(stateObj.state);
    const bgColor = !!this._config.enable_background_color;

    // With color option on: orange only in heat, blue only in cool.
    // auto / dry / fan_only / off never get those card tints (auto button stays green).
    // heat_cool follows live hvac_action like the original YAML.
    const heatVisual =
      bgColor &&
      (mode === "heat" || (mode === "heat_cool" && action === "heating"));
    const coolVisual =
      bgColor &&
      (mode === "cool" || (mode === "heat_cool" && action === "cooling"));
    // Icon accents match the same heat/cool visual (action-only when color option off)
    const heating =
      action === "heating" || (bgColor && mode === "heat");
    const cooling =
      action === "cooling" || (bgColor && mode === "cool");

    let cardBg: string | undefined;
    if (heatVisual) {
      cardBg = "rgba(255, 165, 0, 0.75)";
    } else if (coolVisual) {
      cardBg = "rgba(0, 191, 255, 0.75)";
    } else if (!off) {
      cardBg =
        "rgba(var(--color-background-yellow, 250, 250, 250), var(--opacity-bg, 1))";
    }

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon = this._config.icon || "mdi:thermometer";
    const iconStyle = this._iconStyle(heating, cooling);
    const unit = this._tempUnit();
    const showControls = !!this._config.enable_controls && !collapsed;
    const showLow =
      showControls && stateObj.attributes.target_temp_high != null;
    const showHvac =
      (!!this._config.enable_hvac_modes || !!this._config.fan_entity) &&
      !collapsed &&
      !this._config.enable_horizontal;
    const showDisplayTemp =
      !!this._config.enable_display_temperature &&
      !this._config.enable_horizontal;

    const stackClass = classMap({
      stack: true,
      horizontal: !!this._config.enable_horizontal,
    });

    const highTemp =
      stateObj.attributes.target_temp_high ?? stateObj.attributes.temperature;
    const lowTemp = stateObj.attributes.target_temp_low;
    const current = stateObj.attributes.current_temperature;

    return html`
      <ha-card
        class="ulm-card thermostat"
        style=${styleMap(
          cardBg
            ? {
                // ha-card paints via --ha-card-background; override that + shorthand
                "--ha-card-background": cardBg,
                background: cardBg,
                backgroundColor: cardBg,
              }
            : {},
        )}
      >
        <div class=${stackClass}>
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${styleMap(iconStyle)}
                @click=${this._iconTap}
              >
                <ha-icon .icon=${icon}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name">${name}</div>
                <div class="label">${this._label(stateObj)}</div>
              </button>
            </div>
            ${showDisplayTemp
              ? html`<div class="display-temp">
                  ${current != null ? `${current}${unit}` : `-${unit}`}
                </div>`
              : nothing}
          </div>

          ${showControls
            ? html`<div class="controls">
                <button
                  class="widget-btn"
                  style=${styleMap(
                    this._widgetActiveBg(heatVisual, coolVisual, bgColor),
                  )}
                  @click=${() => this._adjustHigh(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="temp-readout">
                  ${highTemp != null ? `${highTemp}${unit}` : `-${unit}`}
                </div>
                <button
                  class="widget-btn"
                  style=${styleMap(
                    this._widgetActiveBg(heatVisual, coolVisual, bgColor),
                  )}
                  @click=${() => this._adjustHigh(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>`
            : nothing}

          ${showLow
            ? html`<div class="controls">
                <button
                  class="widget-btn"
                  style=${styleMap(
                    this._widgetActiveBg(heatVisual, coolVisual, bgColor),
                  )}
                  @click=${() => this._adjustLow(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="temp-readout">
                  ${lowTemp != null ? `${lowTemp}${unit}` : `-${unit}`}
                </div>
                <button
                  class="widget-btn"
                  style=${styleMap(
                    this._widgetActiveBg(heatVisual, coolVisual, bgColor),
                  )}
                  @click=${() => this._adjustLow(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>`
            : nothing}

          ${showHvac
            ? this._renderHvacModes(stateObj, heatVisual, coolVisual, bgColor)
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderHvacModes(
    stateObj: HassEntity,
    heating: boolean,
    cooling: boolean,
    bgColor: boolean,
  ) {
    const rawModes = stateObj.attributes.hvac_modes;
    const modes = Array.isArray(rawModes) ? rawModes.map(String) : [];
    // Original: separate fan only when set AND climate has no fan_only mode
    const fanEntity = this._normalizeFanEntity(this._config?.fan_entity);
    const showFanEntity =
      !!fanEntity && !modes.includes("fan_only");
    const buttons = this._config?.enable_hvac_modes
      ? HVAC_BUTTONS.filter((b) => modes.includes(b.mode))
      : [];

    if (!buttons.length && !showFanEntity) {
      return html`<div class="hvac-empty">
        No HVAC modes on this entity
      </div>`;
    }

    return html`
      <div
        class="hvac-modes"
        style=${styleMap({
          gridTemplateColumns: `repeat(${buttons.length + (showFanEntity ? 1 : 0)}, 1fr)`,
        })}
      >
        ${buttons.map((b) => {
          const active = stateObj.state === b.mode;
          const styles = active
            ? this._hvacActiveStyle(b.activeColor, b.activeIconColor)
            : this._widgetActiveBg(heating, cooling, bgColor);
          const iconColor = active
            ? this._hvacActiveIconColor(b.activeColor, b.activeIconColor)
            : {};
          return html`
            <button
              class="widget-btn hvac"
              style=${styleMap(styles)}
              @click=${() => this._setHvac(b.mode)}
              title=${b.mode}
            >
              <ha-icon
                icon=${b.icon}
                style=${styleMap(iconColor)}
              ></ha-icon>
            </button>
          `;
        })}
        ${showFanEntity ? this._renderFanEntityBtn(heating, cooling, bgColor) : nothing}
      </div>
    `;
  }

  private _normalizeFanEntity(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    const id = value.trim();
    if (!id || id === "null" || id === "undefined" || !id.includes(".")) {
      return undefined;
    }
    return id;
  }

  private _renderFanEntityBtn(
    heating: boolean,
    cooling: boolean,
    bgColor: boolean,
  ) {
    const fanId = this._normalizeFanEntity(this._config?.fan_entity);
    if (!fanId) return nothing;
    const fan = this.hass?.states[fanId];
    if (!fan) return nothing;
    const on = fan.state === "on";
    const rgb = resolveThemeRgb(this, "green");
    const domain = fanId.split(".")[0] || "fan";
    return html`
      <button
        class="widget-btn hvac"
        style=${styleMap(
          on
            ? {
                backgroundColor: `rgba(var(--color-theme, 51,51,51), 0.5)`,
                color: `rgba(${rgb}, 1)`,
              }
            : this._widgetActiveBg(heating, cooling, bgColor),
        )}
        @click=${() =>
          this.hass?.callService(domain, "toggle", { entity_id: fanId })}
        title=${fan.attributes.friendly_name || fanId}
      >
        <ha-icon
          icon="mdi:fan"
          style=${styleMap(on ? { color: `rgba(${rgb}, 1)` } : {})}
        ></ha-icon>
      </button>
    `;
  }

  private _themeToken(
    name: "green" | "red" | "blue" | "yellow" | "purple" | "theme",
  ): string {
    if (name === "theme") return "var(--color-theme, 51, 51, 51)";
    // Prefer live theme tokens (same as card_thermostat.yaml)
    const fallback = resolveThemeRgb(this, name);
    return `var(--color-${name}, ${fallback})`;
  }

  private _hvacActiveStyle(
    activeColor: "green" | "red" | "blue" | "yellow" | "purple" | "theme",
    activeIconColor?: "green",
  ): Record<string, string> {
    const bg = this._themeToken(activeColor);
    const icon = this._themeToken(activeIconColor || activeColor);
    return {
      backgroundColor: `rgba(${bg}, 0.5)`,
      color: `rgba(${icon}, 1)`,
    };
  }

  private _hvacActiveIconColor(
    activeColor: "green" | "red" | "blue" | "yellow" | "purple" | "theme",
    activeIconColor?: "green",
  ): Record<string, string> {
    const icon = this._themeToken(activeIconColor || activeColor);
    return { color: `rgba(${icon}, 1)` };
  }

  private _iconStyle(
    heating: boolean,
    cooling: boolean,
  ): Record<string, string> {
    if (heating) {
      const rgb = this._themeToken("red");
      return {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      };
    }
    if (cooling) {
      const rgb = this._themeToken("blue");
      return {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      };
    }
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
  }

  private _widgetActiveBg(
    heating: boolean,
    cooling: boolean,
    bgColor: boolean,
  ): Record<string, string> {
    if ((heating || cooling) && bgColor) {
      return { backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.15)" };
    }
    return {};
  }

  private _label(stateObj: HassEntity): string {
    const state =
      this.hass?.formatEntityState?.(stateObj) ||
      this._capitalize(stateObj.state);
    const current = stateObj.attributes.current_temperature;
    // Match common ULM look: current + state when not using the side readout
    if (
      current != null &&
      !this._config?.enable_display_temperature
    ) {
      return `${current}° · ${state}`;
    }
    return state;
  }

  private _tempUnit(): string {
    return this.hass?.config?.unit_system?.temperature || "°C";
  }

  private _step(stateObj: HassEntity): number {
    if (this._config?.temp_step != null && !Number.isNaN(this._config.temp_step)) {
      return Number(this._config.temp_step);
    }
    const attr = Number(stateObj.attributes.target_temp_step);
    if (!Number.isNaN(attr) && attr > 0) return attr;
    return this._tempUnit() === "°F" ? 1 : 0.5;
  }

  private _spread(): number {
    return Number(this._config?.minimum_temp_spread ?? 1) || 1;
  }

  /** Adjust high setpoint (or single temperature) — original item2 minus/plus */
  private _adjustHigh(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const step = this._step(stateObj) * direction;
    const low = stateObj.attributes.target_temp_low;
    const high = stateObj.attributes.target_temp_high;
    const single = stateObj.attributes.temperature;

    if (low != null && high != null) {
      const newHigh = parseFloat(String(high)) + step;
      let newLow = parseFloat(String(low));
      // Original minus on high: keep spread
      if (direction < 0 && newHigh - this._spread() < newLow) {
        newLow = newHigh - this._spread();
      }
      this._call("set_temperature", {
        target_temp_low: newLow,
        target_temp_high: newHigh,
      });
      return;
    }
    if (single != null) {
      const next = parseFloat(String(single)) + step;
      this._call("set_temperature", {
        temperature: direction < 0 ? Math.max(next, 0) : next,
      });
    }
  }

  /** Adjust low setpoint — original low_temp_adjustment row */
  private _adjustLow(direction: -1 | 1) {
    if (!this.hass || !this._config) return;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) return;
    const step = this._step(stateObj) * direction;
    const low = stateObj.attributes.target_temp_low;
    const high = stateObj.attributes.target_temp_high;
    if (low == null || high == null) return;

    const newLow = parseFloat(String(low)) + step;
    let newHigh = parseFloat(String(high));
    if (direction > 0 && newLow + this._spread() > newHigh) {
      newHigh = newLow + this._spread();
    }
    this._call("set_temperature", {
      target_temp_low: newLow,
      target_temp_high: newHigh,
    });
  }

  private _setHvac(mode: HvacMode) {
    this._call("set_hvac_mode", { hvac_mode: mode });
  }

  private _call(service: string, data: Record<string, unknown> = {}) {
    if (!this.hass || !this._config) return;
    this.hass.callService("climate", service, {
      entity_id: this._config.entity,
      ...data,
    });
  }

  private _iconTap = (ev: Event) => {
    ev.stopPropagation();
    this._open();
  };

  private _nameTap = (ev: Event) => {
    ev.stopPropagation();
    this._open();
  };

  private _open() {
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "thermostat", this._config.entity);
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  }

  private _capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static styles = [
    ulmCardStyles,
    css`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.thermostat {
        height: auto;
        overflow: visible;
        /* Prefer --ha-card-background set inline when colored */
        background: var(--ha-card-background, var(--card-background-color, #fafafa));
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .hvac-empty {
        font-size: 12px;
        opacity: 0.55;
        padding: 4px 0;
      }

      .stack.horizontal {
        flex-direction: row;
        align-items: center;
      }

      .stack.horizontal .header {
        flex: 1;
        min-width: 0;
      }

      .stack.horizontal .controls {
        flex: 1;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .header .row {
        flex: 1;
        min-width: 0;
      }

      .display-temp {
        font-weight: bold;
        font-size: 14px;
        white-space: nowrap;
        padding-right: 4px;
      }

      .controls {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 12px;
        align-items: center;
      }

      .temp-readout {
        text-align: center;
        font-weight: bold;
        font-size: 14px;
        min-width: 3.5em;
        background: none;
        box-shadow: none;
      }

      .hvac-modes {
        display: grid;
        gap: 7px;
      }

      .widget-btn.hvac ha-icon {
        --mdc-icon-size: 20px;
      }
    `,
  ];
}
