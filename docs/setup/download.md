---
title: Download
hide:
  - toc
---

<!-- markdownlint-disable MD046 -->

!!! warning "Work in progress"

    This fork ships **Lit custom cards** via HACS (Dashboard), not the classic
    YAML + `custom:button-card` package. APIs may still change.

## HACS (recommended)

1. Install [HACS](https://hacs.xyz/) if you do not have it yet.
2. HACS → **⋯** → **Custom repositories**
3. Repository: `alessandrosabbadini/UI-Lovelace-Minimalist-Cards`
4. Category: **Dashboard**
5. Download / Install **UI Lovelace Minimalist Cards**
6. Restart Home Assistant if prompted

HACS installs `ulm-editable-cards.js` as a Lovelace JavaScript module
(see `hacs.json`).

!!! note "Private repository"

    While the GitHub repo is private, HACS needs a GitHub token with `repo` scope
    (HACS → settings / GitHub).

Continue with [Installation](installation.md).

## Manual download

1. From this repository, take `dist/ulm-editable-cards.js`
   (or build with `bash scripts/build-hacs.sh`).
2. Copy it to `/config/www/ulm-editable-cards.js`.
3. Add a Lovelace resource: `/local/ulm-editable-cards.js` (**JavaScript Module**).
4. Restart Home Assistant or reload resources.

## Optional dependencies (popups)

Native Lit popups work without `browser_mod`. Some popup embeds use optional
HACS frontend cards when present (for example `mini-graph-card`,
`mini-media-player`, `light-entity-card`, `my-slider-v2`, `weather-radar-card`).
Install those only if you enable the related popup features.
