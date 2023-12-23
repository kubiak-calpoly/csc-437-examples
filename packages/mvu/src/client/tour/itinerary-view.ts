import { html, LitElement } from "lit";
import {
  customElement,
  state,
  property
} from "lit/decorators.js";
import { consume } from "@lit/context";
import type { Tour } from "../../models/Tour";

import { tourContext } from "./tour-context";

@customElement("itinerary-view")
export class ItineraryView extends LitElement {
  @consume({ context: tourContext, subscribe: true })
  @state()
  tour: Tour = {
    name: "Unnamed Tour"
  } as Tour;

  render() {
    const { name } = this.tour;

    console.log("Rendering itinerary-view for tour", this.tour);
    console.log("Name:", name);

    return html`<h1>Itinerary ${name}</h1>`;
  }
}
