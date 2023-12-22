import { html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";

@customElement("tour-page")
export class TourPage extends LitElement {
  @property({ attribute: "tour-id" })
  tourId: string = "";

  render() {
    return html`
      <tour-provider for="${this.tourId}">
        <blazing-header> </blazing-header>
        <calendar-widget> </calendar-widget>
        <map-widget src="/maps/italy.geo.json"> </map-widget>
        <itinerary-view> </itinerary-view>
        <entourage-table> </entourage-table>
      </tour-provider>
    `;
  }
}
