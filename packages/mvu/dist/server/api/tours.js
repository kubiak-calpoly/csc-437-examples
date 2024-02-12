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
var tours_exports = {};
__export(tours_exports, {
  default: () => tours_default
});
module.exports = __toCommonJS(tours_exports);
var import_express = require("express");
var import_services = require("../services");
const api = (0, import_express.Router)();
api.get(
  "/:id",
  (req, res, next) => {
    const id = req.params.id;
    import_services.tour_service.get(id).then((tour) => res.status(200).send(tour)).catch((error) => next(error));
  }
);
api.post(
  "/",
  (req, res, next) => {
    import_services.tour_service.create(req.body).then((tour) => res.status(201).send(tour)).catch((error) => next(error));
  }
);
var tours_default = api;
//# sourceMappingURL=tours.js.map
