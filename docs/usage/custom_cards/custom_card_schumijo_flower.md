---
title: schumijo flower
hide:
  - toc
---

# schumijo flower

Editable Home Assistant card port of the Minimalist custom card `custom_card_schumijo_flower`.

## Credits

Original author: schumijo - 2021 (v2.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-schumijo-flower-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_flower_entity: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom schumijo flower**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_flower_entity | no | Ported optional field from original YAML |
| ulm_card_flower_name | no | Ported optional field from original YAML |
| ulm_card_flower_show_bars | no | Ported optional field from original YAML |
| ulm_card_flower_species | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_flower_correct | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_flower_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_flower_problem | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_schumijo_flower.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_schumijo_flower
```

New:
```yaml
type: custom:ulm-custom-card-schumijo-flower-card
entity: entity.example
```
