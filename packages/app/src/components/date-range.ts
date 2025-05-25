import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { formatDate } from "server/models";

export class DateRangeElement extends LitElement {
  @property()
  from?: string;

  @property()
  to?: string;

  render() {
    return html`
      <span>${formatDate(this.from)}</span>
      ${this.to ? 
      html`<span>&nbsp;&ndash;&nbsp;${formatDate(this.to)}</span>` :
      ""}
    `;
  }

  static styles = css`
    span {
      white-space: nowrap;
    }
  `;
}
