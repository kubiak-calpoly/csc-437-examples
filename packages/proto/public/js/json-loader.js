import { addFragment } from "./html-loader.js";

export class JsonObjectElement extends HTMLElement {
  connectedCallback() {
    const href = this.getAttribute("href");
    const open = this.hasAttribute("open");

    if (open) loadJSON(href, this);

    this.addEventListener("json-object:open", () =>
      loadJSON(href, this)
    );
  }
}

customElements.define("json-object", JsonObjectElement);

export function loadJSON(href, container) {
  container.replaceChildren();
  fetch(href)
    .then((response) => {
      if (response.status !== 200) {
        throw `Status: ${response.status}`;
      }
      return response.json();
    })
    .then((json) => addFragment(renderJSON(json), container))
    .catch((error) =>
      addFragment(
        `<p class="error">
        Failed to fetch ${href}: ${error}
        </p>`,
        container
      )
    );
}

function renderJSON(json) {
  const entries = Object.entries(json);
  const dtdd = (key, value) => `
    <dt>${key}</dt>
    <dd>${value}</dd>
    `;
  return `
    <dl>${entries.map(([k, v]) => dtdd(k, v)).join("")}</dl>
    `;
}
