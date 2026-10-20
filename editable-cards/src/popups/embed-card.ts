import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "../types";

type Helpers = {
  createCardElement: (c: LovelaceCardConfig) => LovelaceCard;
};

/**
 * Create / refresh an embedded Lovelace / HACS card.
 * Prefers direct customElements.create when tagHint is known (more reliable for
 * my-slider-v2 etc. than createCardElement, which may return hui-error-card).
 */
export async function mountLovelaceCard(
  host: HTMLElement,
  hass: HomeAssistant,
  config: LovelaceCardConfig,
  existing?: (LovelaceCard & HTMLElement) | null,
  tagHint?: string,
): Promise<(LovelaceCard & HTMLElement) | null> {
  const key = JSON.stringify(config);
  const prevKey = host.dataset.ulmCardKey;
  if (existing && prevKey === key && existing.isConnected) {
    existing.hass = hass;
    return existing;
  }

  const tag =
    tagHint ||
    (typeof config.type === "string" && config.type.startsWith("custom:")
      ? config.type.replace(/^custom:/, "")
      : undefined);

  let el: (LovelaceCard & HTMLElement) | null = null;

  try {
    // Built-in Lovelace cards (thermostat, etc.): always use HA helpers.
    // Direct createElement("hui-thermostat-card") often mounts an empty shell.
    const w = window as Window & {
      loadCardHelpers?: () => Promise<Helpers>;
    };
    const preferHelpers =
      !tagHint &&
      typeof config.type === "string" &&
      !config.type.startsWith("custom:");

    if (!preferHelpers && tag) {
      if (!customElements.get(tag)) {
        await Promise.race([
          customElements.whenDefined(tag),
          new Promise((_, rej) =>
            setTimeout(() => rej(new Error("timeout")), 2500),
          ),
        ]).catch(() => undefined);
      }
      if (customElements.get(tag)) {
        el = document.createElement(tag) as LovelaceCard & HTMLElement;
        if (typeof el.setConfig === "function") {
          const { type: _t, ...rest } = config as LovelaceCardConfig & {
            type?: string;
          };
          el.setConfig(rest as LovelaceCardConfig);
        }
      }
    }

    if (!el && typeof w.loadCardHelpers === "function") {
      const helpers = await w.loadCardHelpers();
      const created = helpers.createCardElement(config) as LovelaceCard &
        HTMLElement;
      if (
        !tag ||
        preferHelpers ||
        created.localName === tag ||
        created.localName === `hui-${tag}-card`
      ) {
        el = created;
      }
    }
  } catch {
    el = null;
  }

  if (!el) {
    host.classList.remove("has-card");
    delete host.dataset.ulmCardKey;
    return null;
  }

  el.hass = hass;
  host.replaceChildren(el);
  host.dataset.ulmCardKey = key;
  host.classList.add("has-card");
  return el;
}

export function isCustomElementRegistered(tag: string): boolean {
  return !!customElements.get(tag);
}
