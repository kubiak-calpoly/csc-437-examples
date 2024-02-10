import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { APIRequest } from "../rest";
import { Entourage, Profile } from "ts-models";

@customElement("entourage-table")
export class EntourageTable extends LitElement {
  @property()
  path: string = "";

  @state()
  entourage?: Entourage;

  render() {
    const rows = this.entourage?.people || [];

    const renderRow = (row: Profile) => {
      const {
        avatar,
        name = "** NO NAME **",
        nickname,
        color
      } = row;
      const avatarImg = avatar
        ? html`<img src="${avatar}" />`
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
          <td class="name">${name}</td>
        </tr>
      `;
    };

    return html`<table>
      <tbody>${rows.map(renderRow)}</tbody>
    </table>`;
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
    img {
      width: 100%;
    }
  `;

  connectedCallback() {
    if (this.path) {
      this._getData(this.path);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    const rows = this.shadowRoot?.getElementById("rows");

    if (name === "path") {
      if (rows && oldValue) {
        rows.replaceChildren();
      }
      if (newValue) {
        this._getData(newValue);
      }
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  _getData(path: string) {
    const request = new APIRequest();

    request
      .get(path)
      .then((response: Response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        console.log("Entourage:", json);
        this.entourage = json as Entourage;
      });
  }
}
