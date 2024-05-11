import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export class DropdownElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean;

  render() {
    return html`
      <slot name="actuator"><button> Menu </button></slot>
      <div id="panel">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      position: relative;
    }
    #is-shown {
      display: none;
    }
    #panel {
      display: none;
      position: absolute;
      right: 0;
      margin-top: var(--size-spacing-small);
      width: max-content;
      padding: var(--size-spacing-small);
      border-radius: var(--size-radius-small);
      background: var(--color-background-card);
      color: var(--color-text);
      box-shadow: var(--shadow-popover);
    }
    :host([open]) #panel {
      display: block;
    }
  `;

  constructor() {
    super();

    this.addEventListener(
      "click",
      () => (this.open = !this.open)
    );
  }
}
