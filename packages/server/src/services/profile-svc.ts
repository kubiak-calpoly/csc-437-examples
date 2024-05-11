import { Schema, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    userid: { type: String, required: true, trim: true },
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

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
  return ProfileModel.find({ userid })
    .then((list) => list[0])
    .catch(() => {
      throw `${userid} Not Found`;
    });
}

function update(
  userid: String,
  profile: Profile
): Promise<Profile> {
  return ProfileModel.findOne({ userid })
    .then((found) => {
      if (!found) throw `${userid} Not Found`;
      else
        return ProfileModel.findByIdAndUpdate(
          found._id,
          profile,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${userid} not updated`;
      else return updated as Profile;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function remove(userid: String): Promise<void> {
  return ProfileModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };
