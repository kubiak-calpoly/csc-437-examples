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
var destination_exports = {};
__export(destination_exports, {
  DestinationPage: () => DestinationPage
});
module.exports = __toCommonJS(destination_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
const secondsPerDay = 24 * 60 * 60 * 1e3;
class DestinationPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      stylesheets: ["/styles/destination.css"],
      styles: [
        import_server.css`main.page {
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

      define({
        "blz-accommodation": AccommodationElement
      });
      `
      ]
    });
  }
  renderBody() {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
      accommodations = [],
      excursions,
      tour,
      inbound,
      outbound
    } = this.data;
    const nights = endDate.valueOf() / secondsPerDay - startDate.valueOf() / secondsPerDay;
    const accommodationList = accommodations.map(
      (acc) => this.renderAccommodation(acc)
    );
    const excursionList = excursions ? import_server.html`<ul class="excursions">
          ${excursions.map(this.renderExcursion)}
        </ul>` : "";
    const transportationFooter = import_server.html`<footer>
      ${this.renderTransportation(inbound, "in")}
      ${this.renderTransportation(outbound, "out")}
    </footer>`;
    return import_server.html`<body>
      <blz-header>
        <a href="../">&larr; Tour: ${tour.name}</a>
      </blz-header>
      <main class="page">
        <section class="destination">
          <header>
            <h2>${name}</h2>
            <p>${nights} nights</p>
          </header>
          ${featuredImage ? import_server.html`<img src="${featuredImage}" />` : ""}
          ${accommodationList} ${excursionList}
          ${transportationFooter}
        </section>
      </main>
    </body>`;
  }
  static months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  renderAccommodation(acc) {
    const { name, checkIn, checkOut, roomType, persons, rate } = acc;
    const formatDate = (date) => {
      const dt = date || /* @__PURE__ */ new Date();
      const m = DestinationPage.months[dt.getUTCMonth()];
      const d = dt.getUTCDate();
      return `${d} ${m}`;
    };
    return import_server.html`
      <blz-accommodation>
        <span slot="name">${name}</span>
        <time slot="check-in" datetime="${checkIn.toString()}">
          ${formatDate(checkIn)}
        </time>
        <time
          slot="check-out"
          datetime="${checkOut.toString()}">
          ${formatDate(checkOut)}
        </time>
        <span slot="room-type">${roomType}</span>
        <span slot="persons">${persons}</span>
        <span slot="room-rate"> ${rate.amount}</span>
        <span slot="currency">${rate.currency}</span>
      </blz-accommodation>
    `;
  }
  static excursionIcons = {
    boat: "icon-boat",
    bus: "icon-bus",
    metro: "icon-metro",
    train: "icon-train",
    walking: "icon-walk",
    tour: "icon-camera"
  };
  renderExcursion(exc) {
    const { name, type } = exc;
    const icon = DestinationPage.excursionIcons[type || "tour"];
    return import_server.html`<li>
      <svg class="icon">
        <use xlink:href="/icons/destination.svg#${icon}" />
      </svg>
      <span>${name}</span>
    </li>`;
  }
  static transportationIcons = {
    air: "icon-airplane",
    rail: "icon-train",
    ship: "icon-boat",
    bus: "icon-bus"
  };
  renderTransportation(trn, dir) {
    const { type, segments } = trn;
    const icon = DestinationPage.transportationIcons[type] || "icon-travel";
    const dirClass = dir === "in" ? "arrive" : "depart";
    const name = dir === "in" ? segments[0]?.departure.name : segments.at(-1)?.arrival.name;
    const endpoint = dir === "in" ? segments.at(-1)?.arrival : segments[0]?.departure;
    return import_server.html`<a class="${dirClass} ${type}" href="#">
      <svg class="icon">
        <use xlink:href="/icons/transportation.svg#${icon}" />
      </svg>
      <dl>
        <dt>
          ${dir === "in" ? "Arrive" : "Depart"}
          ${name ? dir === "in" ? `from ${name}` : `for ${name}` : ""}
        </dt>
        ${endpoint ? import_server.html`<dd>${endpoint.time.toUTCString()}</dd>
              <dd>${endpoint.station}</dd>` : ""}
      </dl>
    </a>`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DestinationPage
});
