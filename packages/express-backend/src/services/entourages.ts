import { Document } from "mongoose";
import { Entourage } from "ts-models";
import EntourageModel from "../mongo/entourage";
import ProfileModel from "../mongo/profile";

function index(): Promise<Entourage[]> {
  return EntourageModel.find();
}

function get(id: String): Promise<Entourage> {
  return EntourageModel.findById(id)
    .populate("people")
    .then((doc: unknown) => doc as Entourage)
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(ent: Entourage): Promise<Entourage> {
  const p = new EntourageModel(ent);
  return p.save();
}

function update(
  id: String,
  ent: Entourage
): Promise<Entourage> {
  return new Promise((resolve, reject) => {
    EntourageModel.findByIdAndUpdate(id, ent, {
      new: true
    }).then((ent) => {
      if (ent) resolve(ent);
      else reject("Failed to update Entourage");
    });
  });
}

export default { index, get, create, update };
