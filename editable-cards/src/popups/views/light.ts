import { html, nothing, type TemplateResult } from "lit";
import type { HassEntity } from "../../types";
import type { LightView, PopupContext } from "../types";
import {
  brightnessPct,
  capitalize,
  renderColorWheel,
  renderListRow,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
  renderVerticalSlider,
} from "../shared";

function modes(stateObj: HassEntity): string[] {
  const m = stateObj.attributes.supported_color_modes;
  return Array.isArray(m) ? (m as string[]) : [];
}
function hasBrightness(s: HassEntity) {
  return modes(s).some((m) =>
    ["brightness", "hs", "color_temp", "rgb", "rgbw", "rgbww", "xy"].includes(m),
  );
}
function hasColorTemp(s: HassEntity) {
  return modes(s).some((m) => m === "color_temp" || m === "color_temp_kelvin");
}
function hasColor(s: HassEntity) {
  return modes(s).some((m) =>
    ["hs", "xy", "rgb", "rgbw", "rgbww"].includes(m),
  );
}
function effects(s: HassEntity): string[] {
  const list = s.attributes.effect_list;
  return Array.isArray(list) ? (list as string[]) : [];
}

export function defaultLightView(_s: HassEntity): LightView {
  return "brightness";
}

export function renderLight(ctx: PopupContext): TemplateResult {
  const view = (ctx.view === "main" ? "brightness" : ctx.view) as LightView;
  if (view === "effects") return renderEffectsView(ctx);
  if (view === "palette") return renderPaletteView(ctx);
  if (view === "color") return renderColorView(ctx);
  if (view === "color_temp") return renderColorTempView(ctx);
  return renderBrightnessView(ctx);
}

function lightHeader(ctx: PopupContext) {
  const s = ctx.stateObj;
  const on = s.state === "on";
  const pct = brightnessPct(s.attributes.brightness);
  const rgb = s.attributes.rgb_color as [number, number, number] | undefined;
  const iconColor = on
    ? rgb
      ? `rgba(${rgb.join(",")},1)`
      : "rgba(var(--ulm-color-yellow),1)"
    : "var(--color-theme)";
  const iconBg = on
    ? rgb
      ? `rgba(${rgb.join(",")},0.2)`
      : "rgba(var(--ulm-color-yellow),0.2)"
    : "var(--card-background-color)";
  const label =
    on && pct != null
      ? `${capitalize(s.state)} • ${pct}%`
      : capitalize(s.state);
  return renderPopupHeader({
    name: s.attributes.friendly_name || ctx.entity,
    label,
    icon: (s.attributes.icon as string) || "mdi:lightbulb",
    iconColor,
    iconBg,
  });
}

function lightFooter(ctx: PopupContext, showMore: boolean) {
  return renderPopupFooter({
    onBack: ctx.goBack,
    onPower: () => ctx.call("light", "toggle"),
    powerLabel: capitalize(ctx.stateObj.state),
    extra: showMore
      ? renderPopupButton({
          icon: "mdi:dots-horizontal",
          name: "More",
          onClick: () =>
            ctx.setView(effects(ctx.stateObj).length ? "effects" : "palette"),
        })
      : nothing,
  });
}

function mobileModeButtons(ctx: PopupContext, active: LightView) {
  const s = ctx.stateObj;
  const buttons: TemplateResult[] = [];
  if (hasBrightness(s)) {
    buttons.push(
      renderPopupButton({
        icon: "mdi:lightbulb-on",
        name: "Bright",
        variant: active === "brightness" ? "selected" : "default",
        onClick: () => ctx.setView("brightness"),
      }),
    );
  }
  if (hasColorTemp(s)) {
    buttons.push(
      renderPopupButton({
        icon: "mdi:sun-thermometer-outline",
        name: "Temp",
        variant: active === "color_temp" ? "selected" : "default",
        onClick: () => ctx.setView("color_temp"),
      }),
    );
  }
  if (hasColor(s)) {
    buttons.push(
      renderPopupButton({
        icon: "mdi:palette",
        name: "Color",
        variant: active === "color" ? "selected" : "default",
        onClick: () => ctx.setView("color"),
      }),
    );
  }
  return html`<div class="ulm-mode-row">${buttons}</div>`;
}

/** Concrete rgba so the fill stays visible even if theme tokens are missing. */
function sliderColors(s: HassEntity) {
  const rgb = s.attributes.rgb_color as [number, number, number] | undefined;
  const on = s.state === "on";
  if (s.state === "unavailable") {
    return { fill: "rgba(187, 187, 187, 1)", track: "rgba(187, 187, 187, 0.2)" };
  }
  if (!on) {
    return { fill: "rgba(51, 51, 51, 0.9)", track: "rgba(51, 51, 51, 0.09)" };
  }
  if (rgb) {
    return {
      fill: `rgba(${rgb.join(",")}, 1)`,
      track: `rgba(${rgb.join(",")}, 0.2)`,
    };
  }
  return { fill: "rgba(255, 145, 1, 1)", track: "rgba(255, 145, 1, 0.2)" };
}

function renderBrightnessView(ctx: PopupContext): TemplateResult {
  const s = ctx.stateObj;
  const pct = brightnessPct(s.attributes.brightness) ?? (s.state === "on" ? 100 : 0);
  const colors = sliderColors(s);
  const multi = hasColorTemp(s) || hasColor(s);
  const gridClass = multi ? "ulm-grid cols-3" : "ulm-grid";
  const showMore = effects(s).length > 0 || !!ctx.opts.color_palette;
  // Lit slider (not my-slider-v2): Lit re-render clears imperative embeds every hass update.
  const brightSlider = renderVerticalSlider({
    value: Math.max(1, pct),
    min: 1,
    max: 100,
    fill: colors.fill,
    track: colors.track,
    onChange: (v) => ctx.call("light", "turn_on", { brightness_pct: v }),
  });

  // Desktop: brightness + optional temp + color columns (like original)
  return html`<div class=${gridClass}>
    <div class="area-header">${lightHeader(ctx)}</div>
    ${multi
      ? html`
          <div class="area-c1">${hasBrightness(s) ? brightSlider : nothing}</div>
          <div class="area-c2">
            ${hasColorTemp(s) ? colorTempSlider(ctx) : nothing}
          </div>
          <div class="area-c3">
            ${hasColor(s) ? colorWheelBlock(ctx) : nothing}
          </div>
        `
      : html`<div class="area-body">
          ${hasBrightness(s) ? brightSlider : nothing}
        </div>`}
    <div class="area-buttons">${mobileModeButtons(ctx, "brightness")}</div>
    <div class="area-footer">${lightFooter(ctx, showMore)}</div>
  </div>`;
}

function colorTempSlider(ctx: PopupContext) {
  const attrs = ctx.stateObj.attributes;
  const minK =
    Number(attrs.min_color_temp_kelvin) ||
    (attrs.min_mireds != null
      ? Math.round(1_000_000 / Number(attrs.min_mireds))
      : 2000);
  const maxK =
    Number(attrs.max_color_temp_kelvin) ||
    (attrs.max_mireds != null
      ? Math.round(1_000_000 / Number(attrs.max_mireds))
      : 6500);
  const kelvin =
    Number(attrs.color_temp_kelvin) ||
    (attrs.color_temp != null
      ? Math.round(1_000_000 / Number(attrs.color_temp))
      : Math.round((minK + maxK) / 2));
  return renderVerticalSlider({
    value: Math.min(maxK, Math.max(minK, kelvin)),
    min: minK,
    max: maxK,
    temperature: true,
    onChange: (v) =>
      ctx.call("light", "turn_on", { color_temp_kelvin: Math.round(v) }),
  });
}

function colorWheelBlock(ctx: PopupContext) {
  const hs = ctx.stateObj.attributes.hs_color as [number, number] | undefined;
  const hue = hs?.[0] ?? 30;
  const sat = hs?.[1] ?? 80;
  return html`<div class="ulm-embed-host" data-ulm-embed="light-color"></div>
    <div class="ulm-embed-fallback">
      ${renderColorWheel({
        hue,
        sat,
        onPick: (h, s) => ctx.call("light", "turn_on", { hs_color: [h, s] }),
      })}
    </div>`;
}

function renderColorTempView(ctx: PopupContext): TemplateResult {
  return html`<div class="ulm-grid">
    <div class="area-header">${lightHeader(ctx)}</div>
    <div class="area-body">${colorTempSlider(ctx)}</div>
    <div class="area-buttons">${mobileModeButtons(ctx, "color_temp")}</div>
    <div class="area-footer">${lightFooter(ctx, false)}</div>
  </div>`;
}

function renderColorView(ctx: PopupContext): TemplateResult {
  return html`<div class="ulm-grid">
    <div class="area-header">${lightHeader(ctx)}</div>
    <div class="area-body">${colorWheelBlock(ctx)}</div>
    <div class="area-buttons">${mobileModeButtons(ctx, "color")}</div>
    <div class="area-footer">${lightFooter(ctx, false)}</div>
  </div>`;
}

function renderEffectsView(ctx: PopupContext): TemplateResult {
  const list = effects(ctx.stateObj);
  const current = String(ctx.stateObj.attributes.effect || "");
  const hasPalette = !!ctx.opts.color_palette;
  return html`<div class="ulm-grid">
    <div class="area-header">${lightHeader(ctx)}</div>
    <div class="area-body">
      <div class="ulm-list">
        ${list.map((fx) =>
          renderListRow({
            label: fx,
            active: fx === current,
            onClick: () => ctx.call("light", "turn_on", { effect: fx }),
          }),
        )}
      </div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${renderPopupButton({
          icon: "mdi:creation",
          name: "Effects",
          variant: "selected",
          onClick: () => ctx.setView("effects"),
        })}
        ${hasPalette
          ? renderPopupButton({
              icon: "mdi:palette-swatch",
              name: "Palette",
              onClick: () => ctx.setView("palette"),
            })
          : nothing}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: () => ctx.setView("brightness"),
        onPower: () => ctx.call("light", "toggle"),
        powerLabel: capitalize(ctx.stateObj.state),
      })}
    </div>
  </div>`;
}

function renderPaletteView(ctx: PopupContext): TemplateResult {
  const entity = ctx.opts.color_palette;
  if (!entity) {
    return html`<div class="ulm-grid"><div class="area-body muted">No palette</div></div>`;
  }
  const sel = ctx.hass.states[entity];
  const options = Array.isArray(sel?.attributes.options)
    ? (sel!.attributes.options as string[])
    : [];
  const domain = entity.split(".")[0];
  return html`<div class="ulm-grid">
    <div class="area-header">${lightHeader(ctx)}</div>
    <div class="area-body">
      <div class="ulm-list">
        ${options.map((opt) =>
          renderListRow({
            label: opt,
            active: sel?.state === opt,
            onClick: () =>
              ctx.call(domain, "select_option", {
                entity_id: entity,
                option: opt,
              }),
          }),
        )}
      </div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${effects(ctx.stateObj).length
          ? renderPopupButton({
              icon: "mdi:creation",
              name: "Effects",
              onClick: () => ctx.setView("effects"),
            })
          : nothing}
        ${renderPopupButton({
          icon: "mdi:palette-swatch",
          name: "Palette",
          variant: "selected",
          onClick: () => ctx.setView("palette"),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: () => ctx.setView("brightness"),
        onPower: () => ctx.call("light", "toggle"),
        powerLabel: capitalize(ctx.stateObj.state),
      })}
    </div>
  </div>`;
}
