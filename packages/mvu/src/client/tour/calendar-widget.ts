import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";

@customElement("calendar-widget")
export class CalendarWidget extends LitElement {
  @property({ attribute: "start-date" })
  startDate: String = Date.now();

  @property({ attribute: "end-date", type: Date })
  endDate: String = Date.now();

  @property()
  handleChange: (Date) => void = (date) => {};

  render() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const dates = datesInRange(start, end);

    const renderDate = (d) => {
      const ymd = {
        d: d.getUTCDate(),
        m: d.getUTCMonth() + 1,
        y: d.getUTCFullYear(),
        day: d.getUTCDay()
      };

      const format = ({ y, m, d }) => [y, m, d].join("-");

      return html`
        <label style="grid-column: ${ymd.day + 1}">
          ${ymd.d}
          <input
            type="radio"
            name="cal"
            @change="this._handleSelection"
            value="${format(ymd)}" />
        </label>
      `;
    };

    return html` <section>
      <fieldset
        @change="${(event) =>
          this.handleChange(new Date(event.target.value))}">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
        ${dates.map(renderDate)}
      </fieldset>
      <button id="clear" @click="${() => this.handleChange()}">
        Clear Selection
      </button>
    </section>`;
  }

  static styles = css`
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
  `;
}

if (window) {
  window.CalendarWidget = CalendarWidget;
}

function datesInRange(start: Date, end?: Date) {
  const endTime = end ? end.getTime() : start.getTime();
  let result = [];
  let i = new Date(start);

  while (i.getTime() <= endTime) {
    result.push(new Date(i));
    i.setUTCDate(i.getUTCDate() + 1);
  }

  return result;
}
