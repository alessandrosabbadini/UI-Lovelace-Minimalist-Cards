import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import { UlmEditorBase } from "../../shared/editor-base";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

export interface UlmPersonCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-person-card";
  entity: string;
  name?: string;
  icon?: string;
  use_entity_picture?: boolean;
  battery_entity?: string;
  eta_entity?: string;
  address_entity?: string;
}

@customElement("ulm-person-card")
export class UlmPersonCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmPersonCardConfig;

  public static async getConfigElement() {
    return document.createElement("ulm-person-card-editor");
  }

  public static getStubConfig(): Partial<UlmPersonCardConfig> {
    return {
      entity: "person.alessandro_sabbadini",
      use_entity_picture: true,
    };
  }

  public setConfig(config: UlmPersonCardConfig): void {
    const c = config as UlmPersonCardConfig & Record<string, unknown>;
    const entity =
      config.entity || (c.ulm_card_person_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      icon:
        config.icon ||
        (c.ulm_card_person_icon as string | undefined) ||
        "mdi:face-man",
      use_entity_picture:
        config.use_entity_picture ??
        Boolean(c.ulm_card_person_use_entity_picture) ??
        false,
      battery_entity:
        config.battery_entity ||
        (c.ulm_card_person_battery as string | undefined),
      eta_entity:
        config.eta_entity || (c.ulm_card_person_eta as string | undefined),
      address_entity:
        config.address_entity || (c.ulm_address as string | undefined),
      type: "custom:ulm-person-card",
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

    const home = stateObj.state === "home";
    const rgb = resolveThemeRgb(this, home ? "blue" : "green");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const picture =
      this._config.use_entity_picture && stateObj.attributes.entity_picture;
    const icon = this._config.icon || "mdi:face-man";

    let label = this._zoneLabel(stateObj.state);
    if (this._config.address_entity) {
      const address = this.hass.states[this._config.address_entity];
      if (address) label = address.state;
    }
    if (this._config.eta_entity && !home) {
      const eta = this.hass.states[this._config.eta_entity];
      if (eta) label = `${label} | ${eta.state}`;
    }

    const battery = this._config.battery_entity
      ? this.hass.states[this._config.battery_entity]
      : undefined;
    const batteryValue = battery ? Number(battery.state) : NaN;

    return html`
      <ha-card class="ulm-card">
        <div class="row">
          <button class="icon-btn" @click=${this._moreInfo}>
            ${picture
              ? html`<img src=${picture} alt=${name} />`
              : html`<ha-icon
                  .icon=${icon}
                  style=${styleMap({
                    color: "rgba(var(--color-theme, 51,51,51), 0.9)",
                  })}
                ></ha-icon>`}
            <span
              class="badge"
              style=${styleMap({ backgroundColor: `rgb(${rgb})` })}
            >
              <ha-icon
                .icon=${home ? "mdi:home-variant" : "mdi:home-export-outline"}
              ></ha-icon>
            </span>
            ${!Number.isNaN(batteryValue)
              ? html`<span
                  class="badge right"
                  style=${styleMap({
                    backgroundColor:
                      batteryValue < 20
                        ? "rgb(245,68,54)"
                        : "rgba(var(--color-theme,51,51,51),0.35)",
                  })}
                  title="${batteryValue}%"
                  ><ha-icon icon="mdi:battery"></ha-icon
                ></span>`
              : nothing}
          </button>
          <button class="info-btn" @click=${this._moreInfo}>
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </button>
        </div>
      </ha-card>
    `;
  }

  private _zoneLabel(state: string) {
    if (state === "home") return "Home";
    if (state === "not_home") return "Away";
    return state;
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

@customElement("ulm-person-card-editor")
export class UlmPersonCardEditor extends UlmEditorBase<UlmPersonCardConfig> {
  protected render() {
    return this.renderFields([
      { type: "section", label: "Entity" },
      {
        type: "text",
        key: "entity",
        label: "Person entity — ulm_card_person_entity",
        placeholder: "person.alex",
      },
      { type: "text", key: "name", label: "Name (optional)" },
      {
        type: "text",
        key: "icon",
        label: "Icon — ulm_card_person_icon",
        placeholder: "mdi:face-man",
      },
      {
        type: "toggle",
        key: "use_entity_picture",
        label: "Use entity picture — ulm_card_person_use_entity_picture",
      },
      { type: "section", label: "Extras" },
      {
        type: "text",
        key: "battery_entity",
        label: "Battery sensor — ulm_card_person_battery",
      },
      {
        type: "text",
        key: "eta_entity",
        label: "ETA sensor — ulm_card_person_eta",
      },
      {
        type: "text",
        key: "address_entity",
        label: "Address sensor — ulm_address",
      },
    ]);
  }
}
