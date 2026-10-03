---
title: Chip moon
hide:
  - toc
---

# Chip moon

Editable Home Assistant card port of the Minimalist custom card `custom_chip_moon`.

## Credits

Original author: JStaegerino - 2025

## New card type

```yaml
type: custom:ulm-custom-chip-moon-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Chip moon**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:circle-small`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |


## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_chip_moon.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_chip_moon
```

New:
```yaml
type: custom:ulm-custom-chip-moon-card
entity: entity.example
```
