/**
 * Lit port of custom_cards/custom_card_esh_room/custom_card_esh_room.yaml
 * Rectangular room card with optional light / climate / cover widgets.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  iconField,
  labels,
  selectField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import { openUlmPopup } from "../../../popups/ulm-popup";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

export interface UlmEshRoomTapAction {
  action?: string;
  navigation_path?: string;
  entity?: string;
}

export interface UlmCustomEshRoomCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-esh-room-card";
  entity?: string;
  name?: string;
  icon?: string;
  /** Static label override (replaces brightness/state). Supports emoji text. */
  label?: string;
  /** Optional sensors for the docs temp+humidity label pattern */
  temperature_entity?: string;
  humidity_entity?: string;
  light_entity?: string;
  climate_entity?: string;
  cover_entity?: string;
  light_icon_on?: string;
  light_icon_off?: string;
  cover_icon_open?: string;
  cover_icon_closed?: string;
  cover_icon_closing?: string;
  cover_icon_opening?: string;
  enable_light_popup?: boolean;
  enable_thermostat_popup?: boolean;
  enable_cover_popup?: boolean;
  dynamic_color?: boolean;
  /** more-info | navigate | none | toggle — default more-info */
  tap_action?: string | UlmEshRoomTapAction;
  navigation_path?: string;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asBool(raw: unknown, fallback = false): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

const CLIMATE_STYLES: Record<
  string,
  { icon: string; color: UlmThemeColor }
> = {
  auto: { icon: "mdi:autorenew", color: "green" },
  cool: { icon: "mdi:snowflake", color: "blue" },
  heat: { icon: "mdi:fire", color: "red" },
  dry: { icon: "mdi:water", color: "yellow" },
  heat_cool: { icon: "mdi:sun-snowflake", color: "purple" },
  fan_only: { icon: "mdi:fan", color: "green" },
  off: { icon: "mdi:snowflake-off", color: "grey" },
};

@customElement("ulm-custom-card-esh-room-card")
export class UlmCustomEshRoomCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomEshRoomCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", undefined, false),
        textField("name"),
        iconField("icon"),
        textField("label"),
        entityField("temperature_entity", "sensor", false),
        entityField("humidity_entity", "sensor", false),
        entityField("light_entity", "light", false),
        entityField("climate_entity", "climate", false),
        entityField("cover_entity", "cover", false),
        iconField("light_icon_on"),
        iconField("light_icon_off"),
        iconField("cover_icon_open"),
        iconField("cover_icon_closed"),
        iconField("cover_icon_opening"),
        iconField("cover_icon_closing"),
        booleanField("dynamic_color"),
        booleanField("enable_light_popup"),
        booleanField("enable_thermostat_popup"),
        booleanField("enable_cover_popup"),
        selectField("tap_action", [
          { value: "more-info", label: "more-info" },
          { value: "navigate", label: "navigate" },
          { value: "toggle", label: "toggle" },
          { value: "none", label: "none" },
        ]),
        textField("navigation_path"),
      ],
      computeLabel: labels({
        entity: "Room entity (icon / fallback label)",
        name: "Room name",
        icon: "Room icon",
        label: "Override label (static text / emoji)",
        temperature_entity: "Temperature sensor (label helper)",
        humidity_entity: "Humidity sensor (label helper)",
        light_entity: "Light (ulm_custom_card_esh_room_light_entity)",
        climate_entity: "Climate (ulm_custom_card_esh_room_climate_entity)",
        cover_entity: "Cover (ulm_custom_card_esh_room_cover_entity)",
        light_icon_on: "Light ON icon (ulm_card_esh_room_light_icon_on)",
        light_icon_off: "Light OFF icon (ulm_card_esh_room_light_icon_off)",
        cover_icon_open: "Cover open icon",
        cover_icon_closed: "Cover closed icon",
        cover_icon_opening: "Cover opening icon",
        cover_icon_closing: "Cover closing icon",
        dynamic_color: "Dynamic color (ulm_card_dynamic_color)",
        enable_light_popup: "Light popup (ulm_card_light_enable_popup)",
        enable_thermostat_popup:
          "Thermostat popup (ulm_card_thermostat_enable_popup)",
        enable_cover_popup: "Cover popup (ulm_card_cover_popup)",
        tap_action: "Card tap_action",
        navigation_path: "navigation_path (when tap_action = navigate)",
      }),
      computeHelper: helpers({
        label:
          "Static override. Or set temperature_entity/humidity_entity for the docs 🌡️/💧 pattern. JS templates from button-card are not evaluated.",
        light_entity:
          "Light widget (top-right) + default brightness label when light is on.",
        climate_entity:
          "Climate widget. With light: grid is light+climate (unless cover is also set — cover wins).",
        cover_entity:
          "Cover widget. With light: grid 'i light / n cover / l cover'. Without light: cover top-right.",
        dynamic_color: "Requires light_entity; uses rgb_color when on.",
        navigation_path: "Example: bathroom or /lovelace/bathroom",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomEshRoomCardConfig> {
    return {
      entity: "light.bed_light",
      name: "Bathroom",
      icon: "mdi:bathtub",
      light_entity: "light.bed_light",
      climate_entity: "climate.hvac",
      cover_entity: undefined,
      dynamic_color: false,
      tap_action: "more-info",
      enable_light_popup: false,
    };
  }

  public setConfig(config: UlmCustomEshRoomCardConfig): void {
    const c = config as UlmCustomEshRoomCardConfig & Record<string, unknown>;
    const tapRaw = c.tap_action;
    let tap_action = "more-info";
    let navigation_path =
      (pick(c, "navigation_path") as string | undefined) || undefined;
    if (typeof tapRaw === "string") {
      tap_action = tapRaw;
    } else if (tapRaw && typeof tapRaw === "object") {
      const t = tapRaw as UlmEshRoomTapAction;
      tap_action = t.action || "more-info";
      navigation_path = t.navigation_path || navigation_path;
    }

    this._config = {
      ...config,
      entity: (pick(c, "entity") as string) || undefined,
      name: (pick(c, "name") as string) || undefined,
      icon: (pick(c, "icon") as string) || undefined,
      label: (pick(c, "label") as string) || undefined,
      temperature_entity:
        (pick(c, "temperature_entity") as string) || undefined,
      humidity_entity: (pick(c, "humidity_entity") as string) || undefined,
      light_entity:
        (pick(
          c,
          "light_entity",
          "ulm_custom_card_esh_room_light_entity",
        ) as string) || undefined,
      climate_entity:
        (pick(
          c,
          "climate_entity",
          "ulm_custom_card_esh_room_climate_entity",
        ) as string) || undefined,
      cover_entity:
        (pick(
          c,
          "cover_entity",
          "ulm_custom_card_esh_room_cover_entity",
        ) as string) || undefined,
      light_icon_on: String(
        pick(c, "light_icon_on", "ulm_card_esh_room_light_icon_on") ||
          "mdi:lightbulb",
      ),
      light_icon_off: String(
        pick(c, "light_icon_off", "ulm_card_esh_room_light_icon_off") ||
          "mdi:lightbulb-off",
      ),
      cover_icon_open: String(
        pick(c, "cover_icon_open", "ulm_card_esh_room_cover_icon_open") ||
          "mdi:blinds-open",
      ),
      cover_icon_closed: String(
        pick(c, "cover_icon_closed", "ulm_card_esh_room_cover_icon_closed") ||
          "mdi:roller-shade-closed",
      ),
      cover_icon_closing: String(
        pick(c, "cover_icon_closing", "ulm_card_esh_room_cover_icon_closing") ||
          "mdi:blinds",
      ),
      cover_icon_opening: String(
        pick(c, "cover_icon_opening", "ulm_card_esh_room_cover_icon_opening") ||
          "mdi:blinds",
      ),
      enable_light_popup: asBool(
        pick(c, "enable_light_popup", "ulm_card_light_enable_popup"),
        false,
      ),
      enable_thermostat_popup: asBool(
        pick(c, "enable_thermostat_popup", "ulm_card_thermostat_enable_popup"),
        false,
      ),
      enable_cover_popup: asBool(
        pick(c, "enable_cover_popup", "ulm_card_cover_popup"),
        false,
      ),
      dynamic_color: asBool(
        pick(c, "dynamic_color", "ulm_card_dynamic_color"),
        false,
      ),
      tap_action,
      navigation_path,
      type: "custom:ulm-custom-card-esh-room-card",
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
    const lightId = cfg.light_entity;
    const climateId = cfg.climate_entity;
    const coverId = cfg.cover_entity;
    // Prefer cover over climate when both set with light (matches YAML priority)
    const rightSecondary = lightId
      ? coverId
        ? "cover"
        : climateId
          ? "climate"
          : null
      : coverId
        ? "cover"
        : climateId
          ? "climate"
          : null;

    const lightObj = lightId ? this.hass.states[lightId] : undefined;
    const mainObj = cfg.entity ? this.hass.states[cfg.entity] : undefined;
    const labelObj = lightObj || mainObj;

    const lightOn = lightObj?.state === "on";
    const rgb = this._lightRgb(lightObj);
    const dynamic = !!cfg.dynamic_color && lightOn && !!rgb;

    const cardStyle = this._cardStyle(lightOn, dynamic, rgb);
    const iconCell = this._roomIconCellStyle(lightOn, dynamic, rgb);
    const iconFg = this._roomIconFgStyle(lightOn, dynamic);
    const nameStyle = this._nameStyle(lightOn, dynamic, rgb);

    const name =
      cfg.name ||
      mainObj?.attributes.friendly_name ||
      lightObj?.attributes.friendly_name ||
      cfg.entity ||
      "Room";
    const icon =
      cfg.icon ||
      (mainObj?.attributes.icon as string | undefined) ||
      (lightObj?.attributes.icon as string | undefined) ||
      "mdi:floor-plan";
    const label = this._resolveLabel(labelObj);

    const layoutClass = classMap({
      layout: true,
      "has-light": !!lightId,
      "has-climate": rightSecondary === "climate",
      "has-cover": rightSecondary === "cover",
      "light-only": !!lightId && !rightSecondary,
      "secondary-only": !lightId && !!rightSecondary,
    });

    return html`
      <ha-card
        class="ulm-card ulm-esh-room"
        style=${styleMap(cardStyle)}
        @click=${this._cardTap}
      >
        <div class=${layoutClass}>
          <div class="room-icon" style=${styleMap(iconCell)}>
            <ha-icon style=${styleMap(iconFg)} .icon=${icon}></ha-icon>
          </div>
          <div class="name" style=${styleMap(nameStyle)}>${name}</div>
          <div class="label">${label}</div>
          ${lightId
            ? this._lightWidget(lightId, lightObj)
            : nothing}
          ${rightSecondary === "climate" && climateId
            ? this._climateWidget(climateId)
            : nothing}
          ${rightSecondary === "cover" && coverId
            ? this._coverWidget(coverId)
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _lightRgb(stateObj?: HassEntity): [number, number, number] | null {
    const raw = stateObj?.attributes.rgb_color;
    if (Array.isArray(raw) && raw.length >= 3) {
      return [Number(raw[0]), Number(raw[1]), Number(raw[2])];
    }
    return null;
  }

  private _cardStyle(
    lightOn: boolean,
    dynamic: boolean,
    rgb: [number, number, number] | null,
  ): Record<string, string> {
    if (!this._config?.light_entity || !lightOn) return {};
    if (dynamic && rgb) {
      return { backgroundColor: `rgba(${rgb.join(", ")}, 0.2)` };
    }
    // YAML: rgba(var(--color-background-yellow), 0.2)
    // Theme light-mode token is near-white (250,250,250), not accent yellow.
    return {
      backgroundColor:
        "rgba(var(--color-background-yellow, 250, 250, 250), 0.2)",
    };
  }

  /** img_cell styles from YAML (circle background + inherited icon color). */
  private _roomIconCellStyle(
    lightOn: boolean,
    dynamic: boolean,
    rgb: [number, number, number] | null,
  ): Record<string, string> {
    if (!this._config?.light_entity || !lightOn) {
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
    }
    if (dynamic && rgb) {
      return {
        color: `rgba(${rgb.join(", ")}, 1)`,
        backgroundColor: `rgba(${rgb.join(", ")}, 0.3)`,
      };
    }
    const y = resolveThemeRgb(this, "yellow");
    return {
      color: `rgba(${y}, 1)`,
      backgroundColor: `rgba(${y}, 0.2)`,
    };
  }

  /** styles.icon filter — only on the glyph, not the circle bg (YAML). */
  private _roomIconFgStyle(
    lightOn: boolean,
    dynamic: boolean,
  ): Record<string, string> {
    if (this._config?.light_entity && lightOn && dynamic) {
      return { filter: "contrast(0.6) saturate(1.7)" };
    }
    return {};
  }

  private _nameStyle(
    lightOn: boolean,
    dynamic: boolean,
    rgb: [number, number, number] | null,
  ): Record<string, string> {
    if (!this._config?.light_entity) {
      return { color: "rgba(var(--color-theme, 51, 51, 51), 0.6)" };
    }
    if (!lightOn) {
      return { color: "rgba(var(--color-theme, 51, 51, 51), 0.6)" };
    }
    if (dynamic && rgb) {
      return {
        color: `rgba(${rgb.join(", ")}, 1)`,
        filter: "contrast(0.6) saturate(1.7)",
      };
    }
    // Theme: light-mode yellow-text → primary-text-color; dark → yellow RGB.
    // Do not wrap in rgba() — token may already be a full color value.
    return {
      color: "var(--color-yellow-text, var(--primary-text-color))",
    };
  }

  private _resolveLabel(stateObj?: HassEntity): string {
    const cfg = this._config!;
    if (cfg.label) return cfg.label;

    // Docs customization: temperature + humidity sensors
    const tempId = cfg.temperature_entity;
    const humId = cfg.humidity_entity;
    if (tempId || humId) {
      const parts: string[] = [];
      if (tempId && this.hass!.states[tempId]) {
        const t = this.hass!.states[tempId];
        const unit = t.attributes.unit_of_measurement || "°C";
        parts.push(`🌡️ ${t.state} ${unit}`);
      }
      if (humId && this.hass!.states[humId]) {
        const h = this.hass!.states[humId];
        const unit = h.attributes.unit_of_measurement || "%";
        parts.push(`💧 ${h.state} ${unit}`);
      }
      if (parts.length) return parts.join(" ");
    }

    // Original YAML default: brightness % from light (or entity) when on
    if (!stateObj) return "\u00a0";
    if (stateObj.state === "on") {
      const bri = Number(stateObj.attributes.brightness);
      if (Number.isFinite(bri)) {
        const pct = Math.round(bri / 2.55);
        if (pct) return `${pct}%`;
      }
    }
    return this.hass?.formatEntityState?.(stateObj) || stateObj.state;
  }

  private _lightWidget(entityId: string, stateObj?: HassEntity) {
    const on = stateObj?.state === "on";
    const rgb = this._lightRgb(stateObj);
    const dynamic = !!this._config!.dynamic_color && on && !!rgb;
    const icon = on
      ? this._config!.light_icon_on || "mdi:lightbulb"
      : this._config!.light_icon_off || "mdi:lightbulb-off";
    let style: Record<string, string> = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
    if (on) {
      // YAML keeps icon yellow even with dynamic_color; only img_cell uses rgb.
      const y = resolveThemeRgb(this, "yellow");
      style = {
        color: `rgba(${y}, 1)`,
        backgroundColor:
          dynamic && rgb
            ? `rgba(${rgb.join(", ")}, 0.3)`
            : `rgba(${y}, 0.2)`,
      };
    }
    return html`
      <button
        class="widget light"
        style=${styleMap(style)}
        title="Light"
        @click=${(ev: Event) => this._widgetTap(ev, "light", entityId)}
        @contextmenu=${(ev: Event) => this._widgetHold(ev, "light", entityId)}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _climateWidget(entityId: string) {
    const stateObj = this.hass!.states[entityId];
    const mode = stateObj?.state || "off";
    const preset = CLIMATE_STYLES[mode] || CLIMATE_STYLES.off;
    const active = mode !== "off" && mode !== "unavailable";
    const rgb = resolveThemeRgb(this, preset.color);
    const style = active
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    return html`
      <button
        class="widget climate"
        style=${styleMap(style)}
        title="Climate"
        @click=${(ev: Event) => this._widgetTap(ev, "climate", entityId)}
        @contextmenu=${(ev: Event) =>
          this._widgetHold(ev, "climate", entityId)}
      >
        <ha-icon .icon=${preset.icon}></ha-icon>
      </button>
    `;
  }

  private _coverWidget(entityId: string) {
    const stateObj = this.hass!.states[entityId];
    const st = stateObj?.state || "closed";
    let icon = this._config!.cover_icon_closed || "mdi:roller-shade-closed";
    if (st === "open") icon = this._config!.cover_icon_open || "mdi:blinds-open";
    else if (st === "closing")
      icon = this._config!.cover_icon_closing || "mdi:blinds";
    else if (st === "opening")
      icon = this._config!.cover_icon_opening || "mdi:blinds";

    const closed = st === "closed";
    const rgb = resolveThemeRgb(this, "blue");
    const style = closed
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    return html`
      <button
        class="widget cover"
        style=${styleMap(style)}
        title="Cover"
        @click=${(ev: Event) => this._widgetTap(ev, "cover", entityId)}
        @contextmenu=${(ev: Event) => this._widgetHold(ev, "cover", entityId)}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _cardTap = () => {
    const cfg = this._config!;
    const action =
      typeof cfg.tap_action === "string"
        ? cfg.tap_action
        : cfg.tap_action?.action || "more-info";
    const path =
      cfg.navigation_path ||
      (typeof cfg.tap_action === "object"
        ? cfg.tap_action?.navigation_path
        : undefined);
    const entityId = cfg.entity || cfg.light_entity;

    if (action === "none") return;
    if (action === "navigate" && path) {
      this._navigate(path);
      return;
    }
    if (action === "toggle" && entityId && this.hass) {
      this.hass.callService("homeassistant", "toggle", {
        entity_id: entityId,
      });
      return;
    }
    if (entityId) this._moreInfo(entityId);
  };

  private _navigate(path: string) {
    const url = path.startsWith("/") ? path : `/${path}`;
    history.pushState(null, "", url);
    window.dispatchEvent(new Event("location-changed"));
  }

  private _moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  private _widgetTap(ev: Event, kind: "light" | "climate" | "cover", entityId: string) {
    ev.stopPropagation();
    if (!this.hass) return;
    if (kind === "light") {
      this.hass.callService("light", "toggle", { entity_id: entityId });
      return;
    }
    if (kind === "cover") {
      this.hass.callService("cover", "toggle", { entity_id: entityId });
      return;
    }
    // climate: homeassistant.toggle works across HVAC modes
    this.hass.callService("homeassistant", "toggle", { entity_id: entityId });
  }

  private _widgetHold(ev: Event, kind: "light" | "climate" | "cover", entityId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    const cfg = this._config!;
    if (kind === "light" && cfg.enable_light_popup) {
      openUlmPopup(this, "light", entityId);
      return;
    }
    if (kind === "climate" && cfg.enable_thermostat_popup) {
      openUlmPopup(this, "thermostat", entityId);
      return;
    }
    if (kind === "cover" && cfg.enable_cover_popup) {
      openUlmPopup(this, "cover", entityId);
      return;
    }
    this._moreInfo(entityId);
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      direction: ltr;
    }

    ha-card.ulm-card.ulm-esh-room {
      padding: 12px;
      border-radius: 20px;
      height: auto;
      cursor: pointer;
      direction: ltr;
      box-sizing: border-box;
      overflow: hidden;
      transition: background-color 0.2s ease;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* YAML: grid-template-rows: min-content (repeats) */
      grid-template-rows: min-content min-content min-content;
      width: 100%;
      min-width: 0;
      direction: ltr;
    }

    /* Default: icon | empty ; name spanning ; label spanning */
    .layout {
      grid-template-areas:
        "icon ."
        "name name"
        "label label";
    }

    .layout.has-light.light-only {
      grid-template-areas:
        "icon light"
        "name name"
        "label label";
    }

    .layout.has-light.has-climate {
      grid-template-areas:
        "icon light"
        "name climate"
        "label climate";
    }

    .layout.has-light.has-cover {
      grid-template-areas:
        "icon light"
        "name cover"
        "label cover";
    }

    .layout.secondary-only.has-climate {
      grid-template-areas:
        "icon ."
        "name climate"
        "label climate";
    }

    .layout.secondary-only.has-cover {
      grid-template-areas:
        "icon cover"
        "name name"
        "label label";
    }

    .room-icon {
      grid-area: icon;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin-left: 12px;
      justify-self: start;
      overflow: hidden;
      box-sizing: border-box;
    }

    .room-icon ha-icon {
      --mdc-icon-size: 20px;
    }

    .name {
      grid-area: name;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin-left: 12px;
      margin-top: 12px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .layout.has-climate .name,
    .layout.has-cover .name {
      margin-top: 8px;
      max-width: 85%;
    }

    .layout.has-light.light-only .name {
      margin-top: 12px;
      max-width: 100%;
    }

    .label {
      grid-area: label;
      justify-self: start;
      align-self: start;
      font-weight: bolder;
      font-size: 12px;
      /* YAML: filter: opacity(40%) */
      filter: opacity(40%);
      margin-left: 12px;
      margin-bottom: 3px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }

    .layout.has-climate .label,
    .layout.has-cover .label {
      margin-bottom: 0;
      max-width: 85%;
    }

    /* widget_icon.yaml — fixed 42× full-column pill, place-self center */
    .widget {
      border: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      max-width: 100%;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      place-self: center;
      cursor: pointer;
      box-shadow: none;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      box-sizing: border-box;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }

    .widget.light {
      grid-area: light;
    }

    .widget.climate {
      grid-area: climate;
      margin-top: 5px;
    }

    .widget.cover {
      grid-area: cover;
      margin-top: 5px;
    }
  `;
}
