import { Tour, Traveler } from "server/models";

export interface Model {
  profile?: Traveler;
  tour?: Tour;
  tourIndex?: Tour[];
}

export const init: Model = {};
