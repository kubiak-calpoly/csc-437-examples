import { Traveler } from "server/models";

export type Msg =
// [ command, args ]
  | ["profile/request", { userid: string }]
  | ["profile/save", { userid: string; profile: Traveler }]
  | ["tour/request", { id: string }]
  | ["tourIndex/request", { userid: string }];
// more to come...
