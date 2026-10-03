---
title: esh room
hide:
  - toc
---

# esh room

Editable Home Assistant card port of the Minimalist custom card `custom_card_esh_room`.


## New card type

```yaml
type: custom:ulm-custom-card-esh-room-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_cover_popup: # optional
ulm_card_esh_room_cover_icon_closed: # optional
ulm_card_esh_room_cover_icon_closing: # optional
ulm_card_esh_room_cover_icon_open: # optional
ulm_card_esh_room_cover_icon_opening: # optional
ulm_card_esh_room_light_icon_off: # optional
ulm_card_esh_room_light_icon_on: # optional
ulm_card_light_enable_popup: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom esh room**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_actions_card | no | Ported optional field from original YAML |
| ulm_card_cover_popup | no | Ported optional field from original YAML |
| ulm_card_dynamic_color | no | Ported optional field from original YAML |
| ulm_card_esh_room_cover_icon_closed | no | Ported optional field from original YAML |
| ulm_card_esh_room_cover_icon_closing | no | Ported optional field from original YAML |
| ulm_card_esh_room_cover_icon_open | no | Ported optional field from original YAML |
| ulm_card_esh_room_cover_icon_opening | no | Ported optional field from original YAML |
| ulm_card_esh_room_light_icon_off | no | Ported optional field from original YAML |
| ulm_card_esh_room_light_icon_on | no | Ported optional field from original YAML |
| ulm_card_light_enable_popup | no | Ported optional field from original YAML |
| ulm_card_thermostat_enable_popup | no | Ported optional field from original YAML |
| ulm_custom_actions | no | Ported optional field from original YAML |
| ulm_custom_card_esh_room_climate_entity | no | Ported optional field from original YAML |
| ulm_custom_card_esh_room_cover_entity | no | Ported optional field from original YAML |
| ulm_custom_card_esh_room_light_entity | no | Ported optional field from original YAML |
| ulm_custom_popup | no | Ported optional field from original YAML |
| ulm_popup_cover_entity | no | Ported optional field from original YAML |
| ulm_popup_light_entity | no | Ported optional field from original YAML |
| ulm_popup_thermostat_entity | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_esh_room.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_esh_room
```

New:
```yaml
type: custom:ulm-custom-card-esh-room-card
entity: entity.example
```
