import {
  Auth,
  define,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import headingsCSS from "../styles/headings.css";
import resetCSS from "../styles/reset.css";

export class HeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  render() {
    return html`
      <header>
        <h1>Blazing Travels</h1>
        <nav>
          <mu-dropdown>
            <a slot="actuator">
              Hello,
              <span id="userid">${this.userid}</span>
            </a>
            <menu>
              <li>
                <label
                  class="dark-mode-switch"
                  @click=${(event: InputEvent) =>
        Events.relay(event, "dark-mode", {
          checked: (
            event.target as HTMLInputElement
          ).checked
        })}>
                  <input type="checkbox" />
                  Dark Mode
                </label>
              </li>
              <li class="when-signed-in">
                <a
                  id="signout"
                  @click=${(event: InputEvent) =>
        Events.relay(event, "auth:message", [
          "auth/signout"
        ])}
                  >Sign Out</a
                >
              </li>
              <li class="when-signed-out">
                <a href="/login">Sign In</a>
              </li>
            </menu>
          </mu-dropdown>
        </nav>
      </header>
    `;
  }

  static styles = [
    resetCSS,
    headingsCSS,
    css`
      :host {
        display: contents;
      }
      header {
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
      nav {
        display: flex;
        flex-direction: column;
        flex-basis: max-content;
        align-items: end;
      }
      a[slot="actuator"] {
        color: var(--color-link-inverted);
        cursor: pointer;
      }
      #userid:empty::before {
        content: "traveler";
      }
      menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }
      a:has(#userid:empty) ~ menu > .when-signed-in,
      a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
        display: none;
      }
    `
  ];

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  @state()
  userid: String = "";

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
    });
  }

  static initializeOnce() {
    function toggleDarkMode(
      page: HTMLElement,
      checked: boolean
    ) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}
