/**
 * Lit port of custom_cards/custom_card_drealine_roomview/
 * Room header, sensor icons row, device toggle buttons with badges.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
  labels,
  selectField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomDrealineRoomviewCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-drealine-roomview-card";
  entity?: string;
  icon?: string;
  group_lights?: string;
  group_motions?: string;
  group_doors?: string;
  group_windows?: string;
  group_outlets?: string;
  group_tv?: string;
  group_water?: string;
  group_windows_shutters?: string;
  temperature?: string;
  humidity?: string;
  tap_action?: string;
  navigation_path?: string;
}

const SENSOR_GROUPS = [
  "group_lights",
  "group_motions",
  "group_doors",
  "group_windows",
  "group_outlets",
  "group_water",
] as const;

type SensorGroupKey = (typeof SENSOR_GROUPS)[number];

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

/** Member entity_ids from a HA group / light group entity. */
export function expandGroupEntityIds(
  hass: HomeAssistant,
  groupId?: string,
): string[] {
  if (!groupId) return [];
  const group = hass.states[groupId];
  if (!group) return [];
  const raw = group.attributes.entity_id;
  if (!Array.isArray(raw)) return [];
  return raw.filter((id): id is string => typeof id === "string" && !!id);
}

@customElement("ulm-custom-card-drealine-roomview-card")
export class UlmCustomDrealineRoomviewCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomDrealineRoomviewCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        iconField("icon"),
        entityField("temperature", ["sensor"], false),
        entityField("humidity", ["sensor"], false),
        entityField("group_lights", ["group", "light"], false),
        entityField("group_motions", ["group", "binary_sensor"], false),
        entityField("group_doors", ["group", "binary_sensor"], false),
        entityField("group_windows", ["group", "binary_sensor"], false),
        entityField("group_outlets", ["group", "switch"], false),
        entityField("group_tv", ["group", "media_player", "switch"], false),
        entityField("group_water", ["group", "binary_sensor"], false),
        entityField("group_windows_shutters", ["group", "cover"], false),
        selectField("tap_action", [
          { value: "more-info", label: "more-info" },
          { value: "navigate", label: "navigate" },
          { value: "none", label: "none" },
        ]),
        textField("navigation_path"),
      ],
      computeLabel: labels({
        icon: "Room icon",
        temperature: "Temperature sensor",
        humidity: "Humidity sensor",
        group_lights: "Lights group",
        group_motions: "Motions group",
        group_doors: "Doors group",
        group_windows: "Windows group",
        group_outlets: "Outlets group",
        group_tv: "TV group",
        group_water: "Water/leak group",
        group_windows_shutters: "Window shutters group",
        tap_action: "Header tap (ulm_card_tap_action)",
        navigation_path: "Navigate path (ulm_card_tap_navigate_path)",
      }),
      computeHelper: helpers({
        group_lights: "Group entity with entity_id members — toggled on double-click/tap",
        navigation_path: "Used when tap_action is navigate",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomDrealineRoomviewCardConfig> {
    return {
      icon: "mdi:sofa",
      temperature: "sensor.temperature",
      humidity: "sensor.humidity",
      group_lights: "light.living_room",
      tap_action: "navigate",
      navigation_path: "living-room",
    };
  }

  public setConfig(config: UlmCustomDrealineRoomviewCardConfig): void {
    const c = config as UlmCustomDrealineRoomviewCardConfig &
      Record<string, unknown>;

    const group = (key: string) => asStr(pick(c, key));

    this._config = {
      ...config,
      entity: asStr(pick(c, "entity")),
      icon: asStr(pick(c, "icon")) || "mdi:floor-plan",
      group_lights: group("group_lights"),
      group_motions: group("group_motions"),
      group_doors: group("group_doors"),
      group_windows: group("group_windows"),
      group_outlets: group("group_outlets"),
      group_tv: group("group_tv"),
      group_water: group("group_water"),
      group_windows_shutters: group("group_windows_shutters"),
      temperature: group("temperature"),
      humidity: group("humidity"),
      tap_action:
        asStr(pick(c, "tap_action", "ulm_card_tap_action")) || "more-info",
      navigation_path: asStr(
        pick(c, "navigation_path", "ulm_card_tap_navigate_path"),
      ),
      type: "custom:ulm-custom-card-drealine-roomview-card",
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
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const showWarning = this._unavailableCount() >= 1;
    const showSensors = this._shouldShowSensorsRow();

    return html`
      <ha-card class="ulm-card ulm-drealine-roomview">
        <div class="root">
          <button
            class="header"
            type="button"
            @click=${this._headerTap}
          >
            <div class="header-icon-wrap">
              <div class="header-icon">
                <ha-icon .icon=${cfg.icon}></ha-icon>
              </div>
              ${showWarning
                ? html`<span class="warn-badge"
                    ><ha-icon icon="mdi:exclamation-thick"></ha-icon
                  ></span>`
                : nothing}
            </div>
            <div class="header-text">
              <div class="header-line">
                <ha-icon icon="mdi:thermometer" class="mini-icon"></ha-icon>
                <span>${this._tempLine()}</span>
              </div>
              <div class="header-line">
                <ha-icon icon="mdi:water-percent" class="mini-icon"></ha-icon>
                <span>${this._humidityLine()}</span>
              </div>
            </div>
          </button>

          ${showSensors
            ? html`<div class="sensors">${this._sensorRow()}</div>`
            : nothing}

          <div class="devices">${this._deviceRow()}</div>
        </div>
      </ha-card>
    `;
  }

  private _groupId(key: SensorGroupKey | string): string | undefined {
    return this._config![key as keyof UlmCustomDrealineRoomviewCardConfig] as
      | string
      | undefined;
  }

  private _sensorGroupIds(): string[] {
    return SENSOR_GROUPS.map((k) => this._groupId(k)).filter(Boolean) as string[];
  }

  private _unavailableCount(): number {
    if (!this.hass) return 0;
    let count = 0;
    for (const gid of this._sensorGroupIds()) {
      const members = expandGroupEntityIds(this.hass, gid);
      if (members.length) {
        for (const id of members) {
          if (this.hass.states[id]?.state === "unavailable") count += 1;
        }
      } else if (this.hass.states[gid]?.state === "unavailable") {
        count += 1;
      }
    }
    return count;
  }

  private _lowBatteryCount(): number {
    if (!this.hass) return 0;
    let count = 0;
    for (const gid of this._sensorGroupIds()) {
      for (const id of expandGroupEntityIds(this.hass, gid)) {
        const bat = this.hass.states[id]?.attributes.battery;
        if (typeof bat === "number" && bat <= 20) count += 1;
      }
    }
    return count;
  }

  private _shouldShowSensorsRow(): boolean {
    if (!this.hass) return false;
    if (this._lowBatteryCount() >= 1) return true;
    for (const gid of this._sensorGroupIds()) {
      if (this.hass.states[gid]?.state === "on") return true;
    }
    return false;
  }

  private _countOnMembers(groupId?: string): number {
    if (!groupId || !this.hass) return 0;
    let count = 0;
    for (const id of expandGroupEntityIds(this.hass, groupId)) {
      const st = this.hass.states[id]?.state;
      if (st === "on" || st === "open") count += 1;
    }
    /* Single entity (no group members): count itself when active */
    if (
      count === 0 &&
      expandGroupEntityIds(this.hass, groupId).length === 0 &&
      this._groupIsOn(groupId)
    ) {
      return 1;
    }
    return count;
  }

  private _tempLine(): string {
    const id = this._config!.temperature;
    if (!id || !this.hass?.states[id]) return "N/A";
    const t = this.hass.states[id];
    const unit = (t.attributes.unit_of_measurement as string) || "";
    return `${t.state}${unit}`;
  }

  private _humidityLine(): string {
    const id = this._config!.humidity;
    if (!id || !this.hass?.states[id]) return "N/A";
    const h = this.hass.states[id];
    const unit = (h.attributes.unit_of_measurement as string) || "";
    return `${h.state}${unit}`;
  }

  private _sensorRow() {
    const cfg = this._config!;
    const lowBat = this._lowBatteryCount();
    const items: ReturnType<typeof html>[] = [];

    if (cfg.group_doors && this._groupIsOn(cfg.group_doors)) {
      items.push(
        this._sensorIcon(
          "mdi:door-open",
          this._countOnMembers(cfg.group_doors),
          true,
        ),
      );
    }
    if (lowBat >= 1) {
      items.push(
        html`<div class="sensor-icon">
          <ha-icon icon="mdi:battery-20"></ha-icon>
          <span class="count-badge">${lowBat}</span>
        </div>`,
      );
    }
    if (cfg.group_windows && this._groupIsOn(cfg.group_windows)) {
      items.push(
        this._sensorIcon(
          "mdi:window-closed-variant",
          this._countOnMembers(cfg.group_windows),
          true,
        ),
      );
    }
    if (cfg.group_motions && this._groupIsOn(cfg.group_motions)) {
      items.push(this._sensorIcon("mdi:motion-sensor", 0, false));
    }
    if (cfg.group_water && this._groupIsOn(cfg.group_water)) {
      items.push(this._sensorIcon("mdi:water", 0, false));
    }

    return items;
  }

  private _groupIsOn(groupId: string): boolean {
    const st = this.hass?.states[groupId]?.state;
    if (!st) return false;
    /* lights/switches: on; covers/shutters: open */
    return st === "on" || st === "open";
  }

  private _sensorIcon(icon: string, count: number, showCount: boolean) {
    return html`
      <div class="sensor-icon">
        <ha-icon .icon=${icon}></ha-icon>
        ${showCount && count > 0
          ? html`<span class="count-badge">${count}</span>`
          : nothing}
      </div>
    `;
  }

  private _deviceRow() {
    const cfg = this._config!;
    const devices: {
      id?: string;
      icon: string;
      show: boolean;
    }[] = [
      {
        id: cfg.group_lights,
        icon: this._lightsIcon(cfg.group_lights),
        show: !!cfg.group_lights,
      },
      {
        id: cfg.group_windows_shutters,
        icon: this._shuttersIcon(cfg.group_windows_shutters),
        show: !!cfg.group_windows_shutters,
      },
      {
        id: cfg.group_outlets,
        icon: this._outletsIcon(cfg.group_outlets),
        show: !!cfg.group_outlets,
      },
      {
        id: cfg.group_tv,
        icon: this._tvIcon(cfg.group_tv),
        show: !!cfg.group_tv,
      },
    ];

    return devices
      .filter((d) => d.show && d.id)
      .map((d) => this._deviceButton(d.id!, d.icon));
  }

  private _deviceButton(groupId: string, icon: string) {
    const on = this._groupIsOn(groupId);
    const count = on ? this._countOnMembers(groupId) : 0;
    /* YAML on-state: img_cell yellow 0.2 (visible pill). Do NOT use
       color-background-yellow alone — in light theme it is ~250,250,250
       and the rounded contour disappears. */
    const y = resolveThemeRgb(this, "yellow");
    const style = on
      ? {
          color: `rgba(${y}, 1)`,
          backgroundColor: `rgba(${y}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    return html`
      <button
        class=${classMap({ "device-btn": true, on })}
        style=${styleMap(style)}
        type="button"
        @click=${() => this._toggleGroup(groupId)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        ${count > 0
          ? html`<span class="device-badge">${count}</span>`
          : nothing}
      </button>
    `;
  }

  private _toggleGroup(groupId: string) {
    if (!this.hass) return;
    this.hass.callService("homeassistant", "toggle", {
      entity_id: groupId,
    });
  }

  private _lightsIcon(groupId?: string): string {
    if (!groupId || !this.hass) return "mdi:lightbulb-group-off";
    const st = this.hass.states[groupId];
    if (!st) return "mdi:lightbulb-group-off";
    const members = expandGroupEntityIds(this.hass, groupId);
    if (members.length) {
      let unavail = 0;
      for (const id of members) {
        if (this.hass.states[id]?.state === "unavailable") unavail += 1;
      }
      if (unavail === members.length) return "mdi:lightbulb-alert";
    } else if (!members.length && st.attributes.entity_id === undefined) {
      return "mdi:exclamation";
    }
    if (st.state === "on") return "mdi:lightbulb-group";
    if (st.state === "off") return "mdi:lightbulb-group-off";
    return "mdi:lightbulb-group-off";
  }

  private _shuttersIcon(groupId?: string): string {
    if (!groupId || !this.hass) return "mdi:window-shutter";
    const st = this.hass.states[groupId];
    if (!st) return "mdi:window-shutter";
    const members = expandGroupEntityIds(this.hass, groupId);
    if (members.length) {
      let unavail = 0;
      for (const id of members) {
        if (this.hass.states[id]?.state === "unavailable") unavail += 1;
      }
      if (unavail === members.length) return "mdi:window-shutter-alert";
    } else if (!members.length && st.attributes.entity_id === undefined) {
      return "mdi:exclamation";
    }
    if (st.state === "on" || st.state === "open") return "mdi:window-shutter-open";
    if (st.state === "off" || st.state === "closed") return "mdi:window-shutter";
    return "mdi:window-shutter";
  }

  private _outletsIcon(groupId?: string): string {
    if (!groupId || !this.hass) return "mdi:power-plug-off";
    const st = this.hass.states[groupId];
    if (!st) return "mdi:power-plug-off";
    const members = expandGroupEntityIds(this.hass, groupId);
    if (members.length) {
      let unavail = 0;
      for (const id of members) {
        if (this.hass.states[id]?.state === "unavailable") unavail += 1;
      }
      if (unavail === members.length) return "mdi:exclamation-thick";
    }
    if (st.state === "on") return "mdi:power-plug";
    if (st.state === "off") return "mdi:power-plug-off";
    return "mdi:exclamation";
  }

  private _tvIcon(groupId?: string): string {
    if (!groupId || !this.hass) return "mdi:television-off";
    const st = this.hass.states[groupId];
    if (!st) return "mdi:television-off";
    const members = expandGroupEntityIds(this.hass, groupId);
    if (members.length) {
      let unavail = 0;
      for (const id of members) {
        if (this.hass.states[id]?.state === "unavailable") unavail += 1;
      }
      if (unavail === members.length) return "mdi:exclamation-thick";
    }
    if (st.state === "on") return "mdi:television";
    if (st.state === "off") return "mdi:television-off";
    return "mdi:exclamation";
  }

  private _headerTap = () => {
    const cfg = this._config!;
    const action = cfg.tap_action || "more-info";
    if (action === "none") return;
    if (action === "navigate" && cfg.navigation_path) {
      const path = cfg.navigation_path.startsWith("/")
        ? cfg.navigation_path
        : `/${cfg.navigation_path}`;
      history.pushState(null, "", path);
      window.dispatchEvent(new Event("location-changed"));
      return;
    }
    const entityId =
      cfg.entity ||
      cfg.group_lights ||
      cfg.temperature ||
      cfg.group_motions;
    if (entityId) {
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        }),
      );
    }
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    .root {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .header {
      border: 0;
      padding: 0;
      margin: 0;
      background: transparent;
      cursor: pointer;
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-areas: "icon text";
      align-items: center;
      border-radius: 21px 8px 8px 21px;
      text-align: left;
      font: inherit;
      color: inherit;
      width: 100%;
      position: relative;
    }

    .header-icon-wrap {
      grid-area: icon;
      position: relative;
    }

    .header-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      place-items: center;
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .header-icon ha-icon {
      --mdc-icon-size: 20px;
      transform: scale(1.2);
    }

    .warn-badge {
      position: absolute;
      left: 28px;
      top: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      background: rgba(var(--color-red, 245, 68, 54), 1);
      display: grid;
      place-items: center;
    }

    .warn-badge ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }

    .header-text {
      grid-area: text;
      min-width: 0;
    }

    .header-line {
      font-weight: bold;
      font-size: 12px;
      filter: opacity(50%);
      margin-left: 10px;
      display: flex;
      align-items: center;
      gap: 2px;
      line-height: 1.3;
    }

    .header-line:first-child {
      margin-top: 2px;
    }

    .mini-icon {
      --mdc-icon-size: 17px;
      width: 17px;
      height: 17px;
      color: grey;
      flex-shrink: 0;
    }

    .sensors {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      gap: 0;
    }

    .sensor-icon {
      position: relative;
      width: 35px;
      display: grid;
      place-items: center;
    }

    .sensor-icon ha-icon {
      --mdc-icon-size: 20px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .count-badge {
      position: absolute;
      left: 58%;
      top: 5%;
      min-width: 13px;
      height: 13px;
      padding: 0 2px;
      border-radius: 50%;
      font-weight: 900;
      font-size: 10px;
      line-height: 13px;
      text-align: center;
      color: white;
      background: rgba(var(--color-blue, 61, 90, 254), 0.75);
    }

    .devices {
      display: flex;
      flex-wrap: wrap;
      gap: 2%;
      justify-content: flex-start;
      align-items: stretch;
    }

    .device-btn {
      position: relative;
      appearance: none;
      -webkit-appearance: none;
      border: 0;
      outline: none;
      box-shadow: none;
      flex: 1 1 0;
      min-width: 40px;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
      margin: 0;
      overflow: visible;
      box-sizing: border-box;
    }

    .device-btn ha-icon {
      --mdc-icon-size: 20px;
      width: 24px;
      height: 40px;
      color: inherit;
      display: grid;
      place-items: center;
    }

    .device-btn.on ha-icon {
      color: inherit;
    }

    .device-badge {
      position: absolute;
      left: 50.5%;
      top: 24%;
      min-width: 13px;
      height: 13px;
      padding: 0 2px;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 900;
      line-height: 13px;
      text-align: center;
      background: rgba(var(--color-blue, 61, 90, 254), 0.75);
      color: white;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-drealine-roomview-card": UlmCustomDrealineRoomviewCard;
  }
}
