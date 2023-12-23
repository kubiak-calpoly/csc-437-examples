import { css, html, LitElement } from "lit";
import {
  customElement,
  state,
  property
} from "lit/decorators.js";
import type { Tour, Destination } from "../../models/Tour";
import "./itinerary-item";

import { tourContext } from "./tour-context";

@customElement("itinerary-view")
export class ItineraryView extends LitElement {
  @property()
  destinations: Array<Destination> = [];

  @property()
  startDate: Date = new Date();

  @property()
  selectedDate: Date | undefined;

  render() {
    const destinations = this.destinations;
    const startDates = destinations
      .map((dst) => dst.nights)
      .reduce(
        (acc, nights, i) =>
          acc.concat([
            new Date(
              acc[i].getTime() + nights * (24 * 60 * 60 * 1000)
            )
          ]),
        [this.startDate]
      );

    console.log(
      "Rendering itinerary-view for tour",
      this.selectedDate,
      destinations
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

      return html`
        <itinerary-item
          marker="marker-destination-${i}"
          item-class="destination"
          .startDate=${startDate}
          .endDate=${endDate}
          ?hidden=${hidden}>
          <h3 slot="summary"> ${dst.name} </h3>
          <p slot="summary">
            ${nights} night${nights === 1 ? "" : "s"}
          </p>
          <img class="featured" src="${dst.featuredImage}" />
        </itinerary-item>
      `;
    };

    return html`
      <section class="itinerary">
        ${this.destinations.map(destinationView)}
      </section>
    `;
  }

  static styles = css`
    .itinerary {
      display: grid;
      grid-area: itinerary;
      align-self: start;
      grid-template-columns: [start] auto [header] 4fr [info] 1fr 2fr 1fr 2fr [end];
      gap: var(--size-spacing-large) var(--size-spacing-medium);
      align-items: baseline;
      margin: var(--size-spacing-small);
    }

    itinerary-item > h3 > .icon:first-child {
      position: absolute;
      top: 0;
      left: 0;
    }

    itinerary-item ol,
    itinerary-item ol > li {
      display: contents;
    }

    itinerary-item h4 {
      grid-column: header;
      text-align: right;
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
  `;
}
