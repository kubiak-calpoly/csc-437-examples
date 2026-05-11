import { css, Events, html, shadow } from "@unbndl/html";
import { createView, createViewModel } from "@unbndl/view";
import { fromAuth } from "@unbndl/auth";
import reset from "./reset.css.js";

export class BlzHeaderElement extends HTMLElement {

  viewModel = createViewModel({
    authenticated: false
  }).with(fromAuth(this), "authenticated", "username");

  view = createView(html`
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

  constructor() {
    super();

    shadow(this)
      .styles(
        reset.styles,
        BlzHeaderElement.styles
      )
      .replace(this.viewModel.render(this.view))
      .delegate(".when-signed-in a", {
        click: () => this.signout()
      });
  }

  static styles = css`
        :host {
          display: contents;
        }

        * {
          margin: 0;
          box-sizing: border-box;
        }

        header {
          grid-column: start / end;
          margin: 0 calc(-0.5 * var(--page-grid-gap));
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: var(--size-spacing-medium);
          /* flex-wrap: wrap;
          gap: var(--size-spacing-xlarge); */
          background-color: var(--color-background-header);
          color: var(--color-text-inverted);
        }

        header a[href] {
          color: var(--color-link-inverted);
        }

        h1 {
          font-family: var(--font-family-display);
          line-height: var(--font-line-height-display);
          font-size: var(--size-type-xxlarge);
          font-style: oblique;
          line-height: 1;
          font-weight: var(--font-weight-bold);
        }

        ul {
          list-style: none;
          padding: var(--size-spacing-medium);
        }
     `;

  static {
    window.Events = Events;

    const page = document.body;

    page.addEventListener("dark-mode",
      (ev) => {
        page.classList.toggle("dark-mode", ev.detail.checked);
      }
    )
  }
}
