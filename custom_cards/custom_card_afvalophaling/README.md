---
title: afvalophaling
hide:
  - toc
---

# afvalophaling

Editable Home Assistant card port of the Minimalist custom card `custom_card_afvalophaling`.

## Credits

Original author: AndyVRD - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-afvalophaling-card
ulm_card_ophaling_vandaag: sensor.afval_vandaag
ulm_card_ophaling_morgen: sensor.afval_morgen
ulm_card_datum_rest: sensor.afval_datum_rest
ulm_card_datum_papier: sensor.afval_datum_papier
ulm_card_datum_pmd: sensor.afval_datum_pmd
ulm_card_datum_gft: sensor.afval_datum_gft
ulm_card_datum_glas: sensor.afval_datum_glas
ulm_ophaling: Garbage collection!
ulm_volgende_ophaling: Next collections
icon: mdi:delete
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom afvalophaling**.

## Behaviour (from original YAML)

- Title switches between `ulm_ophaling` (collection today/tomorrow) and `ulm_volgende_ophaling` (upcoming list).
- Label shows today’s/tomorrow’s fraction, otherwise the next-date lines (`Residual • …`, `Paper • …`, `Organic • …`, etc.).
- Icon turns recycle/green when collecting soon; glass uses bottle icon/blue; unavailable shows a red `?` badge.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| ulm_card_ophaling_vandaag | no | Today’s fraction (`Geen` = none) |
| ulm_card_ophaling_morgen | no | Tomorrow’s fraction |
| ulm_card_datum_rest | no | Next residual date entity |
| ulm_card_datum_papier | no | Next paper date entity |
| ulm_card_datum_pmd | no | Next PMD date entity |
| ulm_card_datum_gft | no | Next GFT date entity |
| ulm_card_datum_glas | no | Next glass date entity |
| ulm_ophaling | no | Title when collecting soon |
| ulm_volgende_ophaling | no | Title for upcoming list |
| name | no | Forces title override |
| icon | no | Idle icon (default `mdi:delete`) |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `card_afvalophaling.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: card_afvalophaling
variables:
  ulm_card_ophaling_vandaag: sensor.xxx
```

New:
```yaml
type: custom:ulm-custom-card-afvalophaling-card
ulm_card_ophaling_vandaag: sensor.xxx
```
