import {
  Accommodation,
  Destination,
  Excursion,
  Transportation
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

const secondsPerDay = 24 * 60 * 60 * 1000;
export class DestinationPage {
  static render(
    dest: Destination & {
      tour: { name: string };
      inbound: Transportation;
      outbound: Transportation;
    }
  ) {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
      tour,
      inbound,
      outbound
    } = dest;
    const nights =
      endDate.valueOf() / secondsPerDay -
      startDate.valueOf() / secondsPerDay;
    const accommodationComponent = (dest.accommodations || [])
      .map(renderAccommodation)
      .join("\n");
    const excursionList = dest.excursions
      .map(renderExcursion)
      .join("\n");
    const transportationFooter = `
      ${renderTransportation(inbound, "in")}
      ${renderTransportation(outbound, "out")}
    `;
    return {
      ...staticParts,
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
        <!--
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
        -->
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
    <blz-accommodation slot="accommodation">
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
  train: "icon-train",
  walking: "icon-walk",
  tour: "icon-camera"
};

function renderExcursion(exc: Excursion) {
  const { name, type } = exc;
  const icon = excursionIcons[type || "tour"];

  return `<blz-excursion slot="excursions" type="$type">
    ${name}
  </blz-excursion>
  `;
  // return `<li slot="excursions">
  //   <svg class="icon">
  //     <use xlink:href="/icons/destination.svg#${icon}" />
  //   </svg>
  //   <span>${name}</span>
  // </li>`;
}

function renderTransportation(
  trn: Transportation,
  dir: "in" | "out"
) {
  const { type, segments } = trn;
  const slotName = dir === "in" ? "arrival" : "departure";
  const name =
    dir === "in"
      ? segments[0]?.departure.name
      : segments.at(-1)?.arrival.name;
  const endpoint =
    dir === "in"
      ? segments.at(-1)?.arrival
      : segments[0]?.departure;

  return `<blz-connection dir="${dir}" by="${type}" slot="${slotName}">
      <span slot="name">${name}</span>
      <time slot="time" datetime="${endpoint?.time.toISOString()}">
        ${endpoint?.time.toUTCString()}
      </time>
      <span slot="station">${endpoint?.station}</span>
    </blz-connection>
    `;
}
