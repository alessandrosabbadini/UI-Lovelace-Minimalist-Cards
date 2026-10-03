import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { UlmEditorBase } from "../../shared/editor-base";
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

  public static async getConfigElement() {
    return document.createElement("ulm-title-card-editor");
  }

  public static getStubConfig(): Partial<UlmTitleCardConfig> {
    return { name: "Lights", label: "Living room" };
  }

  public setConfig(config: UlmTitleCardConfig): void {
    this._config = { ...config, type: "custom:ulm-title-card" };
  }

  public getCardSize(): number {
    return 1;
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
    }
    .title {
      padding: 12px 4px 0;
    }
    .name {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }
    .label {
      margin-top: 2px;
      font-size: 14px;
      font-weight: 500;
      opacity: 0.45;
    }
  `;
}

@customElement("ulm-title-card-editor")
export class UlmTitleCardEditor extends UlmEditorBase<UlmTitleCardConfig> {
  protected render() {
    return this.renderFields([
      {
        type: "text",
        key: "name",
        label: "Title (name)",
        placeholder: "Lights",
      },
      {
        type: "text",
        key: "label",
        label: "Subtitle (label)",
        placeholder: "Optional subtitle",
      },
    ]);
  }
}
