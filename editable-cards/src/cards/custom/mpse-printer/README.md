---
title: Custom-card "Printer"
hide:
  - toc
---

# Custom-card "Printer"

Lit port of Minimalist `custom_card_mpse_printer` — printer status + CMYK toner levels.

## Credits

Author: mpse (based on clemalex post)  
Version: 0.3.0

## New card type

```yaml
type: custom:ulm-custom-card-mpse-printer-card
entity: sensor.hp_color_laser_mfp_178nw
name: HP Color Laser MFP 178nw
icon: mdi:printer
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
| entity | printer status sensor | yes |
| name | `ulm_card_printer_name` | no |
| icon | — | no (default `mdi:printer`) |
| black_entity | `ulm_card_printer_black_name` | yes |
| yellow_entity | `ulm_card_printer_yellow_name` | yes |
| magenta_entity | `ulm_card_printer_magenta_name` | yes |
| cyan_entity | `ulm_card_printer_cyan_name` | yes |

### Active state

When status ≠ `idle`, the header uses the blue theme (icon chip, name/state text, card background) — same as `custom_card_mpse_printer_blue`.

### Toner bars

Native bars (original nested HACS `bar-card`). Colors match the published docs screenshot:

| Toner | Color |
| --- | --- |
| Black | `#000000` |
| Yellow | `rgb(250, 179, 0)` |
| Magenta | `rgb(248, 75, 122)` |
| Cyan | `rgb(66, 126, 222)` |

## Legacy YAML

- `custom_card_mpse_printer.yaml`
