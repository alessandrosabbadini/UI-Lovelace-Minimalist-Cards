/**
 * Lit port of custom_cards/custom_card_neekster_update/
 * Update status header (icon_info_bg) + optional install/skip controls.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  booleanField,
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomNeeksterUpdateCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-neekster-update-card";
  entity: string;
  name?: string;
  enable_controls?: boolean;
  collapsible?: boolean;
  horizontal?: boolean;
  narrow_buttons?: boolean;
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

function asBool(raw: unknown, fallback: boolean): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === 1) return true;
  if (raw === "false" || raw === 0) return false;
  return fallback;
}

@customElement("ulm-custom-card-neekster-update-card")
export class UlmCustomNeeksterUpdateCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomNeeksterUpdateCardConfig;
  @state() private _holdTimer?: ReturnType<typeof setTimeout>;
  private _holdFired = false;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "update"),
        textField("name"),
        booleanField("enable_controls"),
        booleanField("collapsible"),
        booleanField("horizontal"),
        booleanField("narrow_buttons"),
      ],
      computeLabel: labels({
        entity: "Update entity",
        name: "Name",
        enable_controls: "Show install / skip buttons",
        collapsible: "Hide controls when up to date",
        horizontal: "Controls beside header",
        narrow_buttons: "Narrow control column (horizontal)",
      }),
      computeHelper: helpers({
        enable_controls: "Legacy: ulm_card_neekster_update_enable_controls",
        collapsible: "Legacy: ulm_card_neekster_update_collapsible",
        horizontal: "Legacy: ulm_card_neekster_update_horizontal",
        narrow_buttons: "Legacy: ulm_card_neekster_update_narrow_buttons",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomNeeksterUpdateCardConfig> {
    return {
      entity: "update.home_assistant_core",
      enable_controls: true,
      collapsible: false,
      horizontal: false,
      narrow_buttons: false,
    };
  }

  public setConfig(config: UlmCustomNeeksterUpdateCardConfig): void {
    const c = config as UlmCustomNeeksterUpdateCardConfig &
      Record<string, unknown>;
    const entity = asStr(pick(c, "entity"));
    if (!entity) throw new Error("Please define an entity");
    this._config = {
      ...config,
      entity,
      name: asStr(pick(c, "name")),
      enable_controls: asBool(
        pick(c, "enable_controls", "ulm_card_neekster_update_enable_controls"),
        false,
      ),
      collapsible: asBool(
        pick(c, "collapsible", "ulm_card_neekster_update_collapsible"),
        false,
      ),
      horizontal: asBool(
        pick(c, "horizontal", "ulm_card_neekster_update_horizontal"),
        false,
      ),
      narrow_buttons: asBool(
        pick(
          c,
          "narrow_buttons",
          "ulm_card_neekster_update_narrow_buttons",
        ),
        false,
      ),
      type: "custom:ulm-custom-card-neekster-update-card",
    };
  }

  public getCardSize(): number {
    if (!this._config || !this.hass) return 1;
    if (!this._showControls(this.hass.states[this._config.entity]?.state)) {
      return 1;
    }
    return this._config.horizontal ? 1 : 2;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
      min_rows: 1,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card class="ulm-card ulm-neekster-update">
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const upToDate = stateObj.state === "off";
    const showControls = this._showControls(stateObj.state);
    const name =
      this._config.name ||
      stateObj.attributes.friendly_name ||
      stateObj.entity_id;
    const statusLabel = upToDate ? "Up to Date." : "Update Available!";
    const statusIcon = upToDate ? "mdi:cloud-check" : "mdi:cloud-download";
    const rgbGreen = resolveThemeRgb(this, "green");
    const rgbYellow = resolveThemeRgb(this, "yellow");
    const iconStyle = upToDate
      ? {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: `rgba(${rgbGreen}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
          backgroundColor: `rgba(${rgbYellow}, 0.2)`,
        };
    const stackClass = classMap({
      stack: true,
      horizontal: !!(this._config.horizontal && showControls),
      narrow: !!this._config.narrow_buttons,
    });
    const gap =
      this._config.collapsible && upToDate ? "0px" : "12px";

    return html`
      <ha-card
        class="ulm-card ulm-neekster-update"
        style=${styleMap({ "--stack-gap": gap })}
        @click=${this._moreInfo}
      >
        <div class=${stackClass}>
          <div class="row header">
            <button class="icon-btn" type="button" style=${styleMap(iconStyle)}>
              <ha-icon .icon=${statusIcon}></ha-icon>
            </button>
            <div class="info-btn">
              <div class="name">${name}</div>
              <div class="label status">${statusLabel}</div>
            </div>
          </div>

          ${showControls
            ? html`
                <div class="controls" @click=${(ev: Event) => ev.stopPropagation()}>
                  <button
                    class="widget-btn"
                    type="button"
                    aria-label="Install update"
                    @click=${() => this._install()}
                  >
                    <ha-icon icon="mdi:package-down"></ha-icon>
                  </button>
                  <button
                    class="widget-btn"
                    type="button"
                    aria-label="Skip update (hold to clear skipped)"
                    @pointerdown=${() => this._startHoldClear()}
                    @pointerup=${() => this._cancelHold()}
                    @pointerleave=${() => this._cancelHold()}
                    @click=${() => this._skip()}
                  >
                    <ha-icon icon="mdi:cancel"></ha-icon>
                  </button>
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _showControls(state: string | undefined): boolean {
    if (!this._config?.enable_controls) return false;
    if (this._config.collapsible && state !== "on") return false;
    return true;
  }

  private _install() {
    if (!this.hass || !this._config) return;
    this.hass.callService("update", "install", {
      entity_id: this._config.entity,
    });
  }

  private _skip() {
    if (this._holdFired) {
      this._holdFired = false;
      return;
    }
    if (!this.hass || !this._config) return;
    this.hass.callService("update", "skip", {
      entity_id: this._config.entity,
    });
  }

  private _startHoldClear() {
    this._cancelHold();
    this._holdFired = false;
    this._holdTimer = setTimeout(() => {
      this._holdTimer = undefined;
      this._holdFired = true;
      if (!this.hass || !this._config) return;
      this.hass.callService("update", "clear_skipped", {
        entity_id: this._config.entity,
      });
    }, 600);
  }

  private _cancelHold() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  }

  private _moreInfo = (ev: Event) => {
    ev.stopPropagation();
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId: this._config.entity },
      }),
    );
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cancelHold();
  }

  static styles = css`
    ${ulmCardStyles}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-neekster-update {
      height: auto !important;
      cursor: pointer;
      padding: 12px;
    }

    ha-card.ulm-neekster-update > .stack {
      flex: none;
      gap: var(--stack-gap, 12px);
    }

    .stack.horizontal {
      flex-direction: row;
      align-items: center;
    }

    .stack.horizontal.narrow .controls {
      flex: 1;
    }

    .stack.horizontal:not(.narrow) .row {
      flex: 1;
      min-width: 0;
    }

    .stack.horizontal.narrow .row {
      flex: 2;
      min-width: 0;
    }

    .header .label.status {
      opacity: 1;
      filter: none;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }

    .stack.horizontal .controls {
      min-width: 0;
    }

    .row.header {
      padding: 0;
      background: none;
      box-shadow: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-neekster-update-card": UlmCustomNeeksterUpdateCard;
  }
}
