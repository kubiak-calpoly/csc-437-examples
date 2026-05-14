// src/services/destination-svc.ts
import { Destination, Tour } from "../models";
import { tourModel } from "./tour-svc.ts";

function get(
  tourId: String,
  destIndex: number
): Promise<Destination> {
  return (
    tourModel
      .findById(tourId)
      .then((doc: unknown) => {
        const tour =  doc as Tour;
        return tour.destinations[destIndex];
      })
      .catch((err) => {
        console.log("Not found!", err);
        throw `${tourId} Not Found`;
      })
  );
}

function update(
  tourId: String,
  destIndex: number,
  newDest: Destination
): Promise<Destination> {
  return new Promise((resolve, reject) => {
    const path = `destinations.${tourId}`;

    tourModel
      .findByIdAndUpdate(
        tourId,
        {
          $set: { [path]: newDest }
        },
        { new: true }
      )
      .then((doc: unknown) => {
        if (doc) {
          const tour = doc as Tour;
          resolve(tour.destinations[destIndex]);
        } else reject(`Tour ${tourId} not found`);
      })
      .catch((error) => {
        console.log("Cannot update Destination:", error);
        reject(error);
      });
  });
}

export default { get, update };
