---
title: alarm time
hide:
  - toc
---

# alarm time

Editable Home Assistant card port of the Minimalist custom card `custom_card_alarm_time`.

## Credits

Original author: benbur - 2023 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-alarm-time-card
entity: input_boolean.alarm_weekday
datetime: input_datetime.alarm_weekday_time
name: Weekday alarm
icon: mdi:alarm
color: blue
force_background_color: false
horizontal: false
collapse: false
step: 15
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom alarm time**.

## Behaviour

- Icon toggles the alarm entity; name/label open more-info.
- When **on**, shows time controls: `−` / time / `+` (step minutes).
- Time tap opens more-info on the `input_datetime`.
- `collapse`: hide time row when off.
- `horizontal`: icon+name beside time (no +/- buttons).
- `force_background_color`: tint card when on.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | `input_boolean` / `switch` toggle |
| datetime | yes | `input_datetime` with time |
| name | no | Override friendly name |
| icon | no | Default `mdi:alarm` |
| color | no | Theme color (default blue) |
| force_background_color | no | Colored card when on |
| horizontal | no | Side-by-side layout |
| collapse | no | Hide controls when off |
| step | no | Minutes per tap (default 15) |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `card_alarm_time.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: card_alarm_time
entity: input_boolean.alarm
variables:
  ulm_card_alarm_time_datetime: input_datetime.alarm_time
```

New:
```yaml
type: custom:ulm-custom-card-alarm-time-card
entity: input_boolean.alarm
datetime: input_datetime.alarm_time
```
