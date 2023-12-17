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
var profiles_exports = {};
__export(profiles_exports, {
  default: () => profiles_default
});
module.exports = __toCommonJS(profiles_exports);
var import_express = require("express");
var import_profiles = __toESM(require("../services/profiles"));
const api = (0, import_express.Router)();
api.post("/", (req, res) => {
  console.log("Received a profile:", req.body);
  const { id, name, nickname, home, airports, avatar, color } = req.body;
  import_profiles.default.create({
    id,
    name,
    nickname,
    home,
    airports,
    avatar,
    color
  }).then((profile) => res.status(200).send(profile)).catch((error) => res.status(400).send({ error }));
});
var profiles_default = api;
//# sourceMappingURL=profiles.js.map
