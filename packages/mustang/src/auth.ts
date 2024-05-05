import { jwtDecode } from "jwt-decode";
import { Context, Provider } from "./context";
import { dispatcher } from "./message";
import { Service } from "./service";
import { Update, replace } from "./update";

const TOKEN_KEY = "mu:auth:jwt";

interface AuthModel {
  user?: APIUser;
  token?: string;
}

interface AuthSuccessful {
  token: string;
  redirect?: string;
}

type AuthMsg =
  | ["auth/signin", AuthSuccessful]
  | ["auth/signout"];

class AuthService extends Service<AuthMsg, AuthModel> {
  static EVENT_TYPE = "auth:message";

  constructor(context: Context<AuthModel>) {
    super(update, context, AuthService.EVENT_TYPE);
  }

  static dispatch = dispatcher(AuthService.EVENT_TYPE);
}

const update: Update<AuthMsg, AuthModel> = (message, apply) => {
  switch (message[0]) {
    case "auth/signin":
      const { token, redirect } = message[1] as AuthSuccessful;
      apply(signIn(token));
      return redirect
        ? () => {
          console.log("Redirecting to ", redirect);
          window.location.assign(redirect);
        }
        : undefined;
    case "auth/signout":
      apply(signOut());
      return;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
};

class AuthProvider extends Provider<AuthModel> {
  constructor() {
    super({
      user: AuthenticatedUser.authenticateFromLocalStorage()
    });
    const service = new AuthService(this.context);
    service.attach(this);
  }
}

class APIUser {
  authenticated = false;
  username = "anonymous";

  static deauthenticate(user: AuthenticatedUser) {
    user.authenticated = false;
    user.username = "anonymous";
    localStorage.removeItem(TOKEN_KEY);
    return user;
  }
}

interface TokenModel {
  username: string;
}

class AuthenticatedUser extends APIUser {
  token: string | undefined;

  constructor(token: string) {
    super();
    const jsonPayload = jwtDecode(token) as TokenModel;
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

function signIn(token: string) {
  return replace<AuthModel>({
    user: AuthenticatedUser.authenticate(token),
    token
  });
}

function signOut() {
  return replace<AuthModel>({ user: new APIUser(), token: "" });
}

export { AuthProvider as Provider, type AuthModel as Model };
