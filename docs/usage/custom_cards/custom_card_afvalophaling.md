---
title: afvalophaling
hide:
  - toc
---

# afvalophaling

Editable Home Assistant card port of the Minimalist custom card `custom_card_afvalophaling`.

## Credits

Original author: AndyVRD - 2021 (v1.0.0)

## New card type

```yaml
type: custom:ulm-custom-card-afvalophaling-card
entity: <main_entity>
name: Optional name
icon: mdi:icon
color: blue
force_background_color: false
# Extra fields mapped from original variables (optional strings):
# (see Variables)
```

## UI editor

Add the card from the Lovelace picker: **ULM Custom afvalophaling**.

## Variables

| Variable | Required | Notes |
| --- | --- | --- |
| entity | yes | Main entity shown on the card |
| name | no | Override friendly name |
| icon | no | Override icon (default `mdi:puzzle`) |
| color | no | Theme color: yellow/blue/green/red/pink/purple/grey |
| force_background_color | no | Colored background when active |
| ulm_card_datum_gft | no | Ported optional field from original YAML |
| ulm_card_datum_glas | no | Ported optional field from original YAML |
| ulm_card_datum_papier | no | Ported optional field from original YAML |
| ulm_card_datum_pmd | no | Ported optional field from original YAML |
| ulm_card_datum_rest | no | Ported optional field from original YAML |
| ulm_card_ophaling_morgen | no | Ported optional field from original YAML |
| ulm_card_ophaling_vandaag | no | Ported optional field from original YAML |
| ulm_language_variables | no | Ported optional field from original YAML |
| ulm_ophaling | no | Ported optional field from original YAML |
| ulm_volgende_ophaling | no | Ported optional field from original YAML |

## Legacy YAML

Original button-card templates remain in this folder for reference:
- `card_afvalophaling.yaml`

## Migration

Old:
```yaml
type: custom:button-card
template: custom_card_afvalophaling
```

New:
```yaml
type: custom:ulm-custom-card-afvalophaling-card
entity: entity.example
```
