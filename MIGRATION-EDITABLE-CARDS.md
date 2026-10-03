# Migration: YAML Minimalist → Editable Cards

This fork is moving away from `custom:button-card` YAML templates toward native Lovelace cards with Home Assistant UI editors (Mushroom-style).

## What changed

- New package: `editable-cards/`
- Old removed:
  - `custom_components/.../lovelace/ulm_templates/**` button-card templates
  - `custom_cards/**` community YAML cards
- **Themes kept as original** under:
  - `custom_components/ui_lovelace_minimalist/lovelace/themefiles/` (source)
  - `themes/` (same files, HA-ready layout)
  - `minimalist-desktop`, `minimalist-mobile`, `minimalist-mobile-tapbar`, `minimalist-ios-tapbar`

## Mapping (old → new)

| Old YAML template | New card type |
| --- | --- |
| `card_light` | `custom:ulm-light-card` |
| `card_cover` | `custom:ulm-cover-card` |
| `card_person` | `custom:ulm-person-card` |
| `card_media_player` | `custom:ulm-media-player-card` |
| `card_thermostat` | `custom:ulm-thermostat-card` |
| `card_weather` / `card_weather_ulm` | `custom:ulm-weather-card` |
| `card_room` | `custom:ulm-room-card` |
| `card_welcome_scenes` / `card_scenes_welcome` | `custom:ulm-welcome-card` |
| chips (`chip_*`) | `custom:ulm-chips-card` |
| title templates | `custom:ulm-title-card` |
| `card_binary_sensor` | `custom:ulm-binary-sensor-card` |
| `card_binary_sensor_alert` | `custom:ulm-binary-sensor-alert-card` |
| `card_battery` | `custom:ulm-battery-card` |
| `card_generic` | `custom:ulm-generic-card` |
| `card_generic_swap` | `custom:ulm-generic-swap-card` |
| `card_input_boolean` | `custom:ulm-input-boolean-card` |
| `card_power_outlet` | `custom:ulm-power-outlet-card` |
| `card_script` | `custom:ulm-script-card` |
| `card_navigate` | `custom:ulm-navigate-card` |
| `card_fan` | `custom:ulm-fan-card` |
| `card_vacuum` | `custom:ulm-vacuum-card` |
| `card_vertical_button` | `custom:ulm-vertical-button-card` |

## Card editors (Home Assistant official API)

All ULM editable cards use the built-in form editor via static `getConfigForm()`
(selectors, expandable panels, `computeLabel` / `computeHelper`) — same pattern
as the Welcome card and as documented at
[Custom card](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/).

Shared helpers live in `editable-cards/src/shared/config-form.ts`.

## Install new cards

1. `cd editable-cards && npm install && npm run build`
2. Copy `dist/ulm-editable-cards.js` to `/config/www/`
3. Add Lovelace resource `/local/ulm-editable-cards.js` (module)
4. Use a **UI mode** dashboard and add cards from the picker (`ULM ...`)
