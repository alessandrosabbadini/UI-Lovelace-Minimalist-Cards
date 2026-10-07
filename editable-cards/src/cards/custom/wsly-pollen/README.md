---
title: wsly pollen
hide:
  - toc
---

# wsly pollen

Editable Home Assistant card port of the Minimalist custom card `custom_card_wsly_pollen`.

## Credits

Original author: wsly - 05/2022 (v1.0.1)

## New card type

```yaml
type: custom:ulm-custom-card-wsly-pollen-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom wsly pollen**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |


## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_wsly_pollen.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_wsly_pollen
```

New:
```yaml
type: custom:ulm-custom-card-wsly-pollen-card
entity: entity.example
```
