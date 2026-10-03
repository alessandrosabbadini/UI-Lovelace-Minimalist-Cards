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
  user?: { id?: string; name?: string; is_admin?: boolean };
}

export interface HassEntity {
  entity_id: string;
  state: string;
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

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
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
