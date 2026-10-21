import type { LovelaceCardConfig } from "../types";

/** Styles matching legacy popup YAML for my-slider-v2 (default card height is only 30px!). */
const SLIDER_CARD = {
  height: "280px",
  width: "100px",
  "box-shadow": "none",
  background: "none",
};

const SLIDER_CONTAINER = {
  border: "2px solid white",
  "border-radius": "14px",
  height: "280px",
  width: "100px",
  "box-shadow": "none",
};

const SLIDER_THUMB_LIGHT = {
  width: "50px",
  height: "5px",
  background: "white",
  position: "center",
  "margin-right": "25px",
  "margin-left": "25px",
  "border-radius": "0px 0px 10px 10px",
};

const SLIDER_THUMB_COVER = {
  ...SLIDER_THUMB_LIGHT,
  width: "40px",
  "margin-right": "30px",
  "margin-left": "30px",
};

const VOL_H = "30vh";
const VOL_W = "calc(30vh / 2.8)";

export function mySliderBrightness(entity: string): LovelaceCardConfig {
  return {
    type: "custom:my-slider-v2",
    entity,
    allowTapping: true,
    vertical: true,
    styles: {
      card: SLIDER_CARD,
      container: SLIDER_CONTAINER,
      thumb: SLIDER_THUMB_LIGHT,
    },
  };
}

export function mySliderColorTemp(entity: string): LovelaceCardConfig {
  return {
    type: "custom:my-slider-v2",
    entity,
    colorMode: "temperature",
    allowTapping: true,
    vertical: true,
    styles: {
      card: SLIDER_CARD,
      container: {
        ...SLIDER_CONTAINER,
        background: "none",
      },
      thumb: { width: "0px" },
      progress: { background: "none" },
      track: {
        background: "linear-gradient(180deg, #f3db6d, #fff, #c9f2fc)",
      },
    },
  };
}

export function mySliderCover(entity: string): LovelaceCardConfig {
  return {
    type: "custom:my-slider-v2",
    entity,
    allowTapping: true,
    vertical: true,
    flipped: true,
    styles: {
      card: SLIDER_CARD,
      container: SLIDER_CONTAINER,
      progress: { background: "rgba(var(--color-theme),0.9)" },
      track: { background: "rgba(var(--color-theme),0.09)" },
      thumb: SLIDER_THUMB_COVER,
    },
  };
}

export function mySliderVolume(entity: string): LovelaceCardConfig {
  return {
    type: "custom:my-slider-v2",
    entity,
    allowTapping: true,
    vertical: true,
    styles: {
      card: {
        height: VOL_H,
        width: VOL_W,
        "box-shadow": "none",
        background: "none",
      },
      container: {
        border: "2px solid white",
        "border-radius": "14px",
        height: VOL_H,
        width: VOL_W,
        "box-shadow": "none",
      },
      progress: { background: "rgba(var(--color-theme),0.9)" },
      track: { background: "rgba(var(--color-theme),0.09)" },
      thumb: SLIDER_THUMB_LIGHT,
    },
  };
}

export function lightEntityColor(entity: string): LovelaceCardConfig {
  return {
    type: "custom:light-entity-card",
    entity,
    persist_features: true,
    brightness: false,
    color_temp: false,
    white_value: false,
    effects_list: false,
    hide_header: true,
    smooth_color_wheel: true,
    consolidate_entities: true,
    child_card: true,
  };
}

export function miniMediaArtwork(entity: string): LovelaceCardConfig {
  return {
    type: "custom:mini-media-player",
    entity,
    artwork: "full-cover",
    hide: {
      name: true,
      icon: true,
      info: true,
      volume: true,
      progress: true,
      controls: true,
      source: true,
      power: true,
    },
  };
}

export function miniMediaInfo(entity: string): LovelaceCardConfig {
  return {
    type: "custom:mini-media-player",
    entity,
    hide: {
      icon: true,
      volume: true,
      controls: true,
      source: true,
      power: true,
      name: true,
    },
  };
}

export function weatherRadar(darkMode?: boolean): LovelaceCardConfig {
  return {
    type: "custom:weather-radar-card",
    zoom_level: 9,
    data_source: "RainViewer-Meteored",
    show_marker: true,
    map_style: darkMode ? "dark" : "light",
  };
}

/** Legacy defaults from popup_power_outlet_stats content2. */
export const OUTLET_GRAPH_HEIGHT = 276;
export const OUTLET_GRAPH_MARGIN = 37;
/** ha-card padding (top+bottom) so the flat-series stroke clears the radius. */
export const OUTLET_GRAPH_CHROME = 36;

/**
 * Fit legacy mini-graph into the available cell so the bottom is never clipped
 * (mobile graph-only / short viewports). Keeps line near SVG bottom.
 *
 * mini-graph's `height` only sets the SVG viewBox; without an explicit CSS
 * height the graph sizes by aspect ratio (width * h / 500) and can overflow
 * short cells. We treat `height` as real px and apply it in styleOutletMiniGraph.
 */
export function outletGraphFit(availH: number): {
  height: number;
  margin: number;
} {
  if (availH <= 0) {
    return { height: OUTLET_GRAPH_HEIGHT, margin: OUTLET_GRAPH_MARGIN };
  }
  const margin = Math.min(
    OUTLET_GRAPH_MARGIN,
    Math.max(8, Math.floor(availH * 0.1)),
  );
  const height = Math.min(
    OUTLET_GRAPH_HEIGHT,
    Math.max(80, availH - margin - OUTLET_GRAPH_CHROME),
  );
  return { height, margin };
}

/** Legacy popup_power_outlet_stats mini-graph-card config. */
export function outletMiniGraph(
  entity: string,
  height = OUTLET_GRAPH_HEIGHT,
): LovelaceCardConfig {
  return {
    type: "custom:mini-graph-card",
    entities: [{ entity }],
    line_color: "var(--info-color)",
    height,
    hours_to_show: 168,
    show: {
      name: false,
      icon: false,
      legend: false,
      state: false,
    },
  };
}

/** Legacy card_mod for the outlet mini-graph ha-card + real px graph height. */
export function styleOutletMiniGraph(
  el: HTMLElement,
  margin = OUTLET_GRAPH_MARGIN,
  height = OUTLET_GRAPH_HEIGHT,
) {
  el.style.width = "100%";
  el.style.maxWidth = "100%";
  el.style.flexShrink = "0";
  const root = el.shadowRoot;
  if (!root) return;
  const card = root.querySelector("ha-card") as HTMLElement | null;
  if (card) {
    card.style.boxShadow = "none";
    card.style.borderRadius = "var(--border-radius, 20px)";
    card.style.marginBottom = `${margin}px`;
    card.style.background = "var(--card-background-color)";
    // Flat-series stroke sits on the SVG bottom edge; keep it inside the
    // rounded card (overflow+radius otherwise eats the line ends).
    card.style.overflow = "hidden";
    card.style.paddingTop = "12px";
    card.style.paddingBottom = "14px";
    card.style.paddingLeft = "10px";
    card.style.paddingRight = "10px";
    card.style.boxSizing = "border-box";
  }
  // Force pixel height — viewBox alone only sets aspect ratio
  const graph = root.querySelector(".graph") as HTMLElement | null;
  if (graph) {
    graph.style.height = `${height}px`;
    graph.style.flexShrink = "0";
    graph.style.minHeight = `${height}px`;
    graph.style.width = "100%";
  }
  const svg = root.querySelector("svg") as SVGElement | null;
  if (svg) {
    svg.style.height = `${height}px`;
    svg.style.maxHeight = `${height}px`;
    svg.style.width = "100%";
    svg.style.overflow = "visible";
  }
}

export const EMBED_TAGS: Record<string, string> = {
  "my-slider-v2": "my-slider-v2",
  "light-entity-card": "light-entity-card",
  "mini-media-player": "mini-media-player",
  "weather-radar-card": "weather-radar-card",
  "mini-graph-card": "mini-graph-card",
};
