---
title: nik clock
hide:
  - toc
---

# nik clock

Editable Home Assistant card port of the Minimalist custom card `custom_card_nik_clock`.

## Credits

Original author: Nik - 2022 Version: 1.0.0 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-nik-clock-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_nik_clock_switch: # optional
ulm_custom_card_nik_clock_switch_enable: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom nik clock**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_nik_clock_switch | no | Ported optional field from original YAML |
| ulm_custom_card_nik_clock_switch_enable | no | Ported optional field from original YAML |
| ulm_language | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_nik_clock.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_nik_clock
```

New:
```yaml
type: custom:ulm-custom-card-nik-clock-card
entity: entity.example
```
