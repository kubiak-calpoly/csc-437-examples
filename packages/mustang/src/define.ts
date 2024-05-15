type ElementDefinitions = {
  [tag: string]: CustomElementConstructor;
};

export function define(defns: ElementDefinitions) {
  Object.entries(defns).map(([k, v]) => {
    if (!customElements.get(k)) customElements.define(k, v);
  });
  return customElements;
}
