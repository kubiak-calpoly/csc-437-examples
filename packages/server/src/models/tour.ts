import { Destination } from "./destination";
import { Entourage } from "./entourage";
import { Transportation } from "./transportation";

export interface Tour {
  name: string;
  destinations: Array<Destination>;
  transportation: Array<Transportation>;
  startDate: Date;
  endDate: Date;
  entourage: Entourage;
}