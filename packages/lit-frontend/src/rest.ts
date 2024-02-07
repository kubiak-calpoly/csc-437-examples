const API_ROOT = "http://localhost:3000/api";

export function serverPath(path: string) {
  return `${API_ROOT}${path}`;
}

export class FormDataRequest {
  json: Object;

  constructor(formData: FormData) {
    console.log(
      "FormData entries: ",
      Array.from(formData.entries())
    );

    this.json = Object.fromEntries(formData);
    console.log("FormData as JSON: ", this.json);
  }

  post(endpoint: string) {
    return fetch(serverPath(endpoint), {
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
