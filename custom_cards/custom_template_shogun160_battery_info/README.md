---
title: Template shogun160 battery info
hide:
  - toc
---

# Template shogun160 battery info

Editable Home Assistant card port of the Minimalist custom card `custom_template_shogun160_battery_info`.


## New card type

```yaml
type: custom:ulm-custom-template-shogun160-battery-info-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_battery_entity: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom Template shogun160 battery info**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_battery_entity | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_template_shogun160_battery_info.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_template_shogun160_battery_info
```

New:
```yaml
type: custom:ulm-custom-template-shogun160-battery-info-card
entity: entity.example
```
