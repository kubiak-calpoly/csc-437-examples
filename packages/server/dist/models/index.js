"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var models_exports = {};
module.exports = __toCommonJS(models_exports);
__reExport(models_exports, require("./credential"), module.exports);
__reExport(models_exports, require("./currency"), module.exports);
__reExport(models_exports, require("./destination"), module.exports);
__reExport(models_exports, require("./entourage"), module.exports);
__reExport(models_exports, require("./geo"), module.exports);
__reExport(models_exports, require("./tour"), module.exports);
__reExport(models_exports, require("./transportation"), module.exports);
__reExport(models_exports, require("./traveler"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./credential"),
  ...require("./currency"),
  ...require("./destination"),
  ...require("./entourage"),
  ...require("./geo"),
  ...require("./tour"),
  ...require("./transportation"),
  ...require("./traveler")
});
