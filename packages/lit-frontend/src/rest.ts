import { createContext } from "@lit/context";

const SERVER_ROOT = "http://localhost:3000";
const API_PATH = "/api";

export class AuthenticatedUser {
  authenticated = false;
  token: string | undefined;

  constructor(token: string | undefined = undefined) {
    if (token) {
      this.token = token;
      this.authenticated = true;
    }
  }
}

export const authContext = createContext<AuthenticatedUser>(
  Symbol("auth")
);

export function serverPath(
  path: string,
  absolute: boolean = false
) {
  return `${SERVER_ROOT}${absolute ? "" : API_PATH}${path}`;
}

export class JSONRequest {
  json: Object | undefined;
  user: AuthenticatedUser | undefined;

  static ctHeader = { "Content-Type": "application/json" };

  constructor(json: Object | undefined = undefined) {
    this.json = json;
  }

  authenticate(user: AuthenticatedUser | undefined) {
    this.user = user;
    return this;
  }

  get(endpoint: string) {
    const headers = this.user
      ? {
          Authorization: `Bearer ${this.user?.token}`
        }
      : undefined;
    return fetch(serverPath(endpoint), { headers });
  }

  post(endpoint: string, absolute = false) {
    const headers = this.user
      ? {
          Authorization: `Bearer ${this.user?.token}`,
          ...JSONRequest.ctHeader
        }
      : JSONRequest.ctHeader;

    return fetch(serverPath(endpoint, absolute), {
      method: "POST",
      headers,
      body: JSON.stringify(this.json)
    });
  }

  put(endpoint: string) {
    const headers = this.user
      ? {
          Authorization: `Bearer ${this.user?.token}`,
          ...JSONRequest.ctHeader
        }
      : JSONRequest.ctHeader;

    return fetch(serverPath(endpoint), {
      method: "PUT",
      headers,
      body: JSON.stringify(this.json)
    });
  }
}

export class FormDataRequest extends JSONRequest {
  constructor(formData: FormData) {
    super(Object.fromEntries(formData));
  }
}
