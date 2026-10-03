---
title: Chip update
hide:
  - toc
---

# Chip update

Editable Home Assistant card port of the Minimalist custom card `custom_chip_update`.

## Credits

Original author: JeffConrad18 - 2022 (v1.0)

## New card type

```yaml
type: custom:ulm-custom-chip-update-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_chip_update_path: # optional
ulm_no_updates_available: # optional
ulm_updates_available: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Chip update**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:circle-small`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_chip_update_path | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_no_updates_available | no | Ported optional field from original YAML |
| ulm_updates_available | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_chip_update.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_chip_update
```

New:
```yaml
type: custom:ulm-custom-chip-update-card
entity: entity.example
```
