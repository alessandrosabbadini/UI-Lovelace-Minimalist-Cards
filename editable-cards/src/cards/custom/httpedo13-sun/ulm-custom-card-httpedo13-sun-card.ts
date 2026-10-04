/**
 * Lit port of custom_cards/custom_card_httpedo13_sun/custom_card_httpedo13_sun.yaml
 * Minimalist shell + nested HACS custom:sun-card (AitorDB).
 */
import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
  booleanField,
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

const SUN_TAG = "sun-card";

const TIME_FORMATS = [
  { value: "24h", label: "24h" },
  { value: "12h", label: "12h" },
] as const;

const LANGUAGES = [
  "da",
  "de",
  "en",
  "es",
  "et",
  "fi",
  "fr",
  "hu",
  "it",
  "nl",
  "pl",
  "pt-BR",
  "ru",
  "sl",
  "sv",
].map((v) => ({ value: v, label: v }));

const DARK_MODE_OPTIONS = [
  { value: "auto", label: "HA theme (auto)" },
  { value: "true", label: "Dark" },
  { value: "false", label: "Light" },
];

export interface UlmCustomHttpedo13SunCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-httpedo13-sun-card";
  title?: string;
  language?: string;
  /** auto | true | false — YAML default follows hass.themes.darkMode */
  dark_mode?: "auto" | "true" | "false" | boolean;
  show_azimuth?: boolean;
  show_elevation?: boolean;
  time_format?: "12h" | "24h";
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function asDarkMode(
  raw: unknown,
): "auto" | "true" | "false" {
  if (raw === true || raw === "true" || raw === "on") return "true";
  if (raw === false || raw === "false" || raw === "off") return "false";
  return "auto";
}

@customElement("ulm-custom-card-httpedo13-sun-card")
export class UlmCustomHttpedo13SunCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomHttpedo13SunCardConfig;
  @state() private _sunMissing = false;
  @query(".sun-host") private _sunHost?: HTMLDivElement;

  private _sunEl?: LovelaceCard & HTMLElement;
  private _sunKey = "";
  private _sunLoading = false;
  private _sunDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        textField("title"),
        selectField("language", [
          { value: "", label: "HA language (auto)" },
          ...LANGUAGES,
        ]),
        selectField("dark_mode", DARK_MODE_OPTIONS),
        selectField("time_format", [...TIME_FORMATS]),
        booleanField("show_azimuth"),
        booleanField("show_elevation"),
      ],
      computeLabel: labels({
        title: "Title (sun-card title)",
        language: "Language",
        dark_mode: "Dark mode",
        time_format: "Time format (timeFormat)",
        show_azimuth: "Show azimuth (showAzimuth)",
        show_elevation: "Show elevation (showElevation)",
      }),
      computeHelper: helpers({
        title: "Empty = no title (sun-card default)",
        language:
          "Supported: da, de, en, es, et, fi, fr, hu, it, nl, pl, pt-BR, ru, sl, sv. Empty uses hass.language.",
        dark_mode:
          "Original YAML always mirrors hass.themes.darkMode unless overridden",
        time_format: "YAML default is 24h",
        show_azimuth: "Requires HACS sun-card + Sun integration",
        show_elevation: "Requires HACS sun-card + Sun integration",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomHttpedo13SunCardConfig> {
    return {
      dark_mode: "auto",
      time_format: "24h",
      show_azimuth: false,
      show_elevation: false,
    };
  }

  public setConfig(config: UlmCustomHttpedo13SunCardConfig): void {
    const c = config as UlmCustomHttpedo13SunCardConfig &
      Record<string, unknown>;

    const timeRaw = pick(c, "time_format", "timeFormat");
    let time_format: "12h" | "24h" = "24h";
    if (timeRaw === "12h" || timeRaw === "24h") {
      time_format = timeRaw;
    }

    const langRaw = pick(c, "language");
    const language =
      typeof langRaw === "string" && langRaw.trim()
        ? langRaw.trim()
        : undefined;

    const titleRaw = pick(c, "title");
    this._config = {
      ...config,
      title: typeof titleRaw === "string" ? titleRaw : undefined,
      language,
      dark_mode: asDarkMode(pick(c, "dark_mode", "darkMode")),
      show_azimuth: asBool(pick(c, "show_azimuth", "showAzimuth"), false),
      show_elevation: asBool(
        pick(c, "show_elevation", "showElevation"),
        false,
      ),
      time_format,
      type: "custom:ulm-custom-card-httpedo13-sun-card",
    };
    this._sunKey = "";
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (
      changed.has("_config") ||
      changed.has("hass") ||
      !this._sunEl ||
      this._sunMissing
    ) {
      void this._syncSun();
    } else if (this._sunEl) {
      this._sunEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <ha-card class="ulm-card ulm-httpedo13-sun">
        ${this._sunMissing
          ? html`<div class="missing-dep">
              Install <strong>sun-card</strong> from HACS
              (AitorDB/home-assistant-sun-card) and enable the
              <strong>Sun</strong> integration.
            </div>`
          : html`<div class="sun-host"></div>`}
      </ha-card>
    `;
  }

  private _resolveDarkMode(): boolean {
    const mode = this._config!.dark_mode ?? "auto";
    if (mode === "true" || mode === true) return true;
    if (mode === "false" || mode === false) return false;
    return !!this.hass?.themes?.darkMode;
  }

  private _buildSunConfig(): LovelaceCardConfig {
    const cfg = this._config!;
    const nested: LovelaceCardConfig = {
      type: `custom:${SUN_TAG}`,
      darkMode: this._resolveDarkMode(),
      language: cfg.language || this.hass?.language || "en",
      showAzimuth: !!cfg.show_azimuth,
      showElevation: !!cfg.show_elevation,
      timeFormat: cfg.time_format || "24h",
      card_mod: {
        style: `
          ha-card.type-custom-sun-card,
          ha-card {
            border-radius: 14px !important;
            box-shadow: none !important;
            border: none !important;
          }
        `,
      },
    };
    if (cfg.title) {
      nested.title = cfg.title;
    }
    return nested;
  }

  private async _syncSun(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (this._sunLoading) {
      this._sunDirty = true;
      return;
    }
    this._sunLoading = true;
    this._sunDirty = false;
    try {
      const available = await this._ensureSunLoaded();
      if (!available) {
        if (!this._sunMissing) this._sunMissing = true;
        return;
      }
      if (this._sunMissing) this._sunMissing = false;

      await this.updateComplete;
      const host = this._sunHost;
      if (!host) {
        this._sunDirty = true;
        return;
      }

      const sunConfig = this._buildSunConfig();
      const key = JSON.stringify(sunConfig);
      if (!this._sunEl || key !== this._sunKey) {
        this._sunKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._sunEl = helpersApi.createCardElement(
            sunConfig,
          ) as LovelaceCard & HTMLElement;
        } else {
          const el = document.createElement(SUN_TAG) as LovelaceCard &
            HTMLElement;
          el.setConfig(sunConfig);
          this._sunEl = el;
        }
        this._sunEl.hass = this.hass;
        host.replaceChildren(this._sunEl);
      } else {
        this._sunEl.hass = this.hass;
      }
    } finally {
      this._sunLoading = false;
      if (this._sunDirty) {
        this._sunDirty = false;
        void this._syncSun();
      }
    }
  }

  private async _ensureSunLoaded(): Promise<boolean> {
    if (customElements.get(SUN_TAG)) return true;
    try {
      await Promise.race([
        customElements.whenDefined(SUN_TAG),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 2500),
        ),
      ]);
    } catch {
      /* timeout */
    }
    return !!customElements.get(SUN_TAG);
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    /* YAML styles.card: padding 12px, radius, shadow */
    ha-card.ulm-card.ulm-httpedo13-sun {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      padding: 12px;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
      cursor: default;
    }

    .sun-host {
      width: 100%;
      min-width: 0;
      overflow: hidden;
      box-sizing: border-box;
    }

    .sun-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 4px 0;
    }
  `;
}
