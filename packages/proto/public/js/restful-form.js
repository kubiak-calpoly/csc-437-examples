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
}

function submitForm(src, form, method = "PUT") {
  const formData = new FormData(form);
  let prefixes = {};
  for (const key of formData.keys()) {
    const path = key.split(".");
    if (path.length > 1) {
      const prefix = path[0];
      if (prefixes[prefix] === undefined) prefixes[prefix] = [];
      prefixes[prefix].push(path.slice(1));
    }
  }
  const entries = Array.from(formData.entries());
  const simpleEntries = entries.filter(
    ([key]) => !key.match(/[.]/)
  );
  const compoundKeys = Object.keys(prefixes);
  let compoundEntries = [];
  compoundKeys.forEach((prefix) => {
    const prefixLength = prefix.length;
    const subentries = entries
      .filter(([key]) => key.startsWith(`${prefix}.`))
      .map(([k, v]) => [k.slice(prefixLength + 1), v]);
    const obj = Object.fromEntries(subentries);
    const isArray = Object.keys(obj)
      .map((k) => k.match(/^[0-9]+$/))
      .reduce((a, b) => a && b, true);

    if (isArray) {
      const max = Object.keys(obj)
        .map((k) => parseInt(k))
        .reduce((a, b) => Math.max(a, b), 0);
      const array = Array.from({ length: max + 1, ...obj });
      compoundEntries.push([prefix, array]);
    } else {
      compoundEntries.push([prefix, obj]);
    }
  });

  const json = Object.fromEntries(
    simpleEntries.concat(compoundEntries)
  );

  console.log("FormData: ", json);

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
