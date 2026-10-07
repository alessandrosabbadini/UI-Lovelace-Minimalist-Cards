---
title: Custom-card "Person Info"
hide:
  - toc
---

# Custom-card "Person Info"

Lit port of `custom_card_person_info` — zone badge, optional battery and commute rows.

```yaml
type: custom:ulm-custom-card-person-info-card
entity: person.anne_therese
use_entity_picture: false
zone1: zone.work
battery_entity: sensor.phone_battery
commute_entity: sensor.commute_minutes
multiline: true
```

Accepts short keys and legacy `ulm_card_person_*` / `ulm_address*` variables.
