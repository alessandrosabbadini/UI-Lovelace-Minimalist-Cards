/**
 * Helpers for Home Assistant built-in card editors via static getConfigForm().
 * @see https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/
 */

import { COLOR_OPTIONS } from "./colors";

export type HaFormSchema = Record<string, unknown>;

export interface UlmConfigForm {
  schema: HaFormSchema[];
  computeLabel?: (schema: { name?: string }) => string | undefined;
  computeHelper?: (schema: { name?: string }) => string | undefined;
}

const COLOR_SELECT = {
  select: {
    mode: "dropdown" as const,
    options: COLOR_OPTIONS.map((c) => ({ value: c, label: c })),
  },
};

export function entityField(
  name = "entity",
  domain?: string | string[],
  required = true,
): HaFormSchema {
  return {
    name,
    required,
    selector: {
      entity: domain
        ? { domain: Array.isArray(domain) ? domain : [domain] }
        : {},
    },
  };
}

export function textField(name: string): HaFormSchema {
  return { name, selector: { text: {} } };
}

export function iconField(name = "icon"): HaFormSchema {
  return { name, selector: { icon: {} } };
}

export function booleanField(name: string): HaFormSchema {
  return { name, selector: { boolean: {} } };
}

export function numberField(name: string): HaFormSchema {
  return { name, selector: { number: { mode: "box", step: 1 } } };
}

export function colorField(name = "color"): HaFormSchema {
  return { name, selector: COLOR_SELECT };
}

export function expandable(
  name: string,
  title: string,
  schema: HaFormSchema[],
  flatten = true,
): HaFormSchema {
  return {
    type: "expandable",
    name,
    title,
    flatten,
    schema,
  };
}

export function grid(schema: HaFormSchema[]): HaFormSchema {
  return {
    type: "grid",
    name: "",
    flatten: true,
    schema,
  };
}

/** Standard entity + name + icon + color + force background */
export function simpleEntitySchema(opts?: {
  domain?: string | string[];
  extra?: HaFormSchema[];
}): UlmConfigForm {
  return {
    schema: [
      entityField("entity", opts?.domain),
      grid([textField("name"), iconField("icon")]),
      colorField("color"),
      booleanField("force_background_color"),
      ...(opts?.extra || []),
    ],
    computeLabel: (schema) => {
      const labels: Record<string, string> = {
        entity: "Entity",
        name: "Name",
        icon: "Icon",
        color: "Color",
        force_background_color: "Force colored background when active",
      };
      return labels[schema.name || ""] || undefined;
    },
  };
}

export function labels(
  map: Record<string, string>,
): (schema: { name?: string }) => string | undefined {
  return (schema) => map[schema.name || ""] || undefined;
}

export function helpers(
  map: Record<string, string>,
): (schema: { name?: string }) => string | undefined {
  return (schema) => map[schema.name || ""] || undefined;
}
