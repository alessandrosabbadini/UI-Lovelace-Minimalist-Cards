---
title: senoro win
hide:
  - toc
---

# senoro win

Editable Home Assistant card port of the Minimalist custom card `custom_card_senoro_win`.

## Credits

Original author: T1ppes - 2026

## New card type

```yaml
type: custom:ulm-custom-card-senoro-win-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_senoro_win_entity: # optional
ulm_custom_card_senoro_win_locked: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom senoro win**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_senoro_win_battery_is_at | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_battery_level | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_battery_warning | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_battery_warning_low | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_closed | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_color | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_entity | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_force_background_color | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_handle | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_icon | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_locked | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_manipulated | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_name | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_open | no | Ported optional field from original YAML |
| ulm_custom_card_senoro_win_tilted | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_show_last_changed | no | Ported optional field from original YAML |
| ulm_unavailable | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_senoro_win.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_senoro_win
```

New:
```yaml
type: custom:ulm-custom-card-senoro-win-card
entity: entity.example
```
