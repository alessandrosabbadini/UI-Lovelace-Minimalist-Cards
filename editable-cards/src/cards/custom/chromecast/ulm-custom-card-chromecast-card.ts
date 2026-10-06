/**
 * Lit port of custom_cards/custom_card_chromecast/
 * icon_info header (blue when available) + power / play-pause / HDMI widgets.
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
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomChromecastCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-chromecast-card";
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

@customElement("ulm-custom-card-chromecast-card")
export class UlmCustomChromecastCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomChromecastCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "media_player"),
        textField("name"),
      ],
      computeLabel: labels({
        entity: "Chromecast / media player",
        name: "Name",
      }),
      computeHelper: helpers({
        entity: "Legacy: ulm_card_media_player_with_controls_entity",
        name: "Legacy: ulm_card_media_player_with_controls_name",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomChromecastCardConfig> {
    return {
      entity: "media_player.chromecast",
      name: "Chromecast",
    };
  }

  public setConfig(config: UlmCustomChromecastCardConfig): void {
    const c = config as UlmCustomChromecastCardConfig & Record<string, unknown>;
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
      type: "custom:ulm-custom-card-chromecast-card",
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
      return html`<ha-card class="ulm-card ulm-chromecast"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const available = stateObj.state !== "unavailable";
    const iconStyle = activeIconStyle(this, available, "blue");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      (stateObj.attributes.icon as string | undefined) || "mdi:cast";
    const label =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const playIcon =
      stateObj.state === "paused" || stateObj.state === "off"
        ? "mdi:play"
        : "mdi:pause";

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-chromecast": true,
          available,
        })}
      >
        <div class="stack">
          <button
            class="cast-header"
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
              @click=${() => this._call("toggle")}
            >
              <ha-icon icon="mdi:power"></ha-icon>
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
              @click=${() => this._call("toggle")}
            >
              <ha-icon icon="mdi:video-input-hdmi"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
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

    ha-card.ulm-card.ulm-chromecast {
      height: auto;
    }

    .cast-header {
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

    .cast-header .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .cast-header .info-btn {
      grid-area: 1 / 2 / 3 / 3;
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-chromecast-card": UlmCustomChromecastCard;
  }
}
