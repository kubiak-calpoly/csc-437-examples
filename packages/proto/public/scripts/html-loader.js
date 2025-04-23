const parser = new DOMParser();

export function loadHTML(href, container) {
  console.log("Loading HTML:", href, container);

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

export function addFragment(htmlString, container) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}
