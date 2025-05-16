import { Auth, define, Form, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Destination } from "./models/itinerary.ts";
import { formatDate, convertStartEndDates } from "./models/dates.ts";
import { AccommodationElement } from "./accommodation";
import reset from "./styles/reset.css";

export class DestinationViewElement extends LitElement {
  static uses = define({
    "accommodation-info": AccommodationElement,
    "mu-form": Form.Element
  });

  @property()
  src?: string;

  @state()
  destination?: Destination;

  @property()
  mode = "view";

  override render() {
    return this.mode === "edit" ?
      this.renderEditor() :
      this.renderView();
  }

  renderView() {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
    } = this.destination || ({} as Destination);

    return html`
        <header>

          <h2>${name}</h2>
          <p>
            from ${formatDate(startDate)} to
            ${formatDate(endDate)}
            ${endDate && endDate.getFullYear()}
          </p>
          <nav>
          <button @click=${() => {
            this.mode = "edit";
          }}>
            Edit
          </button></nav>
        </header>

        <img class="hero" src=${featuredImage} />
    `;
  }

  renderEditor() {
    const {
      name,
      startDate,
      endDate,
      featuredImage,
    } = this.destination || ({} as Destination);

    function textInput(name: string, value: string = "") {
      return html`<input
        id="${name}-input"
        name="${name}"
        value=${value}>`;
    }

    function dateInput(name: string, value: Date) {
      return html`<input
        id="${name}-input"
        type="date"
        name="${name}"
        value=${value.toISOString().substring(0,10)}>`;
    }

    return html`
      <mu-form @mu-form:submit=${(e: CustomEvent) => {
        if (this.src)
          this.handleSubmit(this.src, e.detail as Destination)
      }
      }>
        <header>
          <h2>${textInput("name", name)}</h2>
          <dl>
            <dt>from</dt>
            <dd>${dateInput("startDate", startDate)}</dd>
            <dt>to</dt>
            <dd>${dateInput("endDate", endDate)}</dd>
          </dl>
        </header>
        <img class="hero" src=${featuredImage} />
      </mu-form>
    `;
  }
  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      header {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / span 4;
        grid-auto-flow: dense;
      }
    mu-form {
      display: contents;
    }
    nav {
      grid-column: auto / -1;
      text-align: right;
    }
    h2 {
      grid-column: 1 / span 3;
    }
    p {
      grid-column: 2 / -1;
    }
    input {
     margin: var(--size-spacing-medium) 0;
     font: inherit;
    }
    dl {
      display: grid;
      grid-column: 1 / span 4;
      grid-template-columns: subgrid;
      align-items: baseline;
    }
    dt {
      color: var(--color-accent);
      font-family: var(--font-family-display);
    }
    dd {
      grid-column: span 3 / -1;
    }
    `
  ];

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
        this.destination = convertStartEndDates<Destination>(json)
      )
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }

  handleSubmit(src: string, destination: Destination) {
    fetch( src, {
      headers: {
        "Content-Type": "application/json",
        ...this.authorization
      },
      method: "PUT",
      body: JSON.stringify(destination)
    })
      .then(res => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        else return res.json()
      })
      .then((json: unknown) => {
        this.destination = convertStartEndDates<Destination>(json);
        this.mode = "view";
      })
  }
}
