---
title: paddy welcome
hide:
  - toc
---

# paddy welcome

Editable Home Assistant card port of the Minimalist custom card `custom_card_paddy_welcome`.

## Credits

Original author: Paddy0174 - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-paddy-welcome-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_paddy_welcome_weather_provider: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom paddy welcome**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_afternoon | no | Ported optional field from original YAML |
| ulm_custom_card_paddy_welcome_news_entities | no | Ported optional field from original YAML |
| ulm_custom_card_paddy_welcome_time | no | Ported optional field from original YAML |
| ulm_custom_card_paddy_welcome_weather_provider | no | Ported optional field from original YAML |
| ulm_evening | no | Ported optional field from original YAML |
| ulm_hello | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_morning | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_paddy_welcome.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_paddy_welcome
```

New:
```yaml
type: custom:ulm-custom-card-paddy-welcome-card
entity: entity.example
```
