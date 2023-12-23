import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("itinerary-item")
export class ItineraryItem extends LitElement {
  @property({ attribute: "start-date" })
  startDate: Date = new Date();

  @property({ attribute: "end-date" })
  endDate: Date = new Date();

  @property({ attribute: "item-class" })
  itemClass: string = "transportation";

  @property()
  marker: string = "";

  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  @property({ reflect: true, type: Boolean })
  hidden: boolean = false;

  render() {
    return html` <span id="dates">
        <time datetime=${this.startDate}>
          ${formatDate(this.startDate)}
        </time>
        <time datetime=${this.endDate}>
          ${formatDate(this.endDate)}
        </time>
      </span>
      <details
        id="details"
        name="itin"
        ${open}
        ontoggle="ItineraryItem.handleToggle(event)">
        <summary>
          <slot name="summary"></slot>
        </summary>
        <slot></slot>
      </details>`;
  }

  static styles = css`
    <style > :host {
      display: contents;
    }
    :host([hidden]) {
      display: none;
    }
    #dates {
      color: var(--color-accent);
      font-family: var(--font-family-display);
      font-weight: bold;
      grid-column: start;
    }
    #dates time {
      white-space: nowrap;
    }
    #dates time + time::before {
      display: inline-block;
      content: " – ";
    }
    details {
      padding: var(--size-spacing-medium);
      display: contents;
    }
    details.destination > summary,
    details.destination > ::slotted(*) {
      grid-column: header;
    }
    ::slotted(ul) {
      list-style: none;
      padding: 0;
      align-self: end;
    }
    summary {
      position: relative;
      padding-bottom: var(--size-spacing-large);
      padding-left: calc(
        var(--size-icon-large) + var(--size-spacing-medium)
      );
      list-style: none;
      grid-column: header / end;
      min-height: calc(
        var(--size-icon-large) + var(--size-spacing-large)
      );
    }
    details > summary::before {
      content: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" fill="rgb(42 143 42)"><path d="m624 300h-48v336h-134.88l158.88 317.64 158.88-317.64h-134.88zm-24 546.36-81.121-162.36h162.24z"/></svg>');
      position: absolute;
      height: 2rem;
      width: 2rem;
      bottom: 0;
      right: 0;
      color: var(--color-accent);
      transform: rotate(0);
      transition: transform 0.5s;
    }
    details[open] > summary::before {
      transform: rotate(180deg);
    }
  `;
}

//   static handleToggle = effect(function (event) {
//     const markerId = this.getAttribute("marker");
//     const isOpen = event.newState === "open";
//
//     console.log("Toggled", markerId);
//     if (markerId) {
//       const marker = document.getElementById(markerId);
//
//       if (marker) {
//         if (isOpen) marker.setAttribute("selected", "selected");
//         else marker.removeAttribute("selected");
//       }
//     }
//   });
//
//   _toggleOpen(value) {
//     const details = this.shadowRoot.getElementById("details");
//
//     if (value) details.setAttribute("open", "open");
//     else details.removeAttribute("open");
//   }
//
//   _toggleHidden(value) {
//     if (value) this.classList.add("is-hidden");
//     else this.classList.remove("is-hidden");
//   }

if (window) {
  window.ItineraryItem = ItineraryItem;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

function formatDate(datestring) {
  const dt = new Date(datestring);
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();

  return `${d} ${m}`;
}
