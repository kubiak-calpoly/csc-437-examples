import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { formatDate } from "../utils/dates";

class ItineraryItemElement extends LitElement {
  @property({ attribute: "start-date" })
  startDate: string = "1970-01-01";

  @property({ attribute: "end-date" })
  endDate?: string;

  @property()
  href?: string;

  @property({ reflect: true, type: Boolean })
  hidden: boolean = false;

  _calendar_widget_select = (_: Event) => { };
  _calendar_widget_clear = (_: Event) => { };

  render() {
    const item = this.renderItem();

    return html`
      <span id="dates">
        <time datetime=${this.startDate}>
          ${formatDate(this.startDate)}
        </time>
        ${this.endDate
        ? html`
              <time datetime=${this.endDate}>
                ${formatDate(this.endDate)}
              </time>
            `
        : null}
      </span>
      ${item}
    `;
  }

  renderItem() {
    // subclasses may override
    return html`
      <slot></slot>
    `;
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
      grid-column: 1;
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
      grid-column: 2/-1;
      background: var(--color-background-card);
      border-radius: var(--size-corner-medium);
      aspect-ratio: 16/9;
      background-size: cover;
      background-position: left 25%;
    }
    .transportation {
      display: grid;
      grid-column: 2/-1;
      grid-template-columns: subgrid;
      place-items: center;
    }
    .transportation > h3 {
      display: contents;
      font-size: var(--size-type-mlarge);
      font-style: oblique;
    }
    .destination > h3 {
      padding: 0 var(--size-spacing-medium);
    }
    .destination[style] > h3 {
      color: var(--color-text-inverted);
      text-decoration: none;
      font-weight: var(--font-weight-bold;);
      text-shadow: var(--shadow-dropdown);
      text-align: right;
    }
    .transportation > h3 > :first-child {
      justify-self: end;
    }
    .transportation > h3 > :last-child {
      justify-self: start;
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
      color: var(--color-accent);
    }
    a {
      color: inherit;
      text-decoration: none;
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
        this.setAttribute("hidden", "hidden");
      } else {
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

export class ItineraryDestinationElement extends ItineraryItemElement {
  @property({ attribute: "img-src" })
  imgSrc?: string;

  renderItem() {
    const content = html`
      <slot></slot>
    `;
    const link = this.href
      ? html`
          <a class="itemLink" href="${this.href}">${content}</a>
        `
      : content;
    const style = this.imgSrc
      ? `background-image: url(${this.imgSrc})`
      : "";

    return html`
      <section class="destination" style=${style}>
        <h3>${link}</h3>
      </section>
    `;
  }
}

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

    return html`
      <section class="transportation">
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
      </section>
    `;
  }
}
