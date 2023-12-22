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
var tour_page_exports = {};
__export(tour_page_exports, {
  TourPage: () => TourPage
});
module.exports = __toCommonJS(tour_page_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
let TourPage = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.tourId = "";
  }
  render() {
    return import_lit.html`
      <tour-provider for="${this.tourId}">
        <blazing-header> </blazing-header>
        <calendar-widget> </calendar-widget>
        <map-widget src="/maps/italy.geo.json"> </map-widget>
        <itinerary-view> </itinerary-view>
        <entourage-table> </entourage-table>
      </tour-provider>
    `;
  }
};
__decorateClass([
  (0, import_decorators.property)({ attribute: "tour-id" })
], TourPage.prototype, "tourId", 2);
TourPage = __decorateClass([
  (0, import_decorators.customElement)("tour-page")
], TourPage);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TourPage
});
//# sourceMappingURL=tour-page.js.map
