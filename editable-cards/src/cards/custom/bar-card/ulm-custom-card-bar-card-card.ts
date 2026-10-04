/**
 * Lit port of custom_cards/custom_card_bar_card/custom_card_bar_card.yaml
 * Layout: extended_card → card_generic header + nested custom:bar-card (HACS).
 */
import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  COLOR_OPTIONS,
  resolveThemeRgb,
} from "../../../shared/colors";
import {
  booleanField,
  colorField,
  entityField,
  helpers,
  iconField,
  labels,
  numberField,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

const BAR_TAG = "bar-card";

export interface UlmCustomBarCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-bar-card-card";
  entity: string;
  name?: string;
  icon?: string;
  /** Theme color for the header icon (empty = grey inactive look) */
  icon_color?: UlmThemeColor | "";
  /** Bar fill: theme name or CSS color (default var(--google-blue)) */
  bar_color?: string;
  show_icon?: boolean;
  indicator?: boolean;
  show_value?: boolean;
  min?: number;
  max?: number;
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
  return fallback;
}

function asNum(raw: unknown, fallback: number): number {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const n = Number.parseFloat(String(raw ?? ""));
  return Number.isFinite(n) ? n : fallback;
}

function resolveBarColor(raw: string | undefined): string {
  const v = (raw || "var(--google-blue)").trim();
  if (COLOR_OPTIONS.includes(v as UlmThemeColor)) {
    return `var(--google-${v})`;
  }
  return v;
}

@customElement("ulm-custom-card-bar-card-card")
export class UlmCustomBarCardCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomBarCardConfig;
  @state() private _barMissing = false;
  @query(".bar-host") private _barHost?: HTMLDivElement;

  private _barEl?: LovelaceCard & HTMLElement;
  private _barKey = "";
  private _barLoading = false;
  private _barDirty = false;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity"),
        textField("name"),
        iconField("icon"),
        colorField("icon_color"),
        textField("bar_color"),
        booleanField("show_icon"),
        booleanField("indicator"),
        booleanField("show_value"),
        numberField("min"),
        numberField("max"),
      ],
      computeLabel: labels({
        entity: "Entity",
        name: "Name (ulm_custom_card_bar_card_name)",
        icon: "Icon (ulm_custom_card_bar_card_icon)",
        icon_color: "Icon color (ulm_custom_card_bar_card_icon_color)",
        bar_color: "Bar color (ulm_custom_card_bar_card_color)",
        show_icon: "Show header (ulm_custom_card_bar_card_show_icon)",
        indicator: "Show bar indicator",
        show_value: "Show value inside bar",
        min: "Min (ulm_custom_card_bar_card_min)",
        max: "Max (ulm_custom_card_bar_card_max)",
      }),
      computeHelper: helpers({
        show_icon:
          "Original YAML hides the whole card_generic header when false",
        bar_color:
          "CSS color or theme name. Default var(--google-blue). Requires HACS bar-card.",
        icon_color: "Theme color for the icon chip; empty = grey",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomBarCardConfig> {
    return {
      entity: "sensor.outside_humidity",
      name: "Humidity",
      icon: "mdi:water-percent",
      icon_color: "blue",
      bar_color: "var(--google-blue)",
      show_icon: true,
      indicator: false,
      show_value: true,
      min: 0,
      max: 100,
    };
  }

  public setConfig(config: UlmCustomBarCardConfig): void {
    const c = config as UlmCustomBarCardConfig & Record<string, unknown>;
    const entity =
      config.entity ||
      (pick(c, "ulm_custom_card_bar_card_entity") as string | undefined);
    if (!entity) throw new Error("Please define an entity");

    const iconColorRaw = pick(
      c,
      "icon_color",
      "ulm_custom_card_bar_card_icon_color",
    );
    let icon_color: UlmThemeColor | "" = "";
    if (
      typeof iconColorRaw === "string" &&
      COLOR_OPTIONS.includes(iconColorRaw as UlmThemeColor)
    ) {
      icon_color = iconColorRaw as UlmThemeColor;
    }

    this._config = {
      ...config,
      entity,
      name:
        (pick(c, "name", "ulm_custom_card_bar_card_name") as string) ||
        undefined,
      icon:
        (pick(c, "icon", "ulm_custom_card_bar_card_icon") as string) ||
        undefined,
      icon_color,
      bar_color: String(
        pick(c, "bar_color", "ulm_custom_card_bar_card_color") ||
          "var(--google-blue)",
      ),
      show_icon: asBool(
        pick(c, "show_icon", "ulm_custom_card_bar_card_show_icon"),
        true,
      ),
      indicator: asBool(
        pick(c, "indicator", "ulm_custom_card_bar_card_indicator"),
        false,
      ),
      show_value: asBool(
        pick(c, "show_value", "ulm_custom_card_bar_card_value", "value"),
        false,
      ),
      min: asNum(pick(c, "min", "ulm_custom_card_bar_card_min"), 0),
      max: asNum(pick(c, "max", "ulm_custom_card_bar_card_max"), 100),
      type: "custom:ulm-custom-card-bar-card-card",
    };
    this._barKey = "";
  }

  public getCardSize(): number {
    return this._config?.show_icon === false ? 1 : 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 1,
    };
  }

  protected updated(changed: PropertyValues): void {
    if (!this._config || !this.hass) return;
    if (
      changed.has("_config") ||
      changed.has("hass") ||
      !this._barEl ||
      this._barMissing
    ) {
      void this._syncBar();
    } else if (this._barEl) {
      this._barEl.hass = this.hass;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    const showHeader = this._config.show_icon !== false;

    return html`
      <ha-card class="ulm-card ulm-bar-card">
        ${showHeader ? this._header(stateObj) : nothing}
        <div class="bar-wrap">
          ${this._barMissing
            ? html`<div class="missing-dep">
                Install <strong>bar-card</strong> from HACS (custom-cards) and
                add it as a Lovelace resource.
              </div>`
            : html`<div class="bar-host"></div>`}
        </div>
      </ha-card>
    `;
  }

  private _header(stateObj?: HassEntity) {
    if (!stateObj) {
      return html`<div class="header missing">
        <div class="warning">Entity not found: ${this._config!.entity}</div>
      </div>`;
    }

    const iconColor = this._config!.icon_color;
    let iconStyle: Record<string, string>;
    if (iconColor) {
      const rgb = resolveThemeRgb(this, iconColor);
      iconStyle = {
        color: `rgba(${rgb}, 1)`,
        backgroundColor: `rgba(${rgb}, 0.2)`,
      };
    } else {
      iconStyle = {
        color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
        backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
      };
    }

    // card_generic: primary = state, secondary = name
    const primary = this._stateLabel(stateObj);
    const secondary =
      this._config!.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const icon =
      this._config!.icon ||
      (stateObj.attributes.icon as string | undefined) ||
      "mdi:chart-bar";

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
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info-btn">
            <div class="name">${primary}</div>
            <div class="label">${secondary}</div>
          </div>
        </div>
      </div>
    `;
  }

  private _stateLabel(stateObj: HassEntity): string {
    if (this.hass?.formatEntityState) {
      return this.hass.formatEntityState(stateObj);
    }
    const unit = stateObj.attributes.unit_of_measurement;
    return unit ? `${stateObj.state} ${unit}` : stateObj.state;
  }

  private _buildBarConfig(): LovelaceCardConfig {
    const cfg = this._config!;
    return {
      type: `custom:${BAR_TAG}`,
      entities: [{ entity: cfg.entity }],
      color: resolveBarColor(cfg.bar_color),
      min: cfg.min ?? 0,
      max: cfg.max ?? 100,
      positions: {
        icon: "off",
        indicator: cfg.indicator ? "inside" : "off",
        minmax: "off",
        title: "off",
        value: cfg.show_value ? "inside" : "off",
        name: "off",
      },
      card_mod: {
        style: `
          ha-card {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            border-radius: var(--border-radius, 20px) !important;
          }
          bar-card-currentbar {
            border-radius: 0px !important;
            right: 0;
          }
          bar-card-backgroundbar {
            border-radius: 0px !important;
            right: 0;
          }
          #states {
            padding: 0;
            height: 35px;
          }
          bar-card-background {
            height: 35px !important;
          }
          bar-card-indicator {
            left: 10px;
          }
          bar-card-value {
            font-weight: bold;
            font-size: 12px;
          }
        `,
      },
    };
  }

  private async _syncBar(): Promise<void> {
    if (!this._config || !this.hass) return;
    if (this._barLoading) {
      this._barDirty = true;
      return;
    }
    this._barLoading = true;
    this._barDirty = false;
    try {
      const available = await this._ensureBarLoaded();
      if (!available) {
        if (!this._barMissing) this._barMissing = true;
        return;
      }
      if (this._barMissing) this._barMissing = false;

      await this.updateComplete;
      const host = this._barHost;
      if (!host) {
        this._barDirty = true;
        return;
      }

      const barConfig = this._buildBarConfig();
      const key = JSON.stringify(barConfig);
      if (!this._barEl || key !== this._barKey) {
        this._barKey = key;
        const w = window as Window & {
          loadCardHelpers?: () => Promise<{
            createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
          }>;
        };
        if (typeof w.loadCardHelpers === "function") {
          const helpersApi = await w.loadCardHelpers();
          this._barEl = helpersApi.createCardElement(barConfig) as LovelaceCard &
            HTMLElement;
        } else {
          const el = document.createElement(BAR_TAG) as LovelaceCard &
            HTMLElement;
          el.setConfig(barConfig);
          this._barEl = el;
        }
        this._barEl.hass = this.hass;
        host.replaceChildren(this._barEl);
      } else {
        this._barEl.hass = this.hass;
      }
    } finally {
      this._barLoading = false;
      if (this._barDirty) {
        this._barDirty = false;
        void this._syncBar();
      }
    }
  }

  private async _ensureBarLoaded(): Promise<boolean> {
    if (customElements.get(BAR_TAG)) return true;
    try {
      await Promise.race([
        customElements.whenDefined(BAR_TAG),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 2500),
        ),
      ]);
    } catch {
      /* timeout */
    }
    return !!customElements.get(BAR_TAG);
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

    /* extended_card: padding 0 */
    ha-card.ulm-card.ulm-bar-card {
      width: 100%;
      max-width: 100%;
      height: auto;
      min-height: 0;
      padding: 0;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      direction: ltr;
    }

    /* item1 card_generic: top radii, padding 12px, no shadow */
    .header {
      padding: 12px;
      box-sizing: border-box;
      border-radius: var(--ulm-radius) var(--ulm-radius) 0 0;
      overflow: hidden;
    }

    .header .row {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      cursor: pointer;
      direction: ltr;
    }

    .header .label {
      opacity: 0.4;
    }

    .bar-wrap {
      width: 100%;
      min-height: 35px;
      overflow: hidden;
      box-sizing: border-box;
    }

    .bar-host {
      width: 100%;
      min-height: 35px;
      overflow: hidden;
    }

    .bar-host > * {
      display: block;
      width: 100% !important;
      max-width: 100% !important;
      overflow: hidden !important;
      box-sizing: border-box;
    }

    .missing-dep {
      font-size: 12px;
      line-height: 1.35;
      opacity: 0.75;
      padding: 8px 12px;
    }

    .missing {
      padding: 8px 12px;
    }
  `;
}
