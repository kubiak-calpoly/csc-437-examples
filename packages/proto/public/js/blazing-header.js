import { Auth, Observer } from "@calpoly/mustang";
import { prepareTemplate } from "./template.js";
import { relayEvent } from "./relay-event.js";
import { addFragment } from "./html-loader.js";
import "./drop-down.js";

export class BlazingHeaderElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <header>
        <h1>Blazing Travels</h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, user</slot></a>
          <ul>
            <li>
              <label
                onchange="relayEvent(event, 'dark-mode', 
                  {checked: event.target.checked})"
                >
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
      </header>
      <style>
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
      </style>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      BlazingHeaderElement.template.cloneNode(true)
    );
  }

  _authObserver = new Observer(this, "blazing:auth");

  connectedCallback() {
    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        if (user) {
          const { username } = user;
          this.replaceChildren();
          addFragment(
            `<span slot="greeting">Hello, ${username}</span>`,
            this
          );
        }
      });
    });
  }
}

customElements.define("blazing-header", BlazingHeaderElement);
