import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("input-array")
export class InputArrayElement extends LitElement {
  @property()
  name: string = "";

  @property()
  value: string[] = [];

  render() {
    const renderOne = (s: string, i: number) =>
      html`
        <input
          @change=${(ev: Event) => this._handleChange(ev, i)}
          name=${[this.name, i].join(".")}
          .value=${s} />
        <button
          class="remove"
          @click=${() => this._removeInput(i)}>
          Remove
        </button>
      `;

    return html`${this.value.map(renderOne)}
      <button class="add" @click=${this._addInput}>
        + Add ${this.value.length ? "another" : "one"}
      </button> `;
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr auto;
    }
    input,
    button {
      font: inherit;
      line-height: inherit;
      margin: 0.25em;
    }
    input {
      grid-column: 1;
    }
    button.remove {
      grid-column: 2;
    }
    button.add {
      grid-column: 1/2;
    }
  `;

  _handleChange(ev: Event, i: number) {
    const target = ev.target as HTMLInputElement;
    const value = target.value;
    const composedEvent = new Event(ev.type, {
      bubbles: true,
      composed: true
    });

    this.value[i] = value;
    this.dispatchEvent(composedEvent);
  }

  _addInput() {
    this.value = this.value.concat([""]);
  }

  _removeInput(i: number) {
    this.value.splice(i, 1);
    this.requestUpdate();
  }
}
