import { jwtDecode } from "jwt-decode";
import { Provider } from "./context";
import { Dispatch } from "./message";

const TOKEN_KEY = "mu:auth:jwt";

export interface AuthContext {
  user?: APIUser;
  token?: string;
}

export interface AuthAttempt {
  credentials: LoginCredential;
}

export interface AuthRegister {
  credentials: LoginCredential;
}

export type AuthMsg =
  | ["auth/signin", AuthAttempt]
  | ["auth/signup", AuthRegister]
  | ["auth/signout"];

export class AuthElement extends Provider<AuthContext> {
  static EVENT_TYPE = "auth:message";

  static dispatch(target: HTMLElement, ...msg: AuthMsg) {
    target.dispatchEvent(
      new Dispatch<AuthMsg>(msg, AuthElement.EVENT_TYPE)
    );
  }

  constructor() {
    super({ user: new APIUser() });
    this.addEventListener(
      AuthElement.EVENT_TYPE,
      (ev: Event) => {
        const message = (ev as Dispatch<AuthMsg>).detail;
        switch (message[0]) {
          case "auth/signin":
            return this._authUser(message[1] as AuthAttempt);
          case "auth/signup":
            return this._registerUser(
              message[1] as AuthRegister
            );
          case "auth/signout":
            return this._signOut();
          default:
            const unhandled: never = message[0];
            throw new Error(
              `Unhandled Auth message "${unhandled}"`
            );
        }
      }
    );
  }

  _signOut() {
    //this.context.user = APIUser.deauthenticate(this.context.user);
  }

  _authUser(msg: AuthAttempt) {
    const root = window.location.origin;

    fetch(`${root}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg)
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return undefined;
      })
      .then((json) => {
        if (json) {
          console.log("Authentication:", json.token);
          this.context.user = AuthenticatedUser.authenticate(
            json.token,
            () => this._signOut()
          );
          console.log(
            "Providing auth user:",
            this.context.user
          );
        }
      });
  }

  _registerUser(msg: AuthRegister) {
    const root = window.location.origin;

    fetch(`${root}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg)
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return undefined;
      })
      .then((json) => {
        console.log("Registration:", json);
      });
  }
}

export interface LoginCredential {
  username: string;
  pwd: string;
}

export class APIUser {
  authenticated = false;
  username = "anonymous";

  static deauthenticate(user: AuthenticatedUser) {
    user.authenticated = false;
    user.username = "anonymous";
    localStorage.removeItem(TOKEN_KEY);
    return user;
  }
}

export class AuthenticatedUser extends APIUser {
  token: string | undefined;
  signOut = () => { };

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
