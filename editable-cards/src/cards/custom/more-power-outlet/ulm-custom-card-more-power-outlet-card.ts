/**
 * Lit port of custom_cards/custom_card_more_power_outlet/
 * icon_info_bg yellow outlet with power / energy / time label combos.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle } from "../../../shared/colors";
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

export interface UlmCustomMorePowerOutletCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-more-power-outlet-card";
  entity: string;
  name?: string;
  icon?: string;
  power_sensor?: string;
  energy_sensor?: string;
  time_sensor?: string;
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

@customElement("ulm-custom-card-more-power-outlet-card")
export class UlmCustomMorePowerOutletCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomMorePowerOutletCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["switch", "input_boolean", "light"]),
        textField("name"),
        iconField("icon"),
        entityField("power_sensor", "sensor", false),
        entityField("energy_sensor", "sensor", false),
        entityField("time_sensor", "sensor", false),
      ],
      computeLabel: labels({
        entity: "Outlet / switch",
        name: "Name",
        icon: "Icon",
        power_sensor: "Power (W) — custom_card_more_power_outlet_power_sensor",
        energy_sensor:
          "Energy (kWh) — custom_card_more_power_outlet_energy_sensor",
        time_sensor: "Runtime — custom_card_more_power_outlet_time_sensor",
      }),
      computeHelper: helpers({
        time_sensor: "If value < 1, shown as Mins (×100); else Hrs",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomMorePowerOutletCardConfig> {
    return {
      entity: "switch.decorative_lights",
      icon: "mdi:power-socket-eu",
      power_sensor: "sensor.power_consumption",
    };
  }

  public setConfig(config: UlmCustomMorePowerOutletCardConfig): void {
    const c = config as UlmCustomMorePowerOutletCardConfig &
      Record<string, unknown>;
    const entity = (config.entity || pick(c, "entity")) as string | undefined;
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      icon: asStr(pick(c, "icon")),
      power_sensor: asStr(
        pick(c, "power_sensor", "custom_card_more_power_outlet_power_sensor"),
      ),
      energy_sensor: asStr(
        pick(
          c,
          "energy_sensor",
          "custom_card_more_power_outlet_energy_sensor",
        ),
      ),
      time_sensor: asStr(
        pick(c, "time_sensor", "custom_card_more_power_outlet_time_sensor"),
      ),
      type: "custom:ulm-custom-card-more-power-outlet-card",
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
      return html`<ha-card class="ulm-card ulm-more-outlet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const on = stateObj.state === "on";
    const color = "yellow" as const;
    const iconStyle = activeIconStyle(this, on, color, null, false, false);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:power-socket-eu";
    const stateLabel =
      this.hass.formatEntityState?.(stateObj) || stateObj.state;
    const label = this._buildLabel(on, stateLabel);

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-more-outlet": true,
          on,
        })}
        @click=${() => this._toggle()}
      >
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

  private _state(id?: string): string | undefined {
    if (!id || !this.hass) return undefined;
    return this.hass.states[id]?.state;
  }

  private _timePart(raw: string): string {
    const n = Number.parseFloat(raw);
    if (!Number.isFinite(n)) return raw;
    if (n < 1) return `${n * 100}Mins`;
    return `${n}Hrs`;
  }

  private _buildLabel(on: boolean, stateLabel: string): string {
    const cfg = this._config!;
    const power = this._state(cfg.power_sensor);
    const energy = this._state(cfg.energy_sensor);
    const time = this._state(cfg.time_sensor);
    const parts: string[] = [];

    if (on) {
      if (power != null) parts.push(`${power}W`);
      if (energy != null) parts.push(`${energy}kWh`);
      if (time != null) parts.push(this._timePart(time));
      return parts.length ? parts.join(" • ") : stateLabel;
    }

    if (energy != null) {
      const n = Number.parseFloat(energy);
      if (Number.isFinite(n) && n > 0) {
        return `${stateLabel} • ${energy}kWh`;
      }
    }
    return stateLabel;
  }

  private _toggle() {
    if (!this.hass || !this._config) return;
    const id = this._config.entity;
    const domain = id.split(".")[0];
    this.hass.callService(domain, "toggle", { entity_id: id });
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-more-outlet {
      height: auto;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-more-power-outlet-card": UlmCustomMorePowerOutletCard;
  }
}
