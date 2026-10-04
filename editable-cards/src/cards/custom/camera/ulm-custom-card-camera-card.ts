/**
 * Lit port of custom_cards/custom_card_camera/custom_card_camera.yaml
 * Optional blue header (icon + name/label) + nested picture-entity (live).
 */
import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
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
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomCameraCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-camera-card";
  entity: string;
  /** When true / set, show the blue icon + name/label header */
  show_title?: boolean;
  name?: string;
  label?: string;
  icon?: string;
  aspect_ratio?: string;
}

function pick(cfg: Record<string, unknown>, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = cfg[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  // Original uses truthiness of ulm_custom_card_camera_title
  if (typeof raw === "string") return raw.length > 0;
  return fallback;
}

@customElement("ulm-custom-card-camera-card")
export class UlmCustomCameraCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomCameraCardConfig;
  @query(".picture-host") private _pictureHost?: HTMLDivElement;

  private _pictureEl?: LovelaceCard & HTMLElement;
  private _pictureKey = "";
  private _pictureLoading = false;
  private _pictureDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "camera"),
        booleanField("show_title"),
        textField("name"),
        textField("label"),
        iconField("icon"),
        textField("aspect_ratio"),
      ],
      computeLabel: labels({
        entity: "Camera entity",
        show_title: "Show title header (ulm_custom_card_camera_title)",
        name: "Name (ulm_custom_card_camera_name)",
        label: "Label (ulm_custom_card_camera_label)",
        icon: "Icon",
        aspect_ratio: "Aspect ratio (ulm_custom_card_camera_aspect_ratio)",
      }),
      computeHelper: helpers({
        show_title:
          "Original YAML treats ulm_custom_card_camera_title as a boolean switch for the header",
        aspect_ratio: "Passed to picture-entity, e.g. 16:9 or 1",
        name: "Header primary line when show_title is on",
        label: "Header secondary line when show_title is on",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomCameraCardConfig> {
    return {
      entity: "camera.front_door",
      show_title: true,
      name: "Front door",
      label: "Live",
      icon: "mdi:cctv",
      aspect_ratio: "16:9",
    };
  }

  public setConfig(config: UlmCustomCameraCardConfig): void {
    const c = config as UlmCustomCameraCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (pick(c, "ulm_custom_card_camera_entity") as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    // Original: ulm_custom_card_camera_title is truthy → show header
    const titleRaw = pick(
      c,
      "show_title",
      "ulm_custom_card_camera_title",
      "title",
    );

    this._config = {
      ...config,
      entity,
      show_title: asBool(titleRaw, false),
      name:
        (pick(c, "name", "ulm_custom_card_camera_name") as string) ||
        undefined,
      label:
        (pick(c, "label", "ulm_custom_card_camera_label") as string) ||
        undefined,
      icon: (pick(c, "icon") as string) || undefined,
      aspect_ratio: String(
        pick(c, "aspect_ratio", "ulm_custom_card_camera_aspect_ratio") ||
          "16:9",
      ),
      type: "custom:ulm-custom-card-camera-card",
    };
    this._pictureKey = "";
  }

  public getCardSize(): number {
    return this._config?.show_title ? 4 : 3;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (changed.has("_config") || changed.has("hass") || !this._pictureEl) {
      void this._syncPicture();
    } else if (this._pictureEl) {
      this._pictureEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const showTitle = !!this._config.show_title;
    const stateObj = this.hass.states[this._config.entity];

    return html`
      <ha-card
        class="ulm-card ulm-camera ${showTitle ? "with-title" : "image-only"}"
      >
        ${showTitle ? this._header(stateObj) : nothing}
        <div class="picture-wrap">
          <div class="picture-host"></div>
        </div>
      </ha-card>
    `;
  }

  private _header(stateObj?: HassEntity) {
    const name =
      this._config!.name ||
      stateObj?.attributes.friendly_name ||
      this._config!.entity;
    const label = this._config!.label || "";
    const icon =
      this._config!.icon ||
      (stateObj?.attributes.icon as string | undefined) ||
      "mdi:cctv";

    return html`
      <div class="header">
        <div
          class="row"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo()}
          @keydown=${(ev: KeyboardEvent) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              this._moreInfo();
            }
          }}
        >
          <div class="icon-btn">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            ${label
              ? html`<div class="label">${label}</div>`
              : html`<div class="label">&nbsp;</div>`}
          </div>
        </div>
      </div>
    `;
  }

  private _buildPictureConfig(): LovelaceCardConfig {
    const cfg = this._config!;
    return {
      type: "picture-entity",
      entity: cfg.entity,
      camera_image: cfg.entity,
      camera_view: "live",
      show_name: false,
      show_state: false,
      aspect_ratio: cfg.aspect_ratio || "16:9",
    };
  }

  private async _syncPicture(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (this._pictureLoading) {
      this._pictureDirty = true;
      return;
    }
    this._pictureLoading = true;
    this._pictureDirty = false;
    try {
      await this.updateComplete;
      const host = this._pictureHost;
      if (!host) {
        this._pictureDirty = true;
        return;
      }

      const picConfig = this._buildPictureConfig();
      const key = JSON.stringify(picConfig);
      if (!this._pictureEl || key !== this._pictureKey) {
        this._pictureKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._pictureEl = helpersApi.createCardElement(
            picConfig,
          ) as LovelaceCard & HTMLElement;
        } else {
          const el = document.createElement(
            "hui-picture-entity-card",
          ) as LovelaceCard & HTMLElement;
          el.setConfig(picConfig);
          this._pictureEl = el;
        }
        this._pictureEl.hass = this.hass;
        host.replaceChildren(this._pictureEl);
      } else {
        this._pictureEl.hass = this.hass;
      }
    } finally {
      this._pictureLoading = false;
      if (this._pictureDirty) {
        this._pictureDirty = false;
        void this._syncPicture();
      }
    }
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
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto !important;
      align-self: start;
      overflow: hidden;
      box-sizing: border-box;
      direction: ltr;
    }

    ha-card.ulm-card.ulm-camera {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
      /* Original border-radius 20px */
      border-radius: 20px;
    }

    /* With title: padding 12px + row-gap 12px; without: padding 0 */
    ha-card.ulm-camera.with-title {
      padding: 12px;
      gap: 12px;
    }

    ha-card.ulm-camera.image-only {
      padding: 0;
      gap: 0;
    }

    .header {
      min-width: 0;
      overflow: hidden;
    }

    .header .row {
      width: 100%;
      cursor: pointer;
      direction: ltr;
    }

    /* blue_no_state */
    .header .icon-btn {
      color: rgba(var(--color-blue, 61, 90, 254), 1);
      background-color: rgba(var(--color-blue, 61, 90, 254), 0.2);
    }

    .header .name {
      filter: opacity(100%);
    }

    .header .label {
      opacity: 0.4;
    }

    .picture-wrap {
      width: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      border-radius: 12px;
      box-sizing: border-box;
    }

    ha-card.ulm-camera.image-only .picture-wrap {
      border-radius: 20px;
    }

    .picture-host {
      width: 100%;
      overflow: hidden;
    }

    .picture-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box;
    }

    /* Flatten nested picture-entity ha-card chrome */
    .picture-host > * {
      --ha-card-border-width: 0px;
      --ha-card-border-radius: 12px;
      --ha-card-box-shadow: none;
    }

    ha-card.ulm-camera.image-only .picture-host > * {
      --ha-card-border-radius: 20px;
    }
  `;
}
