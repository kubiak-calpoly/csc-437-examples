"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var import_lit = require("lit");
var import_lit_element_router = require("lit-element-router");
var import_decorators = require("lit/decorators.js");
let TourLink = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.href = "#";
  }
  render() {
    return import_lit.html`
      <a href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }
  navigate(href) {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new CustomEvent("route"));
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
};
__decorateClass([
  (0, import_decorators.property)()
], TourLink.prototype, "href", 2);
TourLink = __decorateClass([
  import_lit_element_router.navigator
], TourLink);
customElements.define("tour-link", TourLink);
//# sourceMappingURL=tour-link.js.map
