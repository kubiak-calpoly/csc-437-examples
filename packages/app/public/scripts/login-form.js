import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class LoginForm extends HTMLElement {
  static template = html`<template>
    <form onsubmit="false;">
      <slot name="title">
        <h3>Sign in with Username and Password</h3>
      </slot>
      <label>
        <span>
          <slot name="username">Username</slot>
        </span>
        <input name="username" autocomplete="off" />
      </label>
      <label>
        <span>
          <slot name="password">Password</slot>
        </span>
        <input type="password" name="password" />
      </label>
      <slot name="submit">
        <button type="submit">Sign In</button>
      </slot>
    </form>
  </template>`;

  static styles = css`
    form {
      display: grid;
      grid-column: 1/-1;
      grid-template-columns: subgrid;
      gap: inherit;
    }

    label {
      display: contents;

      > span {
        grid-column: 1 / auto;
        justify-self: end;
      }
      > input {
        grid-column: auto / span 2;
      }
    }

    ::slotted(*[slot="title"]),
    slot[name="title"] > * {
      grid-column: 1/-1;
    }

    ::slotted(button[slot="submit"]),
    button[type="submit"] {
      grid-column: 2 / -2;
      align-self: center;
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("form");
  }

  constructor() {
    super();

    shadow(this)
      .template(LoginForm.template)
      .styles(reset.styles, headings.styles, LoginForm.styles);

    this.form.addEventListener("submit", (event) =>
      submitLoginForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}

function submitLoginForm(event, endpoint, redirect) {
  event.preventDefault();
  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(Object.fromEntries(data));

  console.log("POST login request:", body);

  fetch(endpoint, { method, headers, body })
    .then((res) => {
      if (res.status !== 200)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      const { token } = payload;

      form.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect }]
        })
      );
    })
    .catch((err) => console.log("Error submitting form:", err));
}
