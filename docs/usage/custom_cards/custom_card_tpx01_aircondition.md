---
title: Custom-card "AirCondition"
hide:
  - toc
---

# Custom-card "AirCondition"

Editable Home Assistant card port of the Minimalist custom card `custom_card_tpx01_aircondition`.

## Credits

Author: tpx01 - 2021  
Version: 1.0.0

## New card type

```yaml
type: custom:ulm-custom-card-tpx01-aircondition-card
entity: climate.livingroom
name: A/C Livingroom
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom AirCondition**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Climate entity |
| name | no | Display name |
| temp_step | no | ± temperature step |

Power toggles cool/off. Minus/plus adjust target temperature via `climate.set_temperature`.

## Legacy YAML

- `custom_card_tpx01_aircondition.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_tpx01_aircondition_with_buttons
variables:
  entity: climate.livingroom
  name: A/C Livingroom
```

New:
```yaml
type: custom:ulm-custom-card-tpx01-aircondition-card
entity: climate.livingroom
name: A/C Livingroom
```
