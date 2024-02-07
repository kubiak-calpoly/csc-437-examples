import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { serverPath, FormDataRequest } from "./rest";
import { Profile } from "./models/profile";

@customElement("profile-form")
export class ProfileFormlement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  connectedCallback() {
    if (this.path) {
      this._getData(this.path);
    }
    super.connectedCallback();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (name === "path" && oldValue !== newValue && oldValue) {
      this._getData(newValue);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  render() {
    const {
      userid,
      name,
      nickname,
      city,
      airports = [],
      avatar
    } = (this.profile || {}) as Profile;

    return html`
      <form @submit=${this._handleSubmit}>
        <label>
          <span>Username</span>
          <input name="userid" value=${userid} />
        </label>
        <label>
          <span>Name</span>
          <input name="name" value=${name} />
        </label>
        <label>
          <span>Nickname</span>
          <input name="nickname" value=${nickname} />
        </label>
        <label>
          <span>Home City</span>
          <input name="city" value=${city} />
        </label>
        <label>
          <span>Airports</span>
          <input-array name="airports" .value=${airports}>
          </input-array>
        </label>
        <label>
          <span>Avatar</span>
          <input name="avatar" value=${avatar} />
        </label>
        <button type="submit">Submit</button>
      </form>
    `;
  }

  static styles = css`
    form {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: baseline;
    }
    form > label {
      display: contents;
    }
    input,
    button {
      font: inherit;
      line-height: inherit;
      margin: 0.25em;
    }
    button {
      grid-column: 2;
    }
  `;

  _getData(path: string) {
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

  _handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const request = new FormDataRequest(data);

    request
      .put(this.path)
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
