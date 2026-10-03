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

const COVER_ICONS_OPEN: Record<string, string> = {
  awning: "mdi:window-open",
  blind: "mdi:blinds-open",
  curtain: "mdi:curtains",
  damper: "mdi:circle-outline",
  door: "mdi:door-open",
  garage: "mdi:garage-open",
  gate: "mdi:gate-open",
  shade: "mdi:roller-shade",
  shutter: "mdi:window-shutter-open",
  window: "mdi:window-open",
};

const COVER_ICONS_CLOSED: Record<string, string> = {
  awning: "mdi:window-closed",
  blind: "mdi:blinds",
  curtain: "mdi:curtains-closed",
  damper: "mdi:circle-slice-8",
  door: "mdi:door-closed",
  garage: "mdi:garage",
  gate: "mdi:gate",
  shade: "mdi:roller-shade-closed",
  shutter: "mdi:window-shutter",
  window: "mdi:window-closed",
};

const OPENISH = new Set(["open", "opening", "closing"]);

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
        name: "Name (ulm_card_cover_name)",
        icon: "Icon (ulm_card_cover_icon)",
        color: "Color (ulm_card_cover_color)",
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
      computeHelper: helpers({
        entity: "Cover entity to control.",
        enable_horizontal:
          "Place controls/slider beside the icon row when enabled.",
        favorite_percentage: "Optional preset position button (0–100).",
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
    const favorite =
      config.favorite_percentage ??
      (c.ulm_card_cover_favorite_percentage as number | undefined);
    this._config = {
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
        config.invert_percent ??
          c.ulm_card_invert_percent ??
          c.ulm_card_cover_invert_percent,
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
      show_last_changed: Boolean(
        config.show_last_changed ?? c.ulm_card_cover_show_last_changed,
      ),
      favorite_percentage:
        favorite === null || favorite === undefined || favorite === false
          ? undefined
          : Number(favorite),
      slider_min: Number(
        config.slider_min ?? c.ulm_card_cover_slider_min ?? 0,
      ),
      slider_max: Number(
        config.slider_max ?? c.ulm_card_cover_slider_max ?? 100,
      ),
      type: "custom:ulm-cover-card",
    };
  }

  public getCardSize(): number {
    let n = 1;
    if (this._config?.enable_controls) n++;
    if (this._config?.enable_slider) n++;
    if (this._config?.enable_tilt) n++;
    return this._config?.enable_horizontal ? Math.max(1, n - 1) : n;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const invert = !!this._config.invert_percent;
    const position = Number(stateObj.attributes.current_position);
    const hasPosition = !Number.isNaN(position);
    const displayPos = hasPosition
      ? invert
        ? 100 - position
        : position
      : undefined;

    // Original: active when state != "closed" (invert uses position == 100 as inactive)
    const active = invert
      ? !(hasPosition && position === 100)
      : stateObj.state !== "closed";

    const color = this._config.color || "blue";
    const rgb = resolveThemeRgb(this, color);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const deviceClass = String(stateObj.attributes.device_class || "");
    const icon = this._coverIcon(stateObj.state, deviceClass, stateObj);

    const iconStyle = activeIconStyle(this, active, color);
    const forceBg = !!this._config.force_background_color && active;
    const showControls = !!this._config.enable_controls;
    const showSlider = !!this._config.enable_slider;
    const showTilt = !!this._config.enable_tilt;
    const hasFavorite =
      this._config.favorite_percentage != null &&
      !Number.isNaN(Number(this._config.favorite_percentage));

    const stackClass = [
      "stack",
      this._config.enable_horizontal ? "horizontal" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const closeIcon = this._closeControlIcon(deviceClass);
    const openIcon = this._openControlIcon(deviceClass);

    const label = this._label(stateObj, displayPos, hasPosition, invert);

    return html`
      <ha-card
        class="ulm-card"
        style=${styleMap({
          backgroundColor: forceBg
            ? `rgba(${rgb}, var(--opacity-bg, 1))`
            : undefined,
          color: forceBg ? "rgb(250,250,250)" : undefined,
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
              <div class="label">${label}</div>
            </button>
          </div>

          ${showControls
            ? html`<div
                class="controls ${hasFavorite ? "four" : ""}"
              >
                <button
                  class="widget-btn"
                  style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                  @click=${() => this._call("close_cover")}
                >
                  <ha-icon icon=${closeIcon}></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                  @click=${() => this._call("stop_cover")}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                  @click=${() => this._call("open_cover")}
                >
                  <ha-icon icon=${openIcon}></ha-icon>
                </button>
                ${hasFavorite
                  ? html`<button
                      class="widget-btn"
                      style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                      @click=${() =>
                        this._setPosition(
                          Number(this._config!.favorite_percentage),
                        )}
                    >
                      <ha-icon icon="mdi:star"></ha-icon>
                    </button>`
                  : nothing}
              </div>`
            : nothing}

          ${showSlider
            ? html`<div
                class="slider-wrap"
                style=${styleMap({
                  background: active
                    ? forceBg
                      ? `rgba(${rgb}, 0.3)`
                      : `rgba(${rgb}, 0.1)`
                    : undefined,
                })}
              >
                <div
                  class="slider-fill"
                  style=${styleMap({
                    width: `${displayPos ?? (active ? 100 : 0)}%`,
                    background: active
                      ? forceBg
                        ? "rgb(250,250,250)"
                        : `rgba(${rgb}, 0.8)`
                      : "transparent",
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

          ${showTilt
            ? html`<div class="controls">
                <button
                  class="widget-btn"
                  style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                  @click=${() => this._call("close_cover_tilt")}
                >
                  <ha-icon icon="mdi:arrow-bottom-left"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                  @click=${() => this._call("stop_cover_tilt")}
                >
                  <ha-icon icon="mdi:stop"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(this._widgetStyle(forceBg, color, rgb))}
                  @click=${() => this._call("open_cover_tilt")}
                >
                  <ha-icon icon="mdi:arrow-top-right"></ha-icon>
                </button>
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _widgetStyle(
    forceBg: boolean,
    _color: UlmThemeColor,
    rgb: string,
  ): Record<string, string> {
    if (!forceBg) return {};
    return {
      backgroundColor: "rgb(250,250,250)",
      color: `rgba(${rgb}, 1)`,
    };
  }

  private _coverIcon(
    state: string,
    deviceClass: string,
    stateObj: { attributes: Record<string, unknown> },
  ): string {
    if (this._config?.icon) return this._config.icon;
    if (stateObj.attributes.icon) return String(stateObj.attributes.icon);

    const open = OPENISH.has(state);
    if (deviceClass === "garage" && this._config?.garage_large) {
      return open ? "mdi:garage-open-variant" : "mdi:garage-variant";
    }
    const map = open ? COVER_ICONS_OPEN : COVER_ICONS_CLOSED;
    return map[deviceClass] || "mdi:help-circle";
  }

  private _horizontalDevice(deviceClass: string): boolean {
    return (
      deviceClass === "curtain" ||
      deviceClass === "gate" ||
      deviceClass === "awning"
    );
  }

  private _closeControlIcon(deviceClass: string): string {
    if (this._config?.display_left_right) return "mdi:arrow-left";
    if (this._horizontalDevice(deviceClass))
      return "mdi:arrow-collapse-horizontal";
    return "mdi:arrow-down";
  }

  private _openControlIcon(deviceClass: string): string {
    if (this._config?.display_left_right) return "mdi:arrow-right";
    if (this._horizontalDevice(deviceClass))
      return "mdi:arrow-expand-horizontal";
    return "mdi:arrow-up";
  }

  private _label(
    stateObj: {
      state: string;
      last_changed?: string;
      attributes: Record<string, unknown>;
    },
    displayPos: number | undefined,
    hasPosition: boolean,
    invert: boolean,
  ): string {
    if (this._config?.show_last_changed && stateObj.last_changed) {
      return this._relativeTime(stateObj.last_changed);
    }

    const state = stateObj.state;
    const stateLabel = this._capitalize(state);

    if (invert && hasPosition) {
      // Original: show inverted state words + % only when position == 0
      const invertWords: Record<string, string> = {
        closed: "Open",
        closing: "Opening",
        open: "Closed",
        opening: "Closing",
      };
      const word = invertWords[state] || stateLabel;
      if (Number(stateObj.attributes.current_position) === 0) {
        return `${word} • ${displayPos}%`;
      }
      return word;
    }

    if (
      ["unknown", "unavailable", "closed"].includes(state) ||
      !hasPosition
    ) {
      return stateLabel;
    }

    return `${stateLabel} • ${displayPos}%`;
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
