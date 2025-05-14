import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "./models/traveler.ts";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";
import { Auth, Observer } from "@calpoly/mustang";

export class ProfileElement extends LitElement {
  @property()
  src?: string;

  @state()
  traveler?: Traveler;

  @property()
  mode = "view";

  override render() {
    const {
      userid,
      name,
      nickname,
      home,
      airports = [],
      avatar,
      color
    } = this.traveler || {};
    const editing = this.mode === "edit";

    function textInput(name: string, value: string = "") {
      if (!editing) return value;
      else return html`<input 
        id="${name}-input"
        name="${name}" 
        value=${value}>`;
    }

    function inputLabel(name: string, label: string) {
      if (!editing) return label;
      else return html`<label for="${name}-input">${label}</label>`;
    }

    return html`
      <p>${!editing ? html`
        <button @click=${() => {this.mode="edit"}}>
          Edit
        </button>
        ` : ""}
      </p>
      <img src=${avatar} alt=${name} />
      <h1>${textInput('name', name)}</h1>
      <dl>
        <dt>Username</dt>
        <dd>${userid}</dd>
        <dt>${inputLabel('nickname', 'Nickname')}</dt>
        <dd>${textInput('nickname', nickname)}</dd>
        <dt>Home City</dt>
        <dd>${home}</dd>
        <dt>Airports</dt>
        <dd>${airports.join(", ")}</dd>
        <dt>Favorite Color</dt>
        <dd>
          <slot name="color-swatch">
            <span
              class="swatch"
              style="background: #${color}"></span>
          </slot>
          <slot name="color-name">#${color}</slot>
        </dd>
      </dl>
      </section>
      </template>`;
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
  `];

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  _user? : Auth.User;

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
}


