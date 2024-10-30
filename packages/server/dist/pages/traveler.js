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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var traveler_exports = {};
__export(traveler_exports, {
  TravelerPage: () => TravelerPage
});
module.exports = __toCommonJS(traveler_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class TravelerPage {
  data;
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody(),
      scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { TravelerProfileElement } from "/scripts/traveler.js";

        define({
          "traveler-profile": TravelerProfileElement
        });
        `
      ]
    });
  }
  renderBody() {
    const {
      userid,
      name,
      nickname,
      home,
      airports,
      avatar,
      color
    } = this.data;
    const hexcode = `#${color}`;
    const api = `/api/travelers/${userid}`;
    return import_server.html`<body>
      <blz-header>
        12 days in
        <a href="/guide/italy.html">Italy</a>
      </blz-header>
      <main class="page">
        <traveler-profile src="${api}">
          <img slot="avatar" src="${avatar}" />
          <span slot="name">${name}</span>
          <span slot="userid">${userid}</span>
          <span slot="nickname">${nickname}</span>
          <span slot="home">${home}</span>
          <ul slot="airports">
            ${airports.map((a) => import_server.html`<li>${a}</li>`)}
          </ul>
          <span
            slot="color-swatch"
            style="background: ${hexcode}"></span>
          <span slot="color-name">${hexcode}</span>
        </traveler-profile>
      </main>
    </body>`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TravelerPage
});
