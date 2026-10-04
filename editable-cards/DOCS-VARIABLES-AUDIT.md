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
| weather | yes | native simple-weather style (no dependency) |
| weather_ulm | yes | humidity/temp chips + popup |
| title | yes | name + label; transparent layout |
| battery | yes | attribute, charging, thresholds, colors |
| binary_sensor | yes | color, last_changed, force background |
| binary_sensor_alert | yes | + alert badge, invert_state |
| navigate | yes | path, title, icon, color |
| power_outlet | yes | consumption sensor, color, force bg, popup |
| generic | yes | state primary / name secondary; force bg |
| generic_swap | yes | name primary / state secondary; force bg |
| input_boolean | yes | toggle, color, force bg |
| script | yes | title, icon, entity, service_data |
| vertical_button | yes | state match, color, last changed |
| chips (official) | yes | emoji-label vs mdi; dual register: customCards + customBadges |
| custom afvalophaling | yes | multi-entity waste schedule (specialized) |
| custom alarm_time | yes | toggle + datetime +/- step, collapse/horizontal |
| custom apexcharts | yes | 3 entity rows + nested HACS apexcharts-card |
| custom bar_card | yes | card_generic header + nested HACS bar-card |
| custom camera | yes | optional blue title + nested picture-entity live |
| custom esh_room | yes | rectangular room + light/climate/cover widgets |
| custom httpedo13_sun | yes | Minimalist shell + nested HACS sun-card |
| custom damix48_power_details | yes | header + nested HACS mini-graph-card |
| custom eraycetinay_lock | yes | lock tap + battery/door-open badges |
| custom nik_door | yes | Minimal Door Lock + battery + open/lock widgets |

## Sources

- https://ui-lovelace-minimalist.github.io/UI/usage/cards/
- `custom_components/.../card_templates/cards/*.yaml`
