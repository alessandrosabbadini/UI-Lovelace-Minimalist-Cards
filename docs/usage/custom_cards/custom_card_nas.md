---
title: nas
hide:
  - toc
---

# nas

Editable Home Assistant card port of the Minimalist custom card `custom_card_nas`.

## Credits

Original author: tben - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-nas-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_nas_sensor: # optional
ulm_custom_card_nas_text: # optional
ulm_custom_card_nas_unit: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom nas**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_nas_sensor | no | Ported optional field from original YAML |
| ulm_custom_card_nas_text | no | Ported optional field from original YAML |
| ulm_custom_card_nas_unit | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_nas.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_nas
```

New:
```yaml
type: custom:ulm-custom-card-nas-card
entity: entity.example
```
