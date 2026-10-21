---
title: Configuration
hide:
  - toc
---

<!-- markdownlint-disable MD046 -->

## Dashboards

Use a normal Lovelace dashboard in **UI mode**. Add ULM cards from the picker
(**ULM …**). There is no generated `ui-lovelace.yaml` and no
`button_card_templates` include.

YAML mode still works if you prefer raw config, for example:

```yaml
type: custom:ulm-light-card
entity: light.living_room
enable_popup: true
```

Card options are documented next to each Lit source under
`editable-cards/src/cards/` and mirrored in [Usage](../usage/cards/card_light.md).

## Themes

Themes are independent of the card JS module. Keep them under `/config/themes/`
and select one in your profile. See [Installation](installation.md#themes-optional).

## Integration role

The Python integration (`custom_components/ui_lovelace_minimalist/`) is kept as a
**themes helper** (and related HA packaging). It does **not** ship card or popup
YAML templates anymore. Runtime UI is the HACS Dashboard package
`ulm-editable-cards.js`.

## Popups

Configure popup-related fields on the card (`enable_popup`, sensors for outlet,
camera for vacuum map on the **card**, etc.). No browser_mod service calls.
