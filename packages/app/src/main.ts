import {
  Auth,
  History,
  Store,
  Switch,
  define
} from "@calpoly/mustang";
import { html } from "lit";
import { BlazingHeaderElement } from "./components/blazing-header";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";
import { TourViewElement } from "./views/tour-view";

const routes: Switch.Route[] = [
  {
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history");
    }
  },
  "blazing-header": BlazingHeaderElement,
  "tour-view": TourViewElement,
  "profile-view": ProfileViewElement
});
