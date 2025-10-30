import { Schema, model } from "mongoose";
import { Traveler } from "../models/traveler";

const TravelerSchema = new Schema<Traveler>(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    home: { type: String, trim: true },
    airports: [String],
    avatar: String,
    color: String
  },
  { collection: "traveler_profiles" }
);

const TravelerModel = model<Traveler>(
  "Traveler",
  TravelerSchema
);

function index(): Promise<Traveler[]> {
  return TravelerModel.find();
}

function get(userid: String): Promise<Traveler | undefined> {
  return TravelerModel.find({ userid })
    .then((list) => list[0])
}

function update(
  userid: String,
  traveler: Traveler
): Promise<Traveler | undefined> {
  return TravelerModel.findOneAndUpdate({ userid }, traveler, {
    new: true
  }).then((updated) => {
    return updated ? updated as Traveler : undefined;
  });
}

function create(traveler: Traveler): Promise<Traveler> {
  const p = new TravelerModel(traveler);
  return p.save();
}

function remove(userid: String): Promise<Boolean> {
  return TravelerModel.findOneAndDelete({ userid }).then(
    (deleted) => !!deleted
  );
}

export default { index, get, create, update, remove };
