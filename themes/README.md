# UI Lovelace Minimalist — Themes (original)

Copied from upstream `lovelace/themefiles/` (UI-Lovelace-Minimalist/UI).

| Theme | Original behaviour |
| --- | --- |
| `minimalist-desktop` | Header / tabs visible |
| `minimalist-mobile` | **Hides** header/tapbar with `display: none` on `.header` |
| `minimalist-mobile-tapbar` | Moves header to a **bottom** tapbar |
| `minimalist-ios-tapbar` | iOS-style bottom tapbar |

`minimalist-mobile` uses the original hide rule:

```yaml
card-mod-root: |
  .header {
    display: none;
  }
```

plus the same `display: none` on `ha-top-app-bar-fixed` for Home Assistant 2026+
(the old `.header` host was renamed — still hide, never move).

## Setup

```yaml
frontend:
  themes: !include_dir_merge_named themes
  extra_module_url:
    - /local/card-mod.js   # required for theme card-mod-* rules
```

Profile → Theme → **minimalist-mobile** to hide the tapbar.
