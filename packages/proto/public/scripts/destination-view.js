import { css, define, html, shadow } from "@calpoly/mustang";
import { AccommodationElement } from "./accommodation.js";
import {
  ConnectionElement,
  DestinationElement,
  ExcursionElement
} from "./destination.js";

const secondsPerDay = 24 * 60 * 60 * 1000;

export class DestinationView extends HTMLElement {
  static uses = define({
    "blz-accommodation": AccommodationElement,
    "blz-connection": ConnectionElement,
    "blz-destination": DestinationElement,
    "blz-excursion": ExcursionElement
  });

  constructor() {
    super();

    this.style.display = "contents";
  }

  connectedCallback() {
    this._src = this.getAttribute("src-tour");
    this._dest = parseInt(
      this.getAttribute("destination-index")
    );

    this.loadData()
      .then((res) => {
        if (res.status === 200) return res.json();
        throw "Not found";
      })
      .then((tour) =>
        this.render({
          tour: { name: tour.name },
          ...tour.destinations[this._dest],
          inbound: tour.transportation[this._dest],
          outbound: tour.transportation[this._dest + 1]
        })
      );
  }

  loadData() {
    return fetch(this._src);
  }

  render(data) {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
      accommodations,
      excursions,
      inbound,
      outbound
    } = data;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const nights =
      end.valueOf() / secondsPerDay -
      start.valueOf() / secondsPerDay;

    const fragment = html`
      <blz-destination>
        <span slot="name">${name}</span>
        <span slot="nights">${nights}</span>
        <img slot="image" src="${featuredImage}" />
        ${renderAccommodation(accommodations[0] || {})}
        ${excursions.map(renderExcursion)}
        ${renderConnection(inbound, "in")}
        ${renderConnection(outbound, "out")}
      </blz-destination>
    `;

    this.replaceChildren(fragment);

    return;

    function renderAccommodation(acc) {
      const {
        name,
        checkIn,
        checkOut,
        roomType,
        persons,
        rate
      } = acc;

      return html`
        <blz-accommodation slot="accommodation">
          <span slot="name">${name}</span>
          <time slot="check-in" datetime="${checkIn}"> </time>
          <time slot="check-out" datetime="${checkOut}"> </time>
          <span slot="room-type">${roomType}</span>
          <span slot="persons">${persons}</span>
          <span slot="room-rate"> ${rate.amount}</span>
          <span slot="currency">${rate.currency}</span>
        </blz-accommodation>
      `;
    }

    function renderExcursion(exc) {
      const { name, type } = exc;

      return html`
        <blz-excursion slot="excursions" type="${type}">
          ${name}
        </blz-excursion>
      `;
    }

    function renderConnection(trn, dir) {
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

      return html`
        <blz-connection
          dir="${dir}"
          by="${type}"
          offset="${endpoint?.tzoffset || 0}"
          slot="${slotName}">
          <span slot="name">${name}</span>
          <time slot="time" datetime="${endpoint?.time}"></time>
          <span slot="station">${endpoint?.station}</span>
        </blz-connection>
      `;
    }
  }
}