---
title: imswel person
hide:
  - toc
---

# imswel person

Editable Home Assistant card port of the Minimalist custom card `custom_card_imswel_person`.

## Credits

Original author: imswel - 2022 (v1.0.2)

## New card type

```yaml
type: custom:ulm-custom-card-imswel-person-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_imswel_person_entity: # optional
ulm_card_imswel_person_findmy_script: # optional
ulm_card_imswel_person_gps_tracker: # optional
ulm_card_imswel_person_use_entity_picture: # optional
ulm_card_imswel_person_wifi_tracker: # optional
ulm_custom_card_imswel_person_findmy: # optional
ulm_custom_card_imswel_person_home: # optional
ulm_custom_card_imswel_person_language_variables: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom imswel person**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_imswel_person_entity | no | Ported optional field from original YAML |
| ulm_card_imswel_person_findmy_script | no | Ported optional field from original YAML |
| ulm_card_imswel_person_gps_tracker | no | Ported optional field from original YAML |
| ulm_card_imswel_person_use_entity_picture | no | Ported optional field from original YAML |
| ulm_card_imswel_person_wifi_tracker | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_person_findmy | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_person_home | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_person_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_person_not_home | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_unavailable | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_imswel_person.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_imswel_person
```

New:
```yaml
type: custom:ulm-custom-card-imswel-person-card
entity: entity.example
```
