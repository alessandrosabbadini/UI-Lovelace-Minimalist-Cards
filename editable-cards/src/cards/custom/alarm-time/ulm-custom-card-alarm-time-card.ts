/**
 * Faithful Lit port of custom_cards/custom_card_alarm_time/card_alarm_time.yaml
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

export interface UlmCustomAlarmTimeCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-alarm-time-card";
  /** Toggle entity (input_boolean / switch) */
  entity: string;
  /** input_datetime (time) to adjust */
  datetime?: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  force_background_color?: boolean;
  horizontal?: boolean;
  collapse?: boolean;
  /** Minutes per +/- tap (default 15) */
  step?: number;
}

function pick(
  cfg: Record<string, unknown>,
  ...keys: string[]
): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

@customElement("ulm-custom-card-alarm-time-card")
export class UlmCustomAlarmTimeCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomAlarmTimeCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["input_boolean", "switch"]),
        entityField("datetime", "input_datetime"),
        textField("name"),
        iconField("icon"),
        colorField("color"),
        booleanField("force_background_color"),
        booleanField("horizontal"),
        booleanField("collapse"),
        numberField("step"),
      ],
      computeLabel: labels({
        entity: "Alarm toggle (ulm_card_alarm_time entity)",
        datetime: "Alarm time (ulm_card_alarm_time_datetime)",
        name: "Name (ulm_card_alarm_time_name)",
        icon: "Icon (ulm_card_alarm_time_icon)",
        color: "Color (ulm_card_alarm_time_color)",
        force_background_color: "Force background when on",
        horizontal: "Horizontal layout",
        collapse: "Collapse controls when off",
        step: "Minute step (+/-)",
      }),
      computeHelper: helpers({
        entity: "Icon toggles on/off; name opens more-info.",
        datetime: "input_datetime with has_time. Shown with +/- when alarm is on.",
        step: "Default 15. Hidden in horizontal mode (time only).",
        collapse: "When off, hide the time row entirely.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomAlarmTimeCardConfig> {
    return {
      entity: "input_boolean.alarm_weekday",
      datetime: "input_datetime.alarm_weekday_time",
      color: "blue",
      force_background_color: false,
      horizontal: false,
      collapse: false,
      step: 15,
      icon: "mdi:alarm",
    };
  }

  public setConfig(config: UlmCustomAlarmTimeCardConfig): void {
    const c = config as UlmCustomAlarmTimeCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (pick(c, "ulm_card_alarm_time_entity") as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const stepRaw = pick(c, "step", "ulm_card_alarm_time_step");
    const step =
      typeof stepRaw === "number"
        ? stepRaw
        : Number.parseInt(String(stepRaw ?? "15"), 10) || 15;

    this._config = {
      ...config,
      entity,
      datetime: pick(c, "datetime", "ulm_card_alarm_time_datetime") as
        | string
        | undefined,
      name: (pick(c, "name", "ulm_card_alarm_time_name") as string | undefined) ??
        config.name,
      icon: (pick(c, "icon", "ulm_card_alarm_time_icon") as string | undefined) ??
        config.icon,
      color: (pick(c, "color", "ulm_card_alarm_time_color") as UlmThemeColor) ||
        "blue",
      force_background_color: Boolean(
        pick(
          c,
          "force_background_color",
          "ulm_card_alarm_time_force_background_color",
        ) ?? false,
      ),
      horizontal: Boolean(
        pick(c, "horizontal", "ulm_card_alarm_time_horizontal") ?? false,
      ),
      collapse: Boolean(
        pick(c, "collapse", "ulm_card_alarm_time_collapse") ?? false,
      ),
      step,
      type: "custom:ulm-custom-card-alarm-time-card",
    };
  }

  public getCardSize(): number {
    if (!this._config || !this.hass) return 1;
    const on = this.hass.states[this._config.entity]?.state === "on";
    if (this._config.collapse && !on) return 1;
    if (this._config.horizontal) return 1;
    return on || !this._config.collapse ? 2 : 1;
  }

  public getGridOptions() {
    const horizontal = !!this._config?.horizontal;
    return {
      columns: horizontal ? 12 : 6,
      min_columns: horizontal ? 6 : 3,
      max_columns: 12,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const on = stateObj.state === "on";
    const color = (this._config.color || "blue") as UlmThemeColor;
    const rgb = resolveThemeRgb(this, color);
    const forceBg = !!(on && this._config.force_background_color);
    const iconStyle = activeIconStyle(
      this,
      on,
      color,
      null,
      false,
      forceBg,
    );
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:alarm";
    const label = on ? "On" : stateObj.state === "off" ? "Off" : stateObj.state;

    const showControls = on; // YAML: hide item2 when off
    const collapsed = !!this._config.collapse && !on;
    const horizontal = !!this._config.horizontal;

    const cardStyle = forceBg
      ? { backgroundColor: `rgba(${rgb}, var(--opacity-bg, 1))` }
      : {};
    const textStyle = forceBg ? { color: "rgb(250, 250, 250)" } : {};

    const dt = this._config.datetime
      ? this.hass.states[this._config.datetime]
      : undefined;
    const timeLabel = dt?.state ?? "—";

    const widgetBg =
      forceBg && !this.hass.themes?.darkMode
        ? "rgba(250,250,250,0.8)"
        : "rgba(var(--color-theme, 51, 51, 51), 0.05)";
    const widgetIconColor =
      forceBg && !this.hass.themes?.darkMode && on
        ? `rgba(${rgb}, 1)`
        : "rgba(var(--color-theme, 51, 51, 51), 0.9)";
    const widgetStyle = {
      backgroundColor: widgetBg,
      color: widgetIconColor,
    };

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-alarm-time": true,
          active: on,
          "force-bg": forceBg,
          horizontal,
          collapsed,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="stack ${horizontal ? "horizontal" : ""}">
          <div class="row">
            <button
              class="icon-btn"
              style=${styleMap(iconStyle)}
              @click=${this._toggle}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfoEntity}>
              <div class="name" style=${styleMap(textStyle)}>${name}</div>
              <div class="label" style=${styleMap(textStyle)}>${label}</div>
            </button>
          </div>

          ${showControls && !collapsed && this._config.datetime
            ? html`
                <div
                  class=${classMap({
                    widgets: true,
                    "time-only": horizontal,
                  })}
                >
                  ${horizontal
                    ? nothing
                    : html`
                        <button
                          class="widget-btn"
                          style=${styleMap(widgetStyle)}
                          @click=${() => this._adjust(-1)}
                          aria-label="Decrease alarm time"
                        >
                          <ha-icon icon="mdi:minus"></ha-icon>
                        </button>
                      `}
                  <button
                    class="widget-btn time"
                    style=${styleMap(widgetStyle)}
                    @click=${this._moreInfoDatetime}
                  >
                    <span class="time-label">${timeLabel}</span>
                  </button>
                  ${horizontal
                    ? nothing
                    : html`
                        <button
                          class="widget-btn"
                          style=${styleMap(widgetStyle)}
                          @click=${() => this._adjust(1)}
                          aria-label="Increase alarm time"
                        >
                          <ha-icon icon="mdi:plus"></ha-icon>
                        </button>
                      `}
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _toggle = (ev: Event) => {
    ev.stopPropagation();
    if (!this.hass || !this._config) return;
    const domain = this._config.entity.split(".")[0];
    this.hass.callService(domain, "toggle", {
      entity_id: this._config.entity,
    });
  };

  private _moreInfoEntity = (ev: Event) => {
    ev.stopPropagation();
    this._fireMoreInfo(this._config?.entity);
  };

  private _moreInfoDatetime = (ev: Event) => {
    ev.stopPropagation();
    this._fireMoreInfo(this._config?.datetime);
  };

  private _fireMoreInfo(entityId?: string) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  /** +/- step minutes on the input_datetime time */
  private _adjust(direction: 1 | -1) {
    if (!this.hass || !this._config?.datetime) return;
    const dt = this.hass.states[this._config.datetime] as HassEntity | undefined;
    if (!dt) return;
    const step = this._config.step || 15;
    const parts = String(dt.state).split(":");
    if (parts.length < 2) return;
    let hours = Number.parseInt(parts[0], 10);
    let minutes = Number.parseInt(parts[1], 10);
    const seconds = Number.parseInt(parts[2] || "0", 10) || 0;
    if (Number.isNaN(hours) || Number.isNaN(minutes)) return;

    let total = hours * 60 + minutes + direction * step;
    total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
    hours = Math.floor(total / 60);
    minutes = total % 60;
    const time = `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    this.hass.callService("input_datetime", "set_datetime", {
      entity_id: this._config.datetime,
      time,
    });
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-alarm-time {
      height: auto;
    }

    .stack {
      gap: 12px;
    }

    .stack.horizontal {
      align-items: stretch;
    }

    .stack.horizontal .row {
      flex: 1;
      min-width: 0;
    }

    .widgets {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    .widgets.time-only {
      grid-template-columns: 1fr;
      flex: 1;
    }

    .widget-btn.time {
      display: grid;
      place-items: center;
      font-weight: bold;
      font-size: 14px;
    }

    .time-label {
      line-height: 1;
    }
  `;
}
