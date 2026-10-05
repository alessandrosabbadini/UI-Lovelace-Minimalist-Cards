---
title: Custom-card "Nik NAS"
hide:
  - toc
---

# Custom-card "Nik NAS"

Lit port of `custom_card_nik_nas` — power switch status; when on, up to 4 colored metric rows. Apexcharts radialBar nesting from the original YAML is omitted in this lighter port.

```yaml
type: custom:ulm-custom-card-nik-nas-card
entity: switch.ac
name: NAS
entity_1: sensor.power_consumption
name_1: CPU
icon_1: mdi:cpu-64-bit
color_1: blue
```
