/**
 * Lit port of custom_cards/custom_card_eraycetinay_elapsed_time/
 * icon_info_bg: input_datetime entity, label = elapsed time since stored date/time.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomEraycetinayElapsedTimeCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-eraycetinay-elapsed-time-card";
  entity: string;
  name?: string;
}

interface LangPack {
  day: string;
  days: string;
  hour: string;
  hours: string;
  minute: string;
  minutes: string;
  ago: string;
  justnow: string;
}

const LANG: Record<string, LangPack> = {
  en: {
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    ago: "ago",
    justnow: "just now",
  },
  de: {
    day: "Tag",
    days: "Tage",
    hour: "Stunde",
    hours: "Stunden",
    minute: "Minute",
    minutes: "Minuten",
    ago: "her",
    justnow: "Jetzt",
  },
  es: {
    day: "día",
    days: "días",
    hour: "hora",
    hours: "horas",
    minute: "minuto",
    minutes: "minutos",
    ago: "atrás",
    justnow: "justo ahora",
  },
  tr: {
    day: "gün",
    days: "gün",
    hour: "saat",
    hours: "saat",
    minute: "dakika",
    minutes: "dakika",
    ago: "önce",
    justnow: "az önce",
  },
  pl: {
    day: "dzień",
    days: "dni",
    hour: "godzinę",
    hours: "godzin",
    minute: "minutę",
    minutes: "minut",
    ago: "temu",
    justnow: "przed chwilą",
  },
  hu: {
    day: "nappal",
    days: "nappal",
    hour: "órával",
    hours: "órával",
    minute: "perccel",
    minutes: "perccel",
    ago: "ezelőtt",
    justnow: "éppen most",
  },
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

function elapsedLabel(stateObj: HassEntity, lang: LangPack): string {
  const endDate = new Date();
  let anchorMs: number;
  const hasDate = !!stateObj.attributes.has_date;
  const hasTime = !!stateObj.attributes.has_time;

  if (hasDate) {
    anchorMs = new Date(String(stateObj.state).replace(" ", "T")).getTime();
  } else {
    const d = new Date();
    d.setHours(
      Number(stateObj.attributes.hour) || 0,
      Number(stateObj.attributes.minute) || 0,
      Number(stateObj.attributes.second) || 0,
      0,
    );
    anchorMs = d.getTime();
  }

  const diffMs = endDate.getTime() - anchorMs;
  const days = Math.trunc(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.trunc(Math.abs(diffMs) / (1000 * 60 * 60)) % 24;
  const minutes = Math.trunc(Math.abs(diffMs) / (1000 * 60)) % 60;

  let text = "";
  if (hasDate && days > 0) {
    text += `${days} ${days > 1 ? lang.days : lang.day} `;
  }
  if (hasTime && hours > 0) {
    text += `${hours} ${hours > 1 ? lang.hours : lang.hour} `;
  }
  if (hasTime && !hasDate && minutes > 0) {
    text += `${minutes} ${minutes > 1 ? lang.minutes : lang.minute} `;
  }

  text = text.trim();
  return text.length ? `${text} ${lang.ago}` : lang.justnow;
}

@customElement("ulm-custom-card-eraycetinay-elapsed-time-card")
export class UlmCustomEraycetinayElapsedTimeCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomEraycetinayElapsedTimeCardConfig;
  private _timer?: number;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "input_datetime"),
        textField("name"),
      ],
      computeLabel: labels({
        entity: "input_datetime entity",
        name: "Name",
      }),
      computeHelper: helpers({
        entity: "Date/time to measure elapsed time from",
        name: "Defaults to entity friendly_name",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomEraycetinayElapsedTimeCardConfig> {
    return {
      entity: "input_datetime.example",
    };
  }

  public setConfig(config: UlmCustomEraycetinayElapsedTimeCardConfig): void {
    const c = config as UlmCustomEraycetinayElapsedTimeCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      type: "custom:ulm-custom-card-eraycetinay-elapsed-time-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return {
      columns: 4,
      min_columns: 3,
      max_columns: 6,
      rows: "auto" as const,
      min_rows: 1,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._timer = window.setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer != null) {
      window.clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-elapsed-time">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    /* icon_info_bg — theme grey, not accent blue */
    const iconStyle = {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      (stateObj.attributes.icon as string | undefined) || "mdi:calendar-clock";
    const label = elapsedLabel(stateObj, this._lang());

    return html`
      <ha-card class="ulm-card ulm-elapsed-time" @click=${() => this._moreInfo()}>
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _lang(): LangPack {
    const lang = (
      this.hass?.locale?.language ||
      this.hass?.language ||
      "en"
    ).toLowerCase();
    const short = lang.split("-")[0];
    return LANG[lang] || LANG[short] || LANG.en;
  }

  private _moreInfo() {
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      height: auto !important;
      min-height: 0 !important;
      align-self: start;
      justify-self: start;
    }

    ha-card.ulm-card.ulm-elapsed-time {
      /* Override ulmCardStyles height:100% / flex stretch */
      height: auto !important;
      min-height: 0;
      display: block;
      cursor: pointer;
      box-sizing: border-box;
    }

    ha-card.ulm-elapsed-time .row {
      height: 42px;
      align-content: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-eraycetinay-elapsed-time-card": UlmCustomEraycetinayElapsedTimeCard;
  }
}
