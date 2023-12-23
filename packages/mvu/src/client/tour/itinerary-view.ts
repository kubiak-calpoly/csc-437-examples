import { html, LitElement } from "lit";
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
      destinations
    );

    const destinationView = (dst: Destination, i: number) => {
      const startDate = startDates[i];
      const nights = dst.nights;
      const endDate: Date = new Date(
        startDate.getTime() + nights * (24 * 60 * 60 * 1000)
      );

      return html`
        <itinerary-item
          marker="marker-destination-${i}"
          item-class="destination"
          start-date="${startDate}"
          end-date="${endDate}">
          <h3 slot="summary"> ${dst.name} </h3>
          <p slot="summary">
            ${nights} night${nights === 1 ? "" : "s"}
          </p>
          <img class="featured" src="${dst.featuredImage}" />
        </itinerary-item>
      `;
    };

    return this.destinations.map(destinationView);
  }
}
