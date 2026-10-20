import { html, type TemplateResult } from "lit";
import type { PopupContext } from "../types";
import {
  capitalize,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";
import "../ulm-thermo-embed";

/** Order + icons from legacy popup_thermostat_temperature.yaml */
const HVAC_ORDER = [
  "auto",
  "heat",
  "cool",
  "dry",
  "fan_only",
  "heat_cool",
] as const;
const HVAC_ICONS: Record<string, string> = {
  auto: "mdi:autorenew",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  dry: "mdi:water",
  heat_cool: "mdi:sun-snowflake",
  fan_only: "mdi:fan",
};

const PRESET_ORDER = [
  "none",
  "away",
  "comfort",
  "home",
  "sleep",
  "activity",
] as const;
const PRESET_ICONS: Record<string, string> = {
  none: "mdi:toggle-switch-off",
  away: "mdi:home-switch-outline",
  comfort: "mdi:car-seat-cooler",
  home: "mdi:home",
  sleep: "mdi:sleep",
  activity: "mdi:ticket",
};

export function defaultThermostatView(): "main" {
  return "main";
}

function localize(
  ctx: PopupContext,
  key: string,
  fallback: string,
): string {
  const loc = (
    ctx.hass as { localize?: (k: string) => string }
  ).localize;
  if (typeof loc === "function") {
    const v = loc(key);
    if (v && v !== key) return v;
  }
  return fallback;
}

/**
 * Port of legacy popup_thermostat_temperature.yaml:
 * - header (popup_header)
 * - content1: built-in HA `type: thermostat` card (+ card_mod via ulm-thermo-embed)
 * - buttons: HVAC / preset mode chips
 * - footer: back + power
 *
 * The dial is NOT custom — it is Home Assistant’s thermostat card
 * (ha-control-circular-slider). No external libraries.
 */
export function renderThermostat(ctx: PopupContext): TemplateResult {
  const s = ctx.stateObj;
  const attrs = s.attributes;
  const usePreset = !!ctx.opts.preset_mode;
  const presetModes = Array.isArray(attrs.preset_modes)
    ? (attrs.preset_modes as string[])
    : [];
  const hvacModes = Array.isArray(attrs.hvac_modes)
    ? (attrs.hvac_modes as string[])
    : [];
  const currentPreset = String(attrs.preset_mode || "");
  const currentHvac = s.state;

  const label = capitalize(s.state);

  const modes = usePreset
    ? PRESET_ORDER.filter((m) =>
        presetModes.some((p) => p.toLowerCase() === m),
      ).map((m) => {
        const real =
          presetModes.find((p) => p.toLowerCase() === m) || m;
        return {
          id: real,
          icon: PRESET_ICONS[m],
          active: currentPreset.toLowerCase() === m,
        };
      })
    : HVAC_ORDER.filter((m) =>
        hvacModes.some((h) => h.toLowerCase() === m),
      ).map((m) => {
        const real =
          hvacModes.find((h) => h.toLowerCase() === m) || m;
        return {
          id: real,
          icon: HVAC_ICONS[m],
          active: currentHvac.toLowerCase() === m,
        };
      });

  return html`<div class="ulm-grid with-buttons thermo-popup">
    <div class="area-header">
      ${renderPopupHeader({
        name: s.attributes.friendly_name || ctx.entity,
        label,
        icon: (s.attributes.icon as string) || "mdi:thermostat",
      })}
    </div>
    <div class="area-body">
      <ulm-thermo-embed
        .hass=${ctx.hass}
        .entity=${ctx.entity}
      ></ulm-thermo-embed>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-bar">
        ${modes.map(
          (m) => html`<button
            type="button"
            class="ulm-mode-chip ${m.active ? "active" : ""}"
            title=${m.id}
            @click=${(ev: Event) => {
              // Instant dial feedback (demo climate keeps hvac_action=cooling)
              const root = (ev.currentTarget as HTMLElement).closest(
                ".thermo-popup",
              );
              const embed = root?.querySelector(
                "ulm-thermo-embed",
              ) as { setHvacMode?: (mode: string) => void } | null;
              if (!usePreset) embed?.setHvacMode?.(m.id);
              if (usePreset) {
                ctx.call("climate", "set_preset_mode", { preset_mode: m.id });
              } else {
                ctx.call("climate", "set_hvac_mode", { hvac_mode: m.id });
              }
            }}
          >
            <ha-icon .icon=${m.icon}></ha-icon>
          </button>`,
        )}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: ctx.goBack,
        backLabel: localize(ctx, "ui.common.back", "Back"),
        onPower: () => ctx.call("homeassistant", "toggle"),
        powerLabel: localize(ctx, "ui.common.toggle", "Toggle"),
      })}
    </div>
  </div>`;
}
