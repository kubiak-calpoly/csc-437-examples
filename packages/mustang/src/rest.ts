import * as Auth from "./auth";
import { html } from "./html";
import * as Message from "./message";
import { Observer } from "./observer";
import { shadow } from "./shadow";

type FormValues = { [key: string]: unknown };

export class FormElement extends HTMLElement {
  static observedAttributes = ["src", "new", "action"];

  get src() {
    return this.getAttribute("src");
  }

  get isNew() {
    return this.hasAttribute("new");
  }

  action?: (obj: FormValues) => Message.Base;

  set init(x: FormValues) {
    this._state = x || {};
    populateForm(this._state, this);
  }

  static template = html`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;

  get form() {
    return this.shadowRoot?.querySelector("form");
  }

  _state: FormValues = {};
  _user: Auth.User = new Auth.User();

  constructor() {
    super();
    shadow(this).template(FormElement.template);

    if (this.form) {
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (this.src || this.action) {
          console.log("Submitting form", this._state);

          if (this.action) {
            this.action(this._state);
          } else if (this.src) {
            const method = this.isNew ? "POST" : "PUT";
            const action = this.isNew ? "created" : "updated";
            const src = this.isNew
              ? this.src.replace(/[/][$]new$/, "")
              : this.src;

            submitForm(
              src,
              this._state,
              method,
              this.authorization
            )
              .then((json) => populateForm(json, this))
              .then((json) => {
                const customType = `mu-rest-form:${action}`;
                const event = new CustomEvent(customType, {
                  bubbles: true,
                  composed: true,
                  detail: {
                    method,
                    [action]: json,
                    url: src
                  }
                });
                this.dispatchEvent(event);
              })
              .catch((error) => {
                const customType = "mu-rest-form:error";
                const event = new CustomEvent(customType, {
                  bubbles: true,
                  composed: true,
                  detail: {
                    method,
                    error,
                    url: src,
                    request: this._state
                  }
                });
                this.dispatchEvent(event);
              });
          }
        }
      });
    }

    this.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      if (target) {
        const name = target.name as string;
        const value = target.value;

        if (name) this._state[name] = value;
      }
    });
  }

  _authObserver = new Observer<Auth.Model>(
    this,
    "blazing:auth"
  );

  get authorization() {
    if (this._user?.authenticated) {
      const user = this._user as Auth.AuthenticatedUser;
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
        if (this.src && !this.isNew) {
          fetchData(this.src, this.authorization).then(
            (json) => {
              this._state = json;
              populateForm(json, this);
            }
          );
        }
      }
    });
  }

  attributeChangedCallback(
    name: string,
    oldValue: unknown,
    newValue: unknown
  ) {
    switch (name) {
      case "src":
        if (
          this.src &&
          newValue &&
          newValue !== oldValue &&
          !this.isNew
        ) {
          fetchData(this.src, this.authorization).then(
            (json) => {
              this._state = json;
              populateForm(json, this);
            }
          );
        }
        break;
      case "new":
        if (newValue) {
          this._state = {};
          populateForm({}, this);
        }
        break;
    }
  }
}

export function fetchData(src: string, authorization: {}) {
  return fetch(src, { headers: authorization })
    .then((response) => {
      if (response.status !== 200) {
        throw `Status: ${response.status}`;
      }
      return response.json();
    })
    .catch((error) =>
      console.log(`Failed to load form from ${src}:`, error)
    );
}

function populateForm(json: object, formBody: HTMLElement) {
  const entries = Object.entries(json);

  for (const [key, val] of entries) {
    const el = formBody.querySelector(`[name="${key}"]`);

    // console.log(`Populating ${key}`, input);
    if (el) {
      const input = el as HTMLInputElement;
      switch (input.type) {
        case "checkbox":
          const checkbox = input as { checked: boolean };
          checkbox.checked = Boolean(val);
          break;
        default:
          input.value = val;
          break;
      }
    }
  }

  return json;
}

function submitForm(
  src: string,
  json: object,
  method = "PUT",
  authorization = {}
) {
  return fetch(src, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authorization
    },
    body: JSON.stringify(json)
  }).then((res) => {
    if (res.status != 200 && res.status != 201)
      throw `Form submission failed: Status ${res.status}`;
    return res.json();
  });
}
