/**
 * Lit port of custom_cards/custom_card_wilbiev_title/
 * Clean title divider (no HACS text-divider-row): lightgray bg, optional back nav.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { helpers, labels, textField } from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomWilbievTitleCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-wilbiev-title-card";
  name?: string;
  /** Navigation path — shows chevron and navigates on tap when set */
  nav?: string;
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

@customElement("ulm-custom-card-wilbiev-title-card")
export class UlmCustomWilbievTitleCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomWilbievTitleCardConfig;

  public static getConfigForm() {
    return {
      schema: [textField("name"), textField("nav")],
      computeLabel: labels({
        name: "Title",
        nav: "Navigation path",
      }),
      computeHelper: helpers({
        name: "Legacy: ulm_custom_card_wilbiev_title_name",
        nav: "Legacy: ulm_custom_card_wilbiev_title_nav — shows back chevron when set",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomWilbievTitleCardConfig> {
    return { name: "Title" };
  }

  public setConfig(config: UlmCustomWilbievTitleCardConfig): void {
    const c = config as UlmCustomWilbievTitleCardConfig &
      Record<string, unknown>;
    const name =
      asStr(pick(c, "name", "ulm_custom_card_wilbiev_title_name")) || "Title";
    const nav = asStr(pick(c, "nav", "ulm_custom_card_wilbiev_title_nav"));
    this._config = {
      ...config,
      name,
      nav,
      type: "custom:ulm-custom-card-wilbiev-title-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
    };
  }

  protected render() {
    if (!this._config) return nothing;
    const nav = this._config.nav;
    const clickable = !!nav;

    return html`
      <ha-card
        class="ulm-card ulm-wilbiev-title"
        ?clickable=${clickable}
        @click=${clickable ? this._navigate : undefined}
      >
        <div class="row ${nav ? "with-nav" : ""}">
          ${nav
            ? html`
                <button
                  class="back"
                  type="button"
                  aria-label="Back"
                  @click=${this._navigate}
                >
                  <ha-icon .icon=${"mdi:arrow-left"}></ha-icon>
                </button>
              `
            : nothing}
          <div class="divider">
            <span class="line"></span>
            <span class="text">${this._config.name}</span>
            <span class="line"></span>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _navigate = (ev: Event) => {
    ev.stopPropagation();
    const path = this._config?.nav;
    if (!path) return;
    const navigate = (
      this.hass as HomeAssistant & { navigate?: (p: string) => void }
    )?.navigate;
    if (typeof navigate === "function") {
      navigate(path);
      return;
    }
    history.pushState(null, "", path);
    window.dispatchEvent(new Event("location-changed"));
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-wilbiev-title {
      height: auto;
      padding: 5px;
      background-color: lightgray;
      border: 2px solid black;
      border-style: outset;
      box-shadow: none;
      cursor: default;
      color: black;
    }

    ha-card.ulm-wilbiev-title[clickable] {
      cursor: pointer;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content;
      align-items: center;
      column-gap: 8px;
    }

    .row.with-nav {
      grid-template-columns: min-content 1fr;
    }

    .back {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      background: #e8e9eb;
      color: black;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }

    .back ha-icon {
      --mdc-icon-size: 24px;
      color: black;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-width: 0;
    }

    .line {
      flex: 1;
      height: 3px;
      background: black;
      min-width: 12px;
    }

    .text {
      flex-shrink: 0;
      font-size: 36px;
      font-weight: 500;
      line-height: 1.2;
      color: black;
      background: lightgray;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-wilbiev-title-card": UlmCustomWilbievTitleCard;
  }
}
