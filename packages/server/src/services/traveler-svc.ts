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
  { collection: "user_travelers" }
);

const TravelerModel = model<Traveler>(
  "Traveler",
  TravelerSchema
);

function index(): Promise<Traveler[]> {
  return TravelerModel.find();
}

function get(userid: String): Promise<Traveler> {
  return TravelerModel.find({ userid })
    .then((list) => list[0])
    .catch(() => {
      throw `${userid} Not Found`;
    });
}

function update(
  userid: String,
  traveler: Traveler
): Promise<Traveler> {
  return TravelerModel.findOneAndUpdate({ userid }, traveler, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated as Traveler;
  });
}

function create(traveler: Traveler): Promise<Traveler> {
  const p = new TravelerModel(traveler);
  return p.save();
}

function remove(userid: String): Promise<void> {
  return TravelerModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };
