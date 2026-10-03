---
title: homeassistant updates
hide:
  - toc
---

# homeassistant updates

Editable Home Assistant card port of the Minimalist custom card `custom_card_homeassistant_updates`.

## Credits

Original author: AndyVRD - 2021 (v1.0.2)

## New card type

```yaml
type: custom:ulm-custom-card-homeassistant-updates-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_card_homeassistant_entity: # optional
ulm_no_updates_available: # optional
ulm_updates_available: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom homeassistant updates**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_homeassistant_core | no | Ported optional field from original YAML |
| ulm_card_homeassistant_entity | no | Ported optional field from original YAML |
| ulm_card_homeassistant_os | no | Ported optional field from original YAML |
| ulm_card_homeassistant_supervisor | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_no_updates_available | no | Ported optional field from original YAML |
| ulm_updates_available | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_homeassistant_updates.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_homeassistant_updates
```

New:
```yaml
type: custom:ulm-custom-card-homeassistant-updates-card
entity: entity.example
```
