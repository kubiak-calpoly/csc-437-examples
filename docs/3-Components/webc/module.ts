// module Kram_410211f0_webc (Typescript)
          import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
          console.log('Loading module "Kram_410211f0_webc"')
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