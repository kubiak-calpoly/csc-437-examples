"use strict";
<<<<<<< HEAD:packages/express-backend/dist/services/profiles.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
=======
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
>>>>>>> mod-4:packages/server/dist/services/profiles.js
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
<<<<<<< HEAD:packages/express-backend/dist/services/profiles.js
=======
<<<<<<<< HEAD:packages/server/dist/routes/directions.js
>>>>>>> mod-4:packages/server/dist/services/profiles.js
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
<<<<<<< HEAD:packages/express-backend/dist/services/profiles.js
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
<<<<<<<< HEAD:packages/server/dist/services/profiles.js
module.exports = __toCommonJS(profiles_exports);
var import_profile = __toESM(require("../mongo/profile"));
function index() {
  return import_profile.default.find();
}
function get(userid) {
  return import_profile.default.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(profile) {
  const p = new import_profile.default(profile);
  return p.save();
}
function update(userid, profile) {
  return new Promise((resolve, reject) => {
    import_profile.default.findOneAndUpdate({ userid }, profile, {
      new: true
    }).then((profile2) => {
      if (profile2)
        resolve(profile2);
      else
        reject("Failed to update profile");
    });
  });
}
var profiles_default = { index, get, create, update };
========
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"), 1);
var import_profiles = __toESM(require("../services/profiles"), 1);
const router = import_express.default.Router();
router.post("/", (req, res) => {
  const newProfile = req.body;
  import_profiles.default.create(newProfile).then((profile) => res.status(201).send(profile)).catch((err) => res.status(500).send(err));
});
router.get("/:userid", (req, res) => {
  const { userid } = req.params;
  import_profiles.default.get(userid).then((profile) => {
    if (!profile)
      throw "Not found";
    else
      res.json(profile);
  }).catch((err) => res.status(404).end());
});
router.put("/:userid", (req, res) => {
  const { userid } = req.params;
  const newProfile = req.body;
  import_profiles.default.update(userid, newProfile).then((profile) => res.json(profile)).catch((err) => res.status(404).end());
});
var routes_default = router;
>>>>>>>> mod-4:packages/server/dist/routes/index.js
=======
var directions_exports = {};
__export(directions_exports, {
  default: () => directions_default
});
module.exports = __toCommonJS(directions_exports);
var import_express = __toESM(require("express"));
var import_mapbox = require("../services/mapbox");
const router = import_express.default.Router();
router.get("/", (req, res) => {
  const { pts } = req.query;
  const points = pts.split(";").map((pair) => pair.split(",").map((n) => parseFloat(n)));
  (0, import_mapbox.getDirections)(points).then((route) => {
    if (!route)
      throw "Not found";
    else
      res.json(route);
  }).catch((error) => res.status(500).send(error));
});
var directions_default = router;
========
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profiles_exports = {};
__export(profiles_exports, {
  default: () => profiles_default,
  get: () => get
});
module.exports = __toCommonJS(profiles_exports);
let profiles = [
  {
    id: "blaze",
    name: "Blaze Pasquale",
    nickname: void 0,
    home: "Oakland, CA",
    airports: ["SFO", "OAK", "SJC"],
    color: "#8A81BE",
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "mondy",
    name: "Pia Mondrian",
    nickname: "Mondy",
    home: "Ventura, CA",
    airports: ["LAX"],
    avatar: void 0,
    color: void 0
  },
  {
    id: "izzy",
    name: "Isabel Nuton",
    nickname: "Izzy",
    home: "San Miguel de Allende, Gto., Mexico",
    airports: ["BJX", "QRO"],
    avatar: void 0,
    color: void 0
  }
];
function get(id) {
  const found = profiles.find((t) => t.id === id);
  if (found)
    return found;
  throw `Profile not found: ${id}`;
}
var profiles_default = { get };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get
});
>>>>>>>> mod-4:packages/server/dist/services/profiles.js
>>>>>>> mod-4:packages/server/dist/services/profiles.js
