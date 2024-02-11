import { Schema, Model, Document, model } from "mongoose";
import { Entourage } from "ts-models";

const entourageSchema = new Schema<Entourage>(
  {
    name: {
      type: String,
      trim: true
    },
    people: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
  },
  { collection: "entourage_collection" }
);

const entourageModel = model<Entourage>(
  "Entourage",
  entourageSchema
);

export default entourageModel;
