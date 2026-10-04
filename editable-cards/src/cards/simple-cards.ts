import { createSimpleEntityCard } from "../shared/simple-entity-card";
import type { HassEntity, HomeAssistant } from "../types";

function formatState(hass: HomeAssistant, state: HassEntity): string {
  if (hass.formatEntityState) return hass.formatEntityState(state);
  const unit = state.attributes.unit_of_measurement;
  return unit ? `${state.state} ${unit}` : state.state;
}

export const SIMPLE_CARDS = [
  // Binary / Battery / Generic(+Swap) / Navigate / Power Outlet → specialized
  createSimpleEntityCard({
    tag: "ulm-input-boolean-card",
    editorTag: "ulm-input-boolean-card-editor",
    type: "custom:ulm-input-boolean-card",
    name: "ULM Input Boolean",
    description: "Toggle input_boolean / switch card",
    defaultIcon: "mdi:toggle-switch",
    defaultColor: "blue",
    stubEntity: "switch.decorative_lights",
    isActive: (s) => s.state === "on",
    onIconTap: (hass, config) => {
      const domain = config.entity.split(".")[0];
      hass.callService(domain, "toggle", { entity_id: config.entity });
    },
    stateLabel: formatState,
  }),
  // Power Outlet specialized: editable-cards/src/cards/power-outlet/
  createSimpleEntityCard({
    tag: "ulm-script-card",
    editorTag: "ulm-script-card-editor",
    type: "custom:ulm-script-card",
    name: "ULM Script",
    description: "Run a script / toggle switch",
    defaultIcon: "mdi:script-text",
    defaultColor: "purple",
    stubEntity: "switch.decorative_lights",
    isActive: (s) => s.state === "on",
    onIconTap: (hass, config) => {
      const domain = config.entity.split(".")[0];
      hass.callService(domain, "toggle", { entity_id: config.entity });
    },
    stateLabel: formatState,
  }),
  // Navigate specialized: editable-cards/src/cards/navigate/ulm-navigate-card.ts
  // Fan / Vacuum are specialized cards under editable-cards/src/cards/
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
