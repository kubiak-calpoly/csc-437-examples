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
var HTTPError_exports = {};
__export(HTTPError_exports, {
  BadRequestError: () => BadRequestError,
  ConflictError: () => ConflictError,
  HTTPError: () => HTTPError,
  InternalError: () => InternalError,
  NotFoundError: () => NotFoundError
});
module.exports = __toCommonJS(HTTPError_exports);
class HTTPError extends Error {
  statusCode = 500;
  constructor(message, status = 500) {
    super(`HTTP Error (${status}): ${message}`);
    this.statusCode = status;
  }
}
class BadRequestError extends HTTPError {
  constructor(message) {
    super(message, 400);
  }
}
class NotFoundError extends HTTPError {
  constructor(message) {
    super(message, 404);
  }
}
class ConflictError extends HTTPError {
  constructor(message) {
    super(message, 409);
  }
}
class InternalError extends HTTPError {
  constructor(message) {
    super(message, 500);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadRequestError,
  ConflictError,
  HTTPError,
  InternalError,
  NotFoundError
});
//# sourceMappingURL=HTTPError.js.map
