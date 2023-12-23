import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import type {
  Tour,
  Destination,
  Transportation
} from "../../models/Tour";
import { Profile } from "../../models/Profile";
import { reset, elements } from "../shared/css-base";
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
          });
        }
      })
      .catch((err) =>
        console.log("Error when reading tour", err)
      );
  }

  render() {
    const {
      name,
      startDate,
      endDate,
      destinations,
      transportation
    } = this.tour;

    return html`
      <blazing-header title="${name}"> </blazing-header>
      <main class="page">
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
          .destinations=${destinations}
          .transportation=${transportation}>
        </itinerary-view>
        <entourage-table> </entourage-table>
      </main>
    `;
  }

  static styles = [
    reset,
    elements,
    css`
      main.page {
        display: grid;
        grid-template-columns: var(--size-width-sidebar) auto;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "calendar  itinerary"
          "map       itinerary"
          "entourage itinerary";
      }
      
      calendar-widget {
        grid-area: calendar;
      }
      
      map-widget {
        grid-area: map;
      }
      
      itinerary-view {
        grid-area: itinerary;
      }
      
      entourage-table: {
        grid-area-entourage;
      }
    `
  ];
}
