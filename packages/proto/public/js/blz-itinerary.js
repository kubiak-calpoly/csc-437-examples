import { css, html, shadow } from "@unbndl/html";
import { View, createView, createViewModel, fromAttributes } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import { formatDate } from "./dateUtils.js";

export class BlzItineraryElement extends HTMLElement {
  viewModel = createViewModel({
    authenticated: false,
    destinations: []
  }).with(fromAttributes(this), "src")
  .with(fromAuth(this), "authenticated", "token");

  view = createView(html`
    <dl>
      ${$ => View.map(this.destinationView, $.destinations)}
    </dl>
  `)

  destinationView = html`
    <dt>${($) => formatDate($.startDate)} to 
      ${($) => formatDate($.endDate)}</dt>
    <dd>
      <blz-destination
          start-date=${($) => $.startDate}
          end-date=${$=>$.endDate}
          img-src=${$=>$.featuredImage}
          href=${$=>$.link}
      >
        ${$=>$.name}
      </blz-destination>
    </dd>
  `;

  constructor() {
    super();
    shadow(this)
      .styles(BlzItineraryElement.styles)
      .replace(this.viewModel.render(this.view))

    this.viewModel.createEffect(($) => {
      console.log("Effect $.authenticated=", $.authenticated);
      if ($.authenticated && $.src) {
        this.hydrate($.src).then((data) => {
          console.log("Data:", data);
          this.viewModel.set("destinations", data.destinations);
        });
      }
    })
  }

  get authorization() {
    const $ = this.viewModel.toObject();
    if ($.authenticated)
       return { Authorization: `Bearer ${$.token}` };
     else return {};
  }

  hydrate(src) {
    return fetch(src, {
      headers: this.authorization
    })
      .then((response) => {
        if (response.status !== 200)
          throw `HTTP Status ${response.status}`;
        else return response.json();
      })
      .catch((error) => {
        console.log("Could not fetch:", error);
      });
  }

  static styles = css``;
}

