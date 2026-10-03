---
title: paddy waste collection
hide:
  - toc
---

# paddy waste collection

Editable Home Assistant card port of the Minimalist custom card `custom_card_paddy_waste_collection`.

## Credits

Original author: Paddy0174 - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-paddy-waste-collection-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom paddy waste collection**.

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
- `custom_card_paddy_waste_collection.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_paddy_waste_collection
```

New:
```yaml
type: custom:ulm-custom-card-paddy-waste-collection-card
entity: entity.example
```
