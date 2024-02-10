import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { consume } from "@lit/context";
import {
  AuthenticatedUser,
  authContext,
  JSONRequest
} from "../rest";
import { Profile } from "ts-models";

@customElement("profile-form")
export class ProfileFormlement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  authenticatedUser?: AuthenticatedUser;

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

  updated(changedProperties) {
    console.log("updated Profile Form", changedProperties);
    if (changedProperties.get("authenticatedUser")) {
      this._getData(this.path);
    }
    return true;
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
    const dob = "1991-08-06";
    const color = "#663399";

    return html`
      <form
        @submit=${this._handleSubmit}
        @change=${this._handleChange}>
        <label>
          <span>Username</span>
          <input name="userid" value=${userid} />
        </label>
        <label>
          <span>Avatar</span>
          <input name="avatar" value=${avatar} />
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
          <span>Color</span>
          <input type="color" name="color" value=${color} />
        </label>
        <label>
          <span>Birthdate</span>
          <input name="dob" type="date" value=${dob} />
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
    const request = new JSONRequest();

    request
      .authenticate(this.authenticatedUser)
      .get(path)
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

  _handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    let profile = this.profile;

    console.log("Changed", name, value);
    (profile as any)[name] = value;

    this.profile = profile;
  }

  _handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const request = new JSONRequest(this.profile);

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
