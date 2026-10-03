/**
 * Faithful Lit port of card_room.yaml + widget_icon_room.
 * Layout/spacing values are taken verbatim from the original button-card template.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  colorField,
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
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmRoomAction {
  action?: string;
  entity?: string;
  navigation_path?: string;
  url_path?: string;
  service?: string;
  perform_action?: string;
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface UlmRoomEntityConfig {
  entity_id: string;
  icon?: string;
  color?: UlmThemeColor;
  /** from yellow_on / yellow_off / yellow_no_state */
  color_mode?: "on" | "off" | "always";
  templates?: string[];
  tap_action?: UlmRoomAction;
  hold_action?: UlmRoomAction;
}

export interface UlmRoomCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-room-card";
  name?: string;
  icon?: string;
  entity?: string;
  /** Main room color (original color templates: blue_no_state, red_no_state, …) */
  color?: UlmThemeColor;
  label_use_temperature?: boolean;
  label_use_brightness?: boolean;
  label?: string;
  navigation_path?: string;
  ulm_input_select?: string;
  ulm_input_select_option?: string;
  entity_1?: string | UlmRoomEntityConfig;
  entity_2?: string | UlmRoomEntityConfig;
  entity_3?: string | UlmRoomEntityConfig;
  entity_4?: string | UlmRoomEntityConfig;
  entity_1_color?: UlmThemeColor;
  entity_2_color?: UlmThemeColor;
  entity_3_color?: UlmThemeColor;
  entity_4_color?: UlmThemeColor;
  entity_1_icon?: string;
  entity_2_icon?: string;
  entity_3_icon?: string;
  entity_4_icon?: string;
}

type SlotKey = "entity_1" | "entity_2" | "entity_3" | "entity_4";

const COLOR_TEMPLATE_RE =
  /^(yellow|blue|green|red|pink|purple|grey)_(on|off|no_state|no_card)$/;

function parseTemplates(templates?: string[]): {
  color?: UlmThemeColor;
  color_mode?: "on" | "off" | "always";
} {
  if (!templates?.length) return {};
  for (const t of templates) {
    const m = String(t).match(COLOR_TEMPLATE_RE);
    if (!m) continue;
    const mode = m[2];
    return {
      color: m[1] as UlmThemeColor,
      color_mode:
        mode === "no_state" || mode === "no_card"
          ? "always"
          : (mode as "on" | "off"),
    };
  }
  return {};
}

function asEntity(
  value: string | UlmRoomEntityConfig | undefined,
  flatColor?: UlmThemeColor,
  flatIcon?: string,
): UlmRoomEntityConfig | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    return {
      entity_id: value,
      color: flatColor,
      icon: flatIcon,
      color_mode: flatColor ? "on" : undefined,
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
    };
  }
  const fromTpl = parseTemplates(value.templates);
  const entityId =
    value.entity_id ||
    (value as unknown as { entity?: string }).entity ||
    "";
  if (!entityId) return undefined;
  return {
    ...value,
    entity_id: entityId,
    color: value.color || flatColor || fromTpl.color,
    icon: value.icon || flatIcon,
    color_mode:
      value.color_mode ||
      fromTpl.color_mode ||
      (value.color || flatColor ? "on" : undefined),
    tap_action: value.tap_action || { action: "toggle" },
    hold_action: value.hold_action || { action: "more-info" },
  };
}

function isOn(state: string): boolean {
  return state === "on";
}

@customElement("ulm-room-card")
export class UlmRoomCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmRoomCardConfig;
  private _slots: Partial<Record<SlotKey, UlmRoomEntityConfig>> = {};

  public static getConfigForm() {
    return {
      schema: [
        grid([textField("name"), iconField("icon")]),
        entityField("entity", undefined, false),
        colorField("color"),
        textField("navigation_path"),
        expandable("label_opts", "Label", [
          booleanField("label_use_temperature"),
          booleanField("label_use_brightness"),
          textField("label"),
        ]),
        expandable("sub1", "Entity 1", [
          entityField("entity_1", undefined, false),
          grid([iconField("entity_1_icon"), colorField("entity_1_color")]),
        ]),
        expandable("sub2", "Entity 2", [
          entityField("entity_2", undefined, false),
          grid([iconField("entity_2_icon"), colorField("entity_2_color")]),
        ]),
        expandable("sub3", "Entity 3", [
          entityField("entity_3", undefined, false),
          grid([iconField("entity_3_icon"), colorField("entity_3_color")]),
        ]),
        expandable("sub4", "Entity 4", [
          entityField("entity_4", undefined, false),
          grid([iconField("entity_4_icon"), colorField("entity_4_color")]),
        ]),
      ],
      computeLabel: labels({
        name: "Name",
        icon: "Icon",
        entity: "Main entity",
        color: "Room color (blue_no_state / red_no_state…)",
        navigation_path: "Navigation path (tap_action navigate)",
        label: "Override label text",
        label_use_temperature: "label_use_temperature",
        label_use_brightness: "label_use_brightness",
        entity_1: "entity_1",
        entity_2: "entity_2",
        entity_3: "entity_3",
        entity_4: "entity_4",
        entity_1_icon: "Icon",
        entity_2_icon: "Icon",
        entity_3_icon: "Icon",
        entity_4_icon: "Icon",
        entity_1_color: "Color template (yellow_on…)",
        entity_2_color: "Color template (yellow_on…)",
        entity_3_color: "Color template (yellow_on…)",
        entity_4_color: "Color template (yellow_on…)",
      }),
      computeHelper: helpers({
        entity: "Entity used for label (temperature / brightness / state).",
        color: "Colors large icon + name + label (like *_no_state).",
        label_use_brightness: "Only used when label_use_temperature is false.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmRoomCardConfig> {
    return {
      name: "Living Room",
      icon: "mdi:sofa-single",
      color: "blue",
      entity: "sensor.outside_temperature",
      label_use_temperature: true,
      label_use_brightness: false,
      entity_1: "light.bed_light",
      entity_1_color: "yellow",
      entity_2: "switch.decorative_lights",
      entity_2_color: "green",
      entity_3: "sensor.outside_temperature",
      entity_3_color: "red",
      entity_4: "media_player.living_room",
      entity_4_color: "blue",
    };
  }

  public setConfig(config: UlmRoomCardConfig): void {
    const c = config as UlmRoomCardConfig & Record<string, unknown>;
    const tap = c.tap_action as UlmRoomAction | undefined;

    const keys: SlotKey[] = ["entity_1", "entity_2", "entity_3", "entity_4"];
    this._slots = {};
    const flat: Record<string, unknown> = {};
    for (const key of keys) {
      const n = key.slice(-1);
      const rich = asEntity(
        config[key],
        config[`entity_${n}_color` as keyof UlmRoomCardConfig] as
          | UlmThemeColor
          | undefined,
        config[`entity_${n}_icon` as keyof UlmRoomCardConfig] as
          | string
          | undefined,
      );
      if (rich) {
        this._slots[key] = rich;
        flat[key] = rich.entity_id;
        flat[`entity_${n}_color`] = rich.color;
        flat[`entity_${n}_icon`] = rich.icon;
      }
    }

    this._config = {
      icon: "mdi:sofa-single",
      label_use_temperature: true,
      label_use_brightness: false,
      ...config,
      ...flat,
      navigation_path: config.navigation_path || tap?.navigation_path,
      type: "custom:ulm-room-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    // Square card — height from aspect-ratio, not section rows
    return {
      columns: 4,
      min_columns: 3,
      max_columns: 6,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const has1 = !!this._slots.entity_1;
    const has2 = !!this._slots.entity_2;
    // Exact grid-template-areas branches from card_room.yaml
    const layout = has1 ? "full" : has2 ? "three" : "minimal";

    const main = this._config.entity
      ? this.hass.states[this._config.entity]
      : undefined;
    const unavailable = main?.state === "unavailable";

    // *_no_state / color config → icon, name, label, img_cell
    const roomColor = this._config.color;
    const roomRgb = roomColor ? resolveThemeRgb(this, roomColor) : undefined;

    const iconColor = roomRgb
      ? `rgba(${roomRgb}, 1)`
      : "rgba(var(--color-theme, 51, 51, 51), 0.2)";
    const iconBg = roomRgb
      ? `rgba(${roomRgb}, 0.2)`
      : "rgba(var(--color-theme, 51, 51, 51), 0.05)";
    const textColor = roomRgb ? `rgba(${roomRgb}, 1)` : undefined;

    // Exact margin formulas from YAML
    const nameMarginBottom = has1 ? "10%" : has2 ? "24%" : "15.8%";
    const labelMarginTop = has1 ? "-10%" : "-24%";
    const nameMaxWidth = `calc(100% - (12px + ${!has2 ? 5 : 0}px))`;
    const labelMaxWidth = `calc(100% - (12px + ${!has1 && !has2 ? 5 : 0}px))`;

    return html`
      <ha-card
        class=${classMap({
          "ulm-room": true,
          [`layout-${layout}`]: true,
        })}
        @click=${this._cardTap}
      >
        <div
          class="name"
          style=${styleMap({
            color: textColor,
            marginBottom: nameMarginBottom,
            maxWidth: nameMaxWidth,
          })}
        >
          ${this._config.name ||
          main?.attributes.friendly_name ||
          ""}
        </div>

        <div
          class="label"
          style=${styleMap({
            color: textColor,
            marginTop: labelMarginTop,
            maxWidth: labelMaxWidth,
          })}
        >
          ${this._label(main)}
        </div>

        <!-- grid placeholder for area 'i' (icon is absolutely positioned) -->
        <div class="icon-slot"></div>

        <!-- styles.img_cell from card_room.yaml — absolute on the card -->
        <button
          class="room-icon"
          style=${styleMap({
            color: iconColor,
            backgroundColor: iconBg,
          })}
          @click=${this._cardTap}
          aria-label="room"
        >
          <ha-icon
            .icon=${this._config.icon ||
            main?.attributes.icon ||
            "mdi:sofa-single"}
          ></ha-icon>
        </button>

        ${unavailable
          ? html`<div class="notification">
              <ha-icon icon="mdi:exclamation"></ha-icon>
            </div>`
          : nothing}

        ${this._renderChip("entity_1", "i1")}
        ${this._renderChip("entity_2", "i2")}
        ${this._renderChip("entity_3", "i3")}
        ${this._renderChip("entity_4", "i4")}
      </ha-card>
    `;
  }

  /** Label logic copied from card_room.yaml */
  private _label(main?: {
    state: string;
    attributes: Record<string, unknown>;
  }): string {
    if (this._config?.label != null && this._config.label !== "") {
      return this._config.label;
    }
    if (!main) return "";

    if (this._config?.label_use_temperature) {
      const value =
        main.attributes.current_temperature ??
        main.attributes.temperature ??
        main.attributes.device_temperature ??
        main.state ??
        "-";
      const unit =
        (main.attributes.unit_of_measurement as string | undefined) || "°C";
      return `${value}${unit}`;
    }

    if (
      this._config?.label_use_brightness &&
      main.state === "on" &&
      main.attributes.brightness != null
    ) {
      const bri = Math.round(Number(main.attributes.brightness) / 2.55);
      return `${bri || 0}%`;
    }

    return this._capitalize(main.state);
  }

  private _renderChip(key: SlotKey, area: string) {
    const slot = this._slots[key];
    // Original: display:none when variable missing — omit from DOM
    if (!slot) return nothing;

    const stateObj = this.hass?.states[slot.entity_id];
    const state = stateObj?.state ?? "unavailable";
    const on = isOn(state);
    // Color templates use value: "on" — match that, not generic "active"
    const mode = slot.color_mode || "on";
    const colored =
      !!slot.color &&
      (mode === "always" ||
        (mode === "on" && on) ||
        (mode === "off" && !on && state !== "unavailable"));

    const rgb = slot.color ? resolveThemeRgb(this, slot.color) : undefined;

    // widget_icon_room defaults + color template overrides
    const style = colored && rgb
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const icon =
      slot.icon || stateObj?.attributes.icon || this._domainIcon(slot.entity_id);

    return html`
      <button
        class="chip ${area}"
        style=${styleMap(style)}
        title=${stateObj?.attributes.friendly_name || slot.entity_id}
        @click=${(ev: Event) => this._runAction(ev, slot.tap_action, slot.entity_id)}
        @contextmenu=${(ev: Event) =>
          this._runAction(ev, slot.hold_action, slot.entity_id)}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _domainIcon(entityId: string): string {
    const domain = entityId.split(".")[0];
    const map: Record<string, string> = {
      light: "mdi:lightbulb",
      switch: "mdi:power-socket-eu",
      fan: "mdi:fan",
      climate: "mdi:thermometer",
      sensor: "mdi:thermometer",
      binary_sensor: "mdi:motion-sensor",
      media_player: "mdi:speaker",
      cover: "mdi:window-shutter",
      input_boolean: "mdi:toggle-switch",
    };
    return map[domain] || "mdi:circle-medium";
  }

  private _runAction(
    ev: Event,
    action: UlmRoomAction | undefined,
    fallbackEntity: string,
  ) {
    ev.preventDefault();
    ev.stopPropagation();
    const act = action?.action || "none";
    if (act === "none") return;

    if (act === "toggle") {
      if (!this.hass) return;
      const entity = action?.entity || fallbackEntity;
      this.hass.callService(entity.split(".")[0], "toggle", {
        entity_id: entity,
      });
      return;
    }

    if (act === "more-info") {
      this._moreInfo(action?.entity || fallbackEntity);
      return;
    }

    if (act === "navigate" && action?.navigation_path) {
      this._navigate(action.navigation_path);
      return;
    }

    if (
      (act === "call-service" || act === "perform-action") &&
      this.hass &&
      (action?.service || action?.perform_action)
    ) {
      const svc = (action.service || action.perform_action) as string;
      const [domain, service] = svc.includes(".")
        ? svc.split(".", 2)
        : [fallbackEntity.split(".")[0], svc];
      this.hass.callService(domain, service, {
        entity_id: action.entity || fallbackEntity,
        ...(action.data || action.service_data || {}),
      });
    }
  }

  private _cardTap = (ev: Event) => {
    ev.stopPropagation();
    if (this._config?.navigation_path) {
      this._navigate(this._config.navigation_path);
      return;
    }
    if (this._config?.entity) this._moreInfo(this._config.entity);
  };

  private _navigate(path: string) {
    const url = path.startsWith("/") ? path : `/${path}`;
    history.pushState(null, "", url);
    window.dispatchEvent(new Event("location-changed"));
  }

  private _moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  private _capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    /* styles.card from card_room.yaml */
    ha-card.ulm-room {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      box-sizing: border-box;
      border-radius: 20px;
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      border: none;
      padding: 5px;
      overflow: hidden;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      cursor: pointer;
      display: grid;
      justify-items: center;
    }

    /*
     * styles.grid from card_room.yaml:
     * entity_1 → 4×4 ; else → 3×3
     */
    ha-card.ulm-room.layout-full {
      grid-template-areas:
        "n n n i1"
        "l l l i2"
        "i i . i3"
        "i i . i4";
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
    }

    ha-card.ulm-room.layout-three {
      grid-template-areas:
        "n n i2"
        "l l i3"
        "i i i4";
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }

    ha-card.ulm-room.layout-minimal {
      grid-template-areas:
        "n n n"
        "l l i3"
        "i i i4";
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }

    /* styles.name */
    .name {
      grid-area: n;
      justify-self: start;
      align-self: end;
      font-weight: bold;
      font-size: 18px;
      margin-left: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.2;
      z-index: 2;
      pointer-events: none;
    }

    /* styles.label — filter: opacity(40%) */
    .label {
      grid-area: l;
      justify-self: start;
      align-self: start;
      font-weight: bold;
      font-size: 14px;
      filter: opacity(40%);
      margin-left: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.2;
      z-index: 2;
      pointer-events: none;
    }

    .icon-slot {
      grid-area: i;
    }

    /*
     * styles.img_cell — absolute over the whole card (not the grid cell).
     * This is what creates the large circle clipped at bottom-left.
     */
    .room-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin-top: 25%;
      margin-left: -25%;
      width: 75%;
      height: 75%;
      max-width: none;
      max-height: none;
      border: 0;
      border-radius: 50%;
      padding: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      z-index: 1;
      box-sizing: border-box;
    }

    /* size: 45% on card_room → icon ≈ 45% of card ≈ 60% of 75% circle */
    .room-icon ha-icon {
      width: 60%;
      height: 60%;
      --mdc-icon-size: 100%;
      pointer-events: none;
    }

    /*
     * unavailable notification — absolute, same offsets as YAML
     */
    .notification {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      margin-top: 35%;
      margin-left: -35%;
      width: 24.5px;
      height: 24.5px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      background-color: rgba(var(--color-red, 245, 68, 54), 1);
      display: grid;
      place-items: center;
      line-height: 0;
      z-index: 3;
      pointer-events: none;
    }

    .notification ha-icon {
      width: 50%;
      height: 50%;
      --mdc-icon-size: 100%;
      color: var(--primary-background-color, #fff);
    }

    /*
     * custom_fields i1–i4 styling + widget_icon_room
     * outer: width/height 80%, border-radius 50%, display grid
     */
    .chip {
      border: 0;
      border-radius: 50%;
      width: 80%;
      height: 80%;
      place-self: center;
      display: grid;
      place-items: center;
      padding: 0;
      line-height: 0;
      cursor: pointer;
      box-shadow: none;
      z-index: 2;
      box-sizing: border-box;
    }

    /* widget_icon_room: size 15px, icon width/height 50% */
    .chip ha-icon {
      width: 50%;
      height: 50%;
      --mdc-icon-size: 100%;
      line-height: 0;
      pointer-events: none;
    }

    .chip.i1 {
      grid-area: i1;
    }
    .chip.i2 {
      grid-area: i2;
    }
    .chip.i3 {
      grid-area: i3;
    }
    .chip.i4 {
      grid-area: i4;
    }
  `;
}
