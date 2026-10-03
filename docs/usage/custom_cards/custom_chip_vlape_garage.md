---
title: Chip vlape garage
hide:
  - toc
---

# Chip vlape garage

Editable Home Assistant card port of the Minimalist custom card `custom_chip_vlape_garage`.

## Credits

Original author: Vincent Lape - 2023 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-chip-vlape-garage-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Chip vlape garage**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:circle-small`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_chip_vlape_garage.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_chip_vlape_garage
```

New:
```yaml
type: custom:ulm-custom-chip-vlape-garage-card
entity: entity.example
```
