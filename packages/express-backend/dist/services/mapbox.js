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
var mapbox_exports = {};
__export(mapbox_exports, {
  getDirections: () => getDirections
});
module.exports = __toCommonJS(mapbox_exports);
const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || "MISSING_TOKEN";
const MAPBOX_API = "https://api.mapbox.com";
function getDirections(pts) {
  const coords = pts.map(([lon, lat]) => `${lon},${lat}`).join(";");
  const query = `geometries=geojson&access_token=${ACCESS_TOKEN}`;
  console.log("Querying mapbox for directions:", coords, query);
  return fetch(
    `${MAPBOX_API}/directions/v5/mapbox/driving/${coords}?${query}`
  ).then((response) => {
    console.log("Response from Mapbox:", response.status);
    if (response.status === 200)
      return response.json();
    if (response.status === 422) {
      response.json().then((json) => {
        console.log("Status 422:", JSON.stringify(json));
      });
    }
  }).then((json) => {
    if (json) {
      console.log("Directions: ", JSON.stringify(json));
      const directions = json;
      const route = directions.routes[0];
      return route;
    } else
      throw "Mapbox API Failure";
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDirections
});
