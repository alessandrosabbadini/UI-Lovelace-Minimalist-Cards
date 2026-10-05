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
import "./cards/generic/ulm-generic-swap-card";
import "./cards/input-boolean/ulm-input-boolean-card";
import "./cards/script/ulm-script-card";
import "./cards/vertical-button/ulm-vertical-button-card";
import "./cards/room/ulm-room-card";
import "./cards/chips/ulm-chips-card";
import "./cards/title/ulm-title-card";
import "./cards/welcome/ulm-welcome-card";
import "./cards/custom/afvalophaling/ulm-custom-card-afvalophaling-card";
import "./cards/custom/alarm-time/ulm-custom-card-alarm-time-card";
import "./cards/custom/apexcharts/ulm-custom-card-apexcharts-card";
import "./cards/custom/bar-card/ulm-custom-card-bar-card-card";
import "./cards/custom/camera/ulm-custom-card-camera-card";
import "./cards/custom/esh-room/ulm-custom-card-esh-room-card";
import "./cards/custom/httpedo13-sun/ulm-custom-card-httpedo13-sun-card";
import "./cards/custom/damix48-power-details/ulm-custom-card-damix48-power-details-card";
import "./cards/custom/eraycetinay-lock/ulm-custom-card-eraycetinay-lock-card";
import "./cards/custom/nik-door/ulm-custom-card-nik-door-card";
import "./cards/custom/scenes/ulm-custom-card-scenes-card";
import "./cards/custom/mpse-printer/ulm-custom-card-mpse-printer-card";
import "./cards/custom/tpx01-aircondition/ulm-custom-card-tpx01-aircondition-card";
import "./cards/custom/input-number/ulm-custom-card-input-number-card";
import "./cards/custom/input-datetime/ulm-custom-card-input-datetime-card";
import "./cards/custom/homeassistant-updates/ulm-custom-card-homeassistant-updates-card";
import "./cards/custom/water-heater/ulm-custom-card-water-heater-card";
import "./cards/custom/more-power-outlet/ulm-custom-card-more-power-outlet-card";
import "./cards/custom/saxel-fan/ulm-custom-card-saxel-fan-card";
import "./cards/custom/schumijo-car/ulm-custom-card-schumijo-car-card";
import "./cards/custom/nik-nas/ulm-custom-card-nik-nas-card";
import "./cards/custom/haven-washer/ulm-custom-card-haven-washer-card";
import "./cards/custom/light-colorpick/ulm-custom-card-light-colorpick-card";
import "./cards/custom/media-player-sonos/ulm-custom-card-media-player-sonos-card";
import "./cards/custom/person-info/ulm-custom-card-person-info-card";
import "./cards/custom/speedtest-shogun160/ulm-custom-card-speedtest-shogun160-card";
import "./cards/custom/esh-welcome/ulm-custom-card-esh-welcome-card";
import "./cards/custom/nas/ulm-custom-card-nas-card";
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
window.customBadges = window.customBadges || [];

const DOCS_URL =
  "https://github.com/UI-Lovelace-Minimalist/UI/tree/main/editable-cards";

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
    documentationURL: DOCS_URL,
  });
}

/** Official chips: same element in card picker and badge (view header) picker */
function registerChip(chip: {
  type: string;
  name: string;
  description: string;
}) {
  const entry = {
    ...chip,
    preview: true,
    documentationURL: DOCS_URL,
  };
  window.customCards!.push(entry);
  window.customBadges!.push({
    ...entry,
    description: `${chip.description} (also usable as a view badge)`,
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
    type: "ulm-generic-swap-card",
    name: "ULM Generic Swap",
    description: "Generic card (name primary, state secondary)",
  },
  {
    type: "ulm-input-boolean-card",
    name: "ULM Input Boolean",
    description: "Toggle input_boolean / switch card",
  },
  {
    type: "ulm-script-card",
    name: "ULM Script",
    description: "Run a script from a compact icon+title card",
  },
  {
    type: "ulm-vertical-button-card",
    name: "ULM Vertical Button",
    description: "Vertical scene/toggle button with active state color",
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
  {
    type: "ulm-custom-card-afvalophaling-card",
    name: "ULM Custom afvalophaling",
    description: "Dutch waste collection schedule card",
  },
  {
    type: "ulm-custom-card-alarm-time-card",
    name: "ULM Custom alarm time",
    description: "Alarm toggle with adjustable input_datetime time",
  },
  {
    type: "ulm-custom-card-apexcharts-card",
    name: "ULM Custom apexcharts",
    description:
      "Three entities + apexcharts-card (line/scatter/pie/donut/radialBar)",
  },
  {
    type: "ulm-custom-card-bar-card-card",
    name: "ULM Custom bar card",
    description: "Generic header + HACS bar-card progress bar",
  },
  {
    type: "ulm-custom-card-camera-card",
    name: "ULM Custom camera",
    description: "Optional blue title row + live picture-entity camera",
  },
  {
    type: "ulm-custom-card-esh-room-card",
    name: "ULM Custom Room (esh)",
    description:
      "Rectangular room card with light / climate / cover widgets",
  },
  {
    type: "ulm-custom-card-httpedo13-sun-card",
    name: "ULM Custom Sun",
    description:
      "Minimalist shell around HACS sun-card (azimuth / elevation / times)",
  },
  {
    type: "ulm-custom-card-damix48-power-details-card",
    name: "ULM Custom Power details",
    description:
      "Power header + mini-graph-card with hours window and thresholds",
  },
  {
    type: "ulm-custom-card-eraycetinay-lock-card",
    name: "ULM Custom Lock",
    description:
      "Door lock with tap control, battery and door-open warning badges",
  },
  {
    type: "ulm-custom-card-nik-door-card",
    name: "ULM Custom Minimal Door Lock",
    description:
      "Nik door lock: state sensor + battery badge + open/lock widgets",
  },
  {
    type: "ulm-custom-card-scenes-card",
    name: "ULM Custom scenes",
    description:
      "Row of up to 5 scene / script / automation pills",
  },
  {
    type: "ulm-custom-card-mpse-printer-card",
    name: "ULM Custom Printer",
    description:
      "Printer status header + CMYK toner level bars",
  },
  {
    type: "ulm-custom-card-tpx01-aircondition-card",
    name: "ULM Custom AirCondition",
    description:
      "Air conditioner with power and temperature controls",
  },
  {
    type: "ulm-custom-card-input-number-card",
    name: "ULM Custom input number",
    description: "Number / counter / select with down-up controls",
  },
  {
    type: "ulm-custom-card-input-datetime-card",
    name: "ULM Custom input datetime",
    description: "Time helper with minute step arrows",
  },
  {
    type: "ulm-custom-card-homeassistant-updates-card",
    name: "ULM Custom Home Assistant updates",
    description: "Core / Supervisor / OS update status + shortcuts",
  },
  {
    type: "ulm-custom-card-water-heater-card",
    name: "ULM Custom water heater",
    description: "Water heater with consumption-driven heating state",
  },
  {
    type: "ulm-custom-card-more-power-outlet-card",
    name: "ULM Custom more power outlet",
    description: "Outlet with power / energy / runtime label",
  },
  {
    type: "ulm-custom-card-saxel-fan-card",
    name: "ULM Custom saxel fan",
    description: "Fan with slider, oscillate button, temp/hum attributes",
  },
  {
    type: "ulm-custom-card-schumijo-car-card",
    name: "ULM Custom schumijo car",
    description: "Car tracker + lock badges with energy/range widgets",
  },
  {
    type: "ulm-custom-card-nik-nas-card",
    name: "ULM Custom nik nas",
    description: "NAS power status + up to 4 metric rows",
  },
  {
    type: "ulm-custom-card-haven-washer-card",
    name: "ULM Custom haven washer",
    description: "Washer power + phase icons + progress bar",
  },
  {
    type: "ulm-custom-card-light-colorpick-card",
    name: "ULM Custom light colorpick",
    description: "Light with brightness slider + RGB preset chips",
  },
  {
    type: "ulm-custom-card-media-player-sonos-card",
    name: "ULM Custom Sonos",
    description: "Sonos media player with volume and play/pause widgets",
  },
  {
    type: "ulm-custom-card-person-info-card",
    name: "ULM Custom person info",
    description: "Person card with zone badge, battery and commute",
  },
  {
    type: "ulm-custom-card-speedtest-shogun160-card",
    name: "ULM Custom speedtest",
    description: "Download / upload / ping gauges (CSS, no apexcharts)",
  },
  {
    type: "ulm-custom-card-esh-welcome-card",
    name: "ULM Custom esh welcome",
    description: "Welcome greeting with weather topbar and nav pills",
  },
  {
    type: "ulm-custom-card-nas-card",
    name: "ULM Custom nas",
    description: "Simple NAS sensor icon_info (blue)",
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
  registerChip({
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
