import { createContext, provide } from "@lit/context";
import { state } from "lit/decorators.js";
import { MVUApp, MsgType, Update } from "./mvu";
import { AuthenticatedUser, APIUser } from "./rest";
import { Tour, Profile } from "ts-models";

export interface Model {
  tour?: Tour;
  user: {
    profile?: Profile;
    authUser: APIUser;
  };
}

export const context = createContext<Model>("BlazingModel");

export const init: Model = {
  user: { authUser: new APIUser() }
};

export interface UserLoggedIn extends MsgType<"UserLoggedIn"> {
  user: AuthenticatedUser;
}

export interface TourSelected extends MsgType<"TourSelected"> {
  tourId: string;
}

export interface ProfileSelected
  extends MsgType<"ProfileSelected"> {
  userid: string;
}

export type Message =
  | UserLoggedIn
  | TourSelected
  | ProfileSelected;

export class Main extends MVUApp<Model, Message> {
  @provide({ context })
  @state()
  model: Model;

  constructor(update: Update<Model, Message>) {
    super(update, init);
    this.model = init;
  }
}
