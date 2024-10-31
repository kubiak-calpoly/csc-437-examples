import { css, define, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class TravelerProfileElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

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

  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && oldValue !== newValue && newValue)
      this.hydrate(newValue);
  }

  hydrate(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      switch (key) {
        case "color":
          return html`
            <span
              slot="color-swatch"
              style="background: #${value}"></span>
            <span slot="color-name">#${value}</span>
          `;
        case "avatar":
          return html`<img slot="${key}" src="${value}" />`;
      }

      switch (typeof value) {
        case "object":
          if (Array.isArray(value))
            return html`<ul slot="${key}">
              ${value.map((s) => html`<li>${s}</li>`)}
            </ul>`;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };
    const fragment = entries.map(toSlot);

    this.replaceChildren(...fragment);
  }
}
