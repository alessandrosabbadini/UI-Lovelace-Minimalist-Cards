/**
 * Lit port of custom_cards/custom_card_wilbiev_subtitle/
 * Subtitle divider look on #E8E9EB — no HACS text-divider-row dependency.
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

export interface UlmCustomWilbievSubtitleCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-wilbiev-subtitle-card";
  name?: string;
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

@customElement("ulm-custom-card-wilbiev-subtitle-card")
export class UlmCustomWilbievSubtitleCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomWilbievSubtitleCardConfig;

  public static getConfigForm() {
    return {
      schema: [textField("name")],
      computeLabel: labels({
        name: "Subtitle",
      }),
      computeHelper: helpers({
        name: "Legacy: ulm_custom_card_wilbiev_subtitle_name (also accepts wilbiev_title_name typo)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomWilbievSubtitleCardConfig> {
    return { name: "Subtitle" };
  }

  public setConfig(config: UlmCustomWilbievSubtitleCardConfig): void {
    const c = config as UlmCustomWilbievSubtitleCardConfig &
      Record<string, unknown>;
    const name =
      asStr(
        pick(
          c,
          "name",
          "ulm_custom_card_wilbiev_subtitle_name",
          "ulm_custom_card_wilbiev_title_name",
        ),
      ) || "Subtitle";
    this._config = {
      ...config,
      name,
      type: "custom:ulm-custom-card-wilbiev-subtitle-card",
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

    return html`
      <ha-card class="ulm-card ulm-wilbiev-subtitle">
        <div class="divider">
          <span class="line"></span>
          <span class="text">${this._config.name}</span>
          <span class="line"></span>
        </div>
        <div class="rule"></div>
      </ha-card>
    `;
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-wilbiev-subtitle {
      height: auto;
      padding: 8px 12px;
      background-color: #e8e9eb;
      box-shadow: none;
      border: none;
      color: black;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .line {
      flex: 1;
      height: 2px;
      background: black;
      min-width: 12px;
    }

    .text {
      flex-shrink: 0;
      font-size: 24px;
      font-weight: 500;
      line-height: 1.2;
      color: black;
      background: #e8e9eb;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .rule {
      height: 1px;
      background: rgb(210, 210, 210);
      margin-top: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-wilbiev-subtitle-card": UlmCustomWilbievSubtitleCard;
  }
}
