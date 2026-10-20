import type { HomeAssistant, HassEntity } from "../types";

export type UlmPopupKind =
  | "light"
  | "cover"
  | "thermostat"
  | "media_player"
  | "vacuum"
  | "weather"
  | "power_outlet";

/** Optional config passed from cards into the popup. */
export interface UlmPopupOpts {
  /** Light: input_select / select entity for color palettes */
  color_palette?: string;
  /** Thermostat: use preset_modes chips instead of HVAC modes */
  preset_mode?: boolean;
  /** Vacuum: camera entity for map preview */
  camera?: string;
  /** Power outlet: secondary sensors + graph source */
  sensor1?: string;
  sensor2?: string;
  graph_sensor?: string;
  /** Weather: skip first forecast row */
  suppress_first_forecast?: boolean;
}

export type LightView = "brightness" | "color" | "color_temp" | "effects" | "palette";
export type MediaView = "infos" | "volume" | "sources";
export type WeatherView = "forecast" | "radar";
export type OutletView = "stats" | "history";
export type PopupView =
  | "main"
  | LightView
  | MediaView
  | WeatherView
  | OutletView;

export interface PopupContext {
  hass: HomeAssistant;
  entity: string;
  stateObj: HassEntity;
  opts: UlmPopupOpts;
  view: PopupView;
  setView: (view: PopupView) => void;
  call: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ) => void;
  close: () => void;
  goBack: () => void;
  moreInfo: (entityId?: string) => void;
  /** Domain of the primary entity (before the first dot). */
  domain: string;
}

/** Host element that can receive an embedded HACS/HA card. */
export function embedHost(
  key: string,
  fallback?: unknown,
): { class: string; "data-ulm-embed": string } {
  return { class: `ulm-embed-host embed-${key}`, "data-ulm-embed": key };
}
