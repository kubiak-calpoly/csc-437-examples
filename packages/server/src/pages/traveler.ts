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
    const {
      userid,
      name,
      nickname,
      home,
      airports,
      avatar,
      color
    } = this.data;
    const hexcode = `#${color}`;

    return html`<body>
      <blz-header>
        12 days in
        <a href="/guide/italy.html">Italy</a>
      </blz-header>
      <main class="page">
        <traveler-profile>
          <img slot="avatar" src="${avatar}" />
          <span slot="name">${name}</span>
          <span slot="userid">${userid}</span>
          <span slot="nickname">${nickname}</span>
          <span slot="home">${home}</span>
          <ul slot="airports">
            ${airports.map((a) => html`<li>${a}</li>`)}
          </ul>
          <span
            slot="color-swatch"
            style="background: ${hexcode}"></span>
          <span slot="color-name">${hexcode}</span>
        </traveler-profile>
      </main>
    </body>`;
  }
}
