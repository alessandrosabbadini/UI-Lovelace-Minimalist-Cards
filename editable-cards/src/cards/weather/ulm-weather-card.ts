import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  colorField,
  entityField,
  grid,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmWeatherCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-weather-card";
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
}

const WEATHER_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
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
  "windy-variant": "mdi:weather-windy-variant",
  exceptional: "mdi:alert",
};

@customElement("ulm-weather-card")
export class UlmWeatherCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmWeatherCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "weather"),
        grid([textField("name"), iconField("icon")]),
        colorField("color"),
      ],
      computeLabel: labels({
        entity: "Weather entity",
        name: "Name",
        icon: "Icon",
        color: "Color",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmWeatherCardConfig> {
    return { entity: "weather.demo_weather_north", color: "blue" };
  }

  public setConfig(config: UlmWeatherCardConfig): void {
    if (!config.entity) throw new Error("Please define an entity");
    this._config = { color: "blue", ...config, type: "custom:ulm-weather-card" };
  }

  public getCardSize(): number {
    return 1;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const rgb = resolveThemeRgb(this, this._config.color || "blue");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      WEATHER_ICONS[stateObj.state] ||
      "mdi:weather-partly-cloudy";
    const temp = stateObj.attributes.temperature;

    return html`
      <ha-card class="ulm-card">
        <div class="row">
          <button
            class="icon-btn"
            style=${styleMap({
              color: `rgb(${rgb})`,
              backgroundColor: `rgba(${rgb}, 0.2)`,
            })}
            @click=${this._moreInfo}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name">${name}</div>
            <div class="label">
              ${stateObj.state}${temp !== undefined ? ` · ${temp}°` : ""}
            </div>
          </button>
        </div>
      </ha-card>
    `;
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

  static styles = ulmCardStyles;
}
