"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var css_base_exports = {};
__export(css_base_exports, {
  elements: () => elements,
  reset: () => reset
});
module.exports = __toCommonJS(css_base_exports);
var import_lit = require("lit");
const reset = import_lit.css`
  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: border-box;
  }
`;
const elements = import_lit.css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-display);
  }
  h1 {
    font-size: 2.5rem;
    font-style: oblique;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: normal;
    font-style: oblique;
  }
  h4 {
    font-size: 1.25rem;
  }
  h5 {
    font-size: 1rem;
  }
  h6 {
    font-size: 1rem;
    font-weight: normal;
    font-style: italic;
  }
  h3,
  a {
    color: var(--color-accent);
  }
  p + * {
    margin-top: var(--size-spacing-small);
  }

  svg.icon {
    display: inline;
    height: 4rem;
    width: 4rem;
    vertical-align: top;
    fill: currentColor;
  }
  dt {
    color: var(--color-accent);
    font-family: var(--font-family-display);
    font-weight: bold;
  }
  input,
  select {
    font-family: inherit;
  }
  button {
    font-family: var(--font-family-display);
  }
  input,
  select,
  button {
    background: var(--color-background-control);
    border: 1px solid var(--color-border-control);
    border-radius: var(--size-corner-medium);
    padding: var(--size-spacing-small);
  }
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  elements,
  reset
});
//# sourceMappingURL=css-base.js.map
