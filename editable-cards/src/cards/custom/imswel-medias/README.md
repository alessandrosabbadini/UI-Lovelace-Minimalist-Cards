---
title: imswel medias
hide:
  - toc
---

# imswel medias

Editable Home Assistant card port of the Minimalist custom card `custom_card_imswel_medias`.

## Credits

Original author: imswel - 2023 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-imswel-medias-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_imswel_medias_index: # optional
ulm_custom_card_imswel_medias_platform: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom imswel medias**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_imswel_in_theaters | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_locale | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_medias_index | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_medias_platform | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_recentlyadded | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_today | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_tommorow | no | Ported optional field from original YAML |
| ulm_custom_card_imswel_weekday | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_unavailable | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_imswel_medias.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_imswel_medias
```

New:
```yaml
type: custom:ulm-custom-card-imswel-medias-card
entity: entity.example
```
