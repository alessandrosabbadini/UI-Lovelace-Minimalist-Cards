/**
 * Lit port of custom_cards/custom_card_eraycetinay_lock/
 * icon_info_bg lock card with optional tap lock/unlock, battery + door-open badges.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

type LockTone = "green" | "yellow" | "grey";

interface LangPack {
  locked: string;
  unlocked: string;
  locking: string;
  unlocking: string;
  unavailable: string;
  jammed: string;
  locked_and_opened: string;
  battery_is_at: string;
  battery_is_low: string;
}

const LANG: Record<string, LangPack> = {
  en: {
    locked: "locked",
    unlocked: "unlocked",
    locking: "locking",
    unlocking: "unlocking",
    unavailable: "unavailable",
    jammed: "jammed",
    locked_and_opened: "The door is locked but still open.",
    battery_is_at: "Battery is at",
    battery_is_low: "Battery is low",
  },
  de: {
    locked: "verriegelt",
    unlocked: "entriegelt",
    locking: "verriegeln",
    unlocking: "entriegeln",
    unavailable: "nicht verfügbar",
    jammed: "blockiert",
    locked_and_opened: "Die Tür ist verschlossen, aber noch offen.",
    battery_is_at: "Batterie ist an",
    battery_is_low: "Batterie schwach",
  },
  es: {
    locked: "bloqueado",
    unlocked: "desbloqueado",
    locking: "bloqueando",
    unlocking: "desbloqueando",
    unavailable: "no disponible",
    jammed: "apretada",
    locked_and_opened: "La puerta está cerrada pero aún abierta.",
    battery_is_at: "la batería está en",
    battery_is_low: "La batería está baja",
  },
  pl: {
    locked: "zamknięty",
    unlocked: "otwarty",
    locking: "zamykanie",
    unlocking: "otwieranie",
    unavailable: "niedostępny",
    jammed: "zacięty",
    locked_and_opened: "Drzwi są zamknięte, ale nadal otwarte.",
    battery_is_at: "Bateria jest na",
    battery_is_low: "Bateria jest słaba",
  },
  sv: {
    locked: "låst",
    unlocked: "olåst",
    locking: "låser",
    unlocking: "låser upp",
    unavailable: "otillgängligt",
    jammed: "fastnat",
    locked_and_opened: "Dörren är låst men fortfarande öppen.",
    battery_is_at: "Batterinivån är",
    battery_is_low: "Batteriet är lågt",
  },
  tr: {
    locked: "kilitli",
    unlocked: "kilitli değil",
    locking: "kilitleniyor",
    unlocking: "kilit açılıyor",
    unavailable: "müsait değil",
    jammed: "sıkışmış",
    locked_and_opened: "Kapı kilitli ama hala açık",
    battery_is_at: "pil",
    battery_is_low: "pil zayıf",
  },
};

export interface UlmCustomEraycetinayLockCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-eraycetinay-lock-card";
  entity: string;
  name?: string;
  icon?: string;
  tap_control?: boolean;
  only_open?: boolean;
  battery_level?: string;
  battery_warning?: number;
  battery_warning_low?: number;
  battery_sensor_binary?: boolean;
  battery_sensor_binary_low_state?: string;
  door_open?: string;
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

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

@customElement("ulm-custom-card-eraycetinay-lock-card")
export class UlmCustomEraycetinayLockCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomEraycetinayLockCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "lock"),
        textField("name"),
        iconField("icon"),
        booleanField("tap_control"),
        booleanField("only_open"),
        entityField("battery_level", ["sensor", "binary_sensor"], false),
        numberField("battery_warning"),
        numberField("battery_warning_low"),
        booleanField("battery_sensor_binary"),
        textField("battery_sensor_binary_low_state"),
        entityField("door_open", "binary_sensor", false),
      ],
      computeLabel: labels({
        entity: "Lock entity",
        name: "Name",
        icon: "Icon",
        tap_control: "Tap locks/unlocks (ulm_…_tap_control)",
        only_open: "Only lock.open on tap (ulm_…_only_open)",
        battery_level: "Battery entity (ulm_…_battery_level)",
        battery_warning: "Low battery % (default 20)",
        battery_warning_low: "Very low battery % (default 5)",
        battery_sensor_binary: "Battery is binary sensor",
        battery_sensor_binary_low_state: "Binary low state (default on)",
        door_open: "Door open binary (ulm_…_door_open)",
      }),
      computeHelper: helpers({
        tap_control:
          "When false, tap opens more-info. When true, toggles lock/unlock (or open).",
        only_open: "Requires tap_control. Always calls lock.open.",
        battery_level: "Shows a corner badge when battery is low",
        door_open:
          "Red door-open badge when lock is locked but door sensor is on",
        battery_sensor_binary:
          "Ignores % thresholds; uses battery_sensor_binary_low_state",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomEraycetinayLockCardConfig> {
    return {
      entity: "lock.front_door",
      name: "Door Lock",
      icon: "mdi:lock",
      tap_control: true,
      only_open: false,
      battery_warning: 20,
      battery_warning_low: 5,
      battery_sensor_binary: false,
      battery_sensor_binary_low_state: "on",
    };
  }

  public setConfig(config: UlmCustomEraycetinayLockCardConfig): void {
    const c = config as UlmCustomEraycetinayLockCardConfig &
      Record<string, unknown>;
    const entity =
      config.entity ||
      (pick(c, "ulm_custom_card_eraycetinay_lock_entity") as
        | string
        | undefined);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: (pick(c, "name") as string) || undefined,
      icon: (pick(c, "icon") as string) || undefined,
      tap_control: asBool(
        pick(c, "tap_control", "ulm_custom_card_eraycetinay_lock_tap_control"),
        false,
      ),
      only_open: asBool(
        pick(c, "only_open", "ulm_custom_card_eraycetinay_lock_only_open"),
        false,
      ),
      battery_level:
        (pick(
          c,
          "battery_level",
          "ulm_custom_card_eraycetinay_lock_battery_level",
        ) as string) || undefined,
      battery_warning: asNum(
        pick(
          c,
          "battery_warning",
          "ulm_custom_card_eraycetinay_lock_battery_warning",
        ),
        20,
      ),
      battery_warning_low: asNum(
        pick(
          c,
          "battery_warning_low",
          "ulm_custom_card_eraycetinay_lock_battery_warning_low",
        ),
        5,
      ),
      battery_sensor_binary: asBool(
        pick(
          c,
          "battery_sensor_binary",
          "ulm_custom_card_eraycetinay_lock_battery_sensor_binary",
        ),
        false,
      ),
      battery_sensor_binary_low_state: String(
        pick(
          c,
          "battery_sensor_binary_low_state",
          "ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state",
        ) || "on",
      ),
      door_open:
        (pick(
          c,
          "door_open",
          "ulm_custom_card_eraycetinay_lock_door_open",
        ) as string) || undefined,
      type: "custom:ulm-custom-card-eraycetinay-lock-card",
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
      rows: 1,
      min_rows: 1,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-lock"
        ><div class="warning">
          Entity not found: ${this._config.entity}
        </div></ha-card
      >`;
    }

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      (this._isUnlockedLike(stateObj.state) ? "mdi:lock-open" : "mdi:lock");
    const tone = this._tone(stateObj.state);
    const iconStyle = this._iconStyle(tone);
    const label = this._label(stateObj);
    const battery = this._batteryBadge();
    const doorWarn = this._doorOpenBadge(stateObj);

    return html`
      <ha-card class="ulm-lock" @click=${this._cardTap}>
        <div class="grid">
          <div class="img-cell" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="name">${name}</div>
          <div class="label">${label}</div>

          ${doorWarn
            ? html`<span
                class="badge door"
                title=${doorWarn.title}
                style=${styleMap({
                  backgroundColor: `rgba(${resolveThemeRgb(this, "red")}, 1)`,
                })}
              >
                <ha-icon .icon=${doorWarn.icon}></ha-icon>
              </span>`
            : nothing}
          ${battery
            ? html`<span
                class="badge battery"
                title=${battery.title}
                style=${styleMap({
                  backgroundColor: `rgba(${resolveThemeRgb(this, battery.color)}, 1)`,
                })}
              >
                <ha-icon .icon=${battery.icon}></ha-icon>
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

  private _isUnlockedLike(state: string): boolean {
    return ["unlocked", "open", "opened", "unlocking"].includes(state);
  }

  private _isLockedLike(state: string): boolean {
    return ["locked", "closed", "locking"].includes(state);
  }

  /** Intended colors (original YAML state templates were buggy). */
  private _tone(state: string): LockTone {
    if (this._isUnlockedLike(state)) return "yellow";
    if (this._isLockedLike(state)) return "green";
    return "grey";
  }

  private _iconStyle(tone: LockTone): Record<string, string> {
    if (tone === "grey") {
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
    }
    const rgb = resolveThemeRgb(this, tone);
    return {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };
  }

  private _label(stateObj: HassEntity): string {
    const p = this._lang();
    const map: Record<string, string> = {
      locked: p.locked,
      unlocked: p.unlocked,
      locking: p.locking,
      unlocking: p.unlocking,
      unavailable: p.unavailable,
      jammed: p.jammed,
      open: p.unlocked,
      opened: p.unlocked,
      closed: p.locked,
    };
    if (map[stateObj.state]) return map[stateObj.state];
    return this.hass?.formatEntityState?.(stateObj) || stateObj.state;
  }

  private _doorOpenBadge(
    stateObj: HassEntity,
  ): { icon: string; title: string } | null {
    const doorId = this._config!.door_open;
    if (!doorId || !this.hass) return null;
    const door = this.hass.states[doorId];
    if (!door) return null;
    if (stateObj.state === "locked" && door.state === "on") {
      return {
        icon: "mdi:door-open",
        title: this._lang().locked_and_opened,
      };
    }
    return null;
  }

  private _batteryBadge(): {
    icon: string;
    title: string;
    color: "red" | "yellow";
  } | null {
    const cfg = this._config!;
    const batId = cfg.battery_level;
    if (!batId || !this.hass) return null;
    const bat = this.hass.states[batId];
    if (!bat) return null;
    const p = this._lang();

    if (cfg.battery_sensor_binary) {
      if (bat.state === (cfg.battery_sensor_binary_low_state || "on")) {
        return {
          icon: "mdi:battery-low",
          title: p.battery_is_low,
          color: "red",
        };
      }
      return null;
    }

    const level = Number.parseFloat(bat.state);
    if (!Number.isFinite(level)) return null;
    const warn = cfg.battery_warning ?? 20;
    const warnLow = cfg.battery_warning_low ?? 5;

    // Badge shown when <= warning (YAML); color red if <= warning_low else yellow
    if (level <= warn) {
      return {
        icon: "mdi:battery-low",
        title: `${p.battery_is_at} ${level}%`,
        color: level <= warnLow ? "red" : "yellow",
      };
    }
    return null;
  }

  private _cardTap = () => {
    const cfg = this._config!;
    if (!this.hass) return;
    const stateObj = this.hass.states[cfg.entity];
    if (!stateObj) return;

    if (!cfg.tap_control) {
      this._moreInfo();
      return;
    }

    if (cfg.only_open) {
      this.hass.callService("lock", "open", { entity_id: cfg.entity });
      return;
    }

    if (stateObj.state === "locked") {
      this.hass.callService("lock", "unlock", { entity_id: cfg.entity });
      return;
    }
    if (stateObj.state === "unlocked") {
      this.hass.callService("lock", "lock", { entity_id: cfg.entity });
      return;
    }
    this._moreInfo();
  };

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
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-lock {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: block;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 12px;
      margin: 0;
      overflow: visible;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      --ha-card-border-width: 0px;
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    .grid {
      position: relative;
      display: grid;
      grid-template-areas:
        "i n"
        "i l";
      grid-template-columns: min-content auto;
      grid-template-rows: 1fr 1fr;
      height: 42px;
      width: 100%;
      align-content: stretch;
    }

    .img-cell {
      grid-area: i;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      place-self: center;
      overflow: hidden;
      box-sizing: border-box;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }

    .img-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    /* YAML custom_fields notification_* — absolute on grid */
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

    .badge.door {
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
