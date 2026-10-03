import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle, resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  expandable,
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

export interface UlmRoomCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-room-card";
  name?: string;
  icon?: string;
  entity?: string;
  color?: UlmThemeColor;
  label_use_temperature?: boolean;
  label_use_brightness?: boolean;
  entity_1?: string;
  entity_2?: string;
  entity_3?: string;
  entity_4?: string;
  navigation_path?: string;
}

@customElement("ulm-room-card")
export class UlmRoomCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmRoomCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        grid([textField("name"), iconField("icon")]),
        entityField("entity", undefined, false),
        colorField("color"),
        textField("navigation_path"),
        booleanField("label_use_temperature"),
        booleanField("label_use_brightness"),
        expandable("sub", "Sub entities", [
          entityField("entity_1", undefined, false),
          entityField("entity_2", undefined, false),
          entityField("entity_3", undefined, false),
          entityField("entity_4", undefined, false),
        ]),
      ],
      computeLabel: labels({
        name: "Name",
        icon: "Icon",
        entity: "Main entity",
        color: "Color",
        navigation_path: "Navigation path",
        label_use_temperature: "Label = temperature",
        label_use_brightness: "Label = brightness",
        entity_1: "Entity 1",
        entity_2: "Entity 2",
        entity_3: "Entity 3",
        entity_4: "Entity 4",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmRoomCardConfig> {
    return {
      name: "Living room",
      icon: "mdi:sofa",
      color: "blue",
      entity: "light.bed_light",
      entity_1: "light.bed_light",
      entity_2: "light.ceiling_lights",
      entity_3: "light.kitchen_lights",
      entity_4: "fan.living_room_fan",
      label_use_brightness: true,
      label_use_temperature: false,
    };
  }

  public setConfig(config: UlmRoomCardConfig): void {
    this._config = {
      color: "blue",
      icon: "mdi:sofa",
      label_use_temperature: true,
      label_use_brightness: false,
      name: "Room",
      ...config,
      type: "custom:ulm-room-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const rgb = resolveThemeRgb(this, this._config.color || "blue");
    const main = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;
    const active = main
      ? !["off", "closed", "unavailable", "unknown"].includes(main.state)
      : true;
    const iconStyle = activeIconStyle(
      this,
      active,
      this._config.color || "blue",
    );
    const entities = [
      this._config.entity_1,
      this._config.entity_2,
      this._config.entity_3,
      this._config.entity_4,
    ].filter(Boolean) as string[];

    return html`
      <ha-card class="ulm-card room">
        <button class="room-main" @click=${this._navigateOrToggle}>
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${this._config.icon || "mdi:sofa"}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${this._config.name}</div>
            <div class="label">${this._label(main)}</div>
          </div>
        </button>
        ${entities.length
          ? html`<div class="room-entities">
              ${entities.map((entityId) => this._renderEntity(entityId, rgb))}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _label(main?: { state: string; attributes: Record<string, unknown> }) {
    if (!main) return "";
    if (this._config?.label_use_brightness) {
      const bri = main.attributes.brightness;
      if (typeof bri === "number") return `${Math.round((bri / 255) * 100)}%`;
      return main.state === "on" ? "On" : "Off";
    }
    if (this._config?.label_use_temperature) {
      const temp =
        main.attributes.current_temperature ??
        main.attributes.temperature ??
        (main.state.match(/^-?\d/) ? main.state : undefined);
      if (temp !== undefined) return `${temp}°`;
    }
    return main.state;
  }

  private _renderEntity(entityId: string, rgb: string) {
    const stateObj = this.hass?.states[entityId];
    if (!stateObj) {
      return html`<button class="chip" disabled>?</button>`;
    }
    const active = !["off", "closed", "unavailable", "unknown"].includes(
      stateObj.state,
    );
    return html`
      <button
        class="chip"
        style=${styleMap({
          color: active ? `rgb(${rgb})` : "rgba(var(--color-theme,51,51,51),0.35)",
          backgroundColor: active
            ? `rgba(${rgb}, 0.15)`
            : "rgba(var(--color-theme,51,51,51),0.05)",
        })}
        @click=${(ev: Event) => this._toggleEntity(ev, entityId)}
      >
        <ha-icon
          .icon=${stateObj.attributes.icon || "mdi:circle-medium"}
        ></ha-icon>
      </button>
    `;
  }

  private _toggleEntity(ev: Event, entityId: string) {
    ev.stopPropagation();
    if (!this.hass) return;
    const domain = entityId.split(".")[0];
    this.hass.callService(domain, "toggle", { entity_id: entityId });
  }

  private _navigateOrToggle = () => {
    if (this._config?.navigation_path) {
      history.pushState(null, "", this._config.navigation_path);
      window.dispatchEvent(new Event("location-changed"));
      return;
    }
    if (this._config?.entity && this.hass) {
      const domain = this._config.entity.split(".")[0];
      this.hass.callService(domain, "toggle", {
        entity_id: this._config.entity,
      });
    }
  };

  static styles = [
    ulmCardStyles,
    css`
      .room-main {
        display: flex;
        align-items: center;
        gap: 0;
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        cursor: pointer;
        color: inherit;
        font: inherit;
        text-align: left;
      }

      .room-entities {
        display: flex;
        gap: 8px;
        margin-top: 12px;
        justify-content: flex-end;
        flex-wrap: wrap;
      }

      .chip {
        width: 36px;
        height: 36px;
        border: 0;
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: pointer;
      }

      .chip ha-icon {
        --mdc-icon-size: 18px;
      }
    `,
  ];
}
