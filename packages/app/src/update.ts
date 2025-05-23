// src/update.ts
import { Auth, Update } from "@calpoly/mustang";
import { Destination, Tour, Traveler } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";
import {
  convertStartEndDates,
} from "./utils/dates";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "profile/select":
      loadProfile(message[1], user)
        .then((profile) =>
          apply((model) =>
            ({ ...model, profile })
          )
        );
      break;
    case "tour/select":
      loadTour(message[1], user)
        .then((tour) =>
          apply((model) =>
            ({ ...model, tour })
          )
        );
      break;
    default:
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function loadProfile(
  payload: { userid: string },
  user: Auth.User
): Promise<Traveler|undefined> {
  return fetch(`/api/travelers/${payload.userid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((json: object) => {
      if (json) {
        console.log("Profile:", json);
        return json as Traveler;
      }
    });
}

function loadTour(
  payload: { tourid: string },
  user: Auth.User
): Promise<Tour|undefined> {
  const src = `/api/tours/${payload.tourid}`;

  return fetch(src, {
    headers: Auth.headers(user)
  })
    .then((res: Response) => {
      if (res.status === 200) return res.json();
    })
    .then((json: object) => {
      if (json) {
        console.log("Tour:", json);
        let tour: Tour = convertStartEndDates<Tour>(json);
        tour.destinations = tour.destinations.map(
          convertStartEndDates<Destination>
        );
        return tour;
      }
    })
}
