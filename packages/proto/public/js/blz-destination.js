import { css, html, shadow } from "@unbndl/html";
import { createViewModel } from "@unbndl/view";

import reset from "./reset.css.js";

export class BlzDestinationElement extends HTMLElement {
  viewModel = createViewModel({
    startDate: "2000-01-01",
    endDate: "2000-01-01",
    featuredImage: "none",
    link: "#"
  });

  view = html`
    <section>
      <header>
        <h2>
          <a href=${($) => $.link}>
            <slot>Unnamed Destination</slot>
          </a>
        </h2>
        <p>${($) => {
          console.log("$=", $);
          return nightsBetween($.startDate, $.endDate)
        }} nights</p>
      </header>
      <slot name="highlights"></slot>
    </section>
  `;

  constructor() {
    super();

    shadow(this)
      .styles(reset.styles, BlzDestinationElement.styles)
      .replace(this.viewModel.render(this.view));
  }

  static observedAttributes = [
    "img-src",
    "href",
    "start-date",
    "end-date"
  ];

  attributeChangedCallback(name, _, newValue) {
    console.log("AttributeChangedCallback", name, newValue);
    switch (name) {
      case "href":
        this.viewModel.set("link", newValue);
        break;
      case "img-src":
        this.viewModel.set("featuredImage", newValue);
        break;
      case "start-date":
        this.viewModel.$["startDate"] = newValue;
        break;
      case "end-date":
        this.viewModel.set("endDate", newValue);
        break;
    }
  }

  static styles = css`
    :host {
      --img-src: none;
    }
    section {
      padding: var(--size-spacing-medium);
      aspect-ratio: 16/9;
      background-image: var(--img-src);
      background-size: cover;
      color: var(--color-text-inverted);
      text-shadow: var(--shadow-light);
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
    }
    h2 {
     font-size: var(--size-type-xlarge);
      font-weight: var(--font-weight-bold);
    }
    a[href] {
      color: inherit;
    }
  `;
}

function nightsBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor(
    (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
  );
}
