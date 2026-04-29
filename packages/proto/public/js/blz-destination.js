import { css, html, shadow } from "@unbndl/html";
import reset from "./reset.css.js";

export class BlzDestinationElement extends HTMLElement {
  static template = html`
    <template>
    <section>
      <header>
        <h2>
          <a>
            <slot>Unnamed Destination</slot>
          </a>
        </h2>
        <p><span id="nights">?</span> nights</p>
      </header>
      <slot name="highlights"></slot>
    </section>
    </template>
  `;



  constructor() {
    super();

    shadow(this)
      .template(BlzDestinationElement.template)
      .styles(reset.styles,
        BlzDestinationElement.styles
      );
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
        this._updateHref(newValue);
        break;
      case "img-src":
        this._updateImgSrc(newValue);
        break;
      case "start-date":
      case "end-date":
        this._updateNights();
        break;
    }
  }

  _updateHref(href) {
    const a = this.shadowRoot.querySelector("a");
    a.setAttribute("href", href);
  }

  _updateImgSrc(imgSrc) {
    this.style.setProperty("--img-src", `url(${imgSrc})`);
  }

  _updateNights() {
    const span = this.shadowRoot.getElementById("nights");
    const nights = nightsBetween(
      this.getAttribute("start-date"),
      this.getAttribute("end-date")
    )
    span.textContent = nights === undefined ? "" : nights.toString()
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
