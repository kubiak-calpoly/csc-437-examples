import { css, html, shadow } from "@unbndl/html";
import {
  View,
  createView,
  createViewModel,
  fromAttributes
} from "@unbndl/view";
import reset from "../styles/reset.css.ts";

type CalendarWidgetAttributes = {
  "start-date": string;
  "end-date"?: string;
};

interface CalendarWidgetModel {
  startDate?: string;
  endDate?: string;
  selectedDate?: Date;
}

interface DateYMD {
  d: number;
  m: number;
  y: number;
  day: number;
}

export class CalendarWidget extends HTMLElement {

  viewModel =
    createViewModel<CalendarWidgetModel>(
      { endDate: undefined }
    ).withRenamed(
      fromAttributes<CalendarWidgetAttributes>(this),
      {
        startDate: "start-date",
        endDate: "end-date"
      }
    );

  dateView = createView<DateYMD>(html`
    <label style=${$ => `grid-column: ${$.day + 1}`}>
      <span>${($) => $.d}</span>
      <input
        type="radio"
        name="cal"
        value=${($) => formatYMD($)} />
    </label>
  `);

  view = createView<CalendarWidgetModel>(html`
    <section>
      <fieldset>
        <h6>Su</h6>
        <h6>Mo</h6>
        <h6>Tu</h6>
        <h6>We</h6>
        <h6>Th</h6>
        <h6>Fr</h6>
        <h6>Sa</h6>
        ${($) =>
          $.startDate
            ? View.map(
                this.dateView,
                datesInRange($.startDate, $.endDate).map(toYMD)
              )
            : ""}
      </fieldset>
      <button id="clear">Clear Selection</button>
    </section>
  `);

  changeEventType = `${this.tagName.toLowerCase()}/change`;
  clearEventType = `${this.tagName.toLowerCase()}/clear`;

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles, CalendarWidget.styles)
      .replace(this.viewModel.render(this.view))
      .delegate('input[name="cal"]', {
        change: (ev: InputEvent) => {
          const input = ev.target as HTMLInputElement;
          const custom = new CustomEvent(this.changeEventType, {
            bubbles: true,
            composed: true,
            detail: {
              dateString: input.value
            }
          });
          this.dispatchEvent(custom);
        }
      })
      .delegate('button#clear', {
        click: (ev: MouseEvent) => {
          const current = this.shadowRoot?.querySelector(
            "input:checked"
          ) as HTMLInputElement;

          if(current) current.checked = false;

          const clearEvent = new CustomEvent(
            this.clearEventType,
            { bubbles: true, composed: true }
          );

          this.dispatchEvent(clearEvent)
        }
      });
  }

  static styles = css`
    fieldset {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border: none;
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

    #clear {
      display: block;
      margin: 0 auto;
    }
  `;

}

function toYMD(d: Date): DateYMD {
  return {
    d: d.getUTCDate(),
    m: d.getUTCMonth() + 1,
    y: d.getUTCFullYear(),
    day: d.getUTCDay()
  };
}

function formatYMD(ymd: DateYMD): string {
  const { y, m, d } = ymd;
  return [y, m, d].join("-");
}

function datesInRange(startDate: string, endDate?: string): Array<Date> {
  const start = new Date(startDate);
  const end = endDate && new Date(endDate);
  const endTime = end ? end.getTime() : start.getTime();
  let result = [];
  let i = new Date(start);

  while (i.getTime() <= endTime) {
    result.push(new Date(i));
    i.setUTCDate(i.getUTCDate() + 1);
  }

  return result;
}
