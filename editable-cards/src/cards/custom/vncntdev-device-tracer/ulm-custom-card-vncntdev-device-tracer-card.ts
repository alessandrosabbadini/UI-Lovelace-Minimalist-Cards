/**
 * Lit port of custom_cards/custom_card_vncntdev_device_tracer/
 * card_generic-style device tracker with google green/red icon and optional status-as-name.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  booleanField,
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

export interface UlmCustomVncntdevDeviceTracerCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-vncntdev-device-tracer-card";
  entity: string;
  name?: string;
  status_as_name?: boolean;
  icon?: string;
  color_online?: string;
  color_offline?: string;
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

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function isOffline(state: string): boolean {
  return state === "not_home" || state === "off";
}

@customElement("ulm-custom-card-vncntdev-device-tracer-card")
export class UlmCustomVncntdevDeviceTracerCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomVncntdevDeviceTracerCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["device_tracker", "person"]),
        textField("name"),
        iconField("icon"),
        booleanField("status_as_name"),
        textField("color_online"),
        textField("color_offline"),
      ],
      computeLabel: labels({
        entity: "Device tracker",
        name: "Name (custom_card_vncntdev_device_tracker_name)",
        icon: "Icon (custom_card_vncntdev_device_tracker_icon)",
        status_as_name:
          "Show Online/Offline as name (custom_card_vncntdev_device_tracker_status_as_name)",
        color_online: "Online icon color",
        color_offline: "Offline icon color",
      }),
      computeHelper: helpers({
        status_as_name:
          "When true, friendly name moves to the label and status is the title.",
        color_online: "Default var(--google-green)",
        color_offline: "Default var(--google-red)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomVncntdevDeviceTracerCardConfig> {
    return {
      entity: "device_tracker.server",
      icon: "mdi:server",
      status_as_name: false,
      color_online: "var(--google-green)",
      color_offline: "var(--google-red)",
    };
  }

  public setConfig(config: UlmCustomVncntdevDeviceTracerCardConfig): void {
    const c = config as UlmCustomVncntdevDeviceTracerCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(
        pick(c, "name", "custom_card_vncntdev_device_tracker_name"),
      ),
      icon:
        asStr(pick(c, "icon", "custom_card_vncntdev_device_tracker_icon")) ||
        "mdi:server",
      status_as_name: asBool(
        pick(
          c,
          "status_as_name",
          "custom_card_vncntdev_device_tracker_status_as_name",
        ),
        false,
      ),
      color_online:
        asStr(
          pick(
            c,
            "color_online",
            "custom_card_vncntdev_device_tracker_color_online",
          ),
        ) || "var(--google-green)",
      color_offline:
        asStr(
          pick(
            c,
            "color_offline",
            "custom_card_vncntdev_device_tracker_color_offline",
          ),
        ) || "var(--google-red)",
      type: "custom:ulm-custom-card-vncntdev-device-tracer-card",
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
      return html`<ha-card class="ulm-card ulm-vncntdev-tracer"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const offline = isOffline(stateObj.state);
    const status = offline ? "Offline" : "Online";
    const friendly =
      this._config.name ||
      (stateObj.attributes.friendly_name as string | undefined) ||
      stateObj.entity_id;

    const title = this._config.status_as_name ? status : friendly;
    const subtitle = this._config.status_as_name ? friendly : status;

    const iconColor = offline
      ? this._config.color_offline!
      : this._config.color_online!;

    return html`
      <ha-card class="ulm-card ulm-vncntdev-tracer" @click=${this._moreInfo}>
        <div class="row">
          <div class="icon-btn" style="color: ${iconColor};">
            <ha-icon .icon=${this._config.icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${title}</div>
            <div class="label">${subtitle}</div>
          </div>
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-vncntdev-tracer {
      height: auto;
      cursor: pointer;
    }

    .icon-btn,
    .info-btn {
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-vncntdev-device-tracer-card": UlmCustomVncntdevDeviceTracerCard;
  }
}
