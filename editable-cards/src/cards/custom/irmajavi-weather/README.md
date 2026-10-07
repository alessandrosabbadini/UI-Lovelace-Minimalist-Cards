---
title: irmajavi weather
hide:
  - toc
---

# irmajavi weather

Editable Home Assistant card port of the Minimalist custom card `custom_card_irmajavi_weather`.

## Credits

Original author: irmajavi - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-irmajavi-weather-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_irmajavi_weather: # optional
ulm_custom_card_irmajavi_weather_date: # optional
ulm_custom_card_irmajavi_weather_entity_1: # optional
ulm_custom_card_irmajavi_weather_entity_2: # optional
ulm_custom_card_irmajavi_weather_entity_3: # optional
ulm_custom_card_irmajavi_weather_entity_4: # optional
ulm_custom_card_irmajavi_weather_name_1: # optional
ulm_custom_card_irmajavi_weather_name_2: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom irmajavi weather**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_irmajavi_weather | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_date | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_entity_1 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_entity_2 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_entity_3 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_entity_4 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_name_1 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_name_2 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_name_3 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_name_4 | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_weather_temperature_outside | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_irmajavi_weather.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_irmajavi_weather
```

New:
```yaml
type: custom:ulm-custom-card-irmajavi-weather-card
entity: entity.example
```
