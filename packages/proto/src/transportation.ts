import {html, css, LitElement} from 'lit';
import {property} from "lit/decorators.js"

export class TransportationElement extends LitElement {
  @property()
  mode: string = "default";

  render() {
    const modeToIcon = {
      "air": "icon-airplane",
      "rail": "icon-train",
    }
    return html`
      <h3>
        <slot name="from">FCO</slot>
        <svg class="icon">
          <use
            href="/icons/transportation.svg#icon-airplane" />
        </svg>
        <slot name="to">SFO</slot>
        <slot name="via">FRA</slot>
      </h3>
      <slot></slot>
    `;
  }
}

export class SegmentElement extends LitElement {
  render() {
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
            <slot name="arrival">Place and Time </slot>
          </dd>
        </dl>
      </details>
    `
  }
}

export class PlaceAndTimeElement extends LitElement {
  @property()
  localtime: string = "1970-01-01";

  @property()
  tz: string = "+0000";

  @property()
  code?: string;

  render() {
    const time = new Date(this.localtime);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm: string = hours >= 12 ? "AM" : "PM";
    const formattedTime: string =
      `${hours % 12 || 12}:${minutes} ${ampm}`;
    return html`
      <slot></slot>
      <time datetime="${this.localtime}${this.tz}">
        ${formattedTime}
      </time>
    `;
  }
}
