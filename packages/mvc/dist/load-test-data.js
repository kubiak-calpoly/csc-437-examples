"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_services = require("./services");
var import_profiles = __toESM(require("./services/profiles"));
<<<<<<< HEAD
var import_credentials = __toESM(require("./services/credentials"));
=======
>>>>>>> main
let test_profiles = [
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
(0, import_services.connect)("blazing");
Promise.all(test_profiles.map(import_profiles.default.create)).then(
  (docs) => docs.forEach(
    (doc) => console.log("Profile created:", JSON.stringify(doc))
  )
<<<<<<< HEAD
).catch((err) => console.log("Errors loading test profiles"));
import_credentials.default.create("blaze", "blaze").then((name) => console.log("Credentials created", name)).catch((err) => console.log("Error creading credentials"));
=======
);
>>>>>>> main
//# sourceMappingURL=load-test-data.js.map
