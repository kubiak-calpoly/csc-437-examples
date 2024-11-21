import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Accommodation } from "server/models";
import headings from "../styles/headings.css";
import icon from "../styles/icon.css";
import reset from "../styles/reset.css";
import { formatDate } from "../utils/dates";

export class AccommodationElement extends LitElement {
  @property({ attribute: false })
  using?: Accommodation;

  render() {
    const { checkIn, checkOut, name, rate, roomType } =
      this.using || {};

    return html`
      <section>
        <h3>
          <svg class="icon">
            <use
              xlink:href="/icons/destination.svg#icon-hotel" />
          </svg>
          <span>${name}</span>
        </h3>
        <dl>
          <dt>Check-in</dt>
          <dd>
            <time datetime=${checkIn}
              >${formatDate(checkIn)}</time
            >
          </dd>
          <dt>Check-out</dt>
          <dd>
            <time datetime=${checkOut}
              >${formatDate(checkOut)}</time
            >
          </dd>
          <dt>Room Type</dt>
          <dd> ${roomType} </dd>
          <dt>Rate</dt>
          <dd>
            <span>${rate?.amount}</span>
            <span>${rate?.currency}</span>
          </dd>
        </dl>
      </section>
    `;
  }

  static styles = [
    reset.styles,
    icon.styles,
    headings.styles,
    css`
      :host {
        display: contents;
      }
      section {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid [dt] [dd];
        align-content: start;
      }
      svg.icon {
        --size-icon: var(--size-icon-large);
      }
      h3 {
        display: flex;
        grid-column: 1 / -1;
        align-items: center;
        gap: var(--size-spacing-medium);
      }
      dl {
        display: contents;
      }
      dt {
        font-family: var(--font-family-display);
        grid-column: dt;
      }
      dd {
        grid-column: dd / -1;
        justify-self: end;
      }
    `
  ];
}
