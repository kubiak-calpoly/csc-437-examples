import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { provide } from "@lit/context";
import { Router } from "@vaadin/router";
import "../components/auth-required";
import "../components/blazing-header";
import "./tour-page";
import "./profile-page";
import resetCSS from "/src/styles/reset.css?inline";
import { APIUser } from "../rest";
import { Message, modelContext, start } from "../app";
import { BlazingModel } from "../model";
import { update } from "../update";

function view(model: BlazingModel) {
  const { user } = model;

  return html`
    <auth-required>
      <blazing-header .from=${user?.profile}></blazing-header>
      <div id="outlet"></div>
    </auth-required>
  `;
}

@customElement("blazing-app")
export class BlazingAppElement extends LitElement {
  app = start(this, view, update, {
    user: { authUser: new APIUser() }
  });

  @provide({ context: modelContext })
  @state()
  model: BlazingModel = this.app.model;

  constructor() {
    super();
    (this as HTMLElement).addEventListener(
      "mvu:message",
      (ev: Event) => {
        const msg = (ev as CustomEvent).detail as Message;
        console.log("Got message: ", msg);
        this.app.receive(msg);
      }
    );
  }

  firstUpdated(changedProperties: Map<string, unknown>) {
    super.firstUpdated(changedProperties);
    const router = new Router(
      this.shadowRoot?.querySelector("#outlet")
    );
    router.setRoutes([
      {
        path: "/app/profile/:userid/:edit(edit)",
        component: "profile-page"
      },
      {
        path: "/app/profile/:userid",
        component: "profile-page"
      },
      { path: "/app/:tour([0-9a-f]+)", component: "tour-page" },
      { path: "/app", component: "tour-page" },
      { path: "(.*)", redirect: "/app" }
    ]);
  }

  render() {
    return this.app.view(this.model);
  }

  static styles = [
    unsafeCSS(resetCSS),
    css`
      :host {
        display: contents;
      }
      #outlet {
        display: contents;
      }
    `
  ];
}
