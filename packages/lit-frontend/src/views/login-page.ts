import {
  APIUser,
  AuthContext,
  AuthElement,
  LoginCredential,
  Observer
} from "@calpoly/mustang";
import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";

export class LoginPageElement extends LitElement {
  _authContext = new Observer<AuthContext>(this, "blz:auth");

  @state()
  loginStatus = 0;

  @state()
  registerStatus = 0;

  @state()
  user?: APIUser;

  isAuthenticated() {
    return this.user?.authenticated;
  }

  firstUpdated() {
    this._toggleDialog(!this.isAuthenticated());
  }

  render() {
    console.log("Rendering Login Page", this.user);

    const dialog = html`
      <dialog ?open=${!this.isAuthenticated()}>
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
    const credentials = credentialsFromForm(form);

    AuthElement.dispatch(this, "auth/signin", {
      credentials
    });
  }

  _handleRegister(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const credentials = credentialsFromForm(form);

    AuthElement.dispatch(this, "auth/signup", {
      credentials
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
}

function credentialsFromForm(form: HTMLFormElement) {
  let credentials: LoginCredential = {
    username: "",
    pwd: ""
  };
  const data = new FormData(form);
  Array.from(data).forEach(([k, v]) => {
    switch (k) {
      case "username":
        credentials.username = v as string;
        break;
      case "pwd":
        credentials.pwd = v as string;
        break;
    }
  });
  return credentials;
}
