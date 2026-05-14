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
    const path = "destinations." + destIndex;
    console.log("Updating destination", newDest);
  return tourModel
      .findByIdAndUpdate(
        tourId,
        {
          $set: { [path]: newDest }
        },
        { new: true }
      )
      .then((doc: unknown) => {
          console.log("Updated destination", doc);

          if (!doc ) throw `Tour ${tourId} not found`;
          const tour =  doc as Tour;
          return tour.destinations[destIndex];
      })
}

export default { get, update };
