import { css } from "lit";
import type { HomeAssistant } from "../types";

/**
 * Matches internal_templates/chips.yaml.
 * Same host works as a Lovelace card and as a view badge (header strip).
 *
 * Minimalist dark themes set --box-shadow: none; chips.yaml overrides that
 * with a hard shadow — call syncChipDarkMode() from the card so :host([dark])
 * applies the same rule.
 */
export function syncChipDarkMode(
  el: HTMLElement,
  hass?: HomeAssistant,
): void {
  if (hass?.themes?.darkMode) el.setAttribute("dark", "");
  else el.removeAttribute("dark");
}

export const ulmChipStyles = css`
  :host {
    display: inline-flex;
    width: fit-content;
    max-width: 100%;
    vertical-align: top;
    /* Badge slot: don't stretch to full badge chrome width */
    flex: 0 0 auto;
  }

  button.chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    border: 0;
    border-radius: 18px;
    height: 36px;
    width: auto;
    padding: 0 6px;
    background: var(--card-background-color, #fafafa);
    box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 100%;
  }

  /* chips.yaml darkMode — theme --box-shadow is none */
  :host([dark]) button.chip {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
  }

  button.chip.has-icon-and-label {
    gap: 2px;
  }

  button.chip.icon-label {
    padding: 6px 6px 6px 12px;
    gap: 0;
  }

  .chip ha-icon {
    --mdc-icon-size: 18px;
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
  }

  .chip.icon-label ha-icon {
    --mdc-icon-size: 14px;
    width: 14px;
    height: 24px;
  }

  .chip .label {
    justify-self: center;
    padding: 0 6px;
    font-weight: bold;
    font-size: 14px;
    line-height: 100%;
    white-space: nowrap;
  }

  .chip.icon-label .label {
    font-size: 12px;
    margin: 0;
    padding: 0 6px;
  }
`;
