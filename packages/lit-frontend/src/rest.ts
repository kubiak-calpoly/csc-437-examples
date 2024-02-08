const SERVER_ROOT = "http://localhost:3000";
const API_PATH = "/api";

export function serverPath(
  path: string,
  absolute: boolean = false
) {
  return `${SERVER_ROOT}${absolute ? "" : API_PATH}${path}`;
}

export class JSONRequest {
  json: Object;

  constructor(json: Object) {
    this.json = json;
  }

  post(endpoint: string, absolute = false) {
    return fetch(serverPath(endpoint, absolute), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.json)
    });
  }

  put(endpoint: string) {
    return fetch(serverPath(endpoint), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.json)
    });
  }
}

export class FormDataRequest extends JSONRequest {
  constructor(formData: FormData) {
    super(Object.fromEntries(formData));
  }
}
