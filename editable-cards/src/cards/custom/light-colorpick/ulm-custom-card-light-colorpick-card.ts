/**
 * Lit port of custom_cards/custom_card_light_colorpick/
 * Yellow icon_info + brightness slider + RGB preset chips when on.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../../shared/colors";
import {
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
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

const RGB_PRESETS: { rgb: [number, number, number]; css: string }[] = [
  { rgb: [255, 255, 255], css: "rgba(255, 255, 255, 0.8)" },
  { rgb: [245, 68, 54], css: "rgba(245, 68, 54, 0.8)" },
  { rgb: [51, 102, 204], css: "rgba(51, 102, 204, 0.8)" },
  { rgb: [51, 204, 51], css: "rgba(51, 204, 51, 0.8)" },
  { rgb: [255, 0, 255], css: "rgba(255, 0, 255, 0.8)" },
  { rgb: [0, 255, 255], css: "rgba(0, 255, 255, 0.8)" },
];

export interface UlmCustomLightColorpickCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-light-colorpick-card";
  entity: string;
  name?: string;
  icon?: string;
  /** Seconds for color transition (default 1) */
  transition?: number;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

@customElement("ulm-custom-card-light-colorpick-card")
export class UlmCustomLightColorpickCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomLightColorpickCardConfig;
  @state() private _dragPct?: number;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "light"),
        textField("name"),
        iconField("icon"),
        numberField("transition"),
      ],
      computeLabel: labels({
        entity: "Light",
        name: "Name (ulm_card_light_colorpick_name)",
        icon: "Icon",
        transition: "Color transition seconds",
      }),
      computeHelper: helpers({
        transition: "Default 1 — passed to light.turn_on for RGB presets",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomLightColorpickCardConfig> {
    return {
      entity: "light.living_room_rgbww_lights",
      icon: "mdi:lightbulb",
      transition: 1,
    };
  }

  public setConfig(config: UlmCustomLightColorpickCardConfig): void {
    const c = config as UlmCustomLightColorpickCardConfig &
      Record<string, unknown>;
    const entity = (config.entity || pick(c, "entity")) as string | undefined;
    if (!entity) throw new Error("Please define an entity");
    const tr = Number(pick(c, "transition", "ulm_card_light_colorpick_transition"));
    this._config = {
      ...config,
      entity,
      name:
        (pick(
          c,
          "name",
          "ulm_card_light_colorpick_name",
          "ulm_card_light_slider_horizontal_name",
        ) as string) || undefined,
      icon: (pick(c, "icon") as string) || undefined,
      transition: Number.isFinite(tr) && tr >= 0 ? tr : 1,
      type: "custom:ulm-custom-card-light-colorpick-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-light-colorpick"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const on = stateObj.state === "on";
    const rgb = resolveThemeRgb(this, "yellow");
    const bri = stateObj.attributes.brightness;
    const pct =
      on && typeof bri === "number"
        ? Math.round(bri / 2.55)
        : undefined;
    const displayPct = this._dragPct ?? pct ?? 0;
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:lightbulb";
    const iconStyle = activeIconStyle(this, on, "yellow", null, false, false);
    const label =
      pct !== undefined
        ? `${pct}%`
        : this.hass.formatEntityState?.(stateObj) || stateObj.state;

    const cardStyle = on
      ? {
          backgroundColor: `rgba(${rgb}, var(--opacity-bg, 1))`,
        }
      : {};

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-light-colorpick": true,
          on,
        })}
        style=${styleMap(cardStyle)}
      >
        <div class="grid">
          <div class="row header">
            <button
              class="icon-btn"
              type="button"
              style=${styleMap(iconStyle)}
              @click=${() => this._toggle()}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </button>
            <button class="info-btn" type="button" @click=${() => this._moreInfo()}>
              <div class="name">${name}</div>
              <div class="label">${label}</div>
            </button>
          </div>

          <div
            class="slider-wrap"
            style=${styleMap({
              background: on
                ? `rgba(${rgb}, 0.2)`
                : "rgba(var(--color-theme, 51, 51, 51), 0.05)",
            })}
          >
            <div
              class="slider-fill"
              style=${styleMap({
                width: `${on ? displayPct : 0}%`,
                background: on ? `rgba(${rgb}, 1)` : "transparent",
              })}
            ></div>
            <input
              type="range"
              min="1"
              max="100"
              .value=${String(Math.max(1, displayPct || 1))}
              @input=${(ev: Event) => {
                this._dragPct = Number((ev.target as HTMLInputElement).value);
              }}
              @change=${(ev: Event) => {
                const v = Number((ev.target as HTMLInputElement).value);
                this._dragPct = undefined;
                this._setBrightness(v);
              }}
            />
          </div>

          ${on
            ? html`<div class="chips">
                ${RGB_PRESETS.map(
                  (p) => html`
                    <button
                      class="chip"
                      type="button"
                      style=${styleMap({ background: p.css })}
                      @click=${() => this._setRgb(p.rgb)}
                    ></button>
                  `,
                )}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _toggle() {
    if (!this.hass || !this._config) return;
    this.hass.callService("light", "toggle", {
      entity_id: this._config.entity,
    });
  }

  private _setBrightness(pct: number) {
    if (!this.hass || !this._config) return;
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      brightness_pct: pct,
    });
  }

  private _setRgb(rgb: [number, number, number]) {
    if (!this.hass || !this._config) return;
    this.hass.callService("light", "turn_on", {
      entity_id: this._config.entity,
      rgb_color: rgb,
      transition: this._config.transition ?? 1,
    });
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
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-light-colorpick {
      height: auto;
      padding: 12px;
      display: block;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "header slider"
        "chips chips";
      gap: 0 12px;
      align-items: center;
    }

    ha-card.on .grid {
      row-gap: 12px;
    }

    .header {
      grid-area: header;
      min-width: 0;
    }

    .slider-wrap {
      grid-area: slider;
      height: 42px;
      border-radius: 14px;
    }

    .slider-wrap input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 42px;
      margin: 0;
      background: transparent;
      cursor: pointer;
    }

    .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
      height: 42px;
      border-radius: 14px;
      background: transparent;
    }

    .slider-wrap input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 42px;
      border-radius: 0;
      background: transparent;
    }

    .chips {
      grid-area: chips;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 8px;
    }

    .chip {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid rgba(var(--color-theme, 51, 51, 51), 0.15);
      padding: 0;
      cursor: pointer;
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-light-colorpick-card": UlmCustomLightColorpickCard;
  }
}
