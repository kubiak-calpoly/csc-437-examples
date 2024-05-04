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
<<<<<<<< HEAD:packages/express-backend/dist/services/tours.js
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
        reject("Failed to update tour");
    });
  });
}
var tours_default = { index, get, create, update };
========
var mongo_exports = {};
__export(mongo_exports, {
  connect: () => connect
});
module.exports = __toCommonJS(mongo_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_mongoose = __toESM(require("mongoose"));
import_mongoose.default.set("debug", true);
import_dotenv.default.config();
function getMongoURI(dbname) {
  let connection_string = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    console.log(
      "Connecting to MongoDB at",
      `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${dbname}`
    );
    connection_string = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  } else {
    console.log("Connecting to MongoDB at ", connection_string);
  }
  return connection_string;
}
function connect(dbname) {
  import_mongoose.default.connect(getMongoURI(dbname)).catch((error) => console.log(error));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connect
});
>>>>>>>> mod-6-cleanup:packages/server/dist/services/mongo.js
