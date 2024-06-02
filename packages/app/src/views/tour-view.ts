import { define, View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
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

export class TourViewElement extends View<Model, Msg> {
  static uses = define({
    "calendar-widget": CalendarWidget,
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

  @state()
  selectedDate: Date | undefined;

  constructor() {
    super("blazing:model");

    this.addEventListener("calendar-widget:select", (event) => {
      const { detail } = event as CustomEvent;
      const { date } = detail as { date: Date };
      this.selectedDate = date;
    });

    this.addEventListener("calendar-widget:clear", () => {
      this.selectedDate = undefined;
    });
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
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
          href="./${this.tourid}/destination/${i}">
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

    const renderDates = () => {
      if (this.selectedDate) {
        return html`
          <p>
            ${formatDate(this.selectedDate)}
            ${this.selectedDate.getFullYear()}
          </p>
        `;
      } else {
        return html`
          <p>
            from ${formatDate(startDate)} to
            ${formatDate(endDate)}
            ${endDate && endDate.getFullYear()}
          </p>
        `;
      }
    };

    const renderDestAndTrans = (d: Destination, i: number) => {
      const dt = this.selectedDate;
      const dFilter =
        dt && (d.startDate > dt || d.endDate < dt);

      if (dFilter) return "";

      const t0 = transportation[i];
      const tn = transportation[i + 1];
      const t0Filter =
        dt &&
        (t0.endDate || t0.startDate).valueOf() !== dt.valueOf();
      const tnFilter =
        dt && tn.startDate.valueOf() !== dt.valueOf();

      return html`
        ${i || t0Filter ? "" : renderTransportation(t0)}
        ${renderDestination(d, i)}
        ${tnFilter ? "" : renderTransportation(tn)}
      `;
    };

    console.log("Rendering Tour page", this.tour);

    return html`
      <main class="page">
        <header>
          <h2>${name}</h2>
          ${renderDates()}
        </header>

        <calendar-widget
          start-date=${startDate}
          end-date=${endDate}></calendar-widget>

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
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "hd hd hd it it it it it"
          "ca ca ca it it it it it"
          "en en en it it it it it"
          "xx xx xx it it it it it";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
      }

      header {
        grid-area: hd;
      }

      calendar-widget {
        grid-area: ca;
        align-self: start;
        border: 1px solid var(--color-accent);
        padding: 1rem 0;
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
