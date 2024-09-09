import { Auth, Update } from "@calpoly/mustang";
import {
  Destination,
  Tour,
  Transportation
} from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";
import { convertStartEndDates } from "./utils/dates";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "tour/index":
      indexTours(user).then((tourIndex: Tour[] | undefined) =>
        apply((model) => ({ ...model, tourIndex }))
      );
      break;
    case "tour/select":
      selectTour(message[1], user).then(
        (tour: Tour | undefined) =>
          apply((model) => ({ ...model, tour }))
      );
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}

function indexTours(user: Auth.User) {
  const userid = user.username;

  return fetch(`/api/tours?userid=${userid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw `Failed to load index of tours`;
      return response.json();
    })
    .then((json: unknown) => {
      if (json) {
        const { data } = json as {
          data: Tour[];
        };
        return data.map((t: Tour) =>
          convertStartEndDates<Tour>(t)
        );
      }
    });
}

function selectTour(msg: { tourid: string }, user: Auth.User) {
  return fetch(`/api/tours/${msg.tourid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Tour:", json);
        let tour: Tour = convertStartEndDates<Tour>(json);
        tour.destinations = tour.destinations.map(
          convertStartEndDates<Destination>
        );
        tour.transportation = tour.transportation.map(
          convertStartEndDates<Transportation>
        );
        return tour;
      }
    });
}
