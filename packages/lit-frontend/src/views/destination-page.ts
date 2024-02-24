import { css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Tour, Destination } from "ts-models";
import { formatDate } from "../utils/dates";
import * as App from "../app";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type DestLocation = Location & {
  params: { tour: string; dest: string };
};

@customElement("destination-page")
export class DestinationPageElement extends App.View {
  @property({ attribute: false })
  location?: DestLocation;

  @property({ attribute: "tour-id", reflect: true })
  get tourId() {
    return this.location?.params.tour;
  }

  @property({ attribute: "dest-id", reflect: true })
  get destId() {
    return parseInt(this.location?.params.dest || "0");
  }

  @property()
  get tour() {
    return this.getFromModel<Tour>("tour");
  }

  @property()
  get destination() {
    const tour = this.tour;
    const destinations = tour?.destinations || [];
    console.log(
      `Looking for destination ${this.destId} in`,
      destinations
    );
    return destinations[this.destId] || {};
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage({
        type: "TourSelected",
        tourId: newValue
      });
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    const { name, link, startDate, endDate, featuredImage } =
      this.destination as Destination;
    const tourName = this.tour?.name;

    console.log("Destination:", this.destination);

    return html`
      <main class="page">
        <header>
          <a class="breadcrumb" href="/app/${this.tourId}">
            ${tourName}
          </a>
          <h2>${name}</h2>
          <p>
            from ${formatDate(startDate)} to
            ${formatDate(endDate)}
            ${endDate && endDate.getFullYear()}
          </p>
        </header>
        <a href=${link}>
          <img src=${featuredImage} />
        </a>
      </main>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css``
  ];
}
