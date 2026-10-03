import { textField } from "../shared/config-form";
import { createSimpleEntityCard } from "../shared/simple-entity-card";
import type { HassEntity, HomeAssistant } from "../types";

function domainServiceToggle(
  domain: string,
): (
  hass: HomeAssistant,
  config: { entity: string },
  _state: HassEntity,
) => void {
  return (hass, config) => {
    hass.callService(domain, "toggle", { entity_id: config.entity });
  };
}

function formatState(hass: HomeAssistant, state: HassEntity): string {
  if (hass.formatEntityState) return hass.formatEntityState(state);
  const unit = state.attributes.unit_of_measurement;
  return unit ? `${state.state} ${unit}` : state.state;
}

export const SIMPLE_CARDS = [
  createSimpleEntityCard({
    tag: "ulm-binary-sensor-card",
    editorTag: "ulm-binary-sensor-card-editor",
    type: "custom:ulm-binary-sensor-card",
    name: "ULM Binary Sensor",
    description: "Minimalist-inspired binary sensor card",
    defaultIcon: "mdi:checkbox-blank-circle",
    defaultColor: "blue",
    stubEntity: "binary_sensor.basement_floor_wet",
    isActive: (s) => s.state === "on",
    stateLabel: formatState,
  }),
  createSimpleEntityCard({
    tag: "ulm-binary-sensor-alert-card",
    editorTag: "ulm-binary-sensor-alert-card-editor",
    type: "custom:ulm-binary-sensor-alert-card",
    name: "ULM Binary Sensor Alert",
    description: "Alert-styled binary sensor card",
    defaultIcon: "mdi:alert",
    defaultColor: "red",
    stubEntity: "binary_sensor.movement_backyard",
    isActive: (s) => s.state === "on",
    stateLabel: formatState,
  }),
  createSimpleEntityCard({
    tag: "ulm-battery-card",
    editorTag: "ulm-battery-card-editor",
    type: "custom:ulm-battery-card",
    name: "ULM Battery",
    description: "Battery level card",
    defaultIcon: "mdi:battery",
    defaultColor: "green",
    stubEntity: "sensor.outside_temperature_battery",
    isActive: (s) => Number(s.state) < 20,
    stateLabel: (hass, s) => {
      const value =
        s.attributes.battery_level ?? s.attributes.battery ?? s.state;
      return `${value}%`;
    },
  }),
  createSimpleEntityCard({
    tag: "ulm-generic-card",
    editorTag: "ulm-generic-card-editor",
    type: "custom:ulm-generic-card",
    name: "ULM Generic",
    description: "Generic entity card",
    defaultIcon: "mdi:flash",
    defaultColor: "blue",
    stubEntity: "sensor.outside_temperature",
    isActive: (s) => !["off", "unavailable", "unknown"].includes(s.state),
    stateLabel: formatState,
  }),
  createSimpleEntityCard({
    tag: "ulm-generic-swap-card",
    editorTag: "ulm-generic-swap-card-editor",
    type: "custom:ulm-generic-swap-card",
    name: "ULM Generic Swap",
    description: "Generic card with swapped name/state emphasis",
    defaultIcon: "mdi:swap-horizontal",
    defaultColor: "blue",
    stubEntity: "sensor.outside_temperature",
    isActive: (s) => !["off", "unavailable", "unknown"].includes(s.state),
    stateLabel: (hass, s) =>
      s.attributes.friendly_name || formatState(hass, s),
  }),
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
  createSimpleEntityCard({
    tag: "ulm-power-outlet-card",
    editorTag: "ulm-power-outlet-card-editor",
    type: "custom:ulm-power-outlet-card",
    name: "ULM Power Outlet",
    description: "Switch/outlet card",
    defaultIcon: "mdi:power-socket-eu",
    defaultColor: "blue",
    stubEntity: "switch.ac",
    isActive: (s) => s.state === "on",
    onIconTap: (hass, config) => {
      const domain = config.entity.split(".")[0];
      hass.callService(domain, "toggle", { entity_id: config.entity });
    },
    stateLabel: formatState,
  }),
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
  createSimpleEntityCard({
    tag: "ulm-navigate-card",
    editorTag: "ulm-navigate-card-editor",
    type: "custom:ulm-navigate-card",
    name: "ULM Navigate",
    description: "Navigation shortcut card",
    defaultIcon: "mdi:page-next",
    defaultColor: "blue",
    stubEntity: "sensor.outside_temperature",
    isActive: () => true,
    stateLabel: () => "Navigate",
    extraSchema: [textField("navigation_path")],
    onIconTap: (_hass, config) => {
      const path = String(
        (config as { navigation_path?: string }).navigation_path || "",
      );
      if (!path) return;
      history.pushState(null, "", path);
      window.dispatchEvent(new Event("location-changed"));
    },
  }),
  createSimpleEntityCard({
    tag: "ulm-fan-card",
    editorTag: "ulm-fan-card-editor",
    type: "custom:ulm-fan-card",
    name: "ULM Fan",
    description: "Fan toggle card",
    defaultIcon: "mdi:fan",
    defaultColor: "green",
    stubEntity: "fan.living_room_fan",
    isActive: (s) => s.state === "on",
    onIconTap: domainServiceToggle("fan"),
    stateLabel: formatState,
  }),
  createSimpleEntityCard({
    tag: "ulm-vacuum-card",
    editorTag: "ulm-vacuum-card-editor",
    type: "custom:ulm-vacuum-card",
    name: "ULM Vacuum",
    description: "Vacuum card",
    defaultIcon: "mdi:robot-vacuum",
    defaultColor: "blue",
    stubEntity: "vacuum.demo_vacuum_0_ground_floor",
    isActive: (s) => ["cleaning", "returning", "on"].includes(s.state),
    onIconTap: (hass, config, state) => {
      if (["cleaning", "returning"].includes(state.state)) {
        hass.callService("vacuum", "return_to_base", {
          entity_id: config.entity,
        });
      } else {
        hass.callService("vacuum", "start", { entity_id: config.entity });
      }
    },
    stateLabel: formatState,
  }),
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
