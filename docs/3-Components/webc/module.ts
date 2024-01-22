// module Kram_144f7849_webc (Typescript)
          import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ref, createRef } from 'lit/directives/ref.js'
          console.log('Loading module "Kram_144f7849_webc"')
          export function Program ({connectStore, initializeStore}) {
            // TS Definition from scene 1
@customElement("hello-world")
class HelloWorldElement extends LitElement {
  render() {
    return html`<h1>Hello, <slot>world</slot>!</h1>`;
  }
}

// TS Definition from scene 2
@customElement("hello-style")
class HelloStyleElement extends LitElement {
  render() {
    return html`<h1>
      Hello, <slot class="fancy">world</slot>!
    </h1>`;
  }

  static styles = css`
    h1 {
      font-family: Georgia;
    }

    .fancy {
      font-size: 150%;
      font-style: italic;
      color: darkorange;
    }
  `;
}

// TS Definition from scene 3
@customElement("greet-world")
class GreetWorldElement extends LitElement {
  render() {
    return html` <h1>
      <slot name="greeting">Hello</slot>,
      <slot name="recipient">world</slot>!
    </h1>`;
  }

  static styles = css`
    h1 {
      font-family: Georgia;
    }

    slot[name="recipient"] {
      font-size: 150%;
      font-style: italic;
      color: darkorange;
    }
  `;
}

// TS Definition from scene 4
@customElement("arrow-button")
class ArrowButtonElement extends LitElement {
  @property()
  heading: string = "0";

  render() {
    return html`
      <button style="--arrow-rotation: ${this.heading}">
        <svg viewBox="0 0 24 24">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.5 10.4853L11.9853 2L20.4706 10.4853L17.9706 12.9853L14 9.01472V22H10V8.98528L6 12.9853L3.5 10.4853Z"
          /></svg
        ><slot></slot>
      </button>
    `;
  }

  static styles = css`
    svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
      transform: rotate(var(--arrow-rotation, 0));
    }
  `;
}

// TS Definition from scene 5
@customElement("dropdown-menu")
class DropdownElementV1 extends LitElement {
  @property({ reflect: true, type: Boolean })
  open = false;

  constructor() {
    super();

    this.clickawayHandler = (ev) => {
      if (!ev.composedPath().includes(this)) {
        this._toggle(false);
      } else {
        ev.stopPropagation();
      }
    };
  }

  _handleChange(ev: Event) {
    const target = ev.target;
    _toggle(target.checked);
  }

  _toggle(isOpen: boolean) {
    this.open = isOpen;
    if (isOpen) {
      document.addEventListener("click", this.clickawayHandler);
    } else {
      document.removeEventListener(
        "click",
        this.clickawayHandler
      );
    }
  }

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
        <slot> </slot
      ></slot>
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
}

            return ({
              
            })
          }
          export function mount (mountpoint, initial) {
            let Store = {
              root: Object.assign({}, initial),
            };
            const connectStore = (path = ["root"]) => {
              let root = Store;
              path.forEach((key) => root = root[key]);
              return ({
                root,
                get: (key) => root[key],
                set: (key, value) => root[key] = value,
                keys: () => Object.keys(root),
              })};
            const program = Program({connectStore})
            return (n, container) => {
              program[n-1].call(container)
            }
          }