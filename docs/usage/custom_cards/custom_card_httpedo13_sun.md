---
title: httpedo13 sun
hide:
  - toc
---

# httpedo13 sun

Editable Home Assistant card port of the Minimalist custom card `custom_card_httpedo13_sun`.

## Credits

Original author: httpedo13 - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-httpedo13-sun-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom httpedo13 sun**.

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
- `custom_card_httpedo13_sun.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_httpedo13_sun
```

New:
```yaml
type: custom:ulm-custom-card-httpedo13-sun-card
entity: entity.example
```
