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

  static styles = css`
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
  `;

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
