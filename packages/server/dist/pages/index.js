"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var pages_exports = {};
__export(pages_exports, {
  renderPage: () => renderPage
});
module.exports = __toCommonJS(pages_exports);
__reExport(pages_exports, require("./auth"), module.exports);
__reExport(pages_exports, require("./destination"), module.exports);
var import_renderPage = __toESM(require("./renderPage"));
const defaults = {
  stylesheets: [
    "/styles/reset.css",
    "/styles/tokens.css",
    "/styles/page.css"
  ],
  styles: [],
  scripts: [
    `
    import { define } from "@calpoly/mustang";
    import { HeaderElement } from "/scripts/header.js";

    define({
      "blz-header": HeaderElement
    });

    HeaderElement.initializeOnce();
    `
  ],
  googleFontURL: "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght@400;700&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    //"@calpoly/mustang": "/unpkg/mustang.js"
  }
};
function renderPage(page) {
  return (0, import_renderPage.default)(page, defaults);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderPage,
  ...require("./auth"),
  ...require("./destination")
});
