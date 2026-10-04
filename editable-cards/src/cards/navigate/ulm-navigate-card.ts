/**
 * Faithful Lit port of card_navigate.yaml (icon_only + navigate tap).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  colorField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../shared/config-form";
import { ulmCardStyles } from "../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../types";

export interface UlmNavigateCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-navigate-card";
  navigation_path: string;
  name?: string;
  title?: string;
  icon?: string;
  color?: UlmThemeColor | string;
}

function parseColorToken(
  raw: unknown,
  fallback: UlmThemeColor = "blue",
): UlmThemeColor {
  if (typeof raw !== "string" || !raw) return fallback;
  const m = raw.match(/color-([a-z]+)/i);
  if (m) return m[1].toLowerCase() as UlmThemeColor;
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

@customElement("ulm-navigate-card")
export class UlmNavigateCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmNavigateCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        textField("navigation_path"),
        textField("name"),
        iconField("icon"),
        colorField("color"),
      ],
      computeLabel: labels({
        navigation_path: "Path (ulm_card_navigate_path)",
        name: "Title (ulm_card_navigate_title)",
        icon: "Icon (ulm_card_navigate_icon)",
        color: "Icon color (ulm_card_navigate_color)",
      }),
      computeHelper: helpers({
        navigation_path: "Lovelace path, e.g. /lovelace/home or /dashboard-test/0",
        name: "Label shown next to the icon.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmNavigateCardConfig> {
    return {
      navigation_path: "/lovelace/home",
      name: "Media",
      icon: "mdi:television",
      color: "blue",
    };
  }

  public setConfig(config: UlmNavigateCardConfig): void {
    const c = config as UlmNavigateCardConfig & Record<string, unknown>;
    const path =
      config.navigation_path ||
      (c.ulm_card_navigate_path as string | undefined) ||
      "";
    if (!path) throw new Error("Please define a navigation path");

    const title =
      config.name ??
      config.title ??
      (c.ulm_card_navigate_title as string | undefined);
    if (!title) throw new Error("Please define a title");

    this._config = {
      ...config,
      navigation_path: path,
      name: title,
      icon:
        config.icon ??
        (c.ulm_card_navigate_icon as string | undefined) ??
        "mdi:page-next",
      color: parseColorToken(
        config.color ?? c.ulm_card_navigate_color,
        "blue",
      ),
      type: "custom:ulm-navigate-card",
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
    if (!this._config) return nothing;

    const color = parseColorToken(this._config.color, "blue");
    const rgb = resolveThemeRgb(this, color);
    // Solid icon (docs look); soft tinted circle like other ULM icon cells
    const iconStyle = {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };

    return html`
      <ha-card class="ulm-card ulm-navigate" @click=${this._navigate}>
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${this._config.icon || "mdi:page-next"}></ha-icon>
          </div>
          <div class="label">${this._config.name}</div>
        </div>
      </ha-card>
    `;
  }

  private _navigate = (ev: Event) => {
    ev.stopPropagation();
    const path = this._config?.navigation_path;
    if (!path) return;
    history.pushState(null, "", path);
    window.dispatchEvent(new Event("location-changed"));
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-navigate {
      height: auto;
      cursor: pointer;
    }

    /* icon_only + navigate overrides: single row icon | label */
    .row {
      display: grid;
      grid-template-columns: min-content min-content;
      grid-template-rows: min-content;
      grid-template-areas: "icon label";
      align-items: center;
      column-gap: 0;
    }

    .icon-btn {
      grid-area: icon;
      cursor: pointer;
      /* not a real button — whole card navigates */
      pointer-events: none;
    }

    /* Override ulmCardStyles .label opacity:0.4 — title must read solid */
    .label {
      grid-area: label;
      align-self: center;
      justify-self: start;
      font-weight: bold;
      font-size: 14px;
      opacity: 1;
      filter: none;
      margin-left: 12px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
  `;
}
