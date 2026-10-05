/**
 * Lit port of custom_cards/custom_card_media_player_sonos/
 * icon_info_bg header (green when playing) + volume / play-pause / volume widgets.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle } from "../../../shared/colors";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomMediaPlayerSonosCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-media-player-sonos-card";
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

@customElement("ulm-custom-card-media-player-sonos-card")
export class UlmCustomMediaPlayerSonosCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomMediaPlayerSonosCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "media_player"),
        textField("name"),
      ],
      computeLabel: labels({
        entity: "Media player",
        name: "Name",
      }),
      computeHelper: helpers({
        entity:
          "Legacy: ulm_card_media_player_with_controls_entity",
        name: "Legacy: ulm_card_media_player_with_controls_name",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomMediaPlayerSonosCardConfig> {
    return {
      entity: "media_player.sonos_living_room",
      name: "Sonos",
    };
  }

  public setConfig(config: UlmCustomMediaPlayerSonosCardConfig): void {
    const c = config as UlmCustomMediaPlayerSonosCardConfig &
      Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_card_media_player_with_controls_entity"),
    );
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(
        pick(c, "name", "ulm_card_media_player_with_controls_name"),
      ),
      type: "custom:ulm-custom-card-media-player-sonos-card",
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
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-sonos"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const playing = stateObj.state === "playing";
    const iconStyle = activeIconStyle(this, playing, "green");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      (stateObj.attributes.icon as string | undefined) || "mdi:speaker";
    const label = this._label(stateObj);
    const playIcon =
      stateObj.state === "paused" || stateObj.state === "off"
        ? "mdi:play"
        : "mdi:pause";

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-sonos": true,
          playing,
        })}
      >
        <div class="stack">
          <button
            class="sonos-header"
            type="button"
            @click=${() => this._moreInfo()}
          >
            <div class="icon-btn" style=${styleMap(iconStyle)}>
              <ha-icon .icon=${icon}></ha-icon>
            </div>
            <div class="info-btn">
              <div class="name">${name}</div>
              <div class="label">${label}</div>
            </div>
          </button>

          <div class="widgets">
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("volume_down")}
            >
              <ha-icon icon="mdi:volume-minus"></ha-icon>
            </button>
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("media_play_pause")}
            >
              <ha-icon .icon=${playIcon}></ha-icon>
            </button>
            <button
              class="widget-btn"
              type="button"
              @click=${() => this._call("volume_up")}
            >
              <ha-icon icon="mdi:volume-plus"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _label(stateObj: HassEntity): string {
    const stateLabel =
      this.hass?.formatEntityState?.(stateObj) || stateObj.state;
    if (
      stateObj.state === "idle" ||
      stateObj.state === "paused" ||
      stateObj.state === "unavailable"
    ) {
      return stateLabel;
    }
    const source =
      (stateObj.attributes.source as string | undefined) || stateLabel;
    const vol = Number(stateObj.attributes.volume_level);
    const pct = Number.isFinite(vol) ? Math.round(vol * 100) : 0;
    return `${source} • ${pct}%`;
  }

  private _call(service: string) {
    if (!this.hass || !this._config) return;
    this.hass.callService("media_player", service, {
      entity_id: this._config.entity,
    });
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
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-sonos {
      height: auto;
    }

    .sonos-header {
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      grid-template-areas:
        "icon name"
        "icon label";
      align-items: center;
      width: 100%;
      border: 0;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
      color: inherit;
      font: inherit;
      text-align: left;
    }

    .sonos-header .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .sonos-header .info-btn {
      grid-area: 1 / 2 / 3 / 3;
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-media-player-sonos-card": UlmCustomMediaPlayerSonosCard;
  }
}
