import { css, html, LitElement, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { consume } from "@lit/context";
import { Profile } from "ts-models";
import * as App from "../app";
import "../components/user-profile";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type ProfileLocation = Location & {
  params: { userid: string; edit: string };
  searchParams: Map<string, string>;
};

@customElement("profile-page")
export class ProfilePageElement extends LitElement {
  @property({ attribute: false })
  location?: ProfileLocation;

  @property()
  userid?: string;

  @property()
  edit = false;

  @consume({ context: App.context, subscribe: true })
  @property({ attribute: false })
  model: App.Model | undefined;

  @state()
  profile: Profile | undefined;

  connectedCallback() {
    if (this.location) {
      this.locationChanged();
    }
    super.connectedCallback();
  }

  updated(changes: Map<string, any>) {
    console.log("Tour Page received changes", changes);
    if (changes.has("model")) {
      this.profile = this.model?.profile;
      console.log("Profile:", this.profile);
    }
    if (changes.has("location")) {
      this.locationChanged();
    }
    return true;
  }

  locationChanged() {
    if (this.location) {
      this.userid = this.location.params.userid;
      this.edit = this.location.params.edit === "edit";
      console.log("Profile Page:", this.userid, this.edit);
      const msg: App.ProfileSelected = {
        type: "ProfileSelected",
        userid: this.userid
      };
      const ev = new CustomEvent("mvu:message", {
        bubbles: true,
        composed: true,
        detail: msg
      });
      this.dispatchEvent(ev);
    }
  }

  render() {
    return html`
      <main class="page">
        ${this.edit
          ? html`
              <user-profile-edit .using=${this.profile}>
              </user-profile-edit>
            `
          : html`
              <user-profile .using=${this.profile}>
              </user-profile>
            `}
      </main>
    `;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css`
      :host {
        display: contents;
      }
    `
  ];
}
