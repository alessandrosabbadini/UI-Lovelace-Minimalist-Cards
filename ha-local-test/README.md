# Home Assistant locale per test ULM Editable Cards

## Avvio

```bash
# 1. Avvia Docker Desktop
# 2. Poi:
cd ha-local-test
docker compose up -d
```

Apri: http://localhost:8123

## Prima volta

1. Completa onboarding (crea un utente locale di test)
2. Profilo → attiva **Modalità avanzata**
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
