export function css(
  template: TemplateStringsArray,
  ...params: string[]
): CSSStyleSheet {
  const cssString = template
    .map((s, i) => (i ? [params[i - 1], s] : [s]))
    .flat()
    .join("");

  let sheet = new CSSStyleSheet();
  sheet.replaceSync(cssString);

  return sheet;
}
