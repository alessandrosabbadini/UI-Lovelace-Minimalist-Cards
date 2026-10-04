/**
 * Faithful Lit port of card_weather_ulm.yaml (icon_more_info_new + chips).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  labels,
  textField,
} from "../../shared/config-form";
import { openUlmPopup } from "../../popups/ulm-popup";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmWeatherUlmCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-weather-ulm-card";
  entity: string;
  name?: string;
  enable_popup?: boolean;
  /** YAML typo kept: ulm_weather_popup_surpress_first_forecast */
  surpress_first_forecast?: boolean;
}

const WEATHER_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:weather-sunny-alert",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  default: "mdi:crosshairs-question",
};

const WEATHER_COLORS: Record<string, UlmThemeColor> = {
  "clear-night": "yellow",
  cloudy: "blue",
  exceptional: "red",
  fog: "grey",
  hail: "blue",
  lightning: "blue",
  "lightning-rainy": "blue",
  partlycloudy: "yellow",
  pouring: "grey",
  rainy: "blue",
  snowy: "blue",
  "snowy-rainy": "blue",
  sunny: "yellow",
  windy: "grey",
  default: "grey",
};

@customElement("ulm-weather-ulm-card")
export class UlmWeatherUlmCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmWeatherUlmCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "weather"),
        textField("name"),
        booleanField("enable_popup"),
        booleanField("surpress_first_forecast"),
      ],
      computeLabel: labels({
        entity: "Weather entity",
        name: "Name",
        enable_popup: "Enable popup (ulm_card_weather_ulm_enable_popup)",
        surpress_first_forecast: "Suppress first forecast in popup",
      }),
      computeHelper: helpers({
        enable_popup: "Opens the ULM weather popup on tap.",
        surpress_first_forecast:
          "YAML: ulm_weather_popup_surpress_first_forecast (popup option).",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmWeatherUlmCardConfig> {
    return {
      entity: "weather.demo_weather_north",
      enable_popup: false,
    };
  }

  public setConfig(config: UlmWeatherUlmCardConfig): void {
    const c = config as UlmWeatherUlmCardConfig & Record<string, unknown>;
    const entity = config.entity || (c.ulm_card_weather_ulm_entity as string);
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: config.name ?? (c.ulm_card_weather_ulm_name as string | undefined),
      enable_popup: Boolean(
        config.enable_popup ?? c.ulm_card_weather_ulm_enable_popup,
      ),
      surpress_first_forecast: Boolean(
        config.surpress_first_forecast ??
          c.ulm_weather_popup_surpress_first_forecast,
      ),
      type: "custom:ulm-weather-ulm-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    // Content-sized: top icon_info + 42px chips (omit rows to avoid stretched bottom)
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-weather-ulm"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const colorKey =
      WEATHER_COLORS[stateObj.state] || WEATHER_COLORS.default;
    const rgb = resolveThemeRgb(this, colorKey);
    const icon = WEATHER_ICONS[stateObj.state] || WEATHER_ICONS.default;
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const condition = this._localizeState(stateObj.state);
    const humidity = stateObj.attributes.humidity;
    const temp = stateObj.attributes.temperature;
    const unit =
      (stateObj.attributes.temperature_unit as string | undefined) || "°C";

    return html`
      <ha-card class="ulm-card ulm-weather-ulm">
        <div class="stack">
          <div class="row">
            <button
              class="icon-btn"
              style=${styleMap({
                color: `rgba(${rgb}, 1)`,
                backgroundColor: `rgba(${rgb}, 0.2)`,
              })}
              @click=${this._onTap}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._onTap}>
              <div class="name">${name}</div>
              <div class="label">${condition}</div>
            </button>
          </div>

          <div class="chips">
            <div class="chip">
              <div class="chip-content">
                <ha-icon icon="mdi:water"></ha-icon>
                <span class="chip-value"
                  >${humidity != null ? `${humidity}%` : "—"}</span
                >
              </div>
            </div>
            <div class="chip">
              <div class="chip-content">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span class="chip-value"
                  >${temp != null ? `${temp}${unit}` : "—"}</span
                >
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _localizeState(state: string): string {
    const key = `component.weather.entity_component._.state.${state}`;
    const localized = this.hass?.localize?.(key);
    if (localized && localized !== key) return localized;
    return state.charAt(0).toUpperCase() + state.slice(1).replace(/-/g, " ");
  }

  private _onTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "weather", this._config.entity);
      return;
    }
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

    ha-card.ulm-weather-ulm {
      height: auto;
    }

    /* card_weather_ulm: two content rows, gap 12px — not stretched 1fr/1fr */
    .stack {
      display: grid;
      grid-template-rows: min-content min-content;
      row-gap: 12px;
      height: auto;
    }

    /* list_2_items: columns 1fr 1fr, column-gap 7px */
    .chips {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 7px;
      align-items: center;
    }

    .chip {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 42px;
      border-radius: 14px;
      background-color: rgba(var(--color-theme, var(--ulm-color-theme)), 0.05);
      box-shadow: none;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
    }

    /* Shrink-wrapped group; true center in the chip (not 40/60 split) */
    .chip-content {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      column-gap: 6px;
      width: max-content;
      max-width: 100%;
    }

    .chip ha-icon {
      --mdc-icon-size: 20px;
      --ha-icon-display: flex;
      width: 20px;
      min-width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 20px;
      margin: 0;
      padding: 0;
      color: rgba(var(--color-theme, var(--ulm-color-theme)), 0.9);
    }

    .chip-value {
      flex: 0 0 auto;
      margin: 0;
      padding: 0;
      font-size: 1rem;
      line-height: 20px;
      height: 20px;
      white-space: nowrap;
    }
  `;
}
