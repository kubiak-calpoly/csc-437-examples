import { css, html } from "@calpoly/mustang/server";
import { Traveler } from "../models";
import renderPage from "./renderPage";

type Mode = "view" | "new" | "edit";

export class TravelerPage {
  data: Traveler | null;
  mode: Mode;

  constructor(data: Traveler | null, mode: Mode) {
    this.data = data;
    this.mode = mode;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { TravelerProfileElement } from "/scripts/traveler.js";

        define({
          "mu-auth": Auth.Provider,
          "traveler-profile": TravelerProfileElement
        });
        `
      ],
      styles: [
        css`
          .page > traveler-profile {
            grid-column: 2 / span 4;
          }
        `
      ]
    });
  }

  renderBody() {
    const base = "/api/travelers";
    const api = this.data
      ? `${base}/${this.data.userid}`
      : base;

    return html`<body>
      <mu-auth provides="blazing:auth">
        <blz-header>
          12 days in
          <a href="/guide/italy.html">Italy</a>
        </blz-header>
        <main class="page">
          <traveler-profile mode="${this.mode}" src="${api}">
          </traveler-profile>
        </main>
      </mu-auth>
    </body>`;
  }
}
