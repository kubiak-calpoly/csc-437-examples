import { Document } from "mongoose";
import {
  Accommodation,
  Destination,
  Endpoint,
  Segment,
  Transportation,
  Tour
} from "ts-models";
import TourModel from "../mongo/tour";

function index(): Promise<Tour[]> {
  return TourModel.find();
}

function get(id: String): Promise<Tour> {
  return (
    TourModel.findById(id)
      // when you fetch a single tour,
      // the entourage is populated
      .populate({
        path: "entourage",
        populate: {
          path: "people"
        }
      })
      .then((doc: unknown) => {
        return doc as Tour;
      })
      .catch((err) => {
        throw `${id} Not Found`;
      })
  );
}

function create(profile: Tour): Promise<Tour> {
  const p = new TourModel(profile);
  return p.save();
}

function update(id: String, tour: Tour): Promise<Tour> {
  return new Promise((resolve, reject) => {
    TourModel.findByIdAndUpdate(id, tour, {
      new: true
    }).then((doc) => {
      if (doc) resolve(doc as Tour);
      else reject("Failed to update tour");
    });
  });
}

export default { index, get, create, update };
