import {
  css,
  html,
  shadow,
} from "@unbndl/html";
import {
  Auth,
  fromAuth
} from "@unbndl/auth";
import {
  createView,
  createViewModel
} from "@unbndl/view";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";

interface HeaderModel {
  authenticated: boolean;
  username?: string;
}

export class HeaderElement extends HTMLElement {
  viewModel = createViewModel<HeaderModel>({
    authenticated: false
  }).with(fromAuth(this), "authenticated", "username");

  view = createView<HeaderModel>(html`
    <header>
      <h1>Blazing Travels</h1>
      <nav
        class=${($) =>
          $.authenticated ? "logged-in" : "logged-out"}>
        <p>Hello, ${($) => $.username || "traveler"}</p>
        <menu>
          <li class="when-signed-in">
            <a>Sign Out</a>
          </li>
          <li class="when-signed-out">
            <a href="/login.html">Sign In</a>
          </li>
        </menu>
      </nav>
    </header>
  `);

  static styles = css`
    :host {
      display: contents;
    }
    header {
      display: flex;
      grid-column: start / end;
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
    header p {
      --color-link: var(--color-link-inverted);
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
    menu {
      display: flex;
      flex-direction: row;
      gap: 1em;
    }
    menu a {
      color: var(--color-link-inverted);
      cursor: pointer;
      text-decoration: none;
    }
    nav.logged-out .when-signed-in,
    nav.logged-in .when-signed-out {
      display: none;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .styles(
        reset.styles,
        headings.styles,
        HeaderElement.styles
      )
      .replace(this.viewModel.render(this.view))
      .delegate(".when-signed-in a", {
        click: () => this.signout()
      });
  }

  signout() {
    const customEvent = new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signout"]
    });
    this.dispatchEvent(customEvent);
    Auth.dispatch(this, "auth/signout");
  }
}
