import { css, html, TemplateResult, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Tour, Destination, Transportation } from "ts-models";
import * as App from "../app";
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
export class TourPageElement extends App.View {
  @property({ attribute: false })
  location?: TourLocation;

  @property({ attribute: "tour-id", reflect: true })
  get tourId() {
    return this.location?.params.tour;
  }

  @property()
  get tour() {
    return this.getFromModel<Tour>("tour");
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
      this.dispatchMessage({
        type: "TourSelected",
        tourId: newValue
      });
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

        <entourage-table .using=${entourage}> </entourage-table>
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
