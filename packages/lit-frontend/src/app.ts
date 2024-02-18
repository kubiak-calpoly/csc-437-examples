import { consume, createContext, provide } from "@lit/context";
import { property, state } from "lit/decorators.js";
import * as MVU from "./mvu";
import { Dispatch, MsgType, Update } from "./mvu";
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

export const createDispatch = () =>
  new Dispatch<Model, Message>();

export type Assignments = MVU.Assignments<Model>;

export const updateProps = MVU.updateProps<Model>;
export const noUpdate = MVU.noUpdate<Model>;

export class Main extends MVU.Main<Model, Message> {
  @provide({ context })
  @state()
  model: Model;

  constructor(update: Update<Model, Message>) {
    super(update, init);
    this.model = init;
  }
}

export class View extends MVU.View<Message> {
  @consume({ context: context, subscribe: true })
  @property({ attribute: false })
  _model: Model | undefined;

  getFromModel(path: keyof Model) {
    if (this._model) {
      return this._model[path];
    }
  }
}
