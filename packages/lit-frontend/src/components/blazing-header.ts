import { css, html, LitElement, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import {
  AuthContext,
  APIUser,
  APIRequest,
  ContextObserver
} from "@calpoly/mustang";
import { Profile } from "ts-models";
import "./drop-down";
import "./user-panel";
import resetCSS from "/src/styles/reset.css?inline";

export class BlazingHeaderElement extends LitElement {
  @state()
  profile?: Profile;

  @property({ attribute: false })
  user: APIUser = new APIUser();

  _authObserver = new ContextObserver<AuthContext>(
    this,
    "blazing:auth"
  );

  connectedCallback() {
    super.connectedCallback();
    console.log("Bl-Header connectedCallback", this);
    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        console.log("Setting user as effect of change", user);
        this.user = user;
      });
      console.log("Bl-Header setEffect", this.user);
    });
  }

  render() {
    console.log("Rendering header:", this.user);
    const { avatar, name, nickname, userid, color } =
      this.profile || {};
    const shortname =
      nickname ||
      (name && name.split(" ")[0]) ||
      this.user.username;
    const authenticated = this.user.authenticated;
    const welcome = authenticated
      ? html`
          <span>Hello,</span>
          <drop-down align="right">
            ${shortname}
            <user-panel
              slot="menu"
              avatar=${avatar}
              color=${color}
              userid=${userid}>
              <span slot="name">${name}</span>
              <button slot="logout" @click=${this._signOut}>
                Log out...
              </button>
            </user-panel>
          </drop-down>
        `
      : "Not logged in";

    return html`
      <header>
        <h1>Blazing Travels</h1>
        <p>${welcome}</p>
      </header>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    css`
      header {
        grid-area: header;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        gap: 0 var(--size-spacing-xlarge);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
      }
      header * + :last-child {
        flex-grow: 1;
        text-align: right;
      }
      header h1 {
        white-space: nowrap;
      }
      header a[href] {
        color: var(--color-link-inverted);
      }
      h1 {
        font-size: var(--size-type-xxlarge);
        font-style: oblique;
        font-weight: var(--font-weight-bold);
        font-family: var(--font-family-display);
        line-height: var(--font-line-height-display);
      }
      [slot="logout"] a {
        color: var(--color-accent);
        cursor: pointer;
        font-weight: var(--font-weight-bold);
      }
    `
  ];

  updated(changedProperties: Map<string, unknown>) {
    console.log(
      "Profile Data has been updated",
      changedProperties
    );
    if (changedProperties.has("user")) {
      console.log("New user", this.user);
      const { username } = this.user;
      this._getData(`/profiles/${username}`);
    }
    return true;
  }

  _getData(path: string) {
    const request = new APIRequest();

    request
      .get(path)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        console.log("Profile:", json);
        this.profile = json as Profile;
      });
  }

  _signOut() {
    console.log("Signout");
    this.user.signOut();
  }
}
