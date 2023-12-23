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
var import_itinerary_item = require("./itinerary-item");
let ItineraryView = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.destinations = [];
    this.startDate = /* @__PURE__ */ new Date();
  }
  render() {
    const destinations = this.destinations;
    const startDates = destinations.map((dst) => dst.nights).reduce(
      (acc, nights, i) => acc.concat([
        new Date(
          acc[i].getTime() + nights * (24 * 60 * 60 * 1e3)
        )
      ]),
      [this.startDate]
    );
    console.log(
      "Rendering itinerary-view for tour",
      destinations
    );
    const destinationView = (dst, i) => {
      const startDate = startDates[i];
      const nights = dst.nights;
      const endDate = new Date(
        startDate.getTime() + nights * (24 * 60 * 60 * 1e3)
      );
      return import_lit.html`
        <itinerary-item
          marker="marker-destination-${i}"
          item-class="destination"
          start-date="${startDate}"
          end-date="${endDate}">
          <h3 slot="summary"> ${dst.name} </h3>
          <p slot="summary">
            ${nights} night${nights === 1 ? "" : "s"}
          </p>
          <img class="featured" src="${dst.featuredImage}" />
        </itinerary-item>
      `;
    };
    return import_lit.html`
      <section class="itinerary">
        ${this.destinations.map(destinationView)}
      </section>
    `;
  }
};
ItineraryView.styles = import_lit.css`
    .itinerary {
      display: grid;
      grid-area: itinerary;
      align-self: start;
      grid-template-columns: [start] auto [header] 4fr [info] 1fr 2fr 1fr 2fr [end];
      gap: var(--size-spacing-large) var(--size-spacing-medium);
      align-items: baseline;
      margin: var(--size-spacing-small);
    }

    itinerary-item {
      display: contents;
    }

    itinerary-item > h3 > .icon:first-child {
      position: absolute;
      top: 0;
      left: 0;
    }

    itinerary-item ol,
    itinerary-item ol > li {
      display: contents;
    }

    itinerary-item h4 {
      grid-column: header;
      text-align: right;
    }

    itinerary-item[item-class="destination"] h3 {
      font-style: normal;
      font-weight: bold;
    }

    itinerary-item img.featured {
      width: 100%;
      grid-column: info / end;
      grid-row-end: span 2;
    }
  `;
__decorateClass([
  (0, import_decorators.property)()
], ItineraryView.prototype, "destinations", 2);
__decorateClass([
  (0, import_decorators.property)()
], ItineraryView.prototype, "startDate", 2);
ItineraryView = __decorateClass([
  (0, import_decorators.customElement)("itinerary-view")
], ItineraryView);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItineraryView
});
//# sourceMappingURL=itinerary-view.js.map
