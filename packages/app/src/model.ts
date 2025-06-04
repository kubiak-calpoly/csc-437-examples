import { Tour, Traveler, Route } from "server/models";

export interface Model {
  profile?: Traveler;
  tour?: Tour;
  tourIndex?: Tour[];
  headerTitle?: string;
  route?: Route;
}

export const init: Model = {};
