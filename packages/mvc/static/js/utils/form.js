// utils/form.js -- <form> utilities

// A Request object that contains a form's data
export class FormDataRequest {
  constructor(formData) {
    this.data = formData;
  }

  post(url) {
    return fetch("url", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(this.data)),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
