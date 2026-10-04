/**
 * Lit port of card_vacuum.yaml — start/stop, dock, locate, room script, map camera.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import { openUlmPopup } from "../../popups/ulm-popup";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

const ACTIVE_STATES = new Set([
  "cleaning",
  "mopping",
  "mowing",
  "paused",
  "returning",
  "error",
]);

const CLEANING_STATES = new Set(["cleaning", "mopping", "mowing"]);

const STATE_COLORS: Record<string, UlmThemeColor | "theme"> = {
  cleaning: "blue",
  mowing: "blue",
  paused: "green",
  mopping: "yellow",
  returning: "purple",
  error: "red",
};

export interface UlmVacuumCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-vacuum-card";
  entity: string;
  name?: string;
  icon?: string;
  label?: string;
  room?: string;
  room_icon?: string;
  camera?: string;
  camera_toggle?: boolean;
  enable_popup?: boolean;
  color?: UlmThemeColor | "theme" | "auto";
  force_background_color?: boolean;
}

@customElement("ulm-vacuum-card")
export class UlmVacuumCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmVacuumCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        // Exact docs order — all top-level so HA persists them
        entityField("entity", "vacuum"),
        textField("name"),
        iconField("icon"),
        textField("label"),
        // script | automation — room clean action
        {
          name: "room",
          required: false,
          selector: { entity: { domain: ["script", "automation"] } },
        },
        iconField("room_icon"),
        entityField("camera", "camera", false),
        booleanField("camera_toggle"),
        {
          name: "color",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "auto", label: "auto (state based)" },
                { value: "blue", label: "blue" },
                { value: "green", label: "green" },
                { value: "yellow", label: "yellow" },
                { value: "red", label: "red" },
                { value: "purple", label: "purple" },
                { value: "pink", label: "pink" },
                { value: "grey", label: "grey" },
              ],
            },
          },
        },
        booleanField("force_background_color"),
        booleanField("enable_popup"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_card_vacuum_name)",
        icon: "Icon (ulm_card_vacuum_icon)",
        label: "Label (ulm_card_vacuum_label)",
        room: "Room script (ulm_card_vacuum_room)",
        room_icon: "Room icon (ulm_card_vacuum_room_icon)",
        camera: "Camera map (ulm_card_vacuum_camera)",
        camera_toggle: "Camera only while cleaning (ulm_card_vacuum_camera_toggle)",
        color: "Color (ulm_card_vacuum_color)",
        force_background_color:
          "Force background color (ulm_card_vacuum_force_background_color)",
        enable_popup: "Enable popup (ulm_card_vacuum_enable_popup)",
      }),
      computeHelper: helpers({
        name: "Custom name. Default: friendly_name.",
        icon: "Custom MDI icon.",
        label: "Custom sub-label. Default: translated state.",
        room: "Script/automation to clean a specific room (4th button).",
        room_icon: "Icon for the room clean button.",
        camera: "Camera entity for the vacuum map image.",
        camera_toggle: "Only show the map while cleaning/mopping/mowing.",
        color: "Custom color, or auto (state based: cleaning=blue, …).",
        force_background_color:
          "Use color as card background when the vacuum is active.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmVacuumCardConfig> {
    return {
      entity: "vacuum.demo_vacuum_0_ground_floor",
      color: "auto",
    };
  }

  public setConfig(config: UlmVacuumCardConfig): void {
    const c = config as UlmVacuumCardConfig & Record<string, unknown>;
    const entity =
      config.entity || (c.ulm_card_vacuum_entity as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const str = (v: unknown): string | undefined =>
      typeof v === "string" && v.length ? v : undefined;

    this._config = {
      ...config,
      entity,
      name: config.name ?? (c.ulm_card_vacuum_name as string | undefined),
      icon: str(config.icon) || str(c.ulm_card_vacuum_icon) || undefined,
      label: str(config.label) || str(c.ulm_card_vacuum_label) || undefined,
      room: str(config.room) || str(c.ulm_card_vacuum_room) || undefined,
      room_icon:
        str(config.room_icon) ||
        str(c.ulm_card_vacuum_room_icon) ||
        "mdi:table-chair",
      camera: str(config.camera) || str(c.ulm_card_vacuum_camera) || undefined,
      camera_toggle: Boolean(
        config.camera_toggle ?? c.ulm_card_vacuum_camera_toggle,
      ),
      enable_popup: Boolean(
        config.enable_popup ?? c.ulm_card_vacuum_enable_popup,
      ),
      color:
        (config.color as UlmVacuumCardConfig["color"]) ||
        (c.ulm_card_vacuum_color as UlmVacuumCardConfig["color"]) ||
        "auto",
      force_background_color: Boolean(
        config.force_background_color ??
          c.ulm_card_vacuum_force_background_color,
      ),
      type: "custom:ulm-vacuum-card",
    };
  }

  public getCardSize(): number {
    let n = 2;
    if (this._config?.camera) n++;
    return n;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
    };
  }

  private _stateColor(stateObj: HassEntity): UlmThemeColor | "theme" {
    const configured = this._config?.color;
    if (configured && configured !== "auto" && configured !== "theme") {
      return configured;
    }
    if (configured === "theme") return "theme";
    return STATE_COLORS[stateObj.state.toLowerCase()] || "theme";
  }

  private _isActive(stateObj: HassEntity): boolean {
    return ACTIVE_STATES.has(stateObj.state.toLowerCase());
  }

  private _showMap(stateObj: HassEntity): boolean {
    const cam = this._config?.camera;
    if (!cam) return false;
    if (!this._config?.camera_toggle) return true;
    return CLEANING_STATES.has(stateObj.state.toLowerCase());
  }

  private _mapUrl(cameraId: string): string | undefined {
    const cam = this.hass?.states[cameraId];
    if (!cam) return undefined;
    const pic =
      cam.attributes.entity_picture ||
      cam.attributes.entity_picture_local;
    if (typeof pic !== "string" || !pic.length) return undefined;
    if (
      pic.startsWith("http://") ||
      pic.startsWith("https://") ||
      pic.startsWith("data:")
    ) {
      return pic;
    }
    return this.hass?.hassUrl?.(pic) || pic;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const active = this._isActive(stateObj);
    const colorToken = this._stateColor(stateObj);
    const rgb =
      colorToken === "theme"
        ? "var(--color-theme, 51, 51, 51)"
        : resolveThemeRgb(this, colorToken);
    const forceBg =
      !!this._config.force_background_color &&
      active &&
      colorToken !== "theme";
    const cardBg = forceBg
      ? `rgba(${rgb}, var(--opacity-bg, 1))`
      : undefined;

    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config.icon ||
      stateObj.attributes.icon ||
      "mdi:robot-vacuum";
    const label =
      this._config.label ||
      this.hass.formatEntityState?.(stateObj) ||
      this._capitalize(stateObj.state);

    const iconActive = active && colorToken !== "theme";
    const iconStyle = iconActive
      ? {
          color: forceBg ? "rgb(250,250,250)" : `rgba(${rgb}, 1)`,
          backgroundColor: forceBg
            ? "rgba(250,250,250,0.2)"
            : `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const textStyle = forceBg
      ? {
          name: { color: "rgb(250,250,250)" },
          label: { color: "rgba(250,250,250,0.85)" },
        }
      : { name: {}, label: {} };

    const widgetStyle = this._widgetStyle(active, forceBg, rgb, colorToken);
    const cleaning = CLEANING_STATES.has(stateObj.state.toLowerCase());
    const showMap = this._showMap(stateObj);
    const mapUrl =
      showMap && this._config.camera
        ? this._mapUrl(this._config.camera)
        : undefined;
    const hasRoom = !!this._config.room;

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          vacuum: true,
          "force-bg": forceBg,
        })}
        style=${styleMap(
          cardBg
            ? {
                "--ha-card-background": cardBg,
                background: cardBg,
                backgroundColor: cardBg,
              }
            : active && colorToken !== "theme" && this.hass.themes?.darkMode
              ? {
                  backgroundColor: `rgba(${rgb}, 0.1)`,
                }
              : {},
        )}
      >
        <div class="stack">
          <div class="header">
            <div class="row">
              <button
                class="icon-btn"
                style=${styleMap(iconStyle)}
                @click=${this._iconTap}
              >
                <ha-icon .icon=${icon}></ha-icon>
              </button>
              <button class="info-btn" @click=${this._nameTap}>
                <div class="name" style=${styleMap(textStyle.name)}>
                  ${name}
                </div>
                <div class="label" style=${styleMap(textStyle.label)}>
                  ${label}
                </div>
              </button>
            </div>
          </div>

          ${showMap
            ? html`<div class="map">
                ${mapUrl
                  ? html`<img src=${mapUrl} alt="Vacuum map" />`
                  : html`<div class="map-empty">No map image</div>`}
              </div>`
            : nothing}

          <div
            class=${classMap({
              controls: true,
              four: hasRoom,
            })}
          >
            <button
              class="widget-btn"
              style=${styleMap(widgetStyle)}
              @click=${() =>
                this._vac(cleaning ? "stop" : "start")}
              title=${cleaning ? "stop" : "start"}
            >
              <ha-icon icon=${cleaning ? "mdi:stop" : "mdi:play"}></ha-icon>
            </button>
            <button
              class="widget-btn"
              style=${styleMap(widgetStyle)}
              @click=${() => this._vac("return_to_base")}
              title="dock"
            >
              <ha-icon icon="mdi:home-map-marker"></ha-icon>
            </button>
            <button
              class="widget-btn"
              style=${styleMap(widgetStyle)}
              @click=${() => this._vac("locate")}
              title="locate"
            >
              <ha-icon icon="mdi:map-marker"></ha-icon>
            </button>
            ${hasRoom
              ? html`<button
                  class="widget-btn"
                  style=${styleMap(widgetStyle)}
                  @click=${this._runRoom}
                  title="room"
                >
                  <ha-icon
                    icon=${this._config.room_icon || "mdi:table-chair"}
                  ></ha-icon>
                </button>`
              : nothing}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _widgetStyle(
    active: boolean,
    forceBg: boolean,
    rgb: string,
    colorToken: UlmThemeColor | "theme",
  ): Record<string, string> {
    if (forceBg && active && colorToken !== "theme") {
      return {
        backgroundColor: "rgb(250,250,250)",
        color: `rgba(${rgb}, 1)`,
      };
    }
    return {};
  }

  private _vac(service: string) {
    if (!this.hass || !this._config) return;
    this.hass.callService("vacuum", service, {
      entity_id: this._config.entity,
    });
  }

  private _runRoom = () => {
    if (!this.hass || !this._config?.room) return;
    this.hass.callService("script", "turn_on", {
      entity_id: this._config.room,
    });
  };

  private _iconTap = (ev: Event) => {
    ev.stopPropagation();
    this._nameTap(ev);
  };

  private _nameTap = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    if (this._config.enable_popup) {
      openUlmPopup(this, "vacuum", this._config.entity);
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

  private _capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static styles = [
    ulmCardStyles,
    css`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.vacuum {
        height: auto;
        overflow: hidden;
        background: var(
          --ha-card-background,
          var(--card-background-color, #fafafa)
        );
        transition: background-color 0.2s ease;
      }

      .stack {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .map {
        border-radius: 20px;
        overflow: hidden;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        min-height: 120px;
      }

      .map img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .map-empty {
        padding: 24px;
        text-align: center;
        opacity: 0.5;
        font-size: 12px;
      }
    `,
  ];
}
