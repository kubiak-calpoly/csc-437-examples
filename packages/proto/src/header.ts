import {
  define,
  Dropdown,
  Events
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.ts";
import headings from "./styles/headings.css.ts";

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
                <label class="dark-mode-switch" 
                  @change=${(event: Event) => Events.relay(
                    event, "dark-mode", {
                    checked: (event.target as HTMLInputElement)?.checked
                  })
                }
                >
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
  `];

  static initializeOnce() {
    function toggleDarkMode(page: HTMLElement | null, checked: any) {
      page?.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event: Event) =>
      toggleDarkMode(event.currentTarget as HTMLElement,
        (event as CustomEvent).detail.checked)
    );
  }
}
