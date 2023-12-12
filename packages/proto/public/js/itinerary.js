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
    <span> </span>
    <details name="itinerary"> </details>
  `;
}

function html(strings, ...values) {
  const html = strings.flatMap((s, i) =>
    i ? [values[i - 1], s] : [s]
  );
  let tpl = document.createElement("template");
  tpl.innerHTML = html;
  return tpl.content;
}
