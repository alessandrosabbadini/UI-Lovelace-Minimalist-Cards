import type { LovelaceCardConfig } from "../types";
import type { UlmPopupOpts } from "./types";

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

export function vacuumCard(
  entity: string,
  opts: UlmPopupOpts,
): LovelaceCardConfig {
  const map = opts.camera;
  return {
    type: "custom:vacuum-card",
    entity,
    image: "default",
    compact_view: false,
    ...(map ? { map } : {}),
  };
}

export const EMBED_TAGS: Record<string, string> = {
  "my-slider-v2": "my-slider-v2",
  "light-entity-card": "light-entity-card",
  "mini-media-player": "mini-media-player",
  "weather-radar-card": "weather-radar-card",
  "mini-graph-card": "mini-graph-card",
  "vacuum-card": "vacuum-card",
};
