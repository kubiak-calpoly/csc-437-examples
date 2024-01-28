import { Document } from "mongoose";
import { Profile } from "./models/Profile";
import ProfileModel from "./models/mongo/profile";

function index(): Promise<Profile[]> {
  return new Promise<Profile[]>((resolve, reject) => {
    ProfileModel.find().then((index) => resolve(index));
  });
}

function get(userid: String): Promise<Profile> {
  return new Promise<Profile>((resolve, reject) => {
    ProfileModel.find({ userid }).then((found) => {
      if (found && found.length) resolve(found[0].toObject());
      else reject(`Profile not found {userid: ${userid}}`);
    });
  });
}

function create(profile: Profile): Promise<Profile> {
  return new Promise<Profile>((resolve, reject) => {
    const p = new ProfileModel(profile);
    p.save().then((created) => {
      if (created) resolve(created.toObject());
      else
        reject(
          `Profile not created: ${JSON.stringify(profile)}`
        );
    });
  });
}

export default { index, get, create };
