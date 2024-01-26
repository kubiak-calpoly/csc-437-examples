import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("toggle-switch")
class ToggleSwitchElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  render() {
    return html`<label>
      <slot>Label</slot>
      <span class="slider">
        <input type="checkbox" />
      </span>
    </label>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-spacing-medium);
      line-height: 2em;
    }
    .slider {
      display: inline-block;
      border: 1px solid var(--color-border-control);
      border-radius: 0.75em;
      background-color: var(--color-background-control);
      height: 1.5em;
      width: 2.75em;
      position: relative;
      transition: background-color
        var(--time-transition-control);
    }
    .slider:has(input:checked) {
      background-color: var(--color-accent);
    }
    input {
      appearance: none;
      background-color: var(--color-foreground-control);
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      vertical-align: center;
      position: absolute;
      left: 0;
      transition: left var(--time-transition-control);
    }
    input:checked {
      left: 1.5em;
    }
  `;
}
