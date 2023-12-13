export class CalendarWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      CalendarWidget.template.cloneNode(true)
    );
    this._onchange = this._handleChange.bind(this);
    this._onclick = this._clearCalendar.bind(this);
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
      <button id="clear">Clear Selection</button>
    </section>
    <style>
      :host {
        grid-area: calendar;
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

  connectedCallback() {
    const grid = this.shadowRoot.getElementById("grid");
    const clear = this.shadowRoot.getElementById("clear");
    const start = new Date(this.getAttribute("start-date"));
    const end = new Date(this.getAttribute("end-date"));

    this._initializeCalendar(start, end);
    grid.addEventListener("change", this._onchange);
    clear.addEventListener("click", this._onclick);
  }

  disconnectedCallback() {
    const grid = this.shadowRoot.getElementById("grid");
    const clear = this.shadowRoot.getElementById("clear");
    grid.removeEventListener("change", this._onchange);
    clear.removeEventListener("click", this._onchange);
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
        <input type="radio" name="cal" value="${format(ymd)}"/>
      `;

      grid.append(label);
    });
  }

  _handleChange(ev) {
    const date = new Date(ev.target.value);
    console.log("Date Selected:", date.toUTCString());
    const items = document.querySelector(".itinerary").children;
    Array.from(items).forEach((el) => {
      const start = el.dataset.startDate;
      const end = el.dataset.endDate || start;
      const shown =
        new Date(start) <= date && date <= new Date(end);
      el.classList.toggle("is-hidden", !shown);
      if (shown) {
        el.querySelector("details").setAttribute(
          "open",
          "open"
        );
      }
    });
  }

  _clearCalendar() {
    const current =
      this.shadowRoot.querySelector("input:checked");
    if (current) {
      const items =
        document.querySelector(".itinerary").children;

      Array.from(items).forEach((el) => {
        el.classList.remove("is-hidden");
        el.querySelector("details").removeAttribute("open");
      });
      current.checked = false;
    }
  }
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

export class ItineraryItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      ItineraryItem.template.cloneNode(true)
    );
  }

  static template = html`
    <span id="dates"></span>
    <details id="details" name="itin">
      <summary>
        <slot name="summary"></slot>
      </summary>
      <slot></slot>
    </details>
    <style>
      :host {
        display: contents;
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

  connectedCallback() {
    const dates = this.shadowRoot.getElementById("dates");
    const details = this.shadowRoot.getElementById("details");
    const start = this.getAttribute("start-date");
    const end = this.getAttribute("end-date");
    const itemClass = this.getAttribute("item-class");

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
  }
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

function html(strings, ...values) {
  const html = strings.flatMap((s, i) =>
    i ? [values[i - 1], s] : [s]
  );
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}
