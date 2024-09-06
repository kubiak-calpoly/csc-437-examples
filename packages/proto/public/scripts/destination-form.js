import {
  css,
  define,
  html,
  shadow,
  Form,
  InputArray,
  Observer
} from "@calpoly/mustang";
import reset from "./styles/reset.css.js";
import headings from "./styles/headings.css.js";

export class DestinationForm extends HTMLElement {
  static uses = define({
    "mu-form": Form.Element,
    "input-array": InputArray.Element
  });

  static template = html`<template>
    <mu-form>
      <h3>Destination</h3>
      <label>
        <span>Name</span>
        <input name="name" />
      </label>
      <label>
        <span>Dates</span>
        <input type="date" name="startDate" />
        to
        <input type="date" name="endDate" />
      </label>
      <fieldset>
        <h3>Accommodation</h3>
        <label>
          <span>Name</span>
          <input name="acc-name" />
        </label>
        <label>
          <span>Check-in</span>
          <input type="date" name="acc-checkIn" />
        </label>
        <label>
          <span>Check-out</span>
          <input type="date" name="acc-checkOut" />
        </label>
        <label>
          <span>Room type</span>
          <select name="acc-roomType">
            <option value="S">Single</option>
            <option value="D">Double (full bed)</option>
            <option value="Q">Queen</option>
            <option value="K">King</option>
            <option value="2T">Two twin beds</option>
            <option value="2D">Two full beds</option>
            <option value="2Q">Two queen beds</option>
            <option value="Dorm">Dormitory</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          <span>Room Rate</span>
          <input type="number" name="acc-rate-amount" />
          <select name="acc-rate-currency">
            <option value="USD" selected>USD</option>
            <option value="EUR">€</option>
          </select>
        </label>
      </fieldset>
      <fieldset>
        <h3>Excursions</h3>
        <label>
          <span></span>
        <input-array name="excursions"> </input-array>
      </fieldset>
    </mu-form>
  </template>`;

  static styles = css`
    :host {
      display: grid;
      grid-column: 1 / span 6;
      grid-template-columns: subgrid;
      gap: inherit;
    }

    mu-form {
      grid-column: 1/-1;
    }

    input {
      grid-column: input;
    }

    fieldset {
      > label {
        display: grid;
        grid-column: label / end;
        grid-template-columns: subgrid;
        gap: var(--size-spacing-medium);
      }
    }
  `;

  constructor() {
    super();

    shadow(this)
      .template(DestinationForm.template)
      .styles(
        reset.styles,
        headings.styles,
        DestinationForm.styles
      );

    this.addEventListener("mu-form:submit", (event) => {
      submitDestinationForm(
        event,
        this.getAttribute("api"),
        this.authorization,
        this.getAttribute("redirect") || "?mode=view"
      );
    });
  }

  get mode() {
    return this.getAttribute("mode");
  }

  get form() {
    return this.shadowRoot.querySelector("mu-form");
  }

  _authObserver = new Observer(this, "blazing:auth");

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._user = user;
    });

    if (this.mode === "new") return;

    const acc = JSON.parse(this.getAttribute("accommodation"));
    const exc = JSON.parse(this.getAttribute("excursions"));

    this.form.init = {
      name: this.getAttribute("name"),
      startDate: new Date(this.getAttribute("startDate")),
      endDate: new Date(this.getAttribute("endDate")),
      featuredImage: this.getAttribute("featuredImage"),
      "acc-name": acc.name,
      "acc-checkIn": new Date(acc.checkIn),
      "acc-checkOut": new Date(acc.checkOut),
      "acc-roomType": acc.roomType,
      "acc-rate-amount": parseFloat(acc.rate.amount),
      "acc-rate-currency": acc.rate.currency,
      excursions: exc.map((x) => x.name)
    };
  }
}

function submitDestinationForm(
  event,
  endpoint,
  auth,
  redirect
) {
  const method = "PUT";
  const headers = {
    "Content-Type": "application/json",
    ...auth
  };
  let json = event.detail;

  const ex = (n) => {
    const value = json[n];

    delete json[n];
    return value;
  };

  json.accommodations = [
    {
      name: ex("acc-name"),
      checkIn: ex("acc-checkIn"),
      checkOut: ex("acc-checkOut"),
      roomType: ex("acc-roomType"),
      rate: {
        amount: ex("acc-rate-amount"),
        currency: ex("acc-rate-currency")
      }
    }
  ];

  json.excursions = json.excursions.map((name) => ({
    name,
    type: "tour"
  }));

  fetch(endpoint, {
    method,
    headers,
    body: JSON.stringify(json)
  })
    .then((res) => {
      if (res.status !== 200)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      console.log("New destination value:", payload);
      document.location.assign(redirect);
    })
    .catch((err) => console.log("Error submitting form:", err));
}
