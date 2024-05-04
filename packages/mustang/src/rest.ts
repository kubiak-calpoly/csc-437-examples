import { APIUser, AuthenticatedUser } from "./auth";

const SERVER_ROOT = window.location.origin;
const API_PATH = "/api";

export class JSONRequest {
  json: Object | undefined;
  user: AuthenticatedUser | undefined;
  _base = API_PATH;

  constructor(body: Object | undefined) {
    this.json = body;
  }

  base(newBase: string = "") {
    this._base = newBase;
    return this;
  }

  get(endpoint: string): Promise<Response> {
    return fetch(this._url(endpoint), {
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json)
    });
  }

  post(endpoint: string) {
    return fetch(this._url(endpoint), {
      method: "POST",
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json)
    });
  }

  put(endpoint: string) {
    return fetch(this._url(endpoint), {
      method: "PUT",
      headers: this._headers(),
      body: this.json && JSON.stringify(this.json)
    });
  }

  _headers() {
    const hasBody = this.json !== undefined;
    const isAuthenticated = false; // APIUser._theUser.authenticated;
    const contentType = { "Content-Type": "application/json" };

    if (isAuthenticated) {
      const token = "NO TOKEN"; //(APIUser._theUser as AuthenticatedUser).token;
      const authorization = {
        Authorization: `Bearer ${token}`
      };
      if (hasBody) return { ...contentType, ...authorization };
      else return authorization;
    } else {
      if (hasBody) return { ...contentType };
      else return undefined;
    }
  }

  _url(path: string) {
    return `${SERVER_ROOT}${this._base}${path}`;
  }
}

export class FormDataRequest extends JSONRequest {
  constructor(body: FormData) {
    super(Object.fromEntries(body));
  }
}

export class APIRequest extends JSONRequest {
  constructor() {
    super(undefined);
  }
}
