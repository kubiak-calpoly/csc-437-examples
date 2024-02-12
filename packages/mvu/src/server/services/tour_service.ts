import { Tour } from "../../models/Tour";
import TourModel from "./mongo/tour";

export function get(id: String): Promise<Tour> {
  return new Promise<Tour>((resolve, reject) => {
    TourModel.find({ id }).then((found) => {
      if (found && found.length) resolve(found[0].toObject());
      else reject(`Tour not found {id: ${id}}`);
    });
  });
}

export function create(tour: Tour): Promise<Tour> {
  return new Promise<Tour>((resolve, reject) => {
    const p = new TourModel(tour);
    p.save()
      .then((created) => {
        if (created) resolve(created.toObject());
        else
          reject(`Tour not created: ${JSON.stringify(tour)}`);
      })
      .catch((error) => {
        reject(`Tour failed validation: ${error}`);
      });
  });
}

export default { create };
