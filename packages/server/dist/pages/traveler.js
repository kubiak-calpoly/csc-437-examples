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
      styles: [
        import_server.css`
          main {
            display: grid;
            gap: var(--size-spacing-medium)
              var(--size-spacing-xlarge);
            align-items: end;
            grid-column: 2 / -2;
          }
          h1 {
            grid-row: 4;
            grid-column: auto / span 2;
          }
          img.avatar {
            display: block;
            grid-column: auto / span 2;
            grid-row: 1 / span 4;
          }
          .swatch {
            display: inline-block;
            width: 2em;
            aspect-ratio: 1;
            vertical-align: middle;
          }
          dl {
            display: grid;
            grid-column: 1 / span 4;
            grid-row: 5 / auto;
            grid-template-columns: subgrid;
            gap: 0 var(--size-spacing-xlarge);
            align-items: baseline;
          }
          dt {
            grid-column: 1 / span 2;
            justify-self: end;
            color: var(--color-accent);
            font-family: var(--font-family-display);
          }
          dd {
            grid-column: 3 / -1;
          }
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
    return import_server.html`<body>
      <blz-header>
        12 days in
        <a href="/guide/italy.html">Italy</a>
      </blz-header>
      <main class="page">
        <img class="avatar" src="${avatar}" />
        <h1>${name}</h1>
        <dl>
          <dt>UserID</dt>
          <dd>${userid}</dd>
          <dt>Nickname</dt>
          <dd>${nickname}</dd>
          <dt>Home City</dt>
          <dd>${home}</dd>
          <dt>Airports</dt>
          <dd>${airports.join(", ")}</dd>
          <dt>Favorite Color</dt>
          <dd>
            <span class="swatch" style="background:${hexcode};"></span>
            <span class="color">${hexcode}</dd>
        </dl>
      </main>
    </body>`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TravelerPage
});
