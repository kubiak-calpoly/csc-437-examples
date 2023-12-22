import { html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { provide } from "@lit/context";
import type {
  Tour,
  Destination,
  Transportation,
  Traveler
} from "../../models/Tour";

import { tourContext } from "./tour-context.js";

@customElement("tour-provider")
export class TourProvider extends LitElement {
  @property({ attribute: "for" })
  tourId: string = "";

  @provide({ context: tourContext })
  @state()
  tour: Tour = {
    name: "Original Tour"
  } as Tour;

  connectedCallback() {
    console.log("Tour ID:", this.tourId);

    fetch(`/api/tours/${this.tourId}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((json) => {
            this.tour = json as Tour;
            console.log("Assigning new tour data", json);
          });
        }
      })
      .catch((err) =>
        console.log("Error when reading tour", err)
      );
  }
}
