/**
 * Lit port of custom_cards/custom_card_mpse_printer/custom_card_mpse_printer.yaml
 * Custom-card "Printer" — status header + CMYK toner bars.
 * Original nested HACS bar-card; Lit uses native bars with the same visuals.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
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

export interface UlmCustomMpsePrinterCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-mpse-printer-card";
  /** Printer status entity (idle / printing / …) */
  entity: string;
  name?: string;
  icon?: string;
  black_entity: string;
  yellow_entity: string;
  magenta_entity: string;
  cyan_entity: string;
}

interface TonerBar {
  key: string;
  entity: string;
  color: string;
}

/**
 * Colors from the published docs screenshot (custom_printer.png).
 * YAML neon rgb() values differ; visual original uses these softer CMYK tones.
 */
const TONER_COLORS = {
  black: "#000000",
  yellow: "rgb(250, 179, 0)",
  magenta: "rgb(248, 75, 122)",
  cyan: "rgb(66, 126, 222)",
} as const;

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

@customElement("ulm-custom-card-mpse-printer-card")
export class UlmCustomMpsePrinterCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomMpsePrinterCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        iconField("icon"),
        entityField("black_entity", "sensor", false),
        entityField("yellow_entity", "sensor", false),
        entityField("magenta_entity", "sensor", false),
        entityField("cyan_entity", "sensor", false),
      ],
      computeLabel: labels({
        entity: "Printer status entity",
        name: "Printer name (ulm_card_printer_name)",
        icon: "Icon",
        black_entity: "Black toner (ulm_card_printer_black_name)",
        yellow_entity: "Yellow toner (ulm_card_printer_yellow_name)",
        magenta_entity: "Magenta toner (ulm_card_printer_magenta_name)",
        cyan_entity: "Cyan toner (ulm_card_printer_cyan_name)",
      }),
      computeHelper: helpers({
        entity:
          "Status sensor (e.g. IPP). Header turns blue when state ≠ idle.",
        name: "Display name on the icon_info header",
        black_entity: "Numeric % sensor for black toner",
        yellow_entity: "Numeric % sensor for yellow toner",
        magenta_entity: "Numeric % sensor for magenta toner",
        cyan_entity: "Numeric % sensor for cyan toner",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomMpsePrinterCardConfig> {
    return {
      entity: "sensor.demo_printer_status",
      name: "Demo Printer",
      icon: "mdi:printer",
      black_entity: "sensor.demo_printer_black_toner",
      yellow_entity: "sensor.demo_printer_yellow_toner",
      magenta_entity: "sensor.demo_printer_magenta_toner",
      cyan_entity: "sensor.demo_printer_cyan_toner",
    };
  }

  public setConfig(config: UlmCustomMpsePrinterCardConfig): void {
    const c = config as UlmCustomMpsePrinterCardConfig & Record<string, unknown>;
    const entity = asStr(config.entity);
    if (!entity) throw new Error("Please define an entity");

    const black_entity =
      asStr(
        pick(c, "black_entity", "ulm_card_printer_black_name"),
      ) || "";
    const yellow_entity =
      asStr(
        pick(c, "yellow_entity", "ulm_card_printer_yellow_name"),
      ) || "";
    const magenta_entity =
      asStr(
        pick(c, "magenta_entity", "ulm_card_printer_magenta_name"),
      ) || "";
    const cyan_entity =
      asStr(
        pick(c, "cyan_entity", "ulm_card_printer_cyan_name"),
      ) || "";

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name", "ulm_card_printer_name")),
      icon: asStr(pick(c, "icon")),
      black_entity,
      yellow_entity,
      magenta_entity,
      cyan_entity,
      type: "custom:ulm-custom-card-mpse-printer-card",
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 3,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-mpse-printer">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const active = stateObj.state !== "idle";
    const bars: TonerBar[] = [
      {
        key: "black",
        entity: this._config.black_entity,
        color: TONER_COLORS.black,
      },
      {
        key: "yellow",
        entity: this._config.yellow_entity,
        color: TONER_COLORS.yellow,
      },
      {
        key: "magenta",
        entity: this._config.magenta_entity,
        color: TONER_COLORS.magenta,
      },
      {
        key: "cyan",
        entity: this._config.cyan_entity,
        color: TONER_COLORS.cyan,
      },
    ];

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-mpse-printer": true,
          active,
        })}
      >
        ${this._renderHeader(stateObj, active)}
        <div class="toners">
          ${bars.map((bar, i) => this._renderBar(bar, i === bars.length - 1))}
        </div>
      </ha-card>
    `;
  }

  private _headerStyle(active: boolean): Record<string, string> {
    if (!active) return {};
    // custom_card_mpse_printer_blue — only the header card, not the toner rows
    let raw = getComputedStyle(this)
      .getPropertyValue("--color-background-blue")
      .trim();
    const m = raw.match(/^var\(--([a-z0-9-]+)\)$/i);
    if (m) {
      raw = getComputedStyle(this).getPropertyValue(`--${m[1]}`).trim() || raw;
    }
    if (!/^\d+\s*,/.test(raw)) {
      raw = resolveThemeRgb(this, "blue");
    }
    const opacity =
      getComputedStyle(this).getPropertyValue("--opacity-bg").trim() || "1";
    return { backgroundColor: `rgba(${raw}, ${opacity})` };
  }

  private _activeTextColor(): string {
    let raw = getComputedStyle(this)
      .getPropertyValue("--color-blue-text")
      .trim();
    const m = raw.match(/^var\(--([a-z0-9-]+)\)$/i);
    if (m) {
      raw = getComputedStyle(this).getPropertyValue(`--${m[1]}`).trim() || raw;
    }
    if (/^\d+\s*,/.test(raw)) return `rgba(${raw}, 1)`;
    if (raw.startsWith("#") || raw.startsWith("rgb")) return raw;
    return `rgba(${resolveThemeRgb(this, "blue")}, 1)`;
  }

  private _renderHeader(stateObj: HassEntity, active: boolean) {
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
    const textStyle = active ? { color: this._activeTextColor() } : {};

    const name =
      this._config!.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const label = this._stateLabel(stateObj);
    const icon =
      this._config!.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:printer";

    return html`
      <div class="header" style=${styleMap(this._headerStyle(active))}>
        <div
          class="row"
          role="button"
          tabindex="0"
          @click=${() => this._moreInfo(this._config!.entity)}
          @keydown=${(ev: KeyboardEvent) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              this._moreInfo(this._config!.entity);
            }
          }}
        >
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="printer-name" style=${styleMap(textStyle)}>${name}</div>
            <div class="printer-state" style=${styleMap(textStyle)}>
              ${label}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderBar(bar: TonerBar, last: boolean) {
    if (!bar.entity) {
      return html`<div class="toner-row ${last ? "last" : ""} empty"></div>`;
    }
    const stateObj = this.hass!.states[bar.entity];
    if (!stateObj) {
      return html`
        <div class="toner-row ${last ? "last" : ""}">
          <div class="bar missing-bar">Missing: ${bar.entity}</div>
        </div>
      `;
    }

    const raw = Number.parseFloat(stateObj.state);
    const value = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : 0;
    const unit = stateObj.attributes.unit_of_measurement;
    // Docs screenshot shows "60 %" (space before unit)
    const display = Number.isFinite(raw)
      ? unit
        ? `${Math.round(raw)} ${unit}`
        : `${Math.round(raw)} %`
      : stateObj.state;

    return html`
      <div
        class="toner-row ${last ? "last" : ""}"
        role="button"
        tabindex="0"
        @click=${() => this._moreInfo(bar.entity)}
        @keydown=${(ev: KeyboardEvent) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            this._moreInfo(bar.entity);
          }
        }}
      >
        <div
          class="bar"
          style=${styleMap({
            "--toner-color": bar.color,
            "--toner-pct": `${value}%`,
          })}
        >
          <div class="bar-fill"></div>
          <span class="bar-value">${display}</span>
        </div>
      </div>
    `;
  }

  private _stateLabel(stateObj: HassEntity): string {
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    return stateObj.state;
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
      width: 100%;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-card.ulm-mpse-printer {
      border-radius: 20px;
      box-shadow: var(--box-shadow);
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: auto;
      box-sizing: border-box;
    }

    .warning {
      padding: 12px;
      color: var(--error-color);
    }

    /* item1 icon_info — padding 12px */
    .header {
      padding: 12px;
      box-sizing: border-box;
    }

    .row {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      column-gap: 12px;
      cursor: pointer;
      min-width: 0;
    }

    .icon-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .icon-btn ha-icon {
      --mdc-icon-size: 20px;
    }

    .info-btn {
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Avoid ulmCardStyles .name/.label conflicts */
    .printer-name {
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .printer-state {
      font-weight: bold;
      font-size: 12px;
      line-height: 1.2;
      filter: opacity(40%);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }

    ha-card.active .printer-state {
      filter: none;
    }

    .toners {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    /* bar-card card_mod: #states padding 0 16px; last adds bottom 16px */
    .toner-row {
      padding: 0 16px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .toner-row.last {
      padding-bottom: 16px;
    }

    .toner-row.empty {
      min-height: 0;
      padding: 0;
    }

    /* Native bar matching original bar-card height 20px + border-radius 5px */
    .bar {
      position: relative;
      height: 20px;
      margin: 4px 0;
      border-radius: 5px;
      border: 0.01rem solid rgba(var(--color-theme, 51, 51, 51), 0.4);
      box-sizing: border-box;
      overflow: hidden;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bar-fill {
      position: absolute;
      inset: 0 auto 0 0;
      width: var(--toner-pct, 0%);
      background: var(--toner-color, black);
      border-radius: 5px;
      pointer-events: none;
    }

    .bar-value {
      position: relative;
      z-index: 1;
      font-size: 12px;
      font-weight: 500;
      color: grey;
      line-height: 1;
      pointer-events: none;
    }

    .missing-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--error-color);
      font-size: 11px;
      border-style: dashed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-mpse-printer-card": UlmCustomMpsePrinterCard;
  }
}
