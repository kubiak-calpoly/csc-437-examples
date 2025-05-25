import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import {
  Destination,
  Segment,
  Tour,
  Transportation
} from "server/models";
import { Msg } from "../messages.ts";
import { Model } from "../model.ts";
import { DateRangeElement} from "../components/date-range.ts";
import { EntourageTable } from "../components/entourage-table";
import { DestinationElement } from "../components/destination.ts";
import { TransportationElement } from "../components/transportation.ts";
import {
  formatDate
} from "../utils/dates";

export class TourViewElement extends View<Model, Msg> {
  static uses = define({
    "date-range": DateRangeElement,
    "entourage-table": EntourageTable,
    "itinerary-destination": DestinationElement,
    "itinerary-transportation": TransportationElement
  });

  @property({ attribute: "tour-id" })
  tourid = "";

  @state()
  get tour(): Tour | undefined {
    return this.model.tour;
  };

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if(name === "tour-id" && old !== value && value ) {
      this.dispatchMessage(["tour/select", {tourid: value}]);
    }
  }

  constructor() {
    super("blazing:model");
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
          href="/app/destination/${this.tourid}/${i}">
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

    const renderDates = () => {
      return html`
        <p>
          from ${formatDate(startDate)} to
          ${formatDate(endDate)}
          ${endDate && endDate.getFullYear()}
        </p>
      `;
    };

    const renderDestAndTrans = (d: Destination, i: number) => {
      const t0 = transportation[i];
      const tn = transportation[i + 1];

      return html`
        ${i ? "" : html`
          <date-range
            from=${t0.startDate}
            to="${t0.endDate}">
          </date-range>
          ${renderTransportation(t0)}`
        }
        <date-range
          from=${d.startDate}
          to="${d.endDate}">
        </date-range>
        ${renderDestination(d, i)}
        <date-range
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
          ${renderDates()}
        </header>

        <section class="itinerary">
          ${destinations.map(renderDestAndTrans)}
        </section>

        <entourage-table
          href="/app/entourage/${this.tourid}"
          .using=${entourage}></entourage-table>
      </main>
    `;
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


