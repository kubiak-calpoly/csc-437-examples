import {
  Accommodation,
  Destination,
  Excursion
} from "../models";

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

      define({
        "blz-accommodation": AccommodationElement
      });
      `
  ]
};

const secondsPerDay = 24 * 60 * 60 * 1000;
export class DestinationPage {
  static render(
    dest: Destination & { tour: { name: string } }
  ) {
    const { name, startDate, endDate, featuredImage, tour } =
      dest;
    const nights =
      endDate.valueOf() / secondsPerDay -
      startDate.valueOf() / secondsPerDay;
    const accommodationComponent = (dest.accommodations || [])
      .map(renderAccommodation)
      .join("\n");
    const excursionList = dest.excursions
      ? `<ul class="excursions">
        ${dest.excursions.map(renderExcursion).join("\n")}
        </ul>`
      : "";
    const transportationFooter = `<footer></footer>`;
    return {
      ...staticParts,
      body: `<body>
      <blz-header>
        <a href="../">&larr; Tour: ${tour.name}</a>
      </blz-header>
      <main class="page">
        <section class="destination">
          <header>
            <h2>${name}</h2>
            <p>${nights} nights</p>
          </header>
          <img src="${featuredImage}" />
          ${accommodationComponent}
          ${excursionList}
          ${transportationFooter}
        </section>
      </main>
    </body>`
    };
  }
}

const months = [
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

function renderAccommodation(acc: Accommodation) {
  const { name, checkIn, checkOut, roomType, persons, rate } =
    acc;

  const formatDate = (date: Date | undefined) => {
    const dt = date || new Date();
    const m = months[dt.getUTCMonth()];
    const d = dt.getUTCDate();

    return `${d} ${m}`;
  };

  return `
    <blz-accommodation>
      <span slot="name">${name}</span>
      <time slot="check-in" datetime="${checkIn}">
        ${formatDate(checkIn)}
      </time>
      <time slot="check-out" datetime="${checkOut}">
        ${formatDate(checkOut)}
      </time>
      <span slot="room-type">${roomType}</span>
      <span slot="persons">${persons}</span>
      <span slot="room-rate"> ${rate.amount}</span>
      <span slot="currency">${rate.currency}</span>
    </blz-accommodation>
    `;
}

const excursionIcons = {
  boat: "icon-boat",
  bus: "icon-bus",
  metro: "icon-metro",
  train: "icon-rail",
  walking: "icon-walk",
  tour: "icon-camera"
};

function renderExcursion(exc: Excursion) {
  const { name, type } = exc;
  const icon = excursionIcons[type || "tour"];

  return `<li>
    <svg class="icon">
      <use xlink:href="/icons/destination.svg#${icon}" />
    </svg>
    <span>${name}</span>
  </li>`;
}