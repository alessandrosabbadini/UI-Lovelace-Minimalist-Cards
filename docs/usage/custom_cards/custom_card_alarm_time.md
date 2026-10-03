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
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom alarm time**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_alarm_time_collapse | no | Ported optional field from original YAML |
| ulm_card_alarm_time_color | no | Ported optional field from original YAML |
| ulm_card_alarm_time_datetime | no | Ported optional field from original YAML |
| ulm_card_alarm_time_force_background_color | no | Ported optional field from original YAML |
| ulm_card_alarm_time_horizontal | no | Ported optional field from original YAML |
| ulm_card_alarm_time_icon | no | Ported optional field from original YAML |
| ulm_card_alarm_time_name | no | Ported optional field from original YAML |
| ulm_card_alarm_time_step | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `card_alarm_time.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_alarm_time
```

New:
```yaml
type: custom:ulm-custom-card-alarm-time-card
entity: entity.example
```
