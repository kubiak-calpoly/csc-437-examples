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
      styles: [
        css`
          main {
            display: grid;
            gap: var(--size-spacing-medium)
              var(--size-spacing-xlarge);
            align-items: end;
            grid-column: 2 / -2;
          }
          h1 {
            grid-row: 4;
            grid-column: auto / span 2;
          }
          img.avatar {
            display: block;
            grid-column: auto / span 2;
            grid-row: 1 / span 4;
          }
          .swatch {
            display: inline-block;
            width: 2em;
            aspect-ratio: 1;
            vertical-align: middle;
          }
          dl {
            display: grid;
            grid-column: 1 / span 4;
            grid-row: 5 / auto;
            grid-template-columns: subgrid;
            gap: 0 var(--size-spacing-xlarge);
            align-items: baseline;
          }
          dt {
            grid-column: 1 / span 2;
            justify-self: end;
            color: var(--color-accent);
            font-family: var(--font-family-display);
          }
          dd {
            grid-column: 3 / -1;
          }
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
        <img class="avatar" src="${avatar}" />
        <h1>${name}</h1>
        <dl>
          <dt>UserID</dt>
          <dd>${userid}</dd>
          <dt>Nickname</dt>
          <dd>${nickname}</dd>
          <dt>Home City</dt>
          <dd>${home}</dd>
          <dt>Airports</dt>
          <dd>${airports.join(", ")}</dd>
          <dt>Favorite Color</dt>
          <dd>
            <span class="swatch" style="background:${hexcode};"></span>
            <span class="color">${hexcode}</dd>
        </dl>
      </main>
    </body>`;
  }
}
