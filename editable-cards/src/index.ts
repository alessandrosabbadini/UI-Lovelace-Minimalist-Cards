import { CARD_VERSION } from "./const";
import "./cards/light/ulm-light-card";
import "./cards/cover/ulm-cover-card";
import "./cards/person/ulm-person-card";
import "./cards/media/ulm-media-player-card";
import "./cards/thermostat/ulm-thermostat-card";
import "./cards/fan/ulm-fan-card";
import "./cards/vacuum/ulm-vacuum-card";
import "./cards/weather/ulm-weather-card";
import "./cards/weather/ulm-weather-ulm-card";
import "./cards/battery/ulm-battery-card";
import "./cards/binary-sensor/ulm-binary-sensor-card";
import "./cards/binary-sensor/ulm-binary-sensor-alert-card";
import "./cards/navigate/ulm-navigate-card";
import "./cards/power-outlet/ulm-power-outlet-card";
import "./cards/generic/ulm-generic-card";
import "./cards/room/ulm-room-card";
import "./cards/chips/ulm-chips-card";
import "./cards/title/ulm-title-card";
import "./cards/welcome/ulm-welcome-card";
import "./popups/ulm-popup";
import { SIMPLE_CARDS } from "./cards/simple-cards";
import { OFFICIAL_CHIPS } from "./cards/chips/official-chips";
import { CUSTOM_CARDS } from "./cards/custom/registry";

console.info(
  `%c ULM-EDITABLE-CARDS %c ${CARD_VERSION} `,
  "color: white; background: #434343; font-weight: 700;",
  "color: #434343; background: #FF9101; font-weight: 700;",
);

window.customCards = window.customCards || [];

function register(
  card: {
    type: string;
    name: string;
    description: string;
  },
  preview = true,
) {
  window.customCards!.push({
    ...card,
    preview,
    documentationURL:
      "https://github.com/UI-Lovelace-Minimalist/UI/tree/main/editable-cards",
  });
}

const SPECIALIZED = [
  {
    type: "ulm-light-card",
    name: "ULM Light",
    description: "Minimalist-inspired light card with UI editor",
  },
  {
    type: "ulm-cover-card",
    name: "ULM Cover",
    description: "Cover/blinds card with controls and slider",
  },
  {
    type: "ulm-person-card",
    name: "ULM Person",
    description: "Person presence card",
  },
  {
    type: "ulm-media-player-card",
    name: "ULM Media Player",
    description: "Media player card with transport controls",
  },
  {
    type: "ulm-thermostat-card",
    name: "ULM Thermostat",
    description: "Climate/thermostat card",
  },
  {
    type: "ulm-fan-card",
    name: "ULM Fan",
    description: "Fan card with speed slider and oscillation",
  },
  {
    type: "ulm-vacuum-card",
    name: "ULM Vacuum",
    description: "Vacuum card with map camera and room script",
  },
  {
    type: "ulm-weather-card",
    name: "ULM Weather",
    description: "Weather card (simple-weather style, no dependency)",
  },
  {
    type: "ulm-weather-ulm-card",
    name: "ULM Weather ULM",
    description: "Native weather card with humidity/temp chips",
  },
  {
    type: "ulm-battery-card",
    name: "ULM Battery",
    description: "Battery level with charging icon and thresholds",
  },
  {
    type: "ulm-binary-sensor-card",
    name: "ULM Binary Sensor",
    description: "Binary sensor with color and last-changed options",
  },
  {
    type: "ulm-binary-sensor-alert-card",
    name: "ULM Binary Sensor Alert",
    description: "Binary sensor with alert badge when on/unavailable",
  },
  {
    type: "ulm-navigate-card",
    name: "ULM Navigate",
    description: "Dashboard navigation shortcut",
  },
  {
    type: "ulm-power-outlet-card",
    name: "ULM Power Outlet",
    description: "Switch/outlet with optional consumption and popup",
  },
  {
    type: "ulm-generic-card",
    name: "ULM Generic",
    description: "Generic sensor card (state primary, name secondary)",
  },
  {
    type: "ulm-room-card",
    name: "ULM Room",
    description: "Room card with quick entity chips",
  },
  {
    type: "ulm-chips-card",
    name: "ULM Chips Row",
    description: "Row helper for multiple chips",
  },
  {
    type: "ulm-title-card",
    name: "ULM Title",
    description: "Section title and optional subtitle",
  },
  {
    type: "ulm-welcome-card",
    name: "ULM Welcome",
    description: "Welcome card with greeting and navigation shortcuts",
  },
] as const;

for (const card of SPECIALIZED) {
  register(card);
}

for (const { def } of SIMPLE_CARDS) {
  register({
    type: def.type.replace(/^custom:/, ""),
    name: def.name,
    description: def.description,
  });
}

for (const def of OFFICIAL_CHIPS) {
  register({
    type: def.type.replace(/^custom:/, ""),
    name: def.name,
    description: def.description,
  });
}

for (const { def } of CUSTOM_CARDS) {
  register(
    {
      type: def.type.replace(/^custom:/, ""),
      name: def.name,
      description: def.description,
    },
    false,
  );
}
