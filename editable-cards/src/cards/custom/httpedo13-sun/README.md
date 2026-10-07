---
title: Custom-card "Sun"
hide:
  - toc
---

# Custom-card "Sun"

Lit port of Minimalist `custom_card_httpedo13_sun` — wraps HACS [sun-card](https://github.com/AitorDB/home-assistant-sun-card) in a Minimalist shell.

## Credits

Author: httpedo13 - 2021  
Version: 1.0.0

## Requirements

| Component / card | Required | Link |
| --- | --- | --- |
| Sun integration | yes | [docs](https://www.home-assistant.io/integrations/sun/) |
| Sun card (HACS) | yes | [AitorDB/home-assistant-sun-card](https://github.com/AitorDB/home-assistant-sun-card) |

## New card type

```yaml
type: custom:ulm-custom-card-httpedo13-sun-card
# title: "Sun"
language: it          # optional; default = HA language
dark_mode: auto       # auto | true | false  (auto = hass.themes.darkMode)
time_format: 24h      # 12h | 24h
show_azimuth: false
show_elevation: false
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Sun**.

## Variables

| Variable | Maps from / sun-card | Default |
| --- | --- | --- |
| title | `title` | none (no title) |
| language | `language` | HA language |
| dark_mode | `darkMode` | `auto` → `hass.themes.darkMode` |
| time_format | `timeFormat` | `24h` |
| show_azimuth | `showAzimuth` | `false` |
| show_elevation | `showElevation` | `false` |

Supported languages: `da`, `de`, `en`, `es`, `et`, `fi`, `fr`, `hu`, `it`, `nl`, `pl`, `pt-BR`, `ru`, `sl`, `sv`.

## Legacy YAML

- `custom_card_httpedo13_sun.yaml` (`custom_card_httpedo13_sun` → nested `custom:sun-card`)
