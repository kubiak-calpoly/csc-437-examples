import { App, Element, Msg, Update, View } from "./mvu.ts";
import { BlazingModel } from "./model";
import { AuthenticatedUser } from "./rest";
import { createContext } from "@lit/context";

export let modelContext = createContext<BlazingModel>("model");

export class BlazingApp implements App<BlazingModel, Message> {
  model: BlazingModel;
  view: View<BlazingModel>;
  update: Update<BlazingModel, Message>;
  setModel: (next: BlazingModel) => void;

  constructor(
    model: BlazingModel,
    view: View<BlazingModel>,
    update: Update<BlazingModel, Message>,
    setter: (next: BlazingModel) => void
  ) {
    this.model = model;
    this.view = view;
    this.update = update;
    this.setModel = setter;
  }

  receive(msg: Message) {
    this.update(this.model, msg).then((next) => {
      this.setModel((this.model = next));
    });
  }
}

export interface UserLoggedIn extends Msg<"UserLoggedIn"> {
  user: AuthenticatedUser;
}

export interface TourSelected extends Msg<"TourSelected"> {
  tourId: string;
}

export interface ProfileSelected
  extends Msg<"ProfileSelected"> {
  userid: string;
}

export type Message =
  | UserLoggedIn
  | TourSelected
  | ProfileSelected;

export function start(
  element: Element<BlazingModel>,
  view: View<BlazingModel>,
  update: Update<BlazingModel, Message>,
  init: BlazingModel
) {
  const setter = (next: BlazingModel) => {
    console.log("Model updated:", next);
    element.model = next;
  };

  const app = new BlazingApp(init, view, update, setter);

  return app;
}
