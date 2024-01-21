import { c as css, L as LitElement, h as html } from './query-3c00c485.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
const customElement = (tagName) => (classOrTarget, context) => {
    if (context !== undefined) {
        context.addInitializer(() => {
            customElements.define(tagName, classOrTarget);
        });
    }
    else {
        customElements.define(tagName, classOrTarget);
    }
};

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
console.log('Loading module "Kram_72c5d10a_webc"');
function Program({ connectStore, initializeStore }) {
  let HelloWorldElement = class extends LitElement {
    render() {
      return html`<h1>Hello, <slot>world</slot>!</h1>`;
    }
  };
  HelloWorldElement = __decorateClass([
    customElement("hello-world")
  ], HelloWorldElement);
  let HelloStyleElement = class extends LitElement {
    render() {
      return html`<h1>
      Hello, <slot class="fancy">world</slot>!
    </h1>`;
    }
  };
  HelloStyleElement.styles = css`
    h1 {
      font-family: Georgia;
    }

    .fancy {
      font-size: 150%;
      font-style: italic;
      color: darkorange;
    }
  `;
  HelloStyleElement = __decorateClass([
    customElement("hello-style")
  ], HelloStyleElement);
  let GreetWorldElement = class extends LitElement {
    render() {
      return html` <h1>
      <slot name="greeting">Hello</slot>,
      <slot name="recipient">world</slot>!
    </h1>`;
    }
  };
  GreetWorldElement.styles = css`
    h1 {
      font-family: Georgia;
    }

    slot[name="recipient"] {
      font-size: 150%;
      font-style: italic;
      color: darkorange;
    }
  `;
  GreetWorldElement = __decorateClass([
    customElement("greet-world")
  ], GreetWorldElement);
  let ArrowButtonElement = class extends LitElement {
    render() {
      return html`
      <button>
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
  };
  ArrowButtonElement.styles = css`
    svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
      transform: rotate(var(--arrow-rotation, 0));
    }
  `;
  ArrowButtonElement = __decorateClass([
    customElement("arrow-button")
  ], ArrowButtonElement);
  return {};
}
function mount(mountpoint, initial) {
  let Store = {
    root: Object.assign({}, initial)
  };
  const connectStore = (path = ["root"]) => {
    let root = Store;
    path.forEach((key) => root = root[key]);
    return {
      root,
      get: (key) => root[key],
      set: (key, value) => root[key] = value,
      keys: () => Object.keys(root)
    };
  };
  const program = Program({ connectStore });
  return (n, container) => {
    program[n - 1].call(container);
  };
}

export { Program, mount };
