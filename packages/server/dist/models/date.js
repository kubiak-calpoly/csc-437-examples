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
var date_exports = {};
__export(date_exports, {
  convertStartEndDates: () => convertStartEndDates,
  formatDate: () => formatDate,
  parseUTCDate: () => parseUTCDate
});
module.exports = __toCommonJS(date_exports);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const formatDate = (date) => {
  const dt = (typeof date === "string" ? new Date(date) : date) || /* @__PURE__ */ new Date();
  const m = months[dt.getUTCMonth()];
  const d = dt.getUTCDate();
  return `${d} ${m}`;
};
function parseUTCDate(s) {
  const date = new Date(Date.parse(s));
  const d = date.getUTCDate();
  const m = date.getUTCMonth();
  const y = date.getUTCFullYear();
  return new Date(Date.UTC(y, m, d));
}
function convertStartEndDates(obj) {
  const datestrings = obj;
  let result = obj;
  result.startDate = parseUTCDate(datestrings.startDate);
  result.endDate = datestrings.endDate ? parseUTCDate(datestrings.endDate) : void 0;
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertStartEndDates,
  formatDate,
  parseUTCDate
});
