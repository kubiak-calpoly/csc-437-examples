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
      this.hydrate(newValue).then((data) => {
        console.log("Received JSON:", data);
        const view = BlzItineraryElement.render(data)
        shadow(this).replace(view);
      });
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
    return fetch(src)
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
