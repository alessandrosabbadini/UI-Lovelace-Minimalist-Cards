/**
 * Lit ports of community custom_chip_* (+ battery_info template as chip/badge).
 * Same element registers as Lovelace card and view badge (like official chips).
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  booleanField,
  colorField,
  entityField,
  iconField,
  textField,
  type HaFormSchema,
} from "../../shared/config-form";
import { ulmChipStyles } from "../../shared/chip-styles";
import { resolveThemeRgb } from "../../shared/colors";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

interface ChipDef {
  tag: string;
  type: string;
  name: string;
  description: string;
  fields: HaFormSchema[];
  stub: Record<string, unknown>;
  normalize?: (cfg: Record<string, unknown>) => Record<string, unknown>;
  renderIcon?: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
    host: HTMLElement,
  ) => { icon: string; color?: string } | undefined;
  renderLabel: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
  ) => string;
  /** Optional custom body (battery ring). When set, icon/label are skipped. */
  renderCustom?: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
  ) => unknown;
  onTap?: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
    host: HTMLElement,
  ) => void;
  /** Return true to hide the chip (e.g. counter hide_if_zero). */
  shouldHide?: (
    hass: HomeAssistant,
    config: Record<string, unknown>,
  ) => boolean;
  variant?: "default" | "icon-label";
}

const MOON_ICON: Record<string, string> = {
  new_moon: "mdi:moon-new",
  waxing_crescent: "mdi:moon-waxing-crescent",
  first_quarter: "mdi:moon-first-quarter",
  waxing_gibbous: "mdi:moon-waxing-gibbous",
  full_moon: "mdi:moon-full",
  waning_gibbous: "mdi:moon-waning-gibbous",
  last_quarter: "mdi:moon-last-quarter",
  waning_crescent: "mdi:moon-waning-crescent",
};

const TESLA_PRESET_ICON: Record<string, string> = {
  Normal: "mdi:thermometer",
  Defrost: "mdi:snowflake-melt",
  "Keep On": "mdi:heat-wave",
  "Dog Mode": "mdi:dog-side",
  "Camp Mode": "mdi:campfire",
  default: "mdi:thermometer",
};

const GROUP_COUNTER_EN: Record<string, string> = {
  light_zero: "No lights",
  light_one: "One light",
  light_multiple: "{count} lights",
  media_player_zero: "No media players",
  media_player_one: "One media player",
  media_player_multiple: "{count} media players",
  speaker_zero: "No speakers",
  speaker_one: "One speaker",
  speaker_multiple: "{count} speakers",
  television_zero: "No TVs",
  television_one: "One TV",
  television_multiple: "{count} TVs",
};

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

function stateOf(hass: HomeAssistant, entity?: unknown): HassEntity | undefined {
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

function navigate(path: string) {
  if (!path) return;
  history.pushState(null, "", path);
  window.dispatchEvent(new Event("location-changed"));
}

function convertTemperature(temp: unknown): string {
  if (temp === undefined || temp === null || temp === "") return "?";
  const n = Number(temp);
  if (!Number.isNaN(n) && !Number.isInteger(n)) return n.toFixed(1);
  return String(temp);
}

function countActive(
  hass: HomeAssistant,
  cfg: Record<string, unknown>,
): number {
  const activeSensor = asStr(
    pick(cfg, "entities_active", "ulm_custom_chip_group_counter_entities_active"),
  );
  if (activeSensor) {
    const n = Number.parseFloat(stateOf(hass, activeSensor)?.state ?? "");
    return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
  }

  const entity = asStr(pick(cfg, "entity"));
  const st = stateOf(hass, entity);
  if (!st) return 0;

  const countStateRaw = String(
    pick(cfg, "count_state", "ulm_custom_chip_group_counter_count_state") ||
      "on",
  );
  const matchStates = countStateRaw.split(",").map((s) => s.trim());

  const children = st.attributes.entity_id;
  if (Array.isArray(children) && children.length) {
    return children.filter((id) => {
      const child = hass.states[String(id)];
      return child && matchStates.includes(child.state);
    }).length;
  }
  return matchStates.includes(st.state) ? 1 : 0;
}

function groupCounterLabel(count: number, type: string): string {
  const plural = count === 0 ? "zero" : count === 1 ? "one" : "multiple";
  const key = `${type}_${plural}`;
  const tpl = GROUP_COUNTER_EN[key] || `{count} ${type}`;
  return tpl.replace("{count}", String(count));
}

function themeIconColor(
  host: HTMLElement,
  colorName: string,
  active: boolean,
): string {
  if (!active) return "rgba(var(--color-theme),0.2)";
  const allowed: UlmThemeColor[] = [
    "yellow",
    "blue",
    "green",
    "red",
    "purple",
    "pink",
    "grey",
  ];
  const c = (
    allowed.includes(colorName as UlmThemeColor) ? colorName : "yellow"
  ) as UlmThemeColor;
  return `rgba(${resolveThemeRgb(host, c)},1)`;
}

function batteryPercent(
  hass: HomeAssistant,
  cfg: Record<string, unknown>,
): number | undefined {
  const batEntity = asStr(
    pick(cfg, "battery_entity", "ulm_battery_entity"),
  );
  if (batEntity) {
    const n = Number.parseFloat(stateOf(hass, batEntity)?.state ?? "");
    return Number.isFinite(n) ? Math.round(n) : undefined;
  }
  const entity = asStr(pick(cfg, "entity"));
  const st = stateOf(hass, entity);
  if (!st) return undefined;
  const raw = st.attributes.battery ?? st.attributes.battery_level;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? Math.round(n) : undefined;
}

const COMMUNITY_CHIP_DEFS: ChipDef[] = [
  {
    tag: "ulm-custom-chip-group-counter-card",
    type: "custom:ulm-custom-chip-group-counter-card",
    name: "ULM Custom Chip group counter",
    description: "Count active entities in a group (lights, media, …)",
    fields: [
      entityField("entity", ["group", "light", "switch", "media_player"]),
      entityField("entities_active", "sensor", false),
      textField("counter_type"),
      textField("count_state"),
      iconField("icon_zero"),
      iconField("icon_one"),
      iconField("icon_multiple"),
      colorField("color"),
      booleanField("hide_if_zero"),
    ],
    stub: {
      entity: "light.ceiling_lights",
      counter_type: "light",
      count_state: "on",
      icon_zero: "mdi:lightbulb-outline",
      icon_one: "mdi:lightbulb-on-outline",
      icon_multiple: "mdi:lightbulb-on-outline",
      color: "yellow",
      hide_if_zero: false,
    },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity"),
      entities_active: pick(
        c,
        "entities_active",
        "ulm_custom_chip_group_counter_entities_active",
      ),
      counter_type:
        pick(
          c,
          "counter_type",
          "ulm_custom_chip_group_counter_type",
          // legacy short key from YAML variables (avoid clobbering card type)
        ) || "light",
      count_state:
        pick(c, "count_state", "ulm_custom_chip_group_counter_count_state") ||
        "on",
      icon_zero:
        pick(c, "icon_zero", "ulm_custom_chip_group_counter_icon_zero") ||
        "mdi:lightbulb-outline",
      icon_one:
        pick(c, "icon_one", "ulm_custom_chip_group_counter_icon_one") ||
        "mdi:lightbulb-on-outline",
      icon_multiple:
        pick(
          c,
          "icon_multiple",
          "ulm_custom_chip_group_counter_icon_multiple",
        ) || "mdi:lightbulb-on-outline",
      color:
        pick(c, "color", "ulm_custom_chip_group_counter_color") || "yellow",
      hide_if_zero: asBool(
        pick(c, "hide_if_zero", "ulm_custom_chip_group_counter_hide_if_zero"),
        false,
      ),
    }),
    shouldHide: (h, c) =>
      Boolean(c.hide_if_zero) && countActive(h, c) === 0,
    renderIcon: (h, c, host) => {
      const n = countActive(h, c);
      const icon =
        n === 0
          ? String(c.icon_zero || "mdi:lightbulb-outline")
          : n === 1
            ? String(c.icon_one || "mdi:lightbulb-on-outline")
            : String(c.icon_multiple || "mdi:lightbulb-on-outline");
      return {
        icon,
        color: themeIconColor(host, String(c.color || "yellow"), n > 0),
      };
    },
    renderLabel: (h, c) =>
      groupCounterLabel(
        countActive(h, c),
        String(c.counter_type || "light"),
      ),
    onTap: (h, c, host) => {
      const entity = asStr(c.entity);
      if (!entity) return;
      const domain = entity.split(".")[0];
      if (domain === "light" || domain === "switch" || domain === "group") {
        h.callService("homeassistant", "toggle", { entity_id: entity });
      } else {
        moreInfo(host, entity);
      }
    },
  },
  {
    tag: "ulm-custom-chip-moon-card",
    type: "custom:ulm-custom-chip-moon-card",
    name: "ULM Custom Chip moon",
    description: "Moon phase icon chip",
    fields: [entityField("entity", "sensor")],
    stub: { entity: "sensor.moon_phase" },
    normalize: (c) => ({ ...c, entity: pick(c, "entity") }),
    renderLabel: () => "",
    renderIcon: (h, c) => {
      const state = stateOf(h, c.entity)?.state || "";
      return { icon: MOON_ICON[state] || "mdi:moon-waning-crescent" };
    },
    onTap: (_h, c, host) => {
      const entity = asStr(c.entity);
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-custom-chip-myenedis-card",
    type: "custom:ulm-custom-chip-myenedis-card",
    name: "ULM Custom Chip myenedis",
    description: "MyEnedis daily cost / consumption chip",
    fields: [
      entityField("entity", "sensor"),
      booleanField("separate_hp_hc"),
      textField("unit_of_measurement"),
    ],
    stub: { entity: "sensor.power_consumption", separate_hp_hc: false },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity"),
      separate_hp_hc: asBool(
        pick(c, "separate_hp_hc", "ulm_chip_separate_hp_hc"),
        false,
      ),
      unit_of_measurement: pick(
        c,
        "unit_of_measurement",
        "ulm_chip_unit_of_measurement",
      ),
    }),
    renderLabel: (h, c) => {
      const st = stateOf(h, c.entity);
      if (!st) return "💰 —";
      const uom =
        asStr(c.unit_of_measurement) ||
        String(st.attributes.unit_of_measurement || "kWh");
      const cost = Number.parseFloat(String(st.attributes.daily_cost ?? ""));
      let result = `💰 ${Number.isFinite(cost) ? cost.toFixed(1) : "—"} €`;
      if (c.separate_hp_hc) {
        const hp = Number.parseFloat(String(st.attributes.yesterday_HP ?? ""));
        const hc = Number.parseFloat(String(st.attributes.yesterday_HC ?? ""));
        result += ` ☀️ ${Number.isFinite(hp) ? hp.toFixed(1) : "—"} ${uom}`;
        result += ` 🌑 ${Number.isFinite(hc) ? hc.toFixed(1) : "—"} ${uom}`;
      } else {
        const total = Number.parseFloat(
          String(st.attributes.yesterday_HCHP ?? st.state ?? ""),
        );
        result += ` ⚡ ${Number.isFinite(total) ? total.toFixed(1) : "—"} ${uom}`;
      }
      return result;
    },
    onTap: (_h, c, host) => {
      const entity = asStr(c.entity);
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-custom-chip-simple-temp-card",
    type: "custom:ulm-custom-chip-simple-temp-card",
    name: "ULM Custom Chip simple temp",
    description: "Temperature value chip (e.g. 21.5°)",
    fields: [entityField("entity", ["sensor", "climate"])],
    stub: { entity: "sensor.outside_temperature" },
    normalize: (c) => ({ ...c, entity: pick(c, "entity") }),
    renderLabel: (h, c) => {
      const st = stateOf(h, c.entity);
      if (!st) return "—°";
      const raw =
        st.attributes.current_temperature !== undefined
          ? st.attributes.current_temperature
          : st.state;
      return `${convertTemperature(raw)}°`;
    },
    onTap: (_h, c, host) => {
      const entity = asStr(c.entity);
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-custom-chip-tesla-temperature-card",
    type: "custom:ulm-custom-chip-tesla-temperature-card",
    name: "ULM Custom Chip tesla temperature",
    description: "HVAC set / current temperature chip",
    fields: [entityField("hvac", "climate"), entityField("entity", "climate", false)],
    stub: { hvac: "climate.hvac" },
    variant: "icon-label",
    normalize: (c) => ({
      ...c,
      hvac: pick(c, "hvac", "ulm_chip_hvac", "entity"),
      entity: pick(c, "entity", "ulm_chip_hvac"),
    }),
    renderIcon: (h, c) => {
      const id = asStr(pick(c, "hvac", "entity"));
      const preset = String(stateOf(h, id)?.attributes.preset_mode || "");
      return {
        icon: TESLA_PRESET_ICON[preset] || TESLA_PRESET_ICON.default,
      };
    },
    renderLabel: (h, c) => {
      const id = asStr(pick(c, "hvac", "entity"));
      const st = stateOf(h, id);
      if (!st) return "Set —° / Current —°";
      const set = convertTemperature(st.attributes.temperature);
      const cur = convertTemperature(st.attributes.current_temperature);
      return `Set ${set}° / Current ${cur}°`;
    },
    onTap: (_h, c, host) => {
      const id = asStr(pick(c, "hvac", "entity"));
      if (id) moreInfo(host, id);
    },
  },
  {
    tag: "ulm-custom-chip-update-card",
    type: "custom:ulm-custom-chip-update-card",
    name: "ULM Custom Chip update",
    description: "Updates available / up to date navigate chip",
    fields: [
      entityField("entity", ["binary_sensor", "update", "sensor"]),
      textField("path"),
      textField("updates_available"),
      textField("no_updates_available"),
    ],
    stub: {
      entity: "update.demo_update_with_progress",
      path: "/config/updates",
      updates_available: "Updates available",
      no_updates_available: "Up to date",
    },
    normalize: (c) => ({
      ...c,
      entity: pick(c, "entity"),
      path: pick(c, "path", "ulm_chip_update_path") || "/config/updates",
      updates_available:
        pick(c, "updates_available", "ulm_updates_available") ||
        "Updates available",
      no_updates_available:
        pick(c, "no_updates_available", "ulm_no_updates_available") ||
        "Up to date",
    }),
    renderIcon: (h, c) => {
      const st = stateOf(h, c.entity);
      // YAML: state value "off" → green; default → red
      if (st?.state === "off") {
        return { icon: "mdi:shield-check", color: "var(--google-green)" };
      }
      return { icon: "mdi:shield-alert", color: "var(--google-red)" };
    },
    renderLabel: (h, c) => {
      const st = stateOf(h, c.entity);
      if (st?.state === "off") {
        return String(c.no_updates_available || "Up to date");
      }
      return String(c.updates_available || "Updates available");
    },
    onTap: (_h, c) => navigate(String(c.path || "/config/updates")),
  },
  {
    tag: "ulm-custom-chip-vlape-garage-card",
    type: "custom:ulm-custom-chip-vlape-garage-card",
    name: "ULM Custom Chip vlape garage",
    description: "Garage open/closed icon + state chip",
    fields: [entityField("entity", ["cover", "binary_sensor", "lock"])],
    stub: { entity: "cover.garage_door" },
    variant: "icon-label",
    normalize: (c) => ({ ...c, entity: pick(c, "entity") }),
    renderIcon: (h, c) => {
      const state = (stateOf(h, c.entity)?.state || "").toLowerCase();
      const open = state === "open" || state === "opening" || state === "on";
      return {
        icon: open ? "mdi:garage-open" : "mdi:garage",
        color: open ? "var(--google-red)" : "var(--google-green)",
      };
    },
    renderLabel: (h, c) => {
      const st = stateOf(h, c.entity);
      if (!st) return "—";
      if (h.formatEntityState) return h.formatEntityState(st);
      return st.state;
    },
    onTap: (_h, c, host) => {
      const entity = asStr(c.entity);
      if (entity) moreInfo(host, entity);
    },
  },
  {
    tag: "ulm-custom-template-shogun160-battery-info-card",
    type: "custom:ulm-custom-template-shogun160-battery-info-card",
    name: "ULM Custom Chip battery info",
    description: "Circular battery % badge (shogun160 template as chip)",
    fields: [
      entityField("battery_entity", "sensor", false),
      entityField("entity", ["sensor", "device_tracker", "person"], false),
    ],
    stub: { battery_entity: "sensor.outside_temperature_battery" },
    normalize: (c) => ({
      ...c,
      battery_entity: pick(c, "battery_entity", "ulm_battery_entity"),
      entity: pick(c, "entity"),
    }),
    renderLabel: () => "",
    renderCustom: (h, c) => {
      const battery = batteryPercent(h, c);
      if (battery === undefined) {
        return html`<span class="label">—%</span>`;
      }
      const radius = 14;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (battery / 100) * circumference;
      return svg`
        <svg class="bat-ring" viewBox="0 0 36 36" aria-hidden="true">
          <circle
            class="bat-bg"
            cx="18"
            cy="18"
            r=${radius}
            fill="var(--card-background-color)"
            stroke="rgba(var(--color-theme),0.15)"
            stroke-width="3"
          />
          <circle
            class="bat-fg"
            cx="18"
            cy="18"
            r=${radius}
            fill="none"
            stroke="var(--google-green)"
            stroke-width="3"
            stroke-linecap="round"
            style=${styleMap({
              strokeDasharray: `${circumference}`,
              strokeDashoffset: `${offset}`,
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            })}
          />
          <text
            x="50%"
            y="54%"
            text-anchor="middle"
            dominant-baseline="middle"
            class="bat-text"
          >${battery}<tspan class="bat-pct">%</tspan></text>
        </svg>
      `;
    },
    onTap: (_h, c, host) => {
      const id = asStr(pick(c, "battery_entity", "entity"));
      if (id) moreInfo(host, id);
    },
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

    protected render() {
      if (!this._config || !this.hass) return nothing;
      const cfg = this._config as Record<string, unknown>;
      if (def.shouldHide?.(this.hass, cfg)) {
        return nothing;
      }

      if (def.renderCustom) {
        return html`
          <button class="chip bat-chip" @click=${this._onTap}>
            ${def.renderCustom(this.hass, cfg)}
          </button>
        `;
      }

      const iconInfo = def.renderIcon?.(this.hass, cfg, this);
      const label = def.renderLabel(this.hass, cfg);
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
            ? html`<span class="label">${label}</span>`
            : nothing}
        </button>
      `;
    }

    private _onTap = (ev: Event) => {
      ev.stopPropagation();
      if (!this.hass || !this._config) return;
      def.onTap?.(this.hass, this._config as Record<string, unknown>, this);
    };

    static styles = [
      ulmChipStyles,
      css`
        button.chip.bat-chip {
          padding: 2px;
          height: 36px;
          width: 36px;
          border-radius: 50%;
        }
        .bat-ring {
          width: 32px;
          height: 32px;
          display: block;
        }
        .bat-text {
          fill: var(--primary-text-color);
          font-size: 11px;
          font-weight: bold;
        }
        .bat-pct {
          font-size: 7px;
        }
      `,
    ];
  }

  if (!customElements.get(def.tag)) customElements.define(def.tag, Card);
  return def;
}

export const COMMUNITY_CHIPS = COMMUNITY_CHIP_DEFS.map(createChipCard);
