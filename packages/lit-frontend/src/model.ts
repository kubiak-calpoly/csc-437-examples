import { Tour, Profile } from "ts-models";
import { APIUser } from "./rest";

export interface BlazingModel {
  tour?: Tour;
  user: {
    profile?: Profile;
    authUser: APIUser;
  };
}
