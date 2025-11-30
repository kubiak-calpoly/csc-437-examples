import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import {
  DateRange,
  Destination,
  Segment,
  Tour,
  Transportation
} from "server/models";
import { Msg } from "../messages.ts";
import { Model } from "../model.ts";
import {
  CalendarWidget
} from "../components/calendar-widget.ts";
import { DateRangeElement } from "../components/date-range.ts";
import { EntourageTable } from "../components/entourage-table";
import {
  DestinationElement
} from "../components/destination.ts";
import {
  TransportationElement
} from "../components/transportation.ts";
import { MapViewerElement } from "../components/map-viewer.ts";

export class TourViewElement extends View<Model, Msg> {
  static uses = define({
    "calendar-widget": CalendarWidget,
    "date-range": DateRangeElement,
    "entourage-table": EntourageTable,
    "itinerary-destination": DestinationElement,
    "itinerary-transportation": TransportationElement,
    "map-viewer": MapViewerElement,
  });
  static styles = [
    css`
      :host {
        display: contents;
      }
      h2,
      p {
        margin: 0;
      }
      main {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "hd hd hd it it it it it"
          "mv mv mv it it it it it"
          "en en en it it it it it"
          "xx xx xx it it it it it";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }

      header {
        grid-area: hd;
      }

      .itinerary {
        display: grid;
        grid-area: it;
        align-self: start;
        grid-template-columns: subgrid [start] [header] [] [] [end];
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;

        .hidden {
          display: none;
        }
      }

      map-viewer {
        grid-area: mv;
      }

      entourage-table {
        grid-area: en;
        display: grid;
        grid-template-columns: subgrid;
      }

      date-range {
        text-align: right;
        font-family: var(--font-family-display);
        color: var(--color-accent);
      }
    `
  ];
  @property({ attribute: "tour-id" })
  tourId = "";
  @state()
  dateSelection?: Date;

  constructor() {
    super("blazing:model");
  }

  @state()
  get tour(): Tour | undefined {
    return this.model.tour;
  };

  @state()
  get route() {
    return this.model.route;
  }

  @state()
  get routeStatus() {
    return this.model.routeStatus;
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === "tour-id" && old !== value && value) {
      this.dispatchMessage(["tour/request", { tourid: value }]);
    }
  }

  updated(changes: Map<string, any>) {
    console.log("Tour page updated:", changes);
    if (this.tour && !this.route && this.routeStatus?.tourid !== this.tourId) {
      this.dispatchMessage(["route/request", {
        tourid: this.tourId,
        points: this.tour.destinations.map((d) => d.location)
      }]);
    }
  }

  render(): TemplateResult {
    const {
      endDate,
      destinations = [],
      transportation = [],
      entourage,
      name,
      startDate
    } = this.tour || {};

    const isSelected = (range: DateRange): boolean => {
      if (!this.dateSelection) return true;
      else
        return range.startDate <= this.dateSelection &&
          (range.endDate
              ? range.endDate >= this.dateSelection
              : range.startDate >= this.dateSelection
          );
    };

    const renderDestination = (
      dest: Destination,
      i: number
    ) => {
      const { startDate, endDate, name, featuredImage } = dest;
      const nights = Math.ceil(
        (endDate.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24));
      return html`
        <itinerary-destination
          class=${isSelected(dest) ? "" : "hidden"}
          start-date=${startDate}
          end-date=${endDate}
          img-src=${featuredImage}
          nights=${nights}
          href="/app/destination/${this.tourId}/${i}">
          ${name}
        </itinerary-destination>
      `;
    };

    const renderRoute = (segments: Segment[]) => {
      const count = segments.length + 1;
      const origin = segments[0].departure;
      const terminus = segments[segments.length - 1].arrival;
      const via =
        count > 2
          ? html`
            <span slot="via">
                ${segments.slice(1).map(
                  (seg) => seg.departure.station ||
                    seg.departure.name
                )
                  .join(", ")}
              </span>
          `
          : null;

      return html`
        <span
          slot="from">${origin.station || origin.name}</span>
        <span
          slot="to">${terminus.station || terminus.name}</span>
        ${via}
      `;
    };

    const renderTransportation = (tran: Transportation) => {
      const { startDate, type, segments } = tran || {};
      return html`
        <itinerary-transportation
          class=${isSelected(tran) ? "" : "hidden"}
          start-date=${startDate}
          mode=${type}>
          ${renderRoute(segments)}
        </itinerary-transportation>
      `;
    };

    const renderDestAndTrans = (d: Destination, i: number) => {
      const t0 = transportation[i];
      const tn = transportation[i + 1];

      const firstTransportation = i > 0 ? "" : html`
        <date-range
          class=${isSelected(t0) ? "" : "hidden"}
          from=${t0.startDate}
          to="${t0.endDate}">
        </date-range>
        ${renderTransportation(t0)}
      `;

      return html`
        ${firstTransportation}
        <date-range
          class=${isSelected(d) ? "" : "hidden"}
          from=${d.startDate}
          to="${d.endDate}">
        </date-range>
        ${renderDestination(d, i)}
        <date-range
          class=${isSelected(tn) ? "" : "hidden"}
          from=${tn.startDate}
          to="${tn.endDate}">
        </date-range>
        ${renderTransportation(tn)}
      `;
    };

    console.log("Rendering Tour page", this.tour);

    const places =
      this.tour?.destinations
        .filter((d: Destination): boolean => isSelected(d))
        .map((d: Destination) => ({
        name: d.name,
        feature: d.location
      })) || [];


    return html`
      <main>
        <header>
          <h2>${name}</h2>
          <calendar-widget
            @calendar-widget:select=${this._handleSelection}
            @calendar-widget:clear=${this._handleClear}
            start-date=${startDate}
            end-date=${endDate}>
          </calendar-widget>
        </header>

        <section class="itinerary">
          ${destinations.map(renderDestAndTrans)}
        </section>

        <map-viewer
          .places=${places}
          .route=${this.route}>
        </map-viewer>

        <entourage-table
          href="/app/entourage/${this.tourId}"
          .using=${entourage}>
        </entourage-table>
      </main>
    `;
  }

  _handleSelection(e: CustomEvent<{ date: Date }>) {
    this.dateSelection = e.detail.date;
  }

  _handleClear() {
    this.dateSelection = undefined;
  }
}
