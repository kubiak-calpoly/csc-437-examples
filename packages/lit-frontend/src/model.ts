import { AuthenticatedUser, APIUser } from "@calpoly/mustang";

import {
  Destination,
  Tour,
  Profile,
  Point,
  Route,
  ChatMessage
} from "ts-models";

export interface Model {
  tour?: Tour;
  user: APIUser;
  profile?: Profile;
  route?: Route;
}

export const init: Model = {
  user: new APIUser()
};
