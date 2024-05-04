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
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
<<<<<<<< HEAD:packages/server/dist/services/profiles.js
module.exports = __toCommonJS(profiles_exports);
var import_profile2 = __toESM(require("../models/mongo/profile"));
function index() {
  return import_profile2.default.find();
}
function get(userid) {
  return import_profile2.default.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(profile) {
  const p = new import_profile2.default(profile);
  return p.save();
}
function update(userid, profile) {
  return new Promise((resolve, reject) => {
    import_profile2.default.findOneAndUpdate({ userid }, profile, {
      new: true
    }).then((profile2) => {
      if (profile2)
        resolve(profile2);
      else
        reject("Failed to update profile");
    });
  });
}
var profiles_default = { index, get, create, update };
========
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"), 1);
var import_profiles = __toESM(require("../services/profiles"), 1);
const router = import_express.default.Router();
router.post("/", (req, res) => {
  const newProfile = req.body;
  import_profiles.default.create(newProfile).then((profile) => res.status(201).send(profile)).catch((err) => res.status(500).send(err));
});
router.get("/:userid", (req, res) => {
  const { userid } = req.params;
  import_profiles.default.get(userid).then((profile) => {
    if (!profile)
      throw "Not found";
    else
      res.json(profile);
  }).catch((err) => res.status(404).end());
});
router.put("/:userid", (req, res) => {
  const { userid } = req.params;
  const newProfile = req.body;
  import_profiles.default.update(userid, newProfile).then((profile) => res.json(profile)).catch((err) => res.status(404).end());
});
var routes_default = router;
>>>>>>>> mod-5:packages/server/dist/routes/index.js
