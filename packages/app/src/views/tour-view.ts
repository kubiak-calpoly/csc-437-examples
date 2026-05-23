import { css, define, html, shadow } from "@unbndl/html";
import {  View, createView, createView2, createViewModel, fromAttributes } from "@unbndl/view";
import {
  Tour,
  Destination,
  Traveler,
  Transportation
} from "server/models";
import { CalendarWidget } from "../components/calendar-widget";

interface TourViewModel {
  tourId?: string;
  tour?: Tour;
  selectedDate?: Date;
}

interface TourViewAttributes {
  "tour-id": string;
}

export class TourViewElement extends HTMLElement {
  uses = define({
    "calendar-widget": CalendarWidget
  });

  viewModel = createViewModel<TourViewModel>()
    .withRenamed(fromAttributes<TourViewAttributes>(this), {
      tourId: "tour-id"
    });

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
          View.map2(
            this.pairView,
            $.tour?.transportation || [],
            $.tour?.destinations || []
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
  ): string {
    return `${startDate?.toString()}${endDate ? `to ${endDate.toString()}` : ""}`;
  }

  destinationView = createView<Destination>(html`
    <dt>
      ${($) =>
        TourViewElement.dateRange($.startDate, $.endDate)}
    </dt>
    <dd>
      <blz-destination
        start-date=${($) => $.startDate?.toString()}
        end-date=${($) => $.endDate?.toString()}>
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
        ${($) =>
          $.avatar
            ? html`
                <img src=${$.avatar} />
              `
            : ""}
        <h4>${($) => $.name}</h4>
      </a>
    </li>
  `);

  static styles = css``;

  constructor() {
    super();
    shadow(this)
      .styles(TourViewElement.styles)
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
        }
      });

    this.viewModel.createEffect(($) => {
      if ($.tourId) {
        // this.dispatch(["tour/request", { id: $.tourId }]);
      }
    });
  }
}
