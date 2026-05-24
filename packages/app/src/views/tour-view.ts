import { css, define, html, shadow } from "@unbndl/html";
import {  View, createView, createView2, createViewModel, fromAttributes } from "@unbndl/view";
import { Store, fromStore } from "@unbndl/store";
import { Msg } from "../messages.ts";
import { Model } from "../model.ts";
import reset from "../styles/reset.css.ts";
import {
  Tour,
  Destination,
  Traveler,
  Transportation
} from "server/models";
import { formatDate } from "../utils/dates.ts";
import { CalendarWidget } from "../components/calendar-widget";
import { BlzDestinationElement } from "../components/blz-destination.ts";

interface TourViewModel {
  tourId?: string;
  tour?: Tour;
  selectedDate?: Date;
}

interface TourViewAttributes {
  "tour-id": string;
}

export class TourViewElement extends HTMLElement {
  static {
    define({
      "calendar-widget": CalendarWidget,
      "blz-destination": BlzDestinationElement
    });
  }

  viewModel = createViewModel<TourViewModel>()
    .withRenamed(fromAttributes<TourViewAttributes>(this), {
      tourId: "tour-id"
    })
    .with(fromStore<Model>(this), "tour");

  view = createView<TourViewModel>(html`
    <section class="calendar">
      <h3>Calendar</h3>
      <calendar-widget
        start-date=${($) => $.tour?.startDate?.toString() || ""}
        end-date=${($) =>
          $.tour?.endDate?.toString() || ""}></calendar-widget>
    </section>
    <section class="itinerary">
      <h3>Itinerary</h3>
      <dl>
        ${($) =>
          View.map(
            this.destinationView,
            $.tour?.destinations.map(
              (d, i) => ({
                ...d,
                link: `/app/tour/${$.tourId}/destination/${i}`
              })
            ) || []
          )}
      </dl>
    </section>
    <section class="entourage">
      <h3>Entourage</h3>
      <ul>
        ${($) =>
          View.map(this.travelerView,
            $.tour?.entourage?.people || []
    )}
      </ul>
    </section>
  `);

  pairView = createView2<Transportation, Destination>(html`
    ${($t, _) => View.apply(this.transportationView, $t)}
    ${(_, $d) =>
      $d ? View.apply(this.destinationView, $d) : ""}
  `);

  static dateRange(
    startDate: Date,
    endDate: Date | undefined
  ) {
    const start = html`<span>${formatDate(startDate)}</span>`;
    if (!endDate) return start;
    return html`${start}<span>&nbsp;to&nbsp;</span>
        <span>${formatDate(endDate)}</span>`;
  }

  destinationView = createView<Destination>(html`
    <dt>
      ${($) =>
        TourViewElement.dateRange($.startDate, $.endDate)}
    </dt>
    <dd>
      <blz-destination
        start-date=${($) => $.startDate?.toString()}
        end-date=${($) => $.endDate?.toString()}
        href=${$ => $.link || "#"}>
        ${($) => $.name}
      </blz-destination>
    </dd>
  `);

  transportationView = createView<Transportation>(html`
    <dt></dt>
    <dt>
      ${($) =>
        TourViewElement.dateRange($.startDate, $.endDate)}
    </dt>
    <dd>[Transportation Details]</dd>
  `);

  travelerView = createView<Traveler>(html`
    <li>
      <a href=${($) => `/app/profile/${$.userid}`}>
        <h4>${($) => $.name}</h4>
        ${($) => $.avatar ? html`
          <img class="avatar" src=${$.avatar} />`: ""
        }
      </a>
    </li>
  `);

  static styles = css`
    :host {
      display: grid;
      grid-column: 1/-1;
      grid-template-columns: subgrid;
    }

    .calendar {
      grid-column: auto / span 3;
    }

    .itinerary {
      display: grid;
      grid-column: span 5 / -1;
      grid-row: 1 / span 4;
      grid-template-columns: subgrid;
      h3 {
        grid-column: 1/-1;
      }
      dl, dd {
        display: contents;
      }
      dt > span {
        white-space: nowrap;
      }
      blz-destination {
        grid-column: 2/-1;
      }
    }

    .entourage {
      grid-column: auto / span 3;
      h4 {
        line-height: 4rem;
      }
      li > a {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .avatar {
      aspect-ratio: 1;
      height: 4rem;
    }
    `;

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles, TourViewElement.styles)
      .replace(this.viewModel.render(this.view))
      .listen({
        "calendar-widget/change": (ev: CustomEvent) => {
          const { dateString } = ev.detail as {
            dateString: string;
          };
          this.viewModel.set(
            "selectedDate",
            new Date(dateString)
          );
        },
        "calendar-widget/clear": (ev: CustomEvent) => {
          this.viewModel.set("selectedDate",undefined);
        }
      });

    this.viewModel.createEffect(($) => {
      if ($.tourId) {
        this.dispatch(["tour/request", { id: $.tourId }]);
      }
    });
  }

  dispatch(msg: Msg) {
    Store.dispatch(this, msg);
  }
}
