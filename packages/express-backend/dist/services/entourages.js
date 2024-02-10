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
var entourages_exports = {};
__export(entourages_exports, {
  default: () => entourages_default
});
module.exports = __toCommonJS(entourages_exports);
var import_entourage = __toESM(require("../mongo/entourage"));
function index() {
  return import_entourage.default.find();
}
function get(id) {
  return import_entourage.default.findById(id).populate("people").then((doc) => doc).catch((err) => {
    throw `${id} Not Found`;
  });
}
function create(ent) {
  const p = new import_entourage.default(ent);
  return p.save();
}
function update(id, ent) {
  return new Promise((resolve, reject) => {
    import_entourage.default.findByIdAndUpdate(id, ent, {
      new: true
    }).then((ent2) => {
      if (ent2)
        resolve(ent2);
      else
        reject("Failed to update Entourage");
    });
  });
}
var entourages_default = { index, get, create, update };
