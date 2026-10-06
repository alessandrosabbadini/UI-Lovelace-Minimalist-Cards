/**
 * Lit port of custom_cards/custom_card_ristou_person/custom_card_ristou_person.yaml
 * Person header row (+ optional find script), picture-entity or map second row.
 */
import {
  LitElement,
  PropertyValues,
  css,
  html,
  nothing,
} from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  grid,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

const DRIVING_LABEL_DEFAULT = "Driving";

export interface UlmCustomRistouPersonCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-ristou-person-card";
  entity: string;
  name?: string;
  icon?: string;
  use_entity_picture?: boolean;
  use_badge?: boolean;
  map_enable?: boolean;
  find_device_script?: string;
  zones?: string[];
  driving_entity?: string;
  driving_label?: string;
  map_aspect_ratio?: string;
  map_hours_to_show?: number;
  map_default_zoom?: number;
  camera_entity_light?: string;
  camera_entity_dark?: string;
}

type RistouStatusColor = "red" | "yellow" | "blue" | "green" | "theme";

interface RistouStatus {
  icon: string;
  color: RistouStatusColor;
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

function asNum(raw: unknown, fallback: number): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function asEntityList(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw.filter((x): x is string => typeof x === "string" && !!x);
  }
  return [];
}

function isDriving(hass: HomeAssistant, entityId?: string): boolean {
  if (!entityId) return false;
  const st = hass.states[entityId]?.state;
  return st === "on" || st === "true";
}

function resolveStatus(
  hass: HomeAssistant,
  person: HassEntity,
  zones: string[],
  drivingEntity?: string,
): RistouStatus {
  if (isDriving(hass, drivingEntity)) {
    return { icon: "mdi:car", color: "red" };
  }
  const loc = person.state;
  if (loc === "home") {
    return { icon: "mdi:home-variant", color: "green" };
  }
  for (const zoneId of zones) {
    const zone = hass.states[zoneId];
    if (zone && loc === zone.attributes.friendly_name) {
      const zIcon =
        zone.attributes.icon != null
          ? String(zone.attributes.icon)
          : "mdi:help-circle";
      return { icon: zIcon, color: "yellow" };
    }
  }
  if (loc === "not_home") {
    return { icon: "mdi:home-minus", color: "blue" };
  }
  return { icon: "mdi:help-circle", color: "yellow" };
}

@customElement("ulm-custom-card-ristou-person-card")
export class UlmCustomRistouPersonCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomRistouPersonCardConfig;
  @query(".footer-host") private _footerHost?: HTMLDivElement;

  private _footerEl?: LovelaceCard & HTMLElement;
  private _footerKey = "";
  private _footerLoading = false;
  private _footerDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "person"),
        grid([textField("name"), iconField("icon")]),
        grid([
          booleanField("use_entity_picture"),
          booleanField("use_badge"),
        ]),
        booleanField("map_enable"),
        entityField("find_device_script", "script", false),
        entityField("driving_entity", undefined, false),
        textField("driving_label"),
        textField("zones"),
        entityField("camera_entity_light", "camera", false),
        entityField("camera_entity_dark", "camera", false),
        grid([
          textField("map_aspect_ratio"),
          numberField("map_default_zoom"),
          numberField("map_hours_to_show"),
        ]),
      ],
      computeLabel: labels({
        entity: "Person entity",
        name: "Name (ulm_custom_card_ristou_name)",
        icon: "Find-device icon (ulm_custom_card_ristou_icon)",
        use_entity_picture: "Use entity picture",
        use_badge: "Status badge on avatar",
        map_enable: "Show map row (ulm_custom_card_ristou_map_enable)",
        find_device_script: "Find device script",
        driving_entity: "Driving binary_sensor",
        driving_label: "Driving label (languages/en.yaml)",
        zones: "Zone entity ids (comma-separated)",
        camera_entity_light: "Static map camera (light theme)",
        camera_entity_dark: "Static map camera (dark theme)",
        map_aspect_ratio: "Map aspect ratio",
        map_default_zoom: "Map default zoom",
        map_hours_to_show: "Map hours to show",
      }),
      computeHelper: helpers({
        use_badge:
          "When off, status icon/color replaces the person avatar icon.",
        zones: "ulm_custom_card_ristou_zones — also passed to map entities.",
        camera_entity_light:
          "Second row when map disabled and both cameras configured.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomRistouPersonCardConfig> {
    return {
      entity: "person.anne_therese",
      use_entity_picture: false,
      use_badge: true,
      map_enable: false,
      driving_label: DRIVING_LABEL_DEFAULT,
      map_aspect_ratio: "466:200",
      map_default_zoom: 11,
      map_hours_to_show: 0,
    };
  }

  public setConfig(config: UlmCustomRistouPersonCardConfig): void {
    const c = config as UlmCustomRistouPersonCardConfig &
      Record<string, unknown>;
    const entity = config.entity;
    if (!entity) throw new Error("Please define an entity");

    const zonesRaw = pick(c, "zones", "ulm_custom_card_ristou_zones");
    let zones = asEntityList(zonesRaw);
    if (!zones.length && typeof zonesRaw === "string" && zonesRaw.trim()) {
      zones = zonesRaw
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name", "ulm_custom_card_ristou_name")),
      icon: asStr(pick(c, "icon", "ulm_custom_card_ristou_icon")),
      use_entity_picture: asBool(
        pick(c, "use_entity_picture", "ulm_custom_card_ristou_use_entity_picture"),
        false,
      ),
      use_badge: asBool(
        pick(c, "use_badge", "ulm_custom_card_ristou_use_badge"),
        true,
      ),
      map_enable: asBool(
        pick(c, "map_enable", "ulm_custom_card_ristou_map_enable"),
        false,
      ),
      find_device_script: asStr(
        pick(c, "find_device_script", "ulm_custom_card_ristou_find_device_script"),
      ),
      zones,
      driving_entity: asStr(
        pick(
          c,
          "driving_entity",
          "ulm_custom_card_ristou_person_driving_entity",
        ),
      ),
      driving_label: asStr(
        pick(
          c,
          "driving_label",
          "ulm_custom_card_ristou_person_driving",
        ),
      ) || DRIVING_LABEL_DEFAULT,
      map_aspect_ratio: asStr(
        pick(c, "map_aspect_ratio", "ulm_custom_card_ristou_map_aspect_ratio"),
      ) || "466:200",
      map_default_zoom: asNum(
        pick(c, "map_default_zoom", "ulm_custom_card_ristou_map_default_zoom"),
        11,
      ),
      map_hours_to_show: asNum(
        pick(c, "map_hours_to_show", "ulm_custom_card_ristou_map_hours_to_show"),
        0,
      ),
      camera_entity_light: asStr(
        pick(
          c,
          "camera_entity_light",
          "ulm_custom_card_ristou_camera_entity_light",
        ),
      ),
      camera_entity_dark: asStr(
        pick(
          c,
          "camera_entity_dark",
          "ulm_custom_card_ristou_camera_entity_dark",
        ),
      ),
      type: "custom:ulm-custom-card-ristou-person-card",
    };
    this._footerKey = "";
  }

  public getCardSize(): number {
    if (!this._config) return 2;
    if (this._showFooter()) return 5;
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (changed.has("_config") || changed.has("hass") || !this._footerEl) {
      void this._syncFooter();
    } else if (this._footerEl) {
      this._footerEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-ristou-person"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    return html`
      <ha-card class="ulm-card ulm-ristou-person">
        ${this._headerRow(stateObj)}
        ${this._showFooter() ? html`<div class="footer-host"></div>` : nothing}
      </ha-card>
    `;
  }

  private _showFooter(): boolean {
    const cfg = this._config!;
    if (cfg.map_enable) return !!cfg.zones?.length || true;
    return !!(cfg.camera_entity_light && cfg.camera_entity_dark);
  }

  private _headerRow(stateObj: HassEntity) {
    const cfg = this._config!;
    const status = resolveStatus(
      this.hass!,
      stateObj,
      cfg.zones || [],
      cfg.driving_entity,
    );
    const useBadge = cfg.use_badge !== false;
    const displayIcon = useBadge ? cfg.icon || "mdi:face-man" : status.icon;
    const avatarColor: RistouStatusColor = useBadge ? "theme" : status.color;
    const name =
      cfg.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const label = this._label(stateObj);
    const picture =
      cfg.use_entity_picture && stateObj.attributes.entity_picture
        ? String(stateObj.attributes.entity_picture)
        : undefined;

    const rgb = this._rgb(avatarColor);
    const iconStyle = {
      color:
        avatarColor === "theme"
          ? "rgba(var(--color-theme, 51, 51, 51), 0.9)"
          : `rgba(${rgb}, 0.9)`,
      backgroundColor: picture
        ? "transparent"
        : avatarColor === "theme"
          ? "rgba(var(--color-theme, 51, 51, 51), 0.05)"
          : `rgba(${rgb}, 0.2)`,
    };

    const badgeRgb = this._rgb(status.color);
    const findScript = cfg.find_device_script;
    const findIcon =
      cfg.icon ||
      (findScript && this.hass!.states[findScript]?.attributes.icon
        ? String(this.hass!.states[findScript].attributes.icon)
        : "mdi:cellphone-wireless");

    return html`
      <div class="header-row">
        <button
          type="button"
          class=${classMap({
            "avatar-btn": true,
            picture: !!picture,
          })}
          style=${styleMap(iconStyle)}
          @click=${this._moreInfoPerson}
        >
          ${picture
            ? html`<img src=${picture} alt=${name} />`
            : html`<ha-icon .icon=${displayIcon}></ha-icon>`}
          ${useBadge
            ? html`
                <span
                  class="notification"
                  style=${styleMap({
                    backgroundColor: `rgba(${badgeRgb}, 1)`,
                  })}
                >
                  <ha-icon .icon=${status.icon}></ha-icon>
                </span>
              `
            : nothing}
        </button>

        <button
          type="button"
          class="info-btn"
          @click=${this._moreInfoPerson}
        >
          <div class="name">${name}</div>
          <div class="label">${label}</div>
        </button>

        ${findScript
          ? html`
              <button
                type="button"
                class="find-btn"
                @click=${this._toggleFind}
                title="Find device"
              >
                <ha-icon .icon=${findIcon}></ha-icon>
              </button>
            `
          : html`<span class="find-spacer"></span>`}
      </div>
    `;
  }

  private _label(stateObj: HassEntity): string {
    const cfg = this._config!;
    if (isDriving(this.hass!, cfg.driving_entity)) {
      return cfg.driving_label || DRIVING_LABEL_DEFAULT;
    }
    const state = stateObj.state;
    const known = ["home", "not_home", "unavailable", "unknown"];
    if (known.includes(state) && this.hass?.localize) {
      const key = `component.person.entity_component._.state.${state}`;
      const t = this.hass.localize(key);
      if (t && t !== key) return t;
    }
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    return state;
  }

  private _rgb(color: RistouStatusColor): string {
    if (color === "theme") {
      return resolveThemeRgb(this, "blue");
    }
    return resolveThemeRgb(this, color as UlmThemeColor);
  }

  private _footerCameraEntity(): string | undefined {
    const cfg = this._config!;
    if (cfg.map_enable) return undefined;
    const dark = !!this.hass?.themes?.darkMode;
    return dark ? cfg.camera_entity_dark : cfg.camera_entity_light;
  }

  private _buildFooterConfig(): LovelaceCardConfig | undefined {
    const cfg = this._config!;
    if (cfg.map_enable) {
      return {
        type: "map",
        default_zoom: cfg.map_default_zoom ?? 11,
        aspect_ratio: cfg.map_aspect_ratio || "466:200",
        hours_to_show: cfg.map_hours_to_show ?? 0,
        entities: cfg.zones || [cfg.entity],
      };
    }
    const cam = this._footerCameraEntity();
    if (!cam) return undefined;
    return {
      type: "picture-entity",
      entity: cam,
      show_state: false,
      show_name: false,
      camera_view: "auto",
    };
  }

  private async _syncFooter(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (!this._showFooter()) {
      this._footerHost?.replaceChildren();
      this._footerEl = undefined;
      return;
    }
    if (this._footerLoading) {
      this._footerDirty = true;
      return;
    }
    this._footerLoading = true;
    this._footerDirty = false;
    try {
      await this.updateComplete;
      const host = this._footerHost;
      if (!host) {
        this._footerDirty = true;
        return;
      }
      const footerConfig = this._buildFooterConfig();
      if (!footerConfig) {
        host.replaceChildren();
        return;
      }
      const key = JSON.stringify(footerConfig);
      if (!this._footerEl || key !== this._footerKey) {
        this._footerKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._footerEl = helpersApi.createCardElement(
            footerConfig,
          ) as LovelaceCard & HTMLElement;
        } else {
          const tag =
            footerConfig.type === "map"
              ? "hui-map-card"
              : "hui-picture-entity-card";
          const el = document.createElement(tag) as LovelaceCard & HTMLElement;
          el.setConfig(footerConfig);
          this._footerEl = el;
        }
        this._footerEl.hass = this.hass;
        host.replaceChildren(this._footerEl);
      } else {
        this._footerEl.hass = this.hass;
      }
    } finally {
      this._footerLoading = false;
      if (this._footerDirty) {
        this._footerDirty = false;
        void this._syncFooter();
      }
    }
  }

  private _moreInfoPerson = (ev: Event) => {
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

  private _toggleFind = (ev: Event) => {
    ev.stopPropagation();
    const scriptId = this._config?.find_device_script;
    if (!scriptId || !this.hass) return;
    this.hass.callService("script", "toggle", { entity_id: scriptId });
  };

  static styles = [
    ulmCardStyles,
    css`
      :host {
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-ristou-person {
        padding: 0;
        height: auto;
        overflow: hidden;
      }

      .header-row {
        display: grid;
        grid-template-columns: min-content 1fr auto;
        grid-template-rows: min-content;
        align-items: center;
        padding: 12px 12px 12px 0;
        gap: 0;
      }

      .avatar-btn {
        position: relative;
        width: 42px;
        height: 42px;
        border: 0;
        border-radius: 50%;
        margin-left: 12px;
        padding: 0;
        display: grid;
        place-items: center;
        cursor: pointer;
        overflow: visible;
      }

      .avatar-btn.picture {
        overflow: hidden;
      }

      .avatar-btn img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
      }

      .avatar-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .notification {
        position: absolute;
        left: 26px;
        top: -2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid var(--card-background-color, #fafafa);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        line-height: 0;
      }

      .notification ha-icon {
        --mdc-icon-size: 10px;
        color: var(--primary-background-color, #fff);
      }

      .info-btn {
        border: 0;
        background: transparent;
        text-align: left;
        padding: 0 8px;
        cursor: pointer;
        color: inherit;
        font: inherit;
        min-width: 0;
      }

      .find-btn,
      .find-spacer {
        width: 42px;
        height: 42px;
        flex-shrink: 0;
      }

      .find-btn {
        border: 0;
        border-radius: var(--border-radius, 20px);
        background: rgba(var(--color-blue, 61, 90, 254), 0.2);
        display: grid;
        place-items: center;
        cursor: pointer;
        margin-right: 12px;
        color: rgba(var(--color-blue, 61, 90, 254), 1);
      }

      .find-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .footer-host {
        min-height: 0;
      }

      .footer-host ha-card {
        box-shadow: none !important;
        border-radius: 0 0 var(--border-radius, 20px) var(--border-radius, 20px);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-ristou-person-card": UlmCustomRistouPersonCard;
  }
}
