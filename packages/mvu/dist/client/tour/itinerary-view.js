"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_context = require("@lit/context");
var import_moment = __toESM(require("moment"));
var import_css_base = require("../shared/css-base");
var import_itinerary_item = require("./itinerary-item");
var import_tour_context = __toESM(require("./tour-context"));
let ItineraryView = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.tour = {
      id: "not_a_tour",
      name: "Unnamed",
      destinations: [],
      transportation: [],
      startDate: /* @__PURE__ */ new Date(),
      endDate: /* @__PURE__ */ new Date(),
      entourage: []
    };
    this.startDate = /* @__PURE__ */ new Date();
    this.handleDestinationToggle = (open, d) => {
    };
  }
  render() {
    console.log(
      "Rendering itinerary-view for tour",
      this.tour.startDate,
      this.tour.destinations,
      this.tour.transportation
    );
    const transportation = this.tour.transportation;
    const startDates = this.tour.destinations.map((dst) => dst.nights).reduce(
      (acc, nights, i) => acc.concat([
        new Date(
          acc[i].getTime() + nights * (24 * 60 * 60 * 1e3)
        )
      ]),
      [new Date(this.tour.startDate)]
    );
    const destinationView = (dst, i) => {
      const startDate = startDates[i];
      const nights = dst.nights;
      const endDate = new Date(
        startDate.getTime() + nights * (24 * 60 * 60 * 1e3)
      );
      const hidden = this.selectedDate && (this.selectedDate.getTime() < startDate.getTime() || this.selectedDate.getTime() > endDate.getTime());
      const open = !hidden;
      return import_lit.html`
        <itinerary-item
          item-class="destination"
          .startDate=${startDate}
          .endDate=${endDate}
          ?hidden=${hidden}
          ?open=${open}
          .handleToggle=${(open2) => this.handleDestinationToggle(open2, dst)}>
          <h3 slot="summary"> ${dst.name} </h3>
          <p slot="summary">
            ${nights} night${nights === 1 ? "" : "s"}
          </p>
          <img class="featured" src="${dst.featuredImage}" />
        </itinerary-item>
      `;
    };
    const segmentView = (seg) => {
      const depMoment = (0, import_moment.default)(seg.departure.time);
      const arrMoment = (0, import_moment.default)(seg.arrival.time);
      return import_lit.html`
        <h4
          >${[seg.provider, seg.name].filter(Boolean).join(" ")}</h4
        >
        <dl class="timings">
          <dt>Depart</dt>
          <dd>${seg.departure.station}</dd>
          <dd>
            <time datetime="${depMoment.format()}">
              ${depMoment.format("h:mm A")}
            </time>
          </dd>
          <dt>Arrive</dt>
          <dd>${seg.arrival.station}</dd>
          <dd>
            <time datetime="${arrMoment.format()}">
              ${arrMoment.format("h:mm A")}
            </time>
          </dd>
        </dl>
      `;
    };
    const transportationView = (trn) => {
      const startDate = new Date(trn.startDate);
      const endDate = trn.endDate ? new Date(trn.endDate) : startDate;
      const icon = iconForTransportation(trn.type);
      const hidden = this.selectedDate && (this.selectedDate.getTime() < startDate.getTime() || this.selectedDate.getTime() > endDate.getTime());
      return import_lit.html`
        <itinerary-item
          item-class="transportation"
          .startDate=${startDate}
          .endDate=${endDate}
          ?hidden=${hidden}>
          <h3 slot="summary">
            <svg class="icon">${icon}</svg>
          </h3>
          ${trn.segments.map(segmentView)}
        </itinerary-item>
      `;
    };
    return import_lit.html`
      <section class="itinerary">
        ${this.tour.destinations.flatMap(
      (d, i) => i < transportation.length ? [
        destinationView(d, i),
        transportationView(transportation[i])
      ] : destinationView(d, i)
    )}
      </section>
    `;
  }
};
ItineraryView.styles = [
  import_css_base.reset,
  import_css_base.elements,
  import_lit.css`
      .itinerary {
        display: grid;
        grid-area: itinerary;
        align-self: start;
        grid-template-columns: [start] auto [header info] 1fr 2fr 1fr 2fr [end];
        gap: var(--size-spacing-large)
          var(--size-spacing-medium);
        align-items: baseline;
        margin: var(--size-spacing-small);
      }

      svg.icon {
        display: inline;
        height: 4rem;
        width: 4rem;
        vertical-align: middle;
        fill: currentColor;
      }

      itinerary-item ol,
      itinerary-item ol > li {
        display: contents;
      }

      itinerary-item h4 {
        grid-column: info/end;
        text-align: center;
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

      .timings {
        display: grid;
        grid-column: info / end;
        grid-template-columns: 1fr 2fr 1fr 2fr;
        grid-template-columns: subgrid;
        grid-auto-flow: column dense;
        align-items: baseline;
        gap: var(--size-spacing-small) var(--size-spacing-large);
      }

      .timings > dt {
        /* Depart / Arrive */
        grid-row: 2;
        color: inherit;
      }

      .timings > dt + dd {
        /* City / Airport / Station */
        grid-column-end: span 2;
        font-family: var(--font-family-display);
        font-weight: bold;
      }

      .timings > dt + dd + dd {
        /* Time */
        grid-row: 2;
        white-space: nowrap;
      }
    `
];
__decorateClass([
  (0, import_context.consume)({ context: import_tour_context.default, subscribe: true }),
  (0, import_decorators.property)({ attribute: false })
], ItineraryView.prototype, "tour", 2);
__decorateClass([
  (0, import_decorators.property)()
], ItineraryView.prototype, "startDate", 2);
__decorateClass([
  (0, import_decorators.property)()
], ItineraryView.prototype, "selectedDate", 2);
__decorateClass([
  (0, import_decorators.property)()
], ItineraryView.prototype, "handleDestinationToggle", 2);
ItineraryView = __decorateClass([
  (0, import_decorators.customElement)("itinerary-view")
], ItineraryView);
function iconForTransportation(type) {
  const hash = {
    air: "icon-airplane",
    rail: "icon-train",
    ship: "icon-ship",
    bus: "icon-bus"
  };
  return import_lit.svg`
    <use href="/icons/transportation.svg#${hash[type]}" />
    `;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItineraryView
});
//# sourceMappingURL=itinerary-view.js.map