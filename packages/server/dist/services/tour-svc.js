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
var tour_svc_exports = {};
__export(tour_svc_exports, {
  default: () => tour_svc_default
});
module.exports = __toCommonJS(tour_svc_exports);
var import_mongoose = require("mongoose");
var import_entourage_svc = require("./entourage-svc");
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
function index() {
  return tourModel.find();
}
function get(id) {
  return tourModel.findById(id).populate({
    path: "entourage",
    populate: {
      path: "people"
    }
  }).then((doc) => {
    return doc;
  }).catch((err) => {
    console.log("Not found!", err);
    throw `${id} Not Found`;
  });
}
function create(profile) {
  const p = new tourModel(profile);
  return p.save();
}
function update(id, tour) {
  return new Promise((resolve, reject) => {
    tourModel.findByIdAndUpdate(id, tour, {
      new: true
    }).then((doc) => {
      if (doc)
        resolve(doc);
      else
        reject("Failed to update tour");
    });
  });
}
var tour_svc_default = { index, get, create, update };
