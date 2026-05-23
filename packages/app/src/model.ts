import { Tour, TourBrief, Traveler } from "server/models";

export interface TourIndex {
  userid: string;
  tours: Array<TourBrief>;
}

export interface Model {
  profile?: Traveler;
  tour?: Tour;
  tourIndex?: TourIndex;
}

export const init: Model = {};
