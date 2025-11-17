import { Destination, Point, Traveler, Route, Tour } from "server/models";
import { Message } from "@calpoly/mustang";

export type Msg =
  | [ "user/request", { userid: string }]
  | [ "profile/request", { userid: string }]
  | [ "profile/save",
      {
        userid: string;
        profile: Traveler;
      },
      Message.Reactions
    ]
  | [ "route/request", { points: Point[] }]
  | [ "tour/index", { userid: string }]
  | [ "tour/request", { tourid: string }]
  | [ "tour/save-destination",
      {
        tourid: string;
        index: number;
        destination: Destination;
      },
      Message.Reactions
    ]
  | Cmd
  ;

type Cmd =
  | ["profile/load", { userid: string, profile: Traveler }]
  | ["route/load", { route: Route }]
  | ["tour/load", { tourid: string, tour: Tour }]
  | ["tour/loadIndex", { userid: string, tours: Tour[] }]
  | ["tour/load-destination", {
    tourid: string,
    index: number,
    destination: Destination
  }]
  | ["user/load", { userid: string, user: Traveler }]
  ;
