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
entity: camera.front_door
show_title: true
name: Front door
label: Live
icon: mdi:cctv
aspect_ratio: "16:9"
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom camera**.

## Behaviour

- Optional header (`show_title` / original `ulm_custom_card_camera_title`): blue icon chip + name + label.
- Body: nested core `picture-entity` with `camera_view: live`.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Camera entity |
| show_title | no | Show header (maps from `ulm_custom_card_camera_title`) |
| name | no | Header name (`ulm_custom_card_camera_name`) |
| label | no | Header label (`ulm_custom_card_camera_label`) |
| icon | no | Header icon (default entity icon / `mdi:cctv`) |
| aspect_ratio | no | picture-entity ratio (default `16:9`) |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_camera.yaml`
