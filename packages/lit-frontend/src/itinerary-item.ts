import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("itinerary-item")
export class ItineraryItem extends LitElement {
  @property({ attribute: "start-date" })
  startDate: string = "1970-01-01";

  @property({ attribute: "end-date" })
  endDate?: string;

  @property({ reflect: true, type: Boolean })
  hidden: boolean = false;

  _calendar_widget_select = (_: Event) => {};
  _calendar_widget_clear = (_: Event) => {};

  render() {
    return html`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${formatDate(this.startDate)}
        </time>
        ${this.endDate
          ? html` <time datetime=${this.endDate}>
              ${formatDate(this.endDate)}
            </time>`
          : null}
      </span>
      <slot></slot>
    `;
  }

  static styles = css`
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
  `;

  connectedCallback() {
    const hideOrShow = (event: Event) => {
      const selectionEvent = event as CustomEvent<{
        date: Date;
      }>;
      const selectedDate = selectionEvent.detail.date as Date;
      const hidden =
        selectedDate < new Date(this.startDate) ||
        selectedDate > new Date(this.endDate || this.startDate);
      if (hidden) {
        console.log("Hiding item", this);
        this.setAttribute("hidden", "hidden");
      } else {
        console.log("Revealing item", this);
        this.removeAttribute("hidden");
      }
    };
    const showAll = (_: Event) => {
      this.removeAttribute("hidden");
    };
    document.addEventListener(
      "calendar-widget:select",
      (this._calendar_widget_select = hideOrShow)
    );
    document.addEventListener(
      "calendar-widget:clear",
      (this._calendar_widget_clear = showAll)
    );
    super.connectedCallback();
  }

  disconnectedCallback() {
    document.removeEventListener(
      "calendar-widget:select",
      this._calendar_widget_select
    );
    document.removeEventListener(
      "calendar-widget:clear",
      this._calendar_widget_clear
    );
    super.disconnectedCallback();
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

function formatDate(datestring: string) {
  const dt = new Date(datestring);
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();

  return `${d} ${m}`;
}
