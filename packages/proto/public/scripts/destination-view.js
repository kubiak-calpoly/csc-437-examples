import {
  css,
  define,
  html,
  shadow,
  Observer
} from "@calpoly/mustang";
import { AccommodationElement } from "./accommodation.js";
import {
  ConnectionElement,
  DestinationElement,
  ExcursionElement
} from "./destination.js";
import { DestinationForm } from "./destination-form.js";

const secondsPerDay = 24 * 60 * 60 * 1000;

export class DestinationView extends HTMLElement {
  static uses = define({
    "blz-accommodation": AccommodationElement,
    "blz-connection": ConnectionElement,
    "blz-destination": DestinationElement,
    "blz-destination-form": DestinationForm,
    "blz-excursion": ExcursionElement
  });

  constructor() {
    super();

    this.style.display = "contents";
  }

  _authObserver = new Observer(this, "blazing:auth");

  get mode() {
    const query = document.location.search;
    const params = new URLSearchParams(query);
    return params.get("mode");
  }

  get src() {
    return this.getAttribute("src-tour");
  }

  get destinationIndex() {
    const di = this.getAttribute("destination-index");
    return di ? parseInt(di) : 0;
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Observing auth, user=", user);
      this._user = user;
      this.loadData()
        .then((res) => {
          if (res.status === 200) return res.json();
          throw `Server responded with status ${res.status}`;
        })
        .catch((err) =>
          console.log("Failed to load destination data:", err)
        )
        .then((tour) =>
          this.render({
            tour: { name: tour.name },
            ...tour.destinations[this.destinationIndex],
            inbound: tour.transportation[this.destinationIndex],
            outbound:
              tour.transportation[this.destinationIndex + 1]
          })
        )
        .catch((err) =>
          console.log("Failed to render destination data:", err)
        );
    });
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  loadData() {
    return fetch(this.src, {
      headers: this.authorization
    });
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

    const fragment = this.mode
      ? html`<blz-destination-form
          api="${this.src}/destinations/${
          this.destinationIndex
        }"
          redirect="${document.location.pathname}"
          mode="${this.mode}"
          name="${name}"
          startDate="${startDate}"
          endDate="${endDate}"
          featuredImage="${featuredImage}"
          accommodation="
            ${JSON.stringify(accommodations[0] || {})}"
          excursions="
            ${JSON.stringify(excursions || [])}">
        </blz-destination-editor>`
      : html`
          <blz-destination>
            <span slot="name">${name}</span>
            <span slot="nights">${nights}</span>
            <img slot="image" src="${featuredImage}" />
            ${renderAccommodation(accommodations[0] || {})}
            ${excursions.map(renderExcursion)}
            ${inbound && renderConnection(inbound, "in")}
            ${outbound && renderConnection(outbound, "out")}
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
