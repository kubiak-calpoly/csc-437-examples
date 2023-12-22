import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { provide } from "@lit/context";
import type {
  Tour,
  Destination,
  Transportation,
  Traveler
} from "../../models/Tour";

import { tourContext } from "./tour-context.js";

export class TourProvider extends LitElement {
  @provide({ context: tourContext })
  @property({ attribute: false })
  tour: Tour | undefined;

  @property()
  tourId = "";

  connectedCallback() {
    fetch(`/api/tours/${this.tourId}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((json) => (this.tour = json as Tour));
        }
      })
      .catch((err) => console.log("Error when reading tour"));
  }
}
