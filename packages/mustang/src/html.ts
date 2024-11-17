const parser = new DOMParser();

export function html(
  template: TemplateStringsArray,
  ...values: unknown[]
): DocumentFragment {
  const params = values.map(processParam);
  const htmlString = template
    .map((s, i) => {
      if (i === 0) return [s];

      const node = params[i - 1];
      if (node instanceof Node)
        return [`<ins id="mu-html-${i - 1}"></ins>`, s];
      return [node, s];
    })
    .flat()
    .join("");
  const doc = parser.parseFromString(htmlString, "text/html");
  const collection = doc.head.childElementCount
    ? doc.head.children
    : doc.body.children;
  const fragment = new DocumentFragment();

  fragment.replaceChildren(...collection);

  params.forEach((node, i) => {
    if (node instanceof Node) {
      const pos = fragment.querySelector(`ins#mu-html-${i}`);

      if (pos) {
        const parent = pos.parentNode;
        parent?.replaceChild(node, pos);
      } else {
        console.log(
          "Missing insertion point:",
          `ins#mu-html-${i}`
        );
      }
    }
  });

  return fragment;

  function processParam(v: unknown, _: number): Node | string {
    if (v === null) return "";

    switch (typeof v) {
      case "string":
        return escapeHtml(v);
      case "bigint":
      case "boolean":
      case "number":
      case "symbol":
        // convert these to strings to make text nodes
        return escapeHtml(v.toString());
      case "object":
        if (v instanceof Node || v instanceof DocumentFragment)
          return v;
        // turn arrays into DocumentFragments
        if (Array.isArray(v)) {
          const frag = new DocumentFragment();
          const elements = (v as Array<unknown>).map(
            processParam
          );
          frag.replaceChildren(...elements);
          return frag;
        }
        return new Text(v.toString());
      default:
        // anything else, leave a comment node
        return new Comment(
          `[invalid parameter of type "${typeof v}"]`
        );
    }
  }
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
