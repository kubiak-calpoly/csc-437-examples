import { html, LitElement } from "lit";
import { Route, Router as VaadinRouter } from "@vaadin/router";

export class Router extends LitElement {
  _routes: Route[];
  router = new VaadinRouter(this);

  constructor(routes: any) {
    super();
    this._routes = routes;
  }

  connectedCallback() {
    super.connectedCallback();
    this.router.setRoutes(this._routes);
    console.log("Router:", this._routes);
  }

  createRenderRoot() {
    return this;
  }
}
