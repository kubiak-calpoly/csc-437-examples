"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var renderPage_exports = {};
__export(renderPage_exports, {
  default: () => renderPage_default
});
module.exports = __toCommonJS(renderPage_exports);
var renderPage_default = renderPage;
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
    imports: __spreadValues(__spreadValues({}, defaults.imports), unique.imports)
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
  return `
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin />
    <link
      href="${url}"
      rel="stylesheet" />
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
    return `<style>${style}</style>`;
  }
}
function renderImportMap(map) {
  if (!map) return "";
  const json = JSON.stringify({ imports: map });
  return `<script type="importmap">${json}</script>`;
}
function renderScripts(scripts) {
  if (!scripts || !scripts.length) return "";
  return scripts.map(renderOne).join("\n");
  function renderOne(script) {
    return `<script type="module">${script}</script>`;
  }
}
