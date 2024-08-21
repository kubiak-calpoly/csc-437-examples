import { relay } from "./event";
import { html, shadow } from "./html";

type FormValues = { [key: string]: unknown };

type SubmitEvent<T> = CustomEvent & { detail: T };

class FormElement extends HTMLElement {
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

  constructor() {
    super();
    shadow(FormElement.template).attach(this);

    this.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      if (target) {
        const name = target.name as string;
        const value = target.value;

        if (name) this._state[name] = value;
      }
    });

    if (this.form) {
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        relay(event, "mu-form:submit", this._state);
      });
    }
  }
}

function populateForm(json: object, formBody: HTMLElement) {
  const entries = Object.entries(json);

  for (const [key, val] of entries) {
    const el = formBody.querySelector(`[name="${key}"]`);

    if (el) {
      const input = el as HTMLInputElement;
      switch (input.type) {
        case "checkbox":
          const checkbox = input as { checked: boolean };
          checkbox.checked = Boolean(val);
          break;
        case "date":
          input.value = (val as Date)
            .toISOString()
            .substr(0, 10);
          break;
        default:
          input.value = val;
          break;
      }
    }
  }

  return json;
}

export {
  FormElement as Element,
  type SubmitEvent,
  type FormValues as Values
};
