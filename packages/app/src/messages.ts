import { Traveler } from "server/models";

export type Msg =
// [ command, args ]
  | ["profile/request", { userid: string }]
// more to come...
