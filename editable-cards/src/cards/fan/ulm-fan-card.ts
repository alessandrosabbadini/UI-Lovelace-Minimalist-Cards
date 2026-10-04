/**
 * Lit port of card_fan.yaml (+ Sexel layout cues from docs screenshots).
 *
 * Variables (docs):
 *  entity, name, icon, enable_horizontal, enable_collapse, color,
 *  force_background_color, enable_button,
 *  enable_slider, slider_min/max, temp_attribute, hum_attribute,
 *  button_icon, button_service, oscillate_attribute
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
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
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmFanCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-fan-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  enable_horizontal?: boolean;
  enable_collapse?: boolean;
  force_background_color?: boolean;
  enable_slider?: boolean;
  slider_min?: number;
  slider_max?: number;
  enable_button?: boolean;
  button_icon?: string;
  button_service?: string;
  oscillate_attribute?: string;
  temp_attribute?: string;
  hum_attribute?: string;
  always_show_attributes?: boolean;
}

@customElement("ulm-fan-card")
export class UlmFanCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmFanCardConfig;
  /** Live drag value so the fill tracks while sliding */
  @state() private _dragPct?: number;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "fan"),
        grid([textField("name"), iconField("icon")]),
        colorField("color"),
        booleanField("enable_horizontal"),
        booleanField("enable_collapse"),
        booleanField("force_background_color"),
        booleanField("enable_slider"),
        booleanField("enable_button"),
        grid([numberField("slider_min"), numberField("slider_max")]),
        iconField("button_icon"),
        textField("button_service"),
        textField("oscillate_attribute"),
        grid([textField("temp_attribute"), textField("hum_attribute")]),
        booleanField("always_show_attributes"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_card_fan_name)",
        icon: "Icon (ulm_card_fan_icon)",
        color: "Color (ulm_card_fan_color)",
        enable_horizontal: "Horizontal layout",
        enable_collapse: "Collapse speed row when off",
        force_background_color: "Force background color when on",
        enable_slider: "Enable speed slider",
        enable_button: "Enable oscillation button",
        slider_min: "Slider min",
        slider_max: "Slider max",
        button_icon: "Button icon (ulm_card_fan_button_icon)",
        button_service: "Button service (ulm_card_fan_button_service)",
        oscillate_attribute: "Oscillate attribute name",
        temp_attribute: "Temp attribute (ulm_card_fan_temp_attribute)",
        hum_attribute: "Humidity attribute (ulm_card_fan_hum_attribute)",
        always_show_attributes: "Always show temp/humidity when off",
      }),
      computeHelper: helpers({
        enable_horizontal:
          "Place the speed row beside the icon/name (docs screenshot layout).",
        enable_collapse: "Hide slider + oscillation button when the fan is off.",
        enable_button:
          "Button next to the slider (fan.oscillate by default).",
        oscillate_attribute:
          "Attribute key for oscillation. Tries oscillating and oscillate.",
        temp_attribute: "Entity attribute key shown as °C in the label.",
        hum_attribute: "Entity attribute key shown as % in the label.",
        button_service: "e.g. fan.oscillate",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmFanCardConfig> {
    return {
      entity: "fan.living_room_fan",
      enable_slider: true,
      enable_button: true,
      enable_collapse: true,
      color: "blue",
    };
  }

  public setConfig(config: UlmFanCardConfig): void {
    const c = config as UlmFanCardConfig & Record<string, unknown>;
    const entity =
      config.entity || (c.ulm_card_fan_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const strOrUndef = (v: unknown): string | undefined =>
      typeof v === "string" && v.length && v !== "false" ? v : undefined;

    this._config = {
      ...config,
      entity,
      name: config.name ?? (c.ulm_card_fan_name as string | undefined),
      icon:
        strOrUndef(config.icon) ||
        strOrUndef(c.ulm_card_fan_icon) ||
        undefined,
      color:
        (config.color as UlmThemeColor) ||
        (c.ulm_card_fan_color as UlmThemeColor) ||
        "blue",
      enable_horizontal: Boolean(
        config.enable_horizontal ??
          c.ulm_card_fan_enable_horizontal ??
          c.ulm_card_fan_horizontal,
      ),
      enable_collapse: Boolean(
        config.enable_collapse ?? c.ulm_card_fan_enable_collapse,
      ),
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_fan_force_background_color,
      ),
      enable_slider: Boolean(
        config.enable_slider ?? c.ulm_card_fan_enable_slider,
      ),
      slider_min: Number(
        config.slider_min ?? c.ulm_card_fan_slider_min ?? 0,
      ),
      slider_max: Number(
        config.slider_max ?? c.ulm_card_fan_slider_max ?? 100,
      ),
      enable_button: Boolean(
        config.enable_button ??
          c.ulm_card_fan_enable_button ??
          c.ulm_show_button,
      ),
      button_icon:
        strOrUndef(config.button_icon) ||
        strOrUndef(c.ulm_card_fan_button_icon) ||
        strOrUndef(c.ulm_button_icon) ||
        "mdi:rotate-3d-variant",
      button_service:
        strOrUndef(config.button_service) ||
        strOrUndef(c.ulm_card_fan_button_service) ||
        strOrUndef(c.ulm_button_service) ||
        "fan.oscillate",
      oscillate_attribute:
        strOrUndef(config.oscillate_attribute) ||
        strOrUndef(c.ulm_card_fan_oscillate_attribute) ||
        strOrUndef(c.oscillate_attribute) ||
        "oscillating",
      temp_attribute: strOrUndef(
        config.temp_attribute ?? c.ulm_card_fan_temp_attribute,
      ),
      hum_attribute: strOrUndef(
        config.hum_attribute ?? c.ulm_card_fan_hum_attribute,
      ),
      always_show_attributes: Boolean(
        config.always_show_attributes ?? c.always_show_attributes,
      ),
      type: "custom:ulm-fan-card",
    };
  }

  public getCardSize(): number {
    if (this._config?.enable_horizontal) return 1;
    let n = 1;
    if (this._config?.enable_slider) n++;
    return n;
  }

  public getGridOptions() {
    return {
      columns: this._config?.enable_horizontal ? 12 : 6,
      min_columns: this._config?.enable_horizontal ? 6 : 3,
      max_columns: 12,
    };
  }

  private _oscAttrKeys(): string[] {
    const primary = this._config?.oscillate_attribute || "oscillating";
    const keys = [primary, "oscillating", "oscillate"];
    return [...new Set(keys)];
  }

  private _oscillating(stateObj: HassEntity): boolean {
    for (const key of this._oscAttrKeys()) {
      if (key in stateObj.attributes) return !!stateObj.attributes[key];
    }
    return false;
  }

  private _label(stateObj: HassEntity): string {
    if (stateObj.state === "unavailable") return "Unavailable";

    const showAttrs =
      stateObj.state !== "off" || !!this._config?.always_show_attributes;

    let extra = "";
    if (showAttrs) {
      const tempKey = this._config?.temp_attribute;
      if (tempKey && stateObj.attributes[tempKey] != null) {
        const t = Math.round(Number(stateObj.attributes[tempKey]) || 0);
        extra += ` • ${t}°C`;
      }
      const humKey = this._config?.hum_attribute;
      if (humKey && stateObj.attributes[humKey] != null) {
        const h = Math.round(Number(stateObj.attributes[humKey]) || 0);
        extra += ` • ${h}%`;
      }
    }

    if (stateObj.state !== "off") {
      const per = stateObj.attributes.percentage;
      if (per != null) return `${Number(per) || 0}%${extra}`;
      return `On${extra}`;
    }
    return `Off${extra}`;
  }

  private _sliderStep(stateObj: HassEntity): number {
    const step = Number(stateObj.attributes.percentage_step);
    if (!Number.isNaN(step) && step > 0) return Math.max(1, Math.round(step));
    return 1;
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("hass") || changed.has("_config")) {
      // Clear drag overlay when HA state catches up
      if (this._dragPct != null && this._config && this.hass) {
        const st = this.hass.states[this._config.entity];
        const pct = Number(st?.attributes.percentage);
        if (!Number.isNaN(pct) && Math.abs(pct - this._dragPct) < 1) {
          this._dragPct = undefined;
        }
      }
    }
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
    const color = this._config.color || "blue";
    const rgb = resolveThemeRgb(this, color);
    const forceBg = !!this._config.force_background_color && on;
    const collapsed = !!this._config.enable_collapse && !on;
    const showSlider = !!this._config.enable_slider && !collapsed;
    // Button lives in the speed row (original); needs slider enabled
    const showButton =
      !!this._config.enable_button && !!this._config.enable_slider && !collapsed;

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon || stateObj.attributes.icon || "mdi:fan";

    const min = this._config.slider_min ?? 0;
    const max = this._config.slider_max ?? 100;
    const step = this._sliderStep(stateObj);
    const pct = Number(stateObj.attributes.percentage);
    const hasPct = !Number.isNaN(pct);
    const reported = hasPct
      ? Math.min(max, Math.max(min, pct))
      : on
        ? max
        : min;
    const sliderVal =
      this._dragPct != null
        ? Math.min(max, Math.max(min, this._dragPct))
        : reported;
    const fillPct = on || this._dragPct != null
      ? ((sliderVal - min) / (max - min || 1)) * 100
      : 0;

    const cardBg = forceBg
      ? `rgba(${rgb}, var(--opacity-bg, 1))`
      : undefined;

    const iconStyle = on
      ? {
          color: forceBg ? "rgb(250,250,250)" : `rgba(${rgb}, 1)`,
          backgroundColor: forceBg
            ? "rgba(250,250,250,0.2)"
            : `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const textStyle = forceBg
      ? {
          name: { color: "rgb(250,250,250)" },
          label: { color: "rgba(250,250,250,0.85)" },
        }
      : { name: {}, label: {} };

    const oscillating = this._oscillating(stateObj);
    const oscBtnStyle = this._oscButtonStyle(on, oscillating, forceBg, rgb);

    // Official: horizontal = header | speed side-by-side (docs screenshot)
    // Vertical = header then speed row under it
    const horizontal = !!this._config.enable_horizontal;

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          fan: true,
          horizontal,
          "force-bg": forceBg,
        })}
        style=${styleMap(
          cardBg
            ? {
                "--ha-card-background": cardBg,
                background: cardBg,
                backgroundColor: cardBg,
              }
            : {},
        )}
      >
        <div
          class=${classMap({
            stack: true,
            horizontal,
          })}
        >
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${styleMap(iconStyle)}
                @click=${() => this._call("toggle")}
              >
                <ha-icon .icon=${icon}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._moreInfo}>
                <div class="name" style=${styleMap(textStyle.name)}>
                  ${name}
                </div>
                <div class="label" style=${styleMap(textStyle.label)}>
                  ${this._label(stateObj)}
                </div>
              </button>
            </div>
          </div>

          ${showSlider || showButton
            ? html`<div
                class=${classMap({
                  "slider-row": true,
                  "with-button": showButton,
                })}
              >
                ${showSlider
                  ? html`<div
                      class="slider-wrap"
                      style=${styleMap(
                        on
                          ? {
                              background: forceBg
                                ? `rgba(${rgb}, 0.3)`
                                : `rgba(${rgb}, 0.1)`,
                            }
                          : {
                              background:
                                "rgba(var(--color-theme, 51, 51, 51), 0.05)",
                            },
                      )}
                    >
                      <div
                        class="slider-fill"
                        style=${styleMap({
                          width: `${fillPct}%`,
                          background: on || this._dragPct != null
                            ? forceBg
                              ? "rgb(250,250,250)"
                              : `rgba(${rgb}, 0.8)`
                            : "rgba(var(--color-grey, 187, 187, 187), 0.8)",
                        })}
                      ></div>
                      <input
                        type="range"
                        min=${min}
                        max=${max}
                        step=${step}
                        .value=${String(sliderVal)}
                        @input=${this._onSliderInput}
                        @change=${this._onSliderChange}
                      />
                    </div>`
                  : nothing}
                ${showButton
                  ? html`<button
                      class="widget-btn osc-btn"
                      style=${styleMap(oscBtnStyle)}
                      @click=${() => this._toggleOscillate(stateObj)}
                      title="oscillate"
                    >
                      <ha-icon
                        icon=${this._config.button_icon ||
                        "mdi:rotate-3d-variant"}
                      ></ha-icon>
                    </button>`
                  : nothing}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _oscButtonStyle(
    on: boolean,
    oscillating: boolean,
    forceBg: boolean,
    rgb: string,
  ): Record<string, string> {
    if (!on) {
      return {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      };
    }
    if (oscillating) {
      return {
        backgroundColor: forceBg
          ? "rgba(250, 250, 250, 1)"
          : `rgba(${rgb}, 0.2)`,
        color: `rgba(${rgb}, 1)`,
      };
    }
    if (forceBg) {
      return {
        backgroundColor: "rgb(250,250,250)",
        color: `rgba(${rgb}, 1)`,
      };
    }
    return {};
  }

  private _call(service: string) {
    if (!this.hass || !this._config) return;
    this.hass.callService("fan", service, { entity_id: this._config.entity });
  }

  private _toggleOscillate(stateObj: HassEntity) {
    if (!this.hass || !this._config) return;
    const service = this._config.button_service || "fan.oscillate";
    const [domain, svc] = service.includes(".")
      ? service.split(".", 2)
      : ["fan", service];
    this.hass.callService(domain, svc, {
      entity_id: this._config.entity,
      oscillating: !this._oscillating(stateObj),
    });
  }

  private _onSliderInput = (ev: Event) => {
    const value = Number((ev.target as HTMLInputElement).value);
    if (Number.isNaN(value)) return;
    this._dragPct = value;
  };

  private _onSliderChange = (ev: Event) => {
    if (!this.hass || !this._config) return;
    const value = Number((ev.target as HTMLInputElement).value);
    if (Number.isNaN(value)) return;
    this._dragPct = value;
    this.hass.callService("fan", "set_percentage", {
      entity_id: this._config.entity,
      percentage: value,
    });
  };

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
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.fan {
        height: auto;
        overflow: visible;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      /* Official enable_horizontal: icon+name | slider+button */
      .stack.horizontal {
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }

      .stack.horizontal .header {
        flex: 1 1 40%;
        min-width: 0;
      }

      .stack.horizontal .slider-row {
        flex: 1 1 60%;
        min-width: 0;
      }

      .slider-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        align-items: center;
      }

      .slider-row.with-button {
        grid-template-columns: 2fr 1fr;
      }

      .osc-btn {
        width: 100%;
        min-width: 42px;
      }

      .slider-wrap {
        height: 42px;
        border-radius: 14px;
        overflow: hidden;
        position: relative;
      }
    `,
  ];
}
