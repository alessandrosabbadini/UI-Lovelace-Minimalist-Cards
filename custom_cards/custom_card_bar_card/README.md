---
title: bar card
hide:
  - toc
---

# bar card

Editable Home Assistant card port of the Minimalist custom card `custom_card_bar_card`.

## Credits

Original author: rphlwnk - 2021 Version: 1.0.0 (v1.0.0)

## Requirements

HACS frontend: **bar-card** (custom-cards/bar-card) — same dependency as the original YAML template.

## New card type

```yaml
type: custom:ulm-custom-card-bar-card-card
entity: sensor.outside_humidity
name: Humidity
icon: mdi:water-percent
icon_color: blue
bar_color: var(--google-blue)
show_icon: true
indicator: false
show_value: true
min: 0
max: 100
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom bar card**.

## Behaviour

- Top: `card_generic` header (state primary, name secondary) — hidden when `show_icon: false`.
- Bottom: nested `custom:bar-card` (35px, square ends) with original card-mod styles.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Sensor for header + bar |
| name | no | Override friendly name (`ulm_custom_card_bar_card_name`) |
| icon | no | Override icon |
| icon_color | no | Theme color for icon chip |
| bar_color | no | CSS / `var(--google-*)` / theme name (default `var(--google-blue)`) |
| show_icon | no | Show header section (default true) |
| indicator | no | Bar indicator inside (default false) |
| show_value | no | Value inside bar (default false; stub enables true) |
| min / max | no | Bar scale (default 0 / 100) |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_bar_card.yaml`
