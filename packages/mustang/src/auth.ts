import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createContext, provide } from "@lit/context";
import { jwtDecode } from "jwt-decode";
import { ObservableElement } from "./observer";

const TOKEN_KEY = "mu:auth:jwt";

export interface LoginCredential {
  username: string;
  pwd: string;
}

export class APIUser {
  authenticated = false;
  username = "anonymous";
  signOut = () => {};

  static deauthenticate(user: APIUser) {
    const anon = new APIUser();
    localStorage.removeItem(TOKEN_KEY);
    return anon;
  }
}

export class AuthenticatedUser extends APIUser {
  token: string | undefined;

  constructor(token: string, signOut: () => void) {
    super();
    const jsonPayload = jwtDecode(token) as LoginCredential;

    console.log("Token payload", jsonPayload);
    this.token = token;
    this.authenticated = true;
    this.username = jsonPayload.username;
    this.signOut = signOut;
  }

  static authenticate(token: string, signOut: () => void) {
    const authenticatedUser = new AuthenticatedUser(
      token,
      signOut
    );
    localStorage.setItem(TOKEN_KEY, token);
    return authenticatedUser;
  }

  static authenticateFromLocalStorage(signOut: () => void) {
    const priorToken = localStorage.getItem(TOKEN_KEY);

    return priorToken
      ? AuthenticatedUser.authenticate(priorToken, signOut)
      : new APIUser();
  }
}

export interface AuthContext {
  user: APIUser;
}

export class Auth extends ObservableElement<AuthContext> {
  @state()
  loginStatus: number = 0;

  @state()
  registerStatus: number = 0;

  get user() {
    return this.subject.user;
  }

  isAuthenticated() {
    return this.user.authenticated;
  }

  constructor() {
    super({
      user: AuthenticatedUser.authenticateFromLocalStorage(() =>
        this._signOut()
      )
    });
  }

  firstUpdated() {
    this._toggleDialog(!this.isAuthenticated());
  }

  render() {
    console.log("Rendering mu-auth", this.user);

    const dialog = html`
      <dialog ?open=${!this.isAuthenticated}>
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
          <p>
            ${this.loginStatus
              ? `Login failed: ${this.loginStatus}`
              : ""}
          </p>
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
          <p>
            ${this.registerStatus
              ? `Signup failed: ${this.registerStatus}`
              : ""}
          </p>
          <p></p>
        </form>
      </dialog>
    `;

    return html`
      ${dialog}
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      display: contents;
    }
    dialog[open] {
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
    const json = Object.fromEntries(data);
    const root = window.location.origin;

    fetch(`${root}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
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
          this.subject.user = AuthenticatedUser.authenticate(
            json.token,
            () => this._signOut()
          );
          console.log("Providing auth user:", this.user);
          this._toggleDialog(false);
          this.requestUpdate();
        }
      });
  }

  _handleRegister(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const json = Object.fromEntries(data);
    const root = window.location.origin;

    fetch(`${root}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
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
    this.subject.user = APIUser.deauthenticate(this.user);
    this._toggleDialog(!this.isAuthenticated());
    document.location.reload();
  }
}
