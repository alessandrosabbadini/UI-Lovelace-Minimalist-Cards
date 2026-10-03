---
title: bar card
hide:
  - toc
---

# bar card

Editable Home Assistant card port of the Minimalist custom card `custom_card_bar_card`.

## Credits

Original author: rphlwnk - 2021 Version: 1.0.0 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-bar-card-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom bar card**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_generic_icon | no | Ported optional field from original YAML |
| ulm_card_generic_name | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_color | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_icon | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_icon_color | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_indicator | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_max | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_min | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_name | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_show_icon | no | Ported optional field from original YAML |
| ulm_custom_card_bar_card_value | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_bar_card.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_bar_card
```

New:
```yaml
type: custom:ulm-custom-card-bar-card-card
entity: entity.example
```
