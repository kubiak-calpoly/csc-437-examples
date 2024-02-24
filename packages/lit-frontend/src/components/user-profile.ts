import { css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { Profile } from "ts-models";
import * as App from "../app";
import resetCSS from "/src/styles/reset.css?inline";
import pageCSS from "/src/styles/page.css?inline";

@customElement("user-profile")
export class UserProfileElement extends App.View {
  @property({ attribute: false })
  using?: Profile;

  get profile() {
    return this.using || ({} as Profile);
  }

  @state()
  avatar = this.profile.avatar;

  render() {
    const {
      userid,
      name,
      nickname,
      city,
      airports = []
    } = this.profile;

    const renderAirport = (s: string) => html`<dd>${s}</dd>`;

    return html`
      <section>
        ${this._renderAvatar()}
        <a href="./${userid}/edit">Edit</a>
        <h1>${name}</h1>
        <dl>
          <dt>Username</dt>
          <dd>${userid}</dd>
          <dt>Nickname</dt>
          <dd>${nickname}</dd>
          <dt>Home City</dt>
          <dd>${city}</dd>
          <dt>Airports</dt>
          ${airports.map(renderAirport)}
        </dl>
      </section>
    `;
  }

  _renderAvatar() {
    const { name, nickname, color } = (this.profile ||
      {}) as Profile;
    const avatarImg = this.avatar
      ? html`<img id="avatarImg" src="${this.avatar}" />`
      : (nickname || name || " ").slice(0, 1);
    const colorStyle = color
      ? `--avatar-backgroundColor: ${color}`
      : "";

    return html` <div class="avatar" style=${colorStyle}>
      ${avatarImg}
    </div>`;
  }

  static styles = [
    unsafeCSS(resetCSS),
    unsafeCSS(pageCSS),
    css`
      :host {
        --avatar-backgroundColor: var(--color-accent);
        --avatar-size: 100px;
        padding: var(--size-spacing-medium);
      }
      section {
        display: grid;
        grid-template-columns: [key] 1fr [value] 2fr [end];
        gap: var(--size-spacing-xlarge);
        align-items: end;
      }
      h1 {
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
      .avatar {
        grid-column: key;
        grid-row: auto/span 2;
        justify-self: end;
        position: relative;
        width: var(--avatar-size);
        aspect-ratio: 1;
        background-color: var(--avatar-backgroundColor);
        border-radius: 50%;
        text-align: center;
        line-height: var(--avatar-size);
        font-size: calc(0.66 * var(--avatar-size));
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
    `
  ];
}

@customElement("user-profile-edit")
export class UserProfileEditElement extends UserProfileElement {
  render() {
    const profile = (this.profile || {}) as Profile;
    const {
      userid,
      name,
      nickname,
      city,
      airports = []
    } = profile;

    console.log("Rendering form", this.profile);

    return html`
      <section>
        <form @submit=${this._handleSubmit}>
          <dl>
            <dt>Username</dt>
            <dd
              ><input name="userid" disabled .value=${userid}
            /></dd>
            <dt>Avatar</dt>
            <dd
              ><input
                name="avatar"
                type="file"
                @change=${this._handleAvatarSelected}
            /></dd>
            <dd>${this._renderAvatar()}</dd>
            <dt>Name</dt>
            <dd><input name="name" .value=${name} /></dd>
            <dt>Nickname</dt>
            <dd
              ><input name="nickname" .value=${nickname}
            /></dd>
            <dt>Home City</dt>
            <dd><input name="city" .value=${city} /></dd>
            <dt>Airports</dt>
            <dd
              ><input
                name="airports"
                .value=${airports.join(", ")}
            /></dd>
          </dl>
          <button type="submit">Submit</button>
        </form>
      </section>
    `;
  }

  static styles = [
    ...UserProfileElement.styles,
    css`
      form {
        display: contents;
      }
      button {
        grid-column: value;
        width: 10em;
      }
      input {
        font: inherit;
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

    reader.then((result: string) => (this.avatar = result));
  }

  _handleSubmit(event: Event) {
    event.preventDefault(); // prevent browser from submitting form data itself

    if (this.profile) {
      const target = event.target as HTMLFormElement;
      const formdata = new FormData(target);
      let entries = Array.from(formdata.entries())
        .map(([k, v]) => (v === "" ? [k] : [k, v]))
        .map(([k, v]) =>
          k === "airports"
            ? [k, (v as string).split(",").map((s) => s.trim())]
            : [k, v]
        );

      if (this.avatar) entries.push(["avatar", this.avatar]);

      const json = Object.fromEntries(entries);

      console.log("Submitting Form", json);

      this.dispatchMessage({
        type: "ProfileSaved",
        userid: this.profile?.userid,
        profile: json as Profile
      });
    }
  }
}
