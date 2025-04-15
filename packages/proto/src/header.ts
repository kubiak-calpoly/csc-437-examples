import {
  define,
  Dropdown,
  Events
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class HeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  render() {
    return html`
      <header>
        <h1>Blazing Travels</h1>
        <nav>
          <p>
            <slot> Unnamed Tour</slot>
          </p>
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
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
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
  }
}
