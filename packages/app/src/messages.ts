import { Traveler } from "server/models";
import { Reactions } from "@unbndl/store";


export type Msg =
// [ command, args ]
  | ["profile/request", { userid: string }]
  | ["profile/save",
    { userid: string; profile: Traveler },
    Reactions ]
  | ["tour/request", { id: string }]
  | ["tourIndex/request", { userid: string }];
// more to come...
