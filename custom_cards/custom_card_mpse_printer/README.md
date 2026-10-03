---
title: mpse printer
hide:
  - toc
---

# mpse printer

Editable Home Assistant card port of the Minimalist custom card `custom_card_mpse_printer`.

## Credits

Original author: mpse (based on clemalex post) (v0.3.0)

## New card type

```yaml
type: custom:ulm-custom-card-mpse-printer-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_printer_black_name: # optional
ulm_card_printer_cyan_name: # optional
ulm_card_printer_magenta_name: # optional
ulm_card_printer_name: # optional
ulm_card_printer_yellow_name: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom mpse printer**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_printer_black_name | no | Ported optional field from original YAML |
| ulm_card_printer_cyan_name | no | Ported optional field from original YAML |
| ulm_card_printer_magenta_name | no | Ported optional field from original YAML |
| ulm_card_printer_name | no | Ported optional field from original YAML |
| ulm_card_printer_yellow_name | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_mpse_printer.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_mpse_printer
```

New:
```yaml
type: custom:ulm-custom-card-mpse-printer-card
entity: entity.example
```
