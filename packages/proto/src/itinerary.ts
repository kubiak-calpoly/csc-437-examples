import { html, css, LitElement, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import {Auth, define, Observer} from "@calpoly/mustang";
import {
  Destination,
  Segment,
  Transportation
} from "./models/itinerary.ts";
import { TransportationElement,
  SegmentElement,
  EndPointElement
} from "./transportation.ts";
import { DestinationElement } from "./destination.ts";
import reset from "./styles/reset.css.ts";
import headings from "./styles/headings.css.ts";

interface ItineraryItem {
  startDate: Date;
  endDate?: Date;
  html: TemplateResult;
}

export class ItineraryElement extends LitElement {
  static uses = define({
    "blz-destination": DestinationElement,
    "blz-transportation": TransportationElement,
    "transportation-segment": SegmentElement,
    "end-point": EndPointElement
  })

  @property()
  src?: string;

  @state()
  destinations: Array<Destination> = [];

  @state()
  transportations: Array<Transportation> = [];

  override render() {
    console.log("Destinations", this.destinations);

    const destCount = this.destinations.length;
    const dItems: Array<ItineraryItem> =
      this.destinations.map(
        (dest) => {
          return {
            startDate: dest.startDate,
              endDate: dest.endDate,
            html: html`
            <blz-destination
              img-src=${dest.featuredImage}
              href=${dest.link}
              nights=${nightsFromTo(
                dest.startDate,
                dest.endDate)}
            >
              ${dest.name}
            </blz-destination>`
          }
        });

    const tItems: Array<ItineraryItem> =
      this.transportations.map(
        (trans: Transportation) => {
          const segCount = trans.segments.length;
          const fromHtml = html`
            <span slot="from">
              ${trans.routing ? trans.routing[0] : trans.segments[0].departure.name }
            </span>
          `;
          const toHtml = html`
            <span slot="to">
              ${trans.routing ? trans.routing[segCount] : trans.segments[segCount-1].arrival.name}
            </span>
          `;
          const viaHtml = segCount > 1 && trans.routing ?
            html`
              <span slot="via">${trans.routing[1]}</span>
            ` : "";
          const segmentHtml =
            trans.segments.map(
              (seg: Segment) => html`
                <transportation-segment>
                  <span slot="carrier">${seg.carrier}</span>
                  <span slot="number">${seg.number}</span>
                  <end-point 
                    slot="departure"
                    localtime=${seg.departure.localtime}
                    tz=${seg.departure.tz}
                    code=${seg.departure.code}
                  >
                    ${seg.departure.name}
                  </end-point>
                  <end-point 
                    slot="arrival" 
                    localtime=${seg.arrival.localtime} 
                    tz=${seg.arrival.tz}
                    code=${seg.arrival.code}
                  >
                    ${seg.arrival.name}
                  </end-point>
                </transportation-segment>
                `);

          return {
            startDate: trans.startDate,
            endDate: trans.endDate,
            html: html`
            <blz-transportation mode=${trans.mode}>
              ${fromHtml} ${toHtml} ${viaHtml}
              ${segmentHtml}
            </blz-transportation>
          `
          }
        }
      )

    const items = tItems.flatMap(
      (item, index) =>
        index < destCount ?
          [item, dItems[index]] :
          [item]
    );

    const dateRange = (item: ItineraryItem) => {
      const start = html`                
        <time datetime=${item.startDate}>
          ${formatDate(item.startDate)}
        </time>`;
      if ( !item.endDate ) return start;
      const end = html`
        <time datetime=${item.endDate}>
          ${formatDate(item.endDate)}
        </time>`;
      return html`${start}${end}`;
    }

    return html`
      <section>
        <h2>Itinerary</h2>
        <dl>
          ${items.map(
            (item) => html`
              <dt>${dateRange(item)}</dt>
              <dd>${item.html}</dd>
            `
          )}
        </dl>
      </section>
    `;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
    :host {
      display: contents;
    }
    section {
      display: grid;
      grid-area: var(--grid-area);
      grid-template-columns: subgrid [start] [header] [] [] [highlights] [] [end];
      gap: var(--size-spacing-medium);
      align-items: baseline;
      margin: var(--size-spacing-small);

      > dl {
        display: contents;
        > dt {
          grid-column: start;
          text-align: right;
          font-family: var(--font-family-display);
          font-weight: var(--font-weight-bold);
        }
        > dd {
          display: grid;
          grid-template-columns: subgrid;
          grid-column: header / end;
        }
      }
      
      time + time::before {
        content: "–";
      }
    }
  `];

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user?: Auth.User;

  get authorization() {
    return this._user ? Auth.headers(this._user) : {};
  }

  override connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src) this.hydrate(this.src);
    });
  }

  hydrate(src: string) {
    fetch(src,
      { headers: this.authorization }
    )
    .then(res => res.json())
    .then((json: object) => {
      if(json) {
        const itinerary = json as {
          destinations: Array<object>,
          transportation: Array<object>
        }
        this.destinations =
          itinerary.destinations.map(convertDates<Destination>);
        this.transportations =
          itinerary.transportation.map(convertDates<Transportation>);
      }
    })
  }
}

function nightsFromTo(start: Date, end: Date): Number {
  const millis = end.getTime() - start.getTime();
  return Math.ceil(millis / 1000 / 3600 / 24);
}

function convertDates<T extends {startDate: Date; endDate?: Date}>(item: object): T {
  const datedItem = item as {startDate?: string; endDate?: string};
  const startDate = datedItem.startDate ? new Date(datedItem.startDate) : undefined;
  const endDate = datedItem.endDate ? new Date(datedItem.endDate) : undefined;
  return { ...item, startDate, endDate} as T;
}

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

function formatDate(dt: Date) {
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();

  return `${d} ${m}`;
}
