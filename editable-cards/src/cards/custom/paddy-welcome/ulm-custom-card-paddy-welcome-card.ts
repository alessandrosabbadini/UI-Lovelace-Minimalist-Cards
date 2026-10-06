/**
 * Lit port of custom_cards/custom_card_paddy_welcome/custom_card_paddy_welcome.yaml
 * Time-based greeting (+ optional weather-forecast or home-feed row).
 */
import {
  LitElement,
  PropertyValues,
  css,
  html,
  nothing,
} from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
  entityField,
  grid,
  helpers,
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

export type PaddyWelcomeVariant = "basic" | "weather" | "news";

export interface UlmCustomPaddyWelcomeCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-paddy-welcome-card";
  /** Auto when omitted: news_entities → news, weather → weather, else basic */
  variant?: PaddyWelcomeVariant;
  time?: string;
  weather?: string;
  /** Entity id list for custom:home-feed-card */
  news_entities?: string[];
  ulm_morning?: string;
  ulm_afternoon?: string;
  ulm_evening?: string;
  ulm_hello?: string;
}

const GREETING_DEFAULTS = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  hello: "Hello",
} as const;

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

function asEntityList(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((x): x is string => typeof x === "string" && !!x);
  }
  if (typeof raw === "string" && raw.trim()) {
    return raw
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function resolveVariant(
  c: Record<string, unknown>,
  news: string[],
  weather?: string,
): PaddyWelcomeVariant {
  const explicit = asStr(pick(c, "variant"));
  if (explicit === "basic" || explicit === "weather" || explicit === "news") {
    return explicit;
  }
  if (news.length) return "news";
  if (weather) return "weather";
  return "basic";
}

@customElement("ulm-custom-card-paddy-welcome-card")
export class UlmCustomPaddyWelcomeCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomPaddyWelcomeCardConfig;
  @query(".secondary-host") private _secondaryHost?: HTMLDivElement;

  private _secondaryEl?: LovelaceCard & HTMLElement;
  private _secondaryKey = "";
  private _secondaryLoading = false;
  private _secondaryDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        selectField("variant", [
          { value: "basic", label: "Greeting only" },
          { value: "weather", label: "Greeting + weather" },
          { value: "news", label: "Greeting + home feed" },
        ]),
        entityField("time", "sensor", false),
        entityField("weather", "weather", false),
        textField("news_entities"),
        grid([
          textField("ulm_morning"),
          textField("ulm_afternoon"),
          textField("ulm_evening"),
          textField("ulm_hello"),
        ]),
      ],
      computeLabel: labels({
        variant: "Layout variant",
        time: "Time sensor (ulm_custom_card_paddy_welcome_time)",
        weather: "Weather (ulm_custom_card_paddy_welcome_weather_provider)",
        news_entities: "News entities (ulm_custom_card_paddy_welcome_news_entities)",
        ulm_morning: "Morning greeting",
        ulm_afternoon: "Afternoon greeting",
        ulm_evening: "Evening greeting",
        ulm_hello: "Night greeting",
      }),
      computeHelper: helpers({
        variant:
          "Leave on auto-detect: news list → news, weather entity → weather, else basic only.",
        time: "Sensor state compared as HH:MM (e.g. sensor.time). Falls back to local clock.",
        weather: "Embedded weather-forecast card (show_forecast: false).",
        news_entities:
          "Comma- or newline-separated entity ids for custom:home-feed-card.",
        ulm_morning: "From ulm_language_variables when omitted.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomPaddyWelcomeCardConfig> {
    return {
      variant: "basic",
      time: "sensor.time",
      ulm_morning: GREETING_DEFAULTS.morning,
      ulm_afternoon: GREETING_DEFAULTS.afternoon,
      ulm_evening: GREETING_DEFAULTS.evening,
      ulm_hello: GREETING_DEFAULTS.hello,
    };
  }

  public setConfig(config: UlmCustomPaddyWelcomeCardConfig): void {
    const c = config as UlmCustomPaddyWelcomeCardConfig &
      Record<string, unknown>;
    const time = asStr(
      pick(c, "time", "ulm_custom_card_paddy_welcome_time"),
    );
    const weather = asStr(
      pick(c, "weather", "ulm_custom_card_paddy_welcome_weather_provider"),
    );
    const news_entities = asEntityList(
      pick(c, "news_entities", "ulm_custom_card_paddy_welcome_news_entities"),
    );
    const variant = resolveVariant(c, news_entities, weather);

    this._config = {
      ...config,
      variant,
      time,
      weather,
      news_entities,
      ulm_morning: asStr(pick(c, "ulm_morning")) || GREETING_DEFAULTS.morning,
      ulm_afternoon:
        asStr(pick(c, "ulm_afternoon")) || GREETING_DEFAULTS.afternoon,
      ulm_evening: asStr(pick(c, "ulm_evening")) || GREETING_DEFAULTS.evening,
      ulm_hello: asStr(pick(c, "ulm_hello")) || GREETING_DEFAULTS.hello,
      type: "custom:ulm-custom-card-paddy-welcome-card",
    };
    this._secondaryKey = "";
  }

  public getCardSize(): number {
    return this._config?.variant === "basic" ? 2 : 4;
  }

  public getGridOptions() {
    return {
      columns: 12 as const,
      min_columns: 6,
      rows: "auto" as const,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (
      changed.has("_config") ||
      changed.has("hass") ||
      !this._secondaryEl
    ) {
      void this._syncSecondary();
    } else if (this._secondaryEl) {
      this._secondaryEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const variant = this._config.variant || "basic";
    const greeting = this._greetingLine();

    return html`
      <ha-card class="ulm-card ulm-paddy-welcome">
        <div class="stack">
          <div class="greeting-block">
            <div class="greeting">${greeting},</div>
            <div class="greeting user">${this._userName()}!</div>
          </div>
          ${variant === "basic"
            ? nothing
            : html`<div class="secondary-host"></div>`}
        </div>
      </ha-card>
    `;
  }

  private _userName(): string {
    return this.hass?.user?.name?.trim() || "there";
  }

  /** YAML compares sensor.time state as HH:MM strings. */
  private _timeString(): string {
    const id = this._config?.time;
    if (id && this.hass?.states[id]) {
      return String(this.hass.states[id].state);
    }
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  }

  private _greetingLine(): string {
    const cfg = this._config!;
    const time = this._timeString();
    if (time > "18:00") return cfg.ulm_evening || GREETING_DEFAULTS.evening;
    if (time > "12:00") return cfg.ulm_afternoon || GREETING_DEFAULTS.afternoon;
    if (time > "05:00") return cfg.ulm_morning || GREETING_DEFAULTS.morning;
    return cfg.ulm_hello || GREETING_DEFAULTS.hello;
  }

  private _buildSecondaryConfig(): LovelaceCardConfig | undefined {
    const cfg = this._config!;
    if (cfg.variant === "weather" && cfg.weather) {
      return {
        type: "weather-forecast",
        entity: cfg.weather,
        show_forecast: false,
      };
    }
    if (cfg.variant === "news" && cfg.news_entities?.length) {
      return {
        type: "custom:home-feed-card",
        card_id: "main_feed",
        show_empty: false,
        more_info_on_tap: true,
        state_color: false,
        compact_mode: true,
        max_item_count: 3,
        show_icons: true,
        entities: cfg.news_entities,
      };
    }
    return undefined;
  }

  private async _syncSecondary(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (this._config.variant === "basic") {
      this._secondaryEl = undefined;
      this._secondaryHost?.replaceChildren();
      return;
    }
    if (this._secondaryLoading) {
      this._secondaryDirty = true;
      return;
    }
    this._secondaryLoading = true;
    this._secondaryDirty = false;
    try {
      await this.updateComplete;
      const host = this._secondaryHost;
      if (!host) {
        this._secondaryDirty = true;
        return;
      }
      const secConfig = this._buildSecondaryConfig();
      if (!secConfig) {
        host.replaceChildren();
        this._secondaryEl = undefined;
        return;
      }
      const key = JSON.stringify(secConfig);
      if (!this._secondaryEl || key !== this._secondaryKey) {
        this._secondaryKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._secondaryEl = helpersApi.createCardElement(
            secConfig,
          ) as LovelaceCard & HTMLElement;
        } else {
          const tag =
            secConfig.type === "weather-forecast"
              ? "hui-weather-forecast-card"
              : undefined;
          if (!tag) {
            host.replaceChildren();
            return;
          }
          const el = document.createElement(tag) as LovelaceCard & HTMLElement;
          el.setConfig(secConfig);
          this._secondaryEl = el;
        }
        this._secondaryEl.hass = this.hass;
        host.replaceChildren(this._secondaryEl);
      } else {
        this._secondaryEl.hass = this.hass;
      }
    } finally {
      this._secondaryLoading = false;
      if (this._secondaryDirty) {
        this._secondaryDirty = false;
        void this._syncSecondary();
      }
    }
  }

  static styles = [
    ulmCardStyles,
    css`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-paddy-welcome {
        height: auto;
        cursor: default;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .greeting-block {
        border-radius: 14px;
        box-shadow: none;
        text-align: left;
        line-height: 1.15;
      }

      .greeting {
        font-size: 30px;
        font-weight: bold;
        color: var(--primary-text-color);
      }

      .secondary-host {
        min-height: 0;
      }

      .secondary-host ::slotted(*),
      .secondary-host > * {
        display: block;
      }

      .secondary-host ha-card,
      .secondary-host hui-weather-forecast-card {
        border-radius: 14px !important;
        box-shadow: none !important;
      }

      .secondary-host hui-weather-forecast-card .state,
      .secondary-host hui-weather-forecast-card .name {
        text-align: left;
        font-size: 14px;
      }

      .secondary-host hui-weather-forecast-card .state {
        font-weight: bolder;
      }

      .secondary-host hui-weather-forecast-card .temp-attribute,
      .secondary-host hui-weather-forecast-card .temp,
      .secondary-host hui-weather-forecast-card .temp span,
      .secondary-host hui-weather-forecast-card .attribute {
        text-align: right;
      }

      .secondary-host hui-weather-forecast-card .temp,
      .secondary-host hui-weather-forecast-card .temp span {
        font-size: medium;
        font-weight: bolder;
        margin-right: 16px;
      }

      .secondary-host hui-weather-forecast-card .attribute {
        font-size: smaller;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-paddy-welcome-card": UlmCustomPaddyWelcomeCard;
  }
}
