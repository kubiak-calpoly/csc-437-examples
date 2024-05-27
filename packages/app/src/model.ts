import { Profile, Tour } from "server/models";

export interface Model {
  tour?: Tour;
  profile?: Profile;
  tourIndex?: Tour[];
}

export const init: Model = {};
