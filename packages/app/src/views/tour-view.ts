import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import {
  Destination,
  Segment,
  Tour,
  Transportation
} from "server/models";
import { EntourageTable } from "../components/entourage-table";
import {
  ItineraryDestinationElement,
  ItineraryTransportationElement
} from "../components/itinerary-items";
import { Msg } from "../messages";
import { Model } from "../model";
import { formatDate } from "../utils/dates";

export class TourViewElement extends View<Model, Msg> {
  static uses = define({
    "entourage-table": EntourageTable,
    "itinerary-destination": ItineraryDestinationElement,
    "itinerary-transportation": ItineraryTransportationElement
  });

  @property({ attribute: "tour-id", reflect: true })
  tourid = "";

  @state()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);

    if (name === "tour-id" && old !== value && value)
      this.dispatchMessage(["tour/select", { tourid: value }]);
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
          href="/destination/${this.tourid}/${i}">
          ${name}
        </itinerary-destination>
      `;
    };

    const renderRoute = (route: Segment[]) => {
      const count = route.length + 1;
      const origin = route[0].departure;
      const terminus = route[route.length - 1].arrival;
      const via =
        count > 2
          ? html`
              <span slot="via">
                ${route
              .slice(1, -1)
              .map((seg) => seg.departure.name)
              .join(", ")}
              </span>
            `
          : null;

      return html`
        <span slot="origin">${origin.name}</span>
        <span slot="terminus">${terminus.name}</span>
        ${via}
      `;
    };

    const renderTransportation = (tran: Transportation) => {
      const { startDate, type, segments } = tran || {};
      return html`
        <itinerary-transportation
          start-date=${startDate}
          type=${type}>
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
        ${i ? "" : renderTransportation(t0)}
        ${renderDestination(d, i)} ${renderTransportation(tn)}
      `;
    };

    console.log("Rendering Tour page", this.tour);

    return html`
      <main class="page">
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
      main.page {
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
        grid-template-columns: subgrid;
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;
      }

      entourage-table {
        grid-area: en;
      }
    `
  ];
}
