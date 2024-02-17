import { createContext, provide } from "@lit/context";
import { state } from "lit/decorators.js";
import * as MVU from "./mvu";
import { Dispatch, MVUApp, MsgType, Update } from "./mvu";
import { AuthenticatedUser, APIUser } from "./rest";
import { Tour, Profile } from "ts-models";

export interface Model {
  tour?: Tour;
  user: APIUser;
  profile?: Profile;
}

export const context = createContext<Model>("BlazingModel");

export const init: Model = {
  user: new APIUser()
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

export interface ProfileSaved extends MsgType<"ProfileSaved"> {
  userid: string;
  profile: Profile;
}

export type Message =
  | UserLoggedIn
  | TourSelected
  | ProfileSelected
  | ProfileSaved;

export class Main extends MVUApp<Model, Message> {
  @provide({ context })
  @state()
  model: Model;

  constructor(update: Update<Model, Message>) {
    super(update, init);
    this.model = init;
  }
}

export const createDispatch = () =>
  new Dispatch<Model, Message>();

export type Assignments = MVU.Assignments<Model>;

export const updateProps = MVU.updateProps<Model>;
export const noUpdate = MVU.noUpdate<Model>;
