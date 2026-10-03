---
title: ristou person
hide:
  - toc
---

# ristou person

Editable Home Assistant card port of the Minimalist custom card `custom_card_ristou_person`.

## Credits

Original author: Ristou - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-ristou-person-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_ristou_camera_entity_dark: # optional
ulm_custom_card_ristou_camera_entity_light: # optional
ulm_custom_card_ristou_person_driving: # optional
ulm_custom_card_ristou_person_driving_entity: # optional
ulm_custom_card_ristou_person_language_variables: # optional
ulm_custom_card_ristou_person_language_variables1: # optional
ulm_custom_card_ristou_use_entity_picture: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom ristou person**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_actions_card | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_camera_entity_dark | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_camera_entity_light | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_find_device_script | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_icon | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_map_aspect_ratio | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_map_default_zoom | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_map_enable | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_map_hours_to_show | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_name | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_person_driving | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_person_driving_entity | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_person_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_person_language_variables1 | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_use_badge | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_use_entity_picture | no | Ported optional field from original YAML |
| ulm_custom_card_ristou_zones | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_ristou_person.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_ristou_person
```

New:
```yaml
type: custom:ulm-custom-card-ristou-person-card
entity: entity.example
```
