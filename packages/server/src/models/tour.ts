import { Destination } from "./destination.ts";
import { Entourage } from "./entourage.ts";
import { Transportation } from "./transportation.ts";

export interface Tour {
  id: string;
  name: string;
  destinations: Array<Destination>;
  transportation: Array<Transportation>;
  startDate: Date;
  endDate: Date;
  entourage: Entourage;
}

export type TourBrief = Pick<
  Tour,
  "id" | "name" | "startDate" | "endDate"
> & {
  entourage: {
    name: string;
    people: Array<{ userid: string }>
  }
};
