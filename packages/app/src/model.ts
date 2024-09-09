import { Tour } from "server/models";

export interface Model {
  tour?: Tour;
  tourIndex?: Tour[];
}

export const init: Model = {};
