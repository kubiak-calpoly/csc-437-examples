import { css, html, shadow } from "@unbndl/html";
import { createView, createViewModel, fromAttributes } from "@unbndl/view";
import { formatDate } from "../utils/dates.ts";

interface DateRangeModel {
  from?: string;
  to?: string;
}

type DateRangeAttributes = DateRangeModel;

export class DateRangeElement extends HTMLElement {
  viewModel = createViewModel<DateRangeModel>()
    .with(fromAttributes<DateRangeAttributes>(this), "from", "to");

  view = createView<DateRangeModel>(
    html`
      <span>${$ => formatDate($.from)}</span>
      ${$ => $.to ?
        html`<span>&nbsp;&ndash;&nbsp;${formatDate($.to)}</span>` :
        ""}
    `
  );

  constructor() {
    super();
    shadow(this)
      .styles(DateRangeElement.styles)
      .replace(this.viewModel.render(this.view));
  }

  static styles = css`
    span {
      white-space: nowrap;
    }
  `;
}
