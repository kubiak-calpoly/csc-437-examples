import { prepareTemplate } from "./template.js";

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
    dl {
      display: grid;
      grid-column: key / end;
      grid-template-columns: subgrid;
      gap: 0 var(--size-spacing-xlarge);
      align-items: baseline;
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
  `;
  static template = prepareTemplate(`
    <template>
    <section>
      <slot name="avatar"></slot>
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
  }
}

customElements.define("profile-view", ProfileViewElement);
