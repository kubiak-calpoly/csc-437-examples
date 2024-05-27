import { define } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Entourage, Profile } from "server/models";
import { ProfileAvatarElement } from "./profile-avatar";

export class EntourageTable extends LitElement {
  static uses = define({
    "profile-avatar": ProfileAvatarElement
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

    const link = this.href
      ? html`
          <a href=${this.href}>Chat Now...</a>
        `
      : "";

    const renderRow = (row: Profile) => {
      const {
        userid,
        avatar,
        name = "** NO NAME **",
        nickname,
        color
      } = row;
      const initial = (nickname || name || userid).slice(0, 1);
      const avatarImage = html`
        <profile-avatar
          color=${color}
          src=${avatar}
          initial=${initial}
          style="--avatar-size: 2em"></profile-avatar>
      `;

      return html`
        <tr>
          <td>
            <a href="/app/profile/${userid}">${avatarImage}</a>
          </td>
          <td class="name">
            <a href="/app/profile/${userid}">${name}</a>
          </td>
        </tr>
      `;
    };

    return html`
      <section>
        <h3>${name || "Entourage"}</h3>
        ${link}
        <table>
          <tbody>${rows.map(renderRow)}</tbody>
        </table>
      </section>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    table {
      width: 100%;
    }
    thead {
      font-size: var(--size-font-min);
    }
    th,
    td {
      padding: 0 var(--size-spacing-small);
      vertical-align: middle;
    }
    a[href] {
      font: inherit;
      color: inherit;
    }
    .name {
      width: 100%;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
    img {
      width: 100%;
    }
  `;
}
