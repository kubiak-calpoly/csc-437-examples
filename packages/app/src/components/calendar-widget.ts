import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { parseUTCDate } from "../utils/dates";

export class CalendarWidget extends LitElement {
  @property({ attribute: "start-date", type: Date })
  startDate: string = Date.now().toString();

  @property({ attribute: "end-date", type: Date })
  endDate: string = Date.now().toString();

  _handleChange(value: string | null) {
    const selectionEvent = new CustomEvent(
      "calendar-widget:select",
      {
        bubbles: true,
        composed: true,
        detail: { date: value ? parseUTCDate(value) : value }
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

    const clearEvent = new CustomEvent(
      "calendar-widget:clear",
      { bubbles: true, composed: true }
    );

    this.dispatchEvent(clearEvent);
  }

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
          <span>${ymd.d}</span>
          <input
            type="radio"
            name="cal"
            value="${format(ymd)}" />
        </label>
      `;
    };

    return html`
      <section>
        <fieldset
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
        <button
          id="clear"
          @click="${() => this._handleClear()}">
          Clear Selection
        </button>
      </section>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      box-sizing: border-box;
    }

    fieldset {
      display: grid;
      grid-template-columns: repeat(7, 2rem);
      gap: var(--size-spacing-small);
      justify-content: center;
      justify-items: streth;
      border: 0;
      padding: 0;
    }

    fieldset + button {
      margin-top: var(--size-spacing-large);
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
      background-color: var(--color-background-control);
      border: var(--line-weight-fine) solid var(--color-accent);
      color: var(--color-text-control);
      font-size: var(--size-type-small);
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
      background-color: var(--color-accent);
      color: var(--color-text-control-inverted);
    }

    button {
      display: block;
      margin: 0 auto;
    }
  `;
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
