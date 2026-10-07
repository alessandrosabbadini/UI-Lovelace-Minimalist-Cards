---
title: Custom-card "Schumijo Car"
hide:
  - toc
---

# Custom-card "Schumijo Car"

Lit port of `custom_card_schumijo_car` — tracker header with lock/home badges plus energy and range widgets. Tap opens more-info on the tracker (no browser_mod popup).

```yaml
type: custom:ulm-custom-card-schumijo-car-card
entity: person.alessandro_sabbadini
name: Car
lock_entity: lock.front_door_lock
energy_entity: sensor.power_consumption
range_entity: sensor.outside_temperature
```
