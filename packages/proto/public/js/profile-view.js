import { prepareTemplate } from "./template.js";
import { loadJSON } from "./json-loader.js";

export class ProfileViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 2fr [end];
      gap: var(--size-spacing-xlarge);
      align-items: end;
    }
    restful-form {
      display: none;
      grid-column: key / end;
    }
    restful-form input {
      grid-column: input;
    }
    restful-form[src] {
      display: block;
    }
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
    }
    restful-form[src] + dl {
      display: none;
    }
    dt {
      grid-column: key;
      justify-self: end;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: value;
    }
    ::slotted(ul) {
      list-style: none;
      display: flex;
      gap: var(--size-spacing-medium);
    }
  `;
  static template = prepareTemplate(`
    <template>
    <section>
      <slot name="avatar"></slot>
      <h1><slot name="name"></slot></h1>
      <restful-form>
        <label>
          <span>Username</span>
          <input name="userid" disabled />
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
        <button
          slot="delete"
          onclick="relayEvent(event,'restful-form:delete')"
          >Delete this Profile</button
        >
      </restful-form>
      <dl>
        <dt>Username</dt>
        <dd><slot name="userid"></slot></dd>
        <dt>Nickname</dt>
        <dd><slot name="nickname"></slot></dd>
        <dt>Home City</dt>
        <dd><slot name="home"></slot></dd>
        <dt>Airports</dt>
        <dd><slot name="airports"></slot></dd>
      </dl>
    </section>
    <style>${ProfileViewElement.styles}</style>
    </template>
    `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileViewElement.template.cloneNode(true)
    );

    this.addEventListener("profile-view:edit-mode", (event) =>
      this.setAttribute("mode", "edit")
    );

    this.addEventListener("profile-view:view-mode", (event) =>
      this.setAttribute("mode", "view")
    );

    this.addEventListener("profile-view:new-mode", (event) =>
      this.setAttribute("mode", "new")
    );
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    const mode = this.getAttribute("mode") || "view";

    if (src) {
      loadJSON(src, this, renderSlots);
      if (mode === "edit") {
        const form =
          this.shadowRoot.querySelector("restful-form");
        console.log(`Editing ${src} with`, form);
        form.setAttribute("src", src);
      }
    }
  }
}

function renderSlots(json) {
  const entries = Object.entries(json);
  const slot = ([key, value]) => {
    let type = typeof value;

    if (type === "object") {
      if (Array.isArray(value)) type = "array";
    }

    if (key === "avatar") {
      type = "avatar";
    }

    switch (type) {
      case "array":
        return `<ul slot="${key}">
          ${value.map((s) => `<li>${s}</li>`).join("")}
          </ul>`;
      case "avatar":
        return `<profile-avatar slot="${key}"
          color="${json.color}"
          src="${value}">
        </profile-avatar>`;
      default:
        return `<span slot="${key}">${value}</span>`;
    }
  };

  return entries.map(slot).join("\n");
}

customElements.define("profile-view", ProfileViewElement);

export class ProfileAvatarElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  get color() {
    return this.getAttribute("color");
  }

  get avatar() {
    return this.shadowRoot.querySelector(".avatar");
  }

  static template = prepareTemplate(`
    <template>
      <div class="avatar">
      </div>
      <style>
      :host {
        display: contents;
        --avatar-backgroundColor: var(--color-accent);
        --avatar-size: 100px;
      }
      .avatar {
        grid-column: key;
        justify-self: end;
        position: relative;
        width: var(--avatar-size);
        aspect-ratio: 1;
        background-color: var(--avatar-backgroundColor);
        background-size: cover;
        border-radius: 50%;
        text-align: center;
        line-height: var(--avatar-size);
        font-size: calc(0.66 * var(--avatar-size));
        font-family: var(--font-family-display);
        color: var(--color-link-inverted);
        overflow: hidden;
      }
      </style>
    </template>
    `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileAvatarElement.template.cloneNode(true)
    );
  }

  connectedCallback() {
    // console.log("Avatar connected", this);
    this.style.setProperty(
      "--avatar-backgroundColor",
      this.color
    );
    this.avatar.style.setProperty(
      "background-image",
      `url('${this.src}')`
    );
  }

  attributeChangedCallback(name, from, to) {
    switch (name) {
      case "color":
        this.style.setProperty("--avatar-backgroundColor", to);
        break;
      case "src":
        this.avatar.style.setProperty(
          "background-image",
          `url(${to})`
        );
        break;
    }
  }
}

customElements.define("profile-avatar", ProfileAvatarElement);
