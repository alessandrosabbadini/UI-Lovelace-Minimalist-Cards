---
title: sisimomo printer
hide:
  - toc
---

# sisimomo printer

Editable Home Assistant card port of the Minimalist custom card `custom_card_sisimomo_printer`.

## Credits

Original author: [Sisimomo](https://github.com/sisimomo) (based on [hiddevanbrussel pictures](https://community.home-assistant.io/t/lovelace-ui-minimalist/322687/203)) (v0.1.0)

## New card type

```yaml
type: custom:ulm-custom-card-sisimomo-printer-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom sisimomo printer**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_idle | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_translation_engine | no | Ported optional field from original YAML |
| ulm_translation_unavailable | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_sisimomo_printer.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_sisimomo_printer
```

New:
```yaml
type: custom:ulm-custom-card-sisimomo-printer-card
entity: entity.example
```
