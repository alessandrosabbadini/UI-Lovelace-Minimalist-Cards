import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { activeIconStyle } from "./colors";
import { UlmEditorBase, type EditorField } from "./editor-base";
import { ulmCardStyles } from "./styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../types";

export interface SimpleEntityConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  icon?: string;
  color?: UlmThemeColor;
  force_background_color?: boolean;
}

export interface SimpleCardDefinition {
  tag: string;
  editorTag: string;
  type: string;
  name: string;
  description: string;
  defaultIcon: string;
  defaultColor?: UlmThemeColor;
  stubEntity?: string;
  isActive?: (state: HassEntity) => boolean;
  stateLabel?: (hass: HomeAssistant, state: HassEntity) => string;
  onIconTap?: (
    hass: HomeAssistant,
    config: SimpleEntityConfig,
    state: HassEntity,
  ) => void;
  extraFields?: EditorField[];
}

function isOnLike(state: HassEntity): boolean {
  return ["on", "open", "opening", "home", "playing", "cleaning"].includes(
    state.state,
  );
}

export function createSimpleEntityCard(def: SimpleCardDefinition) {
  class Card extends LitElement implements LovelaceCard {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private _config?: SimpleEntityConfig;

    public static async getConfigElement() {
      return document.createElement(def.editorTag);
    }

    public static getStubConfig(): Partial<SimpleEntityConfig> {
      return {
        entity: def.stubEntity || "sensor.demo",
        color: def.defaultColor || "blue",
      };
    }

    public setConfig(config: SimpleEntityConfig): void {
      if (!config.entity) throw new Error("Please define an entity");
      this._config = {
        color: def.defaultColor || "blue",
        force_background_color: false,
        ...config,
        type: def.type,
      };
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

      const active = (def.isActive || isOnLike)(stateObj);
      const color = (this._config.color ||
        def.defaultColor ||
        "blue") as UlmThemeColor;
      const name =
        this._config.name ||
        stateObj.attributes.friendly_name ||
        stateObj.entity_id;
      const icon =
        this._config.icon || stateObj.attributes.icon || def.defaultIcon;
      const label = def.stateLabel
        ? def.stateLabel(this.hass, stateObj)
        : stateObj.state;
      const iconStyle = activeIconStyle(this, active, color);
      const cardStyle = {
        backgroundColor:
          active && this._config.force_background_color
            ? iconStyle.backgroundColor
            : undefined,
      };

      return html`
        <ha-card class="ulm-card" style=${styleMap(cardStyle)}>
          <div class="row">
            <button
              class="icon-btn"
              style=${styleMap(iconStyle)}
              @click=${this._iconTap}
            >
              <ha-icon .icon=${icon}></ha-icon>
            </button>
            <button class="info-btn" @click=${this._moreInfo}>
              <div class="name">${name}</div>
              <div class="label">${label}</div>
            </button>
          </div>
        </ha-card>
      `;
    }

    private _iconTap = (ev: Event) => {
      ev.stopPropagation();
      if (!this.hass || !this._config) return;
      const stateObj = this.hass.states[this._config.entity];
      if (!stateObj) return;
      if (def.onIconTap) {
        def.onIconTap(this.hass, this._config, stateObj);
        return;
      }
      this._moreInfo(ev);
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

    static styles = ulmCardStyles;
  }

  class Editor extends UlmEditorBase<SimpleEntityConfig> {
    protected render() {
      return this.renderFields([
        {
          type: "text",
          key: "entity",
          label: "Entity",
          placeholder: def.stubEntity || "sensor.demo",
        },
        {
          type: "text",
          key: "name",
          label: "Name (optional)",
          placeholder: "Leave empty for entity name",
        },
        {
          type: "text",
          key: "icon",
          label: "Icon (optional)",
          placeholder: def.defaultIcon,
        },
        { type: "color", key: "color", label: "Theme color" },
        {
          type: "toggle",
          key: "force_background_color",
          label: "Force colored background when active",
        },
        ...(def.extraFields || []),
      ]);
    }
  }

  if (!customElements.get(def.tag)) customElements.define(def.tag, Card);
  if (!customElements.get(def.editorTag)) customElements.define(def.editorTag, Editor);

  return { Card, Editor, def };
}
