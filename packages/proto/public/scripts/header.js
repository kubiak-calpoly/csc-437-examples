import {
  css,
  define,
  html,
  shadow,
  Dropdown,
  Events
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
        <mu-dropdown>
          <menu>
            <li>Hello, traveler</li>
            <li>
              <label class="dark-mode-switch">
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
          </menu>
        </mu-dropdown>
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

    const dm = this.shadowRoot.querySelector(
      ".dark-mode-switch"
    );

    dm.addEventListener("click", (event) =>
      Events.relay(event, "dark-mode", {
        checked: event.target.checked
      })
    );
  }

  static initializeOnce() {
    function toggleDarkMode(page, checked) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(event.currentTarget, event.detail.checked)
    );
  }
}
