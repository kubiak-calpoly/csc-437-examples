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
var tours_exports = {};
__export(tours_exports, {
  default: () => tours_default
});
module.exports = __toCommonJS(tours_exports);
var import_express = __toESM(require("express"));
var import_tour_svc = __toESM(require("../services/tour-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  import_tour_svc.default.index().then(
    (list) => res.status(200).send({
      count: list.length,
      data: list
    })
  ).catch((err) => res.status(500).send(err));
});
router.post("/", (req, res) => {
  const newTour = req.body;
  import_tour_svc.default.create(newTour).then((tour) => res.status(201).send(tour)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_tour_svc.default.get(id).then((tour) => {
    if (!tour) throw "Not found";
    else res.json(tour);
  }).catch(() => res.status(404).end());
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newTour = req.body;
  import_tour_svc.default.update(id, newTour).then((tour) => res.json(tour)).catch(() => res.status(404).end());
});
router.put(
  "/:id/destinations/:n",
  (req, res) => {
    const { id, n } = req.params;
    const newDest = req.body;
    console.log("User", req.params.username);
    console.log(
      `Updating Destination ${n} of tour ${id} with`,
      newDest
    );
    import_tour_svc.default.updateDestination(id, parseInt(n), newDest).then((dest) => res.json(dest)).catch(() => res.status(404).end());
  }
);
var tours_default = router;
