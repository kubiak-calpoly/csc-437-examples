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
var profiles_exports = {};
__export(profiles_exports, {
  default: () => profiles_default
});
module.exports = __toCommonJS(profiles_exports);
let profiles = [
  {
    userid: "blaze",
    name: "Blaze Pasquale",
    city: "Oakland, CA",
    airports: ["SFO", "OAK", "SJC"],
    color: "#8A81BE",
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    userid: "mondy",
    name: "Pia Mondrian",
    nickname: "Mondy",
    city: "Ventura, CA",
    airports: ["LAX"]
  },
  {
    userid: "izzy",
    name: "Isabel Nuton",
    nickname: "Izzy",
    city: "San Miguel de Allende, Gto., Mexico",
    airports: ["BJX", "QRO"]
  }
];
var profiles_default = {
  index: () => profiles,
  get: (userid) => {
    const matches = profiles.filter((p) => p.userid === userid);
    return matches.length ? matches[0] : void 0;
  }
};
