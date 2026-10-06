/**
 * Lit port of custom_cards/custom_card_senoro_win/
 * Senoro window: contact + handle sensor, lock state badges, optional battery badge.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  grid,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

interface LangPack {
  open: string;
  tilted: string;
  closed: string;
  locked: string;
  manipulated: string;
  unavailable: string;
  unknown: string;
}

const LANG: Record<string, LangPack> = {
  en: {
    open: "Open",
    tilted: "Tilted",
    closed: "Closed",
    locked: "Locked",
    manipulated: "Manipulated",
    unavailable: "Unavailable",
    unknown: "Unknown",
  },
  de: {
    open: "Offen",
    tilted: "Gekippt",
    closed: "Geschlossen",
    locked: "Verschlossen",
    manipulated: "Manipuliert",
    unavailable: "Nicht verfügbar",
    unknown: "Unbekannt",
  },
};

export interface UlmCustomSenoroWinCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-senoro-win-card";
  entity: string;
  /** Window handle sensor (Closed / Tilted / Open) */
  handle: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  force_background_color?: boolean;
  battery_level?: string;
  battery_warning?: number;
  battery_warning_low?: number;
  show_last_changed?: boolean;
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

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

@customElement("ulm-custom-card-senoro-win-card")
export class UlmCustomSenoroWinCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomSenoroWinCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "binary_sensor"),
        entityField("handle", ["sensor", "binary_sensor"]),
        grid([textField("name"), iconField("icon")]),
        colorField("color"),
        booleanField("force_background_color"),
        booleanField("show_last_changed"),
        entityField("battery_level", "sensor", false),
        grid([
          numberField("battery_warning"),
          numberField("battery_warning_low"),
        ]),
      ],
      computeLabel: labels({
        entity: "Contact sensor",
        handle: "Handle sensor (Closed / Tilted / Open)",
        name: "Name (ulm_custom_card_senoro_win_name)",
        icon: "Icon (ulm_custom_card_senoro_win_icon)",
        color: "Accent color (ulm_custom_card_senoro_win_color)",
        force_background_color:
          "Force colored background (ulm_custom_card_senoro_win_force_background_color)",
        show_last_changed: "Show last changed (ulm_show_last_changed)",
        battery_level: "Battery % (ulm_custom_card_senoro_win_battery_level)",
        battery_warning: "Battery warning %",
        battery_warning_low: "Battery critical %",
      }),
      computeHelper: helpers({
        entity: "Legacy: ulm_custom_card_senoro_win_entity defaults to card entity",
        handle: "Legacy: ulm_custom_card_senoro_win_handle",
        battery_level: "Corner badge when level ≤ battery warning",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomSenoroWinCardConfig> {
    return {
      entity: "binary_sensor.window_contact",
      handle: "sensor.window_handle",
      color: "blue",
      force_background_color: false,
      battery_warning: 20,
      battery_warning_low: 5,
      show_last_changed: false,
    };
  }

  public setConfig(config: UlmCustomSenoroWinCardConfig): void {
    const c = config as UlmCustomSenoroWinCardConfig & Record<string, unknown>;
    const entity =
      asStr(pick(c, "entity", "ulm_custom_card_senoro_win_entity")) || "";
    const handle =
      asStr(pick(c, "handle", "ulm_custom_card_senoro_win_handle")) || "";
    if (!entity) throw new Error("Please define an entity");
    if (!handle) throw new Error("Please define a handle entity");

    this._config = {
      ...config,
      entity,
      handle,
      name: asStr(pick(c, "name", "ulm_custom_card_senoro_win_name")),
      icon: asStr(pick(c, "icon", "ulm_custom_card_senoro_win_icon")),
      color:
        (pick(c, "color", "ulm_custom_card_senoro_win_color") as
          | UlmThemeColor
          | undefined) || "blue",
      force_background_color: asBool(
        pick(
          c,
          "force_background_color",
          "ulm_custom_card_senoro_win_force_background_color",
        ),
        false,
      ),
      battery_level: asStr(
        pick(c, "battery_level", "ulm_custom_card_senoro_win_battery_level"),
      ),
      battery_warning: asNum(
        pick(
          c,
          "battery_warning",
          "ulm_custom_card_senoro_win_battery_warning",
        ),
        20,
      ),
      battery_warning_low: asNum(
        pick(
          c,
          "battery_warning_low",
          "ulm_custom_card_senoro_win_battery_warning_low",
        ),
        5,
      ),
      show_last_changed: asBool(
        pick(c, "show_last_changed", "ulm_show_last_changed"),
        false,
      ),
      type: "custom:ulm-custom-card-senoro-win-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const contact = this.hass.states[this._config.entity];
    const handle = this.hass.states[this._config.handle];
    if (!contact) {
      return html`<ha-card class="ulm-card ulm-senoro-win"
        ><div class="warning">
          Entity not found: ${this._config.entity}
        </div></ha-card
      >`;
    }

    const contactState = contact.state;
    const handleState = handle?.state ?? "unavailable";
    const contactOn = contactState === "on";
    const color = this._config.color || "blue";
    const iconStyle = this._iconStyle(contactOn, handleState, color);
    const cardBg = this._cardBackground(contactOn, handleState, color);

    const name =
      this._config.name ||
      (contact.attributes.friendly_name as string | undefined) ||
      contact.entity_id;
    const icon =
      this._config.icon ||
      (contact.attributes.icon as string | undefined) ||
      "mdi:window-closed-variant";
    const label = this._label(contact, contactState, handleState);
    const notify = this._notification(contactState, handleState);
    const battery = this._batteryBadge();

    return html`
      <ha-card
        class=${classMap({ "ulm-card": true, "ulm-senoro-win": true })}
        style=${styleMap(cardBg ? { backgroundColor: cardBg } : {})}
        @click=${this._moreInfo}
      >
        <div class="grid">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
          ${notify
            ? html`<span
                class="badge notify"
                style=${styleMap({
                  backgroundColor: notify.bg,
                })}
              >
                <ha-icon .icon=${notify.icon}></ha-icon>
              </span>`
            : nothing}
          ${battery
            ? html`<span
                class="badge battery"
                style=${styleMap({ backgroundColor: battery.bg })}
              >
                <ha-icon icon="mdi:battery-low"></ha-icon>
              </span>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _lang(): LangPack {
    const lang = (this.hass?.language || "en").toLowerCase();
    const short = lang.split("-")[0];
    return LANG[lang] || LANG[short] || LANG.en;
  }

  private _iconStyle(
    contactOn: boolean,
    handleState: string,
    color: UlmThemeColor,
  ): Record<string, string> {
    if (!contactOn) {
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
    }
    const rgb =
      handleState === "Closed"
        ? resolveThemeRgb(this, "red")
        : resolveThemeRgb(this, color);
    return {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };
  }

  private _cardBackground(
    contactOn: boolean,
    handleState: string,
    color: UlmThemeColor,
  ): string | undefined {
    if (!this._config?.force_background_color || !contactOn) return undefined;
    const opacity = getComputedStyle(this)
      .getPropertyValue("--opacity-bg")
      .trim();
    const op = opacity || "1";
    if (handleState === "Tilted" || handleState === "Open") {
      const rgb = resolveThemeRgb(this, color);
      return `rgba(${rgb}, ${op})`;
    }
    if (handleState === "Closed") {
      const rgb = resolveThemeRgb(this, "red");
      return `rgba(${rgb}, ${op})`;
    }
    return undefined;
  }

  private _label(
    contact: HassEntity,
    contactState: string,
    handleState: string,
  ): string {
    if (this._config?.show_last_changed && contact.last_changed) {
      return this._relativeTime(contact.last_changed);
    }
    const p = this._lang();
    if (contactState === "unavailable" || handleState === "unavailable") {
      return p.unavailable;
    }
    if (contactState === "off" && handleState === "Closed") return p.locked;
    if (
      contactState === "off" &&
      (handleState === "Tilted" || handleState === "Open")
    ) {
      return p.closed;
    }
    if (contactState === "on" && handleState === "Tilted") return p.tilted;
    if (contactState === "on" && handleState === "Open") return p.open;
    if (contactState === "on" && handleState === "Closed") return p.manipulated;
    return p.unknown;
  }

  private _notification(
    contactState: string,
    handleState: string,
  ): { icon: string; bg: string } | null {
    let icon: string | undefined;
    if (handleState === "Tilted" || handleState === "Open") {
      icon = "mdi:lock-open-variant";
    } else if (contactState === "off" && handleState === "Closed") {
      icon = "mdi:lock";
    } else if (contactState === "on" && handleState === "Closed") {
      icon = "mdi:alert";
    }
    if (!icon) return null;

    const green = resolveThemeRgb(this, "green");
    const red = resolveThemeRgb(this, "red");
    const bg =
      contactState === "off" && handleState === "Closed"
        ? `rgba(${green}, 1)`
        : `rgba(${red}, 1)`;
    return { icon, bg };
  }

  private _batteryBadge(): { bg: string } | null {
    const cfg = this._config!;
    const batId = cfg.battery_level;
    if (!batId || !this.hass) return null;
    const bat = this.hass.states[batId];
    if (!bat) return null;
    const level = Number.parseFloat(bat.state);
    if (!Number.isFinite(level)) return null;
    const warn = cfg.battery_warning ?? 20;
    const warnLow = cfg.battery_warning_low ?? 5;
    if (level > warn) return null;

    const red = resolveThemeRgb(this, "red");
    const yellow = resolveThemeRgb(this, "yellow");
    const bg =
      level <= warnLow ? `rgba(${red}, 1)` : `rgba(${yellow}, 1)`;
    return { bg };
  }

  private _relativeTime(iso: string): string {
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const sec = Math.max(0, Math.round((Date.now() - then) / 1000));
    if (sec < 60) return `${sec}s`;
    const min = Math.round(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.round(min / 60);
    if (hr < 48) return `${hr}h`;
    return `${Math.round(hr / 24)}d`;
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-senoro-win {
      position: relative;
      height: auto;
      overflow: visible;
      cursor: pointer;
    }

    .grid {
      position: relative;
    }

    .icon-btn,
    .info-btn {
      pointer-events: none;
    }

    .badge {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .badge.notify {
      left: 28px;
      top: -6px;
    }

    .badge.battery {
      left: -6px;
      top: -6px;
    }

    .badge ha-icon {
      --mdc-icon-size: 12px;
      width: 12px;
      height: 12px;
      color: var(--primary-background-color, #fff);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-senoro-win-card": UlmCustomSenoroWinCard;
  }
}
