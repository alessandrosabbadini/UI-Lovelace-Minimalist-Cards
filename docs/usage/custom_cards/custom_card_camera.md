---
title: camera
hide:
  - toc
---

# camera

Editable Home Assistant card port of the Minimalist custom card `custom_card_camera`.

## Credits

Original author: Eltarius, from the script of [Clemalex](https://forum.hacf.fr/t/dashboard-minimalist/5507/183?u=clemalex) - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-camera-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_camera_aspect_ratio: # optional
ulm_custom_card_camera_label: # optional
ulm_custom_card_camera_name: # optional
ulm_custom_card_camera_title: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom camera**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_camera_aspect_ratio | no | Ported optional field from original YAML |
| ulm_custom_card_camera_label | no | Ported optional field from original YAML |
| ulm_custom_card_camera_name | no | Ported optional field from original YAML |
| ulm_custom_card_camera_title | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_camera.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_camera
```

New:
```yaml
type: custom:ulm-custom-card-camera-card
entity: entity.example
```
