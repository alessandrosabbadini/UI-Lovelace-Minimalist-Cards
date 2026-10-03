#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT/ha-local-test/config/www"
cp "$ROOT/editable-cards/dist/ulm-editable-cards.js" \
  "$ROOT/ha-local-test/config/www/ulm-editable-cards.js"
echo "Synced ulm-editable-cards.js -> ha-local-test/config/www/"
