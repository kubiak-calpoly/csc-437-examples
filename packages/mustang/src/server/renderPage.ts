import { CssString } from "./css";
import { html, HtmlString } from "./html";
export default renderPage;

export interface DefaultParts {
  stylesheets?: string[];
  styles?: CssString[];
  scripts?: string[];
  googleFontURL?: string;
  imports?: object;
}

export interface PageParts extends DefaultParts {
  body: HtmlString;
}

function renderPage(unique: PageParts, defaults: DefaultParts) {
  const { body } = unique;
  let parts = !defaults
    ? unique
    : {
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
      googleFontURL:
        unique.googleFontURL || defaults.googleFontURL,
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

function renderFonts(url: string | undefined) {
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

function renderCssLinks(stylesheets: string[] | undefined) {
  if (!stylesheets || !stylesheets.length) return "";

  return stylesheets.map(renderOne).join("\n");

  function renderOne(stylesheet: string) {
    return `<link rel="stylesheet" href="${stylesheet}" />`;
  }
}

function renderStyles(styles: CssString[] | undefined) {
  if (!styles || !styles.length) return "";

  return styles.map(renderOne).join("\n");

  function renderOne(style: CssString) {
    return html`<style>
      ${style}
    </style>`;
  }
}

function renderImportMap(map: object | undefined) {
  if (!map) return "";

  const json = JSON.stringify({ imports: map });

  return `<script type="importmap">${json}</script>`;
}

function renderScripts(scripts: string[] | undefined) {
  if (!scripts || !scripts.length) return "";

  return scripts.map(renderOne).join("\n");

  function renderOne(script: string) {
    return `<script type="module">${script}</script>`;
  }
}
