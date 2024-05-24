import {
  define,
  InputArray,
  Rest,
  View
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";
import { ProfileAvatarElement } from "../components/profile-avatar";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

const gridStyles = css`
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
`;

class ProfileViewer extends LitElement {
  @property()
  username?: string;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a href="${this.username}/edit" class="edit">Edit</a>
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

  static styles = [
    resetStyles,
    gridStyles,
    css`
      * {
        margin: 0;
        box-sizing: border-box;
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
        gap: var(--size-spacing-medium)
          var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
        grid-row: 4;
        grid-column: value;
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
      ::slotted(ul) {
        list-style: none;
        display: flex;
        gap: var(--size-spacing-medium);
      }
    `
  ];
}

class ProfileEditor extends LitElement {
  static uses = define({
    "restful-form": Rest.FormElement,
    "input-array": InputArray.Element
  });
  @property()
  username?: string;

  @property({ attribute: false })
  init?: Profile;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="..">Close</a>
          <button
            class="delete"
            onclick="relayEvent(event,'profile-view:delete')">
            Delete
          </button>
        </nav>
        <restful-form
          .init=${this.init}
          .action=${(profile: Profile) => [
        "profile/save",
        { userid: this.username, profile }
      ]}>
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
        </restful-form>
      </section>
    `;
  }

  static styles = [
    resetStyles,
    gridStyles,
    css`
      restful-form {
        grid-column: key / end;
      }
      restful-form input {
        grid-column: input;
      }
    `
  ];
}

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-editor": ProfileEditor,
    "profile-avatar": ProfileAvatarElement
  });

  @property({ type: Boolean, reflect: true })
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
    const initial = (name || nickname || userid || "?").slice(
      0,
      1
    );
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
        src=${avatar}
        initial=${initial}></profile-avatar>
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
          <profile-editor .init=${this.profile}>
            ${fields}
          </profile-editor>
        `
      : html`
          <profile-viewer username=${userid}>
            ${fields}
          </profile-viewer>
        `;
  }

  static styles = [resetStyles];
}
