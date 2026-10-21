---
title: Adaptive Dashboard
hide:
  - toc
---

<!-- markdownlint-disable MD046 -->

!!! warning "Not shipped in this fork"

    The classic Minimalist **adaptive dashboard** (layout-card + state-switch +
    generated YAML) depended on button-card templates and browser_mod popups.
    That workflow is **not** part of the Lit / HACS Dashboard package.

## What to use instead

1. Build a normal Lovelace dashboard in **UI mode**.
2. Add ULM Lit cards from the picker.
3. Use HA’s built-in view types / sections, or optional community layout cards
   if you want responsive grids.
4. Enable **Enable popup** on cards that support native Lit popups.

For visual inspiration, see the [home page](../index.md) screenshots and the
upstream [adaptive dash demo](https://ui-lovelace-minimalist.github.io/UI/setup/adaptive_dash/)
(YAML era — reference only).
