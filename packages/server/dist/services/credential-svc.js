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
var credential_svc_exports = {};
__export(credential_svc_exports, {
  default: () => credential_svc_default
});
module.exports = __toCommonJS(credential_svc_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_mongoose = require("mongoose");
const credentialSchema = new import_mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    roles: [
      {
        $role: { type: String, required: true },
        groupid: String
      }
    ]
  },
  { collection: "user_credentials" }
);
const credentialModel = (0, import_mongoose.model)(
  "Credential",
  credentialSchema
);
function verify(username, password) {
  return credentialModel.find({ username }).then((found) => {
    if (!found || found.length !== 1)
      throw "Invalid username or password";
    return found[0];
  }).then(
    (credsOnFile) => import_bcryptjs.default.compare(
      password,
      credsOnFile.hashedPassword
    ).then((result) => {
      if (!result)
        throw "Invalid username or password";
      return credsOnFile.username;
    })
  );
}
function create(username, password) {
  return credentialModel.find({ username }).then((found) => {
    if (found.length) throw `Username exists: ${username}`;
  }).then(
    () => import_bcryptjs.default.genSalt(10).then((salt) => import_bcryptjs.default.hash(password, salt)).then((hashedPassword) => {
      const creds = new credentialModel({
        username,
        hashedPassword
      });
      return creds.save();
    })
  );
}
var credential_svc_default = { create, verify };
