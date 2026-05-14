import { css, define, html, shadow } from "@unbndl/html";
import { View, createView, createViewModel, fromAttributes } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import { formatDate, nightsBetween} from "./dateUtils.js";
import reset from "./reset.css.js";
import { BlzAccommodationElement} from "./blz-accommodation.js";


export class DestinationViewElement extends HTMLElement {
  static {
    define({
      "blz-accommodation": BlzAccommodationElement
    })
  }

  viewModel = createViewModel({
    authenticated: false,
    mode: "view",
    destination: {
      name: "Somewhere",
      startDate: new Date(),
      endDate: new Date(),
      // featuredImage: undefined,
      location: { lat: 0, lng: 0 },
      accommodations: [],
      excursions: [],
      // link: undefined
    }
  }).with(fromAttributes(this), "src", "mode")
    .with(fromAuth(this), "authenticated", "token");

  view = html`
    <section>
      ${($) => View.apply(
        $.mode === "view" ? this.mainView : this.editView, 
        $.destination
      )}
    </section>
  `;

  mainView = html`
      <header>
        <h2>${($) => $.name}</h2>
        <p>${($) => nightsBetween(
          $.startDate, 
          $.endDate)} nights</p>
        <nav>
          <button id="edit-mode">Edit</button>
        </nav>
      </header>
      <img alt="" src=${($) => 
        $.featuredImage || ""} />
      ${($) => View.map(this.viewAccommodation, $.accommodations)}
      <ul class="excursions">
        ${($) => View.map(this.viewExcursion, $.excursions)}
      </ul>
  `;

  editView = html`
    <form>
      <header>
        <h2><input name="name"/></h2>
      </header>
      <dl>
        <dt>From date</dt>
        <dd><input name="startDate" type="date"</dd>
        <dt>To date</dt>
        <dd><input name="endDate" type="date"></dd>
        <dt>Image</dt>
        <dd>
          <input type="file" />
        </dd>
      </dl>
      <img alt="" src=${($) => $.featuredImage || ""} />
    </form>
  `;

  viewAccommodation = html`
    <blz-accommodation>
      <span slot="name">${($) => $.name}</span>
      <time slot="check-in" 
        datetime=${($) => $.checkIn}>
        ${($) => formatDate($.checkIn)}
      </time>
      <time slot="check-out" 
        datetime=${($) => $.checkOut}>
        ${($) => formatDate($.checkOut)}
      </time>
      <span slot="room-type">${($) => $.roomType}</span>
      <span slot="persons">${($) => $.persons}</span>
      <span slot="room-rate">${($) => $.rate.amount}</span>
      <span slot="currency">${($) => $.rate.currency}</span>
    </blz-accommodation>
  `;

  viewExcursion = html`
    <li>
      <svg class="icon">
        <use xlink:href=${($) =>
          `/icons/destination.svg#icon-${$.type}`} />
      </svg>
      <span>${($) => $.name}</span>
    </li>
  `;

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles,
        DestinationViewElement.styles)
      .replace(this.viewModel.render(this.view))
      .delegate("#edit-mode", {
        click: () => this.viewModel.set("mode", "edit")
      });

    this.viewModel.createEffect(($) => {
      if ($.authenticated && $.src) {
        this.hydrate($.src).then((data) => {
          this.viewModel.set("destination", data);
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

  static styles = css`
    :host { display: contents; }
    section { display: contents; }
    header {
      grid-area: hdr;
      background: none;
      color: var(--color-text);
      height: min-content;
  
      a[href] {
        color: currentColor;
      }
    }
    img { grid-area: img; }
    blz-accommodation { grid-area: acc; }
    ul.excursions {
      display: grid;
      grid-area: exc;
      grid-template-columns: subgrid;
      list-style: none;
      padding: 0;
      gap: var(--size-spacing-large);
      font-family: var(--font-family-display);
      font-size: var(--size-type-mlarge);
      line-height: var(--font-line-height-display);
    
      svg.icon {
        --size-icon: var(--size-icon-large);
        color: var(--color-accent);
      }
    
      > li {
        display: flex;
        align-items: center;
        grid-column: auto / span 2;
        background-color: var(--color-background-card);
        padding: var(--size-spacing-medium);
        gap: var(--size-spacing-medium);
      }
    }`;
}

