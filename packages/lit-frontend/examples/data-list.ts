import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("data-list")
export class DataList extends LitElement {
  @property()
  data: Object = {};

  protected render() {
    const entries = Object.entries(this.data);

    const dtdd = (key: string, value: any) =>
      html`<dt>${key}</dt>
        <dd>${JSON.stringify(value)}</dd>`;

    return html`
      <dl>${entries.map(([k, v]) => dtdd(k, v))}</dl>
    `;
  }
}
