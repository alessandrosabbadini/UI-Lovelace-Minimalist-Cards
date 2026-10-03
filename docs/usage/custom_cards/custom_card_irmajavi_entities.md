---
title: irmajavi entities
hide:
  - toc
---

# irmajavi entities

Editable Home Assistant card port of the Minimalist custom card `custom_card_irmajavi_entities`.

## Credits

Original author: irmajavi - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-irmajavi-entities-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_irmajavi_entities_entity_1: # optional
ulm_custom_card_irmajavi_entities_entity_2: # optional
ulm_custom_card_irmajavi_entities_entity_3: # optional
ulm_custom_card_irmajavi_entities_entity_4: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom irmajavi entities**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_irmajavi_entities | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_entity_1 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_entity_2 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_entity_3 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_entity_4 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_icon | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_name | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_name_1 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_name_2 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_name_3 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_entities_name_4 | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_irmajavi_entities.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_irmajavi_entities
```

New:
```yaml
type: custom:ulm-custom-card-irmajavi-entities-card
entity: entity.example
```
