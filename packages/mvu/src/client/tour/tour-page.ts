import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import type {
  Tour,
  Destination,
  Transportation,
  Traveler
} from "../../models/Tour";
import "../shared/blazing-header";
import "./itinerary-view";
import "./calendar-widget";

@customElement("tour-page")
export class TourPage extends LitElement {
  @property({ attribute: "tour-id" })
  tourId: string = "";

  @state()
  tour: Tour = {
    id: "tour-skeleton",
    name: "Skeleton Tour",
    destinations: [],
    transportation: [],
    startDate: new Date(),
    endDate: new Date(),
    entourage: []
  } as Tour;

  @state()
  selectedDate: Date | undefined;

  connectedCallback() {
    console.log("Tour ID:", this.tourId);
    super.connectedCallback();

    fetch(`/api/tours/${this.tourId}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((json) => {
            this.tour = json as Tour;
            console.log(
              "Tour-page assigning new tour data",
              json
            );
          });
        }
      })
      .catch((err) =>
        console.log("Error when reading tour", err)
      );
  }

  render() {
    const { name, startDate, endDate, destinations } =
      this.tour;

    console.log(
      `Rendering tour ${name}, destinations = `,
      destinations
    );

    return html`
      <main class="page">
        <blazing-header title="${name}"> </blazing-header>
        <calendar-widget
          .handleChange=${(selected: Date | undefined) =>
            (this.selectedDate = selected)}
          start-date=${startDate}
          end-date=${endDate}>
        </calendar-widget>
        <map-widget src="/maps/italy.geo.json"> </map-widget>
        <itinerary-view
          .startDate=${new Date(startDate)}
          .selectedDate=${this.selectedDate}
          .destinations=${destinations}>
        </itinerary-view>
        <entourage-table> </entourage-table>
      </main>
    `;
  }

  static styles = css``;
}
