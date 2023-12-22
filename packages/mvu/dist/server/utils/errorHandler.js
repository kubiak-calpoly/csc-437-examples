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
var errorHandler_exports = {};
__export(errorHandler_exports, {
  errorHandler: () => errorHandler
});
module.exports = __toCommonJS(errorHandler_exports);
var import_HTTPError = require("./HTTPError");
class ErrorHandler {
  isHTTPError(error) {
    return error instanceof import_HTTPError.HTTPError;
  }
  handleError(error, response) {
    if (error instanceof import_HTTPError.HTTPError && response) {
      this.handleHTTPError(error, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }
  handleHTTPError(error, res) {
    res.status(error.statusCode).send(
      `<h1>HTTP Error (${error.statusCode})</h1><p>${error.message}</p>`
    );
    console.log(
      `HTTP Error (${error.statusCode})`,
      error.message
    );
  }
  handleCriticalError(error, res) {
    if (res) {
      res.status(500).send(error.message);
    } else {
      console.log("Application Error", error.message);
    }
  }
}
const errorHandler = new ErrorHandler();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler
});
//# sourceMappingURL=errorHandler.js.map
