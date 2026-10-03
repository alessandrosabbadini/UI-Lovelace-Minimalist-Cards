---
title: Chip myenedis
hide:
  - toc
---

# Chip myenedis

Editable Home Assistant card port of the Minimalist custom card `custom_chip_myenedis`.

## Credits

Original author: acesyde - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-chip-myenedis-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Chip myenedis**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:circle-small`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_chip_separate_hp_hc | no | Ported optional field from original YAML |
| ulm_chip_unit_of_measurement | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_chip_myenedis.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_chip_myenedis
```

New:
```yaml
type: custom:ulm-custom-chip-myenedis-card
entity: entity.example
```
