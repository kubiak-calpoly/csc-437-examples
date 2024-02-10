import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("preset-buttons")
export class PresetButtonsElement extends LitElement {
  @property({ reflect: true, type: Number })
  value: number | undefined;

  @property()
  name = "preset";

  @property({ attribute: false })
  options: number[] = [1, 2, 3, 4, 5];

  _renderButton(n: number) {
    const checked = this.value === n;

    return html`
      <label>
        <input
          type="radio"
          name=${this.name}
          .value=${n}
          .checked=${checked} />
        ${n}
      </label>
    `;
  }

  render() {
    return html`
      <div>
        <span><slot></slot></span>
        <span class="switches" @change=${this._handleChange}>
          ${this.options.map((n) => this._renderButton(n))}
        </span>
      </div>
    `;
  }

  static styles = css`
    * {
      margin: 0;
      box-sizing: border-box;
    }
    div {
      display: flex;
      flex-direction: column;
    }
    span.switches {
      display: flex;
      justify-content: stretch;
      border-radius: var(--size-corner-medium);
      border: var(--line-weight-fine) solid var(--color-accent);
      overflow: hidden;
      align-item: end;
      margin: var(--size-spacing-small) 0;
    }
    label {
      display: inline-block;
      flex-grow: 1;
      padding: var(--size-spacing-small);
      line-height: 1em;
      background-color: var(--color-background-control);
      color: var(--color-text-control);
      font-family: var(--font-family-display);
      transition: background-color
        var(--time-transition-control);
      cursor: pointer;
    }
    label:has(input:checked) {
      background-color: var(--color-accent);
      color: var(--color-text-control-inverted);
    }
    label + label {
      border-left: var(--line-weight-fine) solid
        var(--color-accent);
    }
    input {
      display: none;
    }
  `;

  _handleChange(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const composedEvent = new Event(ev.type, {
      bubbles: true,
      composed: true
    });

    console.log("Preset changed", ev);

    if (target) {
      this.value = target.value
        ? parseInt(target.value)
        : undefined;
    }
    this.dispatchEvent(composedEvent);
  }
}
