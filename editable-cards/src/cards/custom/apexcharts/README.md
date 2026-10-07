---
title: apexcharts
hide:
  - toc
---

# apexcharts

Editable Home Assistant card port of the Minimalist custom card `custom_card_apexcharts`.

## Credits

Original author: AndyVRD - 2022 (v1.0.0)

## Requirements

HACS frontend: **apexcharts-card** (RomRider) — same dependency as the original YAML template.

## New card type

```yaml
type: custom:ulm-custom-card-apexcharts-card
chart_type: donut # line | scatter | pie | donut | radialBar
graph_span: 1d
entity_1: sensor.outside_temperature
entity_2: sensor.outside_humidity
entity_3: sensor.power_consumption
name_1: Google
color_1: blue
max_1: 300
# …same for entity_2 / entity_3
```

Nested original-style variables are also accepted:

```yaml
type: custom:ulm-custom-card-apexcharts-card
chart_type: donut
graph_span: 1d
entity_1:
  entity_id: sensor.google
  name: Google
  color: blue
  max_value: 300
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom apexcharts**.

## Behaviour

- Left column: three generic-swap style rows (name + state, colored icon).
- Right column: nested `custom:apexcharts-card` with `chart_type` / `graph_span` / series colors & max.
- `max_*` maps to series `max` (used by `radialBar`).

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| chart_type | yes | line, scatter, pie, donut, radialBar |
| graph_span | no | e.g. 1d, 1h, 12min |
| entity_1 | yes | First series (string or nested object) |
| entity_2 / entity_3 | no | Additional series |
| name_1..3 / icon_1..3 / color_1..3 | no | Overrides |
| max_1..3 | no | Series max (default 100) |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `apexcharts.yaml`
