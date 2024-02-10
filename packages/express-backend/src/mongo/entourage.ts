import { Schema, Model, Document, model } from "mongoose";
import { Entourage } from "ts-models";

const profileSchema = new Schema<Entourage>(
  {
    name: {
      type: String,
      trim: true
    },
    people: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
  },
  { collection: "entourage_collection" }
);

const profileModel = model<Entourage>(
  "Entourage",
  profileSchema
);

export default profileModel;
