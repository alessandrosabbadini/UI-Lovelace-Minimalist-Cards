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
| custom scenes | yes | 5 nested scene pills (entity_id/icon/colors/name) |
| custom mpse_printer | yes | status header + CMYK toner bars |
| custom tpx01_aircondition | yes | power + temp −/readout/+ (with_buttons) |
| custom input_number | yes | ↓ / value / ↑ for number counter select |
| custom input_datetime | yes | time ± minute step |
| custom homeassistant_updates | yes | Core/Supervisor/OS + shortcut widgets |
| custom water_heater | yes | consumption-driven red heating state |
| custom more_power_outlet | yes | power + energy + runtime label |
| custom saxel_fan | yes | fan slider/oscillate + temp/hum + variant_blue |
| custom schumijo_car | yes | tracker/lock badges + energy/range widgets |
| custom nik_nas | yes | NAS power + 4 metric rows (no apex chart) |
| custom haven_washer | yes | power + phases + progress + optional services |
| custom light_colorpick | yes | brightness slider + RGB preset chips |
| custom media_player_sonos | yes | header + vol−/play-pause/vol+ |
| custom person_info | yes | zone badge + battery/commute rows |
| custom speedtest_shogun160 | yes | 3 SVG gauges (no apexcharts) |
| custom esh_welcome | yes | weather topbar + greeting + nav pills |
| custom nas | yes | simple blue icon_info sensor |
| custom chip_group_counter | yes | card+badge dual register |
| custom chip_moon | yes | card+badge dual register |
| custom chip_myenedis | yes | card+badge dual register |
| custom chip_simple_temp | yes | card+badge dual register |
| custom chip_tesla_temperature | yes | card+badge dual register |
| custom chip_update | yes | card+badge dual register |
| custom chip_vlape_garage | yes | card+badge dual register |
| custom template_shogun160_battery_info | yes | battery ring as card+badge |

| custom person_chip | yes | card+badge |
| custom iAbadia_battery_chip | yes | card+badge |
| custom mpse_wifisignal | yes | dBm wifi icon_info |
| custom device_tracker | yes | tracker badges |
| custom chromecast | yes | power/play/HDMI |
| custom playstation | yes | cover art states |
| custom nik_clock | yes | clock + date |
| custom wilbiev_title | yes | title + optional nav |
| custom wilbiev_subtitle | yes | subtitle divider |
| custom yagrasdemonde_lights_count | yes | lights/covers count |
| custom drealine_roomview | yes | room sensors + device toggles |
| custom eraycetinay_elapsed_time | yes | input_datetime elapsed label |
| custom heat_pump | yes | climate temp + HVAC modes |
| custom httpedo13_thermostat | yes | radiator + orange heating |
| custom imswel_medias | yes | library/upcoming artwork |
| custom imswel_person | yes | person + zone badge |
| custom irmajavi_entities | yes | header + 4 metrics |
| custom irmajavi_speedtest | yes | router + speed tiles |
| custom irmajavi_weather | yes | weather emoji + 4 metrics |
| custom mpse_gauge | yes | icon_info + dual concentric gauge |
| custom mpse_thermostat | yes | climate temp arrows |
| custom neekster_update | yes | update install/skip |
| custom nik_tablet | yes | tablet widgets + battery |
| custom paddy_dwd_pollen | yes | DWD pollen level |
| custom paddy_waste_collection | yes | waste daysTo badge |
| custom paddy_welcome | yes | greeting + weather/feed |
| custom person_info_small | yes | compact person + battery |
| custom qubino | yes | fil pilote consignes |
| custom ristou_person | yes | person + map/camera |
| custom schumijo_flower | yes | plant attributes |
| custom senoro_win | yes | window contact/handle |
| custom sisimomo_printer | yes | cartridge toner bars |
| custom vncntdev_device_tracer | yes | device online/offline |
| custom wsly_pollen | yes | tree/grass/weed pollen |

## Sources

- https://ui-lovelace-minimalist.github.io/UI/usage/cards/
- `custom_components/.../card_templates/cards/*.yaml`
