import {
  Auth,
  define,
  Dropdown,
  Events,
  Observer,
  View
} from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import headings from "../styles/headings.css";
import reset from "../styles/reset.css";
import {Tour, Traveler} from "server/models";
import {Model} from "../model.ts";
import {Msg} from "../messages.ts";

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class HeaderElement extends View<Model, Msg> {
  static uses = define({
    "mu-dropdown": Dropdown.Element
  });

  @state()
  loggedIn = false;

  @state()
  userid?: string = "traveler";

  @state()
  get profile(): Traveler | undefined {
    return this.model.profile;
  }

  @state()
  get tour(): Tour | undefined {
    return this.model.tour;
  }

  constructor() {
    super("blazing:model");
  }

  protected render() {
    const { userid, name, nickname } = this.profile || {};
    const tourName = this.tour?.name;
    const userName = userid === this.userid ?
      nickname || name?.split(" ")[0] || userid :
      this.userid;

    console.log("Rendering header element", this.userid, this.profile);

    return html` <header>
      <h1>Blazing Travels</h1>
      <nav class=${this.loggedIn ? 'logged-in' : 'logged-out'}>
        <p><slot>${tourName || ""}</slot></p>
        <mu-dropdown>
          <a slot="actuator">
            Hello,
            <span id="userid">${userName || "Traveler"}</span>
          </a>
          <menu>
            <li>
              <a href="/app/profile/${this.userid}">
                View Profile
              </a>
            </li>
            <li>
              <a href="/app/profile/${this.userid}/edit">
                Edit Profile
              </a>
            </li>
            <li>
              <label @change=${toggleDarkMode}>
                <input type="checkbox" />
                Dark Mode
              </label>
            </li>
            <li class="when-signed-in">
              <a id="signout" @click=${signOut}>Sign Out</a>
            </li>
            <li class="when-signed-out">
              <a href="/login.html">Sign In</a>
            </li>
          </menu>
        </mu-dropdown>
      </nav>
    </header>`;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
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
      menu a {
        color: var(--color-link);
        cursor: pointer;
        text-decoration: underline;
      }
      nav.logged-out .when-signed-in,
      nav.logged-in .when-signed-out {
        display: none;
      }
    `
  ];

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe(({ user }) => {
      if (user && user.authenticated ) {
        this.loggedIn = true;
        this.userid = user.username;

        this.dispatchMessage(["profile/select", {userid: this.userid}]);
      } else {
        this.loggedIn = false;
        this.userid = undefined;
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
