import { Auth, Observer, define } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { DropdownElement } from "./drop-down";

define({ "drop-down": DropdownElement });

export class BlazingHeaderElement extends LitElement {
  render() {
    return html`<header>
      <h1>Blazing Travels</h1>
      <drop-down>
        <a href="#" slot="actuator">
          <slot name="greeting">Hello, user</slot></a
        >
        <ul>
          <li>
            <label
              onchange="relayEvent(event, 'dark-mode', 
                {checked: event.target.checked})">
              <input type="checkbox" autocomplete="off" />
              Dark mode
            </label>
          </li>
          <li>
            <a
              href="#"
              onclick="relayEvent(event, 'auth:message', ['auth/signout'])"
              >Sign out</a
            >
          </li>
        </ul>
      </drop-down>
    </header> `;
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

  _authObserver = new Observer(this, "blazing:auth");

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }: Auth.Model) => {
      if (user) {
        const { username } = user;
        console.log("Hello, ", username);
      }
    });
  }
}
