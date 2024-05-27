import {
  Auth,
  Dropdown,
  Events,
  Observer,
  View,
  define
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import { ProfileAvatarElement } from "./profile-avatar";

export class BlazingHeaderElement extends View<Model, Msg> {
  static uses = define({
    "drop-down": Dropdown.Element,
    "profile-avatar": ProfileAvatarElement
  });

  @property()
  username = "anonymous";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.dispatchMessage([
          "profile/select",
          { userid: this.username }
        ]);
      }
    });
  }

  render() {
    const { avatar, name, nickname, userid, color } =
      this.profile || {};
    const initial = (nickname || name || userid || "?").slice(
      0,
      1
    );

    console.log("Rendering header for Profile:", this.profile);

    return html`
      <header>
        <h1><a href="/app">Blazing Travels</a></h1>
        <drop-down>
          <a href="#" slot="actuator">
            <slot name="greeting">Hello, ${this.username}</slot>
          </a>
          <ul>
            <li>
              <profile-avatar
                color=${color}
                src=${avatar}
                initial="${initial}"></profile-avatar>
            </li>
            <li><h3>${name || nickname || userid}</h3></li>
            <li>
              <label @change=${toggleDarkMode}>
                <input type="checkbox" autocomplete="off" />
                Dark mode
              </label>
            </li>
            <li>
              <a href="#" @click=${signOutUser}>Sign out</a>
            </li>
          </ul>
        </drop-down>
      </header>
    `;
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
    a[href] {
      color: var(--color-link-inverted);
    }
    drop-down a[href]:not([slot="actuator"]) {
      color: var(--color-link);
    }
    h1 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-xxlarge);
      font-style: oblique;
      line-height: 1;
      font-weight: var(--font-weight-bold);
    }
    h1 a[href] {
      text-decoration: none;
      color: inherit;
    }
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      width: min-content;
    }
    ul {
      list-style: none;
      padding: var(--size-spacing-medium);
    }
  `;

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );
}

type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}
