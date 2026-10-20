import { html, nothing, type TemplateResult } from "lit";
import { ref } from "lit/directives/ref.js";
import type { PopupContext } from "../types";
import {
  capitalize,
  renderPopupFooter,
  renderPopupHeader,
} from "../shared";

export function defaultVacuumView(): "main" {
  return "main";
}

export function renderVacuum(
  ctx: PopupContext,
  onEmbedHost?: (el: Element | undefined) => void,
): TemplateResult {
  const s = ctx.stateObj;
  const cam = ctx.opts.camera;
  const camState = cam ? ctx.hass.states[cam] : undefined;
  let camUrl: string | undefined;
  if (cam && ctx.hass.hassUrl) {
    const pic = camState?.attributes.entity_picture as string | undefined;
    camUrl = pic
      ? ctx.hass.hassUrl(pic)
      : ctx.hass.hassUrl(`/api/camera_proxy/${cam}?t=${Date.now()}`);
  }

  return html`<div class="ulm-grid">
    <div class="area-header">
      ${renderPopupHeader({
        name: s.attributes.friendly_name || ctx.entity,
        label: capitalize(s.state),
        icon: (s.attributes.icon as string) || "mdi:robot-vacuum",
      })}
    </div>
    <div class="area-body">
      <div
        class="embed-host vacuum"
        ${ref((el) => onEmbedHost?.(el))}
      ></div>
      <div class="vacuum-fallback-ui embed-host vacuum">
        ${camUrl
          ? html`<img
              src=${camUrl}
              alt="Vacuum map"
              style="width:100%;border-radius:var(--border-radius,20px)"
            />`
          : nothing}
        <div class="ulm-mode-row" style="margin-top:12px">
          <button class="media-chip" @click=${() => ctx.call("vacuum", "start")}>
            <ha-icon icon="mdi:play"></ha-icon> Start
          </button>
          <button class="media-chip" @click=${() => ctx.call("vacuum", "pause")}>
            <ha-icon icon="mdi:pause"></ha-icon> Pause
          </button>
          <button
            class="media-chip"
            @click=${() => ctx.call("vacuum", "return_to_base")}
          >
            <ha-icon icon="mdi:home-map-marker"></ha-icon> Dock
          </button>
          <button class="media-chip" @click=${() => ctx.call("vacuum", "locate")}>
            <ha-icon icon="mdi:map-marker"></ha-icon> Locate
          </button>
        </div>
      </div>
    </div>
    <div class="area-buttons"></div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: ctx.goBack,
        onPower: () => ctx.call(ctx.domain, "toggle"),
        powerLabel: capitalize(s.state),
      })}
    </div>
  </div>`;
}
