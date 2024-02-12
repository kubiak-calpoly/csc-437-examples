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
var credential_service_exports = {};
__export(credential_service_exports, {
  checkExists: () => checkExists,
  create: () => create,
  default: () => credential_service_default,
  verify: () => verify
});
module.exports = __toCommonJS(credential_service_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_credential = __toESM(require("./mongo/credential"));
function verify(username, password) {
  return new Promise((resolve, reject) => {
    import_credential.default.find({ username }).then((found) => {
      if (found && found.length === 1) {
        return found[0].toObject();
      } else {
        reject("Invalid username or password");
      }
    }).then((credsOnFile) => {
      if (credsOnFile) {
        return import_bcryptjs.default.compare(
          password,
          credsOnFile.hashedPassword
        );
      } else {
        reject("Invalid username or password");
      }
    }).then((matched) => {
      if (matched) {
        resolve(username);
      } else {
        reject("Invalid username or password");
      }
    });
  });
}
function checkExists(username) {
  return new Promise((resolve, reject) => {
    import_credential.default.find({ username }).then((found) => resolve(found && found.length === 1));
  });
}
function create(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject("must provide username and password");
    }
    import_credential.default.find({ username }).then((found) => {
      if (found)
        reject("username exists");
    }).then(
      () => import_bcryptjs.default.genSalt(10).then((salt) => import_bcryptjs.default.hash(password, salt)).then((hashedPassword) => {
        const creds = new import_credential.default({
          username,
          hashedPassword
        });
        creds.save().then((created) => {
          if (created)
            resolve(created.toObject());
        });
      })
    );
  });
}
var credential_service_default = { checkExists, create, verify };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkExists,
  create,
  verify
});
//# sourceMappingURL=credential_service.js.map
