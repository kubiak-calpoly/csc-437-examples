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
import { Tour, Destination, Transportation } from "ts-models";
import { APIRequest } from "../rest";
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

  @property({ attribute: "tour-id" })
  tourId?: string;

  @state()
  tour?: Tour;

  connectedCallback() {
    if (!this.tourId && this.location) {
      // running under the router
      this.tourId = (this.location as TourLocation).params.tour;
    }
    if (this.tourId) {
      this._getData(`/tours/${this.tourId}`);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "tour-id" &&
      newValue &&
      newValue !== oldValue
    ) {
      this._getData(`/tours/${newValue}`);
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

  _getData(path: string) {
    const request = new APIRequest();

    request
      .get(path)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        if (json) {
          console.log("Tour:", json);
          // fix all the dates, sigh
          let dates = json as {
            startDate: string;
            endDate: string;
          };
          let tour = json as Tour;
          tour.startDate = new Date(dates.startDate);
          tour.endDate = new Date(dates.endDate);
          this.tour = json as Tour;
        }
      });
  }
}
