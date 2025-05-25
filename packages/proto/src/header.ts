import {
  define,
  Auth,
  Dropdown,
  Events,
  Observer
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.ts";
import headings from "./styles/headings.css.ts";
import { state } from "lit/decorators.js";

export class HeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  render() {
    return html`
      <header>
        <h1>Blazing Travels</h1>
        <nav>
          <p>
            <slot> Unnamed Tour</slot>
          </p>
          <mu-dropdown>
            <a slot="actuator">
              Hello, ${this.userid || "traveler"}
            </a>
            <menu>
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
              <li>
                ${this.loggedIn ?
                  this.renderSignOutButton() :
                  this.renderSignInButton()
                }
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

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"])
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login.html">
        Sign In…
      </a>
    `;
  }

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated ) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }


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
