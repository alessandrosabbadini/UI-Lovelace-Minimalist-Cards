---
title: person info small
hide:
  - toc
---

# person info small

Editable Home Assistant card port of the Minimalist custom card `custom_card_person_info_small`.

## Credits

Original author: Imaginelenses <@imaginelenses> (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-person-info-small-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_person_battery_entity: # optional
ulm_card_person_battery_state_entity: # optional
ulm_card_person_driving_entity: # optional
ulm_card_person_entity: # optional
ulm_card_person_icon: # optional
ulm_card_person_use_entity_picture: # optional
ulm_card_person_zone1: # optional
ulm_card_person_zone2: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom person info small**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_address | no | Ported optional field from original YAML |
| ulm_address_locality | no | Ported optional field from original YAML |
| ulm_card_battery_battery_level_danger | no | Ported optional field from original YAML |
| ulm_card_battery_battery_level_warning | no | Ported optional field from original YAML |
| ulm_card_battery_color_battery_level_danger | no | Ported optional field from original YAML |
| ulm_card_battery_color_battery_level_ok | no | Ported optional field from original YAML |
| ulm_card_battery_color_battery_level_warning | no | Ported optional field from original YAML |
| ulm_card_person_battery_entity | no | Ported optional field from original YAML |
| ulm_card_person_battery_state_entity | no | Ported optional field from original YAML |
| ulm_card_person_driving_entity | no | Ported optional field from original YAML |
| ulm_card_person_entity | no | Ported optional field from original YAML |
| ulm_card_person_icon | no | Ported optional field from original YAML |
| ulm_card_person_use_entity_picture | no | Ported optional field from original YAML |
| ulm_card_person_zone1 | no | Ported optional field from original YAML |
| ulm_card_person_zone2 | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_person_info_small.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_person_info_small
```

New:
```yaml
type: custom:ulm-custom-card-person-info-small-card
entity: entity.example
```
