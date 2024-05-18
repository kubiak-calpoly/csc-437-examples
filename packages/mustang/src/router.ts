import { TemplateResult } from "lit";

interface RouteInfo extends Location {
  params: { [key: string]: string };
}

interface Route {
  path: Array<string>;
  view: (location: RouteInfo) => TemplateResult;
}

export class Router extends HTMLElement {
  _routes: Route[] = [];

  constructor(routes: any) {
    super();
    this._routes = routes;
  }

  connectedCallback() { }
}
