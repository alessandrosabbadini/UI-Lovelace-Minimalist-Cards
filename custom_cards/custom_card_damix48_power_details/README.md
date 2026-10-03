---
title: damix48 power details
hide:
  - toc
---

# damix48 power details

Editable Home Assistant card port of the Minimalist custom card `custom_card_damix48_power_details`.

## Credits

Original author: Damix48 (v0.1.1)

## New card type

```yaml
type: custom:ulm-custom-card-damix48-power-details-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_power_details_entity: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom damix48 power details**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_generic_swap_name | no | Ported optional field from original YAML |
| ulm_card_power_details_24hour | no | Ported optional field from original YAML |
| ulm_card_power_details_entity | no | Ported optional field from original YAML |
| ulm_card_power_details_height | no | Ported optional field from original YAML |
| ulm_card_power_details_hours | no | Ported optional field from original YAML |
| ulm_card_power_details_name | no | Ported optional field from original YAML |
| ulm_card_power_details_thresholds | no | Ported optional field from original YAML |
| ulm_custom_card_damix48_power_details_hour | no | Ported optional field from original YAML |
| ulm_custom_card_damix48_power_details_hours | no | Ported optional field from original YAML |
| ulm_custom_card_damix48_power_details_in_the_last | no | Ported optional field from original YAML |
| ulm_custom_card_damix48_power_details_in_the_lasts | no | Ported optional field from original YAML |
| ulm_custom_card_damix48_power_details_language_variables | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_damix48_power_details.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_damix48_power_details
```

New:
```yaml
type: custom:ulm-custom-card-damix48-power-details-card
entity: entity.example
```
