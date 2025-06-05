import { Auth, Update } from "@calpoly/mustang";
import {
  Destination,
  Point, Route,
  Tour,
  Transportation,
  Traveler
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
    case "profile/save":
      saveProfile(message[1], user)
        .then((profile) =>
          apply((model) => ({ ...model, profile }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "profile/select":
      selectProfile(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    case "route/request":
      requestRoute(message[1], user).then(
        (route: Route | undefined) =>
          apply((model) => ({ ...model, route }))
      )
      break;
    case "tour/index":
      indexTours(user).then((tourIndex: Tour[] | undefined) =>
        apply((model) => ({ ...model, tourIndex }))
      );
      break;
    case "tour/select":
      const { tourid } = message[1];
      let skip = false;
      apply((model) => {
        if ( model.tourStatus?.id === tourid ) {
          skip = true;
          return model;
        }
        return {
          ...model,
          tourStatus: { status: "pending", id: tourid }
        }
      })
      if (!skip) {
        selectTour(message[1], user).then(
          (tour: Tour | undefined) => apply((model) => ({
            ...model,
            tour,
            tourStatus: { status: "loaded", id: tourid }
          }))
        );
      }
      break;
    case "tour/save-destination":
      saveDestination(message[1], user)
        .then((dest: Destination | undefined) => {
          const { index } = message[1];
          apply((model) => {
            const tour = model.tour;
            if (tour && dest) {
              let destinations = tour.destinations.slice();
              destinations.splice(index, 1, dest);
              return {
                ...model,
                tour: { ...tour, destinations }
              };
            } else {
              return model;
            }
          });
        })
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
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

function saveDestination(
  msg: {
    tourid: string;
    index: number;
    destination: Destination;
  },
  user: Auth.User
) {
  return fetch(
    `/api/tours/${msg.tourid}/destinations/${msg.index}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...Auth.headers(user)
      },
      body: JSON.stringify(msg.destination)
    }
  )
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save destination ${msg.index}`
        );
    })
    .then((json: unknown) => {
      if (json) {
        return convertStartEndDates<Destination>(
          json as Destination
        );
      }
      return undefined;
    });
}

function saveProfile(
  msg: {
    userid: string;
    profile: Traveler;
  },
  user: Auth.User
) {
  return fetch(`/api/travelers/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save profile for ${msg.userid}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Traveler;
      return undefined;
    });
}

function selectProfile(
  msg: { userid: string },
  user: Auth.User
) {
  return fetch(`/api/travelers/${msg.userid}`, {
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
        console.log("Profile:", json);
        return json as Traveler;
      }
    });
}

function requestRoute(
  msg: {points: Point[] },
  user: Auth.User )
{
  const coordinates = msg.points
  .map((pt) => `${pt.lon},${pt.lat}`)
  .join(";");

  console.log("Requesting route for points:", coordinates);

  return fetch(`/api/directions?pts=${coordinates}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Route;
      else return { } as Route;
    });
}
