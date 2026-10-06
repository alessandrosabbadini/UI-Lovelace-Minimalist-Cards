/**
 * Lit port of custom_cards/custom_card_nik_tablet/
 * Tablet dashboard: input_boolean header, icon widgets, metrics, battery bar.
 * HACS bar-card replaced with native severity bar (same red/yellow/green thresholds).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
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

export interface UlmCustomNikTabletCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-nik-tablet-card";
  /** Main tablet status (input_boolean) — alias: ulm_custom_card_nik_tablet_main */
  entity: string;
  name?: string;
  button1_entity?: string;
  button2_entity?: string;
  button3_entity?: string;
  restart_entity?: string;
  reload_entity?: string;
  maintenance_entity?: string;
  par1_entity?: string;
  par2_entity?: string;
  par3_entity?: string;
  par1_name?: string;
  par2_name?: string;
  par3_name?: string;
  battery_entity?: string;
  battery_name?: string;
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

/** Matches custom_bar_card_nik_tablet severity (var(--google-*)). */
function barSeverityColor(pct: number): string {
  if (pct <= 30) return "var(--google-red, var(--error-color))";
  if (pct <= 59) return "var(--google-yellow, var(--warning-color))";
  return "var(--google-green, var(--success-color))";
}

@customElement("ulm-custom-card-nik-tablet-card")
export class UlmCustomNikTabletCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomNikTabletCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", ["input_boolean", "switch"]),
        textField("name"),
        entityField("button1_entity", undefined, false),
        entityField("button2_entity", undefined, false),
        entityField("button3_entity", undefined, false),
        entityField("restart_entity", "button", false),
        entityField("reload_entity", "button", false),
        entityField("maintenance_entity", undefined, false),
        entityField("par1_entity", "sensor", false),
        entityField("par2_entity", "sensor", false),
        entityField("par3_entity", "sensor", false),
        textField("par1_name"),
        textField("par2_name"),
        textField("par3_name"),
        entityField("battery_entity", "sensor", false),
        textField("battery_name"),
      ],
      computeLabel: labels({
        entity: "Main status (ulm_custom_card_nik_tablet_main)",
        name: "Tablet name (ulm_custom_card_nik_tablet_name)",
        button1_entity: "USB (ulm_custom_card_nik_tablet_button1)",
        button2_entity: "Motion (ulm_custom_card_nik_tablet_button2)",
        button3_entity: "Monitor (ulm_custom_card_nik_tablet_button3)",
        restart_entity: "Restart button (ulm_custom_card_nik_tablet_restart)",
        reload_entity: "Reload button (ulm_custom_card_nik_tablet_reload)",
        maintenance_entity: "Maintenance (ulm_custom_card_nik_tablet_maintenance)",
        par1_entity: "Metric 1 (ulm_custom_card_nik_tablet_par1)",
        par2_entity: "Metric 2 (ulm_custom_card_nik_tablet_par2)",
        par3_entity: "Metric 3 (ulm_custom_card_nik_tablet_par3)",
        par1_name: "Metric 1 label (ulm_custom_card_nik_tablet_par1_name)",
        par2_name: "Metric 2 label (ulm_custom_card_nik_tablet_par2_name)",
        par3_name: "Metric 3 label (ulm_custom_card_nik_tablet_par3_name)",
        battery_entity: "Battery (ulm_custom_card_nik_tablet_battery)",
        battery_name: "Battery label (ulm_custom_card_nik_tablet_battery_name)",
      }),
      computeHelper: helpers({
        entity: "Header row (tap disabled in original YAML)",
        button1_entity: "Green widget_icon — toggles on tap",
        restart_entity: "Blue widget — button.press on tap",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomNikTabletCardConfig> {
    return {
      entity: "input_boolean.tablet_status",
      name: "Tablet",
      button1_entity: "switch.demo",
      button2_entity: "binary_sensor.demo",
      button3_entity: "switch.demo_2",
      restart_entity: "button.tablet_restart",
      reload_entity: "button.tablet_reload",
      maintenance_entity: "input_boolean.maintenance",
      par1_entity: "sensor.demo",
      par1_name: "CPU",
      par2_entity: "sensor.demo_2",
      par2_name: "RAM",
      par3_entity: "sensor.demo_3",
      par3_name: "Temp",
      battery_entity: "sensor.tablet_battery",
      battery_name: "Battery",
    };
  }

  public setConfig(config: UlmCustomNikTabletCardConfig): void {
    const c = config as UlmCustomNikTabletCardConfig & Record<string, unknown>;
    const entity = asStr(
      pick(c, "entity", "ulm_custom_card_nik_tablet_main"),
    );
    if (!entity) throw new Error("Please define a main entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name", "ulm_custom_card_nik_tablet_name")),
      button1_entity: asStr(
        pick(c, "button1_entity", "ulm_custom_card_nik_tablet_button1"),
      ),
      button2_entity: asStr(
        pick(c, "button2_entity", "ulm_custom_card_nik_tablet_button2"),
      ),
      button3_entity: asStr(
        pick(c, "button3_entity", "ulm_custom_card_nik_tablet_button3"),
      ),
      restart_entity: asStr(
        pick(c, "restart_entity", "ulm_custom_card_nik_tablet_restart"),
      ),
      reload_entity: asStr(
        pick(c, "reload_entity", "ulm_custom_card_nik_tablet_reload"),
      ),
      maintenance_entity: asStr(
        pick(c, "maintenance_entity", "ulm_custom_card_nik_tablet_maintenance"),
      ),
      par1_entity: asStr(
        pick(c, "par1_entity", "ulm_custom_card_nik_tablet_par1"),
      ),
      par2_entity: asStr(
        pick(c, "par2_entity", "ulm_custom_card_nik_tablet_par2"),
      ),
      par3_entity: asStr(
        pick(c, "par3_entity", "ulm_custom_card_nik_tablet_par3"),
      ),
      par1_name: asStr(
        pick(c, "par1_name", "ulm_custom_card_nik_tablet_par1_name"),
      ),
      par2_name: asStr(
        pick(c, "par2_name", "ulm_custom_card_nik_tablet_par2_name"),
      ),
      par3_name: asStr(
        pick(c, "par3_name", "ulm_custom_card_nik_tablet_par3_name"),
      ),
      battery_entity: asStr(
        pick(
          c,
          "battery_entity",
          "ulm_custom_card_nik_tablet_battery",
          "ulm_custom_bar_card_nik_tablet_card_entity",
        ),
      ),
      battery_name: asStr(
        pick(
          c,
          "battery_name",
          "ulm_custom_card_nik_tablet_battery_name",
          "ulm_custom_bar_card_nik_tablet_card_name",
        ),
      ),
      type: "custom:ulm-custom-card-nik-tablet-card",
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 4,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const main = this.hass.states[this._config.entity];
    if (!main) {
      return html`<ha-card class="ulm-card ulm-nik-tablet"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    return html`
      <ha-card class="ulm-card ulm-nik-tablet">
        ${this._renderMainHeader(main)}
        <div class="gap"></div>
        <div class="row-3">
          ${this._widgetIcon(
            this._config.button1_entity,
            "mdi:usb",
            "green",
            true,
          )}
          ${this._widgetIcon(
            this._config.button2_entity,
            "mdi:motion-sensor",
            "green",
            true,
          )}
          ${this._widgetIcon(
            this._config.button3_entity,
            "mdi:monitor",
            "green",
            true,
          )}
        </div>
        <div class="gap"></div>
        <div class="row-3">
          ${this._widgetIcon(
            this._config.restart_entity,
            "mdi:restart-alert",
            "blue",
            false,
            "press",
          )}
          ${this._widgetIcon(
            this._config.maintenance_entity,
            "mdi:account-hard-hat-outline",
            "yellow",
            true,
          )}
          ${this._widgetIcon(
            this._config.reload_entity,
            "mdi:reload",
            "blue",
            false,
            "press",
          )}
        </div>
        <div class="row-3 metrics">
          ${this._metricWidget(this._config.par1_entity, this._config.par1_name)}
          ${this._metricWidget(this._config.par2_entity, this._config.par2_name)}
          ${this._metricWidget(this._config.par3_entity, this._config.par3_name)}
        </div>
        ${this._renderBattery()}
      </ha-card>
    `;
  }

  private _renderMainHeader(main: HassEntity) {
    const active = main.state === "on";
    const rgb = resolveThemeRgb(this, "blue");
    const iconStyle = active
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };
    const name =
      this._config!.name ||
      main.attributes.friendly_name ||
      main.entity_id;
    const label =
      this.hass!.formatEntityState?.(main) || main.state;

    return html`
      <div class="main-header">
        <div class="icon-cell" style=${styleMap(iconStyle)}>
          <ha-icon icon="mdi:tablet"></ha-icon>
        </div>
        <div class="main-info">
          <div class="main-name">${name}</div>
          <div class="main-label">${label}</div>
        </div>
      </div>
    `;
  }

  private _widgetIcon(
    entityId: string | undefined,
    icon: string,
    color: "green" | "yellow" | "blue",
    colorWhenOn: boolean,
    action: "toggle" | "press" = "toggle",
  ) {
    if (!entityId) {
      return html`<div class="widget empty"></div>`;
    }
    const st = this.hass!.states[entityId];
    const on = st?.state === "on";
    const useAccent = colorWhenOn ? on : true;
    const rgb = resolveThemeRgb(this, color);
    const style = useAccent
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    return html`
      <button
        class="widget"
        style=${styleMap(style)}
        title=${st?.state || entityId}
        @click=${(ev: Event) => {
          ev.stopPropagation();
          this._widgetAction(entityId, action);
        }}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _widgetAction(entityId: string, action: "toggle" | "press") {
    if (!this.hass) return;
    if (action === "press") {
      this.hass.callService("button", "press", { entity_id: entityId });
      return;
    }
    this.hass.callService("homeassistant", "toggle", { entity_id: entityId });
  }

  private _metricWidget(entityId: string | undefined, fallbackName?: string) {
    if (!entityId) {
      return html`<div class="metric empty"></div>`;
    }
    const st = this.hass!.states[entityId];
    const uom = (st?.attributes.unit_of_measurement as string) || "";
    const value = st
      ? uom
        ? `${st.state}${uom.startsWith(" ") ? uom : ` ${uom}`}`
        : st.state
      : "—";
    const name =
      fallbackName ||
      (st?.attributes.friendly_name as string | undefined) ||
      entityId;

    return html`
      <button
        class="metric"
        @click=${() => this._moreInfo(entityId)}
      >
        <div class="metric-value">${value}</div>
        <div class="metric-name">${name}</div>
      </button>
    `;
  }

  private _renderBattery() {
    const id = this._config!.battery_entity;
    if (!id) return nothing;
    const st = this.hass!.states[id];
    const name =
      this._config!.battery_name ||
      (st?.attributes.friendly_name as string | undefined) ||
      "Battery";
    const raw = st ? Number.parseFloat(st.state) : NaN;
    const pct = Number.isFinite(raw)
      ? Math.max(1, Math.min(100, raw))
      : 0;
    const fillColor = barSeverityColor(pct);
    const icon =
      (st?.attributes.icon as string | undefined) || "mdi:battery";

    /* custom_bar_card: card_generic — primary = state, secondary = name; then bar */
    const stateLine = st ? `${Math.round(pct)}%` : "—";
    return html`
      <div class="battery-block">
        <button class="battery-header" @click=${() => this._moreInfo(id)}>
          <div class="icon-cell bat-icon">
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="main-info">
            <div class="main-name">${stateLine}</div>
            <div class="main-label">${name}</div>
          </div>
        </button>
        <div class="bar-track" aria-hidden="true">
          <div class="bar-background"></div>
          <div
            class="bar-fill"
            style=${styleMap({
              width: `${pct}%`,
              backgroundColor: fillColor,
            })}
          ></div>
          <span class="bar-value">${stateLine}</span>
        </div>
      </div>
    `;
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

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-nik-tablet {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 12px;
      overflow: visible;
    }

    .gap {
      height: 10px;
      flex-shrink: 0;
    }

    .main-header,
    .battery-header {
      display: grid;
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      grid-template-areas:
        "icon name"
        "icon label";
      align-items: center;
      column-gap: 0;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      text-align: left;
      color: inherit;
      width: 100%;
      cursor: default;
    }

    .battery-header {
      cursor: pointer;
      /* Align with main header / widgets (outer card already has 12px) */
      padding: 0;
      margin-top: 0;
    }

    .icon-cell {
      grid-area: icon;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .main-info {
      display: contents;
    }

    .bat-icon {
      /* card_generic inactive numeric → theme 0.2 / 0.05 */
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.2);
    }

    .main-name {
      grid-area: name;
      align-self: end;
      font-weight: bold;
      font-size: 14px;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .main-label {
      grid-area: label;
      align-self: start;
      font-weight: bold;
      font-size: 12px;
      margin-left: 12px;
      line-height: 1.2;
      filter: opacity(40%);
    }

    .row-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
    }

    .widget {
      height: 42px;
      border: none;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
    }

    .widget.empty,
    .metric.empty {
      visibility: hidden;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }

    /* YAML: item3 → item4 → item5 are consecutive min-content (no 10px spacer) */
    .metrics {
      margin-top: 0;
    }

    .metric {
      border: none;
      box-shadow: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      color: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .metric-value {
      margin-top: 10px;
      font-weight: bold;
      font-size: 14px;
    }

    .metric-name {
      font-weight: bolder;
      font-size: 12px;
      filter: opacity(40%);
    }

    .battery-block {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
    }

    /* Pill bar: same width as widgets, under battery header */
    .bar-track {
      position: relative;
      height: 35px;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 0;
      border-radius: 14px;
    }

    .bar-background {
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: rgba(var(--color-theme, 51, 51, 51), 0.08);
      pointer-events: none;
    }

    .bar-fill {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: auto;
      border-radius: 14px;
      pointer-events: none;
    }

    .bar-value {
      position: relative;
      z-index: 1;
      font-weight: bold;
      font-size: 12px;
      line-height: 35px;
      pointer-events: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-nik-tablet-card": UlmCustomNikTabletCard;
  }
}
