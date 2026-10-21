import { css, html, nothing, type TemplateResult } from "lit";
import { ulmTokens } from "../shared/styles";

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function brightnessPct(brightness: unknown): number | undefined {
  return typeof brightness === "number"
    ? Math.round((brightness / 255) * 100)
    : undefined;
}

/** Header matching popup_header / popup_header_light (icon · name · label). */
export function renderPopupHeader(opts: {
  name: string;
  label: string;
  icon?: string;
  iconColor?: string;
  iconBg?: string;
}): TemplateResult {
  return html`<div class="ulm-ph">
    <div
      class="ulm-ph-icon"
      style=${[
        opts.iconColor ? `color:${opts.iconColor}` : "",
        opts.iconBg ? `background:${opts.iconBg}` : "",
      ]
        .filter(Boolean)
        .join(";")}
    >
      <ha-icon .icon=${opts.icon || "mdi:information"}></ha-icon>
    </div>
    <div class="ulm-ph-name">${opts.name}</div>
    <div class="ulm-ph-label">${opts.label}</div>
  </div>`;
}

/** Footer button matching popup_button (circle icon + name). */
export function renderPopupButton(opts: {
  icon: string;
  name: string;
  onClick: () => void;
  variant?: "default" | "back" | "power" | "selected";
  iconColor?: string;
  iconBg?: string;
}): TemplateResult {
  const variant = opts.variant || "default";
  return html`<button
    class="ulm-pb ulm-pb--${variant}"
    @click=${opts.onClick}
    type="button"
  >
    <span
      class="ulm-pb-icon"
      style=${[
        opts.iconColor ? `color:${opts.iconColor}` : "",
        opts.iconBg ? `background:${opts.iconBg}` : "",
      ]
        .filter(Boolean)
        .join(";")}
    >
      <ha-icon .icon=${opts.icon}></ha-icon>
    </span>
    <span class="ulm-pb-name">${opts.name}</span>
  </button>`;
}

export function renderPopupFooter(opts: {
  onBack: () => void;
  backLabel?: string;
  onPower?: () => void;
  powerLabel?: string;
  extra?: TemplateResult | typeof nothing;
}): TemplateResult {
  return html`<div class="ulm-pf">
    ${renderPopupButton({
      icon: "mdi:arrow-left",
      name: opts.backLabel || "Back",
      onClick: opts.onBack,
      variant: "back",
    })}
    ${opts.onPower
      ? renderPopupButton({
          icon: "mdi:power",
          name: opts.powerLabel || "Power",
          onClick: opts.onPower,
          variant: "power",
        })
      : nothing}
    ${opts.extra ?? nothing}
  </div>`;
}

/**
 * Vertical slider matching custom:my-slider-v2 look used in light/cover popups.
 * height 280px, width 100px, white border, white thumb bar.
 */
export function renderVerticalSlider(opts: {
  value: number;
  min?: number;
  max?: number;
  fill?: string;
  track?: string;
  /** temperature mode: gradient track, no fill */
  temperature?: boolean;
  /** my-slider-v2 flipped: high value at top (covers) */
  flipped?: boolean;
  /** thumb width px (light 50, cover 40) */
  thumbWidth?: number;
  height?: string;
  width?: string;
  onChange: (value: number) => void;
  onInput?: (value: number) => void;
}): TemplateResult {
  const min = opts.min ?? 0;
  const max = opts.max ?? 100;
  const rawPct = Math.max(
    0,
    Math.min(100, ((opts.value - min) / (max - min || 1)) * 100),
  );
  const pct = rawPct;
  const trackStyle = opts.temperature
    ? "background: linear-gradient(180deg, #f3db6d, #fff, #c9f2fc)"
    : opts.track
      ? `background:${opts.track}`
      : "";
  const h = opts.height || "280px";
  const w = opts.width || "100px";
  const thumbW = opts.thumbWidth ?? 50;
  // Flipped (covers): high value at top — fill grows downward from top
  const fillStyle = [
    `height:${pct}%`,
    opts.fill ? `background:${opts.fill}` : "",
    opts.flipped ? "top:0;bottom:auto" : "bottom:0;top:auto",
  ]
    .filter(Boolean)
    .join(";");
  const thumbStyle = [
    opts.flipped ? `top:calc(${pct}% - 2px);bottom:auto` : `bottom:calc(${pct}% - 2px);top:auto`,
    `width:${opts.temperature ? 0 : thumbW}px`,
    opts.temperature ? "height:0" : "",
  ]
    .filter(Boolean)
    .join(";");
  // Range input is bottom→top visually after rotate; flip value mapping for covers
  const inputValue = opts.flipped ? max + min - opts.value : opts.value;
  const decode = (v: number) => (opts.flipped ? max + min - v : v);
  return html`<div class="ulm-vslider" style="height:${h};width:${w}">
    <div class="ulm-vslider-track" style="height:${h};width:${w};${trackStyle}">
      ${opts.temperature
        ? nothing
        : html`<div class="ulm-vslider-fill" style=${fillStyle}></div>`}
      <div class="ulm-vslider-thumb" style=${thumbStyle}></div>
      <input
        type="range"
        min=${min}
        max=${max}
        .value=${String(inputValue)}
        @input=${(ev: Event) => {
          const v = decode(Number((ev.target as HTMLInputElement).value));
          opts.onInput?.(v);
        }}
        @change=${(ev: Event) =>
          opts.onChange(decode(Number((ev.target as HTMLInputElement).value)))}
      />
    </div>
  </div>`;
}

export function renderListRow(opts: {
  label: string;
  active?: boolean;
  onClick: () => void;
}): TemplateResult {
  return html`<button
    class="ulm-list-row ${opts.active ? "active" : ""}"
    @click=${opts.onClick}
    type="button"
  >
    <span>${opts.label}</span>
    ${opts.active ? html`<ha-icon icon="mdi:check"></ha-icon>` : nothing}
  </button>`;
}

/** HS color wheel (approximation of light-entity-card wheel). */
export function renderColorWheel(opts: {
  hue: number;
  sat: number;
  onPick: (hue: number, sat: number) => void;
}): TemplateResult {
  const size = 220;
  const r = size / 2;
  // marker position from hs
  const rad = ((opts.hue - 90) * Math.PI) / 180;
  const dist = (opts.sat / 100) * (r - 12);
  const mx = r + Math.cos(rad) * dist;
  const my = r + Math.sin(rad) * dist;

  const onPointer = (ev: PointerEvent) => {
    const el = ev.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = ev.clientX - rect.left - r;
    const y = ev.clientY - rect.top - r;
    const distRaw = Math.sqrt(x * x + y * y);
    const max = r - 12;
    const clamped = Math.min(distRaw, max);
    let hue = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (hue < 0) hue += 360;
    const sat = Math.round((clamped / max) * 100);
    opts.onPick(Math.round(hue) % 360, sat);
  };

  return html`<div
    class="ulm-wheel"
    style="width:${size}px;height:${size}px"
    @pointerdown=${(ev: PointerEvent) => {
      (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
      onPointer(ev);
    }}
    @pointermove=${(ev: PointerEvent) => {
      if ((ev.buttons & 1) === 0) return;
      onPointer(ev);
    }}
  >
    <div class="ulm-wheel-disc"></div>
    <div
      class="ulm-wheel-marker"
      style="left:${mx}px;top:${my}px;background:hsl(${opts.hue},${opts.sat}%,50%)"
    ></div>
  </div>`;
}

export const popupStyles = css`
  ${ulmTokens}

  :host {
    display: contents;
    font: inherit;
    color: var(--primary-text-color);
  }

  /* display:contents can drop :host custom props in some browsers — mirror on .dialog */
  .dialog {
    --ulm-color-theme: var(--color-theme, 51, 51, 51);
    --ulm-color-yellow: var(--color-yellow, 255, 145, 1);
    --ulm-color-blue: var(--color-blue, 61, 90, 254);
    --ulm-color-green: var(--color-green, 1, 200, 82);
    --ulm-color-red: var(--color-red, 245, 68, 54);
    --ulm-color-grey: var(--color-grey, 187, 187, 187);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: grid;
    place-items: center;
    z-index: 10000;
    padding: 0;
    box-sizing: border-box;
  }

  /* browser_mod large + hide_header feel */
  .dialog {
    width: min(1000px, 100vw);
    height: min(100vh, 100dvh);
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--primary-background-color, #fafafa);
    color: var(--primary-text-color);
    border-radius: 0;
    box-shadow: none;
    padding: 2%;
    box-sizing: border-box;
    overflow: hidden;
  }

  @media (min-width: 801px) {
    .dialog {
      width: min(1000px, 96vw);
      height: min(90vh, 900px);
      border-radius: var(--border-radius, 20px);
      padding: 1.5% 2%;
    }
  }

  .dialog-close {
    position: absolute;
    top: 10px;
    right: 12px;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    z-index: 2;
    opacity: 0.55;
  }

  .dialog-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* Generic Minimalist popup grid: header / body / footer */
  .ulm-grid {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-rows: 16vh 56vh 14vh;
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "body"
      "footer";
    column-gap: 24px;
    row-gap: 0;
  }

  /* Thermostat-style: modes strip always visible (also on desktop).
     Use fr (not vh) so rows fit inside the dialog — vh was clipping the footer. */
  .ulm-grid.with-buttons {
    grid-template-rows: 16fr 42fr 14fr 18fr;
    grid-template-areas:
      "header"
      "body"
      "buttons"
      "footer";
    height: 100%;
  }
  .ulm-grid.with-buttons .area-buttons {
    display: grid;
    place-items: center;
    align-content: start;
  }
  .ulm-grid.with-buttons .area-footer {
    margin-top: 8px;
    align-content: start;
  }

  .ulm-grid.cols-2 {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "header header"
      "body side"
      "footer footer";
  }

  /* Media infos: no mobile “buttons” strip (volume is a chip; side slider on desktop) */
  .ulm-grid.media-infos {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "header header"
      "body side"
      "footer footer";
  }
  .ulm-grid.media-volume,
  .ulm-grid.media-sources {
    grid-template-areas:
      "header"
      "body"
      "footer";
  }

  .ulm-grid.cols-3 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "header header header"
      "c1 c2 c3"
      "footer footer footer";
  }

  .ulm-grid.outlet {
    column-gap: 30px;
  }
  .ulm-grid.outlet-stats {
    grid-template-rows: 16vh 12vh 44vh 14vh;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "header header"
      "tiles tiles"
      "graph log"
      "footer footer";
  }
  .ulm-grid.outlet-history {
    grid-template-rows: 16vh 12vh 44vh 14vh 14vh;
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "tiles"
      "log"
      "buttons"
      "footer";
  }
  .ulm-grid.outlet-history .area-buttons {
    display: grid;
  }
  .ulm-grid.outlet-stats .area-buttons {
    display: none;
  }

  .area-header {
    grid-area: header;
    display: grid;
    place-items: center;
    align-content: center;
  }
  .area-body {
    grid-area: body;
    min-height: 0;
    display: grid;
    place-items: center;
    overflow: auto;
  }
  .area-side {
    grid-area: side;
    min-height: 0;
    display: grid;
    place-items: center;
  }
  .area-c1 {
    grid-area: c1;
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .area-c2 {
    grid-area: c2;
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .area-c3 {
    grid-area: c3;
    display: grid;
    place-items: center;
    min-height: 0;
  }
  .area-tiles {
    grid-area: tiles;
    min-height: 0;
  }
  .area-graph {
    grid-area: graph;
    min-height: 0;
    display: grid;
    align-content: stretch;
  }
  .area-graph .ulm-embed-host {
    width: 100%;
    min-height: 220px;
    height: 100%;
    border-radius: var(--border-radius, 20px);
    overflow: hidden;
    background: var(--card-background-color);
  }
  .area-log {
    grid-area: log;
    min-height: 0;
    overflow: auto;
  }
  .area-footer {
    grid-area: footer;
    display: grid;
    align-content: start;
    padding-top: 12px;
  }
  .area-buttons {
    grid-area: buttons;
    display: none;
  }

  @media (max-width: 800px) {
    .ulm-grid,
    .ulm-grid.cols-2,
    .ulm-grid.cols-3 {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 52vh 14vh 14vh;
      grid-template-areas:
        "header"
        "body"
        "buttons"
        "footer";
    }
    .ulm-grid.with-buttons {
      grid-template-rows: 16fr 48fr 14fr 18fr;
    }
    .ulm-grid.media-infos {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 56vh 28vh;
      grid-template-areas:
        "header"
        "body"
        "footer";
    }
    .ulm-grid.media-infos .area-side {
      display: none !important;
    }
    .ulm-grid.media-volume,
    .ulm-grid.media-sources {
      grid-template-rows: 16vh 56vh 14vh;
      grid-template-areas:
        "header"
        "body"
        "footer";
    }
    .ulm-grid.outlet-stats {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 12vh 40vh 14vh 14vh;
      grid-template-areas:
        "header"
        "tiles"
        "graph"
        "buttons"
        "footer";
    }
    .ulm-grid.outlet-stats .area-buttons {
      display: grid;
    }
    .ulm-grid.outlet-stats .area-log {
      display: none !important;
    }
    .ulm-grid.outlet-history {
      grid-template-columns: 1fr;
      grid-template-rows: 16vh 12vh 40vh 14vh 14vh;
      grid-template-areas:
        "header"
        "tiles"
        "log"
        "buttons"
        "footer";
    }
    .ulm-grid.outlet-history .area-log {
      display: grid !important;
    }
    .area-side,
    .area-c2,
    .area-c3 {
      display: none !important;
    }
    .area-buttons {
      display: grid;
      place-items: center;
    }
    .area-c1 {
      grid-area: body;
    }
  }

  /* Header */
  .ulm-ph {
    display: grid;
    justify-items: center;
    gap: 0;
    text-align: center;
  }
  .ulm-ph-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--card-background-color);
    box-shadow: var(--ha-card-box-shadow, var(--box-shadow));
    color: var(--color-theme, inherit);
  }
  .ulm-ph-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .ulm-ph-name {
    margin-top: 6px;
    font-weight: 700;
    font-size: 14px;
  }
  .ulm-ph-label {
    font-weight: 700;
    font-size: 12px;
    opacity: 0.4;
  }

  /* Footer buttons */
  .ulm-pf {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }
  .ulm-pb {
    border: 0;
    background: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    display: grid;
    justify-items: center;
    padding: 12px;
    min-width: 72px;
  }
  .ulm-pb-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--card-background-color);
    box-shadow: var(--ha-card-box-shadow, var(--box-shadow));
    color: var(--primary-color);
  }
  .ulm-pb-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .ulm-pb-name {
    margin-top: 12px;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
  }
  .ulm-pb--back .ulm-pb-icon {
    background: none;
    box-shadow: none;
    border: 1px solid rgba(var(--ulm-color-theme), 0.25);
  }
  .ulm-pb--back .ulm-pb-name {
    text-transform: uppercase;
    color: rgba(var(--ulm-color-theme), 0.5);
    font-size: 12px;
  }
  .ulm-pb--power .ulm-pb-icon {
    background: var(--primary-color);
    color: var(--card-background-color);
    box-shadow: none;
  }
  .ulm-pb--power .ulm-pb-name {
    text-transform: uppercase;
    color: rgba(var(--ulm-color-theme), 0.5);
    font-size: 12px;
  }
  .ulm-pb--selected .ulm-pb-icon {
    background: rgba(var(--ulm-color-blue), 0.2);
    color: rgba(var(--ulm-color-blue), 1);
  }

  /* Thermostat mode strip (YAML: rounded bar, icon-only widget_icon chips) */
  .ulm-mode-bar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 4px;
    width: 50%;
    max-width: 420px;
    margin: 0 auto;
    padding: 4px;
    border-radius: 21px;
    background: rgba(51, 51, 51, 0.1);
    box-sizing: border-box;
  }
  @media (max-width: 800px) {
    .ulm-mode-bar {
      width: 100%;
      max-width: none;
    }
  }
  .ulm-mode-chip {
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    cursor: pointer;
    display: grid;
    place-items: center;
    padding: 0;
    flex: 0 0 auto;
  }
  .ulm-mode-chip.active {
    background: var(--card-background-color);
    box-shadow: var(--ha-card-box-shadow, var(--box-shadow));
    transform: scale(0.95);
  }
  .ulm-mode-chip ha-icon {
    --mdc-icon-size: 20px;
  }

  /* Thermostat dial: fit fully in body (no bottom clip), no drag-scroll */
  .thermo-popup .area-body {
    overflow: hidden;
    overscroll-behavior: none;
    container-type: size;
    align-content: center;
  }

  /* Desktop: gap under dial + a bit more body height for the circle */
  @media (min-width: 801px) {
    .thermo-popup.ulm-grid.with-buttons {
      row-gap: 16px;
      grid-template-rows: 14fr 46fr 14fr 16fr;
    }
    .thermo-popup .area-buttons {
      align-content: center;
    }
  }

  /* Size to body height so the full circle stays visible */
  ulm-thermo-embed {
    display: block;
    width: min(320px, 100%, 100cqh);
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1;
    justify-self: center;
    overflow: hidden;
    touch-action: none;
    overscroll-behavior: none;
  }

  .ulm-list-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    height: 42px;
    width: min(40vh, 100%);
    box-sizing: border-box;
    border: 1px solid rgba(var(--ulm-color-theme), 0.2);
    border-radius: 14px;
    padding: 2px 12px;
    background: transparent;
    box-shadow: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }
  .ulm-list-row span {
    font-size: 14px;
    font-weight: 700;
    text-transform: capitalize;
    color: rgba(var(--ulm-color-theme), 0.5);
  }
  .ulm-list-row.active {
    outline: none;
    background: rgba(var(--ulm-color-blue), 0.1);
  }
  .ulm-list-row.active span {
    color: rgba(var(--ulm-color-blue), 1);
  }

  /* Vertical slider (Minimalist my-slider-v2 look) */
  .ulm-vslider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
    width: 100px;
    flex-shrink: 0;
  }
  .ulm-vslider-track {
    position: relative;
    width: 100px;
    height: 280px;
    border-radius: 14px;
    border: 2px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
    background: rgba(51, 51, 51, 0.09);
    overflow: hidden;
    box-sizing: border-box;
  }
  .ulm-vslider-fill {
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(255, 145, 1, 1);
    pointer-events: none;
    z-index: 1;
  }
  .ulm-vslider-thumb {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 5px;
    background: #fff;
    border-radius: 0 0 10px 10px;
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }
  .ulm-vslider-track input[type="range"] {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 280px;
    height: 100px;
    margin: 0;
    padding: 0;
    transform: translate(-50%, -50%) rotate(-90deg);
    transform-origin: center;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    z-index: 3;
    opacity: 0;
    outline: none;
  }
  .ulm-vslider-track input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 48px;
    height: 48px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .ulm-vslider-track input[type="range"]::-moz-range-thumb {
    width: 48px;
    height: 48px;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .ulm-list {
    display: grid;
    gap: 8px;
    justify-items: center;
    width: 100%;
    max-height: 48vh;
    overflow: auto;
  }

  .ulm-mode-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    width: 100%;
  }

  .ulm-tile-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }
  .ulm-tile {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 0 12px;
    align-items: center;
    background: var(--card-background-color);
    border-radius: var(--border-radius, 20px);
    box-shadow: var(--box-shadow);
    padding: 12px;
    border: 0;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    max-width: 300px;
    width: 100%;
    justify-self: center;
    min-width: 0;
  }
  .ulm-tile.muted-tile {
    cursor: default;
    opacity: 0.7;
  }
  .ulm-tile-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(var(--ulm-color-theme), 0.05);
    color: var(--primary-text-color);
  }
  .ulm-tile-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .ulm-tile-text {
    min-width: 0;
  }
  .ulm-tile-name {
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ulm-tile-label {
    font-size: 12px;
    font-weight: 700;
    opacity: 0.4;
  }
  .outlet-logbook-host {
    width: 100%;
    height: 257px;
    max-height: 40vh;
    overflow: hidden;
  }
  .outlet-mode-row {
    width: 100%;
    justify-content: space-evenly;
  }

  .embed-host,
  .ulm-embed-host {
    width: 100%;
    max-width: 420px;
    min-height: 0;
  }
  .embed-host.wide,
  .ulm-embed-host.wide {
    max-width: 100%;
  }
  /* Vacuum: everything on a centered column (legacy vacuum-card no-camera) */
  .vacuum-popup .area-header,
  .vacuum-popup .area-body,
  .vacuum-popup .area-footer {
    width: 100%;
    display: grid;
    justify-items: center;
    justify-content: center;
  }
  .vacuum-popup .area-body {
    overflow: hidden;
    align-content: center;
    min-height: 0;
  }
  .vacuum-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(320px, 100%);
    margin: 0 auto;
    gap: 10px;
    text-align: center;
    box-sizing: border-box;
  }
  ulm-vacuum-embed {
    display: block;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    flex: 0 0 auto;
  }
  .vacuum-caption {
    display: grid;
    justify-items: center;
    gap: 2px;
    width: 100%;
  }
  .vacuum-caption-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--primary-text-color);
  }
  .vacuum-caption-label {
    font-size: 12px;
    font-weight: 500;
    opacity: 0.45;
  }
  .vacuum-divider {
    width: 100%;
    height: 1px;
    background: rgba(var(--ulm-color-theme, 51, 51, 51), 0.12);
    margin: 4px 0 2px;
  }
  .vacuum-actions {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 28px;
    width: 100%;
    margin: 0;
    padding: 4px 0 0;
  }
  .vacuum-tool {
    width: 40px;
    height: 40px;
    border: 0;
    padding: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-text-color);
    cursor: pointer;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
  }
  .vacuum-tool ha-icon {
    --mdc-icon-size: 22px;
  }
  .vacuum-popup .ulm-pf {
    width: min(320px, 100%);
    margin: 0 auto;
    justify-content: space-evenly;
  }
  .ulm-embed-host[data-ulm-embed="light-bright"],
  .ulm-embed-host[data-ulm-embed="light-temp"],
  .ulm-embed-host[data-ulm-embed="cover-slider"],
  .ulm-embed-host[data-ulm-embed="media-vol"] {
    width: 100px;
    height: 280px;
    display: grid;
    place-items: center;
  }
  .ulm-embed-host[data-ulm-embed="light-bright"] > *,
  .ulm-embed-host[data-ulm-embed="light-temp"] > *,
  .ulm-embed-host[data-ulm-embed="cover-slider"] > * {
    width: 100px !important;
    height: 280px !important;
    display: block;
  }
  .ulm-embed-host[data-ulm-embed="media-vol"] {
    height: 30vh;
    width: calc(30vh / 2.8);
  }
  .ulm-embed-host[data-ulm-embed="light-color"] {
    width: min(260px, 100%);
    min-height: 220px;
  }
  .ulm-embed-host[data-ulm-embed="media-art"] {
    width: 25vh;
    height: 25vh;
    max-width: 220px;
    max-height: 220px;
  }
  .ulm-embed-host[data-ulm-embed="weather-radar"] {
    width: 100%;
    height: 350px;
    max-width: 100%;
    border-radius: 20px;
    overflow: hidden;
  }
  /* Hide Lit fallback only once a real card is mounted into the host */
  .ulm-embed-host.has-card:not(:empty) + .ulm-embed-fallback {
    display: none !important;
  }
  /* Keep fallback visible while host is empty (Lit cleared children mid-update) */
  .ulm-embed-fallback {
    display: grid;
    place-items: center;
  }

  /* Color wheel */
  .ulm-wheel {
    position: relative;
    border-radius: 50%;
    touch-action: none;
    cursor: crosshair;
  }
  .ulm-wheel-disc {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(
      from 90deg,
      hsl(0, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(360, 100%, 50%)
    );
    mask: radial-gradient(circle, transparent 18%, #000 19%);
    -webkit-mask: radial-gradient(circle, transparent 18%, #000 19%);
  }
  .ulm-wheel-marker {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.35);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* Media layout */
  .media-panel {
    width: min(370px, calc(100vw - 60px));
    display: grid;
    gap: 8px;
    justify-items: center;
    padding: 12px 1% 8px;
    border-radius: var(--border-radius, 20px);
    background: var(--card-background-color);
    box-shadow: var(--box-shadow);
    box-sizing: border-box;
  }
  .media-app {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 0 12px;
    align-items: center;
    width: 100%;
    justify-self: stretch;
  }
  .media-app-icon {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid;
    display: grid;
    place-items: center;
    box-sizing: border-box;
  }
  .media-app-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .media-app-name {
    font-weight: 700;
    font-size: 14px;
  }
  .media-app-label {
    font-weight: 700;
    font-size: 12px;
    opacity: 0.4;
  }

  .media-art {
    width: min(25vh, 220px);
    height: min(25vh, 220px);
    min-width: min(25vh, 220px);
    min-height: min(25vh, 220px);
    max-width: 220px;
    max-height: 220px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center;
    background: rgba(51, 51, 51, 0.06);
    flex-shrink: 0;
  }
  .media-art-empty {
    display: grid;
    place-items: center;
  }
  .media-art-empty ha-icon {
    --mdc-icon-size: 48px;
    opacity: 0.45;
  }
  .media-meta {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    display: grid;
    gap: 4px;
    justify-items: stretch;
    overflow: hidden;
    padding: 0 4px;
  }
  .media-title {
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-artist {
    font-size: 12px;
    opacity: 0.55;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-progress {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 4px;
    margin: 6px 0 0;
    padding: 0;
    border: 0;
    border-radius: 2px;
    background: rgba(51, 51, 51, 0.12);
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
  }
  .media-progress > div {
    height: 100%;
    background: blue;
  }
  .media-runtime {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    font-size: 11px;
    line-height: 1.2;
    opacity: 0.45;
    font-variant-numeric: tabular-nums;
  }
  .media-runtime > span {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .media-runtime > span:last-child {
    text-align: right;
  }
  .media-chips {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 12px;
    width: 100%;
  }
  /* popup_chip_controls */
  .media-controls-chip {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 4px;
    height: 42px;
    padding: 0 10px;
    border-radius: 21px;
    border: 1px solid rgba(51, 51, 51, 0.5);
    background: none;
    box-sizing: border-box;
  }
  .media-controls-chip button {
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    padding: 6px;
    display: grid;
    place-items: center;
  }
  .media-controls-chip button ha-icon {
    --mdc-icon-size: 22px;
  }
  /* popup_chip_volume */
  .media-volume-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 42px;
    padding: 0 14px 0 8px;
    border-radius: 21px;
    border: 1px solid rgba(51, 51, 51, 0.25);
    background: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    box-sizing: border-box;
  }
  .media-volume-chip ha-icon {
    --mdc-icon-size: 20px;
  }
  .media-source-list {
    max-width: 42vh;
    width: 100%;
  }

  .weather-popup .area-body {
    align-content: center;
    justify-items: stretch;
  }
  .weather-forecast-panel {
    width: min(420px, 100%);
    margin: 0 auto;
    display: grid;
    gap: 12px;
  }
  .forecast-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    text-align: center;
  }
  .forecast-temp {
    font-size: 60px;
    font-weight: 400;
    line-height: 1.1;
  }
  .forecast-minmax {
    font-size: 14px;
    font-weight: 400;
  }
  .forecast-list {
    width: 100%;
    display: grid;
    gap: 4px;
  }
  .forecast-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 2px 0;
    background: transparent;
    box-shadow: none;
    font-size: 13px;
  }
  .forecast-row .left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .weather-cond-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    background: rgba(var(--cond-rgb), 0.2);
    color: rgba(var(--cond-rgb), 1);
  }
  .weather-cond-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .weather-day-label {
    text-align: left;
    text-transform: capitalize;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .forecast-row .temp-pills {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .forecast-row .pill {
    display: inline-grid;
    place-items: center;
    min-width: 48px;
    width: 90%;
    height: 30px;
    padding: 0 8px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    line-height: 30px;
  }
  .forecast-row .pill.low {
    background: rgba(var(--ulm-color-blue), 1);
  }
  .forecast-row .pill.high {
    background: rgba(var(--ulm-color-red), 1);
  }
  .weather-radar-body {
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
  }
  .weather-mode-row {
    width: 100%;
    justify-content: space-evenly;
  }
  .ulm-embed-host[data-ulm-embed="weather-radar"].has-card {
    min-height: 350px;
  }
  .ulm-embed-host[data-ulm-embed="weather-radar"].has-card + .ulm-embed-fallback {
    display: none;
  }

  .radar-frame {
    width: 100%;
    height: 350px;
    max-height: 56vh;
    border: 0;
    border-radius: var(--border-radius, 20px);
    background: rgba(var(--ulm-color-theme), 0.06);
  }

  .muted {
    opacity: 0.55;
    font-size: 13px;
    text-align: center;
  }

  .history-list {
    display: grid;
    gap: 6px;
    font-size: 12px;
  }
  .history-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid rgba(var(--ulm-color-theme), 0.08);
  }
`;
