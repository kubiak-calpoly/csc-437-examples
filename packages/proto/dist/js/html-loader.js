export class HtmlFragmentElement extends HTMLElement {
  connectedCallBack() {
    const href = this.getAttribute("href");
    const open = this.hasAttribute("open");

    if (open) loadHTML(href, this);

    this.addEventListener("html-fragment:open", () =>
      loadHTML(href, this)
    );
  }
}

customElements.define("html-fragment", HtmlFragmentElement);

export function loadHTML(href, container) {
  container.replaceChildren();
  fetch(href)
    .then((response) => {
      if (response.status !== 200) {
        throw `Status: ${response.status}`;
      }
      return response.text();
    })
    .then((htmlString) => addFragment(htmlString, container))
    .catch((error) =>
      addFragment(
        `<p class="error">
        Failed to fetch ${href}: ${error}
        </p>`,
        container
      )
    );
}

const parser = new DOMParser();

export function addFragment(htmlString, container) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}
