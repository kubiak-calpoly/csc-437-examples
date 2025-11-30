import { Auth, ThenUpdate } from "@calpoly/mustang";
import {
  Destination,
  Point,
  Route,
  Tour,
  Transportation,
  Traveler
} from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";
import { convertStartEndDates } from "./utils/dates";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [ command, payload, reactions ] = message;
  switch (command) {
    case "profile/request": {
      const { userid } = payload;
      if (model.profile?.userid === userid ) break;
      return [
        { ...model, profile: {userid} as Traveler},
        requestProfile(payload, user)
          .then((profile) => ["profile/load", { userid, profile }])
      ];
    }
    case "profile/load": {
      const { profile } = payload;
      return { ...model, profile };
    }
    case "profile/save": {
      const { userid } = payload;
      return [ model,
        saveProfile(payload, user, reactions)
          .then((profile) => ["profile/load", { userid, profile }])
      ];
    }
    case "user/request": {
      const { userid } = payload;
      if (model.user?.userid === userid ) break;
      return [
        { ...model, user: { userid } as Traveler},
        requestProfile(payload, user)
          .then((u) => ["user/load", { userid, user: u}])
      ];
    }
    case "user/load": {
      const { user } = payload;
      return { ...model, user};
    }
    case "route/request": {
      return [
        { ...model, route: undefined },
        requestRoute(payload, user)
          .then((route) => ["route/load", { route }])
      ];
    }
    case "route/load": {
      const { route } = payload;
      return { ...model, route};
    }
    case "tour/index": {
      const { userid } = payload;
      if ( model.tourIndex?.userid === userid ) break;
      return [
        { ...model, tourIndex: { userid, tours: []} },
          indexTours(userid, user)
            .then((tours: Tour[]) => ["tour/loadIndex", {userid, tours}])
        ];
    }
    case "tour/loadIndex": {
      const {userid, tours} = payload;
      if ( model.tourIndex && model.tourIndex.userid !== userid ) break;
      return { ...model, tourIndex: {userid, tours}};
    }
    case "tour/request": {
      const { tourid } = payload;
      if (model.tourStatus?.tourid === tourid) break;
      return [
        { ...model,
          tour: undefined,
          tourStatus: { status: "pending", tourid }
        },
        requestTour(message[1], user)
          .then((tour: Tour) => ["tour/load", { tour, tourid }])
      ];
    }
    case "tour/load": {
      const { tour } = payload;
      console.log("TourStatus:", model.tourStatus, tour);
      if (model.tourStatus && model.tourStatus.tourid !== tour.id) break;
      return { ...model,
          tour,
          tourStatus: { status: "loaded", tourid: tour.id }
      };
    }
    case "tour/save-destination": {
      const { tourid, index } = payload;
      return [ model,
        saveDestination(payload, user, reactions)
          .then((destination: Destination) =>
            ["tour/load-destination", {tourid, index, destination}]
          )
      ];
    }
    case "tour/load-destination": {
      const { tourid, index, destination } = payload;
      const tour = model.tour;
      if ( !tour || model.tourStatus?.tourid !== tourid ) break;
      let destinations = tour.destinations.slice();
      destinations.splice(index, 1, destination);
      return { ...model, tour: { ...tour, destinations }};
    }
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }

  return model;
}

function indexTours(userid: string, user?: Auth.User) {
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
      } else
        return [];
    });
}

function requestTour(msg: { tourid: string }, user?: Auth.User) {
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
      } else {
        throw "No JSON in /api/tours response";
      }
    });
}

function saveDestination(
  msg: {
    tourid: string;
    index: number;
    destination: Destination;
  },
  user?: Auth.User,
  reactions?: Message.Reactions
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
        if (reactions?.onSuccess) reactions.onSuccess();
        return convertStartEndDates<Destination>(
          json as Destination
        );
      } else {
        throw "No JSON in API response";
      }
    })
    .catch((err) => {
      if (reactions?.onFailure) reactions.onFailure(err);
      throw err;
    })
}

function saveProfile(
  msg: {
    userid: string;
    profile: Traveler;
  },
  user?: Auth.User,
  reactions?: Message.Reactions
): Promise<Traveler> {
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
      if (json) {
        if (reactions?.onSuccess) reactions.onSuccess();
        return json as Traveler;
      }
      else throw "No JSON in API response";
    })
    .catch((err) => {
      if (reactions?.onFailure) reactions.onFailure(err);
      throw err;
    })
}

function requestProfile(
  msg: { userid: string },
  user?: Auth.User
): Promise<Traveler>{
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
      } else
        throw "No JSON in response body";
    });
}

function requestRoute(
  msg: {points: Point[] },
  user?: Auth.User )
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
