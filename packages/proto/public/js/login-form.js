import { prepareTemplate } from "./template.js";
import { relayEvent } from "./relay-event.js";
import "./restful-form.js";

export class LoginFormElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <restful-form new src="/auth/login">
        <slot></slot>
      </restful-form>
    </template>
  `);

  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      LoginFormElement.template.cloneNode(true)
    );

    this.addEventListener("restful-form:created", (event) => {
      const { token } = event.detail.created;
      const redirect = this.next;
      console.log("Login successful", event.detail, redirect);

      relayEvent(event, "auth:message", [
        "auth/signin",
        { token, redirect }
      ]);
    });
  }
}

customElements.define("login-form", LoginFormElement);
