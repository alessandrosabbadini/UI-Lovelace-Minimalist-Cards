---
title: speedtest shogun160
hide:
  - toc
---

# speedtest shogun160

Editable Home Assistant card port of the Minimalist custom card `custom_card_speedtest_shogun160`.


## New card type

```yaml
type: custom:ulm-custom-card-speedtest-shogun160-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_speedtest_download_speed_entity: # optional
ulm_custom_card_speedtest_ping_entity: # optional
ulm_custom_card_speedtest_upload_speed_entity: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom speedtest shogun160**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_speedtest_download_speed_color | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_download_speed_entity | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_download_speed_max | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_ping_color | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_ping_entity | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_ping_max | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_round | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_upload_speed_color | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_upload_speed_entity | no | Ported optional field from original YAML |
| ulm_custom_card_speedtest_upload_speed_max | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_speedtest_shogun160.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_speedtest_shogun160
```

New:
```yaml
type: custom:ulm-custom-card-speedtest-shogun160-card
entity: entity.example
```
