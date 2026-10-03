---
title: nik tablet
hide:
  - toc
---

# nik tablet

Editable Home Assistant card port of the Minimalist custom card `custom_card_nik_tablet`.

## Credits

Original author: Nik - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-nik-tablet-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_bar_card_nik_tablet_card_entity: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom nik tablet**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_generic_name | no | Ported optional field from original YAML |
| ulm_card_input_boolean_icon | no | Ported optional field from original YAML |
| ulm_card_input_boolean_name | no | Ported optional field from original YAML |
| ulm_custom_bar_card_nik_tablet_card_entity | no | Ported optional field from original YAML |
| ulm_custom_bar_card_nik_tablet_card_indicator | no | Ported optional field from original YAML |
| ulm_custom_bar_card_nik_tablet_card_name | no | Ported optional field from original YAML |
| ulm_custom_bar_card_nik_tablet_card_value | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_battery | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_battery_name | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_button1 | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_button2 | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_button3 | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_main | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_maintenance | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_name | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_par1 | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_par1_name | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_par2 | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_par2_name | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_par3 | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_par3_name | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_reload | no | Ported optional field from original YAML |
| ulm_custom_card_nik_tablet_restart | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_nik_tablet.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_nik_tablet
```

New:
```yaml
type: custom:ulm-custom-card-nik-tablet-card
entity: entity.example
```
