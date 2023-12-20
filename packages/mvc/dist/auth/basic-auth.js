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
var basic_auth_exports = {};
__export(basic_auth_exports, {
  authenticatedUser: () => authenticatedUser,
  basicAuth: () => basicAuth
});
module.exports = __toCommonJS(basic_auth_exports);
var import_credentials = require("../services/credentials");
function basicAuth(req, res, nextFn) {
  const authHeader = req.headers["authorization"];
  const match = authHeader && authHeader.match(/Basic\s+([a-zA-Z0-9]+)/i);
  if (!match) {
    console.log("No credentials provided in request", req);
    res.status(401).append(
      "WWW-Authenticate",
      `Basic realm="${req.hostname}", charset="UTF-8"`
    ).end();
  } else {
    const [username, password] = match && atob(match[1]).split(":");
    (0, import_credentials.verify)(username, password).then((username2) => {
      const redactedCreds = `${username2}:<REDACTED>`;
      req.headers["authorization"] = `Basic ${btoa(
        redactedCreds
      )}`;
      nextFn();
    }).catch(() => res.status(403).end());
  }
}
function authenticatedUser(req) {
  const authHeader = req.headers["authorization"];
  const match = authHeader && authHeader.match(/Basic\s+([a-zA-Z0-9]+)/i);
  return match && atob(match[1]).split(":")[0];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticatedUser,
  basicAuth
});
//# sourceMappingURL=basic-auth.js.map
