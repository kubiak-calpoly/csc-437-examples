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
import { DestinationViewElement } from "./views/destination-view";
import { EntourageViewElement } from "./views/entourage-view";
import { HomeViewElement } from "./views/home-view";
import { ProfileViewElement } from "./views/profile-view";
import { TourViewElement } from "./views/tour-view";

const routes = [
  {
    path: "/app/tour/:id/destination/:index/edit",
    view: (params: Switch.Params) => html`
      <destination-view
        edit
        tour-id=${params.id}
        index=${params.index}></destination-view>
    `
  },
  {
    path: "/app/tour/:id/destination/:index",
    view: (params: Switch.Params) => html`
      <destination-view
        tour-id=${params.id}
        index=${params.index}></destination-view>
    `
  },
  {
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    path: "/app/profile/:id/edit",
    view: (params: Switch.Params) => html`
      <profile-view edit user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `
  },
  {
    path: "/app/entourage/:id",
    view: (params: Switch.Params) => html`
      <entourage-view tour-id=${params.id}></entourage-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
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
  "destination-view": DestinationViewElement,
  "entourage-view": EntourageViewElement,
  "home-view": HomeViewElement,
  "profile-view": ProfileViewElement,
  "tour-view": TourViewElement
});
