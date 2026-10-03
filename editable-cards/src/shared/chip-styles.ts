import { css } from "lit";

export const ulmChipStyles = css`
  :host {
    display: inline-block;
  }

  button.chip,
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    border-radius: 999px;
    padding: 8px 12px;
    background: var(--card-background-color, #fafafa);
    box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
    color: inherit;
    font: inherit;
    cursor: pointer;
    min-height: 36px;
  }

  .chip ha-icon {
    --mdc-icon-size: 18px;
  }

  .chip .label {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }
`;
