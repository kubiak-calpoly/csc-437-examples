import { Tour, Traveler, Route } from "server/models";

export interface TourIndex {
  userid?: string;
  tours: Tour[];
}

export interface Model {
  user?: Traveler;
  profile?: Traveler;
  tour?: Tour;
  tourStatus: {
    status?: "pending" | "loaded";
    tourid?: string };
  tourIndex?: TourIndex;
  headerTitle?: string;
  route?: Route;
}

export const init: Model = {};
