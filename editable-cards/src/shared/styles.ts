import { css } from "lit";

/** Fallback Minimalist tokens when theme is not loaded. */
export const ulmTokens = css`
  :host {
    --ulm-radius: var(--border-radius, 20px);
    --ulm-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
    --ulm-color-theme: var(--color-theme, 51, 51, 51);
    --ulm-color-yellow: var(--color-yellow, 255, 145, 1);
    --ulm-color-blue: var(--color-blue, 61, 90, 254);
    --ulm-color-green: var(--color-green, 1, 200, 82);
    --ulm-color-red: var(--color-red, 245, 68, 54);
    --ulm-color-pink: var(--color-pink, 233, 30, 99);
    --ulm-color-purple: var(--color-purple, 102, 31, 255);
    --ulm-color-grey: var(--color-grey, 187, 187, 187);
    --ulm-opacity-bg: var(--opacity-bg, 1);
  }
`;

export const ulmCardStyles = css`
  ${ulmTokens}

  :host {
    display: block;
    height: 100%;
    box-sizing: border-box;
  }

  ha-card.ulm-card {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: var(--ulm-radius);
    box-shadow: var(--ulm-shadow);
    border: none;
    padding: 12px;
    overflow: hidden;
    background: var(--card-background-color, #fafafa);
    color: var(--primary-text-color);
    transition: background-color 0.2s ease;
  }

  ha-card.ulm-card > .stack {
    flex: 1;
    min-height: 0;
  }

  .warning {
    padding: 8px;
    color: var(--error-color);
    font-size: 14px;
  }

  /* Matches original icon_info grid: 'i n' / 'i l', columns min-content auto */
  .row {
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-rows: min-content min-content;
    grid-template-areas:
      "icon name"
      "icon label";
    align-items: center;
    column-gap: 0;
  }

  .icon-btn,
  .info-btn,
  .widget-btn {
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .icon-btn {
    grid-area: icon;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .icon-btn ha-icon {
    /* Original icon_info size: 20px */
    --mdc-icon-size: 20px;
  }

  .icon-btn img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }

  .badge {
    position: absolute;
    left: 24px;
    top: -2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid var(--card-background-color, #fafafa);
    display: grid;
    place-items: center;
    z-index: 1;
  }

  .badge.right {
    left: auto;
    right: -2px;
    top: -2px;
  }

  .badge ha-icon {
    --mdc-icon-size: 10px;
    color: var(--primary-background-color, #fff);
  }

  /* info-btn wraps name+label; original puts margin-left: 12px on each */
  .info-btn {
    grid-area: 1 / 2 / 3 / 3;
    min-width: 0;
    display: grid;
    grid-template-rows: min-content min-content;
    align-content: center;
    padding: 0;
    margin: 0;
  }

  .name {
    align-self: end;
    justify-self: start;
    font-weight: bold;
    font-size: 14px;
    line-height: 1.2;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .label {
    align-self: start;
    justify-self: start;
    font-size: 12px;
    font-weight: bolder;
    opacity: 0.4;
    line-height: 1.2;
    margin-left: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .stack.horizontal {
    flex-direction: row;
    align-items: center;
  }

  .stack.horizontal .row {
    flex: 1;
    min-width: 0;
  }

  .stack.horizontal .slider-wrap,
  .stack.horizontal .widgets,
  .stack.horizontal .controls {
    flex: 1;
  }

  .stack.horizontal.wide .slider-wrap {
    flex: 2;
  }

  .slider-wrap {
    height: 42px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    background: rgba(var(--ulm-color-theme), 0.05);
  }

  .slider-wrap input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 42px;
    margin: 0;
    background: transparent;
    cursor: pointer;
  }

  .slider-wrap input[type="range"]::-webkit-slider-runnable-track {
    height: 42px;
    border-radius: 14px;
    background: transparent;
  }

  .slider-wrap input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 42px;
    border-radius: 0;
    background: transparent;
  }

  .slider-fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 14px;
    pointer-events: none;
  }

  .widgets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .widget-btn {
    height: 42px;
    border-radius: 14px;
    background: rgba(var(--ulm-color-theme), 0.05);
    display: grid;
    place-items: center;
  }

  .widget-btn ha-icon {
    --mdc-icon-size: 20px;
    color: rgba(var(--ulm-color-theme), 0.9);
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .controls.four {
    grid-template-columns: repeat(4, 1fr);
  }

  .unavailable .icon-btn {
    overflow: visible;
  }
`;

export const ulmEditorStyles = css`
  .form {
    display: grid;
    gap: 12px;
    padding: 4px 0;
  }

  .section {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    opacity: 0.55;
  }

  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
  }

  label.check {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
  }
`;
