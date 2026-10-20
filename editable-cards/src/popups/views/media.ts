import { html, nothing, type TemplateResult } from "lit";
import type { MediaView, PopupContext } from "../types";
import {
  capitalize,
  renderListRow,
  renderPopupButton,
  renderPopupFooter,
  renderPopupHeader,
  renderVerticalSlider,
} from "../shared";

export function defaultMediaView(): MediaView {
  return "infos";
}

export function renderMedia(ctx: PopupContext): TemplateResult {
  const view = (ctx.view === "main" ? "infos" : ctx.view) as MediaView;
  if (view === "volume") return renderVolumeView(ctx);
  if (view === "sources") return renderSourcesView(ctx);
  return renderInfosView(ctx);
}

/** Matches legacy popup_button_app app → icon / display name. */
function resolveApp(ctx: PopupContext): {
  icon: string;
  name: string;
  label: string;
  iconColor: string;
  iconBg: string;
} {
  const s = ctx.stateObj;
  const attrs = s.attributes;
  const rawApp = String(attrs.app_name || "").toLowerCase();
  const contentId = String(attrs.media_content_id || "").toLowerCase();
  const isSpotify = rawApp === "spotify" || contentId.includes("spotify");

  const map: Record<string, { icon: string; name: string }> = {
    spotify: { icon: "mdi:spotify", name: "Spotify" },
    "google podcasts": { icon: "mdi:google-podcast", name: "Google-Podcast" },
    plex: { icon: "mdi:plex", name: "Plex" },
    soundcloud: { icon: "mdi:soundcloud", name: "Soundcloud" },
    "youtube music": { icon: "mdi:youtube", name: "Youtube" },
    "oto music": { icon: "mdi:music-circle", name: "Oto Music" },
    pandora: { icon: "mdi:pandora", name: "Pandora" },
    netflix: { icon: "mdi:netflix", name: "Netflix" },
    "bluetooth audio": { icon: "mdi:bluetooth", name: "Bluetooth" },
  };

  const hit = isSpotify ? map.spotify : map[rawApp];
  const friendly = (attrs.friendly_name as string) || ctx.entity;
  return {
    icon: hit?.icon || (attrs.icon as string) || "mdi:speaker",
    name: hit?.name || friendly,
    label:
      (attrs.media_title as string) ||
      friendly,
    iconColor: isSpotify ? "#1DB954" : "var(--color-theme, inherit)",
    iconBg: isSpotify ? "#434343" : "var(--color-theme, rgba(51,51,51,0.15))",
  };
}

function mediaHeader(ctx: PopupContext) {
  const s = ctx.stateObj;
  return renderPopupHeader({
    name: s.attributes.friendly_name || ctx.entity,
    label: capitalize(s.state),
    icon: (s.attributes.icon as string) || "mdi:speaker",
  });
}

function mediaFooterInfos(ctx: PopupContext) {
  const sources = Array.isArray(ctx.stateObj.attributes.source_list)
    ? (ctx.stateObj.attributes.source_list as string[])
    : [];
  return renderPopupFooter({
    onBack: ctx.goBack,
    onPower: () => ctx.call("media_player", "toggle"),
    powerLabel: capitalize(ctx.stateObj.state),
    // Always show Source like popup_button_source (more-info if no list)
    extra: renderPopupButton({
      icon: "mdi:playlist-music",
      name: "Source",
      onClick: () => {
        if (sources.length) ctx.setView("sources");
        else ctx.moreInfo();
      },
    }),
  });
}

function artUrl(ctx: PopupContext): string | undefined {
  const pic = ctx.stateObj.attributes.entity_picture as string | undefined;
  if (!pic) return undefined;
  return ctx.hass.hassUrl ? ctx.hass.hassUrl(pic) : pic;
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const total = Math.floor(sec);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function renderInfosView(ctx: PopupContext): TemplateResult {
  const attrs = ctx.stateObj.attributes;
  const title =
    (attrs.media_title as string | undefined) ||
    (attrs.media_artist as string | undefined) ||
    capitalize(ctx.stateObj.state);
  const artist = (attrs.media_artist as string | undefined) || "";
  const album = (attrs.media_album_name as string | undefined) || "";
  const subtitle = [artist, album].filter(Boolean).join(" · ");
  const url = artUrl(ctx);
  const playing = ctx.stateObj.state === "playing";
  const pos = Number(attrs.media_position);
  const dur = Number(attrs.media_duration);
  const hasProgress =
    Number.isFinite(pos) && Number.isFinite(dur) && dur > 0;
  const progress = hasProgress ? Math.min(100, (pos / dur) * 100) : 0;
  const level = Number(attrs.volume_level);
  const volPct = Number.isFinite(level) ? Math.round(level * 100) : 0;
  const app = resolveApp(ctx);
  const activeCtrl = playing
    ? "rgba(51, 51, 51, 1)"
    : "rgba(51, 51, 51, 0.5)";

  const seek = (ev: MouseEvent) => {
    if (!hasProgress) return;
    const el = ev.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
    ctx.call("media_player", "media_seek", {
      seek_position: ratio * dur,
    });
  };

  return html`<div class="ulm-grid cols-2 media-infos">
    <div class="area-header">${mediaHeader(ctx)}</div>
    <div class="area-body">
      <div class="media-panel">
        <div class="media-app">
          <span
            class="media-app-icon"
            style="color:${app.iconColor};background:${app.iconBg};border-color:${app.iconColor}"
          >
            <ha-icon .icon=${app.icon}></ha-icon>
          </span>
          <div class="media-app-text">
            <div class="media-app-name">${app.name}</div>
            <div class="media-app-label">${app.label}</div>
          </div>
        </div>

        ${url
          ? html`<img class="media-art" src=${url} alt="" width="220" height="220" />`
          : html`<div class="media-art media-art-empty">
              <ha-icon icon="mdi:music"></ha-icon>
            </div>`}

        <div class="media-meta">
          <div class="media-title">${title}</div>
          ${subtitle
            ? html`<div class="media-artist">${subtitle}</div>`
            : nothing}
          ${hasProgress
            ? html`<button
                type="button"
                class="media-progress"
                @click=${seek}
              >
                <div style="width:${progress}%"></div>
              </button>
              <div class="media-runtime">
                <span>${formatTime(pos)}</span>
                <span>${formatTime(dur)}</span>
              </div>`
            : nothing}
        </div>

        <!-- Legacy bar: popup_chip_controls + popup_chip_volume (no separate transport row) -->
        <div class="media-chips">
          <div class="media-controls-chip">
            <button
              type="button"
              style="color:${activeCtrl}"
              @click=${() =>
                ctx.call("media_player", "media_previous_track")}
            >
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button
              type="button"
              @click=${() => ctx.call("media_player", "media_play_pause")}
            >
              <ha-icon icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
            </button>
            <button
              type="button"
              style="color:${activeCtrl}"
              @click=${() => ctx.call("media_player", "media_next_track")}
            >
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
          </div>
          <button
            type="button"
            class="media-volume-chip"
            @click=${() => ctx.setView("volume")}
          >
            <ha-icon icon="mdi:volume-high"></ha-icon>
            <span>${volPct}%</span>
          </button>
        </div>
      </div>
    </div>
    <div class="area-side">
      ${renderVerticalSlider({
        value: volPct,
        height: "30vh",
        width: "calc(30vh / 2.8)",
        thumbWidth: 50,
        fill: "rgba(51, 51, 51, 0.9)",
        track: "rgba(51, 51, 51, 0.09)",
        onChange: (v) =>
          ctx.call("media_player", "volume_set", { volume_level: v / 100 }),
      })}
    </div>
    <div class="area-footer">${mediaFooterInfos(ctx)}</div>
  </div>`;
}

function renderVolumeView(ctx: PopupContext): TemplateResult {
  // Legacy popup_media_player_volume: only vertical slider + back to infos
  const level = Number(ctx.stateObj.attributes.volume_level);
  const volPct = Number.isFinite(level) ? Math.round(level * 100) : 50;
  return html`<div class="ulm-grid media-volume">
    <div class="area-header">${mediaHeader(ctx)}</div>
    <div class="area-body">
      ${renderVerticalSlider({
        value: volPct,
        height: "30vh",
        width: "calc(30vh / 2.8)",
        thumbWidth: 50,
        fill: "rgba(51, 51, 51, 0.9)",
        track: "rgba(51, 51, 51, 0.09)",
        onChange: (v) =>
          ctx.call("media_player", "volume_set", { volume_level: v / 100 }),
      })}
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: () => ctx.setView("infos"),
      })}
    </div>
  </div>`;
}

function renderSourcesView(ctx: PopupContext): TemplateResult {
  const sources = Array.isArray(ctx.stateObj.attributes.source_list)
    ? (ctx.stateObj.attributes.source_list as string[])
    : [];
  const current = String(ctx.stateObj.attributes.source || "");
  return html`<div class="ulm-grid media-sources">
    <div class="area-header">${mediaHeader(ctx)}</div>
    <div class="area-body">
      <div class="ulm-list media-source-list">
        ${sources.map((src) =>
          renderListRow({
            label: src,
            active: src === current,
            onClick: () =>
              ctx.call("media_player", "select_source", { source: src }),
          }),
        )}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: () => ctx.setView("infos"),
        onPower: () => ctx.call("media_player", "toggle"),
        powerLabel: capitalize(ctx.stateObj.state),
        extra: renderPopupButton({
          icon: "mdi:volume-high",
          name: "Volume",
          onClick: () => ctx.setView("volume"),
        }),
      })}
    </div>
  </div>`;
}
