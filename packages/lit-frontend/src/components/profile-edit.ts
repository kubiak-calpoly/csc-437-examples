import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FormDataRequest } from "../rest";

@customElement("profile-edit")
export class ProfileEditElement extends LitElement {
  @property()
  path: string = "";

  render() {
    return html` <slot @submit=${this._handleSubmit}> </slot>`;
  }

  _handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const request = new FormDataRequest(data);

    request.put(this.path);
  }
}
