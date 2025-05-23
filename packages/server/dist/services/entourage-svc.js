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
var entourage_svc_exports = {};
__export(entourage_svc_exports, {
  default: () => entourage_svc_default
});
module.exports = __toCommonJS(entourage_svc_exports);
var import_mongoose = require("mongoose");
var import_traveler_svc = require("../services/traveler-svc");
const entourageSchema = new import_mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    people: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Traveler" }]
  },
  { collection: "entourage_collection" }
);
const entourageModel = (0, import_mongoose.model)(
  "Entourage",
  entourageSchema
);
function index() {
  return entourageModel.find();
}
function get(id) {
  return entourageModel.findById(id).populate("people").then((doc) => doc).catch((err) => {
    throw `${id} Not Found`;
  });
}
function create(ent) {
  const p = new entourageModel(ent);
  return p.save();
}
function update(id, ent) {
  return new Promise((resolve, reject) => {
    entourageModel.findByIdAndUpdate(id, ent, {
      new: true
    }).then((ent2) => {
      if (ent2) resolve(ent2);
      else reject("Failed to update Entourage");
    });
  });
}
var entourage_svc_default = {
  index,
  get,
  create,
  update,
  Schema: entourageSchema
};
