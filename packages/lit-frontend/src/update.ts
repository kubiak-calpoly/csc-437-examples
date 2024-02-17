import { APIRequest } from "./rest";
import * as App from "./app";
import { Tour } from "ts-models";

export function update(model: App.Model, msg: App.Message) {
  console.log("Updating with message", msg);

  return new Promise<App.Model>((resolve, reject) => {
    switch (msg.type) {
      case "TourSelected": {
        const { tourId } = msg as App.TourSelected;

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
              // convert dates in json to Date objects
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
