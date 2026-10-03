---
title: haven washer
hide:
  - toc
---

# haven washer

Editable Home Assistant card port of the Minimalist custom card `custom_card_haven_washer`.

## Credits

Original author: Cruguah - 2023 (v1.0.3)

## New card type

```yaml
type: custom:ulm-custom-card-haven-washer-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom haven washer**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_washer_delayed_start | no | Ported optional field from original YAML |
| ulm_custom_card_washer_delayed_starttime | no | Ported optional field from original YAML |
| ulm_custom_card_washer_job_progress | no | Ported optional field from original YAML |
| ulm_custom_card_washer_job_state | no | Ported optional field from original YAML |
| ulm_custom_card_washer_job_states | no | Ported optional field from original YAML |
| ulm_custom_card_washer_label_configuring | no | Ported optional field from original YAML |
| ulm_custom_card_washer_label_idle | no | Ported optional field from original YAML |
| ulm_custom_card_washer_label_running | no | Ported optional field from original YAML |
| ulm_custom_card_washer_machine_state | no | Ported optional field from original YAML |
| ulm_custom_card_washer_machine_stop_state | no | Ported optional field from original YAML |
| ulm_custom_card_washer_pause_action | no | Ported optional field from original YAML |
| ulm_custom_card_washer_power | no | Ported optional field from original YAML |
| ulm_custom_card_washer_remote_control | no | Ported optional field from original YAML |
| ulm_custom_card_washer_start_action | no | Ported optional field from original YAML |
| ulm_custom_card_washer_stop_action | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_haven_washer.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_haven_washer
```

New:
```yaml
type: custom:ulm-custom-card-haven-washer-card
entity: entity.example
```
