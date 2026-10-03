import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { UlmEditorBase, type EditorField } from "../../shared/editor-base";
import { ulmChipStyles } from "../../shared/chip-styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

interface ChipDef {
  tag: string;
  type: string;
  name: string;
  description: string;
  fields: EditorField[];
  stub: Record<string, unknown>;
  renderLabel: (hass: HomeAssistant, config: Record<string, unknown>) => string;
  renderIcon?: (hass: HomeAssistant, config: Record<string, unknown>) => string;
  onTap?: (hass: HomeAssistant, config: Record<string, unknown>, host: HTMLElement) => void;
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

function stateOf(hass: HomeAssistant, entity?: unknown) {
  if (!entity || typeof entity !== "string") return undefined;
  return hass.states[entity];
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

const CHIP_DEFS: ChipDef[] = [
  {
    tag: "ulm-chip-back-card",
    type: "custom:ulm-chip-back-card",
    name: "ULM Chip Back",
    description: "Back navigation chip",
    fields: [
      { type: "text", key: "icon", label: "Icon", placeholder: "mdi:arrow-left" },
    ],
    stub: { icon: "mdi:arrow-left" },
    renderLabel: () => "",
    renderIcon: (_h, c) => String(c.icon || "mdi:arrow-left"),
    onTap: () => history.back(),
  },
  {
    tag: "ulm-chip-navigate-card",
    type: "custom:ulm-chip-navigate-card",
    name: "ULM Chip Navigate",
    description: "Navigate to a Lovelace path",
    fields: [
      { type: "text", key: "icon", label: "Icon", placeholder: "mdi:page-next" },
      {
        type: "text",
        key: "navigation_path",
        label: "Navigation path",
        placeholder: "/lovelace/home",
      },
      { type: "text", key: "label", label: "Label (optional)" },
    ],
    stub: { icon: "mdi:page-next", navigation_path: "/lovelace/home" },
    renderLabel: (_h, c) => String(c.label || ""),
    renderIcon: (_h, c) => String(c.icon || "mdi:page-next"),
    onTap: (_h, c) => {
      const path = String(c.navigation_path || "");
      if (!path) return;
      history.pushState(null, "", path);
      window.dispatchEvent(new Event("location-changed"));
    },
  },
  {
    tag: "ulm-chip-icon-only-card",
    type: "custom:ulm-chip-icon-only-card",
    name: "ULM Chip Icon Only",
    description: "Chip with icon only",
    fields: [
      { type: "text", key: "entity", label: "Entity (optional)" },
      { type: "text", key: "icon", label: "Icon", placeholder: "mdi:home" },
    ],
    stub: { icon: "mdi:home" },
    renderLabel: () => "",
    renderIcon: (h, c) => {
      const s = stateOf(h, c.entity);
      return String(c.icon || s?.attributes.icon || "mdi:circle-medium");
    },
    onTap: (h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-mdi-icon-only-card",
    type: "custom:ulm-chip-mdi-icon-only-card",
    name: "ULM Chip MDI Icon Only",
    description: "Chip with forced MDI icon",
    fields: [
      { type: "text", key: "icon", label: "MDI icon", placeholder: "mdi:home" },
      { type: "text", key: "entity", label: "Entity (optional)" },
    ],
    stub: { icon: "mdi:home" },
    renderLabel: () => "",
    renderIcon: (_h, c) => String(c.icon || "mdi:home"),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-icon-state-card",
    type: "custom:ulm-chip-icon-state-card",
    name: "ULM Chip Icon State",
    description: "Icon + entity state",
    fields: [
      { type: "text", key: "entity", label: "Entity", placeholder: "sensor.demo" },
      { type: "text", key: "icon", label: "Icon (optional)" },
    ],
    stub: { entity: "sensor.outside_temperature" },
    renderLabel: (h, c) => {
      const s = stateOf(h, c.entity);
      if (!s) return "?";
      const unit = s.attributes.unit_of_measurement;
      return unit ? `${s.state}${unit}` : s.state;
    },
    renderIcon: (h, c) => {
      const s = stateOf(h, c.entity);
      return String(c.icon || s?.attributes.icon || "mdi:information");
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-mdi-icon-state-card",
    type: "custom:ulm-chip-mdi-icon-state-card",
    name: "ULM Chip MDI Icon State",
    description: "Forced MDI icon + state",
    fields: [
      {
        type: "text",
        key: "entity",
        label: "Entity",
        placeholder: "sensor.outside_temperature",
      },
      { type: "text", key: "icon", label: "MDI icon", placeholder: "mdi:information" },
    ],
    stub: { entity: "sensor.outside_temperature", icon: "mdi:information" },
    renderLabel: (h, c) => stateOf(h, c.entity)?.state || "?",
    renderIcon: (_h, c) => String(c.icon || "mdi:information"),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-icon-label-card",
    type: "custom:ulm-chip-icon-label-card",
    name: "ULM Chip Icon Label",
    description: "Icon + custom label",
    fields: [
      { type: "text", key: "icon", label: "Icon", placeholder: "mdi:tag" },
      { type: "text", key: "label", label: "Label", placeholder: "Label" },
      { type: "text", key: "entity", label: "Entity (optional)" },
    ],
    stub: { icon: "mdi:tag", label: "Label" },
    renderLabel: (_h, c) => String(c.label || ""),
    renderIcon: (_h, c) => String(c.icon || "mdi:tag"),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-icon-double-state-card",
    type: "custom:ulm-chip-icon-double-state-card",
    name: "ULM Chip Icon Double State",
    description: "Icon + two entity states",
    fields: [
      { type: "text", key: "entity_1", label: "Entity 1", placeholder: "sensor.outside_temperature" },
      { type: "text", key: "entity_2", label: "Entity 2", placeholder: "sensor.outside_humidity" },
      { type: "text", key: "icon", label: "Icon (optional)" },
    ],
    stub: { entity_1: "sensor.outside_temperature", entity_2: "sensor.outside_humidity" },
    renderLabel: (h, c) => {
      const a = stateOf(h, c.entity_1)?.state ?? "?";
      const b = stateOf(h, c.entity_2)?.state ?? "?";
      return `${a} / ${b}`;
    },
    renderIcon: (h, c) => {
      const s = stateOf(h, c.entity_1);
      return String(c.icon || s?.attributes.icon || "mdi:format-list-bulleted");
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity_1 === "string") moreInfo(host, c.entity_1);
    },
  },
  {
    tag: "ulm-chip-alarm-card",
    type: "custom:ulm-chip-alarm-card",
    name: "ULM Chip Alarm",
    description: "Alarm control panel chip",
    fields: [
      {
        type: "text",
        key: "entity",
        label: "Alarm entity",
        placeholder: "alarm_control_panel.security",
      },
    ],
    stub: { entity: "alarm_control_panel.security" },
    renderLabel: (h, c) => stateOf(h, c.entity)?.state || "unknown",
    renderIcon: (h, c) => {
      const state = stateOf(h, c.entity)?.state;
      if (state === "armed_away" || state === "armed_home") return "mdi:shield-lock";
      if (state === "triggered") return "mdi:shield-alert";
      return "mdi:shield-home";
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-power-consumption-card",
    type: "custom:ulm-chip-power-consumption-card",
    name: "ULM Chip Power Consumption",
    description: "Power consumption chip",
    fields: [
      {
        type: "text",
        key: "entity",
        label: "Power sensor",
        placeholder: "sensor.power_consumption",
      },
      { type: "text", key: "icon", label: "Icon", placeholder: "mdi:flash" },
    ],
    stub: { entity: "sensor.power_consumption", icon: "mdi:flash" },
    renderLabel: (h, c) => {
      const s = stateOf(h, c.entity);
      if (!s) return "?";
      const unit = s.attributes.unit_of_measurement || "W";
      return `${s.state} ${unit}`;
    },
    renderIcon: (_h, c) => String(c.icon || "mdi:flash"),
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-presence-detection-card",
    type: "custom:ulm-chip-presence-detection-card",
    name: "ULM Chip Presence",
    description: "Presence detection chip",
    fields: [
      {
        type: "text",
        key: "entity",
        label: "Presence entity",
        placeholder: "binary_sensor.movement_backyard",
      },
    ],
    stub: { entity: "binary_sensor.movement_backyard" },
    renderLabel: (h, c) => {
      const s = stateOf(h, c.entity);
      if (!s) return "?";
      return s.state === "on" ? "Home" : "Away";
    },
    renderIcon: (h, c) =>
      stateOf(h, c.entity)?.state === "on"
        ? "mdi:home-account"
        : "mdi:home-outline",
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-temperature-card",
    type: "custom:ulm-chip-temperature-card",
    name: "ULM Chip Temperature",
    description: "Outside/inside temperature chip",
    fields: [
      {
        type: "text",
        key: "ulm_chip_temperature_weather",
        label: "Weather entity",
        placeholder: "weather.home",
      },
      {
        type: "text",
        key: "ulm_chip_temperature_outside",
        label: "Outside temp sensor",
        placeholder: "sensor.outside_temp",
      },
      {
        type: "text",
        key: "ulm_chip_temperature_inside",
        label: "Inside temp sensor (optional)",
      },
    ],
    stub: {
      ulm_chip_temperature_weather: "weather.demo_weather_north",
      ulm_chip_temperature_outside: "sensor.outside_temperature",
    },
    renderLabel: (h, c) => {
      const weather = stateOf(h, c.ulm_chip_temperature_weather);
      const outside = stateOf(h, c.ulm_chip_temperature_outside);
      const inside = stateOf(h, c.ulm_chip_temperature_inside);
      const emoji = WEATHER_EMOJI[weather?.state || ""] || "🌡️";
      const out = outside?.state ?? weather?.attributes.temperature ?? "?";
      if (inside) return `${emoji} ${out}° / ${inside.state}°`;
      return `${emoji} ${out}°`;
    },
    onTap: (_h, c, host) => {
      const entity = String(
        c.ulm_chip_temperature_weather || c.ulm_chip_temperature_outside || "",
      );
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-chip-weather-date-card",
    type: "custom:ulm-chip-weather-date-card",
    name: "ULM Chip Weather Date",
    description: "Weather condition + date chip",
    fields: [
      {
        type: "text",
        key: "entity",
        label: "Weather entity",
        placeholder: "weather.home",
      },
    ],
    stub: { entity: "weather.demo_weather_north" },
    renderLabel: (h, c) => {
      const s = stateOf(h, c.entity);
      const emoji = WEATHER_EMOJI[s?.state || ""] || "🌡️";
      const date = new Date().toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      const temp = s?.attributes.temperature;
      return temp !== undefined ? `${emoji} ${temp}° · ${date}` : `${emoji} ${date}`;
    },
    onTap: (_h, c, host) => {
      if (typeof c.entity === "string") moreInfo(host, c.entity);
    },
  },
  {
    tag: "ulm-chip-short-date-with-day-card",
    type: "custom:ulm-chip-short-date-with-day-card",
    name: "ULM Chip Short Date",
    description: "Short date with weekday",
    fields: [
      { type: "text", key: "icon", label: "Icon", placeholder: "mdi:calendar" },
    ],
    stub: { icon: "mdi:calendar" },
    renderLabel: () =>
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
    renderIcon: (_h, c) => String(c.icon || "mdi:calendar"),
  },
];

function createChipCard(def: ChipDef) {
  class Card extends LitElement implements LovelaceCard {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: LovelaceCardConfig;

    public static async getConfigElement() {
      return document.createElement(`${def.tag}-editor`);
    }

    public static getStubConfig() {
      return { ...def.stub };
    }

    public setConfig(config: LovelaceCardConfig): void {
      this._config = { ...config, type: def.type };
    }

    public getCardSize(): number {
      return 1;
    }

    protected render() {
      if (!this._config || !this.hass) return nothing;
      const cfg = this._config as Record<string, unknown>;
      const icon = def.renderIcon?.(this.hass, cfg);
      const label = def.renderLabel(this.hass, cfg);
      return html`
        <button class="chip" @click=${this._onTap}>
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          ${label ? html`<span class="label">${label}</span>` : nothing}
        </button>
      `;
    }

    private _onTap = () => {
      if (!this.hass || !this._config) return;
      def.onTap?.(this.hass, this._config as Record<string, unknown>, this);
    };

    static styles = ulmChipStyles;
  }

  class Editor extends UlmEditorBase<LovelaceCardConfig> {
    protected render() {
      return this.renderFields(def.fields);
    }
  }

  if (!customElements.get(def.tag)) customElements.define(def.tag, Card);
  if (!customElements.get(`${def.tag}-editor`)) customElements.define(`${def.tag}-editor`, Editor);
  return def;
}

export const OFFICIAL_CHIPS = CHIP_DEFS.map(createChipCard);
