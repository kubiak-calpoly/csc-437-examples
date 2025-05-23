// src/model.ts
import { Tour, Traveler } from "server/models";

export interface Model {
  tour?: Tour;
  profile?: Traveler;
}

export const init: Model = {};
