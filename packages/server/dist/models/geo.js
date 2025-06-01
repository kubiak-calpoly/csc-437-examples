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
var geo_exports = {};
__export(geo_exports, {
  bboxOfFeatures: () => bboxOfFeatures,
  bboxOfPoints: () => bboxOfPoints,
  featureLngLat: () => featureLngLat
});
module.exports = __toCommonJS(geo_exports);
function bboxOfPoints(points, padding = 0) {
  const minLng = points.map((pt) => pt.lon).reduce((a, b) => Math.min(a, b), 180);
  const minLat = points.map((pt) => pt.lat).reduce((a, b) => Math.min(a, b), 180);
  const maxLng = points.map((pt) => pt.lon).reduce((a, b) => Math.max(a, b), -180);
  const maxLat = points.map((pt) => pt.lat).reduce((a, b) => Math.max(a, b), -180);
  const padLng = padding * (maxLng - minLng);
  const padLat = padding * (maxLat - minLat);
  return [
    { lon: minLng - padLng, lat: minLat - padLat },
    { lon: maxLng + padLng, lat: maxLat + padLat }
  ];
}
function bboxOfFeatures(features, padding = 0.125) {
  const featurePts = (ft) => {
    if ("lat" in ft && "lon" in ft) return [ft];
    if ("path" in ft) return bboxOfPoints(ft.path);
    return [];
  };
  const points = features.map(featurePts).flat();
  return bboxOfPoints(points, padding);
}
function featureLngLat(ft) {
  if ("lat" in ft && "lon" in ft) return [ft.lon, ft.lat];
  if ("path" in ft) {
    const [pt0, pt1] = bboxOfFeatures(ft.path);
    return [(pt0.lon + pt1.lon) / 2, (pt0.lat + pt1.lat) / 2];
  }
  return [0, 0];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bboxOfFeatures,
  bboxOfPoints,
  featureLngLat
});
