import { u, f, i, s, x } from './lit-element-a480b217.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f},r=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.C(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

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
console.log('Loading module "Kram_46bc579d_webc"');
function Program({ connectStore, initializeStore }) {
  let HelloWorldElement = class extends s {
    render() {
      return x`<h1>Hello, <slot>world</slot>!</h1>`;
    }
  };
  HelloWorldElement = __decorateClass([
    t("hello-world")
  ], HelloWorldElement);
  let HelloStyleElement = class extends s {
    render() {
      return x`<h1>
      Hello, <slot class="fancy">world</slot>!
    </h1>`;
    }
  };
  HelloStyleElement.styles = i`
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
    t("hello-style")
  ], HelloStyleElement);
  let GreetWorldElement = class extends s {
    render() {
      return x` <h1>
      <slot name="greeting">Hello</slot>,
      <slot name="recipient">world</slot>!
    </h1>`;
    }
  };
  GreetWorldElement.styles = i`
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
    t("greet-world")
  ], GreetWorldElement);
  let ArrowButtonElement = class extends s {
    constructor() {
      super(...arguments);
      this.heading = "0";
    }
    render() {
      return x`
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
  };
  ArrowButtonElement.styles = i`
    svg {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      fill: currentColor;
      transform: rotate(var(--arrow-rotation, 0));
    }
  `;
  __decorateClass([
    n()
  ], ArrowButtonElement.prototype, "heading", 2);
  ArrowButtonElement = __decorateClass([
    t("arrow-button")
  ], ArrowButtonElement);
  let DropdownElementV1 = class extends s {
    constructor() {
      super();
      this.open = false;
      this.clickawayHandler = (ev) => {
        if (!ev.composedPath().includes(this)) {
          this._toggle(false);
        } else {
          ev.stopPropagation();
        }
      };
    }
    _handleChange(ev) {
      const target = ev.target;
      _toggle(target.checked);
    }
    _toggle(isOpen) {
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
      return x`
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
  };
  DropdownElementV1.styles = i`
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
  __decorateClass([
    n({ reflect: true, type: Boolean })
  ], DropdownElementV1.prototype, "open", 2);
  DropdownElementV1 = __decorateClass([
    t("dropdown-menu")
  ], DropdownElementV1);
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
