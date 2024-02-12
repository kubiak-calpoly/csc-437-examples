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
let TourRouter = class extends import_lit.LitElement {
  render() {
    return import_lit.html` <slot></slot> `;
  }
};
TourRouter = __decorateClass([
  import_lit_element_router.outlet,
  (0, import_decorators.customElement)("tour-router")
], TourRouter);
//# sourceMappingURL=tour-router.js.map
