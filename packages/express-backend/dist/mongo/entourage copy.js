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
var entourage_copy_exports = {};
__export(entourage_copy_exports, {
  default: () => entourage_copy_default
});
module.exports = __toCommonJS(entourage_copy_exports);
var import_mongoose = require("mongoose");
const profileSchema = new import_mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    people: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Profile" }]
  },
  { collection: "entourage_collection" }
);
const profileModel = (0, import_mongoose.model)(
  "Entourage",
  profileSchema
);
var entourage_copy_default = profileModel;
