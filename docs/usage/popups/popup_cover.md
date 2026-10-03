---
title: popup_cover
hide:
  - toc
---

# popup_cover

Cover open/stop/close popup

## How to use (editable cards)

Enable popup on a supported card in the UI editor (`enable_popup: true`), e.g.:

```yaml
type: custom:ulm-light-card
entity: light.living_room
enable_popup: true
```

Supported popup kinds currently implemented in `editable-cards`:
`cover` (plus light, cover, thermostat, media_player, vacuum, weather, power_outlet).

## Notes

This is a native JS dialog port of the old browser_mod / button-card popup templates.
Sub-popups (color temp, source lists, radar, maps, history graphs) are staged for follow-up and open more-info as fallback when not yet ported.
