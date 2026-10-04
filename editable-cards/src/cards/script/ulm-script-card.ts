/**
 * Faithful Lit port of card_script.yaml (icon_only + call-service tap).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../shared/colors";
import {
  entityField,
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
} from "../../types";

export interface UlmScriptCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-script-card";
  /** Script entity to turn_on */
  entity?: string;
  name?: string;
  title?: string;
  icon?: string;
  /** Optional JSON object merged into script.turn_on service data */
  service_data?: string | Record<string, unknown>;
}

function parseServiceData(
  raw: unknown,
): Record<string, unknown> {
  if (!raw) return {};
  if (typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return {};
}

@customElement("ulm-script-card")
export class UlmScriptCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmScriptCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "script"),
        textField("name"),
        iconField("icon"),
        textField("service_data"),
      ],
      computeLabel: labels({
        entity: "Script entity",
        name: "Title (ulm_card_script_title)",
        icon: "Icon (ulm_card_script_icon)",
        service_data: "Service data (tap_action service_data)",
      }),
      computeHelper: helpers({
        entity: "Runs script.turn_on for this entity on tap.",
        service_data:
          'Optional JSON object, e.g. {"brightness": 50}. entity_id is set automatically.',
      }),
    };
  }

  public static getStubConfig(): Partial<UlmScriptCardConfig> {
    return {
      entity: "script.romantic_lights",
      name: "Romantic Light",
      icon: "mdi:candle",
    };
  }

  public setConfig(config: UlmScriptCardConfig): void {
    const c = config as UlmScriptCardConfig & Record<string, unknown>;
    const title =
      config.name ??
      config.title ??
      (c.ulm_card_script_title as string | undefined);
    if (!title) throw new Error("Please define a title");

    const icon =
      config.icon ??
      (c.ulm_card_script_icon as string | undefined) ??
      (c._card_script_icon as string | undefined) ??
      "mdi:script-text";

    // Accept legacy tap_action.service_data.entity_id
    const tap = c.tap_action as
      | { service_data?: Record<string, unknown>; service?: string }
      | undefined;
    const fromTap =
      typeof tap?.service_data?.entity_id === "string"
        ? tap.service_data.entity_id
        : undefined;

    const entity =
      config.entity ||
      (c.ulm_card_script_entity as string | undefined) ||
      fromTap;

    this._config = {
      ...config,
      entity,
      name: title,
      icon,
      service_data:
        config.service_data ??
        (c.tap_action_service_data as UlmScriptCardConfig["service_data"]) ??
        tap?.service_data,
      type: "custom:ulm-script-card",
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
    const rgb = resolveThemeRgb(this, "blue");
    // Docs look: solid blue icon on tinted circle (YAML used 0.7; prefer solid)
    const iconStyle = {
      color: `rgba(${rgb}, 1)`,
      backgroundColor: `rgba(${rgb}, 0.2)`,
    };

    return html`
      <ha-card class="ulm-card ulm-script" @click=${this._run}>
        <div class="row">
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${this._config.icon || "mdi:script-text"}></ha-icon>
          </div>
          <div class="label">${this._config.name}</div>
        </div>
      </ha-card>
    `;
  }

  private _run = (ev: Event) => {
    ev.stopPropagation();
    if (!this.hass || !this._config) return;

    const data = parseServiceData(this._config.service_data);
    const entityId =
      this._config.entity ||
      (typeof data.entity_id === "string" ? data.entity_id : undefined);
    if (!entityId) return;

    const { entity_id: _drop, ...rest } = data;
    this.hass.callService("script", "turn_on", {
      entity_id: entityId,
      ...rest,
    });
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-script {
      height: auto;
      cursor: pointer;
    }

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
      pointer-events: none;
    }

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
