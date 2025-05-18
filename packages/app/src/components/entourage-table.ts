import { define } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Entourage, Traveler } from "server/models";
import { AvatarElement } from "./traveler-avatar";

export class EntourageTable extends LitElement {
  static uses = define({
    "traveler-avatar": AvatarElement
  });

  @property({ attribute: false })
  using?: Entourage;

  get entourage() {
    return this.using || ({} as Entourage);
  }

  @property()
  href?: string;

  render() {
    const { name, people } = this.entourage;
    const rows = people || [];

    const renderRow = (row: Traveler) => {
      const {
        userid,
        avatar,
        name = "** NO NAME **",
        nickname,
        color
      } = row;
      const initial = (nickname || name || userid).slice(0, 1);

      return html`
        <a href="/app/traveler/${userid}">
          <traveler-avatar
            color=${color}
            src=${avatar}
            initial=${initial}
            style="--avatar-size: 2em">
          </traveler-avatar>
          <span>${name}</span>
        </a>
      `;
    };

    return html`
      <section>
        <h3>${name || "Entourage"}</h3>
        ${rows.map(renderRow)}
      </section>
    `;
  }

  static styles = css`
    :host {
      gap: var(--size-spacing-medium);
    }
    * {
      margin: 0;
      box-sizing: border-box;
      align-self: center;
    }
    section {
      display: contents;
    }
    h3 {
      grid-column: 1 / -1;
    }
    a[href] {
      display: contents;
      font: inherit;
      color: inherit;
    }
    traveler-avatar {
      grid-column: 1;
      justify-self: center;
    }
    span {
      grid-column: 2 / -1;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
  `;
}
