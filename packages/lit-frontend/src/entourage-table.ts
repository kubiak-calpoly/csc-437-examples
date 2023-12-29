import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("entourage-table")
export class EntourageTable extends LitElement {
  @property()
  src: string = "";

  render() {
    return html` <section>
      <h2>Entourage</h2>
      <table>
        <tbody id="rows"></tbody>
      </table>
    </section>`;
  }

  static styles = css`
    :host {
      --color-avatar-bg: var(--color-accent);
      padding: 0 var(--size-spacing-medium);
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
    if (this.src) {
      this._fetchData(this.src);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    const rows = this.shadowRoot?.getElementById("rows");

    if (name === "src") {
      if (rows && oldValue) {
        rows.replaceChildren();
      }
      if (newValue) {
        this._fetchData(newValue);
      }
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  _fetchData(src: string) {
    fetch(src)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        if (json && json.people) this._appendRows(json.people);
      });
  }

  _appendRows(people: any) {
    const rows = this.shadowRoot?.getElementById("rows");

    console.log("People:", people);

    if (rows) {
      people.forEach((row: any) => {
        const {
          avatar,
          name = "** NO NAME **",
          nickname,
          color
        } = row;
        const avatarImg = avatar
          ? `<img src="${avatar}"/>`
          : (nickname || name).slice(0, 1);
        const colorStyle = color
          ? `style="--color-avatar-bg: ${color}"`
          : "";

        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>
          <span class="avatar" ${colorStyle}>
            ${avatarImg}
          </span>
        </td>
        <td class="name">
          ${name}
        </td>
      `;
        rows.appendChild(tr);
      });
    }
  }
}
