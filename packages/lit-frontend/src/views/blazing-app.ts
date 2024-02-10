import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/auth-required";
import "../components/blazing-header";
import "../components/calendar-widget";
import "../components/entourage-table";
import "../components/itinerary-item";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("blazing-app")
export class BlazingAppElement extends LitElement {
  render() {
    return html`
      <auth-required>
        <blazing-header></blazing-header>

        <main class="page">
            <calendar-widget
              start-date="2024-10-13"
              end-date="2024-10-25">
            </calendar-widget>

            <section class="itinerary">
              <itinerary-transportation
                start-date="2024-10-13"
                end-date="2024-10-14"
                href="flight/outbound.html"
                type="air">
                <span slot="origin">SFO</span>
                <span slot="terminus">VCE</span>
                <span slot="via">FRA</span>
              </itinerary-transportation>
              <itinerary-destination
                start-date="2024-10-14"
                end-date="2024-10-18"
                img-src="/images/preview/Canal_Grande_Chiesa_della_Salute_e_Dogana_dal_ponte_dell_Accademia.jpg"
                href="destination/venice.html">
                Venice
              </itinerary-destination>
              <itinerary-transportation
                start-date="2024-10-18"
                type="rail">
                <span slot="origin">Venice</span>
                <span slot="terminus">Florence</span>
              </itinerary-transportation>
              <itinerary-destination
                start-date="2024-10-18"
                end-date="2024-10-21"
                img-src="/images/preview/Firenze_-_Vista_dal_Piazzale_Michelangelo.jpg"
                href="destination/florence.html">
                Florence
              </itinerary-destination>
              <itinerary-transportation
                start-date="2024-10-21"
                type="rail">
                <span slot="origin">Florence</span>
                <span slot="terminus">Rome</span>
              </itinerary-transportation>
              <itinerary-destination
                start-date="2024-10-21"
                end-date="2024-10-25"
                img-src="/images/preview/Colosseum_in_Rome,_Italy_-_April_2007.jpg"
                href="destination/rome.html">
                Rome
              </itinerary-destination>
              <itinerary-transportation
                start-date="2024-10-25"
                href="/flight/return.html"
                type="air">
                <span slot="origin"> FCO </span>
                <span slot="terminus"> SFO </span>
              </itinerary-transportation>
            </section>
            <entourage-table path="/entourages/65c7c324a837ff7c15b669e2">
            </entourage-table>
          </tour-view>
        </main>
      </auth-required>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css`
      main.page {
        display: grid;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        gap: var(--size-spacing-xlarge);
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto 1fr;
        grid-template-areas:
          "calendar  itinerary"
          "entourage itinerary"
          "empty     itinerary";
      }

      calendar-widget {
        grid-area: calendar;
        align-self: start;
      }

      .itinerary {
        display: grid;
        grid-area: itinerary;
        align-self: start;
        grid-template-columns:
          [start] min-content [primary] 1fr var(
            --size-icon-large
          )
          1fr [end];
        gap: 0 var(--size-spacing-medium);
        align-items: baseline;
      }
    `
  ];
}
