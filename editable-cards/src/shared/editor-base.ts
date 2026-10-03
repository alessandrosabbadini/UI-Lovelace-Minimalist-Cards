import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { COLOR_OPTIONS } from "./colors";
import { ulmEditorStyles } from "./styles";
import type { HomeAssistant, LovelaceCardConfig, UlmThemeColor } from "../types";

export type EditorField =
  | { type: "section"; label: string }
  | { type: "text"; key: string; label: string; placeholder?: string }
  | { type: "number"; key: string; label: string; placeholder?: string }
  | { type: "select"; key: string; label: string; options: string[] }
  | { type: "color"; key: string; label: string }
  | { type: "toggle"; key: string; label: string };

export class UlmEditorBase<T extends LovelaceCardConfig> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: T;

  public setConfig(config: T): void {
    this._config = { ...config };
  }

  protected renderFields(fields: EditorField[]) {
    if (!this.hass || !this._config) return nothing;
    return html`<div class="form">
      ${fields.map((field) => this._renderField(field))}
    </div>`;
  }

  private _renderField(field: EditorField) {
    if (field.type === "section") {
      return html`<div class="section">${field.label}</div>`;
    }

    const config = this._config as Record<string, unknown>;

    if (field.type === "toggle") {
      return html`
        <label class="check">
          <input
            type="checkbox"
            .checked=${Boolean(config[field.key])}
            @change=${this._boolChanged(field.key)}
          />
          ${field.label}
        </label>
      `;
    }

    if (field.type === "select" || field.type === "color") {
      const options =
        field.type === "color" ? (COLOR_OPTIONS as string[]) : field.options;
      return html`
        <label>
          ${field.label}
          <select
            .value=${String(config[field.key] ?? options[0] ?? "")}
            @change=${this._valueChanged(field.key)}
          >
            ${options.map(
              (option) => html`<option value=${option}>${option}</option>`,
            )}
          </select>
        </label>
      `;
    }

    return html`
      <label>
        ${field.label}
        <input
          type=${field.type === "number" ? "number" : "text"}
          .value=${String(config[field.key] ?? "")}
          placeholder=${field.placeholder || ""}
          @change=${this._valueChanged(field.key)}
        />
      </label>
    `;
  }

  private _valueChanged(key: string) {
    return (ev: Event) => {
      if (!this._config) return;
      const target = ev.target as HTMLInputElement | HTMLSelectElement;
      const value = target.value;
      const next = { ...this._config } as Record<string, unknown>;
      if (value === "") delete next[key];
      else if ((target as HTMLInputElement).type === "number")
        next[key] = Number(value);
      else next[key] = value;
      this._config = next as T;
      this._fireChanged();
    };
  }

  private _boolChanged(key: string) {
    return (ev: Event) => {
      if (!this._config) return;
      this._config = {
        ...this._config,
        [key]: (ev.target as HTMLInputElement).checked,
      };
      this._fireChanged();
    };
  }

  protected _fireChanged() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = ulmEditorStyles;
}

export function defaultColor(color?: string): UlmThemeColor {
  return (color as UlmThemeColor) || "blue";
}
