import { css, html, svg, LitElement } from "lit";
import {
  customElement,
  state,
  property
} from "lit/decorators.js";
import { consume } from "@lit/context";
import moment from "moment";
import type {
  Tour,
  Destination,
  Transportation,
  TransportationType,
  Segment
} from "../../models/Tour";
import { reset, elements } from "../shared/css-base";
import "./itinerary-item";
import tourContext from "./tour-context";

@customElement("itinerary-view")
export class ItineraryView extends LitElement {
  @consume({ context: tourContext, subscribe: true })
  @property({ attribute: false })
  tour: Tour = {
    id: "not_a_tour",
    name: "Unnamed",
    destinations: [],
    transportation: [],
    startDate: new Date(),
    endDate: new Date(),
    entourage: []
  } as Tour;

  @property()
  startDate: Date = new Date();

  @property()
  selectedDate: Date | undefined;

  @property()
  handleDestinationToggle = (
    open: boolean,
    d: Destination
  ) => {};

  render() {
    console.log(
      "Rendering itinerary-view for tour",
      this.tour.startDate,
      this.tour.destinations,
      this.tour.transportation
    );

    const transportation = this.tour.transportation;
    const startDates = this.tour.destinations
      .map((dst) => dst.nights)
      .reduce(
        (acc, nights, i) =>
          acc.concat([
            new Date(
              acc[i].getTime() + nights * (24 * 60 * 60 * 1000)
            )
          ]),
        [new Date(this.tour.startDate)]
      );

    const destinationView = (dst: Destination, i: number) => {
      const startDate = startDates[i];
      const nights = dst.nights;
      const endDate: Date = new Date(
        startDate.getTime() + nights * (24 * 60 * 60 * 1000)
      );
      const hidden =
        this.selectedDate &&
        (this.selectedDate.getTime() < startDate.getTime() ||
          this.selectedDate.getTime() > endDate.getTime());
      const open = !hidden;

      return html`
        <itinerary-item
          item-class="destination"
          .startDate=${startDate}
          .endDate=${endDate}
          ?hidden=${hidden}
          ?open=${open}
          .handleToggle=${(open: boolean) =>
            this.handleDestinationToggle(open, dst)}>
          <h3 slot="summary"> ${dst.name} </h3>
          <p slot="summary">
            ${nights} night${nights === 1 ? "" : "s"}
          </p>
          <img class="featured" src="${dst.featuredImage}" />
        </itinerary-item>
      `;
    };

    const segmentView = (seg: Segment) => {
      const depMoment = moment(seg.departure.time);
      const arrMoment = moment(seg.arrival.time);

      return html`
        <h4
          >${[seg.provider, seg.name]
            .filter(Boolean)
            .join(" ")}</h4
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

    const transportationView = (trn: Transportation) => {
      const startDate = new Date(trn.startDate);
      const endDate = trn.endDate
        ? new Date(trn.endDate)
        : startDate;
      const icon = iconForTransportation(trn.type);
      const hidden =
        this.selectedDate &&
        (this.selectedDate.getTime() < startDate.getTime() ||
          this.selectedDate.getTime() > endDate.getTime());

      return html`
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

    return html`
      <section class="itinerary">
        ${this.tour.destinations.flatMap((d, i) =>
          i < transportation.length
            ? [
                destinationView(d, i),
                transportationView(transportation[i])
              ]
            : destinationView(d, i)
        )}
      </section>
    `;
  }

  static styles = [
    reset,
    elements,
    css`
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
}

function iconForTransportation(type: TransportationType) {
  const hash: { [key in TransportationType]: String } = {
    air: "icon-airplane",
    rail: "icon-train",
    ship: "icon-ship",
    bus: "icon-bus"
  };

  return svg`
    <use href="/icons/transportation.svg#${hash[type]}" />
    `;
}
