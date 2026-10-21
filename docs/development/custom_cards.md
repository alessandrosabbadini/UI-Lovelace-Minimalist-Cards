---
title: Custom cards (development)
hide:
  - toc
---

<!-- markdownlint-disable MD046 -->

## Develop a community card

Community cards in this fork are **Lit custom cards**, not button-card YAML.

### Steps

1. Fork the repository and branch from `main`.
2. Create `editable-cards/src/cards/custom/<kebab-name>/` with:
   - the Lit card implementation (follow a similar card)
   - `README.md` (usage, options, author, dependencies)
3. Register the card in the custom-card registry / bundle entry (see an
   existing neighbour under `custom/`).
4. Build:

   ```bash
   bash scripts/build-hacs.sh
   ```

5. Load `dist/ulm-editable-cards.js` in Home Assistant and verify the type in
   the card picker (`ULM Custom …`).
6. Open a pull request against `main`.

Full contributor guide: [CONTRIBUTING.md](https://github.com/alessandrosabbadini/UI-Lovelace-Minimalist-Cards/blob/main/CONTRIBUTING.md).

### Guidelines

- Prefer the shared Minimalist look (radius, icon chip, title/label layout).
- Expose options through the HA config form (`getConfigForm`), not undocumented
  template variables.
- Document required HA domains or optional HACS frontend cards in the README.
- Do not depend on removed YAML templates under `custom_cards/` or
  `ulm_templates/`.

### Official cards & popups

- Official cards: `editable-cards/src/cards/<name>/`
- Popups: `editable-cards/src/popups/`
