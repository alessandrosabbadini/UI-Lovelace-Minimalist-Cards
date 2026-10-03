---
title: Chip group counter
hide:
  - toc
---

# Chip group counter

Editable Home Assistant card port of the Minimalist custom card `custom_chip_group_counter`.

## Credits

Original author: Albin Médoc - 2023 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-chip-group-counter-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Chip group counter**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:circle-small`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_chip_group_counter_color | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_count_state | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_entities_active | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_hide_if_zero | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_icon_multiple | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_icon_one | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_icon_zero | no | Ported optional field from original YAML |
| ulm_custom_chip_group_counter_type | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_chip_group_counter.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_chip_group_counter
```

New:
```yaml
type: custom:ulm-custom-chip-group-counter-card
entity: entity.example
```
