export class CssString {
  css: String;

  constructor(s: String) {
    this.css = s;
  }

  toString() {
    return this.css;
  }
}

export function css(
  template: TemplateStringsArray,
  ...params: string[]
): CssString {
  const cssString = template
    .map((s, i) => (i ? [params[i - 1], s] : [s]))
    .flat()
    .join("");

  return new CssString(cssString);
}
