import { html, effect } from "./utils/index.js";

export class CalendarWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      CalendarWidget.template.cloneNode(true)
    );
  }

  static template = html`
    <section>
      <fieldset id="grid">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
      </fieldset>
      <button
        id="clear"
        onclick="CalendarWidget.handleClearSelection(event)">
        Clear Selection
      </button>
    </section>
    <style>
      :host {
        grid-area: calendar;
        padding: 0 var(--size-spacing-medium);
      }

      fieldset {
        display: grid;
        grid-template-columns: repeat(7, 2rem);
        gap: var(--size-spacing-small);
        justify-content: center;
        justify-items: streth;
        border: 0;
      }

      h6 {
        text-align: center;
      }

      label {
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 1;
        padding: var(--size-spacing-small);
        white-space: nowrap;
        text-align: center;
        color: var(--color-accent);
        font-family: var(--font-family-display);
        z-index: 0;
      }

      input {
        appearance: none;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
      }

      input:checked {
        background: var(--color-accent);
      }

      label:has(input:checked) {
        color: var(--color-link-inverted);
      }

      button {
        display: block;
        margin: 0 auto;
      }
    </style>
  `;

  static handleClearSelection = effect(function () {
    const current =
      this.shadowRoot.querySelector("input:checked");
    if (current) {
      const items = document.querySelectorAll(
        ".itinerary > itinerary-item"
      );

      Array.from(items).forEach((el) => {
        el.removeAttribute("hidden");
        el.removeAttribute("open");
      });
      current.checked = false;
    }
  });

  static handleSelection = effect(function (ev) {
    const date = new Date(ev.target.value);
    const items = document.querySelectorAll(
      ".itinerary > itinerary-item"
    );
    Array.from(items).forEach((el) => {
      const start = el.getAttribute("start-date");
      const end = el.getAttribute("end-date") || start;
      const shown =
        new Date(start) <= date && date <= new Date(end);
      if (shown) {
        el.setAttribute("open", "open");
        el.removeAttribute("hidden");
      } else {
        el.setAttribute("hidden", "hidden");
      }
    });
  });

  connectedCallback() {
    const start = new Date(this.getAttribute("start-date"));
    const end = new Date(this.getAttribute("end-date"));

    this._initializeCalendar(start, end);
  }

  _initializeCalendar(start, end) {
    const grid = this.shadowRoot.getElementById("grid");
    const dates = datesInRange(start, end);

    dates.forEach((d) => {
      const ymd = {
        d: d.getUTCDate(),
        m: d.getUTCMonth() + 1,
        y: d.getUTCFullYear()
      };

      const format = ({ y, m, d }) => [y, m, d].join("-");

      const label = document.createElement("label");
      label.innerHTML = `${ymd.d}
        <input type="radio" 
          name="cal"
          onchange="CalendarWidget.handleSelection(event)"
          value="${format(ymd)}"/>
      `;

      grid.append(label);
    });
  }
}

if (window) {
  window.CalendarWidget = CalendarWidget;
}

function datesInRange(start, end) {
  let result = [];
  let i = new Date(start);

  while (i <= (end || start)) {
    result.push(new Date(i));
    i.setUTCDate(i.getUTCDate() + 1);
  }

  return result;
}
