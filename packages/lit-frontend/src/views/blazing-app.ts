import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Router } from "@vaadin/router";
import "../components/auth-required";
import "../components/blazing-header";
import "./tour-page";
import "./profile-page";
import resetCSS from "/src/styles/reset.css?inline";

@customElement("blazing-app")
export class BlazingAppElement extends LitElement {
  @state()
  tourId?: string;

  firstUpdated() {
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
    return html`
      <auth-required>
        <blazing-header></blazing-header>
        <div id="outlet"></div>
      </auth-required>
    `;
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
