---
title: neekster update
hide:
  - toc
---

# neekster update

Editable Home Assistant card port of the Minimalist custom card `custom_card_neekster_update`.

## Credits

Original author: Neekster - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-neekster-update-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_neekster_update_collapsible: # optional
ulm_card_neekster_update_enable_controls: # optional
ulm_card_neekster_update_horizontal: # optional
ulm_card_neekster_update_icon: # optional
ulm_card_neekster_update_narrow_buttons: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom neekster update**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_neekster_update_collapsible | no | Ported optional field from original YAML |
| ulm_card_neekster_update_enable_controls | no | Ported optional field from original YAML |
| ulm_card_neekster_update_horizontal | no | Ported optional field from original YAML |
| ulm_card_neekster_update_icon | no | Ported optional field from original YAML |
| ulm_card_neekster_update_narrow_buttons | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_neekster_update.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_neekster_update
```

New:
```yaml
type: custom:ulm-custom-card-neekster-update-card
entity: entity.example
```
