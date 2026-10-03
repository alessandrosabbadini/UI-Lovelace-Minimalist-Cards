---
title: nik door
hide:
  - toc
---

# nik door

Editable Home Assistant card port of the Minimalist custom card `custom_card_nik_door`.

## Credits

Original author: Nik - 2022 Version: 2.0.0 (v2.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-nik-door-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
ulm_custom_card_entity_1_lock: # optional
ulm_custom_card_entity_1_lock_battery: # optional
ulm_custom_card_entity_1_name: # optional
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom nik door**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_custom_card_entity_1_lock | no | Ported optional field from original YAML |
| ulm_custom_card_entity_1_lock_battery | no | Ported optional field from original YAML |
| ulm_custom_card_entity_1_name | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `custom_card_nik_door.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_nik_door
```

New:
```yaml
type: custom:ulm-custom-card-nik-door-card
entity: entity.example
```
