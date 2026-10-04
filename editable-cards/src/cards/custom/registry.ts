/* Auto-generated custom card registry — do not edit by hand */
import { createSimpleEntityCard } from "../../shared/simple-entity-card";
import { textField, type HaFormSchema } from "../../shared/config-form";

function extraSchema(keys: string[]): HaFormSchema[] {
  return keys.map((key) => textField(key));
}

export const CUSTOM_CARD_DEFS = [
  {
    "dir": "custom_card_afvalophaling",
    "tag": "ulm-custom-card-afvalophaling-card",
    "editorTag": "ulm-custom-card-afvalophaling-card-editor",
    "type": "custom:ulm-custom-card-afvalophaling-card",
    "name": "ULM Custom afvalophaling",
    "description": "Minimalist custom card port: custom_card_afvalophaling",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_alarm_time",
    "tag": "ulm-custom-card-alarm-time-card",
    "editorTag": "ulm-custom-card-alarm-time-card-editor",
    "type": "custom:ulm-custom-card-alarm-time-card",
    "name": "ULM Custom alarm time",
    "description": "Minimalist custom card port: custom_card_alarm_time",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_apexcharts",
    "tag": "ulm-custom-card-apexcharts-card",
    "editorTag": "ulm-custom-card-apexcharts-card-editor",
    "type": "custom:ulm-custom-card-apexcharts-card",
    "name": "ULM Custom apexcharts",
    "description": "Minimalist custom card port: custom_card_apexcharts",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_bar_card",
    "tag": "ulm-custom-card-bar-card-card",
    "editorTag": "ulm-custom-card-bar-card-card-editor",
    "type": "custom:ulm-custom-card-bar-card-card",
    "name": "ULM Custom bar card",
    "description": "Minimalist custom card port: custom_card_bar_card",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_camera",
    "tag": "ulm-custom-card-camera-card",
    "editorTag": "ulm-custom-card-camera-card-editor",
    "type": "custom:ulm-custom-card-camera-card",
    "name": "ULM Custom camera",
    "description": "Minimalist custom card port: custom_card_camera",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_camera_aspect_ratio",
      "ulm_custom_card_camera_label",
      "ulm_custom_card_camera_name",
      "ulm_custom_card_camera_title"
    ]
  },
  {
    "dir": "custom_card_chromecast",
    "tag": "ulm-custom-card-chromecast-card",
    "editorTag": "ulm-custom-card-chromecast-card-editor",
    "type": "custom:ulm-custom-card-chromecast-card",
    "name": "ULM Custom chromecast",
    "description": "Minimalist custom card port: custom_card_chromecast",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_media_player_with_controls_entity",
      "ulm_card_media_player_with_controls_name"
    ]
  },
  {
    "dir": "custom_card_damix48_power_details",
    "tag": "ulm-custom-card-damix48-power-details-card",
    "editorTag": "ulm-custom-card-damix48-power-details-card-editor",
    "type": "custom:ulm-custom-card-damix48-power-details-card",
    "name": "ULM Custom damix48 power details",
    "description": "Minimalist custom card port: custom_card_damix48_power_details",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_power_details_entity"
    ]
  },
  {
    "dir": "custom_card_device_tracker",
    "tag": "ulm-custom-card-device-tracker-card",
    "editorTag": "ulm-custom-card-device-tracker-card-editor",
    "type": "custom:ulm-custom-card-device-tracker-card",
    "name": "ULM Custom device tracker",
    "description": "Minimalist custom card port: custom_card_device_tracker",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_device_tracker_tracker_1_entity",
      "ulm_custom_card_device_tracker_tracker_2_entity"
    ]
  },
  {
    "dir": "custom_card_drealine_roomview",
    "tag": "ulm-custom-card-drealine-roomview-card",
    "editorTag": "ulm-custom-card-drealine-roomview-card-editor",
    "type": "custom:ulm-custom-card-drealine-roomview-card",
    "name": "ULM Custom drealine roomview",
    "description": "Minimalist custom card port: custom_card_drealine_roomview",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_eraycetinay_elapsed_time",
    "tag": "ulm-custom-card-eraycetinay-elapsed-time-card",
    "editorTag": "ulm-custom-card-eraycetinay-elapsed-time-card-editor",
    "type": "custom:ulm-custom-card-eraycetinay-elapsed-time-card",
    "name": "ULM Custom eraycetinay elapsed time",
    "description": "Minimalist custom card port: custom_card_eraycetinay_elapsed_time",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_eraycetinay_lock",
    "tag": "ulm-custom-card-eraycetinay-lock-card",
    "editorTag": "ulm-custom-card-eraycetinay-lock-card-editor",
    "type": "custom:ulm-custom-card-eraycetinay-lock-card",
    "name": "ULM Custom eraycetinay lock",
    "description": "Minimalist custom card port: custom_card_eraycetinay_lock",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_eraycetinay_lock_battery_is_at",
      "ulm_custom_card_eraycetinay_lock_battery_is_low",
      "ulm_custom_card_eraycetinay_lock_battery_level",
      "ulm_custom_card_eraycetinay_lock_battery_sensor_binary",
      "ulm_custom_card_eraycetinay_lock_battery_sensor_binary_low_state",
      "ulm_custom_card_eraycetinay_lock_battery_warning"
    ]
  },
  {
    "dir": "custom_card_esh_room",
    "tag": "ulm-custom-card-esh-room-card",
    "editorTag": "ulm-custom-card-esh-room-card-editor",
    "type": "custom:ulm-custom-card-esh-room-card",
    "name": "ULM Custom esh room",
    "description": "Minimalist custom card port: custom_card_esh_room",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_cover_popup",
      "ulm_card_esh_room_cover_icon_closed",
      "ulm_card_esh_room_cover_icon_closing",
      "ulm_card_esh_room_cover_icon_open",
      "ulm_card_esh_room_cover_icon_opening",
      "ulm_card_esh_room_light_icon_off"
    ]
  },
  {
    "dir": "custom_card_esh_welcome",
    "tag": "ulm-custom-card-esh-welcome-card",
    "editorTag": "ulm-custom-card-esh-welcome-card-editor",
    "type": "custom:ulm-custom-card-esh-welcome-card",
    "name": "ULM Custom esh welcome",
    "description": "Minimalist custom card port: custom_card_esh_welcome",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_weather"
    ]
  },
  {
    "dir": "custom_card_haven_washer",
    "tag": "ulm-custom-card-haven-washer-card",
    "editorTag": "ulm-custom-card-haven-washer-card-editor",
    "type": "custom:ulm-custom-card-haven-washer-card",
    "name": "ULM Custom haven washer",
    "description": "Minimalist custom card port: custom_card_haven_washer",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_heat_pump",
    "tag": "ulm-custom-card-heat-pump-card",
    "editorTag": "ulm-custom-card-heat-pump-card-editor",
    "type": "custom:ulm-custom-card-heat-pump-card",
    "name": "ULM Custom heat pump",
    "description": "Minimalist custom card port: custom_card_heat_pump",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_homeassistant_updates",
    "tag": "ulm-custom-card-homeassistant-updates-card",
    "editorTag": "ulm-custom-card-homeassistant-updates-card-editor",
    "type": "custom:ulm-custom-card-homeassistant-updates-card",
    "name": "ULM Custom homeassistant updates",
    "description": "Minimalist custom card port: custom_card_homeassistant_updates",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_homeassistant_entity",
      "ulm_no_updates_available",
      "ulm_updates_available"
    ]
  },
  {
    "dir": "custom_card_httpedo13_sun",
    "tag": "ulm-custom-card-httpedo13-sun-card",
    "editorTag": "ulm-custom-card-httpedo13-sun-card-editor",
    "type": "custom:ulm-custom-card-httpedo13-sun-card",
    "name": "ULM Custom httpedo13 sun",
    "description": "Minimalist custom card port: custom_card_httpedo13_sun",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_httpedo13_thermostat",
    "tag": "ulm-custom-card-httpedo13-thermostat-card",
    "editorTag": "ulm-custom-card-httpedo13-thermostat-card-editor",
    "type": "custom:ulm-custom-card-httpedo13-thermostat-card",
    "name": "ULM Custom httpedo13 thermostat",
    "description": "Minimalist custom card port: custom_card_httpedo13_thermostat",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_iAbadia_battery_chip",
    "tag": "ulm-custom-card-iAbadia-battery-chip-card",
    "editorTag": "ulm-custom-card-iAbadia-battery-chip-card-editor",
    "type": "custom:ulm-custom-card-iAbadia-battery-chip-card",
    "name": "ULM Custom iAbadia battery chip",
    "description": "Minimalist custom card port: custom_card_iAbadia_battery_chip",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_iAbadia_battery_chip_entity"
    ]
  },
  {
    "dir": "custom_card_imswel_medias",
    "tag": "ulm-custom-card-imswel-medias-card",
    "editorTag": "ulm-custom-card-imswel-medias-card-editor",
    "type": "custom:ulm-custom-card-imswel-medias-card",
    "name": "ULM Custom imswel medias",
    "description": "Minimalist custom card port: custom_card_imswel_medias",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_imswel_medias_index",
      "ulm_custom_card_imswel_medias_platform"
    ]
  },
  {
    "dir": "custom_card_imswel_person",
    "tag": "ulm-custom-card-imswel-person-card",
    "editorTag": "ulm-custom-card-imswel-person-card-editor",
    "type": "custom:ulm-custom-card-imswel-person-card",
    "name": "ULM Custom imswel person",
    "description": "Minimalist custom card port: custom_card_imswel_person",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_imswel_person_entity",
      "ulm_card_imswel_person_findmy_script",
      "ulm_card_imswel_person_gps_tracker",
      "ulm_card_imswel_person_use_entity_picture",
      "ulm_card_imswel_person_wifi_tracker",
      "ulm_custom_card_imswel_person_findmy"
    ]
  },
  {
    "dir": "custom_card_input_datetime",
    "tag": "ulm-custom-card-input-datetime-card",
    "editorTag": "ulm-custom-card-input-datetime-card-editor",
    "type": "custom:ulm-custom-card-input-datetime-card",
    "name": "ULM Custom input datetime",
    "description": "Minimalist custom card port: custom_card_input_datetime",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_input_number",
    "tag": "ulm-custom-card-input-number-card",
    "editorTag": "ulm-custom-card-input-number-card-editor",
    "type": "custom:ulm-custom-card-input-number-card",
    "name": "ULM Custom input number",
    "description": "Minimalist custom card port: custom_card_input_number",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_irmajavi_entities",
    "tag": "ulm-custom-card-irmajavi-entities-card",
    "editorTag": "ulm-custom-card-irmajavi-entities-card-editor",
    "type": "custom:ulm-custom-card-irmajavi-entities-card",
    "name": "ULM Custom irmajavi entities",
    "description": "Minimalist custom card port: custom_card_irmajavi_entities",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_irmajavi_entities_entity_1",
      "ulm_custom_card_irmajavi_entities_entity_2",
      "ulm_custom_card_irmajavi_entities_entity_3",
      "ulm_custom_card_irmajavi_entities_entity_4"
    ]
  },
  {
    "dir": "custom_card_irmajavi_speedtest",
    "tag": "ulm-custom-card-irmajavi-speedtest-card",
    "editorTag": "ulm-custom-card-irmajavi-speedtest-card-editor",
    "type": "custom:ulm-custom-card-irmajavi-speedtest-card",
    "name": "ULM Custom irmajavi speedtest",
    "description": "Minimalist custom card port: custom_card_irmajavi_speedtest",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_irmajavi_speedtest_download_speed_entity",
      "ulm_custom_card_irmajavi_speedtest_ping_entity",
      "ulm_custom_card_irmajavi_speedtest_upload_speed_entity"
    ]
  },
  {
    "dir": "custom_card_irmajavi_weather",
    "tag": "ulm-custom-card-irmajavi-weather-card",
    "editorTag": "ulm-custom-card-irmajavi-weather-card-editor",
    "type": "custom:ulm-custom-card-irmajavi-weather-card",
    "name": "ULM Custom irmajavi weather",
    "description": "Minimalist custom card port: custom_card_irmajavi_weather",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_irmajavi_weather",
      "ulm_custom_card_irmajavi_weather_date",
      "ulm_custom_card_irmajavi_weather_entity_1",
      "ulm_custom_card_irmajavi_weather_entity_2",
      "ulm_custom_card_irmajavi_weather_entity_3",
      "ulm_custom_card_irmajavi_weather_entity_4"
    ]
  },
  {
    "dir": "custom_card_light_colorpick",
    "tag": "ulm-custom-card-light-colorpick-card",
    "editorTag": "ulm-custom-card-light-colorpick-card-editor",
    "type": "custom:ulm-custom-card-light-colorpick-card",
    "name": "ULM Custom light colorpick",
    "description": "Minimalist custom card port: custom_card_light_colorpick",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_light_colorpick_name",
      "ulm_card_light_colorpick_transition",
      "ulm_card_light_slider_horizontal_name"
    ]
  },
  {
    "dir": "custom_card_media_player_sonos",
    "tag": "ulm-custom-card-media-player-sonos-card",
    "editorTag": "ulm-custom-card-media-player-sonos-card-editor",
    "type": "custom:ulm-custom-card-media-player-sonos-card",
    "name": "ULM Custom media player sonos",
    "description": "Minimalist custom card port: custom_card_media_player_sonos",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_media_player_with_controls_entity",
      "ulm_card_media_player_with_controls_name"
    ]
  },
  {
    "dir": "custom_card_more_power_outlet",
    "tag": "ulm-custom-card-more-power-outlet-card",
    "editorTag": "ulm-custom-card-more-power-outlet-card-editor",
    "type": "custom:ulm-custom-card-more-power-outlet-card",
    "name": "ULM Custom more power outlet",
    "description": "Minimalist custom card port: custom_card_more_power_outlet",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_mpse_gauge",
    "tag": "ulm-custom-card-mpse-gauge-card",
    "editorTag": "ulm-custom-card-mpse-gauge-card-editor",
    "type": "custom:ulm-custom-card-mpse-gauge-card",
    "name": "ULM Custom mpse gauge",
    "description": "Minimalist custom card port: custom_card_mpse_gauge",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_mpse_printer",
    "tag": "ulm-custom-card-mpse-printer-card",
    "editorTag": "ulm-custom-card-mpse-printer-card-editor",
    "type": "custom:ulm-custom-card-mpse-printer-card",
    "name": "ULM Custom mpse printer",
    "description": "Minimalist custom card port: custom_card_mpse_printer",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_printer_black_name",
      "ulm_card_printer_cyan_name",
      "ulm_card_printer_magenta_name",
      "ulm_card_printer_name",
      "ulm_card_printer_yellow_name"
    ]
  },
  {
    "dir": "custom_card_mpse_thermostat",
    "tag": "ulm-custom-card-mpse-thermostat-card",
    "editorTag": "ulm-custom-card-mpse-thermostat-card-editor",
    "type": "custom:ulm-custom-card-mpse-thermostat-card",
    "name": "ULM Custom mpse thermostat",
    "description": "Minimalist custom card port: custom_card_mpse_thermostat",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_mpse_wifisignal",
    "tag": "ulm-custom-card-mpse-wifisignal-card",
    "editorTag": "ulm-custom-card-mpse-wifisignal-card-editor",
    "type": "custom:ulm-custom-card-mpse-wifisignal-card",
    "name": "ULM Custom mpse wifisignal",
    "description": "Minimalist custom card port: custom_card_mpse_wifisignal",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_nas",
    "tag": "ulm-custom-card-nas-card",
    "editorTag": "ulm-custom-card-nas-card-editor",
    "type": "custom:ulm-custom-card-nas-card",
    "name": "ULM Custom nas",
    "description": "Minimalist custom card port: custom_card_nas",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_nas_sensor",
      "ulm_custom_card_nas_text",
      "ulm_custom_card_nas_unit"
    ]
  },
  {
    "dir": "custom_card_neekster_update",
    "tag": "ulm-custom-card-neekster-update-card",
    "editorTag": "ulm-custom-card-neekster-update-card-editor",
    "type": "custom:ulm-custom-card-neekster-update-card",
    "name": "ULM Custom neekster update",
    "description": "Minimalist custom card port: custom_card_neekster_update",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_neekster_update_collapsible",
      "ulm_card_neekster_update_enable_controls",
      "ulm_card_neekster_update_horizontal",
      "ulm_card_neekster_update_icon",
      "ulm_card_neekster_update_narrow_buttons"
    ]
  },
  {
    "dir": "custom_card_nik_clock",
    "tag": "ulm-custom-card-nik-clock-card",
    "editorTag": "ulm-custom-card-nik-clock-card-editor",
    "type": "custom:ulm-custom-card-nik-clock-card",
    "name": "ULM Custom nik clock",
    "description": "Minimalist custom card port: custom_card_nik_clock",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_nik_clock_switch",
      "ulm_custom_card_nik_clock_switch_enable"
    ]
  },
  {
    "dir": "custom_card_nik_door",
    "tag": "ulm-custom-card-nik-door-card",
    "editorTag": "ulm-custom-card-nik-door-card-editor",
    "type": "custom:ulm-custom-card-nik-door-card",
    "name": "ULM Custom nik door",
    "description": "Minimalist custom card port: custom_card_nik_door",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_entity_1_lock",
      "ulm_custom_card_entity_1_lock_battery",
      "ulm_custom_card_entity_1_name"
    ]
  },
  {
    "dir": "custom_card_nik_nas",
    "tag": "ulm-custom-card-nik-nas-card",
    "editorTag": "ulm-custom-card-nik-nas-card-editor",
    "type": "custom:ulm-custom-card-nik-nas-card",
    "name": "ULM Custom nik nas",
    "description": "Minimalist custom card port: custom_card_nik_nas",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_nik_tablet",
    "tag": "ulm-custom-card-nik-tablet-card",
    "editorTag": "ulm-custom-card-nik-tablet-card-editor",
    "type": "custom:ulm-custom-card-nik-tablet-card",
    "name": "ULM Custom nik tablet",
    "description": "Minimalist custom card port: custom_card_nik_tablet",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_bar_card_nik_tablet_card_entity"
    ]
  },
  {
    "dir": "custom_card_paddy_dwd_pollen",
    "tag": "ulm-custom-card-paddy-dwd-pollen-card",
    "editorTag": "ulm-custom-card-paddy-dwd-pollen-card-editor",
    "type": "custom:ulm-custom-card-paddy-dwd-pollen-card",
    "name": "ULM Custom paddy dwd pollen",
    "description": "Minimalist custom card port: custom_card_paddy_dwd_pollen",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_paddy_waste_collection",
    "tag": "ulm-custom-card-paddy-waste-collection-card",
    "editorTag": "ulm-custom-card-paddy-waste-collection-card-editor",
    "type": "custom:ulm-custom-card-paddy-waste-collection-card",
    "name": "ULM Custom paddy waste collection",
    "description": "Minimalist custom card port: custom_card_paddy_waste_collection",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_paddy_welcome",
    "tag": "ulm-custom-card-paddy-welcome-card",
    "editorTag": "ulm-custom-card-paddy-welcome-card-editor",
    "type": "custom:ulm-custom-card-paddy-welcome-card",
    "name": "ULM Custom paddy welcome",
    "description": "Minimalist custom card port: custom_card_paddy_welcome",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_paddy_welcome_weather_provider"
    ]
  },
  {
    "dir": "custom_card_person_chip",
    "tag": "ulm-custom-card-person-chip-card",
    "editorTag": "ulm-custom-card-person-chip-card-editor",
    "type": "custom:ulm-custom-card-person-chip-card",
    "name": "ULM Custom person chip",
    "description": "Minimalist custom card port: custom_card_person_chip",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_person_chip_entity"
    ]
  },
  {
    "dir": "custom_card_person_info",
    "tag": "ulm-custom-card-person-info-card",
    "editorTag": "ulm-custom-card-person-info-card-editor",
    "type": "custom:ulm-custom-card-person-info-card",
    "name": "ULM Custom person info",
    "description": "Minimalist custom card port: custom_card_person_info",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_person_battery_entity",
      "ulm_card_person_battery_state_entity",
      "ulm_card_person_commute_entity",
      "ulm_card_person_commute_icon",
      "ulm_card_person_cummute_icon",
      "ulm_card_person_driving_entity"
    ]
  },
  {
    "dir": "custom_card_person_info_small",
    "tag": "ulm-custom-card-person-info-small-card",
    "editorTag": "ulm-custom-card-person-info-small-card-editor",
    "type": "custom:ulm-custom-card-person-info-small-card",
    "name": "ULM Custom person info small",
    "description": "Minimalist custom card port: custom_card_person_info_small",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_person_battery_entity",
      "ulm_card_person_battery_state_entity",
      "ulm_card_person_driving_entity",
      "ulm_card_person_entity",
      "ulm_card_person_icon",
      "ulm_card_person_use_entity_picture"
    ]
  },
  {
    "dir": "custom_card_playstation",
    "tag": "ulm-custom-card-playstation-card",
    "editorTag": "ulm-custom-card-playstation-card-editor",
    "type": "custom:ulm-custom-card-playstation-card",
    "name": "ULM Custom playstation",
    "description": "Minimalist custom card port: custom_card_playstation",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_qubino",
    "tag": "ulm-custom-card-qubino-card",
    "editorTag": "ulm-custom-card-qubino-card-editor",
    "type": "custom:ulm-custom-card-qubino-card",
    "name": "ULM Custom qubino",
    "description": "Minimalist custom card port: custom_card_qubino",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_ristou_person",
    "tag": "ulm-custom-card-ristou-person-card",
    "editorTag": "ulm-custom-card-ristou-person-card-editor",
    "type": "custom:ulm-custom-card-ristou-person-card",
    "name": "ULM Custom ristou person",
    "description": "Minimalist custom card port: custom_card_ristou_person",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_ristou_camera_entity_dark",
      "ulm_custom_card_ristou_camera_entity_light",
      "ulm_custom_card_ristou_person_driving",
      "ulm_custom_card_ristou_person_driving_entity",
      "ulm_custom_card_ristou_person_language_variables",
      "ulm_custom_card_ristou_person_language_variables1"
    ]
  },
  {
    "dir": "custom_card_saxel_fan",
    "tag": "ulm-custom-card-saxel-fan-card",
    "editorTag": "ulm-custom-card-saxel-fan-card-editor",
    "type": "custom:ulm-custom-card-saxel-fan-card",
    "name": "ULM Custom saxel fan",
    "description": "Minimalist custom card port: custom_card_saxel_fan",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_fan_horizontal",
      "ulm_card_fan_hum_attribute",
      "ulm_card_fan_temp_attribute"
    ]
  },
  {
    "dir": "custom_card_scenes",
    "tag": "ulm-custom-card-scenes-card",
    "editorTag": "ulm-custom-card-scenes-card-editor",
    "type": "custom:ulm-custom-card-scenes-card",
    "name": "ULM Custom scenes",
    "description": "Minimalist custom card port: custom_card_scenes",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_schumijo_car",
    "tag": "ulm-custom-card-schumijo-car-card",
    "editorTag": "ulm-custom-card-schumijo-car-card-editor",
    "type": "custom:ulm-custom-card-schumijo-car-card",
    "name": "ULM Custom schumijo car",
    "description": "Minimalist custom card port: custom_card_schumijo_car",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_schumijo_car_lock"
    ]
  },
  {
    "dir": "custom_card_schumijo_flower",
    "tag": "ulm-custom-card-schumijo-flower-card",
    "editorTag": "ulm-custom-card-schumijo-flower-card-editor",
    "type": "custom:ulm-custom-card-schumijo-flower-card",
    "name": "ULM Custom schumijo flower",
    "description": "Minimalist custom card port: custom_card_schumijo_flower",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_card_flower_entity"
    ]
  },
  {
    "dir": "custom_card_senoro_win",
    "tag": "ulm-custom-card-senoro-win-card",
    "editorTag": "ulm-custom-card-senoro-win-card-editor",
    "type": "custom:ulm-custom-card-senoro-win-card",
    "name": "ULM Custom senoro win",
    "description": "Minimalist custom card port: custom_card_senoro_win",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_senoro_win_entity",
      "ulm_custom_card_senoro_win_locked"
    ]
  },
  {
    "dir": "custom_card_sisimomo_printer",
    "tag": "ulm-custom-card-sisimomo-printer-card",
    "editorTag": "ulm-custom-card-sisimomo-printer-card-editor",
    "type": "custom:ulm-custom-card-sisimomo-printer-card",
    "name": "ULM Custom sisimomo printer",
    "description": "Minimalist custom card port: custom_card_sisimomo_printer",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_speedtest_shogun160",
    "tag": "ulm-custom-card-speedtest-shogun160-card",
    "editorTag": "ulm-custom-card-speedtest-shogun160-card-editor",
    "type": "custom:ulm-custom-card-speedtest-shogun160-card",
    "name": "ULM Custom speedtest shogun160",
    "description": "Minimalist custom card port: custom_card_speedtest_shogun160",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_speedtest_download_speed_entity",
      "ulm_custom_card_speedtest_ping_entity",
      "ulm_custom_card_speedtest_upload_speed_entity"
    ]
  },
  {
    "dir": "custom_card_tpx01_aircondition",
    "tag": "ulm-custom-card-tpx01-aircondition-card",
    "editorTag": "ulm-custom-card-tpx01-aircondition-card-editor",
    "type": "custom:ulm-custom-card-tpx01-aircondition-card",
    "name": "ULM Custom tpx01 aircondition",
    "description": "Minimalist custom card port: custom_card_tpx01_aircondition",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_vncntdev_device_tracer",
    "tag": "ulm-custom-card-vncntdev-device-tracer-card",
    "editorTag": "ulm-custom-card-vncntdev-device-tracer-card-editor",
    "type": "custom:ulm-custom-card-vncntdev-device-tracer-card",
    "name": "ULM Custom vncntdev device tracer",
    "description": "Minimalist custom card port: custom_card_vncntdev_device_tracer",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_water_heater",
    "tag": "ulm-custom-card-water-heater-card",
    "editorTag": "ulm-custom-card-water-heater-card-editor",
    "type": "custom:ulm-custom-card-water-heater-card",
    "name": "ULM Custom water heater",
    "description": "Minimalist custom card port: custom_card_water_heater",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_wilbiev_subtitle",
    "tag": "ulm-custom-card-wilbiev-subtitle-card",
    "editorTag": "ulm-custom-card-wilbiev-subtitle-card-editor",
    "type": "custom:ulm-custom-card-wilbiev-subtitle-card",
    "name": "ULM Custom wilbiev subtitle",
    "description": "Minimalist custom card port: custom_card_wilbiev_subtitle",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_wilbiev_title",
    "tag": "ulm-custom-card-wilbiev-title-card",
    "editorTag": "ulm-custom-card-wilbiev-title-card-editor",
    "type": "custom:ulm-custom-card-wilbiev-title-card",
    "name": "ULM Custom wilbiev title",
    "description": "Minimalist custom card port: custom_card_wilbiev_title",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_wsly_pollen",
    "tag": "ulm-custom-card-wsly-pollen-card",
    "editorTag": "ulm-custom-card-wsly-pollen-card-editor",
    "type": "custom:ulm-custom-card-wsly-pollen-card",
    "name": "ULM Custom wsly pollen",
    "description": "Minimalist custom card port: custom_card_wsly_pollen",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_card_yagrasdemonde_lights_count",
    "tag": "ulm-custom-card-yagrasdemonde-lights-count-card",
    "editorTag": "ulm-custom-card-yagrasdemonde-lights-count-card-editor",
    "type": "custom:ulm-custom-card-yagrasdemonde-lights-count-card",
    "name": "ULM Custom yagrasdemonde lights count",
    "description": "Minimalist custom card port: custom_card_yagrasdemonde_lights_count",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_custom_card_yagrasdemonde_lights_count_color",
      "ulm_custom_card_yagrasdemonde_lights_count_cover_0",
      "ulm_custom_card_yagrasdemonde_lights_count_cover_1",
      "ulm_custom_card_yagrasdemonde_lights_count_cover_many",
      "ulm_custom_card_yagrasdemonde_lights_count_force_background_color",
      "ulm_custom_card_yagrasdemonde_lights_count_icon_off"
    ]
  },
  {
    "dir": "custom_chip_group_counter",
    "tag": "ulm-custom-chip-group-counter-card",
    "editorTag": "ulm-custom-chip-group-counter-card-editor",
    "type": "custom:ulm-custom-chip-group-counter-card",
    "name": "ULM Custom Chip group counter",
    "description": "Minimalist custom card port: custom_chip_group_counter",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_chip_moon",
    "tag": "ulm-custom-chip-moon-card",
    "editorTag": "ulm-custom-chip-moon-card-editor",
    "type": "custom:ulm-custom-chip-moon-card",
    "name": "ULM Custom Chip moon",
    "description": "Minimalist custom card port: custom_chip_moon",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_chip_myenedis",
    "tag": "ulm-custom-chip-myenedis-card",
    "editorTag": "ulm-custom-chip-myenedis-card-editor",
    "type": "custom:ulm-custom-chip-myenedis-card",
    "name": "ULM Custom Chip myenedis",
    "description": "Minimalist custom card port: custom_chip_myenedis",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_chip_simple_temp",
    "tag": "ulm-custom-chip-simple-temp-card",
    "editorTag": "ulm-custom-chip-simple-temp-card-editor",
    "type": "custom:ulm-custom-chip-simple-temp-card",
    "name": "ULM Custom Chip simple temp",
    "description": "Minimalist custom card port: custom_chip_simple_temp",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_chip_tesla_temperature",
    "tag": "ulm-custom-chip-tesla-temperature-card",
    "editorTag": "ulm-custom-chip-tesla-temperature-card-editor",
    "type": "custom:ulm-custom-chip-tesla-temperature-card",
    "name": "ULM Custom Chip tesla temperature",
    "description": "Minimalist custom card port: custom_chip_tesla_temperature",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_chip_update",
    "tag": "ulm-custom-chip-update-card",
    "editorTag": "ulm-custom-chip-update-card-editor",
    "type": "custom:ulm-custom-chip-update-card",
    "name": "ULM Custom Chip update",
    "description": "Minimalist custom card port: custom_chip_update",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_chip_update_path",
      "ulm_no_updates_available",
      "ulm_updates_available"
    ]
  },
  {
    "dir": "custom_chip_vlape_garage",
    "tag": "ulm-custom-chip-vlape-garage-card",
    "editorTag": "ulm-custom-chip-vlape-garage-card-editor",
    "type": "custom:ulm-custom-chip-vlape-garage-card",
    "name": "ULM Custom Chip vlape garage",
    "description": "Minimalist custom card port: custom_chip_vlape_garage",
    "defaultIcon": "mdi:circle-small",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": []
  },
  {
    "dir": "custom_template_shogun160_battery_info",
    "tag": "ulm-custom-template-shogun160-battery-info-card",
    "editorTag": "ulm-custom-template-shogun160-battery-info-card-editor",
    "type": "custom:ulm-custom-template-shogun160-battery-info-card",
    "name": "ULM Custom Template shogun160 battery info",
    "description": "Minimalist custom card port: custom_template_shogun160_battery_info",
    "defaultIcon": "mdi:puzzle",
    "defaultColor": "blue",
    "stubEntity": "sensor.demo",
    "extraKeys": [
      "ulm_battery_entity"
    ]
  }
] as const;

/** Tags with a dedicated Lit port under editable-cards/src/cards/custom/* */
const SPECIALIZED_CUSTOM_TAGS = new Set([
  "ulm-custom-card-afvalophaling-card",
  "ulm-custom-card-alarm-time-card",
  "ulm-custom-card-apexcharts-card",
  "ulm-custom-card-bar-card-card",
  "ulm-custom-card-camera-card",
  "ulm-custom-card-esh-room-card",
  "ulm-custom-card-httpedo13-sun-card",
]);

export const CUSTOM_CARDS = CUSTOM_CARD_DEFS.filter(
  (def) => !SPECIALIZED_CUSTOM_TAGS.has(def.tag),
).map((def) =>
  createSimpleEntityCard({
    tag: def.tag,
    editorTag: def.editorTag,
    type: def.type,
    name: def.name,
    description: def.description,
    defaultIcon: def.defaultIcon,
    defaultColor: def.defaultColor,
    stubEntity: def.stubEntity,
    extraSchema: extraSchema([...def.extraKeys]),
  }),
);
