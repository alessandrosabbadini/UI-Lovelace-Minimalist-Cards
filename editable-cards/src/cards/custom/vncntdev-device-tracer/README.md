---
title: vncntdev device tracer
hide:
  - toc
---

# vncntdev device tracer

Editable Home Assistant card port of the Minimalist custom card `custom_card_vncntdev_device_tracer`.

## Credits

Original author: vncnt.dev - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-vncntdev-device-tracer-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom vncntdev device tracer**.

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
- `vncntdev_card_device_tracer.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_vncntdev_device_tracer
```

New:
```yaml
type: custom:ulm-custom-card-vncntdev-device-tracer-card
entity: entity.example
```
