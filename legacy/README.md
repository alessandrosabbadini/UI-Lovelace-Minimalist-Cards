# Legacy reference (not shipped to users)

Original YAML sources kept only as a porting reference.

## `popup_templates/`

Button-card / browser_mod popup templates from the classic UI Lovelace Minimalist
integration. The Lit package already has a basic `ulm-popup` dialog; the remaining
work is to port these sub-popups (color temp, sources, radar, history, maps, …)
into `editable-cards/src/popups/`.

**Do not install or copy these into Home Assistant** — they depend on
`custom:button-card` and the removed card templates.
