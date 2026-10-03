import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  expandable,
  grid,
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

export interface UlmCoverCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-cover-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  invert_percent?: boolean;
  display_left_right?: boolean;
  garage_large?: boolean;
  enable_controls?: boolean;
  enable_slider?: boolean;
  enable_horizontal?: boolean;
  favorite_percentage?: number;
  enable_tilt?: boolean;
  enable_popup?: boolean;
  slider_min?: number;
  slider_max?: number;
  force_background_color?: boolean;
  show_last_changed?: boolean;
}

@customElement("ulm-cover-card")
export class UlmCoverCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCoverCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "cover"),
        grid([textField("name"), iconField("icon")]),
        colorField("color"),
        expandable("controls", "Controls", [
          booleanField("enable_controls"),
          booleanField("enable_slider"),
          booleanField("enable_horizontal"),
          booleanField("invert_percent"),
          booleanField("display_left_right"),
          booleanField("enable_tilt"),
          booleanField("garage_large"),
          booleanField("enable_popup"),
          booleanField("force_background_color"),
          booleanField("show_last_changed"),
          numberField("favorite_percentage"),
          grid([numberField("slider_min"), numberField("slider_max")]),
        ]),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name",
        icon: "Icon",
        color: "Color",
        enable_controls: "Enable controls",
        enable_slider: "Enable slider",
        enable_horizontal: "Horizontal layout",
        invert_percent: "Invert percent",
        display_left_right: "Left/right buttons",
        enable_tilt: "Tilt controls",
        garage_large: "Garage large icon",
        enable_popup: "Enable popup",
        force_background_color: "Force colored background",
        show_last_changed: "Show last changed",
        favorite_percentage: "Favorite %",
        slider_min: "Slider min",
        slider_max: "Slider max",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCoverCardConfig> {
    return {
      entity: "cover.living_room_window",
      enable_controls: true,
      enable_slider: true,
      color: "blue",
    };
  }

  public setConfig(config: UlmCoverCardConfig): void {
    if (!config.entity) throw new Error("Please define an entity");
    const c = config as UlmCoverCardConfig & Record<string, unknown>;
    this._config = {
      slider_min: 0,
      slider_max: 100,
      ...config,
      name: config.name ?? (c.ulm_card_cover_name as string | undefined),
      icon: config.icon || (c.ulm_card_cover_icon as string | undefined),
      color:
        (config.color as UlmThemeColor) ||
        (c.ulm_card_cover_color as UlmThemeColor) ||
        "blue",
      enable_controls: Boolean(
        config.enable_controls ?? c.ulm_card_cover_enable_controls,
      ),
      enable_slider: Boolean(
        config.enable_slider ?? c.ulm_card_cover_enable_slider,
      ),
      enable_horizontal: Boolean(
        config.enable_horizontal ?? c.ulm_card_cover_enable_horizontal,
      ),
      enable_popup: Boolean(
        config.enable_popup ?? c.ulm_card_cover_enable_popup,
      ),
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_cover_force_background_color,
      ),
      invert_percent: Boolean(
        config.invert_percent ?? c.ulm_card_invert_percent,
      ),
      display_left_right: Boolean(
        config.display_left_right ?? c.ulm_card_cover_display_left_right,
      ),
      enable_tilt: Boolean(
        config.enable_tilt ?? c.ulm_card_cover_enable_tilt,
      ),
      garage_large: Boolean(
        config.garage_large ?? c.ulm_card_cover_garage_large,
      ),
      type: "custom:ulm-cover-card",
    };
  }

  public getCardSize(): number {
    let n = 1;
    if (this._config?.enable_controls) n++;
    if (this._config?.enable_slider) n++;
    return this._config?.enable_horizontal ? 1 : n;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const openish = ["open", "opening", "closing"].includes(stateObj.state);
    const position = Number(stateObj.attributes.current_position);
    const displayPos = Number.isNaN(position)
      ? undefined
      : this._config.invert_percent
        ? 100 - position
        : position;
    const color = this._config.color || "blue";
    const rgb = resolveThemeRgb(this, color);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const deviceClass = String(stateObj.attributes.device_class || "");
    const icon =
      this._config.icon ||
      stateObj.attributes.icon ||
      (deviceClass === "garage"
        ? this._config.garage_large
          ? "mdi:garage-open"
          : "mdi:garage"
        : openish
          ? "mdi:window-shutter-open"
          : "mdi:window-shutter");

    const iconStyle = activeIconStyle(this, openish, color);
    const showControls = !!this._config.enable_controls;
    const showSlider = !!this._config.enable_slider;
    const stackClass = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <ha-card
        class="ulm-card"
        style=${styleMap({
          backgroundColor:
            openish && this._config.force_background_color
              ? `rgba(${rgb}, var(--opacity-bg, 1))`
              : undefined,
        })}
      >
        <div class=${stackClass}>
          <div class="row">
            <button
              class="icon-btn"
              style=${styleMap(iconStyle)}
              @click=${() => this._call("toggle")}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._nameTap}>
              <div class="name">${name}</div>
              <div class="label">
                ${this._capitalize(stateObj.state)}${displayPos !== undefined
                  ? ` · ${displayPos}%`
                  : ""}
              </div>
            </button>
          </div>

          ${showControls
            ? html`<div
                class="controls ${this._config.display_left_right ||
                this._config.enable_tilt ||
                this._config.favorite_percentage != null
                  ? "four"
                  : ""}"
              >
                ${this._config.display_left_right
                  ? html`<button class="widget-btn" @click=${() => this._call("open_cover")}>
                        <ha-icon icon="mdi:arrow-left"></ha-icon>
                      </button>`
                  : nothing}
                <button class="widget-btn" @click=${() => this._call("open_cover")}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="widget-btn" @click=${() => this._call("stop_cover")}>
                  <ha-icon icon="mdi:pause"></ha-icon>
                </button>
                <button class="widget-btn" @click=${() => this._call("close_cover")}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                ${this._config.favorite_percentage != null
                  ? html`<button
                      class="widget-btn"
                      @click=${() =>
                        this._setPosition(Number(this._config!.favorite_percentage))}
                    >
                      <ha-icon icon="mdi:star"></ha-icon>
                    </button>`
                  : nothing}
                ${this._config.enable_tilt
                  ? html`<button
                        class="widget-btn"
                        @click=${() => this._call("open_cover_tilt")}
                      >
                        <ha-icon icon="mdi:valve-open"></ha-icon>
                      </button>
                      <button
                        class="widget-btn"
                        @click=${() => this._call("close_cover_tilt")}
                      >
                        <ha-icon icon="mdi:valve-closed"></ha-icon>
                      </button>`
                  : nothing}
              </div>`
            : nothing}

          ${showSlider
            ? html`<div
                class="slider-wrap"
                style=${styleMap({
                  background: openish ? `rgba(${rgb}, 0.2)` : undefined,
                })}
              >
                <div
                  class="slider-fill"
                  style=${styleMap({
                    width: `${displayPos ?? 0}%`,
                    background: `rgba(${rgb}, 1)`,
                  })}
                ></div>
                <input
                  type="range"
                  min=${this._config.slider_min ?? 0}
                  max=${this._config.slider_max ?? 100}
                  .value=${String(displayPos ?? 0)}
                  @change=${this._onSlider}
                />
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private _call(service: string) {
    if (!this.hass || !this._config) return;
    this.hass.callService("cover", service, { entity_id: this._config.entity });
  }

  private _onSlider = (ev: Event) => {
    let value = Number((ev.target as HTMLInputElement).value);
    if (this._config?.invert_percent) value = 100 - value;
    this._setPosition(value);
  };

  private _setPosition(position: number) {
    if (!this.hass || !this._config || Number.isNaN(position)) return;
    this.hass.callService("cover", "set_cover_position", {
      entity_id: this._config.entity,
      position,
    });
  }

  private _nameTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "cover", this._config.entity);
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

  static styles = ulmCardStyles;
}
