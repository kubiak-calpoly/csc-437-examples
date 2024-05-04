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

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      LoginFormElement.template.cloneNode(true)
    );

    this.addEventListener("restful-form:created", (event) => {
      console.log("Login successful", event.detail);
      relayEvent(event, "auth:message", [
        "auth/signin",
        event.detail.created
      ]);
    });
  }
}

customElements.define("login-form", LoginFormElement);
