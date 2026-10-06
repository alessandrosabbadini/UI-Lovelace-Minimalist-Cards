/**
 * Lit port of custom_cards/custom_card_sisimomo_printer/
 * Printer status header + configurable cartridge toner bars (unicolor / tricolor).
 * Validation logic matches the original button-card JavaScript template.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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

export interface SisimomoCartridge {
  label: string;
  type?: "unicolor" | "tricolor";
  color: string | string[];
  entity_id: string;
}

export interface UlmCustomSisimomoPrinterCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-sisimomo-printer-card";
  entity: string;
  name?: string;
  cartridges?: SisimomoCartridge[];
  ulm_idle?: string;
  ulm_translation_unavailable?: string;
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

function isCssColor(strColor: string): boolean {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
}

function normalizeCartridges(raw: unknown): SisimomoCartridge[] | undefined {
  if (!Array.isArray(raw) || raw.length === 0) return undefined;
  return raw as SisimomoCartridge[];
}

type CartridgeRender =
  | { kind: "errors"; messages: string[] }
  | { kind: "unavailable" }
  | {
      kind: "bars";
      rows: { label: string; pct: number; barStyle: Record<string, string> }[];
    };

@customElement("ulm-custom-card-sisimomo-printer-card")
export class UlmCustomSisimomoPrinterCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomSisimomoPrinterCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        textField("ulm_idle"),
        textField("ulm_translation_unavailable"),
      ],
      computeLabel: labels({
        entity: "Printer status entity",
        name: "Printer name override",
        ulm_idle: "Idle state label (ulm_idle)",
        ulm_translation_unavailable: "Unavailable label",
      }),
      computeHelper: helpers({
        entity: "Header turns blue when state ≠ idle and not unavailable",
        name: "Defaults to entity friendly_name",
        ulm_idle: 'Default "idle" — compared case-insensitively',
        ulm_translation_unavailable:
          'Default "unavailable". Configure cartridges array in YAML (see original card).',
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomSisimomoPrinterCardConfig> {
    return {
      entity: "sensor.demo_printer",
      name: "Demo Printer",
      ulm_idle: "idle",
      ulm_translation_unavailable: "unavailable",
      cartridges: [
        {
          label: "Black",
          type: "unicolor",
          color: "#000000",
          entity_id: "sensor.demo_printer_black_toner",
        },
        {
          label: "Color",
          type: "tricolor",
          color: ["#00FFFF", "#FF00FF", "#FFFF00"],
          entity_id: "sensor.demo_printer_color_toner",
        },
      ],
    };
  }

  public setConfig(config: UlmCustomSisimomoPrinterCardConfig): void {
    const c = config as UlmCustomSisimomoPrinterCardConfig &
      Record<string, unknown>;
    const entity = asStr(config.entity);
    if (!entity) throw new Error("Please define an entity");

    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      cartridges: normalizeCartridges(pick(c, "cartridges")),
      ulm_idle: asStr(pick(c, "ulm_idle")) || "idle",
      ulm_translation_unavailable:
        asStr(pick(c, "ulm_translation_unavailable")) || "unavailable",
      type: "custom:ulm-custom-card-sisimomo-printer-card",
    };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card class="ulm-card ulm-sisimomo-printer"
        ><div class="warning">Entity not found: ${this._config.entity}</div></ha-card
      >`;
    }

    const idle = (this._config.ulm_idle || "idle").toLowerCase();
    const unavail = (
      this._config.ulm_translation_unavailable || "unavailable"
    ).toLowerCase();
    const stLower = stateObj.state.toLowerCase();
    const active = stLower !== idle && stLower !== unavail;
    const cartridgeBlock = this._buildCartridges();

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-sisimomo-printer": true,
          active,
        })}
      >
        ${this._renderHeader(stateObj, active)}
        <div class="cartridges">${this._renderCartridgeBlock(cartridgeBlock)}</div>
      </ha-card>
    `;
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
    const name =
      this._config!.name ||
      (stateObj.attributes.friendly_name as string | undefined) ||
      stateObj.entity_id;
    const label =
      this.hass!.formatEntityState?.(stateObj) || stateObj.state;
    const icon =
      (stateObj.attributes.icon as string | undefined) || "mdi:printer";

    return html`
      <button
        class="header"
        @click=${() => this._moreInfo(this._config!.entity)}
      >
        <div class="icon-cell" style=${styleMap(iconStyle)}>
          <ha-icon .icon=${icon}></ha-icon>
        </div>
        <div class="info">
          <div class="printer-name">${name}</div>
          <div class="printer-state">${label}</div>
        </div>
      </button>
    `;
  }

  private _buildCartridges(): CartridgeRender | undefined {
    const cartridges = this._config!.cartridges;
    if (!cartridges?.length) return undefined;

    const unavail = (
      this._config!.ulm_translation_unavailable || "unavailable"
    ).toLowerCase();
    const validTypes = ["unicolor", "tricolor"];
    const errors: string[] = [];
    let tonerAvailable = true;

    cartridges.forEach((cartridge, index) => {
      const type = cartridge.type ?? "unicolor";

      if (cartridge.label === undefined) {
        errors.push(`cartridges.[${index}].label: You must provide a value.`);
      }

      if (!validTypes.includes(type)) {
        errors.push(
          `cartridges.[${index}].type: You must provide a valid cartridge type`,
        );
      }

      if (cartridge.color !== undefined) {
        if (type === "unicolor") {
          if (
            typeof cartridge.color === "string"
              ? !isCssColor(cartridge.color)
              : true
          ) {
            errors.push(
              `cartridges.[${index}].color: You must provide a single valid CSS color value.`,
            );
          }
        } else if (
          Array.isArray(cartridge.color) &&
          cartridge.color.length === 3
        ) {
          cartridge.color.forEach((color, colIndex) => {
            if (!isCssColor(String(color))) {
              errors.push(
                `cartridges.[${index}].color.[${colIndex}]: You must provide a single valid CSS color value.`,
              );
            }
          });
        } else {
          errors.push(
            `cartridges.[${index}].color: Invalid combination of colour and type.`,
          );
        }
      } else {
        errors.push(`cartridges.[${index}].color: You must provide a value.`);
      }

      if (cartridge.entity_id === undefined) {
        errors.push(
          `cartridges.[${index}].entity_id: You must provide a value.`,
        );
      } else {
        const ent = this.hass!.states[cartridge.entity_id];
        if (!ent) {
          errors.push(
            `cartridges.[${index}].entity_id: You must provide a existing entity_id.`,
          );
        } else if (String(ent.state).toLowerCase() === unavail) {
          tonerAvailable = false;
        } else {
          const n = Number(ent.state);
          if (
            Number.isNaN(n) ||
            typeof ent.state === "boolean" ||
            n < 0 ||
            n > 100
          ) {
            errors.push(
              `cartridges.[${index}].entity_id: You must provide a entity representing an integer between 0 and 100 inclusively.`,
            );
          }
        }
      }
    });

    if (errors.length) {
      return { kind: "errors", messages: errors };
    }
    if (!tonerAvailable) {
      return { kind: "unavailable" };
    }

    const rows = cartridges.map((cartridge) => {
      const type = cartridge.type ?? "unicolor";
      const ent = this.hass!.states[cartridge.entity_id]!;
      const pct = Number(ent.state);
      let barStyle: Record<string, string>;
      if (type === "unicolor") {
        barStyle = {
          width: `${pct}%`,
          backgroundColor: cartridge.color as string,
        };
      } else {
        const [c0, c1, c2] = cartridge.color as string[];
        barStyle = {
          width: `${pct}%`,
          background: `linear-gradient(180deg, ${c0}, ${c0} 33%, ${c1} 33%, ${c1} 66%, ${c2} 66%, ${c2})`,
        };
      }
      return {
        label: cartridge.label,
        pct,
        barStyle,
      };
    });

    return { kind: "bars", rows };
  }

  private _renderCartridgeBlock(block: CartridgeRender | undefined) {
    if (!block) return nothing;
    if (block.kind === "errors") {
      return html`
        <div class="error-container">
          <b>Configuration Error:</b>
          <ul>
            ${block.messages.map((m) => html`<li>${m}</li>`)}
          </ul>
        </div>
      `;
    }
    if (block.kind === "unavailable") {
      return html`<div class="info-unavailable">Toner Information Unavailable</div>`;
    }
    return html`
      <div class="wrapper">
        ${block.rows.flatMap((row) => [
          html`<div class="label">${row.label}</div>`,
          html`<div class="container-bar">
            <div class="bar" style=${styleMap(row.barStyle)}></div>
          </div>`,
          html`<div class="state">${row.pct}%</div>`,
        ])}
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
      cursor: default;
    }

    ha-card.ulm-sisimomo-printer {
      padding: 12px;
      display: flex;
      flex-direction: column;
      /* YAML: printer_state then cartridges — no extra card row-gap */
      gap: 0;
      overflow: visible;
    }

    .header {
      display: grid;
      grid-template-columns: min-content 1fr;
      align-items: center;
      column-gap: 0;
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: left;
      color: inherit;
      width: 100%;
    }

    .header .icon-cell {
      margin: 0;
    }

    .header .info {
      margin-left: 12px;
      min-width: 0;
    }

    .icon-cell {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
    }

    .icon-cell ha-icon {
      --mdc-icon-size: 20px;
    }

    .printer-name {
      font-weight: bold;
      font-size: 14px;
    }

    .printer-state {
      font-weight: bold;
      font-size: 12px;
      filter: opacity(40%);
      text-transform: capitalize;
    }

    ha-card.active .printer-state {
      filter: none;
      color: rgba(var(--color-blue-text, var(--color-blue, 61, 90, 254)), 1);
    }

    /* card_mod cartridges wrapper — 12px top separates bars from header */
    .wrapper {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 1rem;
      grid-row-gap: 1rem;
      padding: 12px 8px 8px;
      align-items: center;
      box-sizing: border-box;
    }

    .wrapper > *:nth-child(3n-2),
    .wrapper > *:nth-child(3n) {
      place-self: center start;
    }

    .wrapper > .container-bar {
      place-self: center stretch;
      width: 100%;
      min-width: 0;
      align-self: center;
    }

    .label {
      filter: opacity(70%);
      font-size: medium;
      line-height: 20px;
      white-space: nowrap;
    }

    .container-bar {
      position: relative;
      border-radius: 4px;
      border: 0.01rem solid rgba(var(--color-theme, 51, 51, 51), 0.35);
      box-sizing: border-box;
      overflow: hidden;
      height: 20px;
      background: transparent;
    }

    .bar {
      height: 20px;
      border-radius: 4px;
      max-width: 100%;
      box-sizing: border-box;
    }

    .state {
      filter: opacity(40%);
      font-size: medium;
      line-height: 20px;
      white-space: nowrap;
      text-align: left;
    }

    .error-container {
      text-align: left;
      font-size: 75%;
      font-family: var(--code-font-family, monospace);
      padding: 10px;
      background-color: rgba(219, 68, 55, 0.75);
      margin-top: 10px;
      border-radius: 8px;
    }

    .error-container ul {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-wrap: break-word;
    }

    .error-container li {
      margin-top: 0.5em;
    }

    .info-unavailable {
      padding: 1em;
      margin-top: 10px;
      border-radius: 8px;
      opacity: 60%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-sisimomo-printer-card": UlmCustomSisimomoPrinterCard;
  }
}
