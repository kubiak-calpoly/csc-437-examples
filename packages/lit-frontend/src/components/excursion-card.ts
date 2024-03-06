import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Excursion, ExcursionType } from "ts-models";

@customElement("excursion-card")
class ExcursionCardElement extends LitElement {
  @property()
  type: ExcursionType;

  render() {
    return html`
      <svg class="icon">
        <use href="/icons/transportation.svg#icon-train" />
      </svg>
      <h3><slot>Name of Excursion</slot></h3>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      border: var(--line-weight-fine) solid var(--color-accent);
      padding: var(--size-spacing-medium);
      height: 100%;
    }
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
    }
    svg.icon {
      display: inline;
      fill: currentColor;
      height: var(--size-icon-large);
      width: var(--size-icon-large);
      vertical-align: middle;
      flex-shrink: 0;
    }
  `;
}
