# ULM Editable Cards

Port completo delle card UI Lovelace Minimalist (ufficiali + custom + chips) verso custom card Home Assistant con editor UI. Include anche popup dialog nativi.

## Contenuto

| Gruppo | Quantità | Dove |
| --- | --- | --- |
| Card ufficiali | ~22 | `src/cards/**` + `simple-cards.ts` |
| Chip ufficiali | 14 | `src/cards/chips/official-chips.ts` |
| Custom cards / custom chips | 70 | `src/cards/custom/registry.ts` (generate da `custom_cards/`) |
| Popup | 7 kind | `src/popups/ulm-popup.ts` |
| Chips row helper | 1 | `ulm-chips-card` |

I README di ogni custom card restano in `custom_cards/<nome>/README.md` (aggiornati alle nuove type) e sono sincronizzati in `docs/usage/custom_cards/`.

## Build

```bash
cd editable-cards
npm install
npm run build
```

Output: `dist/ulm-editable-cards.js`

## Installazione HA

1. Copia `dist/ulm-editable-cards.js` → `/config/www/`
2. Resource Lovelace: `/local/ulm-editable-cards.js` (JavaScript Module)
3. Dashboard **UI mode** → Add card → cerca `ULM`

## Popup

Su light / cover / media / thermostat abilita `enable_popup` nell’editor.
API: `openUlmPopup(host, kind, entity)`.

Kind supportati: `light`, `cover`, `thermostat`, `media_player`, `vacuum`, `weather`, `power_outlet`.

## Rigenerare custom cards da YAML

Se aggiungi cartelle in `custom_cards/`, rilancia il generatore usato in sviluppo (script node in chat / CI) per aggiornare `src/cards/custom/registry.ts` e i README.

## Nota sulla fedeltà

- Ogni card ufficiale, custom e chip ha una **type dedicata** nel picker.
- Le custom community sono portate come card editabili con entity + campi opzionali derivati dalle variabili YAML originali.
- Layout/grafici avanzati di alcune custom (ApexCharts, camera live complessa, mappe vacuum, ecc.) sono MVP: la type esiste e ha editor/README; il rendering avanzato si raffina card per card.
