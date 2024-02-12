// utils/form.js -- <form> utilities

// A Request object that contains a form's data
export class FormDataRequest {
  constructor(formData) {
    this.body = JSON.stringify(Object.fromEntries(formData));

    console.log("FormDataRequest", this.body);
  }

  post(url) {
    return fetch(url, {
      method: "POST",
      body: this.body,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
