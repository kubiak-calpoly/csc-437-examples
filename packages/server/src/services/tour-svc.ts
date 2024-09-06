import { Document, Model, Schema, model } from "mongoose";
import { Destination, Tour, Transportation } from "../models";
import "./entourage-svc"; // to load schema

const tourSchema = new Schema<Tour>(
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
      type: Schema.Types.ObjectId,
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
        accommodations: [
          {
            name: String,
            checkIn: Date,
            checkOut: Date,
            roomType: String,
            persons: Number,
            rate: {
              amount: Number,
              currency: String
            }
          }
        ],
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

const tourModel = model<Tour>("Tour", tourSchema);

function index(): Promise<Tour[]> {
  return tourModel.find();
}

function get(id: String): Promise<Tour> {
  return (
    tourModel
      .findById(id)
      // when you fetch a single tour,
      // the entourage is populated
      .populate({
        path: "entourage",
        populate: {
          path: "people"
        }
      })
      .then((doc: unknown) => {
        return doc as Tour;
      })
      .catch((err) => {
        console.log("Not found!", err);
        throw `${id} Not Found`;
      })
  );
}

function create(profile: Tour): Promise<Tour> {
  const p = new tourModel(profile);
  return p.save();
}

function update(id: String, tour: Tour): Promise<Tour> {
  return new Promise((resolve, reject) => {
    tourModel
      .findByIdAndUpdate(id, tour, {
        new: true
      })
      .then((doc) => {
        if (doc) resolve(doc as Tour);
        else reject("Failed to update tour");
      });
  });
}

function updateDestination(
  id: String,
  n: number,
  newDest: Destination
): Promise<Destination> {
  return new Promise((resolve, reject) => {
    const path = `destinations.${n}`;

    console.log("update path", path);

    tourModel
      .findByIdAndUpdate(
        id,
        {
          $set: { [path]: newDest }
        },
        { new: true }
      )
      .then((doc: unknown) => {
        if (doc) {
          const tour = doc as Tour;
          resolve(tour.destinations[n]);
        } else reject(`Tour ${id} not found`);
      })
      .catch((error) => {
        console.log("Cannot update Destination:", error);
        reject(error);
      });
  });
}

export default {
  index,
  get,
  create,
  update,
  updateDestination
};
