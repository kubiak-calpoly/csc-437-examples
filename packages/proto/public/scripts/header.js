import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class HeaderElement extends HTMLElement {
  static template = html`<template>
    <header>
      <h1>Blazing Travels</h1>

      <p><slot> Unnamed Tour </slot></p>
    </header>
  </template>`;

  static styles = css`
    :host {
      display: contents;
    }
    header {
      --color-link: var(--color-link-inverted);

      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(
        reset.styles,
        headings.styles,
        HeaderElement.styles
      );
  }
}
