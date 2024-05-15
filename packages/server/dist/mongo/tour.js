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
var tour_exports = {};
__export(tour_exports, {
  default: () => tour_default
});
module.exports = __toCommonJS(tour_exports);
var import_mongoose = require("mongoose");
const tourSchema = new import_mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    entourage: {
      type: import_mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Entourage"
    },
    destinations: [
      {
        name: String,
        link: String,
        startDate: Date,
        endDate: Date,
        location: { lat: Number, lon: Number },
        featuredImage: String,
        accommodations: [
          { name: String, link: String, nights: Number }
        ],
        excursions: [
          { name: String, type: { type: String }, link: String }
        ]
      }
    ],
    transportation: [
      {
        type: { type: String },
        routing: [String],
        startDate: Date,
        endDate: Date,
        segments: [
          {
            name: String,
            provider: String,
            departure: {
              station: String,
              time: Date,
              tzoffset: Number
            },
            arrival: {
              station: String,
              time: Date,
              tzoffset: Number
            }
          }
        ]
      }
    ]
  },
  { collection: "tour_collection" }
);
const tourModel = (0, import_mongoose.model)("Tour", tourSchema);
var tour_default = tourModel;
