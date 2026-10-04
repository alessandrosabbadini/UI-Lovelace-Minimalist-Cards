# Docs ↔ Lit form audit

Generated from official Minimalist docs + local YAML, for keeping `getConfigForm()` complete.

## Rule

- Every documented `ulm_card_*` variable must appear in `getConfigForm` as a **top-level** field (short Lit key).
- Prefer no `expandable` for booleans that must persist (HA sometimes drops nested values).
- Always accept legacy `ulm_card_*` keys in `setConfig`.

## Status (2026-10-04)

| Card | Docs vars in form | Notes |
|------|-------------------|-------|
| vacuum | yes | + `enable_popup` (YAML) |
| fan | yes | + button_icon/service/oscillate_attribute |
| media_player | yes | + `idle_off` (YAML) |
| cover | yes | flattened to top-level |
| thermostat | yes | flattened to top-level |
| light | yes | flattened to top-level |
| person | yes | flattened to top-level |
| room | yes | flattened; slot tap/hold/templates + nav path |
| welcome | yes | collapse input_boolean + per-pill service_data |
| weather | stub | depends on simple-weather-card |

## Sources

- https://ui-lovelace-minimalist.github.io/UI/usage/cards/
- `custom_components/.../card_templates/cards/*.yaml`
