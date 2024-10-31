import { css, html } from "@calpoly/mustang/server";
import { Traveler } from "../models";
import renderPage from "./renderPage";

export class TravelerPage {
  data: Traveler;

  constructor(data: Traveler) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      scripts: [
        `
        import { define } from "@calpoly/mustang";
        import { TravelerProfileElement } from "/scripts/traveler.js";

        define({
          "traveler-profile": TravelerProfileElement
        });
        `
      ]
    });
  }

  renderBody() {
    const { userid } = this.data;
    const api = `/api/travelers/${userid}`;

    return html`<body>
      <blz-header>
        12 days in
        <a href="/guide/italy.html">Italy</a>
      </blz-header>
      <main class="page">
        <traveler-profile src="${api}"></traveler-profile>
      </main>
    </body>`;
  }
}
