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
var profile_service_exports = {};
__export(profile_service_exports, {
  create: () => create,
  default: () => profile_service_default,
  get: () => get
});
module.exports = __toCommonJS(profile_service_exports);
var import_profile = __toESM(require("./mongo/profile"));
var import_HTTPError = require("../utils/HTTPError");
function get(id) {
  return new Promise((resolve, reject) => {
    import_profile.default.find({ id }).then((found) => {
      if (found && found.length)
        resolve(found[0].toObject());
      else
        reject(new import_HTTPError.NotFoundError(`Profile "${id}" not found`));
    });
  }).catch((error) => {
    throw error;
  });
}
function create(profile) {
  return new Promise((resolve, reject) => {
    const p = new import_profile.default(profile);
    p.save().then((created) => {
      if (created)
        resolve(created.toObject());
      else
        reject(
          `Profile not created: ${JSON.stringify(profile)}`
        );
    }).catch((error) => {
      reject(`Profile failed validation: ${error}`);
    });
  });
}
var profile_service_default = { get, create };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  get
});
//# sourceMappingURL=profile_service.js.map
