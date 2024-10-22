import { css, html } from "@calpoly/mustang/server";
import {
  Accommodation,
  Destination,
  Excursion,
  Transportation
} from "../models";
import renderPage from "./renderPage";

const secondsPerDay = 24 * 60 * 60 * 1000;

export type DestinationPageData = Destination & {
  tour: { name: string };
  inbound: Transportation;
  outbound: Transportation;
};

export class DestinationPage {
  data: DestinationPageData;

  constructor(data: DestinationPageData) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets: ["/styles/destination.css"],
      styles: [
        css`main.page {
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
    const nights =
      endDate.valueOf() / secondsPerDay -
      startDate.valueOf() / secondsPerDay;
    const accommodationList = accommodations.map((acc) =>
      this.renderAccommodation(acc)
    );
    const excursionList = excursions
      ? html`<ul class="excursions">
          ${excursions.map(this.renderExcursion)}
        </ul>`
      : "";
    const transportationFooter = html`<footer>
      ${this.renderTransportation(inbound, "in")}
      ${this.renderTransportation(outbound, "out")}
    </footer>`;
    return html`<body>
      <blz-header>
        <a href="../">&larr; Tour: ${tour.name}</a>
      </blz-header>
      <main class="page">
        <section class="destination">
          <header>
            <h2>${name}</h2>
            <p>${nights} nights</p>
          </header>
          ${featuredImage
        ? html`<img src="${featuredImage}" />`
        : ""}
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

  renderAccommodation(acc: Accommodation) {
    const { name, checkIn, checkOut, roomType, persons, rate } =
      acc;

    const formatDate = (date: Date | undefined) => {
      const dt = date || new Date();
      const m = DestinationPage.months[dt.getUTCMonth()];
      const d = dt.getUTCDate();

      return `${d} ${m}`;
    };

    return html`
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

  renderExcursion(exc: Excursion) {
    const { name, type } = exc;
    const icon = DestinationPage.excursionIcons[type || "tour"];

    return html`<li>
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

  renderTransportation(trn: Transportation, dir: "in" | "out") {
    const { type, segments } = trn;
    const icon =
      DestinationPage.transportationIcons[type] ||
      "icon-travel";
    const dirClass = dir === "in" ? "arrive" : "depart";
    const name =
      dir === "in"
        ? segments[0]?.departure.name
        : segments.at(-1)?.arrival.name;
    const endpoint =
      dir === "in"
        ? segments.at(-1)?.arrival
        : segments[0]?.departure;

    return html`<a class="${dirClass} ${type}" href="#">
      <svg class="icon">
        <use xlink:href="/icons/transportation.svg#${icon}" />
      </svg>
      <dl>
        <dt>
          ${dir === "in" ? "Arrive" : "Depart"}
          ${name
        ? dir === "in"
          ? `from ${name}`
          : `for ${name}`
        : ""}
        </dt>
        ${endpoint
        ? html`<dd>${endpoint.time.toUTCString()}</dd>
              <dd>${endpoint.station}</dd>`
        : ""}
      </dl>
    </a>`;
  }
}
