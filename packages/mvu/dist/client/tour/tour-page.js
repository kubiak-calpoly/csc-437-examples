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
var import_css_base = require("../shared/css-base");
var import_blazing_header = require("../shared/blazing-header");
var import_itinerary_view = require("./itinerary-view");
var import_calendar_widget = require("./calendar-widget");
var import_map_widget = require("./map-widget");
let TourPage = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.tourId = "";
    this.tour = {
      id: "tour-skeleton",
      name: "Skeleton Tour",
      destinations: [],
      transportation: [],
      startDate: /* @__PURE__ */ new Date(),
      endDate: /* @__PURE__ */ new Date(),
      entourage: []
    };
  }
  connectedCallback() {
    console.log("Tour ID:", this.tourId);
    super.connectedCallback();
    fetch(`/api/tours/${this.tourId}`).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          this.tour = json;
        });
      }
    }).catch(
      (err) => console.log("Error when reading tour", err)
    );
  }
  render() {
    const {
      name,
      startDate,
      endDate,
      destinations,
      transportation
    } = this.tour;
    const renderMarker = (dst, i) => {
      return import_lit.html` <map-marker
        lat=${dst.location.lat}
        lon=${dst.location.lon}
        ?selected=${dst.name === this._selectedDestination?.name}>
        ${dst.name}
      </map-marker>`;
    };
    return import_lit.html`
      <blazing-header title="${name}"> </blazing-header>
      <main class="page">
        <calendar-widget
          .handleChange=${(selected) => this.selectedDate = selected}
          start-date=${startDate}
          end-date=${endDate}>
        </calendar-widget>
        <map-widget src="/maps/italy.geo.json">
          ${destinations.map(renderMarker)}
        </map-widget>
        <itinerary-view
          .startDate=${new Date(startDate)}
          .selectedDate=${this.selectedDate}
          .destinations=${destinations}
          .transportation=${transportation}
          .handleDestinationToggle=${(open, dst) => this._selectedDestination = open ? dst : void 0}>
        </itinerary-view>
        <entourage-table> </entourage-table>
      </main>
    `;
  }
};
TourPage.styles = [
  import_css_base.reset,
  import_css_base.elements,
  import_lit.css`
      main.page {
        display: grid;
        grid-template-columns: var(--size-width-sidebar) auto;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "calendar  itinerary"
          "map       itinerary"
          "entourage itinerary";
      }
      
      calendar-widget {
        grid-area: calendar;
      }
      
      map-widget {
        grid-area: map;
      }
      
      itinerary-view {
        grid-area: itinerary;
      }
      
      entourage-table: {
        grid-area-entourage;
      }
    `
];
__decorateClass([
  (0, import_decorators.property)({ attribute: "tour-id" })
], TourPage.prototype, "tourId", 2);
__decorateClass([
  (0, import_decorators.state)()
], TourPage.prototype, "tour", 2);
__decorateClass([
  (0, import_decorators.state)()
], TourPage.prototype, "selectedDate", 2);
__decorateClass([
  (0, import_decorators.state)()
], TourPage.prototype, "_selectedDestination", 2);
TourPage = __decorateClass([
  (0, import_decorators.customElement)("tour-page")
], TourPage);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TourPage
});
//# sourceMappingURL=tour-page.js.map
