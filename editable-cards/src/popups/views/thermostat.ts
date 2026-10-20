import { html, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import type { PopupContext } from "../types";
import {
  capitalize,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";

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

export function renderThermostat(
  ctx: PopupContext,
  onEmbedHost?: (el: Element | undefined) => void,
): TemplateResult {
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
      ).map((m) => ({
        id: m,
        icon: HVAC_ICONS[m],
        active: currentHvac === m,
      }));

  return html`<div class="ulm-grid with-buttons">
    <div class="area-header">
      ${renderPopupHeader({
        name: s.attributes.friendly_name || ctx.entity,
        label: capitalize(s.state),
        icon: (s.attributes.icon as string) || "mdi:thermostat",
      })}
    </div>
    <div class="area-body">
      <div class="embed-host" ${ref((el) => onEmbedHost?.(el))}></div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-bar">
        ${modes.map(
          (m) => html`<button
            class="ulm-mode-chip ${m.active ? "active" : ""}"
            title=${m.id}
            @click=${() => {
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
        onPower: () => ctx.call(ctx.domain, "toggle"),
        powerLabel: capitalize(s.state),
      })}
    </div>
  </div>`;
}
