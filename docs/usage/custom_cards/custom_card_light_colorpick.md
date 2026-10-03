---
title: light colorpick
hide:
  - toc
---

# light colorpick

Editable Home Assistant card port of the Minimalist custom card `custom_card_light_colorpick`.

## Credits

Original author: 13robin37 - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-light-colorpick-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_light_colorpick_name: # optional
ulm_card_light_colorpick_transition: # optional
ulm_card_light_slider_horizontal_name: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom light colorpick**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_light_colorpick_name | no | Ported optional field from original YAML |
| ulm_card_light_colorpick_transition | no | Ported optional field from original YAML |
| ulm_card_light_slider_horizontal_name | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `card_light_colorpick.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_light_colorpick
```

New:
```yaml
type: custom:ulm-custom-card-light-colorpick-card
entity: entity.example
```
