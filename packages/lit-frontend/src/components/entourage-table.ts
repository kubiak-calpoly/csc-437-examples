import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Entourage, Profile } from "ts-models";

@customElement("entourage-table")
export class EntourageTable extends LitElement {
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
      const avatarImg = avatar
        ? html`
            <img src="${avatar}" />
          `
        : (nickname || name).slice(0, 1);
      const colorStyle = color
        ? `style="--color-avatar-bg: ${color}"`
        : "";

      return html`
        <tr>
          <td>
            <span class="avatar" ${colorStyle}>
              ${avatarImg}
            </span>
          </td>
          <td class="name">
            <a href="./profile/${userid}">${name}</a>
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
    :host {
      --color-avatar-bg: var(--color-accent);
    }
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
    .avatar {
      display: inline-block;
      position: relative;
      width: var(--size-icon-medium);
      aspect-ratio: 1;
      background-color: var(--color-avatar-bg);
      border-radius: 50%;
      text-align: center;
      font-size: calc(0.66 * var(--size-icon-medium));
      font-family: var(--font-family-display);
      color: var(--color-link-inverted);
      overflow: hidden;
    }
    .name {
      width: 100%;
      font-family: var(--font-family-display);
      color: var(--color-accent);
    }
    a[href] {
      font: inherit;
      color: inherit;
    }
    img {
      width: 100%;
    }
  `;
}
