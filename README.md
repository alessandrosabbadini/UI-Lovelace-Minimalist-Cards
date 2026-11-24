# UI Lovelace Minimalist Cards

Lit / custom-card ports of [UI Lovelace Minimalist](https://github.com/UI-Lovelace-Minimalist/UI), with native Home Assistant UI editors (no `custom:button-card` YAML templates).

> [!IMPORTANT]
> **Unofficial fork.** This is a personal, community port and is **not affiliated with or endorsed by**
> the UI Lovelace Minimalist team. Please report issues
> [here](https://github.com/alessandrosabbadini/UI-Lovelace-Minimalist-Cards/issues), not upstream.

> [!NOTE]
> Still evolving: card options and layouts may change between releases. Check the release notes before updating.

<p align="center">
  <img src="docs/assets/img/example_home.png" alt="Home dashboard" width="180">
  <img src="docs/assets/img/example_temperature.png" alt="Climate view" width="180">
  <img src="docs/assets/img/example_consumption.png" alt="Energy view" width="180">
  <img src="docs/assets/img/example_localisation.png" alt="Presence view" width="180">
</p>

<p align="center">
  <img src="docs/assets/img/cards.png" alt="Official cards" height="120">
  <img src="docs/assets/img/chips.png" alt="Chips" height="120">
</p>

<p align="center">
  <img src="docs/assets/img/popup_light_phone.png" alt="Light popup" width="140">
  <img src="docs/assets/img/popup_media_phone.png" alt="Media popup" width="140">
  <img src="docs/assets/img/popup_thermostat_phone.png" alt="Thermostat popup" width="140">
  <img src="docs/assets/img/popup_weather_phone.png" alt="Weather popup" width="140">
</p>

## What we did

This project is a **rewrite / migration**, not a drop-in replacement of the classic HACS integration:

| Before (upstream Minimalist) | After (this repo) |
| --- | --- |
| YAML templates + `custom:button-card` | Lit custom cards (`editable-cards/`) |
| YAML dashboards / template variables | Lovelace **UI mode** + card editors (`getConfigForm`) |
| Bundled frontend deps (button-card, card-mod, …) | Single module: `ulm-editable-cards.js` |
| Community cards as YAML in `custom_cards/` | Ported Lit types next to README (`editable-cards/src/cards/custom/`) |
| Popup YAML (browser_mod + button-card) | Native Lit popups (`openUlmPopup`) |

**Kept from the original project**

- Minimalist themes (`themes/`, plain YAML): desktop, mobile, mobile-tapbar, iOS-tapbar
- Design language and naming inspired by ULM

**Removed**

- Official card/chip/action YAML templates
- Community YAML card definitions (READMEs live next to each Lit card / chip)
- Bundled HACS frontend dependency packs
- Legacy YAML example dashboards
- Legacy popup YAML / browser_mod templates (replaced by Lit popups)
- The Python integration (`custom_components/`): themes are plain YAML in `themes/`

See also [MIGRATION-EDITABLE-CARDS.md](./MIGRATION-EDITABLE-CARDS.md).

## Status

| Area | Status |
| --- | --- |
| Official cards & chips | Ported |
| Community custom cards & chips | Ported |
| Themes | Original Minimalist themes kept |
| Popups | Native Lit dialogs (light, cover, media, thermostat, vacuum, weather, power outlet) |
| HACS / release packaging | Custom repository (Dashboard) |
| Docs | Setup pages aligned to Lit + HACS; usage docs sync from card READMEs |

## Install with HACS (custom repository)

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
4. Optional: install the Minimalist **themes** from [`themes/`](./themes/README.md)

Details: [editable-cards/README.md](./editable-cards/README.md).

## Privacy

The weather popup shows a radar map. As a fallback for `weather-radar-card`, it embeds
[RainViewer](https://www.rainviewer.com/) in an iframe, centred on the weather entity's
`latitude` / `longitude` (usually your home location) when those attributes exist. This only
happens when you open the weather popup.

## Credits

This work is derived from [UI Lovelace Minimalist](https://github.com/UI-Lovelace-Minimalist/UI) (MIT).

- Original design: [tben](https://community.home-assistant.io/u/tben/summary)
- Upstream maintainers & contributors — see the [original repository](https://github.com/UI-Lovelace-Minimalist/UI)
- Card/chip docs live next to Lit sources under `editable-cards/src/cards/` (official + community)

## License

[MIT](./LICENSE) — same license family as the upstream project. Keep copyright and license notices when redistributing.
