import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Route, Router } from "@vaadin/router";

@customElement("vaadin-router")
export class VaadinRouterElement extends LitElement {
  router = new Router(this);

  @property({ attribute: false })
  routes: Route[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.router.setRoutes(this.routes);
    console.log("Router:", this.routes);
  }

  render() {
    return html`<slot></slot>`;
  }
}
