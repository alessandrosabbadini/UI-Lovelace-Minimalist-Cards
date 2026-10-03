import { customElement } from "lit/decorators.js";
import { UlmEditorBase } from "../../shared/editor-base";
import type { UlmLightCardConfig } from "./ulm-light-card";

@customElement("ulm-light-card-editor")
export class UlmLightCardEditor extends UlmEditorBase<UlmLightCardConfig> {
  protected render() {
    return this.renderFields([
      { type: "section", label: "Entity" },
      {
        type: "text",
        key: "entity",
        label: "Entity (required)",
        placeholder: "light.living_room",
      },
      {
        type: "text",
        key: "name",
        label: "Name — ulm_card_light_name",
        placeholder: "Leave empty for friendly name",
      },
      {
        type: "text",
        key: "icon",
        label: "Icon — ulm_card_light_icon",
        placeholder: "mdi:lightbulb",
      },
      {
        type: "color",
        key: "color",
        label: "Color — ulm_card_light_color",
      },

      { type: "section", label: "Layout" },
      {
        type: "toggle",
        key: "enable_slider",
        label: "Enable slider — ulm_card_light_enable_slider",
      },
      {
        type: "number",
        key: "enable_slider_min",
        label: "Slider min — ulm_card_light_enable_slider_minSet",
        placeholder: "0",
      },
      {
        type: "number",
        key: "enable_slider_max",
        label: "Slider max — ulm_card_light_enable_slider_maxSet",
        placeholder: "100",
      },
      {
        type: "toggle",
        key: "enable_collapse",
        label: "Collapse when off — ulm_card_light_enable_collapse",
      },
      {
        type: "toggle",
        key: "enable_horizontal",
        label: "Horizontal layout — ulm_card_light_enable_horizontal",
      },
      {
        type: "toggle",
        key: "enable_horizontal_wide",
        label: "Wider slider — ulm_card_light_enable_horizontal_wide",
      },

      { type: "section", label: "Colors & popup" },
      {
        type: "toggle",
        key: "enable_color",
        label: "Use light RGB — ulm_card_light_enable_color",
      },
      {
        type: "toggle",
        key: "force_background_color",
        label: "Force colored background — ulm_card_light_force_background_color",
      },
      {
        type: "toggle",
        key: "enable_popup",
        label: "Enable popup — ulm_card_light_enable_popup",
      },
      {
        type: "toggle",
        key: "enable_popup_tap",
        label: "Popup on icon tap — ulm_card_light_enable_popup_tap",
      },
      {
        type: "text",
        key: "color_palette",
        label: "Color palette select entity — ulm_card_light_color_palette",
        placeholder: "input_select.palette",
      },

      { type: "section", label: "Preset buttons" },
      {
        type: "toggle",
        key: "enable_buttons",
        label: "Enable brightness buttons — ulm_card_light_enable_buttons",
      },
      {
        type: "number",
        key: "brightness_low",
        label: "Low % — ulm_card_light_brightness_low",
        placeholder: "1",
      },
      {
        type: "number",
        key: "brightness_medium",
        label: "Medium % — ulm_card_light_brightness_medium",
        placeholder: "50",
      },
      {
        type: "number",
        key: "brightness_high",
        label: "High % — ulm_card_light_brightness_high",
        placeholder: "100",
      },
    ]);
  }
}
