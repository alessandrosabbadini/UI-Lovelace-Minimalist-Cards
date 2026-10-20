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

function mediaHeader(ctx: PopupContext) {
  const s = ctx.stateObj;
  return renderPopupHeader({
    name: s.attributes.friendly_name || ctx.entity,
    label: capitalize(s.state),
    icon: (s.attributes.icon as string) || "mdi:speaker",
  });
}

function mediaFooter(ctx: PopupContext, withSource: boolean) {
  const sources = Array.isArray(ctx.stateObj.attributes.source_list)
    ? (ctx.stateObj.attributes.source_list as string[])
    : [];
  return renderPopupFooter({
    onBack: ctx.goBack,
    onPower: () => ctx.call("media_player", "toggle"),
    powerLabel: capitalize(ctx.stateObj.state),
    extra:
      withSource && sources.length
        ? renderPopupButton({
            icon: "mdi:import",
            name: "Source",
            onClick: () => ctx.setView("sources"),
          })
        : nothing,
  });
}

function renderInfosView(ctx: PopupContext): TemplateResult {
  const attrs = ctx.stateObj.attributes;
  const title =
    (attrs.media_title as string | undefined) ||
    (attrs.source as string | undefined) ||
    capitalize(ctx.stateObj.state);
  const artist = (attrs.media_artist as string | undefined) || "";
  const pic = attrs.entity_picture as string | undefined;
  const artUrl =
    pic && ctx.hass.hassUrl ? ctx.hass.hassUrl(pic) : pic || undefined;
  const pos = Number(attrs.media_position);
  const dur = Number(attrs.media_duration);
  const progress =
    Number.isFinite(pos) && Number.isFinite(dur) && dur > 0
      ? Math.min(100, (pos / dur) * 100)
      : 0;
  const level = Number(attrs.volume_level);
  const volPct = Number.isFinite(level) ? Math.round(level * 100) : 50;
  const app = (attrs.app_name as string | undefined) || "";

  return html`<div class="ulm-grid cols-2">
    <div class="area-header">${mediaHeader(ctx)}</div>
    <div class="area-body">
      <div class="media-panel">
        ${app
          ? html`<div class="muted" style="justify-self:start">${app}</div>`
          : nothing}
        <div class="ulm-embed-host" data-ulm-embed="media-art"></div>
        <div class="ulm-embed-fallback">
          ${artUrl
            ? html`<img class="media-art" src=${artUrl} alt="" />`
            : html`<div
                class="media-art"
                style="display:grid;place-items:center"
              >
                <ha-icon
                  icon="mdi:music"
                  style="--mdc-icon-size:48px"
                ></ha-icon>
              </div>`}
        </div>
        <div class="ulm-embed-host" data-ulm-embed="media-info"></div>
        <div class="ulm-embed-fallback">
          <div class="media-title">${title}</div>
          ${artist ? html`<div class="media-artist">${artist}</div>` : nothing}
          <div class="media-progress">
            <div style="width:${progress}%"></div>
          </div>
        </div>
        <div class="media-transport">
          <button
            @click=${() => ctx.call("media_player", "media_previous_track")}
          >
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button @click=${() => ctx.call("media_player", "media_play_pause")}>
            <ha-icon
              icon=${ctx.stateObj.state === "playing" ? "mdi:pause" : "mdi:play"}
            ></ha-icon>
          </button>
          <button @click=${() => ctx.call("media_player", "media_next_track")}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
        <div class="media-chips">
          <button
            class="media-chip"
            @click=${() => ctx.call("media_player", "media_play_pause")}
          >
            <ha-icon
              icon=${ctx.stateObj.state === "playing" ? "mdi:pause" : "mdi:play"}
            ></ha-icon>
            Controls
          </button>
          <button class="media-chip" @click=${() => ctx.setView("volume")}>
            <ha-icon icon="mdi:volume-high"></ha-icon>
            Volume
          </button>
        </div>
      </div>
    </div>
    <div class="area-side">
      <div class="ulm-embed-host" data-ulm-embed="media-vol"></div>
      <div class="ulm-embed-fallback">
        ${renderVerticalSlider({
          value: volPct,
          height: "30vh",
          width: "calc(30vh / 2.8)",
          fill: "rgba(var(--ulm-color-theme),0.9)",
          track: "rgba(var(--ulm-color-theme),0.09)",
          onChange: (v) =>
            ctx.call("media_player", "volume_set", { volume_level: v / 100 }),
        })}
      </div>
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${renderPopupButton({
          icon: "mdi:volume-high",
          name: "Volume",
          onClick: () => ctx.setView("volume"),
        })}
      </div>
    </div>
    <div class="area-footer">${mediaFooter(ctx, true)}</div>
  </div>`;
}

function renderVolumeView(ctx: PopupContext): TemplateResult {
  const level = Number(ctx.stateObj.attributes.volume_level);
  const volPct = Number.isFinite(level) ? Math.round(level * 100) : 50;
  const muted = !!ctx.stateObj.attributes.is_volume_muted;
  return html`<div class="ulm-grid">
    <div class="area-header">${mediaHeader(ctx)}</div>
    <div class="area-body">
      ${renderVerticalSlider({
        value: volPct,
        fill: "rgba(var(--ulm-color-theme),0.9)",
        track: "rgba(var(--ulm-color-theme),0.09)",
        onChange: (v) =>
          ctx.call("media_player", "volume_set", { volume_level: v / 100 }),
      })}
    </div>
    <div class="area-buttons">
      <div class="ulm-mode-row">
        ${renderPopupButton({
          icon: muted ? "mdi:volume-off" : "mdi:volume-high",
          name: muted ? "Unmute" : "Mute",
          onClick: () =>
            ctx.call("media_player", "volume_mute", {
              is_volume_muted: !muted,
            }),
        })}
      </div>
    </div>
    <div class="area-footer">
      ${renderPopupFooter({
        onBack: () => ctx.setView("infos"),
        onPower: () => ctx.call("media_player", "toggle"),
        powerLabel: capitalize(ctx.stateObj.state),
      })}
    </div>
  </div>`;
}

function renderSourcesView(ctx: PopupContext): TemplateResult {
  const sources = Array.isArray(ctx.stateObj.attributes.source_list)
    ? (ctx.stateObj.attributes.source_list as string[])
    : [];
  const current = String(ctx.stateObj.attributes.source || "");
  return html`<div class="ulm-grid">
    <div class="area-header">${mediaHeader(ctx)}</div>
    <div class="area-body">
      <div class="ulm-list">
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
    <div class="area-buttons"></div>
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
