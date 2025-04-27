import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import headings from "./styles/headings.css.ts";
import icon from "./styles/icon.css.ts";

type TransportationMode = "air" | "rail" | "unknown";

export class TransportationElement extends LitElement {
  @property()
  mode: TransportationMode = "unknown";

  override render() {
    const modeToIcon = {
      air: "icon-airplane",
      rail: "icon-train",
      unknown: "icon-unknown"
    };
    const icon: string = modeToIcon[this.mode];

    return html`
      <h3>
        <slot name="from">FCO</slot>
        <svg class="icon">
          <use
            href="/icons/transportation.svg#${icon}" />
        </svg>
        <slot name="to">SFO</slot>
        <slot name="via"></slot>
      </h3>
      <slot></slot>
    `;
  }

  static styles = [
    reset.styles,
    icon.styles,
    headings.styles,
    css`
    :host {
      display: contents;
    }
    h3 {
      color: var(--color-accent);

    grid-column: header / -1;
    font-weight: var(--font-weight-bold);

    slot[name="from"]::after {
      content: " →";
    }
    slot[name="to"]::before {
      content: "→ ";
    }
    slot[name="via"]:has-slotted {
      font-style: italic;
      &::before {
        content: "(via ";
      }
      &::after {
        content: ")";
      }
    }
  }
    `
  ];
}

export class SegmentElement extends LitElement {
  override render() {
    return html`
      <details>
        <summary>
          <slot name="carrier"></slot>
          <slot name="number"></slot>
        </summary>
        <dl>
          <dt>Depart</dt>
          <dd>
            <slot name="departure">Place and Time</slot>
          </dd>
          <dt>Arrive</dt>
          <dd>
            <slot name="arrival">Place and Time</slot>
          </dd>
        </dl>
      </details>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      details {
        display: contents;

        summary {
          grid-column: header / span 2;
        }
      }
      dl {
        display: grid;
        grid-column: span 4 / -1;
        grid-template-columns: subgrid;
      }
      dt {
        font-family: var(--font-family-display);
        font-weight: var(--font-weight-bold);
      }
      dd {
        display: contents;
      }
    `
  ];
}

export class EndPointElement extends LitElement {
  @property()
  localtime: string = "1970-01-01";

  @property()
  tz: string = "+0000";

  @property()
  code?: string;

  override render() {
    const time = new Date(this.localtime);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm: string = hours < 12 ? "AM" : "PM";
    const hr: string = (hours > 12 ? hours-12 : (hours || 12))
      .toString().padStart(2, "0");
    const min: string = minutes.toString().padStart(2, "0");
    const formattedTime = html`
      <span>${hr}:${min} ${ampm}</span>
      <small>${this.tz}</small>
    `;
    const code = this.code ?
      html`<span>(${this.code})</span>` : "";

    return html`
      <span class="place">
        <slot></slot>${code}
      </span>
      <time datetime="${this.localtime}${this.tz}">
        ${formattedTime}
      </time>
    `;
  }

  static styles = [
    reset.styles,
    css`
    :host {
      display: contents;
    }
    .place {
      grid-column-end: span 2;
    }
    time {
      grid-column-end: -1;
      text-align: right;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    `
  ]
}
