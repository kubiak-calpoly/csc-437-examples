import {
  css,
  define,
  html,
  shadow,
  Dropdown
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class HeaderElement extends HTMLElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  static template = html`<template>
    <header>
      <h1>Blazing Travels</h1>
      <nav>
        <p><slot> Unnamed Tour </slot></p>
        <mu-dropdown></mu-dropdown>
      </nav>
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
      align-items: bottom;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header ~ * {
      margin: var(--size-spacing-medium);
    }
    nav {
      display: flex;
      flex-direction: column;
      flex-basis: max-content;
      align-items: end;
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
