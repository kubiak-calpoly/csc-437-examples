import { Message } from "@unbndl/service";
import { Auth } from "@unbndl/auth";
import { Model, TourIndex } from "./model";
import { Msg } from "./messages";
import { Traveler } from "server/models";

export type Cmd =
  | ["profile/load", { profile: Traveler }]


export function update(
  model: Readonly<Model>,
  message: Msg | Cmd,
  auth: Auth.Model
): Model | Message.Async<Model, Cmd> {
  const [type, payload] = message;
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
      const { profile } = payload;
      return { ...model, profile };
    default:
      console.log("Invalid message type:", type);
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
