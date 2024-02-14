import {
  css,
  html,
  LitElement,
  TemplateResult,
  unsafeCSS
} from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { consume } from "@lit/context";
import { Tour, Destination, Transportation } from "ts-models";
import { BlazingModel } from "../model";
import { TourSelected, modelContext } from "../app";
import "../components/calendar-widget";
import "../components/entourage-table";
import "../components/itinerary-item";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type TourLocation = Location & {
  params: { tour: string };
  searchParams: Map<string, string>;
};

@customElement("tour-page")
export class TourPageElement extends LitElement {
  @property({ attribute: false })
  location: Object | undefined;

  @consume({ context: modelContext, subscribe: true })
  @property({ attribute: false })
  model: BlazingModel | undefined;

  @state()
  tour: Tour | undefined;

  connectedCallback() {
    if (this.location) {
      // running under the router
      const tourId = (this.location as TourLocation).params
        .tour;
      console.log("TOur Page:", tourId);
      const msg: TourSelected = {
        type: "TourSelected",
        tourId: tourId
      };
      const ev = new CustomEvent("mvu:message", {
        bubbles: true,
        composed: true,
        detail: msg
      });
      this.dispatchEvent(ev);
      // this._getData(`/tours/${this.tourId}`);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    console.log("attributeChanged:", name, newValue);
    if (
      name === "tour-id" &&
      newValue &&
      newValue !== oldValue
    ) {
      // this._getData(`/tours/${newValue}`);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  updated(changedProperties: Map<string, any>) {
    console.log("updated Tour Page", changedProperties);
    if (changedProperties.has("model")) {
      this.tour = this.model?.tour;
    }
    return true;
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
          ? html`<span slot="via"
              >${route.slice(1, -1).join(", ")}</span
            >`
          : null;

      return html`
        <span slot="origin"> ${origin} </span>
        <span slot="terminus"> ${terminus} </span>
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
          end-date=${endDate}>
        </calendar-widget>

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

            return html`${t0}${dthis}${tnext}`;
          })}
        </section>

        <entourage-table path="/entourages/${entourage}">
        </entourage-table>
      </main>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css`
      main.page {
        display: grid;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        gap: var(--size-spacing-xlarge);

        grid-template-columns: min-content 1fr;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "header     itinerary"
          "calendar  itinerary"
          "entourage itinerary"
          "empty     itinerary";
      }

      header {
        grid-area: header;
      }

      calendar-widget {
        grid-area: calendar;
        align-self: start;
      }

      .itinerary {
        display: grid;
        grid-area: itinerary;
        align-self: start;
        grid-template-columns:
          [start] min-content [primary] 1fr var(
            --size-icon-large
          )
          1fr [end];
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;
      }
    `
  ];
}
