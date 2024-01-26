import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("drop-down")
class DropDownElement extends LitElement {
  @property({ reflect: true, type: Boolean })
  open: boolean = false;

  render() {
    return html`
      <input
        type="checkbox"
        id="is-shown"
        @change=${this._handleChange}
        .checked=${this.open}
      />
      <label for="is-shown">
        <slot>Menu</slot>
      </label>
      <slot name="menu">
        <ul>
          <li>Command 1</li>
          <li>Command 2</li>
          <li>Command 3</li>
        </ul>
      </slot>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid;
      background: white;
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }

    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0.25em;
      list-style: none;
      white-space: nowrap;
    }
  `;

  _handleChange(ev: Event) {
    const target = ev.target;
    this._toggle(target?.checked);
  }

  _toggle(open) {
    this.open = open;
    this._toggleClickAway(open);
  }

  _toggleClickAway(open) {
    const clickawayHandler = (ev) => {
      if (!ev.composedPath().includes(this)) {
        this._toggle(false);
      } else {
        ev.stopPropagation();
      }
    };

    if (open) {
      document.addEventListener("click", clickawayHandler);
    } else {
      document.removeEventListener("click", clickawayHandler);
    }
  }
}
