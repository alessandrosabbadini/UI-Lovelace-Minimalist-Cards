#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WWW="$ROOT/ha-local-test/config/www"
RES="$ROOT/ha-local-test/config/.storage/lovelace_resources"

mkdir -p "$WWW"
cp "$ROOT/editable-cards/dist/ulm-editable-cards.js" \
  "$WWW/ulm-editable-cards.js"

# HA serves /local/* with Cache-Control max-age≈31d — bump ?v= every sync
# so the browser always fetches the new module.
VERSION="$(
  sed -n 's/^export const CARD_VERSION = "\([^"]*\)";/\1/p' \
    "$ROOT/editable-cards/src/const.ts" | head -1
)"
STAMP="$(date +%s)"
CACHE_BUST="${VERSION:-dev}.${STAMP}"

if [[ -f "$RES" ]]; then
  python3 - "$RES" "$CACHE_BUST" <<'PY'
import json, sys
path, bust = sys.argv[1], sys.argv[2]
with open(path, encoding="utf-8") as f:
    data = json.load(f)
url = f"/local/ulm-editable-cards.js?v={bust}"
for item in data.get("data", {}).get("items", []):
    if item.get("id") == "ulm_editable_cards" or "ulm-editable-cards.js" in item.get("url", ""):
        item["url"] = url
        break
else:
    data.setdefault("data", {}).setdefault("items", []).insert(
        0,
        {"id": "ulm_editable_cards", "url": url, "type": "module"},
    )
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
print(url)
PY
else
  echo "WARN: $RES missing — add resource manually: /local/ulm-editable-cards.js?v=$CACHE_BUST"
fi

echo "Synced ulm-editable-cards.js -> ha-local-test/config/www/ (?v=$CACHE_BUST)"
echo "Hard-refresh the dashboard (Cmd+Shift+R). If stuck, close the tab and reopen."
