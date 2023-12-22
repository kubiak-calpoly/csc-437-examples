import { Profile } from "../../models/Profile";
import profileModel from "./mongo/profile";
import {
  NotFoundError,
  InternalError
} from "../utils/HTTPError";

export function get(id: String): Promise<Profile> {
  return new Promise<Profile>((resolve, reject) => {
    profileModel.find({ id }).then((found) => {
      if (found && found.length) resolve(found[0].toObject());
      else
        reject(new NotFoundError(`Profile "${id}" not found`));
    });
  }).catch((error) => {
    throw error;
  });
}

export function create(profile: Profile): Promise<Profile> {
  return new Promise<Profile>((resolve, reject) => {
    const p = new profileModel(profile);
    p.save()
      .then((created) => {
        if (created) resolve(created.toObject());
        else
          reject(
            `Profile not created: ${JSON.stringify(profile)}`
          );
      })
      .catch((error) => {
        reject(`Profile failed validation: ${error}`);
      });
  });
}

export default { get, create };
