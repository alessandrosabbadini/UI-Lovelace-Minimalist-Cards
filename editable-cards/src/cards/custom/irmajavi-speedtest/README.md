---
title: irmajavi speedtest
hide:
  - toc
---

# irmajavi speedtest

Editable Home Assistant card port of the Minimalist custom card `custom_card_irmajavi_speedtest`.

## Credits

Original author: irmajavi - 2022 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-irmajavi-speedtest-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_irmajavi_speedtest_download_speed_entity: # optional
ulm_custom_card_irmajavi_speedtest_ping_entity: # optional
ulm_custom_card_irmajavi_speedtest_upload_speed_entity: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom irmajavi speedtest**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_irmajavi_speedtest_color | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_download | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_download_speed_entity | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_language_variables | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_ping_entity | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_router_model | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_router_name | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_speedtest | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_upload | no | Ported optional field from original YAML |
| ulm_custom_card_irmajavi_speedtest_upload_speed_entity | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_irmajavi_speedtest.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_irmajavi_speedtest
```

New:
```yaml
type: custom:ulm-custom-card-irmajavi-speedtest-card
entity: entity.example
```
