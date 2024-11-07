import {
  css,
  define,
  html,
  shadow,
  Form,
  InputArray,
  Observer
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class TravelerProfileElement extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  static template = html`<template>
    <section class="view">
      <slot name="avatar"></slot>
      <button id="edit">Edit</button>
      <h1><slot name="name"></slot></h1>
      <dl>
        <dt>Username</dt>
        <dd><slot name="userid"></slot></dd>
        <dt>Nickname</dt>
        <dd><slot name="nickname"></slot></dd>
        <dt>Home City</dt>
        <dd><slot name="home"></slot></dd>
        <dt>Airports</dt>
        <dd><slot name="airports"></slot></dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: rebeccapurple"></span>
          </slot>
          <slot name="color-name">rebeccapurple</slot>
        </dd>
      </dl>
    </section>
    <mu-form class="edit">
      <label>
        <span>Username</span>
        <input name="userid" />
      </label>
      <label>
        <span>Name</span>
        <input name="name" />
      </label>
      <label>
        <span>Nickname</span>
        <input name="nickname" />
      </label>
      <label>
        <span>Home City</span>
        <input name="home" />
      </label>
      <label>
        <span>Airports</span>
        <input-array name="airports">
          <span slot="label-add">Add an airport</span>
        </input-array>
      </label>
      <label>
        <span>Color</span>
        <input type="color" name="color" />
      </label>
      <label>
        <span>Avatar</span>
        <input name="avatar" />
      </label>
    </mu-form>
  </template>`;

  static styles = css`
    :host {
      display: contents;
      grid-column: 2/-2;
    }
    :host([mode="edit"]),
    :host([mode="new"]) {
      --display-view-none: none;
    }
    :host([mode="view"]) {
      --display-editor-none: none;
    }
    section.view {
      display: var(--display-view-none, grid);
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 2;
      grid-column: auto / span 2;
    }
    ::slotted(img[slot="avatar"]) {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 2;
    }
    .swatch,
    ::slotted([slot="color-swatch"]) {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    ::slotted(ul[slot="airports"]) {
      list-style: none;
      padding: 0;
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
    mu-form.edit {
      display: var(--display-editor-none, grid);
      grid-column: 1/-1;
      grid-template-columns: subgrid;
    }
  `;

  get src() {
    return this.getAttribute("src");
  }

  get mode() {
    return this.getAttribute("mode");
  }

  set mode(m) {
    this.setAttribute("mode", m);
  }

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
  }

  constructor() {
    super();
    shadow(this)
      .template(TravelerProfileElement.template)
      .styles(
        reset.styles,
        headings.styles,
        TravelerProfileElement.styles
      );

    const editButton = this.shadowRoot.getElementById("edit");
    editButton.addEventListener("click", () => {
      this.mode = "edit";
    });

    this.addEventListener("mu-form:submit", (event) => {
      this.submit(this.src, event.detail);
    });
  }

  _authObserver = new Observer(this, "blazing:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Authenticated user:", user);
      this._user = user;
      if (this.src && this.mode !== "new")
        this.hydrate(this.src);
    });
  }

  static observedAttributes = ["src"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (
      name === "src" &&
      oldValue !== newValue &&
      oldValue &&
      newValue &&
      this.mode !== "new"
    )
      this.hydrate(newValue);
  }

  get authorization() {
    console.log("Authorization for user, ", this._user);
    if (this._user && this._user.authenticated)
      return {
        Authorization: `Bearer ${this._user.token}`
      };
    else return {};
  }

  hydrate(url) {
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        this.form.init = json;
      })
      .catch((error) => {
        console.log(`Failed to render data ${url}:`, error);
      });
  }

  renderSlots(json) {
    const entries = Object.entries(json);

    const toSlot = ([key, value]) => {
      switch (key) {
        case "color":
          return html`
            <span
              slot="color-swatch"
              style="background: #${value}"></span>
            <span slot="color-name">#${value}</span>
          `;
        case "avatar":
          return html`<img slot="${key}" src="${value}" />`;
      }
      switch (typeof value) {
        case "object":
          if (Array.isArray(value))
            return html`<ul slot="${key}">
              ${value.map((s) => html`<li>${s}</li>`)}
            </ul>`;
        default:
          return html`<span slot="${key}">${value}</span>`;
      }
    };
    const fragment = entries.map(toSlot);

    this.replaceChildren(...fragment);
  }

  submit(url, json) {
    const method = this.mode === "new" ? "POST" : "PUT";
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      body: JSON.stringify(json)
    })
      .then((res) => {
        if (res.status !== (this.mode === "new" ? 201 : 200))
          throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        this.form.init = json;
        this.mode = "view";
      })
      .catch((error) => {
        console.log(`Failed to submit ${url}:`, error);
      });
  }
}
