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

export interface UlmMediaPlayerCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-media-player-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  enable_controls?: boolean;
  enable_popup?: boolean;
}

@customElement("ulm-media-player-card")
export class UlmMediaPlayerCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmMediaPlayerCardConfig;

  public static async getConfigElement() {
    return document.createElement("ulm-media-player-card-editor");
  }

  public static getStubConfig(): Partial<UlmMediaPlayerCardConfig> {
    return {
      entity: "media_player.bedroom",
      enable_controls: true,
      color: "blue",
    };
  }

  public setConfig(config: UlmMediaPlayerCardConfig): void {
    if (!config.entity) throw new Error("Please define an entity");
    this._config = {
      enable_controls: true,
      enable_popup: false,
      color: "blue",
      ...config,
      type: "custom:ulm-media-player-card",
    };
  }

  public getCardSize(): number {
    return this._config?.enable_controls ? 2 : 1;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const playing = ["playing", "paused", "on"].includes(stateObj.state);
    const rgb = resolveThemeRgb(this, this._config.color || "blue");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon || stateObj.attributes.icon || "mdi:speaker";
    const title =
      stateObj.attributes.media_title ||
      stateObj.attributes.media_artist ||
      stateObj.state;

    return html`
      <ha-card class="ulm-card">
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap({
              color: playing ? `rgb(${rgb})` : "var(--secondary-text-color)",
              backgroundColor: playing
                ? `rgba(${rgb}, 0.2)`
                : "rgba(var(--rgb-primary-text-color, 128, 128, 128), 0.05)",
            })}
            @click=${() => this._call("media_play_pause")}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name">${name}</div>
            <div class="label">${title}</div>
          </button>
        </div>
        ${this._config.enable_controls
          ? html`<div class="widgets">
              <button class="widget-btn" @click=${() => this._call("media_previous_track")}>
                <ha-icon icon="mdi:skip-previous"></ha-icon>
              </button>
              <button class="widget-btn" @click=${() => this._call("media_play_pause")}>
                <ha-icon
                  icon=${stateObj.state === "playing"
                    ? "mdi:pause"
                    : "mdi:play"}
                ></ha-icon>
              </button>
              <button class="widget-btn" @click=${() => this._call("media_next_track")}>
                <ha-icon icon="mdi:skip-next"></ha-icon>
              </button>
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _call(service: string) {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", service, {
      entity_id: this._config.entity,
    });
  }

  private _moreInfo = (ev: Event) => {
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

  static styles = ulmCardStyles;
}

@customElement("ulm-media-player-card-editor")
export class UlmMediaPlayerCardEditor extends UlmEditorBase<UlmMediaPlayerCardConfig> {
  protected render() {
    return this.renderFields([
      {
        type: "text",
        key: "entity",
        label: "Entity",
        placeholder: "media_player.living_room",
      },
      { type: "text", key: "name", label: "Name (optional)" },
      { type: "text", key: "icon", label: "Icon (optional)" },
      { type: "color", key: "color", label: "Theme color" },
      { type: "toggle", key: "enable_controls", label: "Show media controls" },
      {
        type: "toggle",
        key: "enable_popup",
        label: "Open ULM media popup instead of more-info",
      },
    ]);
  }
}
