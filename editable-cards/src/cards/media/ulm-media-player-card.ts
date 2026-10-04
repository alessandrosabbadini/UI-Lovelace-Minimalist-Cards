/**
 * Lit port of card_media_player.yaml — art, controls, volume slider/buttons.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  grid,
  helpers,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import { openUlmPopup } from "../../popups/ulm-popup";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

const APP_ICONS: Record<string, string> = {
  spotify: "mdi:spotify",
  "google podcasts": "mdi:google-podcast",
  plex: "mdi:plex",
  soundcloud: "mdi:soundcloud",
  "youtube music": "mdi:youtube",
  "oto music": "mdi:music-circle",
  pandora: "mdi:pandora",
  netflix: "mdi:netflix",
  hulu: "mdi:hulu",
  "bluetooth audio": "mdi:bluetooth",
};

const OFFISH = new Set(["off", "standby", "unavailable", "unknown"]);

export interface UlmMediaPlayerCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-media-player-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  enable_art?: boolean;
  enable_controls?: boolean;
  enable_volume_slider?: boolean;
  enable_volume_buttons?: boolean;
  enable_volume_adjust?: number;
  collapsible?: boolean;
  idle_off?: boolean;
  player_controls_entity?: string;
  enable_popup?: boolean;
  more_info?: boolean;
  power_button?: boolean;
  force_background_color?: boolean;
}

@customElement("ulm-media-player-card")
export class UlmMediaPlayerCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmMediaPlayerCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        // All original card_media_player variables (top-level for HA persistence)
        entityField("entity", "media_player"),
        grid([textField("name"), iconField("icon")]),
        colorField("color"),
        booleanField("enable_art"),
        booleanField("enable_controls"),
        booleanField("enable_volume_slider"),
        booleanField("enable_volume_buttons"),
        {
          name: "enable_volume_adjust",
          selector: { number: { mode: "box", min: 0, max: 100, step: 1 } },
        },
        booleanField("collapsible"),
        entityField("player_controls_entity", "media_player", false),
        booleanField("enable_popup"),
        booleanField("more_info"),
        booleanField("power_button"),
        booleanField("force_background_color"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_card_media_player_name)",
        icon: "Icon (ulm_card_media_player_icon)",
        color: "Color (ulm_card_media_player_color)",
        enable_art: "Enable album art background",
        enable_controls: "Enable controls",
        enable_volume_slider: "Enable volume slider",
        enable_volume_buttons: "Enable volume buttons",
        enable_volume_adjust: "Volume adjust amount (%)",
        collapsible: "Collapsible when off",
        player_controls_entity: "Player controls entity",
        enable_popup: "Enable popup",
        more_info: "More info (artist • album)",
        power_button: "Power button",
        force_background_color: "Force background color when active",
      }),
      computeHelper: helpers({
        enable_art: "Album picture as card background when entity_picture is set.",
        enable_volume_adjust:
          "Percent step for +/- buttons (default 5). 0 = TV 1% / speaker 5%.",
        collapsible: "Hide controls and volume when state is off/standby.",
        player_controls_entity:
          "Optional other media_player for play/volume commands (default: entity).",
        more_info: "Show artist and album in the sub-label.",
        force_background_color:
          "Use color as card background when the player is active (no art).",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmMediaPlayerCardConfig> {
    return {
      entity: "media_player.living_room",
      enable_controls: true,
      enable_volume_slider: true,
      color: "blue",
    };
  }

  public setConfig(config: UlmMediaPlayerCardConfig): void {
    const c = config as UlmMediaPlayerCardConfig & Record<string, unknown>;
    // Nested leftovers from older expandable form
    const more = (c.more || {}) as Record<string, unknown>;
    const entity =
      config.entity || (c.ulm_card_media_player_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const volAdjRaw =
      config.enable_volume_adjust ??
      more.enable_volume_adjust ??
      c.ulm_card_media_player_enable_volume_adjust;
    // Docs default is 5 (%). YAML default 0 = use device-class steps.
    let volAdj = 5;
    if (volAdjRaw === 0 || volAdjRaw === "0") volAdj = 0;
    else if (volAdjRaw != null && volAdjRaw !== false && volAdjRaw !== "") {
      volAdj = Number(volAdjRaw);
      if (Number.isNaN(volAdj)) volAdj = 5;
    }

    const controlsEntity = [
      config.player_controls_entity,
      more.player_controls_entity,
      c.ulm_card_media_player_player_controls_entity,
    ].find((v) => typeof v === "string" && v.includes(".")) as
      | string
      | undefined;

    this._config = {
      ...config,
      entity,
      name:
        config.name ??
        (c.ulm_card_media_player_name as string | undefined),
      icon:
        (typeof config.icon === "string" && config.icon) ||
        (typeof c.ulm_card_media_player_icon === "string"
          ? (c.ulm_card_media_player_icon as string)
          : undefined) ||
        undefined,
      color:
        (config.color as UlmThemeColor) ||
        (c.ulm_card_media_player_color as UlmThemeColor) ||
        "blue",
      enable_art: Boolean(
        config.enable_art ?? c.ulm_card_media_player_enable_art,
      ),
      enable_controls: Boolean(
        config.enable_controls ?? c.ulm_card_media_player_enable_controls,
      ),
      enable_volume_slider: Boolean(
        config.enable_volume_slider ??
          c.ulm_card_media_player_enable_volume_slider,
      ),
      enable_volume_buttons: Boolean(
        config.enable_volume_buttons ??
          c.ulm_card_media_player_enable_volume_buttons,
      ),
      enable_volume_adjust: volAdj,
      collapsible: Boolean(
        config.collapsible ??
          more.collapsible ??
          c.ulm_card_media_player_collapsible,
      ),
      idle_off: Boolean(
        config.idle_off ?? more.idle_off ?? c.ulm_card_media_player_idle_off,
      ),
      player_controls_entity: controlsEntity,
      enable_popup: Boolean(
        config.enable_popup ?? c.ulm_card_media_player_enable_popup,
      ),
      more_info: Boolean(
        config.more_info ??
          more.more_info ??
          c.ulm_card_media_player_more_info,
      ),
      power_button: Boolean(
        config.power_button ??
          more.power_button ??
          c.ulm_card_media_player_power_button,
      ),
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_media_player_force_background_color,
      ),
      type: "custom:ulm-media-player-card",
    };
  }

  public getCardSize(): number {
    return this._contentRows();
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
    };
  }

  private _contentRows(): number {
    if (!this._config) return 1;
    let n = 1;
    if (this._config.enable_controls) n++;
    if (this._config.enable_volume_slider) n++;
    if (this._config.enable_volume_buttons) n++;
    return n;
  }

  private _isCollapsed(stateObj: HassEntity): boolean {
    if (!this._config?.collapsible) return false;
    if (OFFISH.has(stateObj.state)) return true;
    if (this._config.idle_off && stateObj.state === "idle") return true;
    return false;
  }

  private _isActive(stateObj: HassEntity): boolean {
    if (OFFISH.has(stateObj.state)) return false;
    if (this._config?.idle_off && stateObj.state === "idle") return false;
    return true;
  }

  private _artUrl(stateObj: HassEntity): string | undefined {
    if (!this._config?.enable_art) return undefined;
    // HA media_player: entity_picture (proxy) or remote media_image_url
    const raw =
      stateObj.attributes.entity_picture ||
      stateObj.attributes.media_image_url ||
      stateObj.attributes.entity_picture_local;
    if (typeof raw !== "string" || !raw.length) return undefined;
    return this._resolveMediaUrl(raw);
  }

  private _resolveMediaUrl(path: string): string {
    if (
      path.startsWith("http://") ||
      path.startsWith("https://") ||
      path.startsWith("data:")
    ) {
      return path;
    }
    // Relative /api/media_player_proxy/… needs HA origin + auth path
    if (this.hass?.hassUrl) return this.hass.hassUrl(path);
    return path;
  }

  private _controlEntity(): string {
    return this._config!.player_controls_entity || this._config!.entity;
  }

  private _appIcon(stateObj: HassEntity): string {
    if (this._config?.icon) return this._config.icon;
    const app = String(stateObj.attributes.app_name || "").toLowerCase();
    if (app && APP_ICONS[app]) return APP_ICONS[app];
    return String(stateObj.attributes.icon || "mdi:speaker");
  }

  private _titleName(stateObj: HassEntity): string {
    const friendly =
      this._config?.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    if (stateObj.state === "off" || stateObj.state === "standby") {
      return friendly;
    }
    const idleOff =
      !!this._config?.idle_off && stateObj.state === "idle";
    if (stateObj.attributes.media_title && !idleOff) {
      return String(stateObj.attributes.media_title);
    }
    return friendly;
  }

  private _label(stateObj: HassEntity): string {
    const idleOff =
      !!this._config?.idle_off && stateObj.state === "idle";
    if (stateObj.state === "off" || stateObj.state === "standby" || idleOff) {
      return (
        this.hass?.formatEntityState?.(stateObj) ||
        this._capitalize(stateObj.state)
      );
    }
    const artist = stateObj.attributes.media_artist;
    const album = stateObj.attributes.media_album_name;
    if (this._config?.more_info && artist && album) {
      return `${artist} • ${album}`;
    }
    if (album) return String(album);
    if (artist) return String(artist);
    return (
      this.hass?.formatEntityState?.(stateObj) ||
      this._capitalize(stateObj.state)
    );
  }

  private _playIcon(stateObj: HassEntity): string {
    if (stateObj.state === "playing") return "mdi:pause";
    if (["paused", "off", "standby", "idle"].includes(stateObj.state)) {
      return "mdi:play";
    }
    const duration = Number(stateObj.attributes.media_duration);
    if (duration > 0) return "mdi:pause";
    return "mdi:stop";
  }

  private _playService(stateObj: HassEntity): string {
    const duration = Number(stateObj.attributes.media_duration);
    if (duration > 0) return "media_play_pause";
    if (stateObj.state === "playing") return "media_stop";
    return "media_play";
  }

  private _volumeStep(stateObj: HassEntity): number {
    // Docs: default 5 (%). If 0, use device class (TV 1%, speaker 5%).
    const configured = Number(this._config?.enable_volume_adjust ?? 5);
    if (configured > 0) {
      return configured > 1 ? configured / 100 : configured;
    }
    const cls = String(stateObj.attributes.device_class || "");
    if (cls === "tv") return 0.01;
    if (cls === "speaker") return 0.05;
    return 0.025;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = this._isActive(stateObj);
    const collapsed = this._isCollapsed(stateObj);
    const art = this._artUrl(stateObj);
    const color = this._config.color || "blue";
    const rgb = resolveThemeRgb(this, color);
    const forceBg =
      !!this._config.force_background_color && active && !art;
    const cardBg = forceBg
      ? `rgba(${rgb}, var(--opacity-bg, 1))`
      : undefined;

    const showControls = !!this._config.enable_controls && !collapsed;
    const showVolSlider =
      !!this._config.enable_volume_slider && !collapsed;
    const showVolButtons =
      !!this._config.enable_volume_buttons && !collapsed;

    const vol = Number(stateObj.attributes.volume_level);
    const hasVol = !Number.isNaN(vol);
    const volPct = hasVol ? Math.round(Math.min(1, Math.max(0, vol)) * 100) : 0;

    const iconStyle = this._iconStyle(active, !!art, rgb);
    const textStyle = this._textStyle(!!art, forceBg);
    const widgetStyle = this._widgetStyle(active, !!art, forceBg, rgb);

    const cardStyle: Record<string, string> = {};
    if (art) {
      // Match card_media_player.yaml: center / cover url(...) with dark wash
      // Use full `background` shorthand so it overrides ha-card CSS
      const safe = art.replace(/"/g, "%22");
      cardStyle["--ha-card-background"] = "transparent";
      cardStyle.background = [
        "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))",
        `center / cover no-repeat url("${safe}")`,
      ].join(", ");
    } else if (cardBg) {
      cardStyle["--ha-card-background"] = cardBg;
      cardStyle.background = cardBg;
      cardStyle.backgroundColor = cardBg;
      cardStyle.color = "rgb(250,250,250)";
    }

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          media: true,
          "has-art": !!art,
        })}
        style=${styleMap(cardStyle)}
      >
        ${this._config.power_button
          ? html`<button
              class="power-btn widget-btn"
              style=${styleMap(widgetStyle)}
              @click=${() => this._call("toggle")}
              title="power"
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>`
          : nothing}

        <div
          class="stack"
          style=${styleMap({
            gap: collapsed ? "0px" : "12px",
          })}
        >
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${styleMap(iconStyle)}
                @click=${() =>
                  this._call(this._playService(stateObj), this._controlEntity())}
              >
                <ha-icon .icon=${this._appIcon(stateObj)}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name" style=${styleMap(textStyle.name)}>
                  ${this._titleName(stateObj)}
                </div>
                <div class="label" style=${styleMap(textStyle.label)}>
                  ${this._label(stateObj)}
                </div>
              </button>
            </div>
          </div>

          ${showControls
            ? html`<div class="controls four">
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${() =>
                    this._call("media_previous_track", this._controlEntity())}
                >
                  <ha-icon icon="mdi:skip-previous"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${() =>
                    this._call(this._playService(stateObj), this._controlEntity())}
                >
                  <ha-icon icon=${this._playIcon(stateObj)}></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${() =>
                    this._call("media_next_track", this._controlEntity())}
                >
                  <ha-icon icon="mdi:skip-next"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${this._nameTap}
                  title="source / more info"
                >
                  <ha-icon icon="mdi:playlist-music"></ha-icon>
                </button>
              </div>`
            : nothing}

          ${showVolSlider
            ? html`<div
                class="slider-wrap"
                style=${styleMap(this._sliderTrack(active, !!art, forceBg, rgb))}
              >
                <div
                  class="slider-fill"
                  style=${styleMap({
                    width: `${volPct}%`,
                    background: this._sliderFill(active, !!art, forceBg, rgb),
                  })}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  .value=${String(volPct)}
                  @change=${this._onVolumeSlider}
                />
              </div>`
            : nothing}

          ${showVolButtons
            ? html`<div class="controls">
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${() => this._toggleMute(stateObj)}
                >
                  <ha-icon icon="mdi:volume-mute"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${() => this._nudgeVolume(stateObj, -1)}
                >
                  <ha-icon icon="mdi:volume-minus"></ha-icon>
                </button>
                <button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${() => this._nudgeVolume(stateObj, 1)}
                >
                  <ha-icon icon="mdi:volume-plus"></ha-icon>
                </button>
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _iconStyle(
    active: boolean,
    art: boolean,
    rgb: string,
  ): Record<string, string> {
    if (art) {
      return {
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      };
    }
    if (active) {
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

  private _textStyle(
    art: boolean,
    forceBg: boolean,
  ): { name: Record<string, string>; label: Record<string, string> } {
    if (art) {
      return {
        name: { color: "white", textShadow: "0 0 black" },
        label: { color: "white", textShadow: "0 0 black", opacity: "1" },
      };
    }
    if (forceBg) {
      return {
        name: { color: "rgb(250,250,250)" },
        label: { color: "rgba(250,250,250,0.5)", opacity: "1" },
      };
    }
    return { name: {}, label: {} };
  }

  private _widgetStyle(
    active: boolean,
    art: boolean,
    forceBg: boolean,
    rgb: string,
  ): Record<string, string> {
    if (art) {
      return {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: "white",
      };
    }
    if (forceBg && active) {
      return {
        backgroundColor: "rgb(250,250,250)",
        color: `rgba(${rgb}, 1)`,
      };
    }
    return {};
  }

  private _sliderTrack(
    active: boolean,
    art: boolean,
    forceBg: boolean,
    rgb: string,
  ): Record<string, string> {
    if (!active) return {};
    if (art) return { background: "rgba(0, 0, 0, 0.3)" };
    if (forceBg) return { background: `rgba(${rgb}, 0.3)` };
    return { background: `rgba(${rgb}, 0.2)` };
  }

  private _sliderFill(
    active: boolean,
    art: boolean,
    forceBg: boolean,
    rgb: string,
  ): string {
    if (!active) return "transparent";
    if (art) return "rgba(0, 0, 0, 0.5)";
    if (forceBg) return "rgb(250,250,250)";
    return `rgba(${rgb}, 1)`;
  }

  private _call(service: string, entityId?: string) {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", service, {
      entity_id: entityId || this._config.entity,
    });
  }

  private _toggleMute(stateObj: HassEntity) {
    if (!this.hass || !this._config) return;
    const muted = !!stateObj.attributes.is_volume_muted;
    this.hass.callService("media_player", "volume_mute", {
      entity_id: this._controlEntity(),
      is_volume_muted: !muted,
    });
  }

  private _nudgeVolume(stateObj: HassEntity, dir: 1 | -1) {
    if (!this.hass || !this._config) return;
    const current = Number(stateObj.attributes.volume_level);
    if (Number.isNaN(current)) return;
    const step = this._volumeStep(stateObj);
    const next = Math.min(1, Math.max(0, current + dir * step));
    this.hass.callService("media_player", "volume_set", {
      entity_id: this._controlEntity(),
      volume_level: next,
    });
  }

  private _onVolumeSlider = (ev: Event) => {
    if (!this.hass || !this._config) return;
    const pct = Number((ev.target as HTMLInputElement).value);
    if (Number.isNaN(pct)) return;
    this.hass.callService("media_player", "volume_set", {
      entity_id: this._controlEntity(),
      volume_level: Math.min(1, Math.max(0, pct / 100)),
    });
  };

  private _nameTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "media_player", this._config.entity);
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

      ha-card.media {
        position: relative;
        height: auto;
        overflow: hidden;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        background-size: cover;
        background-position: center;
        transition: background-color 0.2s ease;
      }

      ha-card.media.has-art {
        color: white;
        /* Inline background (art) must win over shared ulm-card background */
        background-color: transparent;
      }

      .stack {
        display: flex;
        flex-direction: column;
      }

      .header {
        min-width: 0;
      }

      .power-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 42px;
        z-index: 2;
      }

      ha-card.media.has-art .widget-btn ha-icon {
        color: white;
      }

      ha-card.media.has-art .slider-wrap {
        background: rgba(0, 0, 0, 0.3);
      }
    `,
  ];
}
