import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "./models/traveler.ts";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";
import {
  define, Auth, Observer, Form
} from "@calpoly/mustang";

export class ProfileElement extends LitElement {
  static uses = define({
    "mu-form": Form.Element
  });

  @property()
  src?: string;

  @state()
  traveler?: Traveler;

  @property()
  mode = "view";

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
        @mu-form:submit=${(e: CustomEvent) => {
          if (this.src)
            this.handleSubmit(this.src, e.detail )
      }
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
      </mu-form>`;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
    :host {
      display: contents;
      grid-column: 2/-2;
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

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user?: Auth.User;

  override connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src) this.hydrate(this.src);
    });
  }

  get authorization(): { Authorization?: string } {
    if (this._user && this._user.authenticated)
      return {
        Authorization:
          `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
      };
    else return {};
  }

  hydrate(url: string) {
    fetch(
      url,
      { headers: this.authorization }
    )
      .then((res: Response) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json: unknown) =>
        this.traveler = json as Traveler
      )
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }

  _avatar? : string; // the avatar, base64 encoded

  handleSubmit(src: string, formData: object) {
    const json: object = {
      ...this.traveler,
      ...formData
    }

    if ("airports" in formData ) {
      (json as Traveler).airports = (formData.airports as string).split(" ")
    }
    if (this._avatar) (json as Traveler).avatar = this._avatar;

    fetch( src, {
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      method: "PUT",
      body: JSON.stringify(json)
    })
    .then(res => {
      if (res.status !== 200) throw `Status: ${res.status}`;
      else return res.json()
    })
    .then((json: unknown) => {
      this.traveler = json as Traveler;
      this.mode = "view";
    })
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


