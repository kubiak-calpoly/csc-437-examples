import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.js";
import icon from "./styles/icon.css.js";
import headings from "./styles/headings.css.js";

export class AccommodationElement extends LitElement {
  render() {
    return html`<section>
        <h3>
          <svg class="icon">
            <use xlink:href="/icons/destination.svg#icon-hotel" />
          </svg>
          <slot name="name">Accommodation</slot>
        </h3>
        <dl>
          <dt>Check-in</dt>
          <dd>
            <slot name="check-in">
              <time datetime="1970-01-01">dd-Mmm</time>
            </slot>
          </dd>
          <dt>Check-out</dt>
          <dd>
            <slot name="check-out">
              <time datetime="1970-01-01">dd-Mmm</time>
            </slot> </dd
          ><dt>Room Type</dt>
          <dd>
            <slot name="room-type">Standard</slot>
          </dd>
          <dt>Sleeps</dt>
          <dd>
            <slot name="persons"># </slot>
          </dd>
          <dt>Rate</dt>
          <dd>
            <slot name="room-rate">###</slot>
            <slot name="currency">USD</slot>
          </dd>
        </dl>
      </section>
    </template>`;
  }

  static styles = [
    reset.styles,
    headings.styles,
    icon.styles,
    css`
    :host {
      display: contents;
    }
    section {
      display: grid;
      grid-area: acc;
      grid-template-columns: subgrid [dt] [dd];
      align-content: start;
    }
    svg.icon {
      --size-icon: var(--size-icon-large);
    }
    h3 {
      display: flex;
      grid-column: 1 / -1;
      align-items: center;
      gap: var(--size-spacing-medium);
    }
    dl {
      display: contents;
    }
    dt {
      font-family: var(--font-family-display);
      grid-column: dt;
    }
    dd {
      grid-column: dd / -1;
      justify-self: end;
    }
  `];
}
