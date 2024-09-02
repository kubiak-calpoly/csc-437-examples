"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var destination_exports = {};
__export(destination_exports, {
  DestinationPage: () => DestinationPage
});
module.exports = __toCommonJS(destination_exports);
const staticParts = {
  stylesheets: ["/styles/destination.css"],
  styles: [
    `main.page {
        --page-grids: 8;
        grid-template-areas:
          "hdr hdr img img img img img img"
          "acc acc img img img img img img"
          "-- -- img img img img img img"
          "exc exc exc exc exc exc exc exc"
          "ftr ftr ftr ftr ftr ftr ftr ftr";
      }
      @media screen and (max-width: 48rem) {
        main.page {
          --page-grids: 6;
          grid-template-areas:
            "hdr hdr acc acc acc acc"
            "img img img img img img"
            "exc exc exc exc exc exc";
            "ftr ftr ftr ftr ftr ftr";
        }
      }`
  ],
  scripts: [
    `
      import { define } from "@calpoly/mustang";
      import { AccommodationElement } from "/scripts/accommodation.js";
      import { ConnectionElement,
        DestinationElement, ExcursionElement } from "/scripts/destination.js";

      define({
        "blz-accommodation": AccommodationElement,
        "blz-connection": ConnectionElement,
        "blz-destination": DestinationElement,
        "blz-excursion" : ExcursionElement
      });
      `
  ]
};
const secondsPerDay = 24 * 60 * 60 * 1e3;
class DestinationPage {
  static render(dest) {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
      tour,
      inbound,
      outbound
    } = dest;
    const nights = endDate.valueOf() / secondsPerDay - startDate.valueOf() / secondsPerDay;
    const accommodationComponent = (dest.accommodations || []).map(renderAccommodation).join("\n");
    const excursionList = dest.excursions.map(renderExcursion).join("\n");
    const transportationFooter = `
      ${renderTransportation(inbound, "in")}
      ${renderTransportation(outbound, "out")}
    `;
    return __spreadProps(__spreadValues({}, staticParts), {
      body: `<body>
      <blz-header>
        <a href="../">&larr; Tour: ${tour.name}</a>
      </blz-header>
      <main class="page">
        <blz-destination>
          <span slot="name">${name}</span>
          <span slot="nights">${nights}</span>
          <img slot="image" src="${featuredImage}" />
          ${accommodationComponent}
          ${excursionList}
          ${transportationFooter}
        </blz-destination>
      </main>
    </body>`
    });
  }
}
function renderAccommodation(acc) {
  const { name, checkIn, checkOut, roomType, persons, rate } = acc;
  return `
    <blz-accommodation slot="accommodation">
      <span slot="name">${name}</span>
      <time slot="check-in" datetime="${checkIn}">
      </time>
      <time slot="check-out" datetime="${checkOut}">
      </time>
      <span slot="room-type">${roomType}</span>
      <span slot="persons">${persons}</span>
      <span slot="room-rate"> ${rate.amount}</span>
      <span slot="currency">${rate.currency}</span>
    </blz-accommodation>
    `;
}
function renderExcursion(exc) {
  const { name, type } = exc;
  return `<blz-excursion slot="excursions" type="${type}">
    ${name}
  </blz-excursion>
  `;
}
function renderTransportation(trn, dir) {
  var _a, _b, _c, _d;
  const { type, segments } = trn;
  const slotName = dir === "in" ? "arrival" : "departure";
  const name = dir === "in" ? (_a = segments[0]) == null ? void 0 : _a.departure.name : (_b = segments.at(-1)) == null ? void 0 : _b.arrival.name;
  const endpoint = dir === "in" ? (_c = segments.at(-1)) == null ? void 0 : _c.arrival : (_d = segments[0]) == null ? void 0 : _d.departure;
  return `
    <blz-connection
      dir="${dir}"
      by="${type}"
      offset="${(endpoint == null ? void 0 : endpoint.tzoffset) || 0}"
      slot="${slotName}"
    >
      <span slot="name">${name}</span>
      <time slot="time" datetime="${endpoint == null ? void 0 : endpoint.time}"></time>
      <span slot="station">${endpoint == null ? void 0 : endpoint.station}</span>
    </blz-connection>
    `;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DestinationPage
});
