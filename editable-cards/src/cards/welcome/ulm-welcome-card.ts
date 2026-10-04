import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { THEME_COLORS, resolveThemeRgb } from "../../shared/colors";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface WelcomeEntityConfig {
  entity_id?: string;
  icon?: string;
  name?: string;
  color?: UlmThemeColor | string;
  state?: string;
  nav_path?: string;
  /** Object (YAML) or JSON string (UI form) */
  service_data?: Record<string, unknown> | string;
}

export interface UlmWelcomeCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-welcome-card";
  ulm_weather?: string;
  ulm_card_welcome_scenes_collapse?: string;
  ulm_language?: string;
  ulm_morning?: string;
  ulm_afternoon?: string;
  ulm_evening?: string;
  ulm_hello?: string;
  entity_1?: WelcomeEntityConfig;
  entity_2?: WelcomeEntityConfig;
  entity_3?: WelcomeEntityConfig;
  entity_4?: WelcomeEntityConfig;
  entity_5?: WelcomeEntityConfig;
  entity_6?: WelcomeEntityConfig;
  entity_7?: WelcomeEntityConfig;
}

const ENTITY_KEYS = [
  "entity_1",
  "entity_2",
  "entity_3",
  "entity_4",
  "entity_5",
  "entity_6",
  "entity_7",
] as const;

const PILL_COLORS = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "purple",
] as const;

const DEFAULT_COLORS: UlmThemeColor[] = [
  "blue",
  "yellow",
  "green",
  "purple",
  "red",
  "pink",
  "yellow",
];

const GREETINGS: Record<
  string,
  { morning: string; afternoon: string; evening: string; hello: string }
> = {
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    hello: "Hello",
  },
  it: {
    morning: "Buongiorno",
    afternoon: "Buon pomeriggio",
    evening: "Buonasera",
    hello: "Ciao",
  },
};

/** Original chip_weather_date emoji map */
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
  default: "🌡️",
};

function pillSchema(n: number) {
  return {
    type: "expandable" as const,
    name: `entity_${n}`,
    title: `Shortcut ${n}`,
    schema: [
      {
        type: "grid" as const,
        name: "",
        flatten: true,
        schema: [
          { name: "name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
        ],
      },
      {
        name: "nav_path",
        selector: { text: { type: "text" } },
      },
      {
        name: "color",
        selector: {
          select: {
            mode: "dropdown",
            options: PILL_COLORS.map((c) => ({ value: c, label: c })),
          },
        },
      },
      { name: "entity_id", selector: { entity: {} } },
      { name: "state", selector: { text: {} } },
      {
        name: "service_data",
        selector: { text: { multiline: true, type: "text" } },
      },
    ],
  };
}

function parseServiceData(
  raw: unknown,
): Record<string, unknown> | undefined {
  if (raw == null || raw === "") return undefined;
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw !== "string") return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    /* keep undefined — invalid JSON from form */
  }
  return undefined;
}

@customElement("ulm-welcome-card")
export class UlmWelcomeCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmWelcomeCardConfig;
  @state() private _randomColors: Record<string, UlmThemeColor> = {};
  @state() private _localCollapsed = false;

  /** HA built-in visual editor (ha-form) — see developers.home-assistant.io */
  public static getConfigForm() {
    return {
      schema: [
        // Top-level fields so HA always persists them (expandables can drop values)
        {
          name: "ulm_weather",
          selector: { entity: { domain: "weather" } },
        },
        {
          name: "ulm_card_welcome_scenes_collapse",
          selector: { entity: { domain: "input_boolean" } },
        },
        {
          name: "ulm_language",
          selector: { text: {} },
        },
        {
          type: "grid" as const,
          name: "",
          flatten: true,
          schema: [
            { name: "ulm_morning", selector: { text: {} } },
            { name: "ulm_afternoon", selector: { text: {} } },
            { name: "ulm_evening", selector: { text: {} } },
            { name: "ulm_hello", selector: { text: {} } },
          ],
        },
        pillSchema(1),
        pillSchema(2),
        pillSchema(3),
        pillSchema(4),
        pillSchema(5),
        pillSchema(6),
        pillSchema(7),
      ],
      computeLabel: (schema: { name?: string }) => {
        const labels: Record<string, string> = {
          ulm_weather: "Weather (ulm_weather)",
          ulm_card_welcome_scenes_collapse:
            "Collapse toggle (ulm_card_welcome_scenes_collapse)",
          ulm_language: "Language (ulm_language)",
          ulm_morning: "Morning",
          ulm_afternoon: "Afternoon",
          ulm_evening: "Evening",
          ulm_hello: "Hello",
          name: "Name",
          icon: "Icon",
          nav_path: "Navigation path",
          color: "Icon color",
          entity_id: "Entity (optional)",
          state: "Active state (optional)",
          service_data: "service_data (JSON)",
        };
        return labels[schema.name || ""] || undefined;
      },
      computeHelper: (schema: { name?: string }) => {
        switch (schema.name) {
          case "ulm_weather":
            return "Weather entity for the top chip (emoji + date).";
          case "ulm_card_welcome_scenes_collapse":
            return "Optional input_boolean. When set, chevron toggles it and hides pills while on.";
          case "ulm_language":
            return 'BCP-47 tag, e.g. "it" or "en-US".';
          case "nav_path":
            return "View path on tap, e.g. /lovelace/lights. Pure navigation — no toggle.";
          case "color":
            return "Color of the icon circle only. Pill background stays white.";
          case "entity_id":
            return "Optional. Leave empty for navigation-only shortcuts.";
          case "service_data":
            return 'JSON object passed to scene/script turn_on, e.g. {"brightness": 50}.';
          default:
            return undefined;
        }
      },
    };
  }

  public static getStubConfig(): Partial<UlmWelcomeCardConfig> {
    // Name + icon (+ color/nav) by default — no entity_id
    return {
      ulm_weather: "weather.demo_weather_north",
      entity_1: {
        name: "House",
        icon: "mdi:home",
        color: "blue",
        nav_path: "/lovelace/0",
      },
      entity_2: {
        name: "Lights",
        icon: "mdi:lightbulb",
        color: "yellow",
        nav_path: "/lovelace/0",
      },
      entity_3: {
        name: "Secure",
        icon: "mdi:shield",
        color: "green",
        nav_path: "/lovelace/0",
      },
      entity_4: {
        name: "Lab",
        icon: "mdi:view-dashboard",
        color: "purple",
        nav_path: "/lovelace/0",
      },
      entity_5: {
        name: "Lab",
        icon: "mdi:flask",
        color: "red",
        nav_path: "/lovelace/0",
      },
    };
  }

  public setConfig(config: UlmWelcomeCardConfig): void {
    const c = config as UlmWelcomeCardConfig & Record<string, unknown>;
    // Nested leftovers from older expandable form
    const greetings = (c.greetings || {}) as Record<string, unknown>;
    const next: UlmWelcomeCardConfig = {
      ...config,
      ulm_morning:
        config.ulm_morning ?? (greetings.ulm_morning as string | undefined),
      ulm_afternoon:
        config.ulm_afternoon ??
        (greetings.ulm_afternoon as string | undefined),
      ulm_evening:
        config.ulm_evening ?? (greetings.ulm_evening as string | undefined),
      ulm_hello: config.ulm_hello ?? (greetings.ulm_hello as string | undefined),
      type: "custom:ulm-welcome-card",
    };
    // Drop empty nested objects from ha-form expandables
    for (const key of ENTITY_KEYS) {
      const ent = next[key];
      if (!ent || typeof ent !== "object") continue;
      const cleaned: WelcomeEntityConfig = {};
      for (const [k, v] of Object.entries(ent)) {
        if (v === "" || v == null) continue;
        // Keep service_data as string (form) or object (YAML)
        (cleaned as Record<string, unknown>)[k] = v;
      }
      if (Object.keys(cleaned).length) next[key] = cleaned;
      else delete next[key];
    }
    this._config = next;

    const colors: Record<string, UlmThemeColor> = { ...this._randomColors };
    ENTITY_KEYS.forEach((key, i) => {
      const ent = next[key];
      if (ent && !ent.color && !colors[key]) {
        colors[key] = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      }
    });
    this._randomColors = colors;
  }

  /** Masonry: 1 ≈ 50px */
  public getCardSize(): number {
    return this._isCollapsed() ? 2 : 4;
  }

  /**
   * Sections view — omit `rows` so HA ignores the row grid and sizes
   * to content (avoids empty space under the card).
   */
  public getGridOptions() {
    return {
      columns: 12 as const,
      min_columns: 6,
    };
  }

  private _collapseEntity(): string | undefined {
    const id = this._config?.ulm_card_welcome_scenes_collapse;
    return id && typeof id === "string" && id.length ? id : undefined;
  }

  private _isCollapsed(): boolean {
    const entityId = this._collapseEntity();
    if (entityId && this.hass?.states[entityId]) {
      return this.hass.states[entityId].state === "on";
    }
    return this._localCollapsed;
  }

  private _langPack() {
    const lang = (
      this._config?.ulm_language ||
      this.hass?.language ||
      "en"
    ).toLowerCase();
    return GREETINGS[lang.split("-")[0]] || GREETINGS.en;
  }

  /** First name only, Capitalized (e.g. "alessandro sabbadini" → "Alessandro") */
  private _userName(): string {
    const raw = this.hass?.user?.name?.trim() || "there";
    const first = raw.split(/\s+/)[0] || raw;
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  }

  private _configuredPills() {
    return ENTITY_KEYS.map((key) => {
      const conf = this._config![key];
      if (!conf) return null;
      if (!conf.entity_id && !conf.nav_path && !conf.name) return null;
      return { key, conf };
    }).filter(Boolean) as Array<{ key: string; conf: WelcomeEntityConfig }>;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const collapsed = this._isCollapsed();
    const pills = this._configuredPills();

    return html`
      <ha-card
        class=${collapsed ? "ulm-welcome collapsed" : "ulm-welcome"}
      >
        ${this._renderTopbar()}
        ${this._renderGreeting()}
        ${collapsed || !pills.length
          ? nothing
          : html`
              <div class="pills">
                ${pills.map(({ key, conf }) => this._renderPill(key, conf))}
              </div>
            `}
      </ha-card>
    `;
  }

  private _renderTopbar() {
    const weatherId = this._config!.ulm_weather;
    const weather = weatherId ? this.hass!.states[weatherId] : undefined;
    const collapsed = this._isCollapsed();

    // Original chip_weather_date: emoji from weather state + short date
    const locale =
      this._config!.ulm_language || this.hass!.language || undefined;
    const formattedDate = new Date().toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    });
    const emoji =
      WEATHER_EMOJI[weather?.state || ""] || WEATHER_EMOJI.default;
    const weatherLabel = weather
      ? `${emoji} ${formattedDate}`
      : `${WEATHER_EMOJI.default} ${formattedDate}`;

    return html`
      <div class="topbar">
        <button
          type="button"
          class="chip round"
          @click=${this._toggleCollapse}
          title=${collapsed ? "Expand" : "Collapse"}
        >
          <ha-icon
            .icon=${collapsed ? "mdi:chevron-down" : "mdi:chevron-up"}
          ></ha-icon>
        </button>

        <button
          class="chip weather"
          ?disabled=${!weather}
          @click=${() => weatherId && this._moreInfo(weatherId)}
        >
          <span>${weatherLabel}</span>
        </button>

        <button
          class="chip round"
          @click=${() => this._navigate("/config/dashboard")}
          title="Settings"
        >
          <ha-icon icon="mdi:cog-outline"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderGreeting() {
    const pack = this._langPack();
    const hour = new Date().getHours();
    let welcome = this._config!.ulm_hello || pack.hello;
    if (hour >= 18) welcome = this._config!.ulm_evening || pack.evening;
    else if (hour >= 12)
      welcome = this._config!.ulm_afternoon || pack.afternoon;
    else if (hour >= 5) welcome = this._config!.ulm_morning || pack.morning;

    return html`
      <div class="greeting">
        <div class="line">${welcome},</div>
        <div class="line">${this._userName()}!</div>
      </div>
    `;
  }

  private _renderPill(key: string, conf: WelcomeEntityConfig) {
    const stateObj = conf.entity_id
      ? this.hass!.states[conf.entity_id]
      : undefined;
    const color = (conf.color ||
      this._randomColors[key] ||
      "blue") as UlmThemeColor;
    const rgb = resolveThemeRgb(this, color) || THEME_COLORS[color];
    const name =
      conf.name ||
      stateObj?.attributes.friendly_name ||
      conf.entity_id ||
      "";
    const icon =
      conf.icon || stateObj?.attributes.icon || "mdi:circle-medium";

    // Navigation shortcuts: always white pill, never "on" tint
    return html`
      <button
        class="pill"
        style=${styleMap({
          "--pill-color": `rgb(${rgb})`,
          "--pill-bg": `rgba(${rgb}, 0.2)`,
        })}
        @click=${() => this._pillAction(conf)}
      >
        <span class="pill-icon">
          <ha-icon .icon=${icon}></ha-icon>
        </span>
        <span class="pill-name">${name}</span>
      </button>
    `;
  }

  private _pillAction(conf: WelcomeEntityConfig) {
    if (!this.hass) return;
    // Prefer navigation — welcome shortcuts are not toggles
    if (conf.nav_path) {
      this._navigate(conf.nav_path);
      return;
    }
    if (!conf.entity_id) return;
    const id = conf.entity_id;
    const data = parseServiceData(conf.service_data) || {};
    if (id.startsWith("scene.")) {
      this.hass.callService("scene", "turn_on", {
        entity_id: id,
        ...data,
      });
      return;
    }
    if (id.startsWith("script.")) {
      // Original may call script.xxx directly; turn_on + data works for fields
      this.hass.callService("script", "turn_on", {
        entity_id: id,
        ...data,
      });
      return;
    }
    if (id.startsWith("input_select.") && conf.state) {
      this.hass.callService("input_select", "select_option", {
        entity_id: id,
        option: conf.state,
        ...data,
      });
      return;
    }
    if (id.startsWith("media_player.")) {
      this.hass.callService("media_player", "media_play_pause", {
        entity_id: id,
        ...data,
      });
      return;
    }
    // No homeassistant.toggle — avoid state flash on shortcuts
    this._moreInfo(id);
  }

  private _toggleCollapse = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
    const entityId = this._collapseEntity();
    if (entityId && this.hass) {
      this.hass.callService("input_boolean", "toggle", {
        entity_id: entityId,
      });
      this.updateComplete.then(() => this._applyLayoutSize());
      return;
    }
    this._localCollapsed = !this._localCollapsed;
    this.updateComplete.then(() => this._applyLayoutSize());
  };

  /** After collapse/expand, drop forced row spans so auto height reflows */
  private _applyLayoutSize() {
    this.style.height = "auto";
    this.style.alignSelf = "start";
    this.style.removeProperty("--row-size");

    // hui-card wrapper is the actual grid item in sections view
    let el: HTMLElement | null = this.parentElement;
    for (let i = 0; i < 4 && el; i++) {
      el.style.height = "auto";
      el.style.alignSelf = "start";
      el.style.removeProperty("--row-size");
      el.style.removeProperty("grid-row-end");
      if (el.tagName.includes("HUI-CARD") || el.classList.contains("card")) {
        break;
      }
      el = el.parentElement;
    }

    this.dispatchEvent(
      new CustomEvent("iron-resize", { bubbles: true, composed: true }),
    );
    window.dispatchEvent(new Event("resize"));
  }

  protected firstUpdated() {
    this._applyLayoutSize();
    this._syncDarkAttr();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("_localCollapsed")) {
      this._applyLayoutSize();
    }
    if (changed.has("hass")) {
      this._syncDarkAttr();
      // Collapse via input_boolean updates through hass — reflow height
      if (this._collapseEntity()) this._applyLayoutSize();
    }
  }

  /** Original chips/pills use a stronger shadow when hass.themes.darkMode */
  private _syncDarkAttr() {
    if (this.hass?.themes?.darkMode) this.setAttribute("dark", "");
    else this.removeAttribute("dark");
  }

  private _navigate(path: string) {
    const url = path.startsWith("/") ? path : `/${path}`;
    window.history.pushState(null, "", url);
    window.dispatchEvent(
      new CustomEvent("location-changed", {
        detail: { replace: false },
        bubbles: true,
        composed: true,
      }),
    );
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

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      margin: 0;
      padding: 0;
      background: transparent;
      box-sizing: border-box;
    }

    ha-card.ulm-welcome {
      height: auto;
      width: 100%;
      box-sizing: border-box;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      /* Original card padding — no extra HA card padding */
      padding: 10px;
      margin: 0;
      background: var(--card-background-color, #fafafa);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 0;
      transition: none;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px;
      gap: 8px;
      flex-shrink: 0;
    }

    .chip {
      border: 0;
      cursor: pointer;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: var(--card-background-color, #fff);
      /* chips.yaml — light: var(--box-shadow); dark: hard shadow */
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      /* Original chips template */
      font-family: inherit;
      font-size: 14px;
      font-weight: bold;
      line-height: 100%;
      padding: 0 6px;
      height: 36px;
      border-radius: 18px;
      width: auto;
    }

    :host([dark]) .chip {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .chip:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .chip.round {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      padding: 0;
    }

    .chip.round ha-icon {
      --mdc-icon-size: 18px;
      pointer-events: none;
    }

    /* Welcome topbar overrides chip width to 100px */
    .chip.weather {
      width: 100px;
      min-width: 100px;
      padding: 0 6px;
      white-space: nowrap;
    }

    .chip.weather span {
      font-size: 14px;
      font-weight: bold;
      line-height: 100%;
      padding: 0 6px;
    }

    .greeting {
      /* Original item2: margin-left 16px, padding-bottom 8px */
      margin: 0;
      padding: 0 0 8px 16px;
      text-align: left;
      flex-shrink: 0;
    }

    .greeting .line {
      font-weight: bold;
      font-size: 24px;
      line-height: 1.15;
      color: var(--primary-text-color);
    }

    .pills {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      flex-wrap: nowrap;
      gap: 12px;
      margin: 0;
      padding: 0;
      flex-shrink: 0;
    }

    .pills .empty {
      opacity: 0.5;
      font-size: 12px;
      text-align: center;
      width: 100%;
      padding: 16px;
    }

    /* card_scenes_pill_welcome — width 52px, height 84px, row-gap 12px */
    .pill {
      width: 52px;
      min-width: 52px;
      height: 84px;
      box-sizing: border-box;
      border: 0;
      border-radius: 50px;
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 5px;
      cursor: pointer;
      color: inherit;
      font: inherit;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: none;
    }

    :host([dark]) .pill {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .pill:hover,
    .pill:focus,
    .pill:active {
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      outline: none;
    }

    .pill-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--pill-bg);
      flex-shrink: 0;
    }

    .pill-icon ha-icon {
      --mdc-icon-size: 20px;
      color: var(--pill-color);
    }

    /*
     * Original name styles + item2 card:
     * padding-bottom 7px, padding 0 5px 5px, margin-top -5px
     */
    .pill-name {
      font-weight: bold;
      font-size: 9.5px;
      line-height: 1.1;
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: -5px;
      padding: 0 5px 7px;
      box-sizing: border-box;
    }
  `;
}
