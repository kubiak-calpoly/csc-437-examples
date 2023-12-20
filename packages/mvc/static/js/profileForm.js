import { FormDataRequest, html } from "/js/utils/index.js";

export class ProfileForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      ProfileForm.template.cloneNode(true)
    );
  }

  static template = html`
    <slot id="form"></slot>
    <div id="footer">
      <button
        type="button"
        onclick="ProfileForm.handleSubmit(event)">
        <slot name="ok">Ok</slot>
      </button>
    </div>
    <style>
      #footer {
        grid-column: value;
        background: var(--color-background-shading);
        padding: var(--size-spacing-medium);
        border-radius: var(--size-corner-medium);
      }
      button {
        font-family: var(--font-family-display);
        background: var(--color-background-control);
        border-radius: var(--size-corner-medium);
        padding: var(--size-spacing-small);
      }
    </style>
  `;

  static handleSubmit(event) {
    const root = event.currentTarget.getRootNode();
    const formSlot = root.getElementById("form");
    const slotted = formSlot.assignedElements();
    const data = new FormData(slotted[0]);
    const request = new FormDataRequest(data);

    request.post("/api/profiles");
  }
}

if (window) window.ProfileForm = ProfileForm;

export class FormControl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      FormControl.template.cloneNode(true)
    );
  }

  static template = html`
    <label>
      <slot name="label">Label</slot>
      <slot id="control"></slot>
    </label>
    <style>
      :host {
        display: contents;
      }
      label {
        display: contents;
      }
  `;

  connectedCallback() {
    const name = this.getAttribute("name");
    const controls = this.shadowRoot
      .getElementById("control")
      .assignedElements();

    controls[0].setAttribute("name", name);
  }
}
