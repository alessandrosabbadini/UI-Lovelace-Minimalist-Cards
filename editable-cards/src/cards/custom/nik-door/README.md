---
title: Minimal Door Lock Card
hide:
  - toc
---

# Custom-card "Minimal Door Lock"

Lit port of Minimalist `custom_card_nik_door` — door state + battery badge + open/lock widgets (double-tap to unlock controls).

## Credits

Author: Nik - 2022  
Version: 2.0.0

## New card type

```yaml
type: custom:ulm-custom-card-nik-door-card
entity: sensor.nuki_blindato_door_security_state
name: Blindato
lock_entity: lock.nuki_blindato_lock
battery_entity: sensor.blindato_battery
require_double_tap_unlock: true
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Minimal Door Lock**.

## Variables

| Variable | Maps from | Required |
| --- | --- | --- |
| entity | door security / open-close sensor | yes |
| name | `ulm_custom_card_entity_1_name` | no |
| lock_entity | `ulm_custom_card_entity_1_lock` | yes |
| battery_entity | `ulm_custom_card_entity_1_lock_battery` | yes |
| require_double_tap_unlock | button-card `lock.unlock: double_tap` | no (default true) |

### Widget colors (by door sensor state)

| State | Open widget | Lock widget |
| --- | --- | --- |
| `Open` | red | grey |
| `Closed & Unlocked` | yellow | grey |
| `Closed & Locked` | grey | green |

### Battery badge

- ≤ 40% → red background, `mdi:battery-20`
- else → green, icon by level (100 / 70 / 60 / 50)

### Safety

Double-tap the card to unlock the bottom controls for 5 seconds (same idea as the original card lock).

## Legacy YAML

- `custom_card_nik_door.yaml`
