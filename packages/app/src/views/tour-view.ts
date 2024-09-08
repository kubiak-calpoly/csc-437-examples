import { Auth, define, Observer } from "@calpoly/mustang";
import { css, html, LitElement, TemplateResult } from "lit";
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
import {
  convertStartEndDates,
  formatDate
} from "../utils/dates";

export class TourViewElement extends LitElement {
  static uses = define({
    "entourage-table": EntourageTable,
    "itinerary-destination": ItineraryDestinationElement,
    "itinerary-transportation": ItineraryTransportationElement
  });

  @property({ attribute: "tour-id", reflect: true })
  tourid = "";

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
    const src = `/api/tours/${this.tourid}`;

    fetch(src, {
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
          this.tour = tour;
        }
      })
      .catch((err) =>
        console.log("Failed to convert tour data:", err)
      );
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
