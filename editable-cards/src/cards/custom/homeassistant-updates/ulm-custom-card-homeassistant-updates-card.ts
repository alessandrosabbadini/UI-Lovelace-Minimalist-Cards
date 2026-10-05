/**
 * Lit port of custom_cards/custom_card_homeassistant_updates/
 * Faithful icon_info_updates header + list_3_items widgets.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmTokens } from "../../../shared/styles";
import type {
  HomeAssistant,
  HassEntity,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface UlmCustomHomeassistantUpdatesCardConfig
  extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-homeassistant-updates-card";
  entity?: string;
  core_entity?: string;
  supervisor_entity?: string;
  os_entity?: string;
  updates_available?: string;
  no_updates_available?: string;
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

function updateAvailable(stateObj?: HassEntity): boolean {
  if (!stateObj) return false;
  const s = stateObj.state;
  return s === "on" || s === "True" || s === "true";
}

@customElement("ulm-custom-card-homeassistant-updates-card")
export class UlmCustomHomeassistantUpdatesCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomHomeassistantUpdatesCardConfig;

  public static getConfigForm() {
    return {
      schema: [
        entityField("entity", "update", false),
        entityField("core_entity", "update", false),
        entityField("supervisor_entity", "update", false),
        entityField("os_entity", "update", false),
        textField("updates_available"),
        textField("no_updates_available"),
      ],
      computeLabel: labels({
        entity: "Main entity (ulm_card_homeassistant_entity)",
        core_entity: "Core update (ulm_card_homeassistant_core)",
        supervisor_entity: "Supervisor (ulm_card_homeassistant_supervisor)",
        os_entity: "OS (ulm_card_homeassistant_os)",
        updates_available: "Title when updates available",
        no_updates_available: "Title when up to date",
      }),
      computeHelper: helpers({
        entity: "Drives icon badge (on / unavailable → party-popper)",
        core_entity: "Shows Core installed → latest in the label",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomHomeassistantUpdatesCardConfig> {
    return {
      entity: "update.demo_update_with_progress",
      core_entity: "update.demo_update_with_progress",
      supervisor_entity: "update.demo_add_on",
      os_entity: "update.demo_no_update",
      updates_available: "Updates available",
      no_updates_available: "Up to date",
    };
  }

  public setConfig(config: UlmCustomHomeassistantUpdatesCardConfig): void {
    const c = config as UlmCustomHomeassistantUpdatesCardConfig &
      Record<string, unknown>;
    const core_entity = asStr(
      pick(c, "core_entity", "ulm_card_homeassistant_core"),
    );
    const entity =
      asStr(pick(c, "entity", "ulm_card_homeassistant_entity")) ||
      core_entity ||
      "";
    this._config = {
      ...config,
      entity,
      core_entity,
      supervisor_entity: asStr(
        pick(c, "supervisor_entity", "ulm_card_homeassistant_supervisor"),
      ),
      os_entity: asStr(pick(c, "os_entity", "ulm_card_homeassistant_os")),
      updates_available:
        asStr(pick(c, "updates_available", "ulm_updates_available")) ||
        "Updates available",
      no_updates_available:
        asStr(pick(c, "no_updates_available", "ulm_no_updates_available")) ||
        "Up to date",
      type: "custom:ulm-custom-card-homeassistant-updates-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto" as const,
      min_rows: 2,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const mainId = this._config.entity || this._config.core_entity || "";
    const main = mainId ? this.hass.states[mainId] : undefined;
    const core = this._entity(this._config.core_entity);
    const supervisor = this._entity(this._config.supervisor_entity);
    const os = this._entity(this._config.os_entity);

    const anyUpdate =
      updateAvailable(core) ||
      updateAvailable(supervisor) ||
      updateAvailable(os);
    const badge =
      !!main && (main.state === "on" || main.state === "unavailable");
    const rgb = resolveThemeRgb(this, "blue");

    // item1 overrides icon to theme 0.9; state "on" → blue (icon_info_updates)
    const iconStyle = badge
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const title = anyUpdate
      ? this._config.updates_available
      : this._config.no_updates_available;
    const lines = this._labelLines(core, supervisor, os);

    return html`
      <ha-card class="ulm-ha-updates">
        <div class="stack">
          <!-- icon_info_updates: grid 'i n' / 'i l' -->
          <div class="header">
            <div class="icon-cell">
              <div class="icon-btn" style=${styleMap(iconStyle)}>
                <ha-icon icon="mdi:home-assistant"></ha-icon>
              </div>
              ${badge
                ? html`<span
                    class="notification"
                    style=${styleMap({
                      backgroundColor: `rgba(${rgb}, 1)`,
                    })}
                  >
                    <ha-icon icon="mdi:party-popper"></ha-icon>
                  </span>`
                : nothing}
            </div>
            <div class="title">${title}</div>
            <div class="subtitle">${lines}</div>
          </div>

          <!-- list_3_items: column-gap 7px -->
          <div class="widgets">
            <button
              class="widget"
              type="button"
              @click=${() =>
                this._openUrl(
                  "https://www.home-assistant.io/latest-release-notes/",
                )}
            >
              <ha-icon icon="mdi:file-document"></ha-icon>
            </button>
            <button
              class="widget"
              type="button"
              @click=${() => this._navigate("/developer-tools/yaml")}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
            <button
              class="widget"
              type="button"
              @click=${() => this._navigate("/config/dashboard")}
            >
              <ha-icon icon="mdi:update"></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _entity(id?: string): HassEntity | undefined {
    if (!id || !this.hass) return undefined;
    return this.hass.states[id];
  }

  private _line(prefix: string, stateObj?: HassEntity): string | null {
    if (!stateObj) return null;
    const installed = stateObj.attributes.installed_version;
    const latest = stateObj.attributes.latest_version;
    if (updateAvailable(stateObj) && installed && latest) {
      return `${prefix}: ${installed} → ${latest}`;
    }
    if (installed) return `${prefix}: ${installed}`;
    return `${prefix}: ${stateObj.state}`;
  }

  private _labelLines(
    core?: HassEntity,
    supervisor?: HassEntity,
    os?: HassEntity,
  ): string {
    if (core && supervisor && os) {
      return [
        this._line("Supervisor", supervisor),
        this._line("Core", core),
        this._line("OS", os),
      ].join("\n");
    }
    const parts = [
      this._line("Supervisor", supervisor),
      this._line("Core", core),
      this._line("OS", os),
    ].filter(Boolean) as string[];
    return parts.length ? parts.join("\n") : "—";
  }

  private _openUrl(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  private _navigate(path: string) {
    history.pushState(null, "", path);
    window.dispatchEvent(
      new CustomEvent("location-changed", {
        bubbles: true,
        composed: true,
        detail: { replace: false },
      }),
    );
  }

  static styles = css`
    ${ulmTokens}

    :host {
      display: block;
      height: auto !important;
      align-self: start;
      box-sizing: border-box;
    }

    ha-card.ulm-ha-updates {
      border-radius: var(--border-radius, 20px);
      box-shadow: var(--box-shadow);
      padding: 12px;
      height: auto;
      background: var(--card-background-color, #fafafa);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /*
     * icon_info_updates styles.grid:
     *   areas 'i n' / 'i l'
     *   columns min-content auto
     *   rows min-content min-content
     * img_cell place-self: center → icon vertically centered on name+label
     */
    .header {
      display: grid;
      grid-template-areas:
        "icon title"
        "icon subtitle";
      grid-template-columns: min-content auto;
      grid-template-rows: min-content min-content;
      column-gap: 0;
      align-items: center;
      /* icon_info_updates card border-radius */
      border-radius: 21px 8px 8px 21px;
    }

    .icon-cell {
      grid-area: icon;
      place-self: center;
      position: relative;
      width: 42px;
      height: 42px;
    }

    .icon-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      box-sizing: border-box;
    }

    .icon-btn ha-icon {
      --mdc-icon-size: 20px;
      color: inherit;
    }

    /* custom_fields.notification — left 28px, top 8px */
    .notification {
      position: absolute;
      left: 28px;
      top: 8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--card-background-color, #fafafa);
      display: grid;
      place-items: center;
      box-sizing: border-box;
      z-index: 1;
      line-height: 0;
      pointer-events: none;
    }

    .notification ha-icon {
      --mdc-icon-size: 10px;
      color: var(--primary-background-color, #fff);
    }

    /* name: align-self end, margin-left 16px, margin-bottom 4px */
    .title {
      grid-area: title;
      align-self: end;
      justify-self: start;
      margin-left: 16px;
      margin-bottom: 4px;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2;
      min-width: 0;
    }

    /* label: align-self start, margin-left 16px, opacity 40% */
    .subtitle {
      grid-area: subtitle;
      align-self: start;
      justify-self: start;
      margin-left: 16px;
      font-weight: bolder;
      font-size: 12px;
      line-height: 1.35;
      text-align: start;
      white-space: pre-line;
      opacity: 0.4;
      min-width: 0;
    }

    /* list_3_items: 1fr 1fr 1fr, column-gap 7px */
    .widgets {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 7px;
      align-items: center;
    }

    /* widget_icon */
    .widget {
      border: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 42px;
      border-radius: 14px;
      display: grid;
      place-items: center;
      cursor: pointer;
      background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
      font: inherit;
      box-sizing: border-box;
    }

    .widget ha-icon {
      --mdc-icon-size: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-homeassistant-updates-card": UlmCustomHomeassistantUpdatesCard;
  }
}
