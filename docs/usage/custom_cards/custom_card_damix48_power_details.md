---
title: Custom-card "Power details"
hide:
  - toc
---

# Custom-card "Power details"

Lit port of Minimalist `custom_card_damix48_power_details` — header with period label + nested HACS [mini-graph-card](https://github.com/kalkih/mini-graph-card).

## Credits

Author: Damix48  
Version: 0.1.1

## Requirements

| Component / card | Required | Link |
| --- | --- | --- |
| mini-graph-card | yes | [kalkih/mini-graph-card](https://github.com/kalkih/mini-graph-card) |

## New card type

```yaml
type: custom:ulm-custom-card-damix48-power-details-card
entity: sensor.shellyem_id_channel_1_power
power_entity: sensor.shellyem_id_channel_1_power   # optional; defaults to entity
name: Power
icon: mdi:flash
color: ""                 # empty / none = grey chip; or yellow/blue/…
hours: 2
hour24: true
height: 180
thresholds:
  - value: 0
    color: "#43A047"
  - value: 2500
    color: "#FFA600"
  - value: 3000
    color: "#DB4437"
# Or in the UI editor:
# thresholds_json: '[{"value":0,"color":"#43A047"}]'
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Power details**.

## Variables

| Variable | Maps from | Default |
| --- | --- | --- |
| entity | card entity (required) | — |
| power_entity | `ulm_card_power_details_entity` | same as entity |
| name | `ulm_card_power_details_name` | friendly name |
| color | header icon color | `""` (none/grey) or theme color |
| hours | `ulm_card_power_details_hours` | `2` |
| hour24 | `ulm_card_power_details_24hour` | `false` |
| height | `ulm_card_power_details_height` | `180` |
| thresholds / thresholds_json | `ulm_card_power_details_thresholds` | single `var(--info-color)` |

Subtitle uses HA language (`en`, `it`, `de`, `es`, `fr`, `nl`, `pl`, `sv`): e.g. “In the last 2 hours” / “Nelle ultime 2 ore”.

## Legacy YAML

- `custom_card_damix48_power_details.yaml`
