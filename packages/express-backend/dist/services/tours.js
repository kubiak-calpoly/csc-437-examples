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
var import_tour = __toESM(require("../mongo/tour"));
function index() {
  return import_tour.default.find();
}
function get(id) {
  return import_tour.default.findById(id).populate({
    path: "entourage",
    populate: {
      path: "people"
    }
  }).then((doc) => {
    return doc;
  }).catch((err) => {
    throw `${id} Not Found`;
  });
}
function create(profile) {
  const p = new import_tour.default(profile);
  return p.save();
}
function update(id, tour) {
  return new Promise((resolve, reject) => {
    import_tour.default.findByIdAndUpdate(id, tour, {
      new: true
    }).then((doc) => {
      if (doc)
        resolve(doc);
      else
        reject(`Tour ${id} not found`);
    }).catch((error) => {
      console.log("Cannot update Destination:", error);
      reject(error);
    });
  });
}
function updateDestination(id, n, newDest) {
  return new Promise((resolve, reject) => {
    const path = `destinations.${n}`;
    console.log("update path", path);
    import_tour.default.findByIdAndUpdate(
      id,
      {
        $set: { [path]: newDest }
      },
      { new: true }
    ).then((doc) => {
      if (doc) {
        const tour = doc;
        resolve(tour.destinations[n]);
      } else
        reject(`Tour ${id} not found`);
    }).catch((error) => {
      console.log("Cannot update Destination:", error);
      reject(error);
    });
  });
}
var tours_default = {
  index,
  get,
  create,
  update,
  updateDestination
};
