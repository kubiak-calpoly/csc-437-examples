import { Profile, Tour } from "server/models";

export interface Model {
  tour?: Tour;
  profile?: Profile;
}

export const init: Model = {};
