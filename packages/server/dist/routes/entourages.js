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
var import_express = __toESM(require("express"));
var import_entourages = __toESM(require("../services/entourages"));
const router = import_express.default.Router();
router.post("/", (req, res) => {
  const newEntourage = req.body;
  import_entourages.default.create(newEntourage).then((profile) => res.status(201).send(profile)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_entourages.default.get(id).then((profile) => {
    if (!profile)
      throw "Not found";
    else
      res.json(profile);
  }).catch((err) => res.status(404).end());
});
router.put("/:userid", (req, res) => {
  const { userid } = req.params;
  const newEntourage = req.body;
  import_entourages.default.update(userid, newEntourage).then((profile) => res.json(profile)).catch((err) => res.status(404).end());
});
var entourages_default = router;
