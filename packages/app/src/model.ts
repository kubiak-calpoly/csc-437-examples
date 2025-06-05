import { Tour, Traveler } from "server/models";

export interface Model {
  profile?: Traveler;
  tour?: Tour;
  tourStatus: {
    status?: "pending" | "loaded";
    id?: string };
  tourIndex?: Tour[];
  headerTitle?: string;
}

export const init: Model = {};
