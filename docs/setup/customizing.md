---
title: Customizing
hide:
  - toc
---

<!-- markdownlint-disable MD046 -->

## Themes

Edit or override Minimalist theme YAML under `/config/themes/` (or the copies
managed by the integration themefiles). Typical variables include card radius,
fonts, and color tokens used by ULM cards.

Reload themes after edits (Developer Tools → YAML → Reload themes, or restart).

## Card options

Each Lit card exposes an editor (`getConfigForm`). Prefer the UI editor fields
over hand-written template variables from the old button-card era.

Common patterns:

- `name` / `label` overrides
- `force_background_color`
- `enable_popup` on interactive domains

## Actions

Tap / hold / double-tap behaviour is configured **per card** in the editor (or
YAML). There is no global `custom_actions.yaml` template file in this package.

See also [Custom actions](custom_actions.md).
