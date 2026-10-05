/**
 * Lit port of custom_cards/custom_card_scenes/card_scenes.yaml
 * Row of up to 5 scene/script/automation pills (card_scenes + card_scenes_pill).
 */
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { COLOR_OPTIONS, resolveThemeRgb } from "../../../shared/colors";
import {
  entityField,
  helpers,
  iconField,
  labels,
  selectField,
  textField,
} from "../../../shared/config-form";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  UlmThemeColor,
} from "../../../types";

export interface ScenesPillConfig {
  entity_id?: string;
  icon?: string;
  icon_color?: string;
  name?: string;
  bg_color?: string;
}

export interface UlmCustomScenesCardConfig extends LovelaceCardConfig {
  type: "custom:ulm-custom-card-scenes-card";
  entity_1?: ScenesPillConfig | string;
  entity_2?: ScenesPillConfig | string;
  entity_3?: ScenesPillConfig | string;
  entity_4?: ScenesPillConfig | string;
  entity_5?: ScenesPillConfig | string;
}

const SCENE_COLORS = ["gray", ...COLOR_OPTIONS] as const;

const DEFAULT_PILL: Required<
  Pick<ScenesPillConfig, "icon" | "icon_color" | "name" | "bg_color">
> & { entity_id: string } = {
  entity_id: "",
  icon: "mdi:help-circle-outline",
  icon_color: "gray",
  name: "n/a",
  bg_color: "gray",
};

function asObj(raw: unknown): Record<string, unknown> | undefined {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return undefined;
}

function parsePill(raw: unknown, flat?: {
  name?: unknown;
  icon?: unknown;
  icon_color?: unknown;
  bg_color?: unknown;
}): ScenesPillConfig {
  if (typeof raw === "string") {
    return {
      entity_id: raw,
      name: typeof flat?.name === "string" ? flat.name : undefined,
      icon: typeof flat?.icon === "string" ? flat.icon : undefined,
      icon_color:
        typeof flat?.icon_color === "string" ? flat.icon_color : undefined,
      bg_color: typeof flat?.bg_color === "string" ? flat.bg_color : undefined,
    };
  }
  const o = asObj(raw);
  if (!o) return {};
  return {
    entity_id: typeof o.entity_id === "string" ? o.entity_id : undefined,
    icon: typeof o.icon === "string" ? o.icon : undefined,
    icon_color: typeof o.icon_color === "string" ? o.icon_color : undefined,
    name: typeof o.name === "string" ? o.name : undefined,
    bg_color: typeof o.bg_color === "string" ? o.bg_color : undefined,
  };
}

function pillSchema(n: number) {
  return {
    type: "expandable" as const,
    name: `entity_${n}`,
    title: `Scene ${n}`,
    schema: [
      entityField("entity_id", undefined, false),
      {
        type: "grid" as const,
        name: "",
        flatten: true,
        schema: [textField("name"), iconField("icon")],
      },
      selectField(
        "icon_color",
        SCENE_COLORS.map((c) => ({ value: c, label: c })),
      ),
      selectField(
        "bg_color",
        SCENE_COLORS.map((c) => ({ value: c, label: c })),
      ),
    ],
  };
}

function resolveSceneTone(
  host: HTMLElement,
  color: string | undefined,
  kind: "icon" | "bg",
): string {
  const c = (color || "gray").toLowerCase();
  if (c === "gray" || c === "grey") {
    return kind === "icon"
      ? "rgba(var(--color-theme, 51, 51, 51), 0.20)"
      : "rgba(var(--color-theme, 51, 51, 51), 0.05)";
  }
  const theme = (
    COLOR_OPTIONS.includes(c as UlmThemeColor) ? c : "blue"
  ) as UlmThemeColor;
  const rgb = resolveThemeRgb(host, theme);
  return kind === "icon" ? `rgba(${rgb}, 1)` : `rgba(${rgb}, 0.20)`;
}

@customElement("ulm-custom-card-scenes-card")
export class UlmCustomScenesCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UlmCustomScenesCardConfig;
  @state() private _pills: ScenesPillConfig[] = [];

  public static getConfigForm() {
    return {
      schema: [
        pillSchema(1),
        pillSchema(2),
        pillSchema(3),
        pillSchema(4),
        pillSchema(5),
      ],
      computeLabel: labels({
        entity_id: "Entity",
        name: "Name",
        icon: "Icon",
        icon_color: "Icon color",
        bg_color: "Icon background color",
      }),
      computeHelper: helpers({
        entity_id:
          "scene / script / automation / switch — tap triggers turn_on (or automation.trigger)",
        icon_color:
          "gray = theme tint (original). Other values use ULM theme colors.",
        bg_color: "Background of the 42px icon circle",
      }),
    };
  }

  public static getStubConfig(): Partial<UlmCustomScenesCardConfig> {
    return {
      entity_1: {
        entity_id: "script.movie_time",
        name: "Movie",
        icon: "mdi:movie-open",
        icon_color: "blue",
        bg_color: "blue",
      },
      entity_2: {
        entity_id: "script.romantic_lights",
        name: "Romance",
        icon: "mdi:candle",
        icon_color: "pink",
        bg_color: "pink",
      },
      entity_3: {
        entity_id: "automation.ulm_set_minimalist_desktop_theme_on_start",
        name: "Theme",
        icon: "mdi:palette",
        icon_color: "purple",
        bg_color: "purple",
      },
      entity_4: {
        entity_id: "",
        name: "n/a",
        icon: "mdi:help-circle-outline",
        icon_color: "gray",
        bg_color: "gray",
      },
      entity_5: {
        entity_id: "",
        name: "n/a",
        icon: "mdi:help-circle-outline",
        icon_color: "gray",
        bg_color: "gray",
      },
    };
  }

  public setConfig(config: UlmCustomScenesCardConfig): void {
    const c = config as UlmCustomScenesCardConfig & Record<string, unknown>;
    const pills: ScenesPillConfig[] = [];
    for (let i = 1; i <= 5; i++) {
      const key = `entity_${i}`;
      pills.push(
        parsePill(c[key], {
          name: c[`name_${i}`],
          icon: c[`icon_${i}`],
          icon_color: c[`icon_color_${i}`],
          bg_color: c[`bg_color_${i}`],
        }),
      );
    }
    this._pills = pills;
    this._config = { ...config, type: "custom:ulm-custom-card-scenes-card" };
  }

  public getCardSize(): number {
    return 2;
  }

  protected updated(): void {
    if (this.hass?.themes?.darkMode) this.setAttribute("dark", "");
    else this.removeAttribute("dark");
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <ha-card class="ulm-card ulm-scenes">
        <div class="pills">
          ${this._pills.map((pill, i) => this._renderPill(pill, i))}
        </div>
      </ha-card>
    `;
  }

  private _renderPill(pill: ScenesPillConfig, index: number) {
    const entityId = pill.entity_id || "";
    const stateObj = entityId ? this.hass!.states[entityId] : undefined;
    const name =
      pill.name ||
      stateObj?.attributes.friendly_name ||
      (entityId ? entityId.split(".").pop() : DEFAULT_PILL.name) ||
      DEFAULT_PILL.name;
    const icon =
      pill.icon ||
      stateObj?.attributes.icon ||
      DEFAULT_PILL.icon;
    const iconColor = pill.icon_color || DEFAULT_PILL.icon_color;
    const bgColor = pill.bg_color || DEFAULT_PILL.bg_color;
    const disabled = !entityId;

    return html`
      <button
        class="pill"
        type="button"
        ?disabled=${disabled}
        style=${styleMap({
          "--pill-color": resolveSceneTone(this, iconColor, "icon"),
          "--pill-bg": resolveSceneTone(this, bgColor, "bg"),
        })}
        @click=${() => this._activate(entityId)}
        aria-label=${name}
        data-slot=${index + 1}
      >
        <span class="pill-icon">
          <ha-icon .icon=${icon}></ha-icon>
        </span>
        <span class="pill-name">${name}</span>
      </button>
    `;
  }

  private _activate(entityId: string) {
    if (!this.hass || !entityId) return;
    const domain = entityId.split(".")[0];
    if (domain === "automation") {
      this.hass.callService("automation", "trigger", { entity_id: entityId });
      return;
    }
    // Original: homeassistant.turn_on for scene / script / switch / …
    this.hass.callService("homeassistant", "turn_on", { entity_id: entityId });
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card.ulm-card.ulm-scenes {
      border-radius: var(--border-radius, 12px);
      box-shadow: var(--box-shadow);
      padding: 12px;
      background: var(--card-background-color, var(--ha-card-background, #fff));
    }

    .pills {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-items: center;
      column-gap: auto;
      align-items: start;
    }

    /* card_scenes_pill — 52×84, row-gap 12px */
    .pill {
      width: 52px;
      min-width: 52px;
      height: 84px;
      box-sizing: border-box;
      border: 0;
      border-radius: 50px;
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;
      padding: 5px;
      cursor: pointer;
      color: inherit;
      font: inherit;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: none;
    }

    :host([dark]) .pill {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .pill:hover,
    .pill:focus,
    .pill:active {
      background: var(--card-background-color, #fff);
      box-shadow: var(--box-shadow, 0px 2px 4px 0px rgba(0, 0, 0, 0.16));
      outline: none;
    }

    :host([dark]) .pill:hover,
    :host([dark]) .pill:focus,
    :host([dark]) .pill:active {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.8);
    }

    .pill:disabled {
      cursor: default;
      opacity: 1;
    }

    .pill-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--pill-bg);
      flex-shrink: 0;
    }

    .pill-icon ha-icon {
      --mdc-icon-size: 20px;
      color: var(--pill-color);
    }

    .pill-name {
      font-weight: bold;
      font-size: 9.5px;
      line-height: 1.1;
      text-align: center;
      width: 33px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-bottom: 7px;
      box-sizing: border-box;
      color: rgba(var(--color-theme, 51, 51, 51), 0.9);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ulm-custom-card-scenes-card": UlmCustomScenesCard;
  }
}
