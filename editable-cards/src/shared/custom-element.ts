/**
 * Drop-in replacement for Lit's `@customElement` that skips registration when
 * the tag already exists. Users sometimes load the bundle twice (HACS resource
 * plus a manual `/local/` resource); Lit's decorator would then throw and stop
 * every card in the bundle from loading.
 */
export const customElement =
  (tagName: string) =>
  (classOrTarget: CustomElementConstructor): void => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, classOrTarget);
    }
  };
