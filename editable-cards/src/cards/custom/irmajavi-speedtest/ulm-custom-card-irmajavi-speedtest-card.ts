/**
 * Lit port of custom_cards/custom_card_irmajavi_speedtest/
 * Router header, Speedtest refresh bar, download/upload tiles.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  colorField,
  entityField,
  helpers,
  labels,
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

const I18N = {
  speedtest: "Speedtest",
  download: "Download Speed",
  upload: "Upload Speed",
} as const;

export interface UlmCustomIrmajaviSpeedtestCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-irmajavi-speedtest-card";
  entity?: string;
  color?: UlmThemeColor;
  router_name?: string;
  router_model?: string;
  download_entity?: string;
  upload_entity?: string;
  ping_entity?: string;
  label_speedtest?: string;
  label_download?: string;
  label_upload?: string;
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

function parseColor(raw: unknown, fallback: UlmThemeColor): UlmThemeColor {
  if (typeof raw !== "string" || !raw) return fallback;
  const named = raw.toLowerCase() as UlmThemeColor;
  if (
    ["yellow", "blue", "green", "red", "pink", "purple", "grey"].includes(
      named,
    )
  ) {
    return named;
  }
  return fallback;
}

@customElement("ulm-custom-card-irmajavi-speedtest-card")
export class UlmCustomIrmajaviSpeedtestCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomIrmajaviSpeedtestCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("download_entity", ["sensor"], false),
        entityField("upload_entity", ["sensor"], false),
        entityField("ping_entity", ["sensor"], false),
        colorField("color"),
        textField("router_name"),
        textField("router_model"),
        textField("label_speedtest"),
        textField("label_download"),
        textField("label_upload"),
      ],
      computeLabel: labels({
        download_entity:
          "Download sensor (ulm_custom_card_irmajavi_speedtest_download_speed_entity)",
        upload_entity:
          "Upload sensor (ulm_custom_card_irmajavi_speedtest_upload_speed_entity)",
        ping_entity:
          "Ping sensor (ulm_custom_card_irmajavi_speedtest_ping_entity)",
        color: "Accent color (ulm_custom_card_irmajavi_speedtest_color)",
        router_name:
          "Router name (ulm_custom_card_irmajavi_speedtest_router_name)",
        router_model:
          "Router model (ulm_custom_card_irmajavi_speedtest_router_model)",
        label_speedtest:
          "Speedtest bar label (ulm_custom_card_irmajavi_speedtest_speedtest)",
        label_download:
          "Download caption (ulm_custom_card_irmajavi_speedtest_download)",
        label_upload:
          "Upload caption (ulm_custom_card_irmajavi_speedtest_upload)",
      }),
      computeHelper: helpers({
        color: "Default blue — colors router wifi icon",
        label_speedtest: "Default: Speedtest (from languages/en.yaml)",
        label_download: "Default: Download Speed",
        label_upload: "Default: Upload Speed",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomIrmajaviSpeedtestCardConfig> {
    return {
      download_entity: "sensor.speedtest_download",
      upload_entity: "sensor.speedtest_upload",
      ping_entity: "sensor.speedtest_ping",
      color: "blue",
      router_name: "Router",
      router_model: "Model",
    };
  }

  public setConfig(config: UlmCustomIrmajaviSpeedtestCardConfig): void {
    const c = config as UlmCustomIrmajaviSpeedtestCardConfig &
      Record<string, unknown>;

    const download_entity = asStr(
      pick(
        c,
        "download_entity",
        "entity",
        "ulm_custom_card_irmajavi_speedtest_download_speed_entity",
      ),
    );
    const upload_entity = asStr(
      pick(
        c,
        "upload_entity",
        "ulm_custom_card_irmajavi_speedtest_upload_speed_entity",
      ),
    );
    const ping_entity = asStr(
      pick(c, "ping_entity", "ulm_custom_card_irmajavi_speedtest_ping_entity"),
    );

    if (!download_entity && !upload_entity && !ping_entity) {
      throw new Error(
        "Please define at least one of download_entity, upload_entity, or ping_entity",
      );
    }

    this._config = {
      ...config,
      entity: download_entity || upload_entity || ping_entity,
      color: parseColor(
        pick(c, "color", "ulm_custom_card_irmajavi_speedtest_color"),
        "blue",
      ),
      router_name:
        asStr(
          pick(
            c,
            "router_name",
            "ulm_custom_card_irmajavi_speedtest_router_name",
          ),
        ) || "router_name",
      router_model:
        asStr(
          pick(
            c,
            "router_model",
            "ulm_custom_card_irmajavi_speedtest_router_model",
          ),
        ) || "router_model",
      download_entity,
      upload_entity,
      ping_entity,
      label_speedtest:
        asStr(
          pick(
            c,
            "label_speedtest",
            "ulm_custom_card_irmajavi_speedtest_speedtest",
          ),
        ) || I18N.speedtest,
      label_download:
        asStr(
          pick(
            c,
            "label_download",
            "ulm_custom_card_irmajavi_speedtest_download",
          ),
        ) || I18N.download,
      label_upload:
        asStr(
          pick(
            c,
            "label_upload",
            "ulm_custom_card_irmajavi_speedtest_upload",
          ),
        ) || I18N.upload,
      type: "custom:ulm-custom-card-irmajavi-speedtest-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 4,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 3,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const color = cfg.color || "blue";
    const rgb = resolveThemeRgb(this, color);
    const iconStyle = {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };

    return html`
      <ha-card class="ulm-card ulm-irmajavi-speedtest">
        <div class="stack">
          <div class="router">
            <div class="router-icon" style=${styleMap(iconStyle)}>
              <ha-icon icon="mdi:wifi"></ha-icon>
            </div>
            <div class="router-name">${cfg.router_name}</div>
            <div class="router-model">${cfg.router_model}</div>
          </div>

          <button
            class="speedtest-bar"
            type="button"
            @click=${this._refreshEntities}
          >
            <ha-icon class="bar-icon" icon="mdi:speedometer"></ha-icon>
            <span class="bar-label">${cfg.label_speedtest}</span>
            <ha-icon class="bar-chevron" icon="mdi:chevron-right"></ha-icon>
          </button>

          <div class="tiles">
            ${this._speedTile(
              cfg.label_download,
              cfg.download_entity,
            )}
            ${this._speedTile(cfg.label_upload, cfg.upload_entity)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _speedTile(caption: string | undefined, entityId?: string) {
    const stateObj = entityId ? this.hass!.states[entityId] : undefined;
    const value = stateObj ? this._stateWithUnit(stateObj) : "";
    return html`
      <button
        class="tile"
        type="button"
        ?disabled=${!entityId}
        @click=${(ev: Event) => {
          ev.stopPropagation();
          if (entityId) this._moreInfo(entityId);
        }}
      >
        <div class="tile-value">${value || "—"}</div>
        <div class="tile-caption">${caption || ""}</div>
      </button>
    `;
  }

  private _stateWithUnit(stateObj: HassEntity): string {
    const unit = stateObj.attributes.unit_of_measurement as string | undefined;
    let state = stateObj.state;
    if (unit) state += unit;
    return state;
  }

  private _refreshEntities = () => {
    if (!this.hass || !this._config) return;
    const ids = [
      this._config.download_entity,
      this._config.upload_entity,
      this._config.ping_entity,
    ].filter(Boolean) as string[];
    if (!ids.length) return;
    this.hass.callService("homeassistant", "update_entity", {
      entity_id: ids,
    });
  };

  private _moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .router {
      display: grid;
      grid-template-areas:
        "icon"
        "name"
        "model";
      justify-items: center;
    }

    .router-icon {
      grid-area: icon;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }

    .router-icon ha-icon {
      --mdc-icon-size: 32px;
    }

    .router-name {
      grid-area: name;
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
    }

    .router-model {
      grid-area: model;
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
    }

    .speedtest-bar {
      border: 2px solid var(--google-grey, var(--divider-color));
      border-radius: 10px;
      height: 40px;
      padding: 0 8px 0 5px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 40px 1fr auto;
      grid-template-areas: "icon label chevron";
      align-items: center;
      column-gap: 0;
      cursor: pointer;
      background: transparent;
      font: inherit;
      color: inherit;
      width: 100%;
    }

    .bar-icon {
      grid-area: icon;
      --mdc-icon-size: 20px;
      width: 40px;
      justify-self: start;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .bar-label {
      grid-area: label;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
      justify-self: start;
      line-height: 1;
    }

    .bar-chevron {
      grid-area: chevron;
      --mdc-icon-size: 20px;
      justify-self: end;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }

    .tiles {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 7px;
    }

    .tile {
      border: 0;
      border-radius: 14px;
      height: 80px;
      padding: 15px 8px 10px;
      box-sizing: border-box;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      display: grid;
      grid-template-areas:
        "value"
        "caption";
      grid-template-rows: min-content min-content;
      justify-items: center;
      align-content: start;
      text-align: center;
      cursor: pointer;
      font: inherit;
      color: inherit;
    }

    .tile:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .tile-value {
      grid-area: value;
      font-weight: bold;
      font-size: 23px;
      line-height: 1.1;
      justify-self: center;
      text-align: center;
    }

    .tile-caption {
      grid-area: caption;
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      justify-self: center;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-irmajavi-speedtest-card": UlmCustomIrmajaviSpeedtestCard;
  }
}
