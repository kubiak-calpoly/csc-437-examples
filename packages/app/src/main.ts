import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";
import { DestinationViewElement } from "./views/destination-view";
import { HeaderElement } from "./components/blazing-header";
import { HomeViewElement } from "./views/home-view";
import { TourViewElement } from "./views/tour-view";
import { ProfileViewElement } from "./views/profile-view.ts";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/tour/:id/destination/:index",
    view: (params: Switch.Params) => html`
      <destination-view 
        tour-id=${params.id} 
        index="${params.index}">
      </destination-view>
    `
  },
  {
    auth: "protected",
    path: "/app/tour/:id",
    view: (params: Switch.Params) => html`
      <tour-view tour-id=${params.id}></tour-view>
    `
  },
  {
    auth: "protected",
    path: "/app/profile/:id",
    view: (
      params: Switch.Params,
      query?: URLSearchParams
    ) => html`
      <profile-view
        src="/api/travelers/blaze"
        mode=${query?.has("edit")
        ? "edit"
        : query?.has("new")
          ? "new"
          : "view"}></profile-view>
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

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  "blazing-header": HeaderElement,
  "destination-view": DestinationViewElement,
  "home-view": HomeViewElement,
  "tour-view": TourViewElement,
  "profile-view": ProfileViewElement
});
