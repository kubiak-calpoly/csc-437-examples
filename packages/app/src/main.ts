import { define, html } from "@unbndl/html";
import { Auth } from "@unbndl/auth";
import { Store } from "@unbndl/store";
import { BrowserHistory, Switch } from "@unbndl/switch";
import { Model, init } from "./model.ts";
import { Msg } from "./messages.ts";
import { Cmd, update } from "./update.ts";
import { DestinationViewElement } from "./views/destination-view.ts";
import { HeaderElement } from "./components/blz-header.ts";
import { HomeViewElement } from "./views/home-view.ts";
import { TourViewElement } from "./views/tour-view.ts";
import { ProfileViewElement } from "./views/profile-view.ts";

const routes: Switch.Route[] = [
  {
    path: "/app/tour/:id/destination/:index",
    view: html`
      <destination-view
        tour-id=${$ => $.params.id}
        index=${$ => $.params.index}>
      </destination-view>
    `
  },
  {
    path: "/app/tour/:id",
    view: html`
      <tour-view tour-id=${$ => $.params.id}></tour-view>
    `
  },
  {
    path: "/app/profile/:id",
    view: html`
      <profile-view
        user-id=${$ => $.params.id}
        mode=${$ => $.query?.has("edit")
        ? "edit"
        : $.query?.has("new")
          ? "new"
        : "view"}
      >
      </profile-view>
    `
  },
  {
    path: "/app",
    view: html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "auth-provider": Auth.Provider,
  "history-provider": BrowserHistory.Provider,
  "router-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes);
    }
  },
  "store-provider": class AppStore extends Store.Provider<
    Model, Msg, Cmd > {
    constructor() {
      super(update, init);
    }
  },
  "blazing-header": HeaderElement,
  "destination-view": DestinationViewElement,
  "home-view": HomeViewElement,
  "tour-view": TourViewElement,
  "profile-view": ProfileViewElement
});
