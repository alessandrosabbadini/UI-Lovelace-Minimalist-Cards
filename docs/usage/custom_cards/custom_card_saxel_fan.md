---
title: saxel fan
hide:
  - toc
---

# saxel fan

Editable Home Assistant card port of the Minimalist custom card `custom_card_saxel_fan`.

## Credits

Original author: saxel - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-saxel-fan-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_fan_horizontal: # optional
ulm_card_fan_hum_attribute: # optional
ulm_card_fan_temp_attribute: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom saxel fan**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_button_icon | no | Ported optional field from original YAML |
| ulm_button_service | no | Ported optional field from original YAML |
| ulm_card_fan_horizontal | no | Ported optional field from original YAML |
| ulm_card_fan_hum_attribute | no | Ported optional field from original YAML |
| ulm_card_fan_temp_attribute | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_off | no | Ported optional field from original YAML |
| ulm_on | no | Ported optional field from original YAML |
| ulm_show_button | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_unavailable | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_saxel_fan.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_saxel_fan
```

New:
```yaml
type: custom:ulm-custom-card-saxel-fan-card
entity: entity.example
```
