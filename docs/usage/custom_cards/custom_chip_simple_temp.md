---
title: Chip simple temp
hide:
  - toc
---

# Chip simple temp

Editable Home Assistant card port of the Minimalist custom card `custom_chip_simple_temp`.

## Credits

Original author: JStaegerino - 2025

## New card type

```yaml
type: custom:ulm-custom-chip-simple-temp-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Chip simple temp**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:circle-small`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_language | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_chip_simple_temp.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_chip_simple_temp
```

New:
```yaml
type: custom:ulm-custom-chip-simple-temp-card
entity: entity.example
```
