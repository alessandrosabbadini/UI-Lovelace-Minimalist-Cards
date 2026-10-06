/**
 * Lit port of custom_cards/custom_card_imswel_medias/
 * Library (fanart) or upcoming (poster) media highlight from sensor data[].
 */
import { LitElement, css, html, nothing, svg, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  helpers,
  labels,
  numberField,
  selectField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

type MediaMode = "library" | "upcoming";
type MediaPlatform = "radarr" | "sonarr" | "plex";

interface MediaStrings {
  recentlyadded: string;
  in_theaters: string;
  weekday: string[];
  today: string;
  tommorow: string;
  locale: string;
}

const MEDIA_LANG: Record<"en" | "fr", MediaStrings> = {
  en: {
    recentlyadded: "Recently added",
    in_theaters: "in theathers",
    weekday: [
      "Sunday",
      "Monday",
      "Thuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    today: "Today",
    tommorow: "Tommorow",
    locale: "en-US",
  },
  fr: {
    recentlyadded: "Récemment ajouté",
    in_theaters: "au cinéma",
    weekday: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    today: "Aujourd'hui",
    tommorow: "Demain",
    locale: "fr-FR",
  },
};

const PLEX_ICON = svg`
  <svg viewBox="0 0 50 50" class="plex-icon" aria-hidden="true">
    <path
      d="M7.7.3h34.6c4.1 0 7.4 3.3 7.4 7.4v34.6c0 4.1-3.3 7.4-7.4 7.4H7.7c-4.1 0-7.4-3.3-7.4-7.4V7.7C.3 3.6 3.6.3 7.7.3z"
      fill="#282a2d"
    />
    <path
      d="M25,7.1H14.6L25,25L14.6,42.9H25L35.4,25L25,7.1z"
      fill="#e5a00d"
    />
  </svg>
`;

export interface UlmCustomImswelMediasCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-imswel-medias-card";
  entity: string;
  mode?: MediaMode;
  index?: number;
  platform?: MediaPlatform;
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

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseInt(String(raw ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
}

function asMode(raw: unknown): MediaMode {
  const s = String(raw ?? "").toLowerCase();
  if (s === "upcoming") return "upcoming";
  return "library";
}

function asPlatform(raw: unknown): MediaPlatform | undefined {
  const s = String(raw ?? "").toLowerCase();
  if (s === "radarr" || s === "sonarr" || s === "plex") return s;
  return undefined;
}

function detectPlatform(entityId: string): MediaPlatform {
  if (entityId.includes("sonarr")) return "sonarr";
  if (entityId.includes("plex")) return "plex";
  return "radarr";
}

function mediaLang(hass?: HomeAssistant): MediaStrings {
  const lang = (hass?.language || "en").split("-")[0].toLowerCase();
  return lang === "fr" ? MEDIA_LANG.fr : MEDIA_LANG.en;
}

function addDays(d: Date, days: number): Date {
  const date = new Date(d.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

@customElement("ulm-custom-card-imswel-medias-card")
export class UlmCustomImswelMediasCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomImswelMediasCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "sensor"),
        selectField("mode", [
          { value: "library", label: "Library (fanart)" },
          { value: "upcoming", label: "Upcoming (poster)" },
        ]),
        numberField("index"),
        selectField("platform", [
          { value: "radarr", label: "Radarr" },
          { value: "sonarr", label: "Sonarr" },
          { value: "plex", label: "Plex" },
        ]),
      ],
      computeLabel: labels({
        entity: "Media sensor (attributes.data)",
        mode: "Display mode",
        index: "Data array index",
        platform: "Platform (optional)",
      }),
      computeHelper: helpers({
        entity: "Sensor with attributes.data[] (fanart/poster, title, etc.)",
        mode: "Default library",
        index: "Legacy ulm_custom_card_imswel_medias_index (default 1)",
        platform:
          "Legacy ulm_custom_card_imswel_medias_platform — auto-detected from entity_id if empty",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomImswelMediasCardConfig> {
    return {
      entity: "sensor.plex_recently_added",
      mode: "library",
      index: 1,
    };
  }

  public setConfig(config: UlmCustomImswelMediasCardConfig): void {
    const c = config as UlmCustomImswelMediasCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    const mode = asMode(pick(c, "mode"));
    this._config = {
      ...config,
      entity,
      mode,
      index: asNum(
        pick(c, "index", "ulm_custom_card_imswel_medias_index"),
        1,
      ),
      platform: asPlatform(
        pick(c, "platform", "ulm_custom_card_imswel_medias_platform"),
      ),
      type: "custom:ulm-custom-card-imswel-medias-card",
    };
  }

  public getCardSize(): number {
    return this._config?.mode === "upcoming" ? 3 : 2;
  }

  /**
   * Standard HA section grid units (no CSS aspect-ratio):
   * - library (fanart): 6×2
   * - upcoming (poster): 3×4
   */
  public getGridOptions() {
    if (this._config?.mode === "upcoming") {
      return {
        columns: 3,
        min_columns: 2,
        max_columns: 6,
        rows: 4,
        min_rows: 2,
        max_rows: 6,
      };
    }
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: 2,
      min_rows: 1,
      max_rows: 4,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!changed.has("_config")) return;
    const prev = changed.get("_config") as
      | UlmCustomImswelMediasCardConfig
      | undefined;
    if (prev && prev.mode !== this._config?.mode) {
      this.dispatchEvent(
        new Event("ll-rebuild", { bubbles: true, composed: true }),
      );
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-imswel-medias"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const mode = this._config.mode || "library";
    const strings = mediaLang(this.hass);
    const unavailable =
      stateObj.state === "unavailable" ||
      stateObj.state === "undefined" ||
      stateObj.state === "unknown";

    if (mode === "library") {
      return this._renderLibrary(stateObj, strings, unavailable);
    }
    return this._renderUpcoming(stateObj, strings, unavailable);
  }

  private _dataItem(
    stateObj: { attributes: Record<string, unknown> },
    index: number,
  ): Record<string, unknown> | undefined {
    const data = stateObj.attributes.data;
    if (!Array.isArray(data) || index < 0 || index >= data.length) {
      return undefined;
    }
    const item = data[index];
    return item && typeof item === "object"
      ? (item as Record<string, unknown>)
      : undefined;
  }

  private _unavailableLabel(): string {
    const key = "state.default.unavailable";
    const t = this.hass?.localize?.(key);
    if (t && t !== key) return t;
    return "Unavailable";
  }

  private _renderLibrary(
    stateObj: { state: string; attributes: Record<string, unknown> },
    strings: MediaStrings,
    unavailable: boolean,
  ) {
    const cfg = this._config!;
    const index = cfg.index ?? 1;
    const item = unavailable ? undefined : this._dataItem(stateObj, index);
    const fanart =
      item && typeof item.fanart === "string" ? item.fanart : undefined;

    let titleLine = this._unavailableLabel();
    if (item) {
      const title = String(item.title ?? "");
      let number = "";
      if (item.number != null && item.number !== "") {
        number = String(item.number);
      } else if (typeof item.aired === "string") {
        number = `(${item.aired.split("-")[0]})`;
      }
      titleLine = `${title} ${number}`.trim();
    }

    const cardStyle = fanart
      ? {
          backgroundImage: `url("${fanart}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-imswel-medias": true,
          library: true,
        })}
        style=${styleMap(cardStyle)}
        @click=${this._moreInfo}
      >
        <div class="blur-overlay" aria-hidden="true"></div>
        <div class="library-grid">
          <div class="plex-wrap">${PLEX_ICON}</div>
          <div class="media-name">${strings.recentlyadded}</div>
          <div class="media-label">${titleLine}</div>
        </div>
      </ha-card>
    `;
  }

  private _renderUpcoming(
    stateObj: { state: string; attributes: Record<string, unknown> },
    strings: MediaStrings,
    unavailable: boolean,
  ) {
    const cfg = this._config!;
    const index = cfg.index ?? 1;
    const platform =
      cfg.platform || detectPlatform(cfg.entity);
    const item = unavailable ? undefined : this._dataItem(stateObj, index);
    const poster =
      item && typeof item.poster === "string" ? item.poster : undefined;

    let name = this._unavailableLabel();
    let label = "";
    if (item) {
      if (platform === "radarr") {
        name = String(item.title ?? "");
        const airdate = item.airdate ? new Date(String(item.airdate)) : null;
        if (airdate && !Number.isNaN(airdate.getTime())) {
          const datePart = this._formatDate(airdate, strings);
          const release =
            typeof item.release === "string"
              ? this._formatRelease(item.release, strings)
              : "";
          label = `${datePart}${release ? ` ${release}` : ""}`.trim();
        }
      } else if (platform === "sonarr") {
        const number = item.number != null ? String(item.number) : "";
        name = `${item.title ?? ""}${number ? ` - ${number}` : ""}`;
        const airdate = item.airdate ? new Date(String(item.airdate)) : null;
        if (airdate && !Number.isNaN(airdate.getTime())) {
          label = this._formatDate(airdate, strings);
        }
      }
    }

    const cardStyle = poster
      ? {
          backgroundImage: `url("${poster}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-imswel-medias": true,
          upcoming: true,
        })}
        style=${styleMap(cardStyle)}
        @click=${this._moreInfo}
      >
        <div class="poster-overlay" aria-hidden="true"></div>
        <div class="upcoming-grid">
          <div class="media-name ellipsis">${name}</div>
          <div class="media-label">${label}</div>
        </div>
      </ha-card>
    `;
  }

  private _formatRelease(release: string, strings: MediaStrings): string {
    if (release.includes("Available")) return "";
    if (release.includes("In Theaters")) return strings.in_theaters;
    return "";
  }

  private _formatDate(date: Date, strings: MediaStrings): string {
    const now = new Date();
    const tomorrow = addDays(now, 1);
    const time = date.getTime() - now.getTime();
    const secs = Math.floor(time / 1000);
    const days = Math.floor(secs / (3600 * 24));

    if (days < 6) {
      const w = strings.weekday;
      if (w[date.getDay()] === w[now.getDay()]) return strings.today;
      if (w[date.getDay()] === w[tomorrow.getDay()]) return strings.tommorow;
      return w[date.getDay()] ?? date.toLocaleDateString(strings.locale);
    }
    return date.toLocaleDateString(strings.locale);
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

  static styles = [
    ulmCardStyles,
    css`
      /* Fill the HA section cell (fit-rows from getGridOptions) */
      :host {
        display: block;
        width: 100%;
        height: 100% !important;
        min-height: 0;
        align-self: stretch;
        justify-self: stretch;
      }

      ha-card.ulm-imswel-medias {
        position: relative;
        width: 100%;
        height: 100% !important;
        min-height: 0;
        padding: 0;
        cursor: pointer;
        color: white;
        text-shadow: 1px 1px 5px rgba(18, 22, 23, 0.9);
        border: none;
        overflow: hidden;
        display: block;
        box-sizing: border-box;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .blur-overlay,
      .poster-overlay {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 1;
      }

      .blur-overlay {
        background: linear-gradient(
          rgba(0, 0, 0, 0) 40%,
          rgba(0, 0, 0, 0.8) 100%
        );
      }

      .poster-overlay {
        background: linear-gradient(
          rgba(0, 0, 0, 0) 50%,
          rgba(0, 0, 0, 0.8) 100%
        );
      }

      .library-grid {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-areas:
          "icon ."
          "n n"
          "l l"
          ". .";
        grid-template-rows: auto repeat(2, min-content) 12px;
        height: 100%;
        box-sizing: border-box;
        padding: 12px 12px 0;
      }

      .plex-wrap {
        grid-area: icon;
        width: 24px;
        height: 24px;
      }

      .plex-icon {
        width: 24px;
        height: 24px;
        display: block;
      }

      .upcoming-grid {
        position: relative;
        z-index: 2;
        display: grid;
        grid-template-areas:
          ". . ."
          ". n ."
          ". l ."
          ". . .";
        grid-template-columns: 8px 1fr 8px;
        grid-template-rows: auto repeat(2, min-content) 8px;
        height: 100%;
        align-content: end;
        box-sizing: border-box;
      }

      .media-name {
        grid-area: n;
        font-weight: bold;
        font-size: 14px;
        z-index: 2;
      }

      .library-grid .media-name {
        align-self: end;
        justify-self: start;
      }

      .upcoming-grid .media-name {
        align-self: end;
        justify-self: center;
        text-align: center;
      }

      .media-label {
        grid-area: l;
        font-weight: bold;
        font-size: 12px;
        opacity: 0.6;
        z-index: 2;
      }

      .library-grid .media-label {
        align-self: start;
        justify-self: start;
      }

      .upcoming-grid .media-label {
        align-self: start;
        justify-self: center;
        text-align: center;
      }

      .ellipsis {
        white-space: normal;
        word-wrap: break-word;
        max-height: 2.4em;
        line-height: 1.2em;
        overflow: hidden;
      }

      .name,
      .label {
        margin-left: 0;
        opacity: 1;
        color: white;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-imswel-medias-card": UlmCustomImswelMediasCard;
  }
}
