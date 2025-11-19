import { Auth, ThenUpdate } from "@calpoly/mustang";
import {
  Destination,
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
  const [ command, payload ] = message;
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
      // TODO: make sure this is the right profile
      return { ...model, profile };
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
    case "tour/index": {
      const { userid } = payload;
      // TODO: check for duplicate
      return [
        { ...model,
          tourIndex: { userid, tours: []}
        },
        indexTours(userid, user)
          .then((tours: Tour[]) => ["tour/loadIndex", {userid, tours}])
        ];
    }
    case "tour/loadIndex": {
      const {userid, tours} = payload;
      // TODO: is this the right user's index?
      return { ...model, tourIndex: {userid, tours}};
    }
    case "tour/request": {
      const { tourid } = payload;
      // TODO: check for duplicate
      return [
        { ...model,
          // TODO: current tour data not valid
          // TODO: set tourStatus
        },
        requestTour(payload, user)
          .then((tour: Tour) =>
              ["tour/load", { tour, tourid }])
      ];
    }
    case "tour/load": {
      const { tour } = payload;
      // are we loading the right tour?
      return [{ ...model,
          tour,
          // TODO: update tourStatus
      }];
    }
    default:
      const unhandled: never = command;
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
