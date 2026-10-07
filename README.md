# UI Lovelace Minimalist Cards

Lit / custom-card ports of [UI Lovelace Minimalist](https://github.com/UI-Lovelace-Minimalist/UI), with native Home Assistant UI editors (no `custom:button-card` YAML templates).

> [!WARNING]
> **Work in progress.** This repository is under active development and is **not ready for production**.
> APIs, card types, layouts, and install steps may change without notice. Use only for testing / feedback.
> Advanced popups (color temp, sources, radar, history, maps, …) are still being ported from the legacy YAML.

## What we did

This project is a **rewrite / migration**, not a drop-in replacement of the classic HACS integration:

| Before (upstream Minimalist) | After (this repo) |
| --- | --- |
| YAML templates + `custom:button-card` | Lit custom cards (`editable-cards/`) |
| YAML dashboards / template variables | Lovelace **UI mode** + card editors (`getConfigForm`) |
| Bundled frontend deps (button-card, card-mod, …) | Single module: `ulm-editable-cards.js` |
| Community cards as YAML in `custom_cards/` | Ported Lit types (`custom:ulm-custom-card-*-card`) |
| Popup YAML (browser_mod + button-card) | Basic Lit popups; full fidelity still WIP |

**Kept from the original project**

- Minimalist themes (`themes/` / integration themefiles): desktop, mobile, mobile-tapbar, iOS-tapbar
- Design language and naming inspired by ULM
- Original popup YAML sources for the remaining port → `legacy/popup_templates/`

**Removed**

- Official card/chip/action YAML templates
- Community YAML card definitions (READMEs kept under `custom_cards/*/README.md`)
- Bundled HACS frontend dependency packs
- Legacy YAML example dashboards

See also [MIGRATION-EDITABLE-CARDS.md](./MIGRATION-EDITABLE-CARDS.md).

## Status

| Area | Status |
| --- | --- |
| Official cards & chips | Ported (polish ongoing) |
| Community custom cards & chips | Ported (some MVP / fidelity TBD) |
| Themes | Original Minimalist themes kept |
| Popups | Partial Lit dialogs; advanced flows still in `legacy/popup_templates/` |
| HACS / release packaging | Custom repository (Dashboard) ready; repo still **private** |
| Docs | Partially outdated vs Lit package |

## Install with HACS (custom repository)

> Repo is still **private**. Only accounts with GitHub access can add it.
> In HACS, for private repos you typically need a GitHub token with `repo` scope
> (HACS → settings / GitHub).

1. HACS → **⋯** → **Custom repositories**
2. Repository: `alessandrosabbadini/UI-Lovelace-Minimalist-Cards`
3. Category: **Dashboard**
4. Download / Install **UI Lovelace Minimalist Cards**
5. Restart Home Assistant if prompted
6. Dashboard **UI mode** → Add card → search **ULM**

HACS looks for `dist/ulm-editable-cards.js` (see `hacs.json`).

## Manual install (without HACS)

```bash
bash scripts/build-hacs.sh
```

1. Copy `dist/ulm-editable-cards.js` → `/config/www/`
2. Lovelace resource: `/local/ulm-editable-cards.js` (**JavaScript Module**)
3. Create a **UI mode** dashboard → Add card → search **ULM**
4. Optional: use the integration only to install **themes**

Details: [editable-cards/README.md](./editable-cards/README.md).

## Credits

This work is derived from [UI Lovelace Minimalist](https://github.com/UI-Lovelace-Minimalist/UI) (MIT).

- Original design: [tben](https://community.home-assistant.io/u/tben/summary)
- Upstream maintainers & contributors — see the [original repository](https://github.com/UI-Lovelace-Minimalist/UI)
- Community custom-card authors credited in each `custom_cards/*/README.md`

## License

[MIT](./LICENSE) — same license family as the upstream project. Keep copyright and license notices when redistributing.
