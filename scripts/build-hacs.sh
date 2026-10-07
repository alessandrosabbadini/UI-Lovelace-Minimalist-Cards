#!/usr/bin/env bash
# Build Lit cards and publish the HACS plugin artifact to ./dist/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/editable-cards"
npm install
npm run build
mkdir -p "$ROOT/dist"
cp -f dist/ulm-editable-cards.js "$ROOT/dist/ulm-editable-cards.js"
# Optional gzip for HA (served when present)
if command -v gzip >/dev/null 2>&1; then
  gzip -9 -c "$ROOT/dist/ulm-editable-cards.js" > "$ROOT/dist/ulm-editable-cards.js.gz"
fi
echo "HACS artifact ready: dist/ulm-editable-cards.js ($(wc -c < "$ROOT/dist/ulm-editable-cards.js") bytes)"
