import { css, html, shadow } from "@unbndl/html";
import { createViewModel, fromInputs } from "@unbndl/view";
import reset from "../styles/reset.css.js";
import headings from "../styles/headings.css.js";

interface LoginFormState {
  username: string;
  password: string;
}

export class LoginFormElement extends HTMLElement {
  static template = html`<template>
    <form>
      <slot></slot>
      <button type="submit">
        <slot name="submit-label">Login</slot>
      </button>
    </form>
  </template>`;

  static styles = css`
    :host {
      display: contents;
    }
    form {
      display: contents;
    }
  `;

  viewModel = createViewModel<LoginFormState>({
    username: "", password: ""
  })
    .with<LoginFormState>(
      fromInputs(shadow(this).root),
      "username", "password"
    );

  constructor() {
    super();
    shadow(this)
      .template(LoginFormElement.template)
      .styles(reset.styles, headings.styles, LoginFormElement.styles);

    this.shadowRoot?.addEventListener("submit", (ev: Event) =>
      this.submitLogin(ev as SubmitEvent, this.getAttribute("api") || "#")
    );

    this.viewModel.createEffect(($) =>
      console.log("Credentials:", $.username, $.password)
    );
  }

  submitLogin(event: SubmitEvent, endpoint: string) {
    event.preventDefault(); // [1]
    const data = this.viewModel.toObject(); // [3]
    const method = "POST"; // [4]
    const headers = {
      "Content-Type": "application/json" // [5]
    };
    const body = JSON.stringify(data); // [6]
    console.log("Posting login form:", endpoint, body, event);
    fetch(endpoint, { method, headers, body }) // [7]
      .then((res) => {
        if (res.status !== 200)
          throw `Form submission failed: Status ${res.status}`;
        return res.json(); // [8]
      })
      .then((json: unknown) => {
        const { token } = json as { token: string }; // [1]
        const customEvent = new CustomEvent("auth:message", {
          // [2]
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect: "/" }] // [3]
        });

        this.dispatchEvent(customEvent); // [4]
      });
  }
}
