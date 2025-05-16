import { Auth, define, Observer } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Destination } from "./models/itinerary.ts";
import { formatDate, convertStartEndDates } from "./models/dates.ts";
import { AccommodationElement } from "./accommodation";
import reset from "./styles/reset.css";

export class DestinationViewElement extends LitElement {
  static uses = define({
    "accommodation-info": AccommodationElement
  });

  @property()
  src?: string;

  @state()
  destination?: Destination;

  render() {
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
        </header>
        <img class="hero" src=${featuredImage} />
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: contents;
      }
      header {
        grid-column: 1 / span 3;
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

}
