import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { reset, elements } from "../shared/css-base";

@customElement("blazing-header")
export class BlazingHeader extends LitElement {
  @property()
  title: string = "A site for travelers";

  render() {
    return html`
      <header>
        <h1>Blazing Travels</h1>
        <p>${this.title}</p>
      </header>
    `;
  }

  static styles = [
    reset,
    elements,
    css`
      header {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
      }
      header a {
        color: var(--color-link-inverted);
      }
    `
  ];
}
