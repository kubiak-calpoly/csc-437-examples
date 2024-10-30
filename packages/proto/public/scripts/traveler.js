import { css, define, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class TravelerProfileElement extends HTMLElement {
  static template = html`<template>
    <section>
      <slot name="avatar"></slot>
      <h1><slot name="name"></slot></h1>
      <dl>
        <dt>Username</dt>
        <dd><slot name="userid"></slot></dd>
        <dt>Nickname</dt>
        <dd><slot name="nickname"></slot></dd>
        <dt>Home City</dt>
        <dd><slot name="home"></slot></dd>
        <dt>Airports</dt>
        <dd><slot name="airports"></slot></dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: rebeccapurple"></span>
          </slot>
          <slot name="color-name">rebeccapurple</slot>
        </dd>
      </dl>
    </section>
  </template>`;

  static styles = css`
    :host {
      display: contents;
      grid-column: 2/-2;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 4;
      grid-column: auto / span 2;
    }
    ::slotted(img[slot="avatar"]) {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 4;
    }
    .swatch,
    ::slotted([slot="color-swatch"]) {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    ::slotted(ul[slot="airports"]) {
      list-style: none;
      padding: 0;
    }
    dl {
      display: grid;
      grid-column: 1 / span 4;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 3 / -1;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(TravelerProfileElement.template)
      .styles(
        reset.styles,
        headings.styles,
        TravelerProfileElement.styles
      );
  }
}
