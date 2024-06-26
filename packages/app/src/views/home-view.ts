import { View } from "@calpoly/mustang";
import { css, html, TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { Tour } from "server/models";
import resetCSS from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";
import { formatDate } from "../utils/dates";

export class HomeViewElement extends View<Model, Msg> {
  @state()
  get tourIndex(): Tour[] {
    return this.model.tourIndex || [];
  }

  constructor() {
    super("blazing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["tour/index"]);
  }

  render(): TemplateResult {
    const renderItem = (t: Tour) => {
      const { name, startDate, endDate } = t;
      const { _id } = t as unknown as { _id: string };

      return html`
        <dt>
          ${startDate.getUTCFullYear()}
        </dt>
        <dt>from
          <time datetime=${startDate}>
            ${formatDate(startDate)}
          </time>
        </dt>
        <dt> to
          <time datetime=${endDate}>
            ${formatDate(endDate)}
          </time>
        </dt>
        <dd>
          <a href="/app/tour/${_id}">${name}</a>
        </dt>
      `;
    };

    return html`
      <main class="page">
        <header>
          <h2>Your Trips</h2>
        </header>
        <dl>${this.tourIndex.map(renderItem)}</dl>
      </main>
    `;
  }

  static styles = [
    resetCSS,
    css`
      :host {
        display: contents;
      }
      main.page {
        display: grid;
        grid-column: 1/-1;
        padding: var(--size-spacing-small)
          var(--size-spacing-medium);
        grid-template-columns: subgrid;
        grid-template-rows: auto auto auto 1fr;
        grid-template-areas:
          "hd hd yr dt1 dt2 dd dd dd"
          "xx xx yr dt1 dt2 dd dd dd";
        gap: var(--size-spacing-medium)
          var(--size-spacing-large);
        align-items: end;
      }
      header {
        grid-area: hd;
      }
      dl {
        display: contents;
      }
      dt {
        grid-area: yr;
        text-align: right;
      }
      dt + dt {
        grid-area: dt1;
        text-align: center;
      }
      dt + dt + dt {
        grid-area: dt2;
      }
      dd {
        grid-area: dd;
      }
      time {
        white-space: nowrap;
      }
    `
  ];
}
