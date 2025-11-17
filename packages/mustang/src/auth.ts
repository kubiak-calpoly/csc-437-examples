import { jwtDecode } from "jwt-decode";
import { Context, Provider } from "./context";
import { None, dispatcher } from "./message";
import { Service } from "./service";
import { ThenUpdate } from "./update";

const TOKEN_KEY = "mu:auth:jwt";

interface AuthModel {
  user?: APIUser | AuthenticatedUser;
  token?: string;
}

interface AuthSuccessful {
  token: string;
  redirect?: string;
}

type AuthMsg =
  | ["auth/signin", AuthSuccessful]
  | ["auth/signout"]
  | ["auth/redirect"]

class AuthService extends Service<AuthMsg, AuthModel> {
  static EVENT_TYPE = "auth:message";

  _redirectForLogin: string | undefined;

  constructor(
    context: Context<AuthModel>,
    redirectForLogin: string | undefined
  ) {
    super(
      (msg, apply) => this.update(msg, apply),
      context,
      AuthService.EVENT_TYPE
    );
    this._redirectForLogin = redirectForLogin;
  }

  update(
    message: AuthMsg,
    model: AuthModel
  ): AuthModel | ThenUpdate<AuthModel, AuthMsg> {
    switch (message[0]) {
      case "auth/signin": {
        const { token, redirect } = message[1];
        return [
          signIn(token),
          thenRedirect(redirect)
        ];
      }
      case "auth/signout":
        return [
          signOut(model.user),
          thenRedirect(this._redirectForLogin)
        ];
      case "auth/redirect":
        return [
          model,
          thenRedirect(
            this._redirectForLogin,
            {
              next: window.location.href
            }
          )
        ];
      default:
        const unhandled: never = message[0];
        throw new Error(
          `Unhandled Auth message "${unhandled}"`
        );
    }
  }
}

const dispatch = dispatcher<AuthMsg>(AuthService.EVENT_TYPE);

function thenRedirect(
  redirect?: string,
  query?: { [key: string]: string }
): Promise<None> {
  return new Promise((resolve, _) => {
    if (redirect) {
      const base = window.location.href;
      const target = new URL(redirect, base);

      if (query) {
        Object.entries(query).forEach(([k, v]) =>
          target.searchParams.set(k, v)
        );
      }

      console.log("Redirecting to ", redirect);
      window.location.assign(target);
    }
    resolve([]);
  });
}

class AuthProvider extends Provider<AuthModel> {
  get redirect() {
    return this.getAttribute("redirect") || undefined;
  }

  constructor() {
    const user =
      AuthenticatedUser.authenticateFromLocalStorage();
    super({
      user,
      token: user.authenticated
        ? (user as AuthenticatedUser).token
        : undefined
    });
  }

  connectedCallback() {
    const service = new AuthService(
      this.context,
      this.redirect
    );
    service.attach(this);
  }
}

class APIUser {
  authenticated = false;
  username = "anonymous";

  static deauthenticate(user: APIUser) {
    user.authenticated = false;
    user.username = "anonymous";
    localStorage.removeItem(TOKEN_KEY);
    return user;
  }
}

interface PayloadModel {
  username: string;
}

class AuthenticatedUser extends APIUser {
  token: string | undefined;

  constructor(token: string) {
    super();
    const jsonPayload = jwtDecode(token) as PayloadModel;
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

function signIn(token: string): AuthModel {
  return {
    user: AuthenticatedUser.authenticate(token),
    token
  };
}

function signOut(oldUser?: APIUser): AuthModel {
    return {
      user:
        oldUser && oldUser.authenticated
          ? APIUser.deauthenticate(oldUser)
          : oldUser,
      token: ""
    };
}

function authHeaders(user?: APIUser | AuthenticatedUser): {
  Authorization?: string;
} {
  if (user && user.authenticated) {
    const authUser = user as AuthenticatedUser;
    return {
      Authorization: `Bearer ${authUser.token || "NO_TOKEN"}`
    };
  } else {
    return {};
  }
}

function tokenPayload(
  user: APIUser | AuthenticatedUser
): object {
  if (user.authenticated) {
    const authUser = user as AuthenticatedUser;
    return jwtDecode(authUser.token || "");
  } else {
    return {};
  }
}

export {
  AuthenticatedUser, dispatch,
  authHeaders as headers,
  tokenPayload as payload, AuthProvider as Provider,
  APIUser as User, type AuthSuccessful,
  type AuthModel as Model,
  type AuthMsg as Msg,
  type AuthService as Service
};
