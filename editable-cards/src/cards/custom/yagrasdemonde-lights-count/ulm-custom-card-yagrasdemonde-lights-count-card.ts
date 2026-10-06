/**
 * Lit port of custom_cards/custom_card_yagrasdemonde_lights_count/
 * Counter/sensor with light|cover plural labels; icon_only row layout.
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
  helpers,
  iconField,
  labels,
  selectField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

export type LightsCountType = "light" | "cover";

export interface UlmCustomYagrasdemondeLightsCountCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-yagrasdemonde-lights-count-card";
  entity: string;
  /** light | cover — selects plural label set */
  count_type?: LightsCountType;
  icon_on?: string;
  icon_off?: string;
  color?: UlmThemeColor;
  force_background_color?: boolean;
  /** Optional label overrides (EN defaults from language pack) */
  light_0?: string;
  light_1?: string;
  light_many?: string;
  cover_0?: string;
  cover_1?: string;
  cover_many?: string;
}

const DEFAULTS = {
  light_0: "No lights on",
  light_1: "1 light on",
  light_many: "lights on",
  cover_0: "No covers open",
  cover_1: "1 cover open",
  cover_many: "covers open",
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

function asBool(raw: unknown, fallback = false): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function parseColor(raw: unknown, fallback: UlmThemeColor = "yellow"): UlmThemeColor {
  if (typeof raw !== "string" || !raw) return fallback;
  const named = raw.toLowerCase() as UlmThemeColor;
  if (
    ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(named)
  ) {
    return named;
  }
  return fallback;
}

function unwrapColorVar(host: HTMLElement, raw: string): string {
  const m = raw.match(/^var\(--([a-z0-9-]+)\)$/i);
  if (!m) return raw;
  return getComputedStyle(host).getPropertyValue(`--${m[1]}`).trim() || raw;
}

function resolveBgRgb(host: HTMLElement, color: UlmThemeColor): string {
  let raw = getComputedStyle(host)
    .getPropertyValue(`--color-background-${color}`)
    .trim();
  raw = unwrapColorVar(host, raw);
  if (!/^\d+\s*,/.test(raw)) {
    raw = resolveThemeRgb(host, color);
  }
  return raw;
}

function resolveTextRgb(host: HTMLElement, color: UlmThemeColor): string {
  let raw = getComputedStyle(host)
    .getPropertyValue(`--color-${color}-text`)
    .trim();
  raw = unwrapColorVar(host, raw);
  if (/^\d+\s*,/.test(raw)) return raw;
  return resolveThemeRgb(host, color);
}

@customElement("ulm-custom-card-yagrasdemonde-lights-count-card")
export class UlmCustomYagrasdemondeLightsCountCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomYagrasdemondeLightsCountCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["sensor", "counter"]),
        selectField("count_type", [
          { value: "light", label: "Lights" },
          { value: "cover", label: "Covers" },
        ]),
        iconField("icon_on"),
        iconField("icon_off"),
        colorField("color"),
        booleanField("force_background_color"),
        textField("light_0"),
        textField("light_1"),
        textField("light_many"),
        textField("cover_0"),
        textField("cover_1"),
        textField("cover_many"),
      ],
      computeLabel: labels({
        entity: "Count entity",
        count_type: "Type (light | cover)",
        icon_on: "Icon when count > 0",
        icon_off: "Icon when count is 0",
        color: "Theme color",
        force_background_color: "Force background color when active",
        light_0: "Lights — zero label",
        light_1: "Lights — singular label",
        light_many: "Lights — plural suffix",
        cover_0: "Covers — zero label",
        cover_1: "Covers — singular label",
        cover_many: "Covers — plural suffix",
      }),
      computeHelper: helpers({
        entity: "Counter or sensor with numeric state",
        count_type:
          "Legacy: ulm_custom_card_yagrasdemonde_lights_count_type",
        icon_on:
          "Legacy: ulm_custom_card_yagrasdemonde_lights_count_icon_on (default: entity icon)",
        icon_off:
          "Legacy: ulm_custom_card_yagrasdemonde_lights_count_icon_off",
        color: "Legacy: ulm_custom_card_yagrasdemonde_lights_count_color (default yellow)",
        force_background_color:
          "Legacy: ulm_custom_card_yagrasdemonde_lights_count_force_background_color",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomYagrasdemondeLightsCountCardConfig> {
    return {
      entity: "sensor.lights_on",
      count_type: "light",
      color: "yellow",
      icon_off: "mdi:lightbulb-outline",
      force_background_color: false,
    };
  }

  public setConfig(
    config: UlmCustomYagrasdemondeLightsCountCardConfig,
  ): void {
    const c = config as UlmCustomYagrasdemondeLightsCountCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    const typeRaw = asStr(
      pick(
        c,
        "count_type",
        "ulm_custom_card_yagrasdemonde_lights_count_type",
      ),
    );
    const count_type: LightsCountType =
      typeRaw === "cover" ? "cover" : "light";

    this._config = {
      ...config,
      entity,
      count_type,
      icon_on: asStr(
        pick(c, "icon_on", "ulm_custom_card_yagrasdemonde_lights_count_icon_on"),
      ),
      icon_off:
        asStr(
          pick(
            c,
            "icon_off",
            "ulm_custom_card_yagrasdemonde_lights_count_icon_off",
          ),
        ) || "mdi:lightbulb-outline",
      color: parseColor(
        pick(c, "color", "ulm_custom_card_yagrasdemonde_lights_count_color"),
        "yellow",
      ),
      force_background_color: asBool(
        pick(
          c,
          "force_background_color",
          "ulm_custom_card_yagrasdemonde_lights_count_force_background_color",
        ),
        false,
      ),
      light_0:
        asStr(
          pick(c, "light_0", "ulm_custom_card_yagrasdemonde_lights_count_light_0"),
        ) || DEFAULTS.light_0,
      light_1:
        asStr(
          pick(c, "light_1", "ulm_custom_card_yagrasdemonde_lights_count_light_1"),
        ) || DEFAULTS.light_1,
      light_many:
        asStr(
          pick(
            c,
            "light_many",
            "ulm_custom_card_yagrasdemonde_lights_count_light_many",
          ),
        ) || DEFAULTS.light_many,
      cover_0:
        asStr(
          pick(c, "cover_0", "ulm_custom_card_yagrasdemonde_lights_count_cover_0"),
        ) || DEFAULTS.cover_0,
      cover_1:
        asStr(
          pick(c, "cover_1", "ulm_custom_card_yagrasdemonde_lights_count_cover_1"),
        ) || DEFAULTS.cover_1,
      cover_many:
        asStr(
          pick(
            c,
            "cover_many",
            "ulm_custom_card_yagrasdemonde_lights_count_cover_many",
          ),
        ) || DEFAULTS.cover_many,
      type: "custom:ulm-custom-card-yagrasdemonde-lights-count-card",
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
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-lights-count"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const count =
      stateObj.state === "unavailable"
        ? NaN
        : Number.parseFloat(stateObj.state);
    const active = Number.isFinite(count) && count >= 1;
    const color = this._config.color || "yellow";
    const rgb = resolveThemeRgb(this, color);
    const textRgb = resolveTextRgb(this, color);
    const bgRgb = resolveBgRgb(this, color);

    const darkMode = !!this.hass.themes?.darkMode;
    const forceBg =
      active && (!!this._config.force_background_color || darkMode);

    const iconOff = this._config.icon_off || "mdi:lightbulb-outline";
    const iconOn =
      this._config.icon_on ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:lightbulb";
    const icon = active ? iconOn : iconOff;

    const iconStyle = active
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const cardStyle = active
      ? forceBg
        ? { backgroundColor: `rgba(${textRgb}, 0.1)` }
        : {
            backgroundColor: `rgba(${bgRgb}, var(--opacity-bg, 1))`,
          }
      : {};

    const nameStyle = active
      ? { color: `rgba(${textRgb}, 1)` }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-lights-count": true,
          active,
          "force-bg": forceBg,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="label" style=${styleMap(nameStyle)}>
            ${this._label(count, stateObj.state)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _label(count: number, rawState: string): string {
    const cfg = this._config!;
    if (!Number.isFinite(count) || rawState === "unavailable") {
      return "Unavailable";
    }
    const isCover = cfg.count_type === "cover";
    if (count === 0) {
      return (isCover ? cfg.cover_0 : cfg.light_0) || "";
    }
    if (count === 1) {
      return (isCover ? cfg.cover_1 : cfg.light_1) || "";
    }
    const many = (isCover ? cfg.cover_many : cfg.light_many) || "";
    return `${count} ${many}`;
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-lights-count {
      height: auto;
    }

    /* icon_only: icon | name */
    .row {
      display: grid;
      grid-template-columns: min-content min-content;
      grid-template-rows: min-content;
      grid-template-areas: "icon label";
      align-items: center;
      column-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      pointer-events: none;
    }

    .label {
      grid-area: label;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      opacity: 1;
      filter: none;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-yagrasdemonde-lights-count-card": UlmCustomYagrasdemondeLightsCountCard;
  }
}
