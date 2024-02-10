import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createContext, provide } from "@lit/context";
import {
  APIUser,
  AuthenticatedUser,
  FormDataRequest
} from "../rest";

export let authContext = createContext<APIUser>(Symbol("auth"));

@customElement("auth-required")
export class AuthRequiredElement extends LitElement {
  @state()
  loginStatus: number = 0;

  @state()
  registerStatus: number = 0;

  @provide({ context: authContext })
  @state()
  user: APIUser =
    AuthenticatedUser.authenticateFromLocalStorage(() =>
      this._signOut()
    );

  isAuthenticated() {
    return this.user.authenticated;
  }

  firstUpdated() {
    this._toggleDialog(!this.isAuthenticated());
  }

  render() {
    //console.log("Rendering auth-required", this.user);

    const dialog = html`
      <dialog>
        <form
          @submit=${this._handleLogin}
          @change=${() => (this.loginStatus = 0)}>
          <h2>Existing User</h2>
          <label>
            <span>Username</span>
            <input name="username" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="pwd" />
          </label>
          <button type="submit">Sign in</button>
          <p
            >${this.loginStatus
              ? `Login failed: ${this.loginStatus}`
              : ""}</p
          >
        </form>
        <form
          @submit=${this._handleRegister}
          @change=${(this.registerStatus = 0)}>
          <h2>New User</h2>
          <label>
            <span>Username</span>
            <input name="username" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="pwd" />
          </label>
          <button type="submit">Register</button>
          <p
            >${this.registerStatus
              ? `Signup failed: ${this.registerStatus}`
              : ""}</p
          >
          <p></p>
        </form>
      </dialog>
    `;

    return html`${this.isAuthenticated() ? "" : dialog}
      <slot></slot>`;
  }

  static styles = css`
    dialog {
      display: flex;
      gap: 4rem;
    }
    form {
      display: grid;
      grid-template-columns: [start] 1fr 2fr [end];
      align-items: baseline;
    }
    form > label {
      display: contents;
    }
    form > h2 {
      grid-column: start / end;
      text-align: center;
    }
    input,
    button {
      font: inherit;
      line-height: inherit;
      margin: 0.25em;
    }
    button {
      grid-column: 2;
    }
  `;

  _handleLogin(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const request = new FormDataRequest(data);

    request
      .base()
      .post("/login")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.loginStatus = res.status;
        }
      })
      .then((json) => {
        if (json) {
          console.log("Authentication:", json.token);
          this.user = AuthenticatedUser.authenticate(
            json.token,
            () => this._signOut()
          );
          this._toggleDialog(false);
          this.requestUpdate();
        }
      });
  }

  _handleRegister(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const request = new FormDataRequest(data);

    request
      .base()
      .post("/signup")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          this.registerStatus = res.status;
        }
      })
      .then((json) => {
        console.log("Registration:", json);
      });
  }

  _toggleDialog(open: boolean) {
    const dialog = this.shadowRoot?.querySelector(
      "dialog"
    ) as HTMLDialogElement | null;
    if (dialog) {
      if (open) {
        console.log("Showing dialog");
        dialog.showModal();
      } else {
        console.log("Closing dialog");
        dialog.close();
      }
    }
  }

  _signOut() {
    this.user = APIUser.deauthenticate(this.user);
    this._toggleDialog(!this.isAuthenticated());
    document.location.reload();
  }
}
