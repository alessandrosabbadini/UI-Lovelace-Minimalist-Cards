/**
 * Faithful Lit ports of official chip_*.yaml templates (emoji-label or mdi).
 */
import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  iconField,
  textField,
  type HaFormSchema,
} from "../../shared/config-form";
import {
  syncChipDarkMode,
  ulmChipStyles,
} from "../../shared/chip-styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

interface ChipDef {
  tag: string;
  type: string;
  name: string;
  description: string;
  fields: HaFormSchema[];
  stub: Record<string, unknown>;
  /** Normalize legacy ulm_chip_* keys onto short Lit keys */
  normalize?: (cfg: Record<string, unknown>) => Record<string, unknown>;
  /** When set, render ha-icon (mdi chips). Return undefined to skip. */
  renderIcon?: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
  ) => { icon: string; color?: string } | undefined;
  renderLabel: (hass: HomeAssistant, config: Record<string, unknown>) => string;
  onTap?: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
    host: HTMLElement,
  ) => void;
  /** chip_icon_label / chip_alarm denser layout */
  variant?: "default" | "icon-label";
}

const WEATHER_EMOJI: Record<string, string> = {
  "clear-night": "🌙",
  cloudy: "☁️",
  exceptional: "🌞",
  fog: "🌫️",
  hail: "⛈️",
  lightning: "⚡",
  "lightning-rainy": "⛈️",
  partlycloudy: "⛅",
  pouring: "🌧️",
  rainy: "💧",
  snowy: "❄️",
  "snowy-rainy": "🌨️",
  sunny: "☀️",
  windy: "🌪️",
};

const ALARM_ICON: Record<string, string> = {
  default: "mdi:shield-outline",
  armed_home: "mdi:shield-home",
  armed_away: "mdi:shield-lock",
  armed_night: "mdi:shield-moon",
  disarmed: "mdi:shield-off",
  arming: "mdi:shield",
  triggered: "mdi:shield-alert",
};

const ALARM_COLOR: Record<string, string> = {
  default: "var(--google-yellow)",
  armed_home: "var(--google-red)",
  armed_away: "var(--google-red)",
  armed_night: "var(--google-red)",
  disarmed: "var(--google-green)",
  arming: "var(--google-yellow)",
  triggered: "var(--google-red)",
};

function stateOf(hass: HomeAssistant, entity?: unknown) {
  if (!entity || typeof entity !== "string") return undefined;
  return hass.states[entity];
}

function localize(hass: HomeAssistant, s?: HassEntity): string {
  if (!s) return "";
  if (hass.formatEntityState) return hass.formatEntityState(s);
  const unit = s.attributes.unit_of_measurement;
  return unit ? `${s.state} ${unit}` : s.state;
}

function moreInfo(host: HTMLElement, entityId: string) {
  host.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }),
  );
}

function navigate(path: string) {
  if (!path) return;
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("location-changed"));
}

function pick(
  cfg: Record<string, unknown>,
  ...keys: string[]
): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function convertTemperature(temp: unknown): string {
  if (temp === undefined || temp === null || temp === "") return "?";
  const n = Number(temp);
  if (!Number.isNaN(n) && !Number.isInteger(n)) return n.toFixed(1);
  return String(temp);
}

function localeOf(hass: HomeAssistant, cfg: Record<string, unknown>): string {
  return String(pick(cfg, "ulm_language", "language") || hass.language || undefined);
}

const CHIP_DEFS: ChipDef[] = [
  {
    tag: "ulm-chip-back-card",
    type: "custom:ulm-chip-back-card",
    name: "ULM Chip Back",
    description: "Back navigation chip (mdi arrow)",
    fields: [iconField("icon"), textField("navigation_path")],
    stub: { icon: "mdi:arrow-left" },
    normalize: (c) => ({
      ...c,
      icon: pick(c, "icon", "ulm_chip_back_icon") || "mdi:arrow-left",
      navigation_path: pick(c, "navigation_path", "ulm_chip_back_path"),
    }),
    renderLabel: () => "",
    renderIcon: (_h, c) => ({
      icon: String(c.icon || "mdi:arrow-left"),
    }),
    onTap: (_h, c) => {
      const path = String(c.navigation_path || "");
      if (path) navigate(path);
      else history.back();
    },
  },
  {
    tag: "ulm-chip-navigate-card",
    type: "custom:ulm-chip-navigate-card",
    name: "ULM Chip Navigate",
    description: "Navigate chip with optional label",
    fields: [
      iconField("icon"),
      textField("navigation_path"),
      textField("label"),
      textField("icon_color"),
      textField("label_color"),
    ],
    stub: {
      icon: "mdi:page-next",
      navigation_path: "/lovelace/home",
      label: "",
    },
    normalize: (c) => ({
      ...c,
      icon: pick(c, "icon", "ulm_chip_navigate_icon") || "mdi:page-next",
      navigation_path: pick(c, "navigation_path", "ulm_chip_navigate_path"),
      label: pick(c, "label", "ulm_chip_navigate_label") || "",
      icon_color: pick(c, "icon_color", "ulm_chip_navigate_icon_color"),
      label_color: pick(c, "label_color", "ulm_chip_navigate_label_color"),
    }),
    renderLabel: (_h, c) => String(c.label || ""),
    renderIcon: (_h, c) => ({
      icon: String(c.icon || "mdi:page-next"),
      color: c.icon_color ? String(c.icon_color) : undefined,
    }),
    onTap: (_h, c) => navigate(String(c.navigation_path || "")),
  },
  {
    tag: "ulm-chip-icon-only-card",
    type: "custom:ulm-chip-icon-only-card",
    name: "ULM Chip Icon Only",
    description: "Emoji / text chip (no MDI)",
    fields: [textField("icon")],
    stub: { icon: "💡" },
    normalize: (c) => ({
      ...c,
      icon: pick(c, "icon", "ulm_chip_icon_only") || "❔",
    }),
    renderLabel: (_h, c) => String(c.icon || "❔"),
  },
  {
    tag: "ulm-chip-mdi-icon-only-card",
    type: "custom:ulm-chip-mdi-icon-only-card",
    name: "ULM Chip MDI Icon Only",
    description: "MDI icon chip",
    fields: [
      iconField("icon"),
      entityField("entity", undefined, false),
      textField("icon_color"),
    ],
    stub: { icon: "mdi:home" },
    normalize: (c) => ({
      ...c,
      icon: pick(c, "icon", "ulm_chip_mdi_icon_only_icon") || "mdi:home",
      entity: pick(c, "entity", "ulm_chip_mdi_icon_only_entity"),
      icon_color: pick(c, "icon_color", "ulm_chip_mdi_icon_only_icon_color"),
    }),
    renderLabel: () => "",
    renderIcon: (_h, c) => ({
      icon: String(c.icon || "mdi:home"),
      color: c.icon_color ? String(c.icon_color) : undefined,
    }),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-icon-state-card",
    type: "custom:ulm-chip-icon-state-card",
    name: "ULM Chip Icon State",
    description: "Emoji + localized entity state",
    fields: [entityField("entity"), textField("icon")],
    stub: { entity: "sensor.outside_temperature", icon: "🌡️" },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity", "ulm_chip_icon_state_entity"),
      icon: pick(c, "icon", "ulm_chip_icon_state_icon") || "❔",
    }),
    renderLabel: (h, c) => {
      const s = stateOf(h, c.entity);
      const icon = String(c.icon || "❔");
      const state = localize(h, s);
      return state ? `${icon} ${state}` : icon;
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-mdi-icon-state-card",
    type: "custom:ulm-chip-mdi-icon-state-card",
    name: "ULM Chip MDI Icon State",
    description: "MDI icon + localized state",
    fields: [
      entityField("entity"),
      iconField("icon"),
      textField("icon_color"),
      textField("label_color"),
    ],
    stub: {
      entity: "sensor.outside_temperature",
      icon: "mdi:thermometer",
    },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity", "ulm_chip_mdi_icon_state_entity"),
      icon: pick(c, "icon", "ulm_chip_mdi_icon_state_icon") || "mdi:information",
      icon_color: pick(c, "icon_color", "ulm_chip_mdi_icon_state_icon_color"),
      label_color: pick(
        c,
        "label_color",
        "ulm_chip_mdi_icon_state_label_color",
      ),
    }),
    renderLabel: (h, c) => localize(h, stateOf(h, c.entity)) || "?",
    renderIcon: (_h, c) => ({
      icon: String(c.icon || "mdi:information"),
      color: c.icon_color ? String(c.icon_color) : undefined,
    }),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-icon-label-card",
    type: "custom:ulm-chip-icon-label-card",
    name: "ULM Chip Icon Label",
    description: "MDI icon + custom label",
    fields: [
      iconField("icon"),
      textField("label"),
      entityField("entity", undefined, false),
    ],
    stub: { icon: "mdi:tag", label: "Label" },
    normalize: (c) => ({
      ...c,
      icon: pick(c, "icon", "ulm_chip_icon_label_icon") || "mdi:tag",
      label: pick(c, "label", "ulm_chip_icon_label_label") || "",
      entity: pick(c, "entity", "ulm_chip_icon_label_entity"),
    }),
    variant: "icon-label",
    renderLabel: (_h, c) => String(c.label || ""),
    renderIcon: (_h, c) => ({ icon: String(c.icon || "mdi:tag") }),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-icon-double-state-card",
    type: "custom:ulm-chip-icon-double-state-card",
    name: "ULM Chip Icon Double State",
    description: "Emoji + two localized states (•)",
    fields: [
      entityField("entity_1"),
      entityField("entity_2"),
      textField("icon"),
      textField("navigation_path"),
    ],
    stub: {
      entity_1: "sensor.outside_temperature",
      entity_2: "sensor.outside_humidity",
      icon: "🌡️",
    },
    normalize: (c) => ({
      ...c,
      entity_1: pick(c, "entity_1", "ulm_chip_icon_double_state_entity_1"),
      entity_2: pick(c, "entity_2", "ulm_chip_icon_double_state_entity_2"),
      icon: pick(c, "icon", "ulm_chip_icon_double_state_icon") || "❔",
      navigation_path: pick(c, "navigation_path", "ulm_chip_navigate_path"),
    }),
    renderLabel: (h, c) => {
      const icon = String(c.icon || "❔");
      const a = localize(h, stateOf(h, c.entity_1)) || "?";
      const b = localize(h, stateOf(h, c.entity_2)) || "?";
      return `${icon} ${a} • ${b}`;
    },
    onTap: (_h, c) => {
      const path = String(c.navigation_path || "");
      if (path) navigate(path);
    },
  },
  {
    tag: "ulm-chip-alarm-card",
    type: "custom:ulm-chip-alarm-card",
    name: "ULM Chip Alarm",
    description: "Alarm control panel chip",
    fields: [entityField("entity", "alarm_control_panel")],
    stub: { entity: "alarm_control_panel.security" },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity", "ulm_chip_alarm_entity"),
    }),
    variant: "icon-label",
    renderLabel: (h, c) => localize(h, stateOf(h, c.entity)) || "unknown",
    renderIcon: (h, c) => {
      const state = (stateOf(h, c.entity)?.state || "").toLowerCase();
      return {
        icon: ALARM_ICON[state] || ALARM_ICON.default,
        color: ALARM_COLOR[state] || ALARM_COLOR.default,
      };
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-power-consumption-card",
    type: "custom:ulm-chip-power-consumption-card",
    name: "ULM Chip Power Consumption",
    description: "⚡ price or consumption chip",
    fields: [
      entityField("electric_consumption", undefined, false),
      entityField("electric_price", undefined, false),
    ],
    stub: { electric_consumption: "sensor.power_consumption" },
    normalize: (c) => ({
      ...c,
      electric_consumption: pick(
        c,
        "electric_consumption",
        "ulm_chip_electric_consumption",
        "entity",
      ),
      electric_price: pick(c, "electric_price", "ulm_chip_electric_price"),
    }),
    renderLabel: (h, c) => {
      const price = stateOf(h, c.electric_price);
      if (price) {
        const currency =
          (price.attributes.unit_of_measurement as string | undefined) || "";
        return `⚡ ${price.state}${currency}`;
      }
      const cons = stateOf(h, c.electric_consumption);
      return cons ? `⚡ ${localize(h, cons)}` : "⚡ ?";
    },
    onTap: (_h, c, host) => {
      const entity = String(c.electric_price || c.electric_consumption || "");
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-chip-presence-detection-card",
    type: "custom:ulm-chip-presence-detection-card",
    name: "ULM Chip Presence",
    description: "🏠 residents [/ guests] counters",
    fields: [
      entityField("residents"),
      entityField("guests", undefined, false),
    ],
    stub: {
      residents: "input_number.residents_home",
      guests: "input_number.guests_home",
    },
    normalize: (c) => ({
      ...c,
      residents: pick(
        c,
        "residents",
        "ulm_chip_presence_counter_residents",
        "entity",
      ),
      guests: pick(c, "guests", "ulm_chip_presence_counter_guests"),
    }),
    renderLabel: (h, c) => {
      const res = stateOf(h, c.residents)?.state ?? "?";
      const guests = stateOf(h, c.guests);
      if (guests) return `🏠 ${res} / ${guests.state}`;
      return `🏠 ${res}`;
    },
    onTap: (_h, c, host) => {
      if (typeof c.residents === "string") moreInfo(host, c.residents);
    },
  },
  {
    tag: "ulm-chip-temperature-card",
    type: "custom:ulm-chip-temperature-card",
    name: "ULM Chip Temperature",
    description: "Weather emoji + outside [/ inside] °",
    fields: [
      entityField("weather", "weather"),
      entityField("outside"),
      entityField("inside", undefined, false),
    ],
    stub: {
      weather: "weather.demo_weather_north",
      outside: "sensor.outside_temperature",
    },
    normalize: (c) => ({
      ...c,
      weather: pick(c, "weather", "ulm_chip_temperature_weather"),
      outside: pick(c, "outside", "ulm_chip_temperature_outside"),
      inside: pick(c, "inside", "ulm_chip_temperature_inside"),
    }),
    renderLabel: (h, c) => {
      const weather = stateOf(h, c.weather);
      const outside = stateOf(h, c.outside);
      const inside = stateOf(h, c.inside);
      const emoji = WEATHER_EMOJI[weather?.state || ""] || "🌡️";
      const out = convertTemperature(
        outside?.state ?? weather?.attributes.temperature,
      );
      if (inside) {
        return `${emoji} ${out}° / ${convertTemperature(inside.state)}°`;
      }
      return `${emoji} ${out}°`;
    },
    onTap: (_h, c, host) => {
      const entity = String(c.weather || c.outside || "");
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-chip-weather-date-card",
    type: "custom:ulm-chip-weather-date-card",
    name: "ULM Chip Weather Date",
    description: "Weather emoji + short date",
    fields: [entityField("entity", "weather")],
    stub: { entity: "weather.demo_weather_north" },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity", "ulm_weather", "ulm_chip_weather_date_entity"),
    }),
    renderLabel: (h, c) => {
      const s = stateOf(h, c.entity);
      const emoji = WEATHER_EMOJI[s?.state || ""] || "🌡️";
      const date = new Date().toLocaleDateString(localeOf(h, c), {
        month: "short",
        day: "numeric",
      });
      return `${emoji} ${date}`;
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-short-date-with-day-card",
    type: "custom:ulm-chip-short-date-with-day-card",
    name: "ULM Chip Short Date",
    description: "Weekday + short date (label only)",
    fields: [],
    stub: {},
    renderLabel: (h, c) =>
      new Intl.DateTimeFormat(localeOf(h, c), {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(Date.now()),
  },
];

function createChipCard(def: ChipDef) {
  class Card extends LitElement implements LovelaceCard {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: LovelaceCardConfig;

    public static getConfigForm() {
      return { schema: def.fields };
    }

    public static getStubConfig() {
      return { ...def.stub };
    }

    public setConfig(config: LovelaceCardConfig): void {
      const raw = { ...config } as Record<string, unknown>;
      const normalized = def.normalize ? def.normalize(raw) : raw;
      this._config = { ...normalized, type: def.type };
    }

    public getCardSize(): number {
      return 1;
    }

    public getGridOptions() {
      return {
        columns: 3,
        min_columns: 2,
        max_columns: 12,
      };
    }

    protected updated(): void {
      syncChipDarkMode(this, this.hass);
    }

    protected render() {
      if (!this._config || !this.hass) return nothing;
      const cfg = this._config as Record<string, unknown>;
      const iconInfo = def.renderIcon?.(this.hass, cfg);
      const label = def.renderLabel(this.hass, cfg);
      const labelColor =
        typeof cfg.label_color === "string" ? cfg.label_color : undefined;
      const classes = [
        "chip",
        def.variant === "icon-label" ? "icon-label" : "",
        iconInfo && label ? "has-icon-and-label" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return html`
        <button class=${classes} @click=${this._onTap}>
          ${iconInfo
            ? html`<ha-icon
                .icon=${iconInfo.icon}
                style=${styleMap(
                  iconInfo.color ? { color: iconInfo.color } : {},
                )}
              ></ha-icon>`
            : nothing}
          ${label
            ? html`<span
                class="label"
                style=${styleMap(labelColor ? { color: labelColor } : {})}
                >${label}</span
              >`
            : nothing}
        </button>
      `;
    }

    private _onTap = (ev: Event) => {
      ev.stopPropagation();
      if (!this.hass || !this._config) return;
      def.onTap?.(this.hass, this._config as Record<string, unknown>, this);
    };

    static styles = ulmChipStyles;
  }

  if (!customElements.get(def.tag)) customElements.define(def.tag, Card);
  return def;
}

export const OFFICIAL_CHIPS = CHIP_DEFS.map(createChipCard);
