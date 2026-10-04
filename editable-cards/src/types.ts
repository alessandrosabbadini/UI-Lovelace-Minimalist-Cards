export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  localize: (key: string, ...args: unknown[]) => string;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ) => Promise<unknown>;
  formatEntityState?: (stateObj: HassEntity) => string;
  /** Resolve a relative HA path (e.g. /api/media_player_proxy/…) to an absolute URL */
  hassUrl?: (path?: string) => string;
  user?: { id?: string; name?: string; is_admin?: boolean };
  themes?: { darkMode?: boolean; theme?: string };
  config?: { unit_system?: { temperature?: string } };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed?: string;
  last_updated?: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    icon?: string;
    brightness?: number;
    rgb_color?: [number, number, number];
    entity_picture?: string;
    current_position?: number;
    temperature?: number;
    current_temperature?: number;
    hvac_modes?: string[];
    media_title?: string;
    media_artist?: string;
    unit_of_measurement?: string;
    battery?: number;
    battery_level?: number;
  };
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export type UlmThemeColor =
  | "yellow"
  | "blue"
  | "green"
  | "red"
  | "pink"
  | "purple"
  | "grey";

/** Sections view grid sizing (HA 2024.11+) */
export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
