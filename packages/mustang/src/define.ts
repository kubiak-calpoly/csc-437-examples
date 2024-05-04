type ElementDefinitions = {
  [tag: string]: CustomElementConstructor;
};

export function define(defns: ElementDefinitions) {
  Object.entries(defns).map(([k, v]) =>
    customElements.define(k, v)
  );
}
