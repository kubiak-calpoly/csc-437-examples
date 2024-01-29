import { html } from "./blazing.js";

export class EntourageTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      EntourageTable.template.cloneNode(true)
    );
  }

  static template = html`
    <section>
      <h2>Entourage</h2>
      <table>
        <tbody id="rows"></tbody>
      </table>
    </section>
    <style>
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
      tr > :first-child {
        text-align: left;
        padding-left: 0;
      }
      tr > :last-child {
        text-align: right;
        padding-right: 0;
      }
      th,
      td {
        padding: 0 var(--size-spacing-small);
        vertical-align: baseline;
      }
      td[rowspan] {
        vertical-align: top;
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
        font-family: var(--font-family-display);
        color: var(--color-accent);
        font-size: 125%;
      }
      .airport {
        font-family: var(--font-family-display);
        font-size: 75%;
      }
      img {
        width: 100%;
      }
    </style>
  `;

  connectedCallback() {
    const src = this.getAttribute("src");

    if (src) {
      this._fetchData(src);
    }
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const rows = this.shadowRoot.getElementById("rows");

    if (name === "src") {
      if (oldValue) {
        rows.replaceChildren();
      }
      if (newValue && oldValue !== null) {
        this._fetchData(newValue);
      }
    }
  }

  _fetchData(src) {
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

  _appendRows(people) {
    const rows = this.shadowRoot.getElementById("rows");

    people.forEach((row) => {
      const {
        avatar,
        name = "** NO NAME **",
        nickname = "",
        city = "",
        color,
        airports = []
      } = row;
      const avatarImg = avatar
        ? `<img src="${avatar}"/>`
        : (nickname || name).slice(0, 1);
      const colorStyle = color
        ? `style="--color-avatar-bg: ${color}"`
        : "";

      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td rowspan="2">
          <span class="avatar" ${colorStyle}>
            ${avatarImg}
          </span>
        </td>
        <td class="name">
          ${name}
        </td>
        <td>${nickname}</td>
      `;
      rows.appendChild(tr);
      tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${city}</td>
        <td class="airport">${airports.join(" ")}</td>
      `;
      rows.appendChild(tr);
    });
  }
}
