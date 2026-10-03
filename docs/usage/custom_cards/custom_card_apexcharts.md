---
title: apexcharts
hide:
  - toc
---

# apexcharts

Editable Home Assistant card port of the Minimalist custom card `custom_card_apexcharts`.

## Credits

Original author: AndyVRD - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-apexcharts-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom apexcharts**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_generic_swap_icon | no | Ported optional field from original YAML |
| ulm_card_generic_swap_name | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `apexcharts.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_apexcharts
```

New:
```yaml
type: custom:ulm-custom-card-apexcharts-card
entity: entity.example
```
