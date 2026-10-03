---
title: person info
hide:
  - toc
---

# person info

Editable Home Assistant card port of the Minimalist custom card `custom_card_person_info`.

## Credits

Original author: Jordan Janzen <@jordandrako> (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-person-info-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_person_battery_entity: # optional
ulm_card_person_battery_state_entity: # optional
ulm_card_person_commute_entity: # optional
ulm_card_person_commute_icon: # optional
ulm_card_person_cummute_icon: # optional
ulm_card_person_driving_entity: # optional
ulm_card_person_entity: # optional
ulm_card_person_use_entity_picture: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom person info**.

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
| ulm_card_person_battery_entity | no | Ported optional field from original YAML |
| ulm_card_person_battery_state_entity | no | Ported optional field from original YAML |
| ulm_card_person_commute_entity | no | Ported optional field from original YAML |
| ulm_card_person_commute_icon | no | Ported optional field from original YAML |
| ulm_card_person_cummute_icon | no | Ported optional field from original YAML |
| ulm_card_person_driving_entity | no | Ported optional field from original YAML |
| ulm_card_person_entity | no | Ported optional field from original YAML |
| ulm_card_person_use_entity_picture | no | Ported optional field from original YAML |
| ulm_card_person_zone1 | no | Ported optional field from original YAML |
| ulm_card_person_zone2 | no | Ported optional field from original YAML |
| ulm_multiline | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_person_info.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_person_info
```

New:
```yaml
type: custom:ulm-custom-card-person-info-card
entity: entity.example
```
