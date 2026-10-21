# Contributing

Thanks for helping with **UI Lovelace Minimalist Cards**.

This repository is a **Lit / Lovelace custom-card** package (`editable-cards/` →
`dist/ulm-editable-cards.js`), plus optional Minimalist **themes**. Classic
`custom:button-card` YAML templates are gone.

## Ways to contribute

- Report bugs and request features (GitHub Issues)
- Fix cards, chips, or popups
- Improve docs (card READMEs under `editable-cards/src/cards/`, or `docs/setup/`)
- Improve themes under `themes/`

## Pull requests

1. Fork the repo and create a branch from `main`.
2. Make your changes (see below).
3. Build and smoke-test in Home Assistant.
4. Open a pull request against `main`.

All contributions are under the [MIT License](./LICENSE).

## Development setup

### Lit cards (main work)

```bash
cd editable-cards
npm install
npm run build          # or: npm run watch
```

From the repo root, the HACS artifact helper also works:

```bash
bash scripts/build-hacs.sh
```

This writes `dist/ulm-editable-cards.js` (and `.gz`). Copy it to HA
`/config/www/` (or your local test instance) and load it as a **JavaScript
Module** resource, or bump the `?v=` query on an existing resource.

Optional local HA stacks live under `ha-local-test/` / `ha-hacs-test/` (gitignored
config data — see those folders’ compose files if present).

### Python / themes (optional)

`custom_components/ui_lovelace_minimalist/` is a **themes helper**, not the card
runtime. For Python linting:

```bash
scripts/bootstrap   # if you need the Python toolchain
scripts/lint        # Ruff format + check
```

## Project layout

| Path | Role |
| --- | --- |
| `editable-cards/src/cards/` | Official Lit cards |
| `editable-cards/src/cards/custom/` | Community Lit cards |
| `editable-cards/src/cards/chips/` | Official + community chips |
| `editable-cards/src/popups/` | Native Lit popups (`openUlmPopup`) |
| `dist/ulm-editable-cards.js` | HACS Dashboard artifact |
| `themes/` | Minimalist themes (mirrored in the integration themefiles) |
| `docs/` | MkDocs site (usage pages sync from card READMEs) |

## Adding or changing a card

### Official card

1. Edit or add sources under `editable-cards/src/cards/<name>/`.
2. Register the custom element / picker type in `editable-cards/src/index.ts`
   (follow existing cards).
3. Keep or add `README.md` (and `README-*.md` for variants) next to the card.
4. Rebuild with `npm run build` / `bash scripts/build-hacs.sh`.
5. CI syncs READMEs into `docs/usage/` on push to `main` (or update docs
   manually to match).

### Community / custom card

1. Create `editable-cards/src/cards/custom/<kebab-name>/` with the Lit card +
   `README.md`.
2. Register it (registry / inventory / bundle entry — mirror a similar custom
   card).
3. Rebuild and test in the HA card picker (`ULM Custom …`).

### Chip

- Official: `editable-cards/src/cards/chips/official/<name>/` +
  `official-chips.ts`
- Community: `editable-cards/src/cards/chips/community/<name>/` + community
  chip registration

### Popup

Popup kinds live under `editable-cards/src/popups/` (`ulm-popup.ts`,
`views/*.ts`, `shared.ts`, embeds). Wire new options through
`UlmPopupOpts` / card `enable_popup` fields.

## Docs

- **Source of truth for card docs:** README next to the Lit card.
- **Setup / install:** `docs/setup/` (Lit + HACS Dashboard model).
- **Site:** MkDocs (`mkdocs.yml`) → GitHub Pages.

When you change card behaviour or options, update that card’s README in the
same PR.

## Bug reports

Open an [issue](../../issues/new/choose) with:

- Short summary
- Steps to reproduce (card type + config YAML if possible)
- Expected vs actual behaviour
- HA version, browser, and whether you use HACS or a manual resource

## Coding style

- **TypeScript / Lit:** match existing cards (Lit 3, shared helpers under
  `editable-cards/src/shared/`). Prefer clear editors via `getConfigForm`.
- **Python (themes / integration):** Ruff via `scripts/lint`.
- Do not reintroduce `custom:button-card` YAML templates or `browser_mod`
  popup templates as the primary path.

## License

By contributing, you agree that your contributions are licensed under the MIT
License.
