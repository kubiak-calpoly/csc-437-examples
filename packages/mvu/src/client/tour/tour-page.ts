import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { provide } from "@lit/context";
import { router } from "lit-element-router";
import type {
  Tour,
  Destination,
  Transportation
} from "../../models/Tour";
import { Profile } from "../../models/Profile";
import { reset, elements } from "../shared/css-base";
import tourContext from "./tour-context";
import "../shared/blazing-header";
import "./tour-router";
import "./itinerary-view";
import "./calendar-widget";
import "./map-widget";

@router
@customElement("tour-page")
export class TourPage extends LitElement {
  @state()
  route: String = "itinerary";

  @state()
  params: Object = {};

  @state()
  query: Object = {};

  @property({ attribute: "tour-id" })
  tourId: string = "";

  @provide({ context: tourContext })
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
  _selectedDate: Date | undefined;

  @state()
  _selectedDestination: Destination | undefined;

  static routes = [
    {
      name: "itinerary",
      pattern: "tour/:id"
    },
    {
      name: "destination",
      pattern: "tour/:id/destination/:n"
    },
    {
      name: "not-found",
      pattern: "*"
    }
  ];

  router(
    route: string,
    params: Object,
    query: Object,
    data: Object = {}
  ) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log(route, params, query, data);
  }

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

    const renderMarker = (dst: Destination, i: number) => {
      return html` <map-marker
        lat=${dst.location.lat}
        lon=${dst.location.lon}
        ?selected=${dst.name ===
        this._selectedDestination?.name}>
        ${dst.name}
      </map-marker>`;
    };

    return html`
      <blazing-header title="${name}"> </blazing-header>
      <main class="page">
        <calendar-widget
          .handleChange=${(selected: Date | undefined) =>
            (this._selectedDate = selected)}
          start-date=${startDate}
          end-date=${endDate}>
        </calendar-widget>
        <map-widget src="/maps/italy.geo.json">
          ${destinations.map(renderMarker)}
        </map-widget>
        <tour-router active-route="${this.route}">
          <itinerary-view
            route="itinerary"
            .selectedDate=${this._selectedDate}
            .handleDestinationToggle=${(
              open: boolean,
              dst: Destination
            ) =>
              (this._selectedDestination = open
                ? dst
                : undefined)}>
          </itinerary-view>
          <p route="destination">Your destination here</p>
        </tour-router>
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
