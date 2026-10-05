/**
 * Lit port of custom_cards/custom_card_water_heater/
 * icon_info with consumption-driven red active state.
 * Original hardcoded French labels + Shelly sensor — both parameterized here.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomWaterHeaterCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-water-heater-card";
  entity: string;
  name?: string;
  icon?: string;
  /** Power / consumption sensor (W) — original: sensor.shelly_prise_salon_conso */
  consumption_sensor?: string;
  label_off?: string;
  label_idle?: string;
  label_heating?: string;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

@customElement("ulm-custom-card-water-heater-card")
export class UlmCustomWaterHeaterCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomWaterHeaterCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["water_heater", "switch", "climate"]),
        textField("name"),
        iconField("icon"),
        entityField("consumption_sensor", "sensor", false),
        textField("label_off"),
        textField("label_idle"),
        textField("label_heating"),
      ],
      computeLabel: labels({
        entity: "Water heater / switch",
        name: "Name",
        icon: "Icon",
        consumption_sensor: "Consumption sensor (W)",
        label_off: "Label when off",
        label_idle: "Label when idle (0 W)",
        label_heating: "Label prefix when heating",
      }),
      computeHelper: helpers({
        consumption_sensor:
          "When > 0, card turns red and shows Heating • {W}W",
        label_off: 'Default "Forced off" (original FR: Arrêt forcé)',
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomWaterHeaterCardConfig> {
    return {
      entity: "water_heater.demo_water_heater",
      icon: "mdi:waves",
      consumption_sensor: "sensor.power_consumption",
    };
  }

  public setConfig(config: UlmCustomWaterHeaterCardConfig): void {
    const c = config as UlmCustomWaterHeaterCardConfig & Record<string, unknown>;
    const entity = (config.entity || pick(c, "entity")) as string | undefined;
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: (pick(c, "name") as string) || undefined,
      icon: (pick(c, "icon") as string) || undefined,
      consumption_sensor:
        (pick(c, "consumption_sensor", "ulm_card_water_heater_consumption") as
          | string
          | undefined) || undefined,
      label_off: (pick(c, "label_off") as string) || undefined,
      label_idle: (pick(c, "label_idle") as string) || undefined,
      label_heating: (pick(c, "label_heating") as string) || undefined,
      type: "custom:ulm-custom-card-water-heater-card",
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
      return html`<ha-card class="ulm-card ulm-water-heater"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const watts = this._watts();
    const heating = watts > 0;
    const off = stateObj.state === "off";
    const rgb = resolveThemeRgb(this, "red");
    // When heating, solid/tint red card → light icon for contrast (opacity-bg
    // defaults to 1 in tokens; original red-on-red would be invisible).
    const iconStyle = heating
      ? {
          color: "rgb(250, 250, 250)",
          backgroundColor: "rgba(250, 250, 250, 0.2)",
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    const textStyle = heating
      ? { color: "rgb(250, 250, 250)" }
      : {};
    const cardStyle = heating
      ? {
          backgroundColor: `rgba(${rgb}, var(--opacity-bg, 1))`,
        }
      : {};

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon = this._config.icon || "mdi:waves";
    const label = this._label(off, heating, watts);

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-water-heater": true,
          heating,
        })}
        style=${styleMap(cardStyle)}
        @click=${() => this._moreInfo()}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name" style=${styleMap(textStyle)}>${name}</div>
            <div class="label" style=${styleMap(textStyle)}>${label}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _watts(): number {
    const id = this._config?.consumption_sensor;
    if (!id || !this.hass) return 0;
    const s = this.hass.states[id];
    if (!s) return 0;
    const n = Number.parseFloat(s.state);
    return Number.isFinite(n) ? n : 0;
  }

  private _label(off: boolean, heating: boolean, watts: number): string {
    if (off) return this._config?.label_off || "Forced off";
    if (heating) {
      const prefix = this._config?.label_heating || "Heating";
      return `${prefix} • ${watts}W`;
    }
    return this._config?.label_idle || "Idle";
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

    ha-card.ulm-card.ulm-water-heater {
      height: auto;
      cursor: pointer;
    }

    .icon-btn ha-icon {
      color: inherit;
    }

    ha-card.heating .label {
      filter: none;
      opacity: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-water-heater-card": UlmCustomWaterHeaterCard;
  }
}
