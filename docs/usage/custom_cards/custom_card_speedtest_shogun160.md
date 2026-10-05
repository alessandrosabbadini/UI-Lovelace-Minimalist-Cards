---
title: Custom-card "Speedtest Shogun160"
hide:
  - toc
---

# Custom-card "Speedtest Shogun160"

Lit port of `custom_card_speedtest_shogun160` — download / upload / ping SVG gauges (no HACS apexcharts).

```yaml
type: custom:ulm-custom-card-speedtest-shogun160-card
download_entity: sensor.speedtest_download
upload_entity: sensor.speedtest_upload
ping_entity: sensor.speedtest_ping
download_max: 100
upload_max: 40
ping_max: 85
```

Tap refreshes all three entities via `homeassistant.update_entity`.
