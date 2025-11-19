import { Traveler, Tour } from "server/models";

export type Msg =
  | [ "user/request", { userid: string }]
  | [ "profile/request", { userid: string }]
  | [ "tour/index", { userid: string }]
  | [ "tour/request", { tourid: string }]
  | ["new/message"]
  | Cmd
  ;

type Cmd =
  | ["profile/load", { userid: string, profile: Traveler }]
  | ["tour/load", { tourid: string, tour: Tour }]
  | ["tour/loadIndex", { userid: string, tours: Tour[] }]
  | ["user/load", { userid: string, user: Traveler }]
  ;
