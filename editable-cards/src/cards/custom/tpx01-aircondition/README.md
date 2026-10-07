---
title: Custom-card "AirCondition"
hide:
  - toc
---

# Custom-card "AirCondition"

Lit port of Minimalist `custom_card_tpx01_aircondition` (`custom_card_tpx01_aircondition_with_buttons`).

## Credits

Author: tpx01 - 2021  
Version: 1.0.0

## New card type

```yaml
type: custom:ulm-custom-card-tpx01-aircondition-card
entity: climate.livingroom
name: A/C Livingroom
# temp_step: 0.5   # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom AirCondition**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Climate / AC entity |
| name | no | Display name (docs marked required) |
| temp_step | no | ± step; else entity `target_temp_step`, else `0.5` |

### Layout

1. **Header** — mode icon + name/state + power widget  
   - Off → `mdi:power` sets `hvac_mode: cool`  
   - On → `mdi:power-off` sets `hvac_mode: off`  
   - Icon blue when state ≠ `off`
2. **Controls** — minus / target °C / plus via `climate.set_temperature`

### Mode icons

| State | Icon |
| --- | --- |
| dry | `mdi:water` |
| heat | `mdi:radiator` |
| cool | `mdi:snowflake` |
| fan_only | `mdi:fan` |
| other | `mdi:air-conditioner` |

## Legacy YAML

- `custom_card_tpx01_aircondition.yaml`  
  (`custom_card_tpx01_aircondition` + `custom_card_tpx01_aircondition_with_buttons`)

Original minus/plus called `script.decrease_climate_temperature` / `script.increment_climate_temperature`; the Lit port uses `climate.set_temperature` directly.
