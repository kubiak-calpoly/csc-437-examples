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
var tour_context_exports = {};
__export(tour_context_exports, {
  tourContext: () => tourContext
});
module.exports = __toCommonJS(tour_context_exports);
var import_context = require("@lit/context");
const tourContext = (0, import_context.createContext)(
  "tour"
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tourContext
});
//# sourceMappingURL=tour-context.js.map
