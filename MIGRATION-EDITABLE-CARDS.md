# Migration: YAML Minimalist → Editable Cards

This fork moved away from `custom:button-card` YAML templates toward native
Lovelace cards with Home Assistant UI editors (Mushroom-style).

## What changed

- **Runtime cards:** `editable-cards/` → build `dist/ulm-editable-cards.js`
- **Themes kept:** `themes/` and `custom_components/.../lovelace/themefiles/`
- **Removed:**
  - Official card/chip/action YAML templates
  - Community YAML under `custom_cards/**/*.yaml`
  - Bundled HACS frontend deps (button-card, card-mod, mini-*, …)
  - YAML example dashboards (`ui-lovelace.yaml`, `adaptive-dash`)
  - Popup YAML / browser_mod (replaced by Lit popups in `editable-cards/src/popups/`)
  - Legacy reference tree (`legacy/`) — no longer in the repo

## Mapping (old → new)

| Old YAML template | New card type |
| --- | --- |
| `card_light` | `custom:ulm-light-card` |
| `card_cover` | `custom:ulm-cover-card` |
| `card_person` | `custom:ulm-person-card` |
| `card_media_player` | `custom:ulm-media-player-card` |
| `card_thermostat` | `custom:ulm-thermostat-card` |
| `card_weather` / `card_weather_ulm` | `custom:ulm-weather-card` / `custom:ulm-weather-ulm-card` |
| `card_room` | `custom:ulm-room-card` |
| `card_welcome_scenes` / `card_scenes_welcome` | `custom:ulm-welcome-card` |
| chips (`chip_*`) | `custom:ulm-chip-*-card` (also as **view badges**) |
| chips row helper | `custom:ulm-chips-card` |
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
| community `custom_card_*` | `custom:ulm-custom-card-*-card` |
| popup_* (browser_mod) | `openUlmPopup(host, kind, entity, opts?)` |

## Install

1. `cd editable-cards && npm install && npm run build`
2. Copy `dist/ulm-editable-cards.js` → `/config/www/`
3. Lovelace resource: `/local/ulm-editable-cards.js` (JavaScript Module)
4. UI-mode dashboard → Add card → search `ULM`
5. (Optional) Keep the integration for **themes** only

## Integration / themes

`custom_components/ui_lovelace_minimalist/` remains as a **themes helper**
(themed files + HA packaging). It does not ship card/popup YAML. Theme-only
packaging (dropping the Python integration) is optional future work.

## Remaining work

- Optional: theme-only packaging without the Python integration
