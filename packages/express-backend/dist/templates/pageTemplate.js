"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var pageTemplate_exports = {};
__export(pageTemplate_exports, {
  default: () => pageTemplate
});
module.exports = __toCommonJS(pageTemplate_exports);
const defaultHead = `
<meta charset="utf-8" />
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossorigin
/>
<link
  href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght@400;700&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="/styles/reset.css" />
<link rel="stylesheet" href="/styles/tokens.css" />
<link rel="stylesheet" href="/styles/page.css" />
`;
const defaultBody = `<h1>Untitled Page</h1>`;
function pageTemplate(partials) {
  const { head = defaultHead, body = defaultBody } = partials;
  return `<!DOCTYPE html>
    <html lang="en">
    <head>${head}</head>
    <body>${body}</body>
    </html>
    `;
}
