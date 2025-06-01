import { Tour, Traveler, Route } from "server/models";

export interface Model {
  profile?: Traveler;
  tour?: Tour;
  tourStatus: {
    status?: "pending" | "loaded";
    id?: string };
  tourIndex?: Tour[];
  headerTitle?: string;
  route?: Route;
}

export const init: Model = {};
