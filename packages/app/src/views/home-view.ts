import {
  html,
  shadow
} from "@unbndl/html";
import {
  View,
  createView,
  createViewModel,
  fromAttributes,
} from "@unbndl/view";
import { Store, fromStore } from "@unbndl/store";
import { TourBrief } from "server/models";
import { Msg } from "../messages.ts";
import { Model, TourIndex } from "../model.ts";

type HomeViewAttributes = { "user-id"?: string };

interface HomeViewModel {
  userid: string | undefined;
  tourIndex?: TourIndex;
}

export class HomeViewElement extends HTMLElement {
  viewModel = createViewModel<HomeViewModel>({
    userid: "guest"
  })
    .withRenamed(fromAttributes<HomeViewAttributes>(this), {
      userid: "user-id"
    })
    .with(fromStore<Model>(this), "tourIndex");


  view = createView<HomeViewModel>(html`
    <dl>
      ${($) =>
        View.map(this.viewTour, $.tourIndex?.tours || [])}
    </dl>
  `);

  viewTour = createView<TourBrief>(
    html`
      <dt>
        <a href=${($) => `/app/tour/${$.id}`}>${($) => $.name}</a>
      </dt>
      <dd>${($) => $.startDate.toString()} to ${($) => $.endDate.toString()}</dd>
      <dd>
        <ul>
          ${($) =>
            View.map<{ userid: string }>(
              this.travelerView,
              $.entourage.people
            )}
        </ul>
      </dd>
    </li>`
  );

  travelerView = createView<{ userid: string }>(html`
    <li>
      <a href=${($) => `/app/profile/${$.userid}`}>
        ${($) => $.userid}
      </a>
    </li>
  `);

  dispatch(msg: Msg) {
    Store.dispatch(this, msg);
  }
  constructor() {
    super();
    shadow(this)
      .replace(this.viewModel.render(this.view));

    this.viewModel.createEffect(($) => {
      if ($.userid) {
        this.dispatch(
          ["tourIndex/request", { userid: $.userid }]);
      }
    });
  }
}
