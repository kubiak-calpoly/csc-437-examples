import { css } from "../css";
import { html } from "../html";
import { shadow } from "../shadow";

class DropdownElement extends HTMLElement {
  static template = html` <template>
    <slot name="actuator"><button>Menu</button></slot>
    <div id="panel">
      <slot></slot>
    </div>
  </template>`;

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

    shadow(this)
      .template(DropdownElement.template)
      .styles(DropdownElement.styles);

    if (this.shadowRoot) {
      const actuator = this.shadowRoot.querySelector(
        "slot[name='actuator']"
      );
      if (actuator)
        actuator.addEventListener("click", () => this.toggle());
    }
  }

  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

export { DropdownElement as Element };
