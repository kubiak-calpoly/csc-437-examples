import { Schema, Model, Document, model } from "mongoose";
import { Tour, Destination, Transportation } from "ts-models";

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
        link: String,
        startDate: Date,
        endDate: Date,
        location: { lat: Number, lon: Number },
        featuredImage: String,
        accommodations: [
          { name: String, link: String, nights: Number }
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

const tourModel = model<Tour>("Tour", tourSchema);

export default tourModel;
