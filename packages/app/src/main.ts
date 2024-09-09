import {
  Auth,
  define,
  History,
  Store,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";
import { HeaderElement } from "./components/blazing-header";
import { Msg } from "./messages";
import { init, Model } from "./model";
import update from "./update";
import { EntourageViewElement } from "./views/entourage-view";
import { HomeViewElement } from "./views/home-view";
import { TourViewElement } from "./views/tour-view";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    auth: "protected",
    path: "/app/entourage/:id",
    view: (params: Switch.Params) => html`
      <entourage-view
        entourage-id=${params.id}></entourage-view>
    `
  },
  {
    auth: "protected",
    path: "/app",
    view: () => html` <home-view></home-view> `
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
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  "blazing-header": HeaderElement,
  "entourage-view": EntourageViewElement,
  "home-view": HomeViewElement,
  "tour-view": TourViewElement
});
