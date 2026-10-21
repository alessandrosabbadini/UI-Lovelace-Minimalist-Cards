import { html, type TemplateResult } from "lit";
import type { PopupContext } from "../types";
import {
  capitalize,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";
import "../ulm-vacuum-embed";

function localize(
  ctx: PopupContext,
  key: string,
  fallback: string,
): string {
  const loc = (
    ctx.hass as { localize?: (k: string) => string }
  ).localize;
  if (typeof loc !== "function") return fallback;
  const v = loc(key);
  return v && v !== key ? v : fallback;
}

/**
 * Minimalist popup chrome + HA vacuum animation, centered like
 * legacy vacuum-card (no camera): header → anim → name → toolbar → footer.
 */
export function defaultVacuumView(): "main" {
  return "main";
}

export function renderVacuum(ctx: PopupContext): TemplateResult {
  const s = ctx.stateObj;
  const name = s.attributes.friendly_name || ctx.entity;
  const label =
    ctx.hass.formatEntityState?.(s) || capitalize(String(s.state));

  return html`<div class="ulm-grid vacuum-popup">
    <div class="area-header">
      ${renderPopupHeader({
        name,
        label,
        icon: (s.attributes.icon as string) || "mdi:robot-vacuum",
      })}
    </div>
    <div class="area-body">
      <div class="vacuum-center">
        <ulm-vacuum-embed
          .hass=${ctx.hass}
          .entity=${ctx.entity}
        ></ulm-vacuum-embed>
        <div class="vacuum-caption">
          <div class="vacuum-caption-name">${name}</div>
          <div class="vacuum-caption-label">${label}</div>
        </div>
        <div class="vacuum-divider"></div>
        <div class="vacuum-actions">
          <button
            type="button"
            class="vacuum-tool"
            title=${localize(ctx, "ui.card.vacuum.actions.start", "Start")}
            @click=${() => ctx.call("vacuum", "start")}
          >
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
          <button
            type="button"
            class="vacuum-tool"
            title=${localize(ctx, "ui.card.vacuum.actions.locate", "Locate")}
            @click=${() => ctx.call("vacuum", "locate")}
          >
            <ha-icon icon="mdi:map-marker"></ha-icon>
          </button>
          <button
            type="button"
            class="vacuum-tool"
            title=${localize(
              ctx,
              "ui.card.vacuum.actions.return_to_base",
              "Dock",
            )}
            @click=${() => ctx.call("vacuum", "return_to_base")}
          >
            <ha-icon icon="mdi:home-map-marker"></ha-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: ctx.goBack,
        backLabel: localize(ctx, "ui.common.back", "Back"),
        onPower: () => ctx.call("homeassistant", "toggle"),
        powerLabel: label,
      })}
    </div>
  </div>`;
}
