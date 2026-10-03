/**
 * Faithful Lit port of card_person.yaml (+ icon_info_bg layout).
 *
 * Badge (`notification`) and battery (`info`) are absolute on the card,
 * same as button-card custom_fields — not inside the icon cell.
 */
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  entityField,
  expandable,
  grid,
  helpers,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import type {
  HomeAssistant,
  HassEntity,
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

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "person"),
        grid([textField("name"), iconField("icon")]),
        booleanField("use_entity_picture"),
        expandable("extras", "Extras", [
          entityField("battery_entity", "sensor", false),
          entityField("eta_entity", "sensor", false),
          entityField("address_entity", undefined, false),
        ]),
      ],
      computeLabel: labels({
        entity: "Person entity (ulm_card_person_entity)",
        name: "Name",
        icon: "Icon (ulm_card_person_icon)",
        use_entity_picture: "Use entity picture",
        battery_entity: "Battery (ulm_card_person_battery)",
        eta_entity: "ETA (ulm_card_person_eta)",
        address_entity: "Address (ulm_address)",
      }),
      computeHelper: helpers({
        use_entity_picture:
          "Show entity_picture instead of the icon (default false).",
        battery_entity: "Battery % ring in the top-right corner.",
        eta_entity: "Shown in the label when the person is not home.",
        address_entity: "Replaces the zone label with an address sensor.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmPersonCardConfig> {
    return {
      entity: "person.anne_therese",
      use_entity_picture: false,
      icon: "mdi:face-man",
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
      use_entity_picture: Boolean(
        config.use_entity_picture ?? c.ulm_card_person_use_entity_picture,
      ),
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

  public getGridOptions() {
    // Original icon_info_bg is content-sized (~66px: 12+42+12).
    // Omit rows so the section slot doesn't stretch taller than the card.
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const home = stateObj.state === "home";
    // YAML: not home → green, home → blue
    const badgeRgb = resolveThemeRgb(this, home ? "blue" : "green");
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const usePic = !!this._config.use_entity_picture;
    const picture =
      usePic && stateObj.attributes.entity_picture
        ? String(stateObj.attributes.entity_picture)
        : undefined;
    const icon = this._config.icon || "mdi:face-man";
    const badgeIcon = this._badgeIcon(stateObj);
    const label = this._label(stateObj, home);
    const batterySvg = this._batterySvg();

    return html`
      <ha-card class="ulm-person" @click=${this._moreInfo}>
        <!-- icon_info_bg grid: 'i n' / 'i l' -->
        <div class="grid">
          <div class="img-cell">
            ${picture
              ? html`<img
                  class="entity-picture"
                  src=${picture}
                  alt=${name}
                />`
              : html`<ha-icon
                  class="person-icon"
                  .icon=${icon}
                  style=${styleMap({
                    color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
                    width: "20px",
                    height: "20px",
                  })}
                ></ha-icon>`}
          </div>
          <div class="name">${name}</div>
          <div class="label">${label}</div>
        </div>

        <!-- custom_fields.notification — absolute on card -->
        <span
          class="notification"
          style=${styleMap({
            backgroundColor: `rgba(${badgeRgb}, 1)`,
          })}
        >
          <ha-icon .icon=${badgeIcon}></ha-icon>
        </span>

        <!-- custom_fields.info — battery ring absolute on card -->
        ${batterySvg
          ? html`<div class="info">${batterySvg}</div>`
          : nothing}
      </ha-card>
    `;
  }

  private _badgeIcon(stateObj: HassEntity): string {
    if (stateObj.state === "home") return "mdi:home-variant";

    if (this.hass) {
      for (const [id, st] of Object.entries(this.hass.states)) {
        if (!id.startsWith("zone.")) continue;
        const persons = st.attributes.persons as string[] | undefined;
        if (st.attributes.passive) continue;
        // Original checks persons.includes(entity.state); also match entity_id / zone
        if (
          persons?.includes(stateObj.state) ||
          persons?.includes(stateObj.entity_id) ||
          id === `zone.${stateObj.state}` ||
          st.attributes.friendly_name === stateObj.state
        ) {
          return st.attributes.icon != null
            ? String(st.attributes.icon)
            : "mdi:help-circle";
        }
      }
    }

    return "mdi:home-minus";
  }

  private _label(stateObj: HassEntity, home: boolean): string {
    let label = this._localizePerson(stateObj);
    let eta = "";

    if (this._config?.eta_entity && !home && this.hass) {
      const etaState = this.hass.states[this._config.eta_entity];
      if (etaState) {
        eta = ` | ${this.hass.formatEntityState?.(etaState) || etaState.state}`;
      }
    }

    if (this._config?.address_entity && this.hass) {
      const address = this.hass.states[this._config.address_entity];
      if (address) {
        return (
          (this.hass.formatEntityState?.(address) || address.state) + eta
        );
      }
    }

    return label + eta;
  }

  private _localizePerson(stateObj: HassEntity): string {
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    if (stateObj.state === "home") return "Home";
    if (stateObj.state === "not_home") return "Away";
    return stateObj.state;
  }

  private _batterySvg() {
    if (!this._config?.battery_entity || !this.hass) return nothing;
    const battery = this.hass.states[this._config.battery_entity];
    if (!battery) return nothing;
    const value = Math.round(Number(battery.state));
    if (Number.isNaN(value)) return nothing;

    const radius = 20.5;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return svg`
      <svg viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r=${radius}
          stroke="green"
          stroke-width="3"
          fill="none"
          style="transform: rotate(-90deg); transform-origin: 50% 50%; stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"
        />
        <text
          x="50%"
          y="54%"
          fill="var(--primary-text-color)"
          font-size="16"
          font-weight="bold"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          ${value}<tspan font-size="10">%</tspan>
        </text>
      </svg>
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

  static styles = css`
    :host {
      display: block;
      width: 100%;
      /* Content height like original button-card (not stretched) */
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    .warning {
      padding: 8px;
      color: var(--error-color);
      font-size: 14px;
    }

    /*
     * icon_info_bg styles.card — padding 12px, height = 12+42+12 ≈ 66px
     */
    ha-card.ulm-person {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      display: block;
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 12px;
      margin: 0;
      overflow: visible;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      --ha-card-border-width: 0px;
      --ha-card-padding: 0px;
    }

    /*
     * icon_info_bg styles.grid:
     * 'i n' / 'i l', columns min-content auto, rows min-content min-content
     *
     * button-card sizes the two rows against the 42px img_cell span, so each
     * row becomes ~21px; name (align end) + label (align start) meet at the
     * midline. Force the same by locking grid height to the icon.
     */
    .grid {
      display: grid;
      grid-template-areas:
        "i n"
        "i l";
      grid-template-columns: min-content auto;
      grid-template-rows: 1fr 1fr;
      column-gap: 0;
      row-gap: 0;
      height: 42px;
      width: 100%;
      align-content: stretch;
    }

    /* icon_info_bg styles.img_cell */
    .img-cell {
      grid-area: i;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      place-items: center;
      place-self: center;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* card_person styles.icon — 20px / picture 42px stretch */
    .person-icon {
      --mdc-icon-size: 20px;
      width: 20px;
      height: 20px;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      line-height: 0;
    }

    .entity-picture {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      object-fit: cover;
    }

    /* icon_info_bg styles.name — align-self end, margin-left 12px, 14px bold */
    .name {
      grid-area: n;
      align-self: end;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    /* icon_info_bg styles.label — align-self start, 12px bold, opacity 40% */
    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      margin: 0 0 0 12px;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
    }

    /*
     * card_person notification — absolute on card padding box
     * left: 38px; top: 8px; 16×16 (border 2px → 12px content box)
     */
    .notification {
      position: absolute;
      left: 38px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    .notification ha-icon {
      --mdc-icon-size: 10px;
      width: 10px;
      height: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      line-height: 0;
      color: var(--primary-background-color, #fff);
    }

    .notification ha-icon svg {
      display: block;
      width: 10px;
      height: 10px;
    }

    /* card_person info — right: 6px; top: 6px; 25×25 */
    .info {
      position: absolute;
      right: 6px;
      top: 6px;
      width: 25px;
      height: 25px;
      pointer-events: none;
      z-index: 2;
    }

    .info svg {
      width: 25px;
      height: 25px;
      display: block;
    }
  `;
}
