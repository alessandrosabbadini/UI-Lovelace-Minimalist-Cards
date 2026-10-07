---
title: eraycetinay elapsed time
hide:
  - toc
---

# eraycetinay elapsed time

Editable Home Assistant card port of the Minimalist custom card `custom_card_eraycetinay_elapsed_time`.

## Credits

Original author: eraycetinay - 2022 (v0.0.1)

## New card type

```yaml
type: custom:ulm-custom-card-eraycetinay-elapsed-time-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom eraycetinay elapsed time**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_eraycetinay_elapsed_time_ago | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_day | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_days | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_hour | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_hours | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_justnow | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_minute | no | Ported optional field from original YAML |
| ulm_custom_card_eraycetinay_elapsed_time_minutes | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_eraycetinay_elapsed_time.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_eraycetinay_elapsed_time
```

New:
```yaml
type: custom:ulm-custom-card-eraycetinay-elapsed-time-card
entity: entity.example
```
