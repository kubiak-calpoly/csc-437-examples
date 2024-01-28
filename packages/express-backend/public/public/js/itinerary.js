import { html, effect } from "./utils.js";

export class ItineraryItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      ItineraryItem.template.cloneNode(true)
    );
  }

  static template = html`
    <span id="dates"></span>
    <details
      id="details"
      name="itin"
      ontoggle="ItineraryItem.handleToggle(event)">
      <summary>
        <slot name="summary"></slot>
      </summary>
      <slot></slot>
    </details>
    <style>
      :host {
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
      summary::after {
        /* SVG icon: blz-expand-down.svg */
        content: url('data:image/svg+xml;utf8,<svg width="64" height="16" viewBox="0 0 64 16" fill="rgb(42 143 43)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.7539 3L31.5 10L39.2461 3H64V13H0V3H23.7539Z"/></svg>');
        display: block;
        position: absolute;
        top: var(--size-icon-large);
        left: 0;
        height: var(--size-spacing-large);
        width: var(--size-icon-large);
      }

      details[open] > summary::after {
        content: url('data:image/svg+xml;utf8,<svg width="64" height="16" viewBox="0 0 64 16" fill="rgb(42 143 43)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M32 5.67712L24.699 12H1V4H63V12H39.301L32 5.67712ZM38.9282 13H64V3H0V13H25.0718L32 7L38.9282 13Z"/></svg>');
      }
    </style>
  `;

  static handleToggle = effect(function (event) {
    const markerId = this.getAttribute("marker");
    const isOpen = event.newState === "open";

    console.log("Toggled", markerId);
    if (markerId) {
      const marker = document.getElementById(markerId);

      if (marker) {
        if (isOpen) marker.setAttribute("selected", "selected");
        else marker.removeAttribute("selected");
      }
    }
  });

  connectedCallback() {
    const dates = this.shadowRoot.getElementById("dates");
    const details = this.shadowRoot.getElementById("details");
    const start = this.getAttribute("start-date");
    const end = this.getAttribute("end-date");
    const itemClass = this.getAttribute("item-class");
    const open = this.getAttribute("open");
    const hidden = this.getAttribute("hidden");

    const startTime = document.createElement("time");
    startTime.setAttribute("datetime", start);
    startTime.textContent = formatDate(start);
    dates.append(startTime);

    if (end) {
      const endTime = document.createElement("time");
      endTime.setAttribute("datetime", start);
      endTime.textContent = formatDate(start);
      dates.append(endTime);
    }

    details.classList.add(itemClass);

    this._toggleOpen(open);
    this._toggleHidden(hidden);
  }

  static get observedAttributes() {
    return ["open", "hidden"];
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "open":
        this._toggleOpen(newValue);

      case "hidden":
        this._toggleHidden(newValue);
    }
  }

  _toggleOpen(value) {
    const details = this.shadowRoot.getElementById("details");

    if (value) details.setAttribute("open", "open");
    else details.removeAttribute("open");
  }

  _toggleHidden(value) {
    if (value) this.classList.add("is-hidden");
    else this.classList.remove("is-hidden");
  }
}

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
