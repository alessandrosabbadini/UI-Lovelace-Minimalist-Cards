# Home Assistant locale per test ULM Editable Cards

## Avvio

```bash
# 1. Avvia Docker Desktop
# 2. Poi:
cd ha-local-test
docker compose up -d
```

Apri: http://localhost:8123

## Tema Minimalist (originale)

Temi in `config/themes/` (+ **card-mod** in `/local/card-mod.js`):

| Tema | Effetto |
| --- | --- |
| `minimalist-desktop` | header/tab visibili (editing) |
| `minimalist-mobile` | **nasconde header + tapbar** |
| `minimalist-mobile-tapbar` | tapbar in basso |
| `minimalist-ios-tapbar` | tapbar iOS in basso |

Per nascondere la tapbar: Profilo → Tema → **minimalist-mobile**
(o “Usa tema predefinito” — all’avvio è già `minimalist-mobile`).

`card-mod` è caricato in `configuration.yaml` con `frontend.extra_module_url`
(necessario perché le regole del tema nascondano l’header). Hard refresh
dopo il restart.

## Prima volta

1. Completa onboarding (crea un utente locale di test)
2. Profilo → Tema → **minimalist-desktop** (e attiva **Modalità avanzata**)
3. Impostazioni → Dashboard → ⋮ → Risorse → Aggiungi:
   - URL: `/local/ulm-editable-cards.js`
   - Tipo: **Modulo JavaScript**
4. Crea/apri un dashboard UI → Add card → cerca `ULM`

## Aggiornare le card dopo un rebuild

```bash
cd ../editable-cards && npm run build
cd ../ha-local-test && ./sync-cards.sh
```

Poi hard refresh del browser (`Cmd+Shift+R`).

## Stop

```bash
docker compose down
```
