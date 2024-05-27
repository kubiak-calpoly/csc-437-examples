import { define, Events, Rest } from "@calpoly/mustang";
import { html, LitElement } from "lit";

define({ "restful-form": Rest.FormElement });

export class SignupFormElement extends LitElement {
  render() {
    return html`
      <restful-form new src="/auth/register">
        <slot></slot>
      </restful-form>
    `;
  }

  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  constructor() {
    super();

    this.addEventListener(
      "mu-rest-form:created",
      (event: Event) => {
        const detail = (event as CustomEvent).detail;
        const { token } = detail.created;
        const redirect = this.next || "/";
        console.log("Signup successful", detail, redirect);

        Events.relay(event, "auth:message", [
          "auth/signin",
          { token, redirect }
        ]);
      }
    );
  }
}
