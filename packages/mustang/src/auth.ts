import { jwtDecode } from "jwt-decode";
import { Context, Provider } from "./context";
import { dispatcher } from "./message";
import { Service } from "./service";
import { MapFn, Update, noUpdate, replace } from "./update";

const TOKEN_KEY = "mu:auth:jwt";

export interface AuthModel {
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

export class AuthService extends Service<AuthMsg, AuthModel> {
  static EVENT_TYPE = "auth:message";

  constructor(context: Context<AuthModel>) {
    super(update, context, AuthService.EVENT_TYPE);
  }

  static dispatch = dispatcher(AuthService.EVENT_TYPE);
}

const update: Update<AuthMsg, AuthModel> = (message, apply) => {
  switch (message[0]) {
    case "auth/signin":
      loginUser(message[1] as AuthAttempt).then(apply);
      return;
    case "auth/signup":
      registerUser(message[1] as AuthRegister).then(apply);
      return;
    case "auth/signout":
      apply(signOut());
      return;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
};

export class AuthElement extends Provider<AuthModel> {
  constructor() {
    super({ user: new APIUser() });
    const service = new AuthService(this.context);
    service.attach(this);
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

  constructor(token: string) {
    super();
    const jsonPayload = jwtDecode(token) as LoginCredential;
    console.log("Token payload", jsonPayload);
    this.token = token;
    this.authenticated = true;
    this.username = jsonPayload.username;
  }

  static authenticate(token: string) {
    const authenticatedUser = new AuthenticatedUser(token);
    localStorage.setItem(TOKEN_KEY, token);
    return authenticatedUser;
  }

  static authenticateFromLocalStorage() {
    const priorToken = localStorage.getItem(TOKEN_KEY);

    return priorToken
      ? AuthenticatedUser.authenticate(priorToken)
      : new APIUser();
  }
}

function loginUser(
  msg: AuthAttempt
): Promise<MapFn<AuthModel>> {
  const root = window.location.origin;

  return fetch(`${root}/login`, {
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
        const user = AuthenticatedUser.authenticate(json.token);
        const token = user ? (json.token as string) : "";
        console.log("Providing auth user:", user);
        return replace<AuthModel>({ user, token });
      } else {
        return noUpdate;
      }
    });
}

function registerUser(
  msg: AuthRegister
): Promise<MapFn<AuthModel>> {
  const root = window.location.origin;

  return fetch(`${root}/signup`, {
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
      return noUpdate;
    });
}

function signOut() {
  return replace<AuthModel>({ user: new APIUser(), token: "" });
}
