import { ThenUpdate } from "@unbndl/store";
import { Auth } from "@unbndl/auth";
import { Model, TourIndex } from "./model";
import { Msg } from "./messages";
import { Tour, Traveler } from "server/models";

export type Cmd =
  | ["profile/load", { profile: Traveler }]
  | ["tour/load", { tour: Tour }]
  | ["tourIndex/load", TourIndex]
  ;


export function update(
  model: Readonly<Model>,
  message: Msg | Cmd,
  auth: Auth.Model
): Model | ThenUpdate<Model, Cmd> {
  const [type, payload] = message;
  console.log("UPDATE", message, model);
  switch (type) {
    case "profile/request":
      if (model.profile?.userid === payload.userid) break;
      return [
        { ...model,
          profile: {
            userid: payload.userid,
            name: "?", home: "?",  airports: []
          }
        },
        requestProfile(payload, auth)
      ];
    case "profile/load":
      return { ...model, profile: payload.profile };
    case "profile/save":
      return [model, saveProfile(payload, auth)];
    case "tourIndex/request":
        if (model.tourIndex?.userid === payload.userid) break;
        return [
          {
            ...model,
            tourIndex: {
              userid: payload.userid,
              tours: []
            }
          },
          requestTourIndex(payload, auth)
        ];
    case "tourIndex/load":
      return { ...model, tourIndex: payload };
    case "tour/request":
      if (model.tour?.id === payload.id) break;
      return [
        {
          ...model,
          tour: {
            id: payload.id,
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            destinations: [],
            transportation: [],
            entourage: []
          }
        },
        requestTour(payload, auth)
      ];
      case "tour/load":
        const { tour } = payload;
        return { ...model, tour };
    default:
    const invalidType: never = type;
    console.log("Invalid message type:", invalidType);
  }

  return model;
}

function requestProfile(
  payload: { userid: string },
  auth: Auth.Model
): Promise<Cmd> {
  return fetch(`/api/travelers/${payload.userid}`, {
    headers: Auth.headers(auth)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw `HTTP Status ${response.status}`;
      return response.json();
    })
    .then((json: object) => [
      "profile/load",
      { profile: json as Traveler }
    ]);
}

function saveProfile(
  payload: { userid: string; profile: Traveler },
  user: Auth.Model
): Promise<Cmd> {
  return fetch(`/api/travelers/${payload.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(payload.profile)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw new Error(
          `Failed to save profile for ${payload.userid}`
        );
      return response.json();
    })
    .then((json: unknown) => [
      "profile/load",
      { profile: json as Traveler }
    ]);
}

function requestTourIndex(
  payload: { userid: string },
  auth: Auth.Model
): Promise<Cmd> {
  return fetch(`/api/tours?userid=${payload.userid}`, {
    headers: Auth.headers(auth)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw `HTTP Status ${response.status}`;
      return response.json();
    })
    .then((json: object) => {
      const { data } = json as { data: Array<TourBrief> };
      return [
        "tourIndex/load",
        { userid: payload.userid, tours: data }
      ];
    });
}

function requestTour(
  payload: { id: string },
  auth: Auth.Model
): Promise<Cmd> {
  return fetch(`/api/tours/${payload.id}`, {
    headers: Auth.headers(auth)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw `HTTP Status ${response.status}`;
      return response.json();
    })
    .then((json: object) => [
      "tour/load",
      { tour: json as Tour }
    ]);
}
