/**
 * Lit port (useful subset) of custom_cards/custom_card_haven_washer/
 * Power header (blue when on) + optional job phase icons + native progress bar
 * + optional start/pause/stop via domain.service strings.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
  labels,
  textField,
} from "../../../shared/config-form";
import { ulmCardStyles } from "../../../shared/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "../../../types";

export interface WasherPhase {
  name?: string;
  icon?: string;
}

export interface UlmCustomHavenWasherCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-haven-washer-card";
  /** Power entity (required) — also ulm_custom_card_washer_power */
  power_entity: string;
  name?: string;
  icon?: string;
  machine_state?: string;
  job_state?: string;
  job_progress?: string;
  /** Map of up to 5 phases: { state1: { name, icon }, ... } */
  job_states?: Record<string, WasherPhase> | string;
  label_idle?: string;
  label_running?: string;
  machine_stop_state?: string;
  /** Optional "domain.service" strings */
  start_service?: string;
  pause_service?: string;
  stop_service?: string;
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

function parseJobStates(
  raw: unknown,
): Record<string, WasherPhase> | undefined {
  if (!raw) return undefined;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return parsed as Record<string, WasherPhase>;
      }
    } catch {
      return undefined;
    }
    return undefined;
  }
  if (typeof raw === "object") return raw as Record<string, WasherPhase>;
  return undefined;
}

@customElement("ulm-custom-card-haven-washer-card")
export class UlmCustomHavenWasherCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomHavenWasherCardConfig;
  @state() private _phases: WasherPhase[] = [];

  public static getConfigForm() {
    return {
      schema: [
        entityField("power_entity", ["switch", "input_boolean"]),
        textField("name"),
        iconField("icon"),
        entityField("machine_state", undefined, false),
        entityField("job_state", undefined, false),
        entityField("job_progress", ["sensor", "number"], false),
        textField("job_states"),
        textField("label_idle"),
        textField("label_running"),
        textField("machine_stop_state"),
        textField("start_service"),
        textField("pause_service"),
        textField("stop_service"),
      ],
      computeLabel: labels({
        power_entity: "Power (ulm_custom_card_washer_power)",
        name: "Name",
        icon: "Icon",
        machine_state: "Machine state entity",
        job_state: "Job / phase state entity",
        job_progress: "Progress entity (%)",
        job_states: "Phases JSON ({state1:{name,icon},...})",
        label_idle: "Idle label",
        label_running: "Running label",
        machine_stop_state: "Stop state value (default stop)",
        start_service: "Start service (domain.service)",
        pause_service: "Pause service",
        stop_service: "Stop service",
      }),
      computeHelper: helpers({
        job_states:
          'e.g. {"state1":{"name":"wash","icon":"mdi:washing-machine"}}',
        start_service: "Called with entity_id = power_entity when set",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomHavenWasherCardConfig> {
    return {
      power_entity: "switch.decorative_lights",
      name: "Washer",
      icon: "mdi:washing-machine",
      machine_state: "sensor.demo",
      job_progress: "sensor.power_consumption",
      job_states: JSON.stringify({
        state1: { name: "wash", icon: "mdi:waves" },
        state2: { name: "rinse", icon: "mdi:water" },
        state3: { name: "spin", icon: "mdi:rotate-right" },
      }),
    };
  }

  public setConfig(config: UlmCustomHavenWasherCardConfig): void {
    const c = config as UlmCustomHavenWasherCardConfig &
      Record<string, unknown>;
    const power_entity = asStr(
      pick(c, "power_entity", "ulm_custom_card_washer_power", "entity"),
    );
    if (!power_entity) throw new Error("Please define power_entity");

    const job_states = parseJobStates(
      pick(c, "job_states", "ulm_custom_card_washer_job_states"),
    );
    this._phases = [];
    if (job_states) {
      for (let i = 1; i <= 5; i++) {
        const phase = job_states[`state${i}`];
        if (phase?.name && phase?.icon) this._phases.push(phase);
      }
    }

    this._config = {
      ...config,
      power_entity,
      name: asStr(pick(c, "name")),
      icon: asStr(pick(c, "icon")),
      machine_state: asStr(
        pick(c, "machine_state", "ulm_custom_card_washer_machine_state"),
      ),
      job_state: asStr(
        pick(c, "job_state", "ulm_custom_card_washer_job_state"),
      ),
      job_progress: asStr(
        pick(c, "job_progress", "ulm_custom_card_washer_job_progress"),
      ),
      job_states,
      label_idle: asStr(
        pick(c, "label_idle", "ulm_custom_card_washer_label_idle"),
      ),
      label_running: asStr(
        pick(c, "label_running", "ulm_custom_card_washer_label_running"),
      ),
      machine_stop_state:
        asStr(
          pick(
            c,
            "machine_stop_state",
            "ulm_custom_card_washer_machine_stop_state",
          ),
        ) || "stop",
      start_service: asStr(pick(c, "start_service")),
      pause_service: asStr(pick(c, "pause_service")),
      stop_service: asStr(pick(c, "stop_service")),
      type: "custom:ulm-custom-card-haven-washer-card",
    };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    return {
      columns: 6,
      min_columns: 3,
      max_columns: 12,
      rows: "auto" as const,
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const power = this.hass.states[this._config.power_entity];
    if (!power) {
      return html`<ha-card class="ulm-card ulm-haven-washer"
        ><div class="warning">
          Entity not found: ${this._config.power_entity}
        </div></ha-card
      >`;
    }

    const on = power.state === "on";
    const rgb = resolveThemeRgb(this, "blue");
    const iconStyle = on
      ? {
          color: `rgba(${rgb}, 1)`,
          backgroundColor: `rgba(${rgb}, 0.2)`,
        }
      : {
          color: "rgba(var(--color-theme, 51, 51, 51), 0.9)",
          backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
        };

    const name =
      this._config.name ||
      power.attributes.friendly_name ||
      power.entity_id;
    const icon =
      this._config.icon ||
      (power.attributes.icon as string | undefined) ||
      "mdi:washing-machine";
    const label = this._label(on);

    const currentJob = this._config.job_state
      ? this.hass.states[this._config.job_state]?.state
      : undefined;

    const progress = this._progressPct();
    const hasControls =
      on &&
      (!!this._config.start_service ||
        !!this._config.pause_service ||
        !!this._config.stop_service);

    return html`
      <ha-card
        class=${classMap({
          "ulm-card": true,
          "ulm-haven-washer": true,
          on,
        })}
      >
        <button
          class="header"
          @click=${() => this._moreInfo(this._config!.power_entity)}
        >
          <div class="icon-btn" style=${styleMap(iconStyle)}>
            <ha-icon .icon=${icon}></ha-icon>
          </div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="label">${label}</div>
          </div>
        </button>

        ${on && this._phases.length
          ? html`<div class="phases">
              ${this._phases.map((p) => {
                const active =
                  currentJob != null &&
                  p.name != null &&
                  String(currentJob).toLowerCase() ===
                    String(p.name).toLowerCase();
                return html`
                  <div
                    class=${classMap({ phase: true, active })}
                    title=${p.name || ""}
                  >
                    <ha-icon .icon=${p.icon || "mdi:circle"}></ha-icon>
                  </div>
                `;
              })}
            </div>`
          : nothing}

        ${on && progress != null
          ? html`<div class="progress-wrap">
              <div
                class="progress-fill"
                style=${styleMap({
                  width: `${progress}%`,
                  background: `rgba(${rgb}, 0.35)`,
                })}
              ></div>
              <span class="progress-label">${Math.round(progress)}%</span>
            </div>`
          : nothing}

        ${hasControls
          ? html`<div class="controls">
              ${this._config.start_service
                ? html`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config!.start_service!)}
                  >
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>`
                : nothing}
              ${this._config.pause_service
                ? html`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config!.pause_service!)}
                  >
                    <ha-icon icon="mdi:pause"></ha-icon>
                  </button>`
                : nothing}
              ${this._config.stop_service
                ? html`<button
                    class="ctrl"
                    @click=${() => this._runService(this._config!.stop_service!)}
                  >
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>`
                : nothing}
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _label(on: boolean): string {
    const cfg = this._config!;
    if (!on) return cfg.label_idle || "idle";

    const stop = cfg.machine_stop_state || "stop";
    if (cfg.machine_state && this.hass) {
      const ms = this.hass.states[cfg.machine_state];
      if (ms && ms.state !== stop) {
        return cfg.label_running || "run";
      }
    }
    if (cfg.job_state && this.hass) {
      const js = this.hass.states[cfg.job_state];
      if (js?.state) return String(js.state);
    }
    return cfg.label_idle || "idle";
  }

  private _progressPct(): number | null {
    const id = this._config?.job_progress;
    if (!id || !this.hass) return null;
    const st = this.hass.states[id];
    if (!st) return null;
    const n = Number.parseFloat(st.state);
    if (!Number.isFinite(n)) return null;
    return Math.max(0, Math.min(100, n));
  }

  private _runService(spec: string) {
    if (!this.hass || !this._config) return;
    const [domain, svc] = spec.includes(".")
      ? spec.split(".", 2)
      : ["homeassistant", spec];
    this.hass.callService(domain, svc, {
      entity_id: this._config.power_entity,
    });
  }

  private _moreInfo(entityId: string) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  static styles = [
    ulmCardStyles,
    css`
      :host {
        display: block;
        height: auto !important;
        align-self: start;
      }

      ha-card.ulm-haven-washer {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }

      .header {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: inherit;
        text-align: left;
        width: 100%;
      }

      .icon-btn {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }

      .icon-btn ha-icon {
        --mdc-icon-size: 20px;
      }

      .info {
        margin-left: 12px;
        min-width: 0;
      }

      .name {
        font-weight: bold;
        font-size: 14px;
      }

      .label {
        font-weight: bold;
        font-size: 12px;
        filter: opacity(40%);
      }

      .phases {
        display: flex;
        gap: 7px;
        justify-content: center;
        padding: 8px;
        border-radius: var(--border-radius, 14px);
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
      }

      .phase {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        opacity: 0.45;
      }

      .phase.active {
        opacity: 1;
        background: white;
        color: black;
        transform: scale(1.08);
      }

      .phase ha-icon {
        --mdc-icon-size: 20px;
      }

      .progress-wrap {
        position: relative;
        height: 28px;
        border-radius: 14px;
        background: rgba(var(--color-theme, 51, 51, 51), 0.12);
        overflow: hidden;
      }

      .progress-fill {
        position: absolute;
        inset: 0 auto 0 0;
        border-radius: 14px;
      }

      .progress-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        z-index: 1;
      }

      .controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(42px, 1fr));
        gap: 8px;
      }

      .ctrl {
        height: 42px;
        border: none;
        border-radius: 14px;
        background: rgba(var(--color-theme, 51, 51, 51), 0.05);
        cursor: pointer;
        color: inherit;
        display: grid;
        place-items: center;
      }

      .ctrl ha-icon {
        --mdc-icon-size: 22px;
      }
    `,
  ];
}
