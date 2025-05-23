import { Traveler } from "server/models";

export type Msg =
  | ["profile/save", { userid: string; profile: Traveler }]
  | ["profile/select", { userid: string }]
  | ["tour/select", { tourid: string }];
