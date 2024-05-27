import {
  define,
  Form,
  History,
  InputArray,
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
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });
  @property()
  username?: string;

  @property({ attribute: false })
  init?: Profile;

  render() {
    return html`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <a class="close" href="../${this.username}">Close</a>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this.init}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Avatar</span>
            <input
              name="avatar"
              type="file"
              @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
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
        </mu-form>
      </section>
    `;
  }

  static styles = [
    resetStyles,
    gridStyles,
    css`
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
    `
  ];

  _handleAvatarSelected(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const selectedFile = (target.files as FileList)[0];

    const reader: Promise<string> = new Promise(
      (resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(selectedFile);
      }
    );

    reader.then((url: string) => {
      this.dispatchEvent(
        new CustomEvent("profile:new-avatar", {
          bubbles: true,
          composed: true,
          detail: url
        })
      );
    });
  }
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

  @state()
  newAvatar?: string;

  constructor() {
    super("blazing:model");

    this.addEventListener(
      "profile:new-avatar",
      (event: Event) => {
        this.newAvatar = (event as CustomEvent)
          .detail as string;
      }
    );
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
        src=${this.newAvatar || avatar}
        initial=${initial}></profile-avatar>
    `;

    return this.edit
      ? html`
          <profile-editor
            username=${userid}
            .init=${this.profile}
            @mu-form:submit=${(
        event: Form.SubmitEvent<Profile>
      ) => this._handleSubmit(event)}>
            ${fields}
          </profile-editor>
        `
      : html`
          <profile-viewer username=${userid}>
            ${fields}
            <span slot="name">${name}</span>
            <span slot="userid">${userid}</span>
            <span slot="nickname">${nickname}</span>
            <span slot="home">${home}</span>
            <ul slot="airports">
              ${airports_html}
            </ul>
          </profile-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<Profile>) {
    console.log("Handling submit of mu-form");
    const profile = this.newAvatar
      ? { ...event.detail, avatar: this.newAvatar }
      : event.detail;
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid,
        profile,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/profile/${this.userid}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }

  static styles = [resetStyles];
}
