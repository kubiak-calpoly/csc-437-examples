import { prepareTemplate } from "./template.js";

export class RestfulFormElement extends HTMLElement {
  connectedCallback() {
    const src = this.getAttribute("src");
    this._form = this.querySelector("form");

    loadForm(src, this._form);
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
    console.log(`Populating input name=${key}`, input);

    if (input) {
      console.log(`Populating ${key}=${val}`);
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
