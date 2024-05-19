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
import { TourViewElement } from "./views/tour-view";

const routes: Switch.Route[] = [
  {
    path: "/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
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
  "tour-view": TourViewElement
});
