import { define, Form, View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({attribute: "user-id"})
  userid?: string;

  @state()
  get traveler(): Traveler | undefined {
    return this.model.profile;
  }

  @property()
  mode = "view";

  constructor() {
    super("blazing:model");
  }

  override render() {
    return this.mode === "edit" ?
      this.renderEditor() :
      this.renderView();
  }

  renderView() {
    const {
      userid,
      name,
      nickname,
      home,
      airports = [],
      avatar,
      color
    } = this.traveler || {};

    return html`
        <button @click=${() => {
      this.mode = "edit";
    }}>
          Edit
        </button>
      <img src=${avatar} alt=${name} />
      <h1>${name}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${userid}</dd>
        <dt>Nickname</dt>
        <dd>${nickname}</dd>
        <dt>Home City</dt>
        <dd>${home}</dd>
        <dt>Airports</dt>
        <dd>${airports.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: ${color}"></span>
          </slot>
          <slot name="color-name">${color}</slot>
        </dd>
      </dl>
      </section>
      </template>`;
  }

  renderEditor() {
    const {
      name,
      avatar,
      airports = []
    } = this.traveler || {};

    const init = {
      ...this.traveler,
      airports: airports.join(" ")
    };

    return html`
      <mu-form
        .init=${init}
        @mu-form:submit=${this.handleSubmit}
    }>
        <img src=${avatar} alt=${name} />
        <h1><input name="name"></h1>
        <dl>
          <dt>Avatar</dt>
          <dd>
            <input
              type="file"
              @change=${(e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length) {
        this.handleAvatarSelected(files)
      }
    }}
            />
          </dd>
          <dt>Nickname</dt>
          <dd><input name="nickname"></dd>
          <dt>Home City</dt>
          <dd><input name="home"></dd>
          <dt>Airports</dt>
          <dd><input name="airports"></dd>
          <dt>Favorite Color</dt>
          <dd>
            <input type="color" name="color">
          </dd>
        </dl>
        <button type="submit" slot="submit">Save Changes</button>
      </mu-form>`;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
    :host {
      display: contents;
      grid-column: 2/-2;
      display: grid;
      grid-template-columns: subgrid;
    }
    section {
      display: grid;
      grid-template-columns: subgrid;
      gap: inherit;
      gap: var(--size-spacing-medium) var(--size-spacing-xlarge);
      align-items: end;
      grid-column: 1 / -1;
    }
    h1 {
      grid-row: 4;
      grid-column: auto / span 2;
    }
    img {
      display: block;
      grid-column: auto / span 2;
      grid-row: 1 / span 4;
    }
    .swatch {
      display: inline-block;
      width: 2em;
      aspect-ratio: 1;
      vertical-align: middle;
    }
    dl {
      display: grid;
      grid-column: 1 / -1;
      grid-row: 5 / auto;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      grid-column: 1 / span 2;
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: 3 / -1;
    }
    mu-form {
      display: contents;
    }
    input {
     margin: var(--size-spacing-medium) 0;
     font: inherit;
    }
  `];

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
      this.dispatchMessage([
        "profile/request",
        { userid: newValue }
      ]);
    }
  }
  _avatar? : string; // the avatar, base64 encoded

  handleSubmit(event: Form.SubmitEvent<Traveler>) {
    const json: object = {
      ...this.traveler,
      ...event.detail
    }

    if ("airports" in event.detail ) {
      (json as Traveler).airports = (event.detail.airports as string).split(" ")
    }
    if (this._avatar) (json as Traveler).avatar = this._avatar;

    if ( this.userid ) {
      this.dispatchMessage(["profile/save", {
        userid: this.userid,
        profile: json as Traveler
      }, {
        onSuccess: () =>
          this.mode = "view",
        onFailure: (err) => {
          console.log("Error saving profile", err);
        }
      }]);
    }
  }

  handleAvatarSelected(files: FileList) {
    if (files && files.length) {
      const reader = new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = (err) => reject(err);
        fr.readAsDataURL(files[0]);
      });

      reader.then((result: unknown) =>
        (this._avatar = result as string));
    }
  }
}
