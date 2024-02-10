import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";
import { consume } from "@lit/context";
import { APIUser, APIRequest } from "../rest";
import { authContext } from "./auth-required";
import { Profile } from "ts-models";

@customElement("blazing-header")
export class BlazingHeaderElement extends LitElement {
  @property()
  path: string = "";

  @state()
  profile?: Profile;

  @consume({ context: authContext, subscribe: true })
  @property({ attribute: false })
  user = new APIUser();

  render() {
    const { avatar, name, nickname, userid, color } =
      this.profile || {};
    const shortname = nickname || (name && name.split(" ")[0]);

    return html`
      <header>
        <h1>Blazing Travels</h1>
        <p>
          Hello,
          <drop-down align="right">
            ${shortname}
            <user-panel
              slot="menu"
              avatar=${avatar}
              color=${color}
              userid=${userid}>
              <span slot="name">${name}</span>
            </user-panel>
          </drop-down>
        </p>
      </header>
    `;
  }

  static styles = css`
    header {
      grid-area: header;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      padding: var(--size-spacing-medium);
      gap: 0 var(--size-spacing-xlarge);
      background-color: var(--color-background-header);
      color: var(--color-text-inverted);
    }
    header * + :last-child {
      flex-grow: 1;
      text-align: right;
    }
    header h1 {
      white-space: nowrap;
    }
    header a {
      color: var(--color-link-inverted);
    }
  `;

  updated(changedProperties: Map<string, any>) {
    console.log(
      "Profile Data has been updated",
      changedProperties
    );
    if (changedProperties.get("user")) {
      this._getData(this.path);
    }
    return true;
  }

  _getData(path: string) {
    const request = new APIRequest();

    request
      .get(path)
      .then((response: Response) => {
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
