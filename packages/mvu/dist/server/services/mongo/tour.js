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
const PointSchema = new import_mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  }
});
const DestinationSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    trim: true
  },
  nights: {
    type: Number,
    required: true
  },
  location: {
    type: PointSchema
  }
});
const EndpointSchema = new import_mongoose.Schema({
  station: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  tzOffset: {
    type: Number
  }
});
const SegmentSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  provider: {
    type: String
  },
  departure: {
    type: EndpointSchema
  },
  arrival: {
    type: EndpointSchema
  }
});
const TransportationSchema = new import_mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  segments: {
    type: [SegmentSchema]
  }
});
const TourSchema = new import_mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    destinations: {
      type: [DestinationSchema],
      required: true
    },
    transportation: {
      type: [TransportationSchema],
      required: true
    }
  },
  { collection: "tour_data" }
);
const TourModel = (0, import_mongoose.model)("Tour", TourSchema);
var tour_default = TourModel;
//# sourceMappingURL=tour.js.map
