import { APIRequest } from "./rest";
import { Message, TourSelected } from "./app";
import { BlazingModel } from "./model";
import { Tour } from "ts-models";

export function update(model: BlazingModel, msg: Message) {
  console.log("Updating with message", msg);

  return new Promise<BlazingModel>((resolve, reject) => {
    switch (msg.type) {
      case "TourSelected": {
        const { tourId } = msg as TourSelected;

        console.log("Time to load the tour", tourId);
        const request = new APIRequest();

        request
          .get(`/tours/${tourId}`)
          .then((response: Response) => {
            if (response.status === 200) {
              return response.json();
            }
            return undefined;
          })
          .then((json: unknown) => {
            if (json) {
              console.log("Tour:", json);
              // fix all the dates, sigh
              let dates = json as {
                startDate: string;
                endDate: string;
              };
              let tour = json as Tour;
              tour.startDate = new Date(dates.startDate);
              tour.endDate = new Date(dates.endDate);
              return json as Tour;
            }
          })
          .then((tour: Tour | undefined) => {
            if (tour) {
              resolve({ ...model, tour });
            } else {
              reject();
            }
          });
      }
    }
  });
}
