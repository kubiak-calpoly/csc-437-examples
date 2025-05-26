import { Auth, define, Observer } from "@calpoly/mustang";
import { css, html, LitElement, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import {
  DateRange,
  Destination,
  Segment,
  Tour,
  Transportation
} from "server/models";
import { CalendarWidget } from "../components/calendar-widget.ts";
import { DateRangeElement} from "../components/date-range.ts";
import { EntourageTable } from "../components/entourage-table";
import { DestinationElement } from "../components/destination.ts";
import { TransportationElement } from "../components/transportation.ts";
import {
  convertStartEndDates,
} from "../utils/dates";

export class TourViewElement extends LitElement {
  static uses = define({
    "calendar-widget": CalendarWidget,
    "date-range": DateRangeElement,
    "entourage-table": EntourageTable,
    "itinerary-destination": DestinationElement,
    "itinerary-transportation": TransportationElement
  });

  @property({attribute: "tour-id"})
  tourId?: string;

  get src() {
    return `/api/tours/${this.tourId}`;
  }

  @state()
  dateSelection?: Date;

  @state()
  tour?: Tour;

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.loadData();
    });
  }

  loadData() {
    if (this.src) {
      fetch(this.src, {
        headers: Auth.headers(this._user)
      })
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw `Server responded with status ${res.status}`;
        })
        .catch((err) =>
          console.log("Failed to load tour data:", err)
        )
        .then((json: unknown) => {
          if (json) {
            console.log("Tour:", json);
            let tour: Tour = convertStartEndDates<Tour>(json);
            tour.destinations = tour.destinations.map(
              convertStartEndDates<Destination>
            );
            tour.transportation = tour.transportation.map(
              convertStartEndDates<Transportation>
            );
            this.tour = tour;
          }
        })
        .catch((err) =>
          console.log("Failed to convert tour data:", err)
        );
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

    const renderDestination = (
      dest: Destination,
      i: number
    ) => {
      const { startDate, endDate, name, featuredImage } = dest;
      return html`
        <itinerary-destination
          start-date=${startDate}
          end-date=${endDate}
          img-src=${featuredImage}
          href="/app/tour/${this.tourId}/destination/${i}">
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
        <span slot="from">${origin.station || origin.name}</span>
        <span slot="to">${terminus.station || terminus.name}</span>
        ${via}
      `;
    };

    const renderTransportation = (tran: Transportation) => {
      const { startDate, type, segments } = tran || {};
      return html`
        <itinerary-transportation
          start-date=${startDate}
          mode=${type}>
          ${renderRoute(segments)}
        </itinerary-transportation>
      `;
    };



    const renderDestAndTrans = (d: Destination, i: number) => {
      const t0 = transportation[i];
      const tn = transportation[i + 1];

      const isSelected = (range: DateRange): boolean => {
        console.log("isSelected",
          range.startDate.toISOString(),
          range.endDate?.toISOString(),
          this.dateSelection?.toISOString())
        if( !this.dateSelection ) return true;
        else
          return range.startDate <= this.dateSelection &&
            (range.endDate
                ? range.endDate >= this.dateSelection
                : range.startDate >= this.dateSelection
            );
      }

      return html`
        <date-range
          class=${i || isSelected(t0) ? "hidden" : ""}
          from=${t0.startDate}
          to="${t0.endDate}">
        </date-range>
        ${renderTransportation(t0)}

        <date-range
          class=${!isSelected(d) ? "hidden" : ""}
          from=${d.startDate}
          to="${d.endDate}">
        </date-range>
        ${renderDestination(d, i)}

        <date-range
          class=${!isSelected(tn) ? "hidden" : ""}
          from=${tn.startDate}
          to="${tn.endDate}">
        </date-range>
        ${renderTransportation(tn)}
      `;
    };

    console.log("Rendering Tour page", this.tour);

    return html`
      <main>
        <header>
          <h2>${name}</h2>
          <calendar-widget
            @calendar-widget:select=${this._handleSelection}
            start-date=${startDate}
            end-date=${endDate}>
          </calendar-widget>        </header>

        <section class="itinerary">
          ${destinations.map(renderDestAndTrans)}
        </section>

        <entourage-table .using=${entourage}>
        </entourage-table>
      </main>
    `;
  }

  _handleSelection(e: CustomEvent<{date: Date}>) {
    this.dateSelection = e.detail.date;
  }

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
        
        > .hidden {
          display: none;
        }
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
}
