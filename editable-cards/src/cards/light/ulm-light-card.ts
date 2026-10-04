import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
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
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmLightCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-light-card";
  entity: string;
  /** Original: ulm_card_light_name */
  name?: string;
  /** Original: ulm_card_light_icon */
  icon?: string;
  /** Original: ulm_card_light_color */
  color?: UlmThemeColor;
  enable_slider?: boolean;
  enable_slider_min?: number;
  enable_slider_max?: number;
  enable_collapse?: boolean;
  enable_horizontal?: boolean;
  enable_horizontal_wide?: boolean;
  enable_color?: boolean;
  force_background_color?: boolean;
  enable_buttons?: boolean;
  brightness_low?: number;
  brightness_medium?: number;
  brightness_high?: number;
  enable_popup?: boolean;
  enable_popup_tap?: boolean;
  color_palette?: string;
}

@customElement("ulm-light-card")
export class UlmLightCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmLightCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        entityField("entity", "light"),
        grid([textField("name"), iconField("icon")]),
        colorField("color"),
        booleanField("enable_slider"),
        grid([
          numberField("enable_slider_min"),
          numberField("enable_slider_max"),
        ]),
        booleanField("enable_collapse"),
        booleanField("enable_horizontal"),
        booleanField("enable_horizontal_wide"),
        booleanField("enable_color"),
        booleanField("force_background_color"),
        booleanField("enable_popup"),
        booleanField("enable_popup_tap"),
        textField("color_palette"),
        booleanField("enable_buttons"),
        grid([
          numberField("brightness_low"),
          numberField("brightness_medium"),
          numberField("brightness_high"),
        ]),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_card_light_name)",
        icon: "Icon (ulm_card_light_icon)",
        color: "Color (ulm_card_light_color)",
        enable_slider: "Enable slider (ulm_card_light_enable_slider)",
        enable_slider_min: "Slider min",
        enable_slider_max: "Slider max",
        enable_collapse: "Collapse when off (ulm_card_light_enable_collapse)",
        enable_horizontal:
          "Horizontal layout (ulm_card_light_enable_horizontal)",
        enable_horizontal_wide:
          "Wider slider (ulm_card_light_enable_horizontal_wide)",
        enable_color: "Use light RGB (ulm_card_light_enable_color)",
        force_background_color:
          "Force colored background (ulm_card_light_force_background_color)",
        enable_popup: "Enable popup (ulm_card_light_enable_popup)",
        enable_popup_tap: "Popup on icon tap (ulm_card_light_enable_popup_tap)",
        color_palette: "Color palette entity",
        enable_buttons:
          "Enable brightness buttons (ulm_card_light_enable_buttons)",
        brightness_low: "Low %",
        brightness_medium: "Medium %",
        brightness_high: "High %",
      }),
      computeHelper: helpers({
        entity: "Light entity to control.",
        enable_slider: "Show a brightness slider under the name row.",
        enable_collapse: "Hide slider and preset buttons when the light is off.",
        enable_horizontal: "Put name and slider on one row.",
        enable_color: "Tint icon/slider from the light RGB color when on.",
        force_background_color:
          "Use light/theme color as the card background when on.",
        enable_popup: "Open the ULM light popup from the name (and icon).",
        enable_popup_tap: "Open the popup on icon tap instead of toggling.",
        color_palette: "Optional input_select for a color palette.",
        enable_buttons: "Show low / medium / high brightness preset buttons.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmLightCardConfig> {
    return {
      entity: "light.bed_light",
      enable_slider: true,
      enable_color: true,
      color: "yellow",
    };
  }

  public setConfig(config: UlmLightCardConfig): void {
    if (!config.entity) throw new Error("Please define an entity");
    const c = config as UlmLightCardConfig & Record<string, unknown>;
    // Nested leftovers from older expandable form
    const layout = (c.layout || {}) as Record<string, unknown>;
    const colorsPopup = (c.colors_popup || {}) as Record<string, unknown>;
    const presets = (c.presets || {}) as Record<string, unknown>;

    const num = (v: unknown, fallback: number): number => {
      if (v == null || v === false || v === "") return fallback;
      const n = Number(v);
      return Number.isNaN(n) ? fallback : n;
    };

    this._config = {
      ...config,
      name: config.name ?? (c.ulm_card_light_name as string | undefined),
      icon: config.icon ?? (c.ulm_card_light_icon as string | undefined),
      color:
        (config.color as UlmThemeColor) ||
        (c.ulm_card_light_color as UlmThemeColor) ||
        "yellow",
      enable_slider: Boolean(
        config.enable_slider ??
          layout.enable_slider ??
          c.ulm_card_light_enable_slider,
      ),
      enable_slider_min: num(
        config.enable_slider_min ?? layout.enable_slider_min,
        0,
      ),
      enable_slider_max: num(
        config.enable_slider_max ?? layout.enable_slider_max,
        100,
      ),
      enable_collapse: Boolean(
        config.enable_collapse ??
          layout.enable_collapse ??
          c.ulm_card_light_enable_collapse,
      ),
      enable_horizontal: Boolean(
        config.enable_horizontal ??
          layout.enable_horizontal ??
          c.ulm_card_light_enable_horizontal,
      ),
      enable_horizontal_wide: Boolean(
        config.enable_horizontal_wide ??
          layout.enable_horizontal_wide ??
          c.ulm_card_light_enable_horizontal_wide,
      ),
      enable_color: Boolean(
        config.enable_color ??
          colorsPopup.enable_color ??
          c.ulm_card_light_enable_color,
      ),
      force_background_color: Boolean(
        config.force_background_color ??
          colorsPopup.force_background_color ??
          c.ulm_card_light_force_background_color,
      ),
      enable_buttons: Boolean(
        config.enable_buttons ??
          presets.enable_buttons ??
          c.ulm_card_light_enable_buttons,
      ),
      brightness_low: num(
        config.brightness_low ?? presets.brightness_low,
        1,
      ),
      brightness_medium: num(
        config.brightness_medium ?? presets.brightness_medium,
        50,
      ),
      brightness_high: num(
        config.brightness_high ?? presets.brightness_high,
        100,
      ),
      enable_popup: Boolean(
        config.enable_popup ??
          colorsPopup.enable_popup ??
          c.ulm_card_light_enable_popup,
      ),
      enable_popup_tap: Boolean(
        config.enable_popup_tap ??
          colorsPopup.enable_popup_tap ??
          c.ulm_card_light_enable_popup_tap,
      ),
      color_palette:
        config.color_palette ??
        (colorsPopup.color_palette as string | undefined),
      type: "custom:ulm-light-card",
    };
  }

  public getCardSize(): number {
    return this._contentRows();
  }

  /** Sections view — declare size so HA enables full resize without warning */
  public getGridOptions() {
    const rows = this._contentRows();
    const horizontal = !!this._config?.enable_horizontal;
    return {
      columns: horizontal ? 12 : 6,
      rows,
      min_rows: 1,
      min_columns: horizontal ? 6 : 3,
      max_columns: 12,
    };
  }

  private _contentRows(): number {
    if (!this._config) return 1;
    const stateObj = this.hass?.states[this._config.entity];
    const on = stateObj?.state === "on";
    if (this._config.enable_collapse && !on) return 1;
    if (this._config.enable_horizontal) return 1;
    let rows = 1;
    if (this._config.enable_slider) rows += 1;
    if (this._config.enable_buttons) rows += 1;
    return rows;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const on = stateObj.state === "on";
    const unavailable = stateObj.state === "unavailable";
    const brightness = stateObj.attributes.brightness;
    const brightnessPct =
      typeof brightness === "number"
        ? Math.round((brightness / 255) * 100)
        : undefined;
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon || stateObj.attributes.icon || "mdi:lightbulb";
    const color = this._config.color || "yellow";
    const rgb = resolveThemeRgb(this, color);
    const entityRgb = stateObj.attributes.rgb_color;
    const iconStyle = activeIconStyle(
      this,
      on,
      color,
      entityRgb,
      this._config.enable_color,
      !!(on && this._config.force_background_color),
    );

    const showSlider =
      !!this._config.enable_slider &&
      !(this._config.enable_collapse && !on);
    const showButtons =
      !!this._config.enable_buttons &&
      !(this._config.enable_collapse && !on) &&
      !(this._config.enable_horizontal && this._config.enable_slider);

    const cardBg =
      on && this._config.force_background_color
        ? this._config.enable_color && entityRgb
          ? `rgba(${entityRgb.join(", ")}, var(--opacity-bg, 1))`
          : `rgba(${rgb}, var(--opacity-bg, 1))`
        : undefined;

    const fillColor =
      this._config.enable_color && entityRgb
        ? `rgba(${entityRgb.join(", ")}, 1)`
        : `rgba(${rgb}, 1)`;
    const trackColor =
      this._config.enable_color && entityRgb
        ? `rgba(${entityRgb.join(", ")}, 0.2)`
        : `rgba(${rgb}, 0.2)`;

    const min = this._config.enable_slider_min ?? 0;
    const max = this._config.enable_slider_max ?? 100;
      const value = Math.min(max, Math.max(min, brightnessPct ?? (min || 1)));

    const stackClass = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : "",
      this._config.enable_horizontal_wide ? "wide" : "",
      unavailable ? "unavailable" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <ha-card
        class="ulm-card"
        style=${styleMap({
          backgroundColor: cardBg,
          color:
            on && this._config.force_background_color
              ? "rgb(250,250,250)"
              : undefined,
        })}
      >
        <div class=${stackClass}>
          <div class="row">
            <button
              class="icon-btn"
              style=${styleMap(iconStyle)}
              @click=${this._iconTap}
            >
              <ha-icon .icon=${icon}></ha-icon>
              ${unavailable
                ? html`<span
                    class="badge"
                    style="background: rgba(var(--color-red, 245,68,54),1)"
                    ><ha-icon icon="mdi:exclamation"></ha-icon
                  ></span>`
                : nothing}
            </button>
            <button class="info-btn" @click=${this._nameTap}>
              <div class="name">${name}</div>
              <div class="label">
                ${on && brightnessPct !== undefined
                  ? `${brightnessPct}%`
                  : this._capitalize(stateObj.state)}
              </div>
            </button>
          </div>

          ${showSlider
            ? html`<div
                class="slider-wrap"
                style=${styleMap({ background: on ? trackColor : undefined })}
              >
                <div
                  class="slider-fill"
                  style=${styleMap({
                    width: `${on ? value : 0}%`,
                    background: on ? fillColor : "transparent",
                  })}
                ></div>
                <input
                  type="range"
                  min=${min || 1}
                  max=${max}
                  .value=${String(value || 1)}
                  ?disabled=${!on && !this._config.enable_collapse}
                  @change=${this._setBrightness}
                  @input=${this._liveFill}
                />
              </div>`
            : nothing}

          ${showButtons
            ? html`<div class="widgets">
                <button
                  class="widget-btn"
                  @click=${() =>
                    this._setPct(this._config!.brightness_low ?? 1)}
                >
                  <ha-icon icon="mdi:lightbulb-on-10"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  @click=${() =>
                    this._setPct(this._config!.brightness_medium ?? 50)}
                >
                  <ha-icon icon="mdi:lightbulb-on-50"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  @click=${() =>
                    this._setPct(this._config!.brightness_high ?? 100)}
                >
                  <ha-icon icon="mdi:lightbulb-on"></ha-icon>
                </button>
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _liveFill = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    const fill = this.renderRoot.querySelector(".slider-fill") as HTMLElement;
    if (fill) fill.style.width = `${input.value}%`;
  };

  private _capitalize(state: string) {
    return state.charAt(0).toUpperCase() + state.slice(1);
  }

  private _iconTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this.hass || !this._config) return;
    if (this._config.enable_popup_tap || this._config.enable_popup) {
      openUlmPopup(this, "light", this._config.entity);
      return;
    }
    this.hass.callService("light", "toggle", { entity_id: this._config.entity });
  };

  private _nameTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "light", this._config.entity);
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  };

  private _setBrightness = (ev: Event) => {
    const value = Number((ev.target as HTMLInputElement).value);
    this._setPct(value);
  };

  private _setPct(value: number) {
    if (!this.hass || !this._config || Number.isNaN(value)) return;
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: value,
    });
  }

  static styles = ulmCardStyles;
}
