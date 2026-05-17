import { css, html, shadow } from "@unbndl/html";
import {
  View,
  createView,
  createViewModel,
  fromAttributes
} from "@unbndl/view";

type CalendarWidgetAttributes = {
  "start-date": string;
  "end-date"?: string;
};

interface CalendarWidgetModel {
  startDate?: Date;
  endDate: Date | undefined;
  selectedDate?: Date;
}

interface DateYMD {
  d: number;
  m: number;
  y: number;
  day: number;
}

export class CalendarWidget extends HTMLElement {
  static styles = css`
    /* CSS here */
  `;

  viewModel =
    createViewModel<CalendarWidgetModel>(
      { endDate: undefined }
    ).withCalculated(
      fromAttributes<CalendarWidgetAttributes>(this),
      {
        startDate: ($) => new Date($["start-date"]),
        endDate: ($) => {
          const dateString = $["end-date"]
          if (dateString === undefined) return undefined;
          else return new Date(dateString);
        }
      }
    );

  dateView = createView<DateYMD>(html`
    <label style="grid-column: ${($) => $.day + 1}">
      <span>${($) => $.d}</span>
      <input
        type="radio"
        name="cal"
        value="${($) => formatYMD($)}" />
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
  changeEventType = `${this.tagName}/change`;

  constructor() {
    super();
    shadow(this)
      .styles(CalendarWidget.styles)
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
      });
  }
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

function datesInRange(start: Date, end?: Date): Array<Date> {
  const endTime = end ? end.getTime() : start.getTime();
  let result = [];
  let i = new Date(start);

  while (i.getTime() <= endTime) {
    result.push(new Date(i));
    i.setUTCDate(i.getUTCDate() + 1);
  }

  return result;
}
