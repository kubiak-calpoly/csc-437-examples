import { css, html, shadow } from "@unbndl/html";

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

  static styles = css`
    :host {
      --img-src: none;
    }
    section {
      aspect-ratio: 16/9;
      background-image: var(--img-src);
      background-size: cover;
    }
  `;

  constructor() {
    super();

    shadow(this)
      .template(BlzDestinationElement.template)
      .styles(BlzDestinationElement.styles);
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
}

function nightsBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor(
    (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
  );
}
