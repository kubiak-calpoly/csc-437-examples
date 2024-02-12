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
var credentials_exports = {};
__export(credentials_exports, {
  registerUser: () => registerUser
});
module.exports = __toCommonJS(credentials_exports);
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_services = require("../services");
function registerUser(req, res) {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    import_services.credential_service.checkExists(username).then((exists) => {
      if (exists)
        res.status(409).send("Username already taken");
      else {
        import_bcryptjs.default.genSalt(10).then((salt) => import_bcryptjs.default.hash(pwd, salt)).then((hashedPassword) => {
          import_services.credential_service.create(username, hashedPassword);
        });
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerUser
});
//# sourceMappingURL=credentials.js.map
