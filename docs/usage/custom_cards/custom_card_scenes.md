---
title: Scenes Card
hide:
  - toc
---

# Custom-card "Scenes Card"

Editable Home Assistant card port of the Minimalist custom card `custom_card_scenes`.

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
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom scenes**.

## Variables

Each of `entity_1` … `entity_5`:

| Field | Required | Notes |
| --- | --- | --- |
| entity_id | no | scene / script / automation / switch / … |
| name | no | Label under the icon |
| icon | no | Default `mdi:help-circle-outline` |
| icon_color | no | `gray` = theme tint; else ULM theme color |
| bg_color | no | Icon circle background |

Tap: `automation.trigger` for automations, otherwise `homeassistant.turn_on`.

## Legacy YAML

Original button-card YAML was removed; Lit source and README live in `editable-cards/src/cards/custom/scenes/`:
- `card_scenes.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: card_scenes
variables:
  entity_1:
    entity_id: script.movie_time
    name: Movie
    icon: mdi:movie-open
    icon_color: blue
    bg_color: blue
```

New:
```yaml
type: custom:ulm-custom-card-scenes-card
entity_1:
  entity_id: script.movie_time
  name: Movie
  icon: mdi:movie-open
  icon_color: blue
  bg_color: blue
```
