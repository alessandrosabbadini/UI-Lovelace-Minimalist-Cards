/**
 * Lit port of custom_cards/custom_card_person_info_small/
 * Compact person card: icon + top-right battery, centered name/label, zone badge.
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
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomPersonInfoSmallCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-person-info-small-card";
  entity: string;
  icon?: string;
  use_entity_picture?: boolean;
  zone1?: string;
  zone2?: string;
  address?: string;
  address_locality?: string;
  driving_entity?: string;
  battery_entity?: string;
  battery_state_entity?: string;
  battery_level_danger?: number;
  battery_level_warning?: number;
}

const DEFAULT_DANGER = 15;
const DEFAULT_WARNING = 30;

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

function asNum(raw: unknown, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

@customElement("ulm-custom-card-person-info-small-card")
export class UlmCustomPersonInfoSmallCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPersonInfoSmallCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "person"),
        grid([iconField("icon"), booleanField("use_entity_picture")]),
        entityField("zone1", "zone", false),
        entityField("zone2", "zone", false),
        entityField("address", undefined, false),
        entityField("address_locality", undefined, false),
        entityField("driving_entity", undefined, false),
        entityField("battery_entity", "sensor", false),
        entityField("battery_state_entity", undefined, false),
        grid([
          numberField("battery_level_danger"),
          numberField("battery_level_warning"),
        ]),
      ],
      computeLabel: labels({
        entity: "Person (ulm_card_person_entity)",
        icon: "Icon (ulm_card_person_icon)",
        use_entity_picture: "Use entity picture",
        zone1: "Zone 1 (ulm_card_person_zone1)",
        zone2: "Zone 2 (ulm_card_person_zone2)",
        address: "Address (ulm_address)",
        address_locality: "Locality (ulm_address_locality)",
        driving_entity: "Driving entity",
        battery_entity: "Battery % sensor",
        battery_state_entity: "Battery charging state",
        battery_level_danger: "Battery danger ≤ (default 15)",
        battery_level_warning: "Battery warning ≤ (default 30)",
      }),
      computeHelper: helpers({
        use_entity_picture: "YAML default true",
        battery_level_danger: "ulm_card_battery_battery_level_danger",
        battery_level_warning: "ulm_card_battery_battery_level_warning",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPersonInfoSmallCardConfig> {
    return {
      entity: "person.anne_therese",
      use_entity_picture: true,
      icon: "mdi:face-man",
    };
  }

  public setConfig(config: UlmCustomPersonInfoSmallCardConfig): void {
    const c = config as UlmCustomPersonInfoSmallCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity", "ulm_card_person_entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      icon: asStr(pick(c, "icon", "ulm_card_person_icon")) || "mdi:face-man",
      use_entity_picture: asBool(
        pick(c, "use_entity_picture", "ulm_card_person_use_entity_picture"),
        true,
      ),
      zone1: asStr(pick(c, "zone1", "ulm_card_person_zone1")),
      zone2: asStr(pick(c, "zone2", "ulm_card_person_zone2")),
      address: asStr(pick(c, "address", "ulm_address")),
      address_locality: asStr(
        pick(c, "address_locality", "ulm_address_locality"),
      ),
      driving_entity: asStr(
        pick(c, "driving_entity", "ulm_card_person_driving_entity"),
      ),
      battery_entity: asStr(
        pick(c, "battery_entity", "ulm_card_person_battery_entity"),
      ),
      battery_state_entity: asStr(
        pick(c, "battery_state_entity", "ulm_card_person_battery_state_entity"),
      ),
      battery_level_danger: asNum(
        pick(c, "battery_level_danger", "ulm_card_battery_battery_level_danger"),
        DEFAULT_DANGER,
      ),
      battery_level_warning: asNum(
        pick(
          c,
          "battery_level_warning",
          "ulm_card_battery_battery_level_warning",
        ),
        DEFAULT_WARNING,
      ),
      type: "custom:ulm-custom-card-person-info-small-card",
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
      return html`<ha-card class="ulm-card ulm-person-info-small"
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
    const battery = this._batteryMarkup();

    return html`
      <ha-card class="ulm-card ulm-person-info-small" @click=${this._moreInfoPerson}>
        <div class="grid">
          <div class=${classMap({ "img-cell": true, picture: !!picture })}>
            ${picture
              ? html`<img src=${picture} alt=${name} />`
              : html`<ha-icon .icon=${icon}></ha-icon>`}
          </div>
          <div class="battery-cell">${battery}</div>
          <div class="name">${name}</div>
          <div class="label">${label}</div>
        </div>
        <span
          class="notification"
          style=${styleMap({
            backgroundColor: badge.bg,
          })}
        >
          <ha-icon .icon=${badge.icon}></ha-icon>
        </span>
      </ha-card>
    `;
  }

  private _isDriving(): boolean {
    const id = this._config?.driving_entity;
    if (!id || !this.hass) return false;
    return this.hass.states[id]?.state === "on";
  }

  private _badge(stateObj: HassEntity): { icon: string; bg: string } {
    const blue = resolveThemeRgb(this, "blue");
    const yellow = resolveThemeRgb(this, "yellow");
    if (stateObj.state === "home") {
      return {
        icon: "mdi:home-variant",
        bg: `rgba(${blue}, 1)`,
      };
    }
    const zoneIcon = this._zoneIcon(stateObj.state);
    return {
      icon: zoneIcon || "mdi:home-minus",
      bg: `rgba(${yellow}, 1)`,
    };
  }

  private _zoneIcon(personState: string): string | undefined {
    if (!this.hass || !this._config) return undefined;
    for (const zoneId of [this._config.zone1, this._config.zone2]) {
      if (!zoneId) continue;
      const zone = this.hass.states[zoneId];
      if (!zone) continue;
      if (personState === zone.attributes.friendly_name) {
        return zone.attributes.icon != null
          ? String(zone.attributes.icon)
          : "mdi:help-circle";
      }
    }
    return undefined;
  }

  private _label(stateObj: HassEntity): string {
    if (!this.hass || !this._config) return stateObj.state;
    const cfg = this._config;

    if (cfg.address) {
      const address = this.hass.states[cfg.address];
      if (address) {
        return this.hass.formatEntityState?.(address) || address.state;
      }
    }

    if (cfg.address_locality) {
      const loc = this.hass.states[cfg.address_locality];
      const locality = loc?.attributes?.Locality ?? loc?.attributes?.locality;
      if (locality != null && locality !== "") return String(locality);
    }

    const localized = this._localizePerson(stateObj);
    if (this._isDriving()) {
      return `Driving - ${localized}`;
    }
    return localized;
  }

  private _localizePerson(stateObj: HassEntity): string {
    if (this.hass?.localize) {
      const key = `component.person.entity_component._.state.${stateObj.state}`;
      const translated = this.hass.localize(key);
      if (translated && translated !== key) return translated;
    }
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    return stateObj.state;
  }

  private _batteryIcon(level: number, charging: boolean): string {
    const infix = charging ? "-charging" : "";
    if (level === 100) return charging ? "mdi:battery-charging" : "mdi:battery";
    if (level < 10) return `mdi:battery${infix}-outline`;
    const step = Math.floor(level / 10) * 10;
    return step === 100
      ? charging
        ? "mdi:battery-charging"
        : "mdi:battery"
      : `mdi:battery${infix}-${step}`;
  }

  private _batteryColor(level: number): string {
    const cfg = this._config!;
    const danger = cfg.battery_level_danger ?? DEFAULT_DANGER;
    const warning = cfg.battery_level_warning ?? DEFAULT_WARNING;
    if (level <= danger) return "var(--google-red, var(--error-color))";
    if (level <= warning) return "var(--google-yellow, #f4b400)";
    return "var(--google-green, #0f9d58)";
  }

  private _batteryMarkup() {
    const id = this._config?.battery_entity;
    if (!id || !this.hass) return nothing;
    const bat = this.hass.states[id];
    if (!bat?.state && bat?.state !== "0") return nothing;
    const level = Number.parseFloat(bat.state);
    if (!Number.isFinite(level)) return nothing;

    const chargeId = this._config?.battery_state_entity;
    const charging =
      !!chargeId &&
      String(this.hass.states[chargeId]?.state || "").toLowerCase() ===
        "charging";
    const icon = this._batteryIcon(level, charging);
    const color = this._batteryColor(level);

    return html`
      <button
        type="button"
        class="battery-btn"
        @click=${this._moreInfoBattery}
        title="Battery"
      >
        <ha-icon
          .icon=${icon}
          style=${styleMap({ color })}
        ></ha-icon>
      </button>
    `;
  }

  private _moreInfoPerson = (ev: Event) => {
    if ((ev.target as HTMLElement).closest(".battery-btn")) return;
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

  private _moreInfoBattery = (ev: Event) => {
    ev.stopPropagation();
    const id = this._config?.battery_entity;
    if (!id) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: id },
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

      ha-card.ulm-person-info-small {
        position: relative;
        height: auto;
        cursor: pointer;
        overflow: visible;
      }

      .grid {
        display: grid;
        grid-template-areas:
          "i battery"
          "n n"
          "l l";
        grid-template-columns: min-content 1fr;
        grid-template-rows: min-content min-content min-content;
        width: 100%;
        align-items: center;
      }

      .img-cell {
        grid-area: i;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
        display: grid;
        place-items: center;
        place-self: start;
        overflow: hidden;
      }

      .img-cell ha-icon {
        --mdc-icon-size: 20px;
        color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      }

      .img-cell.picture {
        padding: 0;
      }

      .img-cell img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .battery-cell {
        grid-area: battery;
        justify-self: end;
        align-self: center;
      }

      .battery-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        background: rgba(var(--primary-background-color, 255, 255, 255), 0.5);
        padding: 0;
        margin: 0;
        display: grid;
        place-items: center;
        cursor: pointer;
        color: inherit;
      }

      .battery-btn ha-icon {
        --mdc-icon-size: 27px;
        width: 27px;
        height: 27px;
      }

      .name {
        grid-area: n;
        place-self: center;
        font-weight: bold;
        font-size: 14px;
        margin: 6% 0 0;
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .label {
        grid-area: l;
        place-self: center;
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
        text-transform: capitalize;
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .notification {
        position: absolute;
        top: 7%;
        left: 38px;
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
        --mdc-icon-size: 11px;
        width: 11px;
        height: 11px;
        color: var(--primary-background-color, #fff);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-person-info-small-card": UlmCustomPersonInfoSmallCard;
  }
}
