import { CssString } from "./css";

export class HtmlString {
  html: String;

  constructor(s: String) {
    this.html = s;
  }

  toString() {
    return this.html;
  }
}

export function html(
  template: TemplateStringsArray,
  ...params: Array<
    string | number | HtmlString | HtmlString[] | CssString
  >
): HtmlString {
  const escapedParams = params.map((p) => {
    if (typeof p === "string") return escaped(p);
    if (Array.isArray(p)) return p.join("");
    return p;
  });

  const htmlString = template
    .map((s, i) =>
      i ? [escapedParams[i - 1].toString(), s] : [s]
    )
    .flat()
    .join("");

  return new HtmlString(htmlString);
}

function escaped(s: string): HtmlString {
  let escapeString = s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  return new HtmlString(escapeString);
}
