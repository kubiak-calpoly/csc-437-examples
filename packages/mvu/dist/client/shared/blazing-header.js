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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var blazing_header_exports = {};
__export(blazing_header_exports, {
  BlazingHeader: () => BlazingHeader
});
module.exports = __toCommonJS(blazing_header_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_css_base = require("../shared/css-base");
let BlazingHeader = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.title = "A site for travelers";
  }
  render() {
    return import_lit.html`
      <header>
        <h1>Blazing Travels</h1>
        <p>${this.title}</p>
      </header>
    `;
  }
};
BlazingHeader.styles = [
  import_css_base.reset,
  import_css_base.elements,
  import_lit.css`
      header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
      }
      header a {
        color: var(--color-link-inverted);
      }
    `
];
__decorateClass([
  (0, import_decorators.property)()
], BlazingHeader.prototype, "title", 2);
BlazingHeader = __decorateClass([
  (0, import_decorators.customElement)("blazing-header")
], BlazingHeader);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BlazingHeader
});
//# sourceMappingURL=blazing-header.js.map
