/**
 * Faithful Lit port of custom_cards/custom_card_afvalophaling/card_afvalophaling.yaml
 * Labels localized to English (original YAML used Dutch fraction names).
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
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomAfvalophalingCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-afvalophaling-card";
  name?: string;
  icon?: string;
  ulm_card_ophaling_vandaag?: string;
  ulm_card_ophaling_morgen?: string;
  ulm_card_datum_rest?: string;
  ulm_card_datum_papier?: string;
  ulm_card_datum_pmd?: string;
  ulm_card_datum_gft?: string;
  ulm_card_datum_glas?: string;
  ulm_ophaling?: string;
  ulm_volgende_ophaling?: string;
}

type Accent = "theme" | "green" | "blue" | "red";

/** Original Dutch "Geen" + English "None" = no collection */
const NONE = new Set(["geen", "none", ""]);

function pick(
  cfg: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const k of keys) {
    const v = cfg[k];
    if (typeof v === "string" && v) return v;
  }
  return undefined;
}

function stateOf(
  hass: HomeAssistant,
  entityId?: string,
): string | undefined {
  if (!entityId) return undefined;
  return hass.states[entityId]?.state;
}

function isNone(state: string | undefined): boolean {
  if (state === undefined) return true;
  return NONE.has(state.toLowerCase());
}

function isGlass(state: string | undefined): boolean {
  if (!state) return false;
  const s = state.toLowerCase();
  return s === "glas" || s === "glass";
}

@customElement("ulm-custom-card-afvalophaling-card")
export class UlmCustomAfvalophalingCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomAfvalophalingCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("ulm_card_ophaling_vandaag", undefined, false),
        entityField("ulm_card_ophaling_morgen", undefined, false),
        entityField("ulm_card_datum_rest", undefined, false),
        entityField("ulm_card_datum_papier", undefined, false),
        entityField("ulm_card_datum_pmd", undefined, false),
        entityField("ulm_card_datum_gft", undefined, false),
        entityField("ulm_card_datum_glas", undefined, false),
        textField("ulm_ophaling"),
        textField("ulm_volgende_ophaling"),
        textField("name"),
        iconField("icon"),
      ],
      computeLabel: labels({
        ulm_card_ophaling_vandaag: "Collection today",
        ulm_card_ophaling_morgen: "Collection tomorrow",
        ulm_card_datum_rest: "Next residual waste date",
        ulm_card_datum_papier: "Next paper date",
        ulm_card_datum_pmd: "Next PMD date",
        ulm_card_datum_gft: "Next organic (GFT) date",
        ulm_card_datum_glas: "Next glass date",
        ulm_ophaling: "Title when collecting soon",
        ulm_volgende_ophaling: "Title for upcoming list",
        name: "Name override",
        icon: "Icon override",
      }),
      computeHelper: helpers({
        ulm_card_ophaling_vandaag:
          'State "None" / "Geen" = no collection. Other values show as today\'s fraction.',
        ulm_ophaling: 'Default: "Garbage collection!"',
        ulm_volgende_ophaling: 'Default: "Next collections"',
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomAfvalophalingCardConfig> {
    return {
      ulm_card_ophaling_vandaag: "sensor.afval_vandaag",
      ulm_card_ophaling_morgen: "sensor.afval_morgen",
      ulm_card_datum_rest: "sensor.afval_datum_rest",
      ulm_card_datum_papier: "sensor.afval_datum_papier",
      ulm_card_datum_pmd: "sensor.afval_datum_pmd",
      ulm_card_datum_gft: "sensor.afval_datum_gft",
      ulm_card_datum_glas: "sensor.afval_datum_glas",
      ulm_ophaling: "Garbage collection!",
      ulm_volgende_ophaling: "Next collections",
      icon: "mdi:delete",
    };
  }

  public setConfig(config: UlmCustomAfvalophalingCardConfig): void {
    const c = config as UlmCustomAfvalophalingCardConfig &
      Record<string, unknown>;
    this._config = {
      ...config,
      ulm_card_ophaling_vandaag: pick(c, "ulm_card_ophaling_vandaag"),
      ulm_card_ophaling_morgen: pick(c, "ulm_card_ophaling_morgen"),
      ulm_card_datum_rest: pick(c, "ulm_card_datum_rest"),
      ulm_card_datum_papier: pick(c, "ulm_card_datum_papier"),
      ulm_card_datum_pmd: pick(c, "ulm_card_datum_pmd"),
      ulm_card_datum_gft: pick(c, "ulm_card_datum_gft"),
      ulm_card_datum_glas: pick(c, "ulm_card_datum_glas"),
      name: config.name,
      ulm_ophaling: pick(c, "ulm_ophaling"),
      ulm_volgende_ophaling: pick(c, "ulm_volgende_ophaling"),
      icon: config.icon || "mdi:delete",
      type: "custom:ulm-custom-card-afvalophaling-card",
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
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const vandaag = stateOf(this.hass, this._config.ulm_card_ophaling_vandaag);
    const morgen = stateOf(this.hass, this._config.ulm_card_ophaling_morgen);
    const collectingSoon = !isNone(vandaag) || !isNone(morgen);
    const glass = isGlass(vandaag) || isGlass(morgen);
    const unavailable =
      vandaag === "unavailable" || morgen === "unavailable";

    let accent: Accent = "theme";
    let icon = this._config.icon || "mdi:delete";
    if (collectingSoon) {
      accent = "green";
      icon = "mdi:recycle";
    }
    if (glass) {
      accent = "blue";
      icon = "mdi:bottle-wine-outline";
    }
    if (unavailable) accent = "red";

    const titleSoon =
      this._config.ulm_ophaling ||
      this._config.name ||
      "Garbage collection!";
    const titleNext =
      this._config.ulm_volgende_ophaling || "Next collections";
    const name = this._config.name || (collectingSoon ? titleSoon : titleNext);
    const labelLines = this._labelLines(vandaag, morgen);

    const rgb =
      accent === "theme"
        ? null
        : resolveThemeRgb(this, accent === "red" ? "red" : accent);
    const iconStyle =
      accent === "theme"
        ? {
            color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
            backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
          }
        : {
            color: `rgba(${rgb}, 1)`,
            backgroundColor: `rgba(${rgb}, 0.2)`,
          };

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-afvalophaling": true,
          collecting: collectingSoon,
        })}
        @click=${this._moreInfo}
      >
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
            ${unavailable
              ? html`<span class="badge" aria-hidden="true"
                  ><ha-icon icon="mdi:help"></ha-icon
                ></span>`
              : nothing}
          </div>
          <div class="info-btn">
            <div class="name">${name}</div>
            <div class="label">
              ${labelLines.length <= 1
                ? labelLines[0] || nothing
                : labelLines.map(
                    (line) => html`<div class="line">${line}</div>`,
                  )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _labelLines(
    vandaag: string | undefined,
    morgen: string | undefined,
  ): string[] {
    if (!this._config || !this.hass) return [];
    if (!isNone(vandaag) && vandaag !== undefined) {
      return [this._localizeFraction(vandaag)];
    }
    if (!isNone(morgen) && morgen !== undefined) {
      return [this._localizeFraction(morgen)];
    }

    // English labels (YAML had Dutch: Restafval / Papier / PMD / GFT / Glas)
    const pairs: [string | undefined, string][] = [
      [this._config.ulm_card_datum_rest, "Residual"],
      [this._config.ulm_card_datum_papier, "Paper"],
      [this._config.ulm_card_datum_pmd, "PMD"],
      [this._config.ulm_card_datum_gft, "Organic"],
      [this._config.ulm_card_datum_glas, "Glass"],
    ];
    const lines: string[] = [];
    for (const [entityId, label] of pairs) {
      if (!entityId) continue;
      const st = stateOf(this.hass, entityId);
      if (st === undefined) continue;
      lines.push(`${label} • ${st}`);
    }
    return lines;
  }

  private _localizeFraction(raw: string): string {
    const map: Record<string, string> = {
      restafval: "Residual",
      rest: "Residual",
      papier: "Paper",
      paper: "Paper",
      pmd: "PMD",
      gft: "Organic",
      organic: "Organic",
      glas: "Glass",
      glass: "Glass",
    };
    return map[raw.toLowerCase()] || raw;
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    const entityId =
      this._config.ulm_card_ophaling_vandaag ||
      this._config.ulm_card_ophaling_morgen ||
      this._config.ulm_card_datum_rest;
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-afvalophaling {
      height: auto;
      cursor: pointer;
    }

    /* icon_info: name on top row, label under — shared .row + .info-btn */
    .icon-btn {
      overflow: visible;
    }

    .name {
      align-self: end;
      margin-bottom: 4px;
    }

    .label {
      align-self: start;
      font-weight: bold;
      white-space: normal;
      overflow: visible;
      text-overflow: unset;
      line-height: 1.35;
    }

    .label .line + .line {
      margin-top: 1px;
    }

    .badge {
      left: 28px;
      top: -2px;
      border: 2px solid var(--card-background-color, #fafafa);
      background: rgba(var(--color-red, 245, 68, 54), 1);
      z-index: 2;
    }

    .badge ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }
  `;
}
