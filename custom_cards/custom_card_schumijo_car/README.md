---
title: schumijo car
hide:
  - toc
---

# schumijo car

Editable Home Assistant card port of the Minimalist custom card `custom_card_schumijo_car`.

## Credits

Original author: schumijo - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-schumijo-car-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_schumijo_car_lock: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom schumijo car**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_schumijo_car_energy_level | no | Ported optional field from original YAML |
| ulm_card_schumijo_car_lock | no | Ported optional field from original YAML |
| ulm_card_schumijo_car_name | no | Ported optional field from original YAML |
| ulm_card_schumijo_car_range | no | Ported optional field from original YAML |
| ulm_card_schumijo_car_tracker | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_ca_popup | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_car_default_name | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_car_energy_level | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_car_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_schumijo_car_range | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_schumijo_car.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_schumijo_car
```

New:
```yaml
type: custom:ulm-custom-card-schumijo-car-card
entity: entity.example
```
