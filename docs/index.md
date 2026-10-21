---
title: UI Lovelace Minimalist Cards
hide:
  - toc
  - navigation
---

<!-- markdownlint-disable MD046 -->

# UI Lovelace Minimalist Cards

Lit custom cards inspired by [UI Lovelace Minimalist](https://github.com/UI-Lovelace-Minimalist/UI), with native Home Assistant editors — no `custom:button-card` YAML templates.

!!! warning "Work in progress"

    This fork is under active development and **not production-ready**.
    Card types, layouts, and install steps may still change.

<div class="home-gallery" markdown="0">
  <figure>
    <img src="assets/img/example_home.png" alt="Home dashboard">
    <figcaption>Home</figcaption>
  </figure>
  <figure>
    <img src="assets/img/example_temperature.png" alt="Temperature view">
    <figcaption>Climate</figcaption>
  </figure>
  <figure>
    <img src="assets/img/example_consumption.png" alt="Energy consumption">
    <figcaption>Energy</figcaption>
  </figure>
  <figure>
    <img src="assets/img/example_localisation.png" alt="Presence / localisation">
    <figcaption>Presence</figcaption>
  </figure>
</div>

## Cards & chips

Official cards, community cards, and chips — all available from the Lovelace card picker under **ULM**.

<div class="home-row" markdown="0">
  <img src="assets/img/cards.png" alt="Official cards overview">
  <img src="assets/img/chips.png" alt="Chips overview">
  <img src="assets/img/title.png" alt="Title card">
  <img src="assets/img/anatomy.png" alt="Card anatomy">
</div>

### Lights & climate

<div class="home-row" markdown="0">
  <img src="assets/img/light_light.png" alt="Light card">
  <img src="assets/img/light_dark_slider.png" alt="Light with slider">
  <img src="assets/img/thermostat_white.png" alt="Thermostat card">
  <img src="assets/img/thermostat_dark_with_heating_ui.png" alt="Thermostat heating UI">
</div>

## Native popups

Tap a card with `enable_popup` to open Minimalist-style dialogs (light, cover, media, thermostat, vacuum, weather, power outlet).

<div class="home-gallery home-gallery--wide" markdown="0">
  <figure>
    <img src="assets/img/popup_light_phone.png" alt="Light popup">
    <figcaption>Light</figcaption>
  </figure>
  <figure>
    <img src="assets/img/popup_media_phone.png" alt="Media popup">
    <figcaption>Media</figcaption>
  </figure>
  <figure>
    <img src="assets/img/popup_thermostat_phone.png" alt="Thermostat popup">
    <figcaption>Thermostat</figcaption>
  </figure>
  <figure>
    <img src="assets/img/popup_weather_phone.png" alt="Weather popup">
    <figcaption>Weather</figcaption>
  </figure>
  <figure>
    <img src="assets/img/popup_power_phone.png" alt="Power outlet popup">
    <figcaption>Power outlet</figcaption>
  </figure>
  <figure>
    <img src="assets/img/popup_cover.png" alt="Cover popup">
    <figcaption>Cover</figcaption>
  </figure>
</div>

## Install

1. HACS → **Custom repositories** → `alessandrosabbadini/UI-Lovelace-Minimalist-Cards` → category **Dashboard**
2. Download / install, restart Home Assistant if prompted
3. Dashboard **UI mode** → Add card → search **ULM**

Themes (desktop, mobile, tapbar) stay available via the integration themefiles.

See [Setup](setup/download.md) and the [root README](https://github.com/alessandrosabbadini/UI-Lovelace-Minimalist-Cards#readme) for details.

## Credits

Derived from [UI Lovelace Minimalist](https://github.com/UI-Lovelace-Minimalist/UI) (MIT) by [tben](https://community.home-assistant.io/u/tben/summary), inspired by [7ahang](https://www.behance.net/gallery/88433905/Redesign-Smart-Home).
