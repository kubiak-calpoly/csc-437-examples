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
        console.log("Tour is:", JSON.stringify(doc as Object));
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
    })
      .then((doc) => {
        if (doc) resolve(doc as Tour);
        else reject(`Tour ${id} not found`);
      })
      .catch((error) => {
        console.log("Cannot update Destination:", error);
        reject(error);
      });
  });
}

function updateDestination(
  id: String,
  n: number,
  newDest: Destination
): Promise<Destination> {
  return new Promise((resolve, reject) => {
    const path = `destinations.${n}`;

    console.log("update path", path);

    TourModel.findByIdAndUpdate(
      id,
      {
        $set: { [path]: newDest }
      },
      { new: true }
    )
      .then((doc: unknown) => {
        if (doc) {
          const tour = doc as Tour;
          resolve(tour.destinations[n]);
        } else reject(`Tour ${id} not found`);
      })
      .catch((error) => {
        console.log("Cannot update Destination:", error);
        reject(error);
      });
  });
}

export default {
  index,
  get,
  create,
  update,
  updateDestination
};
