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

type Async<M, Cmd> [now: Model, ...later: Array<Promise<Cmd>>]

export type Command =
  | [ "profile/load", { userid: string, profile: Traveler}]
  | [ "route/load", { route: Route }]
  | [ "tour/load", { tourid: string, tour: Tour }]
  | [ "tour/load-destination", { 
      tourid: string: 
      index: number, 
      destination: Destination
    }]
  | [ "user/load", { userid: string, user: Traveler}]

export default function update(
  model: Model,
  message: Msg | Command,
  auth: Auth.Model
): Model | Async<Model, Command> {
  const [ command, payload, reactions ] = message;
  // const { onSuccess, onFailure } = reactions || {};
  switch (command) {
    case "profile/request":
      const { userid } = payload;
      if (model.profile?.userid === userid ) break;
      return [
        { ...model, profile: {userid} satisfies Traveler},
        requestProfile(payload, auth)
          .then((profile) => ["profile/load", { profile }])
      ];
    case "profile/load":
      const { profile } = payload;
      return { ...model, profile };
    case "profile/save":
      return [ model,
        saveProfile(payload, user)
          .then((profile) => ["profile/load", {profile}])
      ];
    case "user/request":
      const { userid } = payload;
      if (model.user?.userid === userid ) break;
      return [
        { ...model, user: { userid } satisfies Traveler},
        requestProfile(payload, user)
          .then((u) => ["user/load", { user: u}])
      ];
    case "route/request":
      return [
        { ...model, route: undefined },
        requestRoute(payload, user)
          .then((route: Route | undefined) => ["route/load", { route }])
      ];
    case "route/load":
      const { route } = payload;
      return { ...model, route};
    case "tour/index":
      const { userid } = payload;
      if ( model.tourIndex?.userid === userid ) break;
      return [
        { ...model, tourIndex: { userid, tours: []} },
          indexTours(userid, auth)
            .then((tours: Tour[]) => ["tour/loadIndex", {userid, tours}])
        ];
    case "tour/loadIndex":
      const {userid, tours} = payload;
      if ( model.tourIndex && model.tourIndex.userid !== userid ) break;
      return { ...model, tourIndex: {userid, tours}};
    case "tour/request":
      const { tourid } = payload;
      if (current.tourStatus?.tourid === tourid) break;
      return [
        { ...model, 
          tour: undefined, 
          tourStatus: { status: "pending", id: tourid }
        },
        selectTour(message[1], user)
          .then((tour: Tour) => ["tour/load", { tour }])
      ];
    case "tour/load": 
      const { tour } = payload;
      if (model.tourStatus && model.tourStatus.tourid !== tour.id) break;
      return { ...model, 
          tour, 
          tourStatus: { status: "loaded", id: tourid }
      };
    case "tour/save-destination":
      const { tourid, index } = payload;
      return [ model,
        saveDestination(payload, auth)
          .then((destination: Destination) => 
            ["tour/load-destination", {tourid, index, destination}]
          )
      ];
    case "tour/load-destination":
      const { tourid, index, destination } = payload;
      const tour = model.tour;
      if ( !tour || model.tourStatus?.tourid !== tourid ) break;
      let destinations = tour.destinations.slice();
      destinations.splice(index, 1, dest);
      return { ...model, tour: { ...tour, destinations }};
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
  
  return model;
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

function requestTour(msg: { tourid: string }, user: Auth.User) {
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

function requestProfile(
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
