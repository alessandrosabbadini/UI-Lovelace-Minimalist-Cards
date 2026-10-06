/**
 * Lit port of custom_cards/custom_card_imswel_person/
 * icon_info_bg person card with zone badge (home / not_home / zone icon).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  grid,
  helpers,
  iconField,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

/** languages/en.yaml defaults */
const PERSON_HOME_LABEL = "Here";
const PERSON_NOT_HOME_LABEL = "Absent";

export interface UlmCustomImswelPersonCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-imswel-person-card";
  entity: string;
  icon?: string;
  use_entity_picture?: boolean;
  wifi_tracker?: string;
  gps_tracker?: string;
  findmy_script?: string;
  /** Override languages/en.yaml */
  home_label?: string;
  not_home_label?: string;
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

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

@customElement("ulm-custom-card-imswel-person-card")
export class UlmCustomImswelPersonCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomImswelPersonCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "person"),
        grid([iconField("icon"), booleanField("use_entity_picture")]),
        entityField("wifi_tracker", undefined, false),
        entityField("gps_tracker", undefined, false),
        entityField("findmy_script", "script", false),
        grid([textField("home_label"), textField("not_home_label")]),
      ],
      computeLabel: labels({
        entity: "Person entity",
        icon: "Icon",
        use_entity_picture: "Use entity picture",
        wifi_tracker: "WiFi tracker (popup config only)",
        gps_tracker: "GPS tracker (popup config only)",
        findmy_script: "Find My script (popup config only)",
        home_label: "Home label",
        not_home_label: "Not home label",
      }),
      computeHelper: helpers({
        entity: "Also accepts ulm_card_imswel_person_entity",
        use_entity_picture:
          "Also ulm_card_imswel_person_use_entity_picture (default false)",
        wifi_tracker: "Legacy ulm_card_imswel_person_wifi_tracker — stored for YAML parity",
        gps_tracker: "Legacy ulm_card_imswel_person_gps_tracker",
        findmy_script: "Legacy ulm_card_imswel_person_findmy_script",
        home_label:
          "Default from languages/en.yaml (Here); legacy ulm_custom_card_imswel_person_home",
        not_home_label:
          "Default from languages/en.yaml (Absent); legacy ulm_custom_card_imswel_person_not_home",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomImswelPersonCardConfig> {
    return {
      entity: "person.anne_therese",
      icon: "mdi:face-man",
      use_entity_picture: false,
    };
  }

  public setConfig(config: UlmCustomImswelPersonCardConfig): void {
    const c = config as UlmCustomImswelPersonCardConfig &
      Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_card_imswel_person_entity"),
    );
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      icon: asStr(pick(c, "icon")) || "mdi:face-man",
      use_entity_picture: asBool(
        pick(c, "use_entity_picture", "ulm_card_imswel_person_use_entity_picture"),
        false,
      ),
      wifi_tracker: asStr(
        pick(c, "wifi_tracker", "ulm_card_imswel_person_wifi_tracker"),
      ),
      gps_tracker: asStr(
        pick(c, "gps_tracker", "ulm_card_imswel_person_gps_tracker"),
      ),
      findmy_script: asStr(
        pick(c, "findmy_script", "ulm_card_imswel_person_findmy_script"),
      ),
      home_label: asStr(
        pick(c, "home_label", "ulm_custom_card_imswel_person_home"),
      ),
      not_home_label: asStr(
        pick(c, "not_home_label", "ulm_custom_card_imswel_person_not_home"),
      ),
      type: "custom:ulm-custom-card-imswel-person-card",
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
      return html`<ha-card class="ulm-card ulm-imswel-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const name =
      stateObj.attributes.friendly_name || stateObj.entity_id;
    const usePic = !!this._config.use_entity_picture;
    const picture =
      usePic && stateObj.attributes.entity_picture
        ? String(stateObj.attributes.entity_picture)
        : undefined;
    const icon = this._config.icon || "mdi:face-man";
    const badge = this._badge(stateObj);
    const label = this._label(stateObj);
    const iconStyle = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: picture
        ? "transparent"
        : "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };

    return html`
      <ha-card class="ulm-card ulm-imswel-person" @click=${this._moreInfo}>
        <div class="row">
          <div
            class=${classMap({ "icon-btn": true, picture: !!picture })}
            style=${styleMap(iconStyle)}
          >
            ${picture
              ? html`<img src=${picture} alt=${name} />`
              : html`<ha-icon .icon=${icon}></ha-icon>`}
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
        <span
          class="notification"
          style=${styleMap({
            backgroundColor: `rgba(${badge.rgb}, 1)`,
          })}
        >
          <ha-icon .icon=${badge.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }

  private _theme(color: UlmThemeColor): string {
    return resolveThemeRgb(this, color);
  }

  private _badge(stateObj: HassEntity): { icon: string; rgb: string } {
    const state = stateObj.state;
    if (state === "unavailable" || state === "unknown") {
      return { icon: "mdi:alert", rgb: this._theme("red") };
    }
    if (state === "home") {
      return { icon: "mdi:home-variant", rgb: this._theme("blue") };
    }
    const zoneIcon = this._zoneIcon(state);
    return {
      icon: zoneIcon || "mdi:home-minus",
      rgb: this._theme("green"),
    };
  }

  private _zoneIcon(personState: string): string | undefined {
    if (!this.hass) return undefined;
    if (personState === "not_home") return "mdi:home-minus";

    for (const id of Object.keys(this.hass.states)) {
      if (!id.startsWith("zone.")) continue;
      const zone = this.hass.states[id];
      if (personState === zone.attributes.friendly_name) {
        return zone.attributes.icon != null
          ? String(zone.attributes.icon)
          : "mdi:help-circle";
      }
    }
    return undefined;
  }

  private _label(stateObj: HassEntity): string {
    const state = stateObj.state;
    const cfg = this._config;

    if (state === "home") {
      return cfg?.home_label || PERSON_HOME_LABEL;
    }
    if (state === "not_home") {
      return cfg?.not_home_label || PERSON_NOT_HOME_LABEL;
    }
    if (state === "unavailable" || state === "unknown") {
      const key = `state.default.${state}`;
      const t = this.hass?.localize?.(key);
      if (t && t !== key) return t;
      return state === "unavailable" ? "Unavailable" : "Unknown";
    }
    return state;
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

  static styles = [
    ulmCardStyles,
    css`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-imswel-person {
        position: relative;
        height: auto;
        cursor: pointer;
        overflow: visible;
      }

      .icon-btn.picture {
        padding: 0;
        overflow: hidden;
      }

      .icon-btn.picture ha-icon {
        display: none;
      }

      .icon-btn.picture img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .notification {
        position: absolute;
        left: 38px;
        top: 8px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        z-index: 2;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 10px;
        width: 10px;
        height: 10px;
        color: var(--primary-background-color, #fff);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-imswel-person-card": UlmCustomImswelPersonCard;
  }
}
