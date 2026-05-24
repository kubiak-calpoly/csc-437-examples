import { css, html, shadow } from "@unbndl/html";
import { createView, createViewModel, fromAttributes } from "@unbndl/view";
import reset from "../styles/reset.css.js";
import { nightsBetween } from "../utils/dates.js";

interface BlzDestinationModel {
  startDate?: string;
  endDate?: string;
  featuredImage?: string;
  link?: string;
}

type BlzDestinationAttrs = {
  "start-date"?: string;
  "end-date"?: string;
  "img-src"?: string;
  "href"?: string
}

export class BlzDestinationElement extends HTMLElement {
  viewModel = createViewModel<BlzDestinationModel>()
    .withRenamed(fromAttributes<BlzDestinationAttrs>(this), {
      startDate: "start-date",
      endDate: "end-date",
      featuredImage: "img-src",
      link: "href"
    })


  view = createView<BlzDestinationModel>(html`
    <section
      style=${($) => `--img-src: url(${$.featuredImage})`}
    >
      <header>
        <h2>
          <a href=${($) => $.link || "#"}>
            <slot>Unnamed Destination</slot>
          </a>
        </h2>
        <p>${($) => ($.startDate && $.endDate) ?
          nightsBetween(
            new Date($.startDate),
            new Date($.endDate)
            ) : 1
          } nights
        </p>
      </header>
      <slot name="highlights"></slot>
    </section>
  `);

  constructor() {
    super();

    shadow(this)
      .styles(reset.styles, BlzDestinationElement.styles)
      .replace(this.viewModel.render(this.view));
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
