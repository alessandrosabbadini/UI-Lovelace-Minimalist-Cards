---
title: Installation
hide:
  - toc
---

<!-- markdownlint-disable MD046 -->

After [downloading](download.md) the Lit package, cards are available in the
Lovelace **UI editor**.

## Add cards

1. Open a dashboard in **UI mode** (Edit dashboard).
2. **Add card** → search **ULM**.
3. Pick an official, community, or chip card and configure it in the form.

No `custom:button-card` templates and no `button_card_templates:` includes are
required.

## Themes (optional)

Minimalist themes (desktop, mobile, mobile-tapbar, iOS-tapbar) live in
`themes/` and are also mirrored under the Home Assistant integration
`custom_components/ui_lovelace_minimalist/` **for theme install only**.

1. Ensure `configuration.yaml` includes themes:

   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```

2. Copy or symlink the theme folders into `/config/themes/`, **or** install the
   integration and let it manage themefiles.
3. In your Home Assistant profile, select a Minimalist theme.

Card visuals (colors, radius, fonts) follow the selected theme CSS variables.

## Popups

On supported cards (light, cover, media, thermostat, vacuum, weather, power
outlet), enable **Enable popup** in the card editor. Popups are native Lit
dialogs (`openUlmPopup`) — `browser_mod` is not required.

## Next steps

- [Configuration](configuration.md) — dashboards and options
- [Custom cards](custom_cards.md) — community types in the picker
- [Customizing](customizing.md) — themes and styling notes
