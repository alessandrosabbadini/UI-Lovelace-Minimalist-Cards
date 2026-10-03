import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  booleanField,
  entityField,
  expandable,
  labels,
} from "../../shared/config-form";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

export interface UlmChipConfig {
  type?: "entity" | "back" | "spacer";
  entity?: string;
  icon?: string;
  name?: string;
  tap_action?: "more-info" | "toggle" | "navigate";
  navigation_path?: string;
}

export interface UlmChipsCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-chips-card";
  chips?: UlmChipConfig[];
  /** Convenience fields for the simple editor */
  chip_1_entity?: string;
  chip_2_entity?: string;
  chip_3_entity?: string;
  chip_4_entity?: string;
  show_back?: boolean;
}

@customElement("ulm-chips-card")
export class UlmChipsCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmChipsCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        booleanField("show_back"),
        expandable("chips", "Chips", [
          entityField("chip_1_entity", undefined, false),
          entityField("chip_2_entity", undefined, false),
          entityField("chip_3_entity", undefined, false),
          entityField("chip_4_entity", undefined, false),
        ]),
      ],
      computeLabel: labels({
        show_back: "Show back chip",
        chip_1_entity: "Chip 1 entity",
        chip_2_entity: "Chip 2 entity",
        chip_3_entity: "Chip 3 entity",
        chip_4_entity: "Chip 4 entity",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmChipsCardConfig> {
    return {
      show_back: true,
      chip_1_entity: "weather.demo_weather_north",
      chip_2_entity: "sensor.outside_temperature",
    };
  }

  public setConfig(config: UlmChipsCardConfig): void {
    this._config = { show_back: false, ...config, type: "custom:ulm-chips-card" };
  }

  public getCardSize(): number {
    return 1;
  }

  private _chips(): UlmChipConfig[] {
    if (!this._config) return [];
    if (this._config.chips?.length) return this._config.chips;
    const chips: UlmChipConfig[] = [];
    if (this._config.show_back) chips.push({ type: "back", icon: "mdi:arrow-left" });
    for (const key of [
      "chip_1_entity",
      "chip_2_entity",
      "chip_3_entity",
      "chip_4_entity",
    ] as const) {
      const entity = this._config[key];
      if (entity) chips.push({ type: "entity", entity, tap_action: "more-info" });
    }
    return chips;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const chips = this._chips();
    return html`
      <div class="chips">
        ${chips.map((chip) => this._renderChip(chip))}
      </div>
    `;
  }

  private _renderChip(chip: UlmChipConfig) {
    if (chip.type === "spacer") {
      return html`<div class="spacer"></div>`;
    }
    if (chip.type === "back") {
      return html`
        <button class="chip" @click=${() => history.back()}>
          <ha-icon .icon=${chip.icon || "mdi:arrow-left"}></ha-icon>
        </button>
      `;
    }

    const entityId = chip.entity;
    const stateObj = entityId ? this.hass?.states[entityId] : undefined;
    const icon =
      chip.icon || stateObj?.attributes.icon || "mdi:checkbox-blank-circle";
    const label =
      chip.name ||
      (stateObj
        ? stateObj.attributes.unit_of_measurement
          ? `${stateObj.state}${stateObj.attributes.unit_of_measurement}`
          : stateObj.state
        : "?");

    return html`
      <button class="chip" @click=${() => this._handleChip(chip)}>
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </button>
    `;
  }

  private _handleChip(chip: UlmChipConfig) {
    if (!this.hass || !chip.entity) {
      if (chip.navigation_path) {
        history.pushState(null, "", chip.navigation_path);
        window.dispatchEvent(new Event("location-changed"));
      }
      return;
    }
    if (chip.tap_action === "toggle") {
      const domain = chip.entity.split(".")[0];
      this.hass.callService(domain, "toggle", { entity_id: chip.entity });
      return;
    }
    if (chip.tap_action === "navigate" && chip.navigation_path) {
      history.pushState(null, "", chip.navigation_path);
      window.dispatchEvent(new Event("location-changed"));
      return;
    }
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: chip.entity },
      }),
    );
  }

  static styles = css`
    :host {
      display: block;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 0;
      border-radius: 999px;
      padding: 8px 12px;
      background: var(--card-background-color, #fafafa);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    .chip ha-icon {
      --mdc-icon-size: 18px;
    }
    .chip span {
      font-size: 13px;
      font-weight: 500;
    }
    .spacer {
      flex: 1;
    }
  `;
}
