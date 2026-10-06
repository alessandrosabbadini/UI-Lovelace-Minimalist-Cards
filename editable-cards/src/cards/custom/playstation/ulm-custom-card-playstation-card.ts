/**
 * Lit port of custom_cards/custom_card_playstation/
 * icon_info_bg PS media card; cover art + white text when playing with picture.
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

export interface UlmCustomPlaystationCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-playstation-card";
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

@customElement("ulm-custom-card-playstation-card")
export class UlmCustomPlaystationCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPlaystationCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "media_player"),
        textField("name"),
      ],
      computeLabel: labels({
        entity: "PlayStation media player",
        name: "Name",
      }),
      computeHelper: helpers({
        entity: "PS4 / PS5 media_player entity",
        name: "Override friendly name when idle/standby",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPlaystationCardConfig> {
    return {
      entity: "media_player.playstation",
      name: "PlayStation",
    };
  }

  public setConfig(config: UlmCustomPlaystationCardConfig): void {
    const c = config as UlmCustomPlaystationCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      type: "custom:ulm-custom-card-playstation-card",
    };
  }

  public getCardSize(): number {
    return 1;
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
      return html`<ha-card class="ulm-card ulm-playstation"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const picture = this._picture(stateObj);
    const cover = !!picture && stateObj.state === "playing";

    const idle = stateObj.state === "idle";
    const iconStyle = cover
      ? {
          color: "white",
          backgroundColor: "transparent",
        }
      : activeIconStyle(this, idle, "blue");

    const friendly =
      stateObj.attributes.friendly_name || stateObj.entity_id;
    const mediaTitle = stateObj.attributes.media_title as string | undefined;
    const name = cover
      ? mediaTitle || this._config.name || friendly
      : this._config.name || friendly;
    const label = cover
      ? friendly
      : this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const icon =
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:sony-playstation";

    const cardStyle = cover
      ? {
          background: `center / cover url("${picture}") rgba(0, 0, 0, 0.15)`,
          backgroundBlendMode: "multiply",
        }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-playstation": true,
          cover,
          idle,
        })}
        style=${styleMap(cardStyle)}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _picture(stateObj: HassEntity): string | undefined {
    const raw =
      stateObj.attributes.entity_picture ||
      stateObj.attributes.entity_picture_local ||
      stateObj.attributes.media_image_url;
    if (typeof raw !== "string" || !raw.length) return undefined;
    if (raw.startsWith("http") || raw.startsWith("/") || raw.startsWith("data:")) {
      return raw;
    }
    return raw;
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-playstation {
      height: auto;
      cursor: pointer;
      background-size: cover;
      background-position: center;
    }

    ha-card.ulm-card.ulm-playstation.cover {
      color: white;
      background-color: transparent;
    }

    ha-card.ulm-card.ulm-playstation.cover .name,
    ha-card.ulm-card.ulm-playstation.cover .label {
      color: white;
    }

    ha-card.ulm-card.ulm-playstation.cover .label {
      opacity: 1;
      filter: none;
    }

    .row,
    .icon-btn,
    .info-btn {
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-playstation-card": UlmCustomPlaystationCard;
  }
}
