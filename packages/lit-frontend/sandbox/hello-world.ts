import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("hello-world")
export class HelloWorldElement extends LitElement {
  render() {
    return html`<h1>
      Hello, <slot class="fancy">world</slot>!
    </h1>`;
  }

  static styles = css`
    h1 {
      font: var(--size-type-xlarge) var(--font-family-display);
    }

    .fancy {
      font-family: var(--font-family-body);
      font-style: italic;
      color: var(--color-accent);
    }

    ::slotted(*) {
      display: inline;
    }
  `;
}
