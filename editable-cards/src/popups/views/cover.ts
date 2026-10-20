import { html, type TemplateResult } from "lit";
import type { PopupContext } from "../types";
import {
  capitalize,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
  renderVerticalSlider,
} from "../shared";

export function defaultCoverView(): "main" {
  return "main";
}

export function renderCover(ctx: PopupContext): TemplateResult {
  const s = ctx.stateObj;
  const pos = Number(s.attributes.current_position);
  const value = Number.isFinite(pos) ? Math.round(pos) : s.state === "open" ? 100 : 0;
  const state = s.state;

  const closed = state === "closed" || value === 0;
  const iconColor = closed
    ? "rgba(var(--ulm-color-theme),0.2)"
    : "rgba(var(--ulm-color-blue),1)";
  const iconBg = closed
    ? "rgba(var(--ulm-color-theme),0.05)"
    : "rgba(var(--ulm-color-blue),0.2)";
  const label =
    s.state === "unavailable" || !Number.isFinite(pos) || value === 0
      ? capitalize(state)
      : `${capitalize(state)} • ${value}%`;

  return html`<div class="ulm-grid">
    <div class="area-header">
      ${renderPopupHeader({
        name: s.attributes.friendly_name || ctx.entity,
        label,
        icon: (s.attributes.icon as string) || "mdi:window-shutter",
        iconColor,
        iconBg,
      })}
    </div>
    <div class="area-body">
      ${renderVerticalSlider({
        value,
        flipped: true,
        thumbWidth: 40,
        fill: "rgba(51, 51, 51, 0.9)",
        track: "rgba(51, 51, 51, 0.09)",
        onChange: (v) =>
          ctx.call("cover", "set_cover_position", { position: v }),
      })}
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${renderPopupButton({
          icon: "mdi:arrow-down",
          name: "Close",
          variant:
            state === "closing" || state === "closed" ? "selected" : "default",
          onClick: () => ctx.call("cover", "close_cover"),
        })}
        ${renderPopupButton({
          icon: "mdi:stop",
          name: "Stop",
          onClick: () => ctx.call("cover", "stop_cover"),
        })}
        ${renderPopupButton({
          icon: "mdi:arrow-up",
          name: "Open",
          variant:
            state === "opening" || state === "open" ? "selected" : "default",
          onClick: () => ctx.call("cover", "open_cover"),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: ctx.goBack,
        onPower: () => ctx.call(ctx.domain, "toggle"),
        powerLabel: capitalize(state),
      })}
    </div>
  </div>`;
}
