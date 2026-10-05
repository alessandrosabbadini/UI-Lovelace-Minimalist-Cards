---
title: Custom-card "Printer"
hide:
  - toc
---

# Custom-card "Printer"

Editable Home Assistant card port of the Minimalist custom card `custom_card_mpse_printer`.

## Credits

Author: mpse (based on clemalex post)  
Version: 0.3.0

## New card type

```yaml
type: custom:ulm-custom-card-mpse-printer-card
entity: sensor.hp_color_laser_mfp_178nw
name: HP Color Laser MFP 178nw
black_entity: sensor.hp_color_laser_mfp_178nw_black_toner
yellow_entity: sensor.hp_color_laser_mfp_178nw_yellow_toner
magenta_entity: sensor.hp_color_laser_mfp_178nw_magenta_toner
cyan_entity: sensor.hp_color_laser_mfp_178nw_cyan_toner
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Printer**.

## Variables

| Variable | Maps from | Required |
| --- | --- | --- |
| entity | printer status | yes |
| name | `ulm_card_printer_name` | no |
| icon | — | no |
| black_entity | `ulm_card_printer_black_name` | yes |
| yellow_entity | `ulm_card_printer_yellow_name` | yes |
| magenta_entity | `ulm_card_printer_magenta_name` | yes |
| cyan_entity | `ulm_card_printer_cyan_name` | yes |

Header turns blue when status ≠ `idle` (header only). Toner bars use the docs-screenshot colors: black / `rgb(250, 179, 0)` / `rgb(248, 75, 122)` / `rgb(66, 126, 222)`.

## Legacy YAML

- `custom_card_mpse_printer.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_mpse_printer
entity: sensor.hp_color_laser_mfp_178nw
variables:
  ulm_card_printer_name: HP Color Laser MFP 178nw
  ulm_card_printer_black_name: sensor.hp_color_laser_mfp_178nw_black_toner
  ulm_card_printer_yellow_name: sensor.hp_color_laser_mfp_178nw_yellow_toner
  ulm_card_printer_cyan_name: sensor.hp_color_laser_mfp_178nw_cyan_toner
  ulm_card_printer_magenta_name: sensor.hp_color_laser_mfp_178nw_magenta_toner
```

New:
```yaml
type: custom:ulm-custom-card-mpse-printer-card
entity: sensor.hp_color_laser_mfp_178nw
name: HP Color Laser MFP 178nw
black_entity: sensor.hp_color_laser_mfp_178nw_black_toner
yellow_entity: sensor.hp_color_laser_mfp_178nw_yellow_toner
cyan_entity: sensor.hp_color_laser_mfp_178nw_cyan_toner
magenta_entity: sensor.hp_color_laser_mfp_178nw_magenta_toner
```
