import { Document, Model, Schema, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nickname: { type: String, trim: true },
    home: { type: String, trim: true },
    airports: [String],
    avatar: String,
    color: String
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

// in-memory DB
let profiles: Array<Profile> = [
  {
    id: "blaze",
    name: "Blaze Pasquale",
    nickname: undefined,
    home: "Oakland, CA",
    airports: ["SFO", "OAK", "SJC"],
    color: "#8A81BE",
    avatar: "/data/avatars/Blaze Pasquale.png"
  },
  {
    id: "mondy",
    name: "Pia Mondrian",
    nickname: "Mondy",
    home: "Ventura, CA",
    airports: ["LAX"],
    avatar: undefined,
    color: undefined
  },
  {
    id: "izzy",
    name: "Isabel Nuton",
    nickname: "Izzy",
    home: "San Miguel de Allende, Gto., Mexico",
    airports: ["BJX", "QRO"],
    avatar: undefined,
    color: undefined
  }
];

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
  return ProfileModel.find({ userid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userid} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

export default { index, get, create };
