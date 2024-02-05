import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { serverPath } from "./rest";
import { Profile } from "./models/profile";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  connectedCallback() {
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    console.log("attributeChanged", oldValue, newValue);
    if (name === "path" && oldValue !== newValue && oldValue) {
      this._fetchData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    const profile =
      this.profile ||
      ({
        userid: "youruserid",
        name: "Your Name",
        city: "Hometown, USA",
        airports: ["ABC", "XYZ"]
      } as Profile);

    const {
      userid,
      name,
      nickname,
      city,
      airports,
      avatar,
      color
    } = profile;

    const avatarImg = avatar
      ? html`<img src="${avatar}" />`
      : (nickname || name).slice(0, 1);
    const colorStyle = color
      ? `--avatar-backgroundColor: ${color}`
      : "";
    const renderAirport = (s: string) => html`<dd>${s}</dd>`;

    return html`
      <section>
        <div class="avatar" style=${colorStyle}>
          ${avatarImg}
        </div>
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

  static styles = [
    css`
      :host {
        --avatar-backgroundColor: var(--color-accent);
        --avatar-size: 100px;
        padding: var(--size-spacing-medium);
      }
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
      .avatar {
        grid-column: key;
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

  _fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        this.profile = json as Profile;
      });
  }
}

@customElement("user-profile-edit")
export class UserProfileEditElement extends UserProfileElement {
  render() {
    const profile =
      this.profile ||
      ({
        userid: "youruserid",
        name: "Your Name",
        city: "Hometown, USA",
        airports: ["ABC", "XYZ"]
      } as Profile);

    const { userid, name, nickname, city, airports } = profile;

    return html`
      <section>
        <form @submit=${this._handleSubmit}>
          <dl>
            <dt>Username</dt>
            <dd><input name="userid" value=${userid} /></dd>
            <dt>Name</dt>
            <dd><input name="name" value=${name} /></dd>
            <dt>Nickname</dt>
            <dd><input name="nickname" value=${nickname} /></dd>
            <dt>Home City</dt>
            <dd><input name="city" value=${city} /></dd>
            <dt>Airports</dt>
            <dd
              ><input
                name="airports"
                value=${airports.join(", ")}
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
    `
  ];

  _handleSubmit(ev: Event) {
    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]))
      .map(([k, v]) =>
        k === "airports"
          ? [k, (v as string).split(",").map((s) => s.trim())]
          : [k, v]
      );
    const json = Object.fromEntries(entries);

    console.log("Submitting Form", json);

    this._putData(json);
  }

  _putData(json: Profile) {
    fetch(serverPath(this.path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
        if (json) {
          console.log("PUT request successful:", json);
          this.profile = json as Profile;
        }
      })
      .catch((err) =>
        console.log("Failed to POST form data", err)
      );
  }
}
