import { css, html, shadow } from "@unbndl/html";
import reset from "../styles/reset.css.ts";
import icon from "../styles/icon.css.ts";
import headings from "../styles/headings.css.ts";

export class AccommodationElement extends HTMLElement {

  static template = html`<template>
    <section>
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

  constructor() {
    super();
    shadow(this)
      .template(AccommodationElement.template)
      .styles(reset.styles, headings.styles, icon.styles,
        AccommodationElement.styles
      );
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
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
      grid-column: 1;
    }
    dd {
      grid-column: 2 / -1;
      justify-self: end;
    }
  `;
}
