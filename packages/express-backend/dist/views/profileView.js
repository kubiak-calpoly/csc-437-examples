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
var profileView_exports = {};
__export(profileView_exports, {
  default: () => profileView
});
module.exports = __toCommonJS(profileView_exports);
function profileView(profile) {
  const { name, nickname, city, airports, color, avatar } = profile;
  return `<h1>${name}</h1>
  <dt>Nickname</dt>
  <dd>${nickname}</dd>
  <dt>Home city</dt>
  <dd>${city}</dd>
  <dt>Home airport(s)</dt>
  ${airports.map((a) => `<dd>${a}</dd>`).join("\n")}
  <dt>Favorite Color</dt>
  <dd>${color}</dd>
  <dt>Avatar</dt>
  <dd>${avatar}</dd>
  `;
}
