import { html, css, shadow } from "@unbndl/html";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";
import icon from "../styles/icon.css.ts";
import { Transportation, TransportationType } from "server/models";
import { createView, createViewModel, fromAttributes } from "@unbndl/view";

interface TransportationModel {
  mode?: TransportationType
}

type TransporationAttrs = {
  "mode": string,
}

const modeToIcon: {[Key in TransportationType]: string} = {
  air: "icon-airplane",
  rail: "icon-train",
  ship: "icon-ship",
  bus: "icon-bus"
};

export class TransportationElement extends HTMLElement {
  viewModel = createViewModel<TransportationModel>()
    .with(fromAttributes<TransporationAttrs>(this), "mode")

  view = createView<TransportationModel>(html`
    <h3>
      <slot name="from">Origin</slot>
      <svg class="icon">
        <use href=${$ =>
          `/icons/transportation.svg#${modeToIcon[$.mode]}`}
        />
      </svg>
      <slot name="to">Terminus</slot>
      <slot name="via"></slot>
    </h3>
    <slot></slot>
  `)

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles, headings.styles, icon.styles,
        TransportationElement.styles)
  }

  static styles = css`
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
    `;
}

export class SegmentElement extends HTMLElement {
  static template = html`
    <template>
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
    </template>
  `;

  constructor() {
    super();
    shadow(this)
      .template(SegmentElement.template)
      .styles(reset.styles, SegmentElement.styles)
  }

  static styles = css`
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
    `;
}

interface EndPointModel {
  localtime: string;
  tz: string;
  code?: string;
}

export class EndPointElement extends HTMLElement {
  viewModel = createViewModel<EndPointModel>({
    localtime: "1970-01-01T00:00:00",
    tz: "+0000"
  });

  view = createView<EndPointModel>(html`
    <span class="place">
      <slot></slot>${$ => $.code
        ? html`<span>(${$.code})</span>`
        : ""
      }
    </span>
    <time datetime=${ $ => $.localtime + $.tz }">
      ${EndPointElement.formattedTime}
    </time>
  `);

  static formattedTime($: EndPointModel) {
    const time = new Date($.localtime);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm: string = hours < 12 ? "AM" : "PM";
    const hr: string = (hours > 12 ? hours-12 : (hours || 12))
      .toString().padStart(2, "0");
    const min: string = minutes.toString().padStart(2, "0");

    return createView<EndPointModel>(
      html`
      <span>${hr}:${min} ${ampm}</span>
      <small>${$.tz}</small>
    `);
  }

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles, EndPointElement.styles )
  }

  static styles = css`
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
    `;

}
