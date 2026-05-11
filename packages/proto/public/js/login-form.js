import { css, html, shadow } from "@unbndl/html";
import { createViewModel, fromInputs } from "@unbndl/view";
import reset from "./reset.css.js";

export class LoginFormElement extends HTMLElement {
  viewModel = createViewModel({
    username: "",
    password: ""
  })
    .with(fromInputs(shadow(this).root),
      "username", "password"
  );

  view = html`<form>
      <slot></slot>
      <button type="submit">
        <slot name="submit-label">Login</slot>
      </button>
    </form>`;

  constructor() {
    super();
    shadow(this)
      .styles(reset.styles, LoginFormElement.styles)
      .replace(this.viewModel.render(this.view));

    this.shadowRoot?.addEventListener("submit", (ev) =>
      this.submitLogin(ev, this.getAttribute("api") || "#")
    );
  }

  submitLogin(event, endpoint) {
    event.preventDefault();
    const data = this.viewModel.toObject();
    const method = "POST";
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(data);
    console.log("Posting login form:", endpoint, body, event);
    fetch(endpoint, { method, headers, body })
      .then((res) => {
        if (res.status !== 200)
          throw `Form submission failed: Status ${res.status}`;
        return res.json();
      })
      .then((json) => {
        const { token } = json;
        const customEvent = new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect: "/" }]
        });
        this.dispatchEvent(customEvent);
      });
  }

  static styles = css`
    :host {
      display: contents;
    }
    form {
      display: contents;
    }
  `;

}
