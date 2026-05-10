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
    <section
      style=${($) => `--img-src: url(${$.featuredImage})`}
    >
      <header>
        <h2>
          <a href=${($) => $.link}>
            <slot>Unnamed Destination</slot>
          </a>
        </h2>
        <p>${($) => nightsBetween($.startDate, $.endDate)} nights</p>
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
    switch (name) {
      case "href":
        this.viewModel.set("link", newValue);
        break;
      case "img-src":
        this.viewModel.set("featuredImage", newValue);
        break;
      case "start-date":
        this.viewModel.set("startDate", newValue);
        break;
      case "end-date":
        this.viewModel.set("endDate", newValue);
        break;
    }
  }

  static styles = css`
    :host {
      --img-src: none;
      --color-text: var(--color-text-inverted);
      --color-link: var(--color-link-inverted);
    }
    section {
      padding: var(--size-spacing-medium);
      aspect-ratio: 16/9;
      background-image: var(--img-src);
      background-size: cover;
      color: var(--color-text);
      text-shadow: var(--shadow-light);
    }
    header {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-style: italic;
      text-align: right;
    }
    h2 {
     font-size: var(--size-type-xlarge);
    }
    a[href] {
      color: var(--color-link);
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
