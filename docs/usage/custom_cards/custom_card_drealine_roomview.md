---
title: drealine roomview
hide:
  - toc
---

# drealine roomview

Editable Home Assistant card port of the Minimalist custom card `custom_card_drealine_roomview`.

## Credits

Original author: Drealine - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-drealine-roomview-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom drealine roomview**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_actions_card | no | Ported optional field from original YAML |
| ulm_card_tap_action | no | Ported optional field from original YAML |
| ulm_card_tap_navigate_path | no | Ported optional field from original YAML |
| ulm_input_select | no | Ported optional field from original YAML |
| ulm_input_select_option | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_drealine_roomview.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_drealine_roomview
```

New:
```yaml
type: custom:ulm-custom-card-drealine-roomview-card
entity: entity.example
```
