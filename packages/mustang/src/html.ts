const parser = new DOMParser();

export function html(
  template: TemplateStringsArray,
  ...values: unknown[]
): DocumentFragment {
  const params = values.map(processParam);
  const htmlString = template
    .map((s, i) => (i ? [params[i - 1], s] : [s]))
    .flat()
    .join("");
  const doc = parser.parseFromString(htmlString, "text/html");
  const collection = doc.head.childElementCount
    ? doc.head.children
    : doc.body.children;
  const fragment = new DocumentFragment();

  fragment.replaceChildren(...collection);

  return fragment;

  function processParam(v: unknown, _: number): string {
    if (v === null) return "";

    switch (typeof v) {
      case "object":
        if (Array.isArray(v)) {
          return (v as Array<unknown>)
            .map(processParam)
            .join("\n");
        }
        break;
      case "string":
      case "number":
      default:
        return escapeParam(v as object);
    }

    console.log("Processing HTML template parameter:", v);

    switch (v.constructor) {
      case HTMLElement:
        // TODO: avoid re-parsing the fragment
        return (v as HTMLElement).outerHTML;
      case DocumentFragment:
        // TODO: avoid re-parsing the fragment
        return Array.from((v as DocumentFragment).children)
          .map((child) => child.outerHTML)
          .join("\n");
      default:
        return escapeParam(v);
    }
  }

  function escapeParam(v: object): string {
    return v
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}
