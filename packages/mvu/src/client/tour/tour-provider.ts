import { LitElement } from "lit";
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
  @provide({ context: tourContext })
  @state()
  tour: Tour = {
    name: "Original Tour"
  } as Tour;

  connectedCallback() {
    const tourId = this.getAttribute("for");
    console.log("Tour ID:", tourId);

    fetch(`/api/tours/${tourId}`)
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
