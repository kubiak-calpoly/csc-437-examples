import { prepareTemplate } from "./template.js";

export class RestfulFormElement extends HTMLElement {
  get form() {
    return this.querySelector("form");
  }

  get src() {
    return this.getAttribute("src");
  }

  get isNew() {
    return this.hasAttribute("new");
  }

  constructor() {
    super();
    this.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(
        this.src,
        this.form,
        this.isNew ? "POST" : "PUT"
      );
    });
    this.addEventListener("restful-form:delete", (event) => {
      event.stopPropagation();
      deleteResource(this.src, this.form);
    });
  }

  connectedCallback() {
    this.form.reset();
    if (!this.isNew) loadForm(this.src, this.form);
  }
}

customElements.define("restful-form", RestfulFormElement);

export function loadForm(src, form) {
  fetch(src)
    .then((response) => {
      if (response.status !== 200) {
        throw `Status: ${response.status}`;
      }
      return response.json();
    })
    .then((json) => populateForm(json, form))
    .catch((error) =>
      console.log(`Failed to load form from ${src}:`, error)
    );
}

function populateForm(json, form) {
  const entries = Object.entries(json);

  for (const [key, val] of entries) {
    const input = form.elements[key];

    if (input) {
      switch (input.type) {
        case "checkbox":
          input.checked = Boolean(value);
          break;
        default:
          input.value = val.toString();
          break;
      }
    }
  }
}

function submitForm(src, form, method = "PUT") {
  const formData = new FormData(form);
  const json = Object.fromEntries(formData);

  fetch(src, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  })
    .then((res) => {
      if (res.status != 200)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((json) => populateForm(json, form))
    .catch((err) => console.log("Error submitting form:", err));
}

function deleteResource(src, form) {
  fetch(src, { method: "DELETE" })
    .then((res) => {
      if (res.status != 204)
        throw `Deletion failed: Status ${res.status}`;
      form.reset();
    })
    .catch((err) =>
      console.log("Error deleting resource:", err)
    );
}
