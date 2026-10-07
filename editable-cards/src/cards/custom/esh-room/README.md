---
title: Custom Card Room
hide:
  - toc
---

# Custom Card "Room"

Lit port of Minimalist `card_esh_room` — rectangular alternative to the official room card, including cover support.

## New card type

```yaml
type: custom:ulm-custom-card-esh-room-card
entity: light.bed_light
name: Bathroom
icon: mdi:bathtub
tap_action: navigate
navigation_path: bathroom
light_entity: light.bed_light
climate_entity: climate.hvac
# cover_entity: cover.hall_window   # with light: cover wins over climate in the grid
dynamic_color: false
enable_light_popup: false
enable_thermostat_popup: false
enable_cover_popup: false
# label: "22 °C"                   # static override
# temperature_entity: sensor.outside_temperature
# humidity_entity: sensor.outside_humidity
```

## Grid (from original YAML)

| Config | Areas |
| --- | --- |
| light + cover | `i light` / `n cover` / `l cover` |
| light + climate | `i light` / `n climate` / `l climate` |
| light only | `i light` / `n n` / `l l` |
| climate only | `i .` / `n climate` / `l climate` |
| cover only | `i cover` / `n n` / `l l` |

If light + cover + climate are all set, **cover takes priority** over climate (same as YAML).

## Label

1. `label` static string if set (emoji OK).
2. Else `temperature_entity` + `humidity_entity` → `🌡️ … 💧 …` (docs customization).
3. Else original brightness `%` from light (or entity) when on, otherwise state.

Button-card JS templates in `label:` are **not** evaluated in Lit — use the options above.

## Variables

| Variable | Maps from |
| --- | --- |
| entity / name / icon / label / tap_action / navigation_path | card fields |
| light_entity | `ulm_custom_card_esh_room_light_entity` |
| climate_entity | `ulm_custom_card_esh_room_climate_entity` |
| cover_entity | `ulm_custom_card_esh_room_cover_entity` |
| light_icon_on / off | `ulm_card_esh_room_light_icon_*` |
| cover_icon_* | `ulm_card_esh_room_cover_icon_*` |
| dynamic_color | `ulm_card_dynamic_color` |
| enable_light_popup | `ulm_card_light_enable_popup` |
| enable_thermostat_popup | `ulm_card_thermostat_enable_popup` |
| enable_cover_popup | `ulm_card_cover_popup` |

## Legacy YAML

- `custom_card_esh_room.yaml` (`card_esh_room`)
