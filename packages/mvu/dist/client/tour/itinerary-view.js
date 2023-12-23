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
var itinerary_view_exports = {};
__export(itinerary_view_exports, {
  ItineraryView: () => ItineraryView
});
module.exports = __toCommonJS(itinerary_view_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
let ItineraryView = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.destinations = [];
  }
  render() {
    const destinations = this.destinations;
    console.log(
      "Rendering itinerary-view for tour",
      destinations
    );
    const destinationView = (dst, i) => {
      const startDate = /* @__PURE__ */ new Date();
      const endDate = /* @__PURE__ */ new Date();
      return import_lit.html`
        <itinerary-item
          marker="marker-destination-${i}"
          item-class="destination"
          start-date="${startDate}"
          end-date="${endDate}">
          <h3 slot="summary">
            <a href="place.html"> ${dst.name} </a>
          </h3>
          <p slot="summary">
            ${Math.round(
        (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1e3)
      )}
            nights
          </p>
          <img class="featured" src="${dst.featuredImage}" />
        </itinerary-item>
      `;
    };
    return this.destinations.map(destinationView);
  }
};
__decorateClass([
  (0, import_decorators.property)()
], ItineraryView.prototype, "destinations", 2);
ItineraryView = __decorateClass([
  (0, import_decorators.customElement)("itinerary-view")
], ItineraryView);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItineraryView
});
//# sourceMappingURL=itinerary-view.js.map
