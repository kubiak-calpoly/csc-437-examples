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
var profile_copy_exports = {};
__export(profile_copy_exports, {
  default: () => profile_copy_default
});
module.exports = __toCommonJS(profile_copy_exports);
var import_mongoose = require("mongoose");
const profileSchema = new import_mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    nickname: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    airports: [String],
    avatar: {
      data: Buffer,
      contentType: String
    },
    color: {
      type: String,
      trim: true,
      validate(value) {
        if (!value.match(/^#[0-9a-fA-F]{6}$/)) {
          throw new Error(
            "Invalid color, must be 6-digit hexcode."
          );
        }
      }
    }
  },
  { collection: "user_profiles" }
);
const profileModel = (0, import_mongoose.model)("Profile", profileSchema);
var profile_copy_default = profileModel;
