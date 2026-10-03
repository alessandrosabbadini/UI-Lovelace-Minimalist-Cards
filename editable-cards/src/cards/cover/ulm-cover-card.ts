import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import { UlmEditorBase } from "../../shared/editor-base";
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

  public static async getConfigElement() {
    return document.createElement("ulm-cover-card-editor");
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

@customElement("ulm-cover-card-editor")
export class UlmCoverCardEditor extends UlmEditorBase<UlmCoverCardConfig> {
  protected render() {
    return this.renderFields([
      { type: "section", label: "Entity" },
      {
        type: "text",
        key: "entity",
        label: "Entity",
        placeholder: "cover.living_room",
      },
      {
        type: "text",
        key: "name",
        label: "Name — ulm_card_cover_name",
      },
      {
        type: "text",
        key: "icon",
        label: "Icon — ulm_card_cover_icon",
      },
      { type: "color", key: "color", label: "Color — ulm_card_cover_color" },
      { type: "section", label: "Controls" },
      {
        type: "toggle",
        key: "enable_controls",
        label: "Controls — ulm_card_cover_enable_controls",
      },
      {
        type: "toggle",
        key: "enable_slider",
        label: "Slider — ulm_card_cover_enable_slider",
      },
      {
        type: "toggle",
        key: "enable_horizontal",
        label: "Horizontal — ulm_card_cover_enable_horizontal",
      },
      {
        type: "toggle",
        key: "invert_percent",
        label: "Invert percent — ulm_card_invert_percent",
      },
      {
        type: "toggle",
        key: "display_left_right",
        label: "Left/right buttons — ulm_card_cover_display_left_right",
      },
      {
        type: "toggle",
        key: "enable_tilt",
        label: "Tilt controls — ulm_card_cover_enable_tilt",
      },
      {
        type: "toggle",
        key: "garage_large",
        label: "Garage large icon — ulm_card_cover_garage_large",
      },
      {
        type: "number",
        key: "favorite_percentage",
        label: "Favorite % — ulm_card_cover_favorite_percentage",
      },
      {
        type: "number",
        key: "slider_min",
        label: "Slider min — ulm_card_cover_slider_min",
      },
      {
        type: "number",
        key: "slider_max",
        label: "Slider max — ulm_card_cover_slider_max",
      },
      { type: "section", label: "Style & popup" },
      {
        type: "toggle",
        key: "force_background_color",
        label: "Force background — ulm_card_cover_force_background_color",
      },
      {
        type: "toggle",
        key: "enable_popup",
        label: "Popup — ulm_card_cover_enable_popup",
      },
    ]);
  }
}
