/**
 * Lit port of custom_cards/custom_card_esh_welcome/custom_card_esh_welcome.yaml
 * Welcome topbar + time-based greeting + up to 5 nav pills.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  colorField,
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../../shared/config-form";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

export interface EshWelcomeNavConfig {
  /** Optional HA entity (friendly name / icon fallback; optional active tint) */
  entity?: string;
  entity_id?: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor | string;
  /** Navigation path — short key */
  path?: string;
  /** Alias used by official welcome Lit card */
  nav_path?: string;
  /** Alias used by original YAML (`entity.nav`) */
  nav?: string;
}

export interface UlmCustomEshWelcomeCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-esh-welcome-card";
  /** Short key */
  weather?: string;
  /** Legacy YAML variable */
  ulm_weather?: string;
  /** Short key — optional input_boolean; when on, hide nav row */
  collapse?: string;
  /** Legacy YAML variable */
  ulm_card_esh_welcome_collapse?: string;
  entity_1?: EshWelcomeNavConfig | string;
  entity_2?: EshWelcomeNavConfig | string;
  entity_3?: EshWelcomeNavConfig | string;
  entity_4?: EshWelcomeNavConfig | string;
  entity_5?: EshWelcomeNavConfig | string;
}

const ENTITY_KEYS = [
  "entity_1",
  "entity_2",
  "entity_3",
  "entity_4",
  "entity_5",
] as const;

const PILL_COLORS = [
  "yellow",
  "blue",
  "red",
  "purple",
  "green",
  "pink",
] as const satisfies readonly UlmThemeColor[];

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

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asObj(raw: unknown): Record<string, unknown> | undefined {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return undefined;
}

/** Stable color from a seed string (replaces YAML Math.random). */
function hashColor(seed: string): UlmThemeColor {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return PILL_COLORS[h % PILL_COLORS.length];
}

function parseNav(
  raw: unknown,
  flat?: {
    entity?: unknown;
    name?: unknown;
    icon?: unknown;
    color?: unknown;
    path?: unknown;
    nav_path?: unknown;
    nav?: unknown;
  },
): EshWelcomeNavConfig {
  if (typeof raw === "string" && raw.length) {
    return {
      entity: raw,
      name: typeof flat?.name === "string" ? flat.name : undefined,
      icon: typeof flat?.icon === "string" ? flat.icon : undefined,
      color: typeof flat?.color === "string" ? flat.color : undefined,
      path:
        (typeof flat?.path === "string" && flat.path) ||
        (typeof flat?.nav_path === "string" && flat.nav_path) ||
        (typeof flat?.nav === "string" && flat.nav) ||
        undefined,
    };
  }
  const o = asObj(raw);
  if (!o) {
    // Flat-only entity_N + name_N / path_N without nested object
    if (typeof flat?.entity === "string" && flat.entity) {
      return {
        entity: flat.entity,
        name: typeof flat?.name === "string" ? flat.name : undefined,
        icon: typeof flat?.icon === "string" ? flat.icon : undefined,
        color: typeof flat?.color === "string" ? flat.color : undefined,
        path:
          (typeof flat?.path === "string" && flat.path) ||
          (typeof flat?.nav_path === "string" && flat.nav_path) ||
          (typeof flat?.nav === "string" && flat.nav) ||
          undefined,
      };
    }
    return {};
  }
  const entity =
    (typeof o.entity === "string" && o.entity) ||
    (typeof o.entity_id === "string" && o.entity_id) ||
    undefined;
  const path =
    (typeof o.path === "string" && o.path) ||
    (typeof o.nav_path === "string" && o.nav_path) ||
    (typeof o.nav === "string" && o.nav) ||
    (typeof flat?.path === "string" && flat.path) ||
    (typeof flat?.nav_path === "string" && flat.nav_path) ||
    (typeof flat?.nav === "string" && flat.nav) ||
    undefined;
  return {
    entity,
    entity_id: entity,
    name:
      (typeof o.name === "string" && o.name) ||
      (typeof flat?.name === "string" && flat.name) ||
      undefined,
    icon:
      (typeof o.icon === "string" && o.icon) ||
      (typeof flat?.icon === "string" && flat.icon) ||
      undefined,
    color:
      (typeof o.color === "string" && o.color) ||
      (typeof flat?.color === "string" && flat.color) ||
      undefined,
    path,
    nav_path: path,
    nav: path,
  };
}

function navPathOf(conf: EshWelcomeNavConfig): string | undefined {
  return conf.path || conf.nav_path || conf.nav || undefined;
}

function entityIdOf(conf: EshWelcomeNavConfig): string | undefined {
  return conf.entity || conf.entity_id || undefined;
}

function pillSchema(n: number) {
  return {
    type: "expandable" as const,
    name: `entity_${n}`,
    title: `Nav ${n}`,
    schema: [
      entityField("entity", undefined, false),
      {
        type: "grid" as const,
        name: "",
        flatten: true,
        schema: [textField("name"), iconField("icon")],
      },
      textField("path"),
      colorField("color"),
    ],
  };
}

function cleanNav(ent: EshWelcomeNavConfig): EshWelcomeNavConfig | undefined {
  const cleaned: EshWelcomeNavConfig = {};
  for (const [k, v] of Object.entries(ent)) {
    if (v === "" || v == null) continue;
    (cleaned as Record<string, unknown>)[k] = v;
  }
  return Object.keys(cleaned).length ? cleaned : undefined;
}

@customElement("ulm-custom-card-esh-welcome-card")
export class UlmCustomEshWelcomeCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomEshWelcomeCardConfig;
  @state() private _navs: EshWelcomeNavConfig[] = [];
  @state() private _localCollapsed = false;

  public static getConfigForm() {
    return {
      schema: [
        entityField("weather", "weather", false),
        entityField("collapse", "input_boolean", false),
        pillSchema(1),
        pillSchema(2),
        pillSchema(3),
        pillSchema(4),
        pillSchema(5),
      ],
      computeLabel: labels({
        weather: "Weather (weather / ulm_weather)",
        collapse: "Collapse toggle (collapse / ulm_card_esh_welcome_collapse)",
        entity: "Entity (optional)",
        name: "Name",
        icon: "Icon",
        path: "Navigation path",
        color: "Icon color",
      }),
      computeHelper: helpers({
        weather: "Weather entity for the topbar chip (emoji + date).",
        collapse:
          "Optional input_boolean. When on, the nav row is hidden. Chevron toggles it.",
        entity: "Optional. Used for name/icon fallback when not set explicitly.",
        path: "View path on tap, e.g. /lovelace/lights or lights. Aliases: nav_path, nav.",
        color:
          "Theme color (yellow/blue/red/purple/green/pink). If omitted, a stable hash from the entity/path is used.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomEshWelcomeCardConfig> {
    return {
      weather: "weather.demo_weather_north",
      entity_1: {
        name: "Home",
        icon: "mdi:home",
        color: "blue",
        path: "/lovelace/0",
      },
      entity_2: {
        name: "Lights",
        icon: "mdi:lightbulb",
        color: "yellow",
        path: "/lovelace/0",
      },
      entity_3: {
        name: "Secure",
        icon: "mdi:shield",
        color: "green",
        path: "/lovelace/0",
      },
      entity_4: {
        name: "Climate",
        icon: "mdi:thermometer",
        color: "purple",
        path: "/lovelace/0",
      },
      entity_5: {
        name: "Media",
        icon: "mdi:speaker",
        color: "red",
        path: "/lovelace/0",
      },
    };
  }

  public setConfig(config: UlmCustomEshWelcomeCardConfig): void {
    const c = config as UlmCustomEshWelcomeCardConfig & Record<string, unknown>;
    const weather =
      (pick(c, "weather", "ulm_weather") as string | undefined) || undefined;
    const collapse =
      (pick(c, "collapse", "ulm_card_esh_welcome_collapse") as
        | string
        | undefined) || undefined;

    const next: UlmCustomEshWelcomeCardConfig = {
      ...config,
      weather,
      ulm_weather: weather,
      collapse,
      ulm_card_esh_welcome_collapse: collapse,
      type: "custom:ulm-custom-card-esh-welcome-card",
    };

    const navs: EshWelcomeNavConfig[] = [];
    for (const key of ENTITY_KEYS) {
      const n = Number(key.slice(-1));
      const parsed = parseNav(c[key], {
        entity: c[key] === undefined ? c[`entity_${n}`] : undefined,
        name: c[`name_${n}`] ?? c[`entity_${n}_name`],
        icon: c[`icon_${n}`] ?? c[`entity_${n}_icon`],
        color: c[`color_${n}`] ?? c[`entity_${n}_color`],
        path: c[`path_${n}`] ?? c[`entity_${n}_path`],
        nav_path: c[`nav_path_${n}`] ?? c[`entity_${n}_nav_path`],
        nav: c[`nav_${n}`] ?? c[`entity_${n}_nav`],
      });
      const cleaned = cleanNav(parsed);
      if (cleaned) {
        next[key] = cleaned;
        navs.push(cleaned);
      } else {
        delete next[key];
      }
    }

    this._navs = navs;
    this._config = next;
  }

  public getCardSize(): number {
    return this._isCollapsed() ? 2 : 4;
  }

  public getGridOptions() {
    return {
      columns: 12 as const,
      min_columns: 6,
    };
  }

  private _collapseEntity(): string | undefined {
    const id =
      this._config?.collapse || this._config?.ulm_card_esh_welcome_collapse;
    return id && typeof id === "string" && id.length ? id : undefined;
  }

  private _weatherEntity(): string | undefined {
    const id = this._config?.weather || this._config?.ulm_weather;
    return id && typeof id === "string" && id.length ? id : undefined;
  }

  private _isCollapsed(): boolean {
    const entityId = this._collapseEntity();
    if (entityId && this.hass?.states[entityId]) {
      return this.hass.states[entityId].state === "on";
    }
    // No collapse entity → never hide nav (YAML: collapse only when configured)
    if (!entityId) return false;
    return this._localCollapsed;
  }

  private _userName(): string {
    return this.hass?.user?.name?.trim() || "there";
  }

  private _greeting(): string {
    const hour = new Date().getHours();
    if (hour >= 18) return "Good evening";
    if (hour >= 12) return "Good afternoon";
    if (hour >= 5) return "Good morning";
    return "Hello";
  }

  private _configuredNavs(): EshWelcomeNavConfig[] {
    return this._navs.filter((conf) => {
      const path = navPathOf(conf);
      return !!(path || conf.name || entityIdOf(conf) || conf.icon);
    });
  }

  private _pillColor(conf: EshWelcomeNavConfig, index: number): UlmThemeColor {
    const raw = (conf.color || "").toString().toLowerCase();
    if ((PILL_COLORS as readonly string[]).includes(raw)) {
      return raw as UlmThemeColor;
    }
    const seed =
      entityIdOf(conf) || navPathOf(conf) || conf.name || `nav-${index}`;
    return hashColor(seed);
  }

  /** YAML scale: fewer pills → larger pills (min count treated as 3). */
  private _pillScale(count: number): number {
    return 1 + (5 - Math.max(count, 3)) * 0.25;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const collapsed = this._isCollapsed();
    const navs = this._configuredNavs().filter((c) => navPathOf(c));
    const scale = this._pillScale(navs.length);

    return html`
      <ha-card
        class=${collapsed ? "ulm-esh-welcome collapsed" : "ulm-esh-welcome"}
      >
        ${this._renderTopbar()}
        ${this._renderGreeting()}
        ${collapsed || !navs.length
          ? nothing
          : html`
              <div class="nav-row">
                ${navs.map((conf, i) => this._renderNav(conf, i, scale))}
              </div>
            `}
      </ha-card>
    `;
  }

  private _renderTopbar() {
    const weatherId = this._weatherEntity();
    const weather = weatherId ? this.hass!.states[weatherId] : undefined;
    const collapsed = this._isCollapsed();
    const collapseId = this._collapseEntity();

    const formattedDate = new Date().toLocaleDateString(
      this.hass!.language || undefined,
      { month: "short", day: "numeric" },
    );
    const emoji =
      WEATHER_EMOJI[weather?.state || ""] || WEATHER_EMOJI.default;
    const weatherLabel = `${emoji} ${formattedDate}`;

    return html`
      <div class="topbar">
        ${collapseId
          ? html`
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
            `
          : html`<span class="chip-spacer"></span>`}

        <button
          type="button"
          class="chip weather"
          ?disabled=${!weather}
          @click=${() => weatherId && this._moreInfo(weatherId)}
        >
          <span>${weatherLabel}</span>
        </button>

        <button
          type="button"
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
    return html`
      <div class="greeting">
        <div class="line">${this._greeting()},</div>
        <div class="line">${this._userName()}!</div>
      </div>
    `;
  }

  private _renderNav(conf: EshWelcomeNavConfig, index: number, scale: number) {
    const entityId = entityIdOf(conf);
    const stateObj = entityId ? this.hass!.states[entityId] : undefined;
    const color = this._pillColor(conf, index);
    const rgb = resolveThemeRgb(this, color);
    const name =
      conf.name ||
      stateObj?.attributes.friendly_name ||
      entityId?.split(".").pop() ||
      "";
    const icon =
      conf.icon ||
      (stateObj?.attributes.icon as string | undefined) ||
      "mdi:circle-medium";
    const path = navPathOf(conf)!;

    const w = 52 * scale;
    const h = 84 * scale;
    const iconBox = 42 * scale;
    const iconSize = 20 * scale;
    const nameSize = 9.5 * scale;
    const nameW = 33 * scale;

    return html`
      <button
        type="button"
        class="nav-pill"
        style=${styleMap({
          "--pill-color": `rgb(${rgb})`,
          "--pill-bg": `rgba(${rgb}, 0.2)`,
          width: `${w}px`,
          minWidth: `${w}px`,
          height: `${h}px`,
          "--icon-box": `${iconBox}px`,
          "--icon-size": `${iconSize}px`,
          "--name-size": `${nameSize}px`,
          "--name-width": `${nameW}px`,
        })}
        @click=${() => this._navigate(path)}
      >
        <span class="pill-icon">
          <ha-icon .icon=${icon}></ha-icon>
        </span>
        <span class="pill-name">${name}</span>
      </button>
    `;
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

  private _applyLayoutSize() {
    this.style.height = "auto";
    this.style.alignSelf = "start";
    this.style.removeProperty("--row-size");

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
      if (this._collapseEntity()) this._applyLayoutSize();
    }
  }

  private _syncDarkAttr() {
    if (this.hass?.themes?.darkMode) this.setAttribute("dark", "");
    else this.removeAttribute("dark");
  }

  private _navigate(path: string) {
    const url = path.startsWith("/") ? path : `/${path}`;
    // Prefer hass.navigate when available (HA frontend)
    const hassNav = (this.hass as HomeAssistant & {
      navigate?: (path: string) => void;
    })?.navigate;
    if (typeof hassNav === "function") {
      hassNav(url);
      return;
    }
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

    ha-card.ulm-esh-welcome {
      height: auto;
      width: 100%;
      box-sizing: border-box;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
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

    .chip-spacer {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }

    .chip {
      border: 0;
      cursor: pointer;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0;
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

    .nav-row {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      flex-wrap: nowrap;
      gap: 12px;
      margin: 0;
      padding: 4px;
      flex-shrink: 0;
    }

    .nav-pill {
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

    :host([dark]) .nav-pill {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .nav-pill:hover,
    .nav-pill:focus,
    .nav-pill:active {
      background: var(--card-background-color, #fff);
      outline: none;
    }

    .pill-icon {
      width: var(--icon-box, 42px);
      height: var(--icon-box, 42px);
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--pill-bg);
      flex-shrink: 0;
    }

    .pill-icon ha-icon {
      --mdc-icon-size: var(--icon-size, 20px);
      color: var(--pill-color);
    }

    .pill-name {
      font-weight: bold;
      font-size: var(--name-size, 9.5px);
      line-height: 1.1;
      text-align: center;
      width: var(--name-width, 33px);
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
