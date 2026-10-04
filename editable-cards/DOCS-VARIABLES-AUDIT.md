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
| cover | yes | some still in expandable `controls` |
| thermostat | yes | layout/advanced still expandable |
| light | yes | flattened to top-level |
| person | yes | extras expandable |
| room | partial | missing tap/hold/templates on slots |
| welcome | partial | missing scenes_collapse / service_data |
| weather | stub | depends on simple-weather-card |

## Sources

- https://ui-lovelace-minimalist.github.io/UI/usage/cards/
- `custom_components/.../card_templates/cards/*.yaml`
