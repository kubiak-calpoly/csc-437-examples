import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../components/profile-form";
import "../components/user-profile";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

type ProfileLocation = Location & {
  params: { userid: string; edit: string };
  searchParams: Map<string, string>;
};

@customElement("profile-page")
export class ProfilePagelement extends LitElement {
  @property({ attribute: false })
  location?: ProfileLocation;

  @property()
  userid?: string;

  @property()
  edit = false;

  connectedCallback() {
    if (this.location) {
      // running under the router
      this.userid = this.location.params.userid;
      this.edit = this.location.params.edit === "edit";
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <main class="page">
        ${this.edit
          ? html`
              <user-profile-edit
                path="/profiles/${this.userid}">
              </user-profile-edit>
            `
          : html`
              <user-profile path="/profiles/${this.userid}">
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
