import { Document, Model, Schema, model } from "mongoose";
import { Entourage } from "server/models";
import "../services/traveler-svc";

const entourageSchema = new Schema<Entourage>(
  {
    name: {
      type: String,
      trim: true
    },
    people: [{ type: Schema.Types.ObjectId, ref: "Traveler" }]
  },
  { collection: "entourage_collection" }
);

const entourageModel = model<Entourage>(
  "Entourage",
  entourageSchema
);

function index(): Promise<Entourage[]> {
  return entourageModel.find();
}

function get(id: String): Promise<Entourage> {
  return entourageModel
    .findById(id)
    .populate("people")
    .then((doc: unknown) => doc as Entourage)
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(ent: Entourage): Promise<Entourage> {
  const p = new entourageModel(ent);
  return p.save();
}

function update(
  id: String,
  ent: Entourage
): Promise<Entourage> {
  return new Promise((resolve, reject) => {
    entourageModel
      .findByIdAndUpdate(id, ent, {
        new: true
      })
      .then((ent) => {
        if (ent) resolve(ent);
        else reject("Failed to update Entourage");
      });
  });
}

export default {
  index,
  get,
  create,
  update,
  Schema: entourageSchema
};
