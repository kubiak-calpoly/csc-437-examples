import { define, View } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { ProfileAvatarElement } from "../components/profile-avatar";
import { Msg } from "../messages";
import { Model } from "../model";

class ProfileViewer extends LitElement {
  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button class="edit">Edit</button>
          <button class="close">Close</button>
          <button class="delete">Delete</button>
        </nav>
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
    `;
  }

  static styles = css`
    :host {
      --display-new-button: inline-block;
      --display-edit-button: inline-block;
      --display-close-button: none;
      --display-delete-button: none;
    }
    :host([mode="edit"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
      --display-delete-button: inline-block;
    }
    :host([mode="new"]) {
      --display-new-button: none;
      --display-edit-button: none;
      --display-close-button: inline-block;
    }
    * {
      margin: 0;
      box-sizing: border-box;
    }
    section {
      display: grid;
      grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
    }
    h1 {
      grid-row: 4;
      grid-column: value;
    }
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
    nav > .new {
      display: var(--display-new-button);
    }
    nav > .edit {
      display: var(--display-edit-button);
    }
    nav > .close {
      display: var(--display-close-button);
    }
    nav > .delete {
      display: var(--display-delete-button);
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
}

class ProfileEditor extends LitElement { }

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-editor": ProfileEditor,
    "profile-avatar": ProfileAvatarElement
  });

  @property({ reflect: true })
  edit = false;

  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profiler Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }

  render() {
    const {
      color,
      avatar,
      name,
      userid,
      nickname,
      home,
      airports = []
    } = this.profile || {};

    const airports_html = airports.map(
      (s) =>
        html`
          <li>${s}</li>
        `
    );

    const fields = html`
      <profile-avatar
        slot="avatar"
        color=${color}
        src=${avatar}></profile-avatar>
      <span slot="name">${name}</span>
      <span slot="userid">${userid}</span>
      <span slot="nickname">${nickname}</span>
      <span slot="home">${home}</span>
      <ul slot="airports">
        ${airports_html}
      </ul>
    `;

    return this.edit
      ? html`
          <profile-editor>$[fields]</profile-editor>
        `
      : html`
          <profile-viewer>$[fields]</profile-viewer>
        `;
  }
}
