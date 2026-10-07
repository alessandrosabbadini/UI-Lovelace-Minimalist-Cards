---
title: Custom-card "Haven Washer"
hide:
  - toc
---

# Custom-card "Haven Washer"

Lit port (useful subset) of `custom_card_haven_washer` — power header (blue when on), optional phase icons, native progress bar, and optional start/pause/stop services.

```yaml
type: custom:ulm-custom-card-haven-washer-card
power_entity: switch.decorative_lights
name: Washer
job_progress: sensor.power_consumption
job_states: '{"state1":{"name":"wash","icon":"mdi:waves"},"state2":{"name":"rinse","icon":"mdi:water"}}'
# optional: start_service / pause_service / stop_service as "domain.service"
```
