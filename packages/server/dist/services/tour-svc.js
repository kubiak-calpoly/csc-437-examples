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
        startDate: Date,
        endDate: Date,
        location: { lat: Number, lon: Number },
        featuredImage: String,
        accommodation: {
          name: String,
          checkIn: Date,
          checkOut: Date,
          roomType: String,
          persons: Number,
          rate: {
            amount: Number,
            currency: String
          }
        },
        excursions: [{ name: String, type: { type: String } }]
      }
    ],
    transportation: [
      {
        type: { type: String },
        startDate: Date,
        endDate: Date,
        segments: [
          {
            name: String,
            provider: String,
            departure: {
              name: String,
              station: String,
              time: Date,
              tzoffset: Number
            },
            arrival: {
              name: String,
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
  return tourModel.find().then(
    (tours) => (
      // populate the entourage name for each tour:
      tourModel.populate(tours, {
        path: "entourage",
        select: "name"
      })
    )
  ).then((tours) => tours.map(trimIndex));
}
function trimIndex(t) {
  const { name, startDate, endDate, entourage } = t;
  const { _id } = t;
  return {
    id: _id,
    name,
    startDate,
    endDate,
    entourage,
    destinations: [],
    transportation: []
  };
}
function get(id) {
  return tourModel.findById(id).populate({
    path: "entourage",
    populate: {
      path: "people"
    }
  }).then((doc) => {
    const { _id, _doc } = doc;
    return { ..._doc, id: _id.toString() };
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
      if (doc) resolve(doc);
      else reject("Failed to update tour");
    });
  });
}
function getDestination(id, n) {
  return tourModel.findById(id).then((doc) => {
    const tour = doc;
    return tour.destinations[n];
  }).catch((err) => {
    console.log("Not found!", err);
    throw `${id} Not Found`;
  });
}
function updateDestination(id, n, newDest) {
  return new Promise((resolve, reject) => {
    const path = `destinations.${n}`;
    console.log("update path", path);
    tourModel.findByIdAndUpdate(
      id,
      {
        $set: { [path]: newDest }
      },
      { new: true }
    ).then((doc) => {
      if (doc) {
        const tour = doc;
        resolve(tour.destinations[n]);
      } else reject(`Tour ${id} not found`);
    }).catch((error) => {
      console.log("Cannot update Destination:", error);
      reject(error);
    });
  });
}
var tour_svc_default = {
  index,
  get,
  create,
  update,
  getDestination,
  updateDestination
};
