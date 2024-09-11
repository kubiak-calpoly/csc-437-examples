import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { ExcursionType } from "server/models";

const icon: { [key: string]: string } = {
  air: "icon-airplane",
  bike: "icon-bike",
  boat: "icon-train",
  bus: "icon-train",
  metro: "icon-train",
  train: "icon-train",
  walking: "icon-train",
  tour: "icon-train"
};

export class ExcursionCardElement extends LitElement {
  @property()
  type: ExcursionType;

  render() {
    const trans_icon = `/icons/transportation.svg#${icon[this.type || "tour"]
      }`;

    return html`
      <div class="card">
        <svg class="icon">
          <use href=${trans_icon} />
        </svg>
        <h3><slot>Name of Excursion</slot></h3>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      container: card / inline-size;
      height: 100%;
    }
    .card {
      display: flex;
      flex-direction: column;
      border: var(--line-weight-fine) solid var(--color-accent);
      padding: var(--size-spacing-medium);
      height: 100%;
    }
    @container card (min-width: 15rem) {
      .card {
        flex-direction: row;
      }
    }
    h3 {
      font-family: var(--font-family-display);
      line-height: var(--font-line-height-display);
      font-size: var(--size-type-large);
      font-weight: var(--font-weight-normal);
      font-style: oblique;
      margin: 0;
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
