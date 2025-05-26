import {
  Auth,
  define,
  History,
  Store,
  Switch
} from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/blazing-header";
import { Msg } from "./messages";
import { init, Model } from "./model";
import update from "./update";
import { DestinationEditElement } from "./views/destination-edit";
import { DestinationViewElement } from "./views/destination-view";
import { EntourageViewElement } from "./views/entourage-view";
import { HomeViewElement } from "./views/home-view";
import { TourViewElement } from "./views/tour-view";
import {ProfileViewElement} from "./views/profile-view.ts";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/destination/:tourId/:index/edit",
    view: (params: Switch.Params) => html`
      <destination-edit
        tour-id=${params.tourid}
        index=${params.index}>
      </destination-edit>
    `
  },
  {
    auth: "protected",
    path: "/app/destination/:tourId/:index",
    view: (params: Switch.Params) => html`
      <destination-view
        tour-id=${params.tourid}
        index=${params.index}>
      </destination-view>
    `
  },
  {
    auth: "protected",
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}>
      </tour-view>
    `
  },
  {
    auth: "protected",
    path: "/app/entourage/:id",
    view: (params: Switch.Params) => html`
      <entourage-view tour-id=${params.id}>
      </entourage-view>
    `
  },
  {
    auth: "protected",
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}>
      </profile-view>
    `
  },
  {
    auth: "protected",
    path: "/app/profile/:id/edit",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id} mode="edit">
      </profile-view>
    `
  },
  {
    auth: "protected",
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

class AppElement extends LitElement {
  render() {
    return html`<mu-switch></mu-switch>`;
  }

  connectedCallback() {
    super.connectedCallback();
    HeaderElement.initializeOnce();
  }
}

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
  "blazing-app": AppElement,
  "blazing-header": HeaderElement,
  "destination-view": DestinationViewElement,
  "destination-edit": DestinationEditElement,
  "entourage-view": EntourageViewElement,
  "home-view": HomeViewElement,
  "profile-view": ProfileViewElement,
  "tour-view": TourViewElement
});
