---
title: mpse gauge
hide:
  - toc
---

# mpse gauge

Editable Home Assistant card port of the Minimalist custom card `custom_card_mpse_gauge`.

## Credits

Original author: mpse (v0.1.0)

## New card type

```yaml
type: custom:ulm-custom-card-mpse-gauge-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom mpse gauge**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_mpse_gauge_max | no | Ported optional field from original YAML |
| ulm_card_mpse_gauge_min | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_mpse_gauge.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_mpse_gauge
```

New:
```yaml
type: custom:ulm-custom-card-mpse-gauge-card
entity: entity.example
```
