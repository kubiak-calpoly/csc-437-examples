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
    this._state = {};
    this.addEventListener("submit", (event) => {
      event.preventDefault();
      submitForm(
        this.src,
        this._state,
        this.isNew ? "POST" : "PUT"
      ).then((json) => populateForm(json, this.form));
    });
    this.addEventListener("restful-form:delete", (event) => {
      event.stopPropagation();
      deleteResource(this.src, this.form);
    });
    this.addEventListener("change", (event) => {
      console.log("Change event on restful-form", event);
      const target = event.target;
      const name = target.name;
      const value = target.value;

      if (name) this._state[name] = value;
    });
  }

  connectedCallback() {
    this.form.reset();
    if (!this.isNew) {
      fetchData(this.src, this.form).then((json) => {
        this._state = json;
        populateForm(json, this.form);
      });
    }
  }
}

customElements.define("restful-form", RestfulFormElement);

export function fetchData(src) {
  return fetch(src)
    .then((response) => {
      if (response.status !== 200) {
        throw `Status: ${response.status}`;
      }
      return response.json();
    })
    .catch((error) =>
      console.log(`Failed to load form from ${src}:`, error)
    );
}

function populateForm(json, form) {
  const entries = Object.entries(json);

  for (const [key, val] of entries) {
    const input =
      form.elements[key] ||
      form.querySelector(`[name="${key}"]`);

    if (input) {
      switch (input.type) {
        case "checkbox":
          input.checked = Boolean(value);
          break;
        default:
          input.value = val;
          break;
      }
    }
  }

  return json;
}

function submitForm(src, json, method = "PUT") {
  return fetch(src, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  })
    .then((res) => {
      if (res.status != 200)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
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
