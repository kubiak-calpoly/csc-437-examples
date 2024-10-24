"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class CssString {
  constructor(s) {
    this.css = s;
  }
  toString() {
    return this.css;
  }
}
function css(template, ...params) {
  const cssString = template.map((s, i) => i ? [params[i - 1], s] : [s]).flat().join("");
  return new CssString(cssString);
}
class HtmlString {
  constructor(s) {
    this.html = s;
  }
  toString() {
    return this.html;
  }
}
function html(template, ...params) {
  const escapedParams = params.map((p) => {
    if (typeof p === "string") return escaped(p);
    if (Array.isArray(p)) return p.join("");
    if (typeof p === "undefined" || p === null || p === false)
      return "";
    return p;
  });
  const htmlString = template.map(
    (s, i) => i ? [escapedParams[i - 1].toString(), s] : [s]
  ).flat().join("");
  return new HtmlString(htmlString);
}
function escaped(s) {
  let escapeString = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  return new HtmlString(escapeString);
}
function renderPage(unique, defaults) {
  const { body } = unique;
  let parts = !defaults ? unique : {
    body,
    stylesheets: (defaults.stylesheets || []).concat(
      unique.stylesheets || []
    ),
    styles: (defaults.styles || []).concat(
      unique.styles || []
    ),
    scripts: (defaults.scripts || []).concat(
      unique.scripts || []
    ),
    googleFontURL: unique.googleFontURL || defaults.googleFontURL,
    imports: { ...defaults.imports, ...unique.imports }
  };
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        ${renderFonts(parts.googleFontURL)}
        ${renderCssLinks(parts.stylesheets)}
        ${renderStyles(parts.styles)}
        ${renderImportMap(parts.imports)}
        ${renderScripts(parts.scripts)}
      </head>
      ${parts.body}
    </html>`;
}
function renderFonts(url) {
  if (!url || !url.length) return "";
  return html`
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin />
    <link href="${url}" rel="stylesheet" />
  `;
}
function renderCssLinks(stylesheets) {
  if (!stylesheets || !stylesheets.length) return "";
  return stylesheets.map(renderOne).join("\n");
  function renderOne(stylesheet) {
    return `<link rel="stylesheet" href="${stylesheet}" />`;
  }
}
function renderStyles(styles) {
  if (!styles || !styles.length) return "";
  return styles.map(renderOne).join("\n");
  function renderOne(style) {
    return html`<style>
      ${style}
    </style>`;
  }
}
function renderImportMap(map) {
  if (!map) return "";
  const json = JSON.stringify({ imports: map });
  return `<script type="importmap">${json}<\/script>`;
}
function renderScripts(scripts) {
  if (!scripts || !scripts.length) return "";
  return scripts.map(renderOne).join("\n");
  function renderOne(script) {
    return `<script type="module">${script}<\/script>`;
  }
}
exports.CssString = CssString;
exports.HtmlString = HtmlString;
exports.css = css;
exports.html = html;
exports.renderWithDefaults = renderPage;
