---
title: eraycetinay lock
hide:
  - toc
---

# eraycetinay lock

Editable Home Assistant card port of the Minimalist custom card `custom_card_eraycetinay_lock`.

## Credits

Original author: eraycetinay - 2022 (v0.0.3)

## New card type

```yaml
type: custom:ulm-custom-card-eraycetinay-lock-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_eraycetinay_lock_battery_is_at: # optional
ulm_custom_card_eraycetinay_lock_battery_is_low: # optional
ulm_custom_card_eraycetinay_lock_battery_level: # optional
ulm_custom_card_eraycetinay_lock_battery_sensor_binary: # optional
ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state: # optional
ulm_custom_card_eraycetinay_lock_battery_warning: # optional
ulm_custom_card_eraycetinay_lock_battery_warning_low: # optional
ulm_custom_card_eraycetinay_lock_door_open: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom eraycetinay lock**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_eraycetinay_lock_battery_is_at | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_battery_is_low | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_battery_level | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_battery_sensor_binary | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_battery_warning | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_battery_warning_low | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_door_open | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_jammed | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_locked | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_locked_and_opened | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_locking | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_only_open | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_tap_control | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_unavailable | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_unlocked | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_lock_unlocking | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_eraycetinay_lock.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_eraycetinay_lock
```

New:
```yaml
type: custom:ulm-custom-card-eraycetinay-lock-card
entity: entity.example
```
