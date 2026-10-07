---
title: yagrasdemonde lights count
hide:
  - toc
---

# yagrasdemonde lights count

Editable Home Assistant card port of the Minimalist custom card `custom_card_yagrasdemonde_lights_count`.

## Credits

Original author: yagrasdemonde - 04/2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-yagrasdemonde-lights-count-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_yagrasdemonde_lights_count_color: # optional
ulm_custom_card_yagrasdemonde_lights_count_cover_0: # optional
ulm_custom_card_yagrasdemonde_lights_count_cover_1: # optional
ulm_custom_card_yagrasdemonde_lights_count_cover_many: # optional
ulm_custom_card_yagrasdemonde_lights_count_force_background_color: # optional
ulm_custom_card_yagrasdemonde_lights_count_icon_off: # optional
ulm_custom_card_yagrasdemonde_lights_count_icon_on: # optional
ulm_custom_card_yagrasdemonde_lights_count_language_variables: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom yagrasdemonde lights count**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_yagrasdemonde_lights_count_color | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_cover_0 | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_cover_1 | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_cover_many | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_force_background_color | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_icon_off | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_icon_on | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_light_0 | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_light_1 | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_light_many | no | Ported optional field from original YAML |
| ulm_custom_card_yagrasdemonde_lights_count_type | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_state | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_yagrasdemonde_lights_count.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_yagrasdemonde_lights_count
```

New:
```yaml
type: custom:ulm-custom-card-yagrasdemonde-lights-count-card
entity: entity.example
```
