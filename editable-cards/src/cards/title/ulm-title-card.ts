/**
 * Faithful Lit port of card_title.yaml (transparent title + optional subtitle).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { helpers, labels, textField } from "../../shared/config-form";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../types";

export interface UlmTitleCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-title-card";
  name?: string;
  label?: string;
}

@customElement("ulm-title-card")
export class UlmTitleCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmTitleCardConfig;

  public static getConfigForm() {
    return {
      schema: [textField("name"), textField("label")],
      computeLabel: labels({
        name: "Title (name)",
        label: "Subtitle (label)",
      }),
      computeHelper: helpers({
        name: "Main title — at least one of title or subtitle is required.",
        label: "Optional subtitle under the title.",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmTitleCardConfig> {
    return { name: "Living Room", label: "Light" };
  }

  public setConfig(config: UlmTitleCardConfig): void {
    const c = config as UlmTitleCardConfig & Record<string, unknown>;
    const name =
      config.name ??
      (c.ulm_card_title_name as string | undefined) ??
      (c.title as string | undefined);
    const label =
      config.label ??
      (c.ulm_card_title_label as string | undefined) ??
      (c.subtitle as string | undefined);
    if (!name && !label) {
      throw new Error("Please define a title (name) and/or subtitle (label)");
    }
    this._config = {
      ...config,
      name,
      label,
      type: "custom:ulm-title-card",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    // Content-sized banner across the section row
    return {
      columns: 12,
      min_columns: 6,
    };
  }

  protected render() {
    if (!this._config) return nothing;
    return html`
      <div class="title">
        ${this._config.name
          ? html`<div class="name">${this._config.name}</div>`
          : nothing}
        ${this._config.label
          ? html`<div class="label">${this._config.label}</div>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: auto !important;
      align-self: start;
      background: transparent;
      box-shadow: none;
    }

    /* card_title.yaml — transparent, no chrome */
    .title {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content;
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;
      height: auto;
      width: auto;
      margin: 6px 0 0 18px;
      padding: 6px;
      box-sizing: border-box;
    }

    .name {
      justify-self: start;
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.2;
      color: var(--primary-text-color);
    }

    .label {
      justify-self: start;
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.2;
      opacity: 0.4;
      color: var(--primary-text-color);
    }
  `;
}
