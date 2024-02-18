import { css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
// MVU app
import * as App from "../app";
import update from "../update";
// components
import "../components/auth-required";
import "../components/vaadin-router";
import "../components/blazing-header";
// views
import "./tour-page";
import "./profile-page";
import resetCSS from "/src/styles/reset.css?inline";

let routes = [
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
];

@customElement("blazing-app")
export class BlazingAppElement extends App.Main {
  constructor() {
    super(update);
  }

  render() {
    return html`
      <auth-required>
        <blazing-header></blazing-header>
        <vaadin-router .routes=${routes}> </vaadin-router>
      </auth-required>
    `;
  }

  updated(changes: Map<string, unknown>) {
    console.log("BlazingAppElement updated:", changes.keys());
    if (changes.has("model")) {
      console.log("New model", this.model);
      this.requestUpdate();
    }
  }

  static styles = [
    unsafeCSS(resetCSS),
    css`
      :host {
        display: contents;
      }
    `
  ];
}
