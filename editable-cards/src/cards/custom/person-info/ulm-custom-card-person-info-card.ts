/**
 * Lit port of custom_cards/custom_card_person_info/
 * icon_info_bg person card with zone/driving badge, battery + commute rows.
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
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

export interface UlmCustomPersonInfoCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-person-info-card";
  entity: string;
  name?: string;
  icon?: string;
  use_entity_picture?: boolean;
  zone1?: string;
  zone2?: string;
  address?: string;
  address_locality?: string;
  driving_entity?: string;
  battery_entity?: string;
  battery_state_entity?: string;
  commute_entity?: string;
  commute_icon?: string;
  multiline?: boolean;
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

@customElement("ulm-custom-card-person-info-card")
export class UlmCustomPersonInfoCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPersonInfoCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "person"),
        grid([textField("name"), iconField("icon")]),
        booleanField("use_entity_picture"),
        booleanField("multiline"),
        entityField("zone1", "zone", false),
        entityField("zone2", "zone", false),
        entityField("address", undefined, false),
        entityField("address_locality", undefined, false),
        entityField("driving_entity", undefined, false),
        entityField("battery_entity", "sensor", false),
        entityField("battery_state_entity", undefined, false),
        entityField("commute_entity", "sensor", false),
        iconField("commute_icon"),
      ],
      computeLabel: labels({
        entity: "Person entity",
        name: "Name",
        icon: "Icon",
        use_entity_picture: "Use entity picture",
        multiline: "Multiline layout",
        zone1: "Zone 1",
        zone2: "Zone 2",
        address: "Address sensor",
        address_locality: "Address locality sensor",
        driving_entity: "Driving entity",
        battery_entity: "Battery % sensor",
        battery_state_entity: "Battery charging state",
        commute_entity: "Commute (minutes) sensor",
        commute_icon: "Commute icon",
      }),
      computeHelper: helpers({
        use_entity_picture:
          "Show entity_picture instead of the icon (default false).",
        multiline:
          "Battery/commute on a third row when true; beside name/label when false.",
        address: "Label shows this sensor's state when set.",
        address_locality:
          "Fallback label from attributes.Locality when address is empty.",
        driving_entity: "When on, badge turns red and label shows Driving - …",
        battery_state_entity: 'Charging when state is "charging" (case-insensitive).',
        commute_icon: "Default mdi:car",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPersonInfoCardConfig> {
    return {
      entity: "person.anne_therese",
      use_entity_picture: false,
      icon: "mdi:face-man",
      commute_icon: "mdi:car",
      multiline: true,
    };
  }

  public setConfig(config: UlmCustomPersonInfoCardConfig): void {
    const c = config as UlmCustomPersonInfoCardConfig & Record<string, unknown>;
    const entity = asStr(pick(c, "entity", "ulm_card_person_entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      icon: asStr(pick(c, "icon")) || "mdi:face-man",
      use_entity_picture: asBool(
        pick(c, "use_entity_picture", "ulm_card_person_use_entity_picture"),
        false,
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
      commute_entity: asStr(
        pick(c, "commute_entity", "ulm_card_person_commute_entity"),
      ),
      commute_icon:
        asStr(
          pick(
            c,
            "commute_icon",
            "ulm_card_person_commute_icon",
            "ulm_card_person_cummute_icon",
          ),
        ) || "mdi:car",
      multiline: asBool(pick(c, "multiline", "ulm_multiline"), true),
      type: "custom:ulm-custom-card-person-info-card",
    };
  }

  public getCardSize(): number {
    return this._config?.multiline === false ? 1 : 2;
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
      return html`<ha-card class="ulm-person-info"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const usePic = !!this._config.use_entity_picture;
    const picture =
      usePic && stateObj.attributes.entity_picture
        ? String(stateObj.attributes.entity_picture)
        : undefined;
    const icon = this._config.icon || "mdi:face-man";
    const multiline = this._config.multiline !== false;
    const badge = this._badge(stateObj);
    const label = this._label(stateObj);
    const battery = this._battery();
    const commute = this._commute();

    return html`
      <ha-card
        class=${classMap({
          "ulm-person-info": true,
          multiline,
        })}
        @click=${this._moreInfo}
      >
        <div
          class="grid"
          style=${styleMap({
            gridTemplateAreas: multiline
              ? `"i n" "i l" "battery commute"`
              : `"i n battery" "i l commute"`,
            gridTemplateColumns: multiline
              ? "min-content auto"
              : "min-content auto min-content",
          })}
        >
          <div class=${classMap({ "img-cell": true, picture: !!picture })}>
            ${picture
              ? html`<img
                  class="entity-picture"
                  src=${picture}
                  alt=${name}
                />`
              : html`<ha-icon class="person-icon" .icon=${icon}></ha-icon>`}
          </div>
          <div class="name">${name}</div>
          <div class="label">${label}</div>
          <div class="battery">${battery}</div>
          <div class="commute">${commute}</div>
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

  private _isDriving(): boolean {
    const id = this._config?.driving_entity;
    if (!id || !this.hass) return false;
    return this.hass.states[id]?.state === "on";
  }

  private _badge(stateObj: HassEntity): { icon: string; rgb: string } {
    if (this._isDriving()) {
      return { icon: "mdi:car", rgb: this._theme("red") };
    }

    if (stateObj.state !== "home") {
      const zoneIcon = this._zoneIcon(stateObj.state);
      return {
        icon: zoneIcon || "mdi:home-minus",
        rgb: this._theme("green"),
      };
    }

    return { icon: "mdi:home-variant", rgb: this._theme("blue") };
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
    if (stateObj.state === "home") return "Home";
    if (stateObj.state === "not_home") return "Away";
    return stateObj.state;
  }

  private _batteryIcon(level: number, charging: boolean): string {
    const base = charging ? "mdi:battery-charging" : "mdi:battery";
    const rounded = Math.ceil(level / 10) * 10;
    return rounded === 100 ? base : `${base}-${rounded}`;
  }

  private _batteryColor(level: number): string {
    // Intended thresholds (YAML order was inverted for ≤25)
    if (level <= 25) return this._theme("red");
    if (level <= 50) return this._theme("yellow");
    return this._theme("green");
  }

  private _battery() {
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
    const rgb = this._batteryColor(level);

    return html`
      <ha-icon
        .icon=${icon}
        style=${styleMap({ color: `rgba(${rgb}, 1)` })}
      ></ha-icon>
      <span>${Math.round(level)}%</span>
    `;
  }

  private _commute() {
    const id = this._config?.commute_entity;
    if (!id || !this.hass) return nothing;
    const st = this.hass.states[id];
    if (st?.state == null || st.state === "") return nothing;
    const minutes = Number.parseFloat(st.state);
    if (!Number.isFinite(minutes)) return nothing;

    let color: UlmThemeColor = "green";
    if (minutes >= 60) color = "red";
    else if (minutes >= 30) color = "yellow";
    const rgb = this._theme(color);
    const icon = this._config?.commute_icon || "mdi:car";

    return html`
      <ha-icon
        .icon=${icon}
        style=${styleMap({ color: `rgba(${rgb}, 1)` })}
      ></ha-icon>
      <span>${minutes} min</span>
    `;
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
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    ha-card.ulm-person-info {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: block;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 12px;
      margin: 0;
      overflow: visible;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    .grid {
      display: grid;
      grid-template-rows: min-content min-content;
      column-gap: 0;
      row-gap: 0;
      width: 100%;
      align-content: start;
    }

    .img-cell {
      grid-area: i;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      place-items: center;
      place-self: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    .img-cell.picture {
      place-self: stretch stretch;
    }

    .person-icon {
      --mdc-icon-size: 20px;
      width: 20px;
      height: 20px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      line-height: 0;
    }

    .entity-picture {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    .battery,
    .commute {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 1;
      min-height: 16px;
    }

    .battery {
      grid-area: battery;
      align-self: center;
      justify-self: start;
    }

    .commute {
      grid-area: commute;
      align-self: center;
      justify-self: end;
      margin-top: 6px;
    }

    ha-card.ulm-person-info.multiline .battery {
      margin-top: 6px;
    }

    ha-card.ulm-person-info:not(.multiline) .battery,
    ha-card.ulm-person-info:not(.multiline) .commute {
      margin-top: 0;
      margin-left: 8px;
    }

    .battery ha-icon,
    .commute ha-icon {
      --mdc-icon-size: 16px;
      width: 16px;
      height: 16px;
      margin: 0 2px 0 0;
    }

    .battery span,
    .commute span {
      padding-top: 2px;
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
      padding: 0;
      margin: 0;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .notification ha-icon {
      --mdc-icon-size: 10px;
      width: 10px;
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 0;
      color: var(--primary-background-color, #fff);
    }

    .notification ha-icon svg {
      display: block;
      width: 10px;
      height: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-person-info-card": UlmCustomPersonInfoCard;
  }
}
