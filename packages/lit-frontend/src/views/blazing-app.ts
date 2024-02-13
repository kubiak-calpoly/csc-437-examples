import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Router } from "@vaadin/router";
import "../components/auth-required";
import "../components/blazing-header";
import "./tour-page";
import "./profile-page";
import resetCSS from "/src/styles/reset.css?inline";
import { App, Update } from "../mvu";
import { Tour, Profile } from "ts-models";
import { APIUser, AuthenticatedUser } from "../rest";

interface BlazingModel {
  tour?: Tour;
  user: {
    profile?: Profile;
    authUser: APIUser;
  };
}

interface UserLoggedIn {
  user: AuthenticatedUser;
}

interface TourSelected {
  tourId: string;
}

interface ProfileSelected {
  userid: string;
}

type Message = UserLoggedIn | TourSelected | ProfileSelected;

@customElement("blazing-app")
export class BlazingAppElement
  extends LitElement
  implements App<BlazingModel, Message>
{
  @state()
  model: BlazingModel = { user: { authUser: new APIUser() } };

  view = (model: BlazingModel) => {
    const { user } = model;

    return html`
      <auth-required></auth-required>
      <blazing-header .from=${user?.profile}></blazing-header>
      <div id="outlet"></div>
    `;
  };

  updater = (model: BlazingModel, msg: Message) => {
    const result = model;

    switch (typeof msg) {
    }

    return result;
  };

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
    return this.view(this.model);
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
