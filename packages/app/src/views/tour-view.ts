import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import {
  Destination,
  Tour,
  Transportation
} from "server/models";
import { CalendarWidget } from "../components/calendar-widget";
import { EntourageTable } from "../components/entourage-table";
import {
  ItineraryDestinationElement,
  ItineraryTransportationElement
} from "../components/itinerary-items";
import { Msg } from "../messages";
import { Model } from "../model";

define({
  "calendar-widget": CalendarWidget,
  "entourage-table": EntourageTable,
  "itinerary-destination": ItineraryDestinationElement,
  "itinerary-transportation": ItineraryTransportationElement
});

export class TourViewElement extends View<Model, Msg> {
  @property({ attribute: "tour-id", reflect: true })
  tourid = "";

  @property()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage([
        "tour/select",
        { tourid: newValue }
      ]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
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

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const formatDate = (date: Date | undefined) => {
      const dt = date || new Date();
      const m = months[dt.getUTCMonth()];
      const d = dt.getUTCDate();

      return `${d} ${m}`;
    };

    const renderDestination = (dest: Destination) => {
      const { startDate, endDate, link, name, featuredImage } =
        dest;
      return html`
        <itinerary-destination
          start-date=${startDate}
          end-date=${endDate}
          img-src=${featuredImage}
          href=${link}>
          ${name}
        </itinerary-destination>
      `;
    };

    const renderRoute = (route: string[]) => {
      const count = route.length;
      const origin = route[0];
      const terminus = route[count - 1];
      const via =
        count > 2
          ? html`
              <span slot="via">
                ${route.slice(1, -1).join(", ")}
              </span>
            `
          : null;

      return html`
        <span slot="origin">${origin}</span>
        <span slot="terminus">${terminus}</span>
        ${via}
      `;
    };

    const renderTransportation = (tran: Transportation) => {
      const { startDate, type, routing = [] } = tran || {};
      return html`
        <itinerary-transportation
          start-date=${startDate}
          type=${type}>
          ${renderRoute(routing)}
        </itinerary-transportation>
      `;
    };

    console.log("Rendering Tour page", this.tour);

    return html`
      <main class="page">
        <header>
          <h2>${name}</h2>
          <p>
            from ${formatDate(startDate)} to
            ${formatDate(endDate)}
            ${endDate && endDate.getFullYear()}
          </p>
        </header>

        <calendar-widget
          start-date=${startDate}
          end-date=${endDate}></calendar-widget>

        <section class="itinerary">
          ${destinations.map((d, i) => {
      const t0 =
        i === 0
          ? renderTransportation(transportation[i])
          : "";
      const dthis = renderDestination(d);
      const tnext = renderTransportation(
        transportation[i + 1]
      );

      return html`
              ${t0}${dthis}${tnext}
            `;
    })}
        </section>

        <entourage-table .using=${entourage}></entourage-table>
      </main>
    `;
  }

  static styles = [
    css`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "hd hd hd it it it it it"
          "ca ca ca it it it it it"
          "en en en it it it it it"
          "xx xx xx it it it it it";
      }

      header {
        grid-area: hd;
      }

      calendar-widget {
        grid-area: ca;
        align-self: start;
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
