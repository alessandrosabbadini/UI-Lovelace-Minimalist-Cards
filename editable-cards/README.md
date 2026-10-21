# ULM Editable Cards

Port completo delle card UI Lovelace Minimalist (ufficiali + custom + chips) verso custom card Home Assistant con editor UI. Include anche popup dialog nativi.

## Contenuto

| Gruppo | Quantità | Dove |
| --- | --- | --- |
| Card ufficiali | ~22 | `src/cards/**` + `simple-cards.ts` |
| Chip ufficiali | 14 | `src/cards/chips/official-chips.ts` |
| Custom cards / custom chips | 70 | `src/cards/custom/` + `src/cards/chips/community/` |
| Popup | 7 kind | `src/popups/ulm-popup.ts` |
| Chips row helper | 1 | `ulm-chips-card` |

I README stanno accanto al sorgente Lit e il workflow CI li sincronizza in `docs/usage/`:

| Gruppo | Path README | Docs generati |
| --- | --- | --- |
| Card ufficiali | `src/cards/<nome>/README.md` (+ `README-*.md` varianti) | `docs/usage/cards/` |
| Chip ufficiali | `src/cards/chips/official/<nome>/README.md` | `docs/usage/chips/` |
| Custom / community | `src/cards/custom/<nome>/README.md` | `docs/usage/custom_cards/` |
| Chip community | `src/cards/chips/community/<nome>/README.md` | `docs/usage/custom_cards/` |

I YAML button-card e i popup YAML sono stati rimossi dal repo; i popup vivono in `src/popups/`.

## Build

```bash
# From repo root — builds Lit and copies the HACS artifact to ./dist/
bash scripts/build-hacs.sh
```

Or only the package:

```bash
cd editable-cards
npm install
npm run build
```

Output for HACS: `../dist/ulm-editable-cards.js` (repo root).

## Installazione HA

**HACS (consigliato):** custom repository → category **Dashboard** →  
`alessandrosabbadini/UI-Lovelace-Minimalist-Cards` (repo still private).

**Manuale:**

1. Copia `dist/ulm-editable-cards.js` (root del repo) → `/config/www/`
2. Resource Lovelace: `/local/ulm-editable-cards.js` (JavaScript Module)
3. Dashboard **UI mode** → Add card → cerca `ULM`

## Popup

Su light / cover / media / thermostat / vacuum / weather / power-outlet abilita `enable_popup` nell’editor.

API: `openUlmPopup(host, kind, entity, opts?)`.

Kind: `light`, `cover`, `thermostat`, `media_player`, `vacuum`, `weather`, `power_outlet`.

Opts utili: `color_palette`, `preset_mode`, `camera`, `sensor1` / `sensor2` / `graph_sensor`.

Implementazione Lit Minimalist (header/footer, slider verticali, color wheel, sotto-viste). Dove possibile si incorporano card HA/HACS già presenti (`thermostat`, `mini-graph-card`, `vacuum-card`); altrimenti fallback Lit.

## Aggiungere una custom card

1. Crea `src/cards/custom/<nome>/` con il file Lit + `README.md`
2. Registra la type in `src/cards/custom/registry.ts` (e nell’entry del bundle se serve)
3. Per un chip community: `src/cards/chips/community/<nome>/README.md`

## Nota sulla fedeltà

- Ogni card ufficiale, custom e chip ha una **type dedicata** nel picker.
- Le custom community sono portate come card editabili con entity + campi opzionali derivati dalle variabili YAML originali.
- Layout/grafici avanzati di alcune custom community (ApexCharts, camera live, ecc.) sono MVP: la type esiste e ha editor/README; il rendering avanzato si raffina card per card.
