import { css, html, shadow } from "@unbndl/html";

export class BlzItineraryElement extends HTMLElement {
  constructor() {
    super();
    shadow(this)
      .styles(BlzItineraryElement.styles)

    this.addEventListener("click", (event) => {
      console.log("Click bubbled", event);
      const button = event.originalTarget;
      const id = button.id;
      switch (id) {
        case "extend-stay":
          const itinerary = this.viewModel.get("itinerary");
          const destinations = itinerary.destinations;
          const rome = destinations[2];
          let endDate = new Date(rome.endDate);
          endDate.setTime(
            endDate.getTime() + 24 * 60 * 60 * 1000
          );
          console.log("new end date:", endDate);
          const newItinerary = {
            ...itinerary,
            destinations: destinations.toSpliced(2, 1, {
              ...rome,
              endDate: endDate.toISOString().substr(0, 10)
            })
          };
          console.log("Setting itinerary:", newItinerary);
          this.viewModel.set("itinerary", newItinerary);
          return;
      }
    });
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
