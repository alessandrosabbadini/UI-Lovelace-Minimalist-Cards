---
title: Custom-card "Lock"
hide:
  - toc
---

# Custom-card "Lock"

Lit port of Minimalist `custom_card_eraycetinay_lock` — lock/unlock card with optional battery and door-open warning badges.

## Credits

Author: eraycetinay - 2022  
Version: 0.0.3  
Contributor: Sisimomo (battery + door-open warnings)

## New card type

```yaml
type: custom:ulm-custom-card-eraycetinay-lock-card
entity: lock.door_lock
name: Door Lock
icon: mdi:lock
tap_control: true
only_open: false
battery_level: sensor.door_battery
battery_warning: 20
battery_warning_low: 5
battery_sensor_binary: false
battery_sensor_binary_low_state: on
door_open: binary_sensor.door_open
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Lock**.

## Variables

| Variable | Maps from | Default |
| --- | --- | --- |
| entity | lock entity | — |
| name / icon | card fields | entity attrs |
| tap_control | `ulm_custom_card_eraycetinay_lock_tap_control` | `false` |
| only_open | `ulm_custom_card_eraycetinay_lock_only_open` | `false` |
| battery_level | `ulm_custom_card_eraycetinay_lock_battery_level` | — |
| battery_warning | `…_battery_warning` | `20` |
| battery_warning_low | `…_battery_warning_low` | `5` |
| battery_sensor_binary | `…_battery_sensor_binary` | `false` |
| battery_sensor_binary_low_state | `…_battery_sensor_binary_low_state` | `on` |
| door_open | `ulm_custom_card_eraycetinay_lock_door_open` | — |

### Colors

- **locked / closed / locking** → green
- **unlocked / open / opened / unlocking** → yellow
- other → grey

### Tap

- `tap_control: false` → more-info
- `tap_control: true` + `only_open` → `lock.open`
- `tap_control: true` → unlock when locked, lock when unlocked

## Legacy YAML

- `custom_card_eraycetinay_lock.yaml`
