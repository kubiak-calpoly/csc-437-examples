import { css, html, shadow } from "@unbndl/html";

export class BlzItineraryElement extends HTMLElement {
  constructor() {
    super();
    shadow(this)
      .styles(BlzItineraryElement.styles)
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, _, newValue) {
    if (name === "src") {
      // TODO: hydrate and then render
    }
  }

  static render(data) {
    const destinations = data?.destinations || [];
    return html`
      <dl>
        ${destinations.map(renderDestination)}
      </dl>
    `;
  }


  hydrate(src) {
    // TODO: fetch json and return promise of data
  }

  static styles = css``;
}


function renderDestination(dest) {
  const { name, link, startDate, endDate, featuredImage }
    = dest;

  return html`
    <dt>${startDate} to ${endDate}</dt>
    <dd>
        <blz-destination
            href=${link}
            start-date=${startDate}
            end-date=${endDate}
            img-src=${featuredImage}
        >
            ${name}
        </blz-destination>
    </dd>
  `;
}
