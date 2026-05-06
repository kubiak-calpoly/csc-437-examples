import { Destination } from "./destination.ts";
import { Entourage } from "./entourage.ts";
import { Transportation } from "./transportation.ts";

export interface Tour {
  name: string;
  destinations: Array<Destination>;
  transportation: Array<Transportation>;
  startDate: Date;
  endDate: Date;
  entourage: Entourage;
}
