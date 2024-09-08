import {
  Auth,
  css,
  define,
  Dropdown,
  Events,
  html,
  Observer,
  shadow
} from "@calpoly/mustang";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";

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
          <a slot="actuator">
            Hello,
            <span id="userid"></span>
          </a>
          <menu>
            <li>
              <label class="dark-mode-switch">
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout">Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login">Sign In</a>
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
    menu a {
      color: var(--color-link);
      cursor: pointer;
      text-decoration: underline;
    }
    a:has(#userid:empty) ~ menu > .when-signed-in,
    a:has(#userid:not(:empty)) ~ menu > .when-signed-out {
      display: none;
    }
  `;

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );
  _userid: HTMLElement | null;
  _signout: HTMLButtonElement | null;

  get userid() {
    return this._userid?.textContent;
  }

  set userid(id) {
    if (!id || id === "anonymous") {
      if (this._userid) this._userid.textContent = "";
      if (this._signout) this._signout.disabled = true;
    } else {
      if (this._userid) this._userid.textContent = id;
      if (this._signout) this._signout.disabled = false;
    }
  }

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(
        reset.styles,
        headings.styles,
        HeaderElement.styles
      );

    const dm = this.shadowRoot?.querySelector(
      ".dark-mode-switch"
    );

    if (dm) {
      dm.addEventListener("click", (event) =>
        Events.relay(event, "dark-mode", {
          checked: (event.target as HTMLInputElement).checked
        })
      );
    }

    this._userid =
      this.shadowRoot?.querySelector("#userid") || null;
    this._signout =
      this.shadowRoot?.querySelector("#signout") || null;

    this._signout?.addEventListener("click", (event) =>
      Events.relay(event, "auth:message", ["auth/signout"])
    );
  }

  connectedCallback() {
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
