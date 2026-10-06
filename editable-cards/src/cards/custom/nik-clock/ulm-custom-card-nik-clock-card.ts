/**
 * Lit port of custom_cards/custom_card_nik_clock/
 * Transparent clock: large HH:MM + locale date; optional switch toggle.
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

export interface UlmCustomNikClockCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-nik-clock-card";
  /** Optional input_boolean / switch toggled on tap when switch_enable */
  switch?: string;
  switch_enable?: boolean;
  /** Locale for date label (defaults to hass.language) */
  language?: string;
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

function asBool(raw: unknown, fallback = false): boolean {
  if (typeof raw === "boolean") return raw;
  if (raw === "true" || raw === "on" || raw === 1) return true;
  if (raw === "false" || raw === "off" || raw === 0) return false;
  return fallback;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

@customElement("ulm-custom-card-nik-clock-card")
export class UlmCustomNikClockCard
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomNikClockCardConfig;
  @state() private _now = new Date();
  private _timer?: ReturnType<typeof setInterval>;

  public static getConfigForm() {
    return {
      schema: [
        booleanField("switch_enable"),
        entityField("switch", ["input_boolean", "switch"], false),
        textField("language"),
      ],
      computeLabel: labels({
        switch_enable: "Enable switch toggle",
        switch: "Switch entity",
        language: "Date locale",
      }),
      computeHelper: helpers({
        switch_enable:
          "Legacy: ulm_custom_card_nik_clock_switch_enable — tap toggles the switch",
        switch: "Legacy: ulm_custom_card_nik_clock_switch",
        language:
          "Legacy: ulm_language — BCP47 locale (default: HA language)",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomNikClockCardConfig> {
    return {
      switch_enable: false,
    };
  }

  public setConfig(config: UlmCustomNikClockCardConfig): void {
    const c = config as UlmCustomNikClockCardConfig & Record<string, unknown>;
    this._config = {
      ...config,
      switch: asStr(pick(c, "switch", "ulm_custom_card_nik_clock_switch")),
      switch_enable: asBool(
        pick(c, "switch_enable", "ulm_custom_card_nik_clock_switch_enable"),
        false,
      ),
      language: asStr(pick(c, "language", "ulm_language")),
      type: "custom:ulm-custom-card-nik-clock-card",
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._now = new Date();
    this._timer = setInterval(() => {
      this._now = new Date();
    }, 60_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer !== undefined) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  public getCardSize(): number {
    return 2;
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

    const time = `${this._now.getHours()}:${pad2(this._now.getMinutes())}`;
    const locale =
      this._config.language || this.hass?.language || undefined;
    const dateLabel = this._now.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const clickable = !!(
      this._config.switch_enable && this._config.switch
    );

    return html`
      <ha-card
        class="ulm-card ulm-nik-clock"
        ?clickable=${clickable}
        @click=${clickable ? this._toggle : undefined}
      >
        <div class="time">${time}</div>
        <div class="date">${dateLabel}</div>
      </ha-card>
    `;
  }

  private _toggle = (ev: Event) => {
    ev.stopPropagation();
    if (!this.hass || !this._config?.switch || !this._config.switch_enable) {
      return;
    }
    const entityId = this._config.switch;
    const domain = entityId.split(".")[0] || "input_boolean";
    this.hass.callService(domain, "toggle", { entity_id: entityId });
  };

  static styles = css`
    ${ulmCardStyles}

    :host {
      height: auto !important;
      align-self: start;
    }

    ha-card.ulm-card.ulm-nik-clock {
      background-color: transparent;
      box-shadow: none;
      height: 100px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: default;
    }

    ha-card.ulm-nik-clock[clickable] {
      cursor: pointer;
    }

    .time {
      font-size: 290%;
      font-weight: bold;
      line-height: 1.1;
      text-align: center;
      color: var(--primary-text-color);
    }

    .date {
      font-size: 110%;
      text-align: center;
      color: var(--primary-text-color);
      margin-top: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-nik-clock-card": UlmCustomNikClockCard;
  }
}
