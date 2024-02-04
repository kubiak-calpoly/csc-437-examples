import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("date-select")
export class DateSelectElement extends LitElement {
  @property({ attribute: "start-date", type: Date })
  startDate: string = Date.now().toString();

  @property({ attribute: "end-date", type: Date })
  endDate: string = Date.now().toString();

  render() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const dates = datesInRange(start, end);

    const renderDate = (d: Date) => {
      const ymd = {
        d: d.getUTCDate(),
        m: d.getUTCMonth() + 1,
        y: d.getUTCFullYear(),
        day: d.getUTCDay()
      };

      const format = ({
        y,
        m,
        d
      }: {
        y: number;
        m: number;
        d: number;
      }) => [y, m, d].join("-");

      return html`
        <label style="grid-column: ${ymd.day + 1}">
          ${ymd.d}
          <input
            type="radio"
            name="cal"
            value="${format(ymd)}" />
        </label>
      `;
    };

    return html` <fieldset
        @change="${(event: InputEvent) => {
          const target = event.target as HTMLInputElement;
          this._handleChange(target.value);
        }}">
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
        ${dates.map(renderDate)}
      </fieldset>
      <button id="clear" @click="${() => this._handleClear()}">
        Clear Selection
      </button>`;
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

  _handleChange(value: string | null) {
    const selectionEvent = new CustomEvent(
      "date-select:change",
      {
        bubbles: true,
        detail: { date: value ? new Date(value) : value }
      }
    );

    this.dispatchEvent(selectionEvent);
  }

  _handleClear() {
    const current = this.shadowRoot?.querySelector(
      "input:checked"
    ) as HTMLInputElement;
    if (current) {
      current.checked = false;
    }

    const clearEvent = new CustomEvent("date-select:clear", {
      bubbles: true
    });

    this.dispatchEvent(clearEvent);
  }
}

function datesInRange(start: Date, end?: Date) {
  const endTime = end ? end.getTime() : start.getTime();
  let result: Array<Date> = [];
  let i = new Date(start);

  while (i.getTime() <= endTime) {
    result.push(new Date(i));
    i.setUTCDate(i.getUTCDate() + 1);
  }

  return result;
}
