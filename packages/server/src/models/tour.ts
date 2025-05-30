import { Destination } from "./destination";
import { Entourage } from "./entourage";
import { Transportation } from "./transportation";

export interface Tour {
  id?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  destinations: Array<Destination>;
  transportation: Array<Transportation>;
  entourage: Entourage;
}
