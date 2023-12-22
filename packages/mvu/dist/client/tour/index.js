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
var tour_exports = {};
__export(tour_exports, {
  ItineraryView: () => import_itinerary_view.ItineraryView,
  TourProvider: () => import_tour_provider.TourProvider,
  tourContext: () => import_tour_context.tourContext
});
module.exports = __toCommonJS(tour_exports);
var import_itinerary_view = require("./itinerary-view");
var import_tour_provider = require("./tour-provider");
var import_tour_context = require("./tour-context");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItineraryView,
  TourProvider,
  tourContext
});
//# sourceMappingURL=index.js.map
