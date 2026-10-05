---
title: Scenes Card
hide:
  - toc
---

# Custom-card "Scenes Card"

Lit port of Minimalist `custom_card_scenes` — a row of up to 5 scene / script / automation pills.

## Credits

Original author: sildehoop - 2021 (v1.2.0)

## New card type

```yaml
type: custom:ulm-custom-card-scenes-card
entity_1:
  entity_id: script.movie_time
  name: Movie
  icon: mdi:movie-open
  icon_color: blue
  bg_color: blue
entity_2:
  entity_id: script.romantic_lights
  name: Romance
  icon: mdi:candle
  icon_color: pink
  bg_color: pink
entity_3:
  entity_id: automation.ulm_set_minimalist_desktop_theme_on_start
  name: Theme
  icon: mdi:palette
  icon_color: purple
  bg_color: purple
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom scenes**.

## Variables

Each of `entity_1` … `entity_5` is an object:

| Field | Required | Notes |
| --- | --- | --- |
| entity_id | no | scene / script / automation / switch / … |
| name | no | Label under the icon (default friendly name or `n/a`) |
| icon | no | Default `mdi:help-circle-outline` |
| icon_color | no | `gray` (theme tint) or yellow/blue/green/red/pink/purple/grey |
| bg_color | no | Background of the 42px icon circle (same palette) |

### Tap action

- `automation.*` → `automation.trigger`
- everything else → `homeassistant.turn_on`

### Flat keys (optional)

`entity_1: script.movie_time` plus `name_1` / `icon_1` / `icon_color_1` / `bg_color_1` are also accepted.

## Legacy YAML

- `card_scenes.yaml` (`card_scenes` + `card_scenes_pill`)
