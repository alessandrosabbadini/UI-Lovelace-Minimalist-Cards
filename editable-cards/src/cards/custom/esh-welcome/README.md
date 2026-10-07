---
title: Custom-card "esh Welcome"
hide:
  - toc
---

# Custom-card "esh Welcome"

Lit port of `custom_card_esh_welcome` — weather topbar, time-based greeting, up to five nav pills.

```yaml
type: custom:ulm-custom-card-esh-welcome-card
weather: weather.home
collapse: input_boolean.welcome_collapse
entity_1:
  name: Home
  icon: mdi:home
  color: blue
  path: /lovelace/0
```

Legacy: `ulm_weather`, `ulm_card_esh_welcome_collapse`.
