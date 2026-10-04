import { createSimpleEntityCard } from "../shared/simple-entity-card";
import type { HassEntity, HomeAssistant } from "../types";

function formatState(hass: HomeAssistant, state: HassEntity): string {
  if (hass.formatEntityState) return hass.formatEntityState(state);
  const unit = state.attributes.unit_of_measurement;
  return unit ? `${state.state} ${unit}` : state.state;
}

export const SIMPLE_CARDS = [
  // Specialized: binary, battery, generic(+swap), navigate, power outlet,
  // input boolean, script → editable-cards/src/cards/*
  createSimpleEntityCard({
    tag: "ulm-vertical-button-card",
    editorTag: "ulm-vertical-button-card-editor",
    type: "custom:ulm-vertical-button-card",
    name: "ULM Vertical Button",
    description: "Compact vertical action button",
    defaultIcon: "mdi:gesture-tap-button",
    defaultColor: "blue",
    stubEntity: "switch.decorative_lights",
    isActive: (s) => s.state === "on",
    onIconTap: (hass, config) => {
      const domain = config.entity.split(".")[0];
      hass.callService(domain, "toggle", { entity_id: config.entity });
    },
    stateLabel: formatState,
  }),
];
