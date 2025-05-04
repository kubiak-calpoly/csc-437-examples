const parser = new DOMParser();

export function prepareTemplate(htmlString) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const content = doc.head.firstElementChild.content;

  return content;
}
