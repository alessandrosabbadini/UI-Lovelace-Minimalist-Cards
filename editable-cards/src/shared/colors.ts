import type { UlmThemeColor } from "../types";

export const THEME_COLORS: Record<UlmThemeColor, string> = {
  yellow: "255, 145, 1",
  blue: "61, 90, 254",
  green: "1, 200, 82",
  red: "245, 68, 54",
  pink: "233, 30, 99",
  purple: "102, 31, 255",
  grey: "187, 187, 187",
};

export const COLOR_OPTIONS: UlmThemeColor[] = [
  "yellow",
  "blue",
  "green",
  "red",
  "pink",
  "purple",
  "grey",
];

export function resolveThemeRgb(
  host: HTMLElement,
  color: UlmThemeColor = "blue",
): string {
  const fromCss = getComputedStyle(host)
    .getPropertyValue(`--color-${color}`)
    .trim();
  return fromCss || THEME_COLORS[color] || THEME_COLORS.blue;
}

export function activeIconStyle(
  host: HTMLElement,
  active: boolean,
  color: UlmThemeColor,
  rgbColor?: [number, number, number] | null,
  useEntityColor = false,
  /** Solid colored card background — icon must flip to light for contrast */
  forceBackground = false,
): Record<string, string> {
  if (!active) {
    return {
      color: "rgba(var(--color-theme, 51, 51, 51), 0.2)",
      backgroundColor: "rgba(var(--color-theme, 51, 51, 51), 0.05)",
    };
  }
  if (forceBackground) {
    return {
      color: "rgb(250, 250, 250)",
      backgroundColor: "rgba(250, 250, 250, 0.2)",
    };
  }
  const rgb =
    useEntityColor && rgbColor
      ? rgbColor.join(", ")
      : resolveThemeRgb(host, color);
  return {
    color: `rgba(${rgb}, 1)`,
    backgroundColor: `rgba(${rgb}, 0.2)`,
  };
}
