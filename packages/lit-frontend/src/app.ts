import { App, Element, Update, View } from "./mvu.ts";
import { BlazingModel } from "./model";
import { AuthenticatedUser } from "./rest";

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
}

interface UserLoggedIn {
  user: AuthenticatedUser;
}

interface TourSelected {
  tourId: string;
}

interface ProfileSelected {
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
    element.model = next;
  };

  const app = new BlazingApp(init, view, update, setter);

  return app;
}
