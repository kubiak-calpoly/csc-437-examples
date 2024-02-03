import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

class ItineraryItemElement extends LitElement {
  @property({ attribute: "start-date" })
  startDate: string = "1970-01-01";

  @property({ attribute: "end-date" })
  endDate?: string;

  @property()
  href?: string;

  @property({ reflect: true, type: Boolean })
  hidden: boolean = false;

  _calendar_widget_select = (_: Event) => {};
  _calendar_widget_clear = (_: Event) => {};

  render() {
    const item = this.renderItem();
    const link = this.href
      ? html`<a class="itemLink" href="{href}">${item}</a>`
      : item;

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
      ${link}
    `;
  }

  renderItem() {
    // subclasses may override
    return html`<slot></slot>`;
  }

  static styles = css`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    :host(*) {
      display: contents;
    }
    :host([hidden]) {
      display: none;
    }
    #dates {
      display: flex;
      grid-column: start;
      place-self: stretch;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      font-size: var(--size-type-small);
      font-family: var(--font-family-display);
      border-bottom: var(--line-weight-superfine) solid
        var(--color-accent);
    }
    #dates time {
      white-space: nowrap;
    }
    #dates time:first-child {
      font-weight: var(--font-weight-bold);
    }
    #dates time + time {
      visibility: hidden;
    }
    .destination {
      grid-column: primary/end;
      background: var(--color-background-card);
      padding: var(--size-spacing-large)
        var(--size-spacing-medium);
      border-radius: var(--size-corner-medium);
    }
    .transportation {
      display: grid;
      grid-column: primary/end;
      grid-template-columns: subgrid;
      align-items: middle;
    }
    .transportation > h3 {
      display: contents;
    }
    .transportation > h3 > :first-child {
      text-align: right;
    }
    ::slotted([slot="via"]) {
      font-weight: var(--font-weight-light);
      font-style: normal;
      font-size: 75%;
    }
    ::slotted([slot="via"])::before {
      display: inline;
      content: "via ";
    }
    h3 {
      font-family: var(--font-family-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      color: var(--color-accent);
    }
    a {
      color: inherit;
    }
    a.itemLink {
      display: contents;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
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

@customElement("itinerary-destination")
export class ItineraryDestinationElement extends ItineraryItemElement {
  renderItem() {
    const content = html`<slot></slot>`;
    const link = this.href
      ? html`<a href="{href}">${content}</a>`
      : content;
    return html`<section class="destination">
      <h3>${link}</h3>
    </section>`;
  }
}

@customElement("itinerary-transportation")
export class ItineraryTransportationElement extends ItineraryItemElement {
  @property()
  type?: "air" | "rail";

  renderItem() {
    const icons = {
      air: "icon-airplane",
      rail: "icon-train"
    };
    const iconId = this.type
      ? icons[this.type]
      : "icon-default";

    return html`<section class="transportation">
      <h3 class="subgrid">
        <span>
          <slot name="origin">BGN</slot>
        </span>
        <svg class="icon">
          <use href="/icons/transportation.svg#${iconId}" />
        </svg>
        <span>
          <slot name="terminus">END</slot>
          <slot name="via"></slot>
        </span>
      </h3>
    </section>`;
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
